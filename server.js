import 'dotenv/config';
import express from 'express';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3001;
const isProd = process.env.NODE_ENV === 'production';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// Serve the built React app in production
if (isProd) {
  app.use(express.static(path.join(__dirname, 'dist')));
}

// Simple HTML escape to prevent XSS in email bodies
function esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Gmail transporter — only created when EMAIL_PASS is provided
const mailer = process.env.EMAIL_PASS
  ? nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'netreverse.ai@gmail.com',
        pass: process.env.EMAIL_PASS,
      },
    })
  : null;

// Send a message to Telegram via Bot API
async function sendTelegram(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn('[Telegram] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set — skipping');
    return;
  }

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }
}

// POST /api/submit — receives form data and dispatches notifications
app.post('/api/submit', async (req, res) => {
  const { name, phone, plan, source } = req.body ?? {};

  if (!name?.trim() || !phone?.trim()) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  const safeName   = esc(name);
  const safePhone  = esc(phone);
  const safePlan   = plan   ? esc(plan)   : null;
  const safeSource = esc(source || 'Unknown');

  // ── Telegram message ────────────────────────────────────────────────────────
  const tgText = [
    '📩 <b>New Lead — Net Reverse</b>',
    `📌 Source: <i>${safeSource}</i>`,
    `👤 Name: ${safeName}`,
    `📞 Phone: ${safePhone}`,
    safePlan ? `📦 Plan: ${safePlan}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  // ── Email ────────────────────────────────────────────────────────────────────
  const emailSubject = safePlan
    ? `New Plan Request [${safePlan}] — ${safeName}`
    : `New Consultation Request — ${safeName}`;

  const emailHtml = `
    <h2 style="font-family:sans-serif;color:#1a1a1a;margin-bottom:16px;">
      📩 New Lead — Net Reverse
    </h2>
    <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;width:100%;max-width:480px;">
      <tr style="background:#f5f5f5;">
        <td style="padding:10px 14px;font-weight:600;border:1px solid #ddd;width:100px;">Source</td>
        <td style="padding:10px 14px;border:1px solid #ddd;">${safeSource}</td>
      </tr>
      <tr>
        <td style="padding:10px 14px;font-weight:600;border:1px solid #ddd;">Name</td>
        <td style="padding:10px 14px;border:1px solid #ddd;">${safeName}</td>
      </tr>
      <tr style="background:#f5f5f5;">
        <td style="padding:10px 14px;font-weight:600;border:1px solid #ddd;">Phone</td>
        <td style="padding:10px 14px;border:1px solid #ddd;">${safePhone}</td>
      </tr>
      ${safePlan ? `
      <tr>
        <td style="padding:10px 14px;font-weight:600;border:1px solid #ddd;">Plan</td>
        <td style="padding:10px 14px;border:1px solid #ddd;">${safePlan}</td>
      </tr>` : ''}
    </table>
  `;

  const notified = { telegram: false, email: false };

  // Send Telegram notification
  try {
    await sendTelegram(tgText);
    notified.telegram = true;
  } catch (err) {
    console.error('[Telegram]', err.message);
  }

  // Send email notification
  if (mailer) {
    try {
      await mailer.sendMail({
        from: '"Net Reverse" <netreverse.ai@gmail.com>',
        to: 'netreverse.ai@gmail.com',
        subject: emailSubject,
        html: emailHtml,
      });
      notified.email = true;
    } catch (err) {
      console.error('[Email]', err.message);
    }
  } else {
    console.warn('[Email] EMAIL_PASS not set — skipping');
  }

  res.json({ success: true, notified });
});

// SPA fallback — serve index.html for all non-API routes in production
if (isProd) {
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT} [${isProd ? 'production' : 'development'}]`);
});
