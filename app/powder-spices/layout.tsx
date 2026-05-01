import type { Metadata } from 'next'
import { SITE } from '@/lib/seo'
import { powderSpices } from '@/lib/products'

const description = `Shop ${powderSpices.length}+ varieties of pure organic powder spices from Rawat Organics. Cold-milled at low temperature to preserve volatile oils — turmeric, red chilli, coriander, cumin, garam masala and more. 100% chemical-free, farm-fresh Indian spice powders.`

export const metadata: Metadata = {
  title: 'Powder Spices — Cold-Milled & Organic',
  description,
  keywords: [
    'powder spices',
    'organic powder spices',
    'organic spice powders',
    'organic turmeric powder',
    'organic chilli powder',
    'organic coriander powder',
    'organic cumin powder',
    'organic garam masala',
    'organic kashmiri chilli',
    'rawat powder spices',
    'rawat organics',
    'masala powder online',
    'cold milled spices',
    'chemical free masala',
  ],
  alternates: { canonical: '/powder-spices' },
  openGraph: {
    title: 'Powder Spices — Cold-Milled & Organic | Rawat Organics',
    description,
    url: `${SITE.url}/powder-spices`,
    type: 'website',
    images: [{ url: '/products/turmeric.png', width: 1200, height: 630, alt: 'Rawat Organics powder spices collection' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Powder Spices — Cold-Milled & Organic | Rawat Organics',
    description,
    images: ['/products/turmeric.png'],
  },
}

export default function PowderSpicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
