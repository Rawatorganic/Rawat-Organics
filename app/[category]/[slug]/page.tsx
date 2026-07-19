import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import ProductDetailClient from '@/components/ProductDetailClient'
import JsonLd from '@/components/JsonLd'
import { SITE } from '@/lib/seo'
import {
  getCategoryBySlug,
  getProduct,
  getRelatedProducts,
} from '@/lib/data/catalog'

export const dynamic = 'force-dynamic'

interface Props {
  params: { category: string; slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.category, params.slug)
  if (!product) {
    return { title: 'Product Not Found', robots: { index: false, follow: false } }
  }
  const category = await getCategoryBySlug(params.category)
  const categoryName = category?.name ?? 'Spices'
  const url = `${SITE.url}/${params.category}/${product.slug}`
  const ogImage = product.primaryImage || SITE.ogImage

  return {
    title: `${product.name} — Organic ${categoryName}`,
    description: product.longDescription || product.description,
    keywords: [
      product.name.toLowerCase(),
      `organic ${product.name.toLowerCase()}`,
      `buy ${product.name.toLowerCase()}`,
      'rawat organics',
      ...product.tags,
    ],
    alternates: { canonical: `/${params.category}/${product.slug}` },
    openGraph: {
      title: `${product.name} | Rawat Organics`,
      description: product.longDescription || product.description,
      url,
      type: 'article',
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${product.name} — Rawat Organics` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | Rawat Organics`,
      description: product.longDescription || product.description,
      images: [ogImage],
    },
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const category = await getCategoryBySlug(params.category)
  if (!category) notFound()

  const product = await getProduct(params.category, params.slug)
  if (!product) notFound()

  const related = await getRelatedProducts(params.category, params.slug, 4)
  const url = `${SITE.url}/${params.category}/${product.slug}`

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${url}#product`,
    name: product.name,
    description: product.longDescription || product.description,
    sku: product.productId,
    image: (product.images.length ? product.images : [product.primaryImage])
      .filter(Boolean)
      .map((img) => (img.startsWith('http') ? img : `${SITE.url}${img}`)),
    brand: { '@type': 'Brand', name: SITE.name },
    manufacturer: { '@id': `${SITE.url}/#organization` },
    category: category.name,
    keywords: product.tags.join(', '),
    url,
    offers: {
      '@type': 'Offer',
      url,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      priceCurrency: 'INR',
      price: '0',
      seller: { '@id': `${SITE.url}/#organization` },
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: category.name, item: `${SITE.url}/${category.slug}` },
      { '@type': 'ListItem', position: 3, name: product.name, item: url },
    ],
  }

  return (
    <>
      <JsonLd data={[productSchema, breadcrumbSchema]} />
      <Navbar />
      <ProductDetailClient
        product={product}
        related={related}
        categoryLabel={category.name}
        categoryHref={`/${category.slug}`}
      />
    </>
  )
}
