interface SubmitData {
  name: string;
  phone: string;
  plan?: string;
  source: string;
}

interface SubmitResponse {
  success: boolean;
  error?: string;
  notified?: { telegram: boolean; email: boolean };
}

export async function submitForm(data: SubmitData): Promise<SubmitResponse> {
  const res = await fetch('/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const body: SubmitResponse = await res.json();

  if (!res.ok || !body.success) {
    throw new Error(body.error || `Submission failed: ${res.status}`);
  }

  return body;
}
