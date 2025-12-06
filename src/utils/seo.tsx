import React from "react";

export interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  openGraph?: {
    type?: "website" | "article" | "book" | "profile";
    url?: string;
    title?: string;
    description?: string;
    images?: Array<{
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }>;
    siteName?: string;
  };
  twitter?: {
    cardType?: "summary" | "summary_large_image";
    site?: string;
    creator?: string;
  };
  additionalMetaTags?: Array<{
    name: string;
    content: string;
    httpEquiv?: string;
    property?: string;
  }>;
}

// Force SEOConfig to maintain literal types instead of widening to string
export const SEOConfig = {
  defaultTitle: "inbo2.0 - Comprehensive Platform",
  titleTemplate: "%s | inbo2.0",
  description: "A comprehensive platform built with modern technologies and best practices.",
  canonical: process.env.NEXT_PUBLIC_APP_URL || "https://inbo.app",
  openGraph: {
    type: "website" as const,
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://inbo.app",
    siteName: "inbo2.0",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL || "https://inbo.app"}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "inbo2.0",
      },
    ],
  },
  twitter: {
    cardType: "summary_large_image" as const,
    site: "@inbo",
  },
};

// ---------------- DefaultSEO ----------------

export const DefaultSEO: React.FC = () => {
  const img = SEOConfig.openGraph.images[0];

  return (
    <>
      <title>{SEOConfig.defaultTitle}</title>
      <meta name="description" content={SEOConfig.description} />
      <link rel="canonical" href={SEOConfig.canonical} />

      {/* Open Graph */}
      <meta property="og:type" content={SEOConfig.openGraph.type} />
      <meta property="og:locale" content={SEOConfig.openGraph.locale} />
      <meta property="og:url" content={SEOConfig.openGraph.url} />
      <meta property="og:site_name" content={SEOConfig.openGraph.siteName} />
      <meta property="og:title" content={SEOConfig.defaultTitle} />
      <meta property="og:description" content={SEOConfig.description} />

      <meta property="og:image" content={img.url} />
      {img.width && <meta property="og:image:width" content={String(img.width)} />}
      {img.height && <meta property="og:image:height" content={String(img.height)} />}
      {img.alt && <meta property="og:image:alt" content={img.alt} />}

      {/* Twitter */}
      <meta name="twitter:card" content={SEOConfig.twitter.cardType} />
      <meta name="twitter:site" content={SEOConfig.twitter.site} />
      <meta name="twitter:title" content={SEOConfig.defaultTitle} />
      <meta name="twitter:description" content={SEOConfig.description} />
      <meta name="twitter:image" content={img.url} />
    </>
  );
};

// ---------------- PageSEO ----------------

export const PageSEO: React.FC<SEOProps> = (props) => {
  const title = props.title || SEOConfig.defaultTitle;
  const description = props.description || SEOConfig.description;
  const canonical = props.canonical || SEOConfig.canonical;

  const og = props.openGraph;
  const img = og?.images?.[0];

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      {og?.type && <meta property="og:type" content={og.type} />}
      {og?.url && <meta property="og:url" content={og.url} />}
      {og?.title && <meta property="og:title" content={og.title} />}
      {og?.description && <meta property="og:description" content={og.description} />}

      {img && (
        <>
          <meta property="og:image" content={img.url} />
          {img.width && <meta property="og:image:width" content={String(img.width)} />}
          {img.height && <meta property="og:image:height" content={String(img.height)} />}
          {img.alt && <meta property="og:image:alt" content={img.alt} />}
        </>
      )}

      {og?.siteName && <meta property="og:site_name" content={og.siteName} />}

      {/* Twitter */}
      {props.twitter?.cardType && <meta name="twitter:card" content={props.twitter.cardType} />}
      {props.twitter?.site && <meta name="twitter:site" content={props.twitter.site} />}
      {props.twitter?.creator && <meta name="twitter:creator" content={props.twitter.creator} />}

      {/* Additional Meta Tags */}
      {props.additionalMetaTags?.map((tag, i) => (
        <meta key={i} {...tag} />
      ))}
    </>
  );
};

// ---------------- getSEO ----------------

export const getSEO = (props?: SEOProps) => {
  const title = props?.title ? `${props.title} | inbo2.0` : SEOConfig.defaultTitle;

  return {
    title,
    description: props?.description || SEOConfig.description,
    canonical: props?.canonical || SEOConfig.canonical,

    openGraph: {
      type: props?.openGraph?.type ?? SEOConfig.openGraph.type,
      url: props?.openGraph?.url ?? SEOConfig.openGraph.url,
      siteName: props?.openGraph?.siteName ?? SEOConfig.openGraph.siteName,
      title: props?.openGraph?.title ?? title,
      description: props?.openGraph?.description ?? props?.description ?? SEOConfig.description,
      images: props?.openGraph?.images ?? SEOConfig.openGraph.images,
    },

    twitter: {
      cardType: props?.twitter?.cardType ?? SEOConfig.twitter.cardType,
      site: props?.twitter?.site ?? SEOConfig.twitter.site,
      creator: props?.twitter?.creator,
    },

    additionalMetaTags: props?.additionalMetaTags,
  };
};
