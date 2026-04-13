import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://www.netreverse.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

interface HreflangEntry {
  lang: string; // 'en', 'ru', 'uk', or 'x-default'
  path: string;
}

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  /** Optional JSON-LD structured data objects */
  jsonLd?: object[];
  ogImage?: string;
  /** hreflang alternate links */
  hreflang?: HreflangEntry[];
}

export const SEOHead = ({
  title,
  description,
  path,
  jsonLd = [],
  ogImage = DEFAULT_OG_IMAGE,
  hreflang = [],
}: SEOHeadProps) => {
  const canonicalUrl = `${SITE_URL}${path}`;

  return (
    <Helmet>
      {/* Basic */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* hreflang */}
      {hreflang.map((entry) => (
        <link
          key={entry.lang}
          rel="alternate"
          hrefLang={entry.lang}
          href={`${SITE_URL}${entry.path}`}
        />
      ))}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Net Reverse — AI solutions for business" />
      <meta property="og:site_name" content="Net Reverse" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD structured data */}
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};
