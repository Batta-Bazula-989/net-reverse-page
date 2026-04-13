/**
 * Reusable JSON-LD schema objects for SEO structured data.
 */

const SITE_URL = 'https://www.netreverse.com';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Net Reverse',
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  description:
    'Net Reverse creates AI-powered automation solutions, chatbots, integrations, and analytical tools for businesses.',
  email: 'netreverse.ai@gmail.com',
  sameAs: [
    'https://www.instagram.com/netreverseua/',
    'https://www.facebook.com/netreverse',
    'https://www.tiktok.com/@net.reverse',
    'https://www.youtube.com/@NetReverse',
    'https://www.linkedin.com/company/net-reverse',
  ],
};

export const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Net Reverse',
  url: SITE_URL,
};

/**
 * Build a FAQPage schema from an array of { question, answer } objects.
 */
export const buildFaqSchema = (items: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
});
