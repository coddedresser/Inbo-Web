import React from 'react';
import { DefaultSeo, NextSeo } from 'next-seo';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  openGraph?: {
    type?: 'website' | 'article' | 'book' | 'profile';
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
    cardType?: 'summary' | 'summary_large_image';
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

export const SEOConfig = {
  defaultTitle: 'inbo2.0 - Comprehensive Platform',
  titleTemplate: '%s | inbo2.0',
  description: 'A comprehensive platform built with modern technologies and best practices.',
  canonical: process.env.NEXT_PUBLIC_APP_URL || 'https://inbo.app',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://inbo.app',
    siteName: 'inbo2.0',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://inbo.app'}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'inbo2.0',
      },
    ],
  },
  twitter: {
    cardType: 'summary_large_image',
    site: '@inbo',
  },
};

export const DefaultSEO: React.FC = () => {
  return <DefaultSeo {...SEOConfig} />;
};

export const PageSEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  openGraph,
  twitter,
  additionalMetaTags,
}) => {
  return (
    <NextSeo
      title={title}
      description={description}
      canonical={canonical}
      openGraph={openGraph}
      twitter={twitter}
      additionalMetaTags={additionalMetaTags}
    />
  );
};

// SEO helper for dynamic pages (doesn't use hooks)
export const getSEO = (props?: SEOProps) => {
  return {
    title: props?.title || 'inbo2.0',
    description: props?.description || 'A comprehensive platform built with modern technologies',
    ...props,
  };
};

