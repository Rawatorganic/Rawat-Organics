import type { Metadata } from 'next'
import { SITE } from '@/lib/seo'

const description =
  'Get in touch with Rawat Organics for wholesale orders, bulk inquiries, retail partnerships, or product questions. Reach our team for organic spice supply across India and beyond.'

export const metadata: Metadata = {
  title: 'Contact Rawat Organics — Wholesale & Bulk Inquiries',
  description,
  keywords: [
    'contact rawat organics',
    'rawat organics contact',
    'wholesale spices inquiry',
    'bulk organic spices',
    'organic spice supplier india',
    'rawat spices wholesale',
  ],
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Rawat Organics — Wholesale & Bulk Inquiries',
    description,
    url: `${SITE.url}/contact`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Rawat Organics — Wholesale & Bulk Inquiries',
    description,
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
