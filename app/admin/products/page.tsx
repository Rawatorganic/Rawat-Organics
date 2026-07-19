import type { Metadata } from 'next'
import CatalogManagement from './components/CatalogManagement'

export const metadata: Metadata = {
  title: 'Products',
  robots: { index: false, follow: false },
}

export default function AdminProductsPage() {
  return <CatalogManagement />
}
