import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProductBySlug, getRelatedProducts, powderSpices } from '@/lib/products'
import ProductDetailClient from '@/components/ProductDetailClient'
import Navbar from '@/components/Navbar'
import JsonLd from '@/components/JsonLd'
import { SITE } from '@/lib/seo'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return powderSpices.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug('powder-spices', params.slug)
  if (!product) {
    return { title: 'Product Not Found', robots: { index: false, follow: false } }
  }

  const url = `${SITE.url}/powder-spices/${product.slug}`
  const ogImage = product.primaryImage

  return {
    title: `${product.name} — Organic Powder Spice`,
    description: product.longDescription,
    keywords: [
      product.name.toLowerCase(),
      `organic ${product.name.toLowerCase()}`,
      `${product.name.toLowerCase()} online`,
      `buy ${product.name.toLowerCase()}`,
      'organic powder spices',
      'masala powder',
      'rawat organics',
      ...product.tags,
    ],
    alternates: { canonical: `/powder-spices/${product.slug}` },
    openGraph: {
      title: `${product.name} — Organic Powder Spice | Rawat Organics`,
      description: product.longDescription,
      url,
      type: 'article',
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${product.name} — Rawat Organics` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} — Organic Powder Spice | Rawat Organics`,
      description: product.longDescription,
      images: [ogImage],
    },
  }
}

export default function PowderSpiceDetailPage({ params }: Props) {
  const product = getProductBySlug('powder-spices', params.slug)
  if (!product) notFound()

  const related = getRelatedProducts(product, 4)
  const url = `${SITE.url}/powder-spices/${product.slug}`

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${url}#product`,
    name: product.name,
    description: product.longDescription,
    sku: product.productId,
    productID: product.id,
    image: product.images.map((img) => `${SITE.url}${img}`),
    brand: {
      '@type': 'Brand',
      name: SITE.name,
    },
    manufacturer: { '@id': `${SITE.url}/#organization` },
    category: 'Powder Spices',
    keywords: product.tags.join(', '),
    url,
    offers: {
      '@type': 'Offer',
      url,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      priceCurrency: 'INR',
      price: '0',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'INR',
        valueAddedTaxIncluded: true,
      },
      seller: { '@id': `${SITE.url}/#organization` },
      availableDeliveryMethod: 'https://schema.org/ParcelService',
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',           item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Powder Spices',  item: `${SITE.url}/powder-spices` },
      { '@type': 'ListItem', position: 3, name: product.name,     item: url },
    ],
  }

  return (
    <>
      <JsonLd data={[productSchema, breadcrumbSchema]} />
      <Navbar />
      <ProductDetailClient
        product={product}
        related={related}
        categoryLabel="Powder Spices"
        categoryHref="/powder-spices"
      />
    </>
  )
}
