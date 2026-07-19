import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CategoryPageClient from '@/components/CategoryPageClient'
import JsonLd from '@/components/JsonLd'
import { SITE } from '@/lib/seo'
import { getCategoryWithProducts } from '@/lib/data/catalog'

export const dynamic = 'force-dynamic'

interface Props {
  params: { category: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getCategoryWithProducts(params.category)
  if (!data) {
    return { title: 'Category Not Found', robots: { index: false, follow: false } }
  }

  const description =
    data.description ||
    `Explore ${data.products.length}+ varieties of organic ${data.name.toLowerCase()} from Rawat Organics.`
  const url = `${SITE.url}/${data.slug}`
  const ogImage = data.bannerImage || SITE.ogImage

  return {
    title: `${data.name} — Organic Spices`,
    description,
    alternates: { canonical: `/${data.slug}` },
    openGraph: {
      title: `${data.name} | Rawat Organics`,
      description,
      url,
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${data.name} — Rawat Organics` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.name} | Rawat Organics`,
      description,
      images: [ogImage],
    },
  }
}

export default async function CategoryPage({ params }: Props) {
  const data = await getCategoryWithProducts(params.category)
  if (!data) notFound()

  const { products, ...category } = data
  const url = `${SITE.url}/${category.slug}`

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: category.name, item: url },
    ],
  }

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: category.name,
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.name,
      url: `${url}/${p.slug}`,
    })),
  }

  return (
    <>
      <JsonLd data={[breadcrumbSchema, itemListSchema]} />
      <Navbar />
      <CategoryPageClient category={category} products={products} />
      <Footer />
    </>
  )
}
