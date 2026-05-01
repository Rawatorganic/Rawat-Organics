import type { Metadata } from 'next'
import { SITE } from '@/lib/seo'
import { wholeSpices } from '@/lib/products'

const description = `Shop ${wholeSpices.length}+ varieties of pure organic whole spices from Rawat Organics. Hand-harvested, sun-dried, chemical-free Indian spices — coriander, cumin, fennel, cardamom, cloves and more, preserved in their natural form for maximum aroma and shelf life.`

export const metadata: Metadata = {
  title: 'Whole Spices — Pure, Unaltered & Organic',
  description,
  keywords: [
    'whole spices',
    'organic whole spices',
    'whole spices online',
    'whole spices india',
    'organic coriander',
    'organic cumin seeds',
    'organic fennel seeds',
    'organic cardamom',
    'organic cloves',
    'organic black pepper',
    'rawat whole spices',
    'rawat organics',
    'pure indian spices',
    'chemical free spices',
  ],
  alternates: { canonical: '/whole-spices' },
  openGraph: {
    title: 'Whole Spices — Pure, Unaltered & Organic | Rawat Organics',
    description,
    url: `${SITE.url}/whole-spices`,
    type: 'website',
    images: [{ url: '/products/spices-variety.png', width: 1200, height: 630, alt: 'Rawat Organics whole spices collection' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Whole Spices — Pure, Unaltered & Organic | Rawat Organics',
    description,
    images: ['/products/spices-variety.png'],
  },
}

export default function WholeSpicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
