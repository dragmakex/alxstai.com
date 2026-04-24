import Head from 'next/head';

type StructuredData = Record<string, any>;

type StickyPageHeadProps = {
  title: string;
  description?: string;
  ogImage?: string;
  ogUrl?: string;
  keywords?: string;
  author?: string;
  canonicalUrl?: string;
  structuredData?: StructuredData | StructuredData[];
}

export default function StickyPageHead({
  title,
  description = "I hereby invite you to click here 🐉",
  ogImage = "https://alxstai.com/images/dragon.png",
  ogUrl = "https://alxstai.com",
  keywords = "alex, alxstai, portfolio, developer, blockchain, web3, software engineer, sticky, university, eth zurich, ethereum, defi, smart contracts, react, next.js, typescript",
  author = "alex",
  canonicalUrl,
  structuredData
}: StickyPageHeadProps) {
  const formattedTitle = title.includes('◦') ? title : `◦ ${title} ◦`;
  const structuredDataArray = structuredData ? (Array.isArray(structuredData) ? structuredData : [structuredData]) : [];

  return (
    <Head>
      <title>{formattedTitle}</title>

      <meta name="apple-mobile-web-app-title" content={`${title} 🐉`} />
      <meta name="application-name" content={`${title} 🐉`} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="UTF-8" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={`${title} 🐉`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${title} page preview`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={ogUrl} />
      <meta name="twitter:title" content={`${title} 🐉`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content="@alxstai" />

      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="theme-color" content="#000000" />

      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      <link rel="icon" href="/images/favicon.ico" />
      <link rel="shortcut icon" href="/images/favicon.ico" />
      <link rel="apple-touch-icon" href="/images/favicon.ico" />

      {structuredDataArray.map((item, index) => (
        <script
          key={`jsonld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </Head>
  );
}
