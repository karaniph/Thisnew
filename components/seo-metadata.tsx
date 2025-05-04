import Head from "next/head"

interface SEOMetadataProps {
  title: string
  description: string
  canonicalUrl: string
  ogType?: string
  ogImage?: string
  twitterCard?: string
}

export function SEOMetadata({
  title,
  description,
  canonicalUrl,
  ogType = "website",
  ogImage = "https://your-domain.com/og-image.jpg",
  twitterCard = "summary_large_image",
}: SEOMetadataProps) {
  return (
    <Head>
      {/* Basic Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="ElectronicParts" />

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Head>
  )
}
