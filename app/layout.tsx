import type { Metadata, Viewport } from 'next'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'
import FirebaseAnalytics from '@/components/FirebaseAnalytics'
import JsonLd from '@/components/JsonLd'
import { SITE } from '@/lib/seo'

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [...SITE.keywords],
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: 'Food & Beverage',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/logo/favicon.ico', sizes: 'any' },
      { url: '/logo/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/logo/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/logo/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/logo/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'icon', url: '/logo/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: SITE.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    images: [SITE.ogImage],
    creator: SITE.twitterHandle,
    site: SITE.twitterHandle,
  },
  formatDetection: { email: false, address: false, telephone: false },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f5f0' },
    { media: '(prefers-color-scheme: dark)',  color: '#021c10' },
  ],
  width: 'device-width',
  initialScale: 1,
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE.url}/#organization`,
  name: SITE.name,
  legalName: SITE.name,
  url: SITE.url,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE.url}/logo/android-chrome-512x512.png`,
    width: 512,
    height: 512,
  },
  image: `${SITE.url}${SITE.ogImage}`,
  description: SITE.description,
  email: SITE.email,
  foundingDate: '1994',
  slogan: SITE.tagline,
  knowsAbout: [
    'Organic Spices',
    'Whole Spices',
    'Powder Spices',
    'Indian Masala',
    'Sustainable Farming',
    'Chemical-Free Agriculture',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: SITE.email,
      availableLanguage: ['English', 'Hindi'],
      areaServed: 'IN',
    },
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN',
  },
  sameAs: [],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE.url}/#website`,
  url: SITE.url,
  name: SITE.name,
  description: SITE.description,
  inLanguage: SITE.language,
  publisher: { '@id': `${SITE.url}/#organization` },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={SITE.language}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Manrope:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
        <JsonLd data={[organizationSchema, websiteSchema]} />
      </head>
      <body>
        <FirebaseAnalytics />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
