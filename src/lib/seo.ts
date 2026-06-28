import { Metadata } from 'next';

export const siteConfig = {
  name: 'SEIIKI',
  fullName: 'PT. Solusi Energi Kelistrikan Indonesia',
  description: 'SEIIKI adalah penyedia layanan Sertifikat Laik Operasi (SLO) untuk instalasi tenaga listrik. Kami melayani sertifikasi PLTD, PLTS, dan instalasi tegangan menengah dengan standar keamanan tertinggi.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://seiiki.com',
  ogImage: '/og-image.png',
  logo: '/logo.png',
  keywords: [
    'SLO',
    'Sertifikat Laik Operasi',
    'Instalasi Listrik',
    'PLTD',
    'PLTS',
    'Inspeksi Kelistrikan',
    'Keselamatan Listrik',
    'Sertifikasi Listrik Indonesia',
    'Instalasi Tenaga Listrik',
    'SEIIKI',
    'PT Solusi Energi Kelistrikan Indonesia',
  ],
  contact: {
    phone: '+62-811-7970-227',
    email: 'pt.seyiki@gmail.com',
    address: {
      street: 'Jl. Kepodang Gg. Asri No. 10, Gunung Agung, Langkapura',
      city: 'Bandar Lampung',
      region: 'Lampung',
      country: 'Indonesia',
      countryCode: 'ID',
    },
  },
};

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noindex?: boolean;
  nofollow?: boolean;
}

export function generateMetadata({
  title,
  description = siteConfig.description,
  keywords = siteConfig.keywords,
  canonical,
  ogImage = siteConfig.ogImage,
  ogType = 'website',
  noindex = false,
  nofollow = false,
}: SEOProps = {}): Metadata {
  const metadataBase = new URL(siteConfig.url);
  const pageTitle = title ? `${title} | ${siteConfig.name}` : `${siteConfig.name} - ${siteConfig.fullName} | Sertifikat Laik Operasi`;
  const pageUrl = canonical ? `${siteConfig.url}${canonical}` : siteConfig.url;

  return {
    metadataBase,
    title: pageTitle,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: siteConfig.fullName }],
    creator: siteConfig.fullName,
    publisher: siteConfig.fullName,
    alternates: {
      canonical: canonical || '/',
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: ogType,
      locale: 'id_ID',
      url: pageUrl,
      siteName: siteConfig.name,
      title: title || `${siteConfig.name} - Pusat Layanan Sertifikat Laik Operasi Instalasi Tenaga Listrik`,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title || siteConfig.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title || `${siteConfig.name} - Sertifikat Laik Operasi Instalasi Tenaga Listrik`,
      description,
      images: [ogImage],
    },
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: siteConfig.logo,
    },
  };
}

// Structured Data Generators
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.fullName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logo}`,
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address.street,
      addressLocality: siteConfig.contact.address.city,
      addressRegion: siteConfig.contact.address.region,
      addressCountry: siteConfig.contact.address.countryCode,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.contact.phone,
      contactType: 'customer service',
      email: siteConfig.contact.email,
      availableLanguage: ['Indonesian', 'English'],
    },
    sameAs: [],
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

export function generateServiceSchema(service: {
  name: string;
  description: string;
  provider?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: service.provider || siteConfig.fullName,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Indonesia',
    },
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
