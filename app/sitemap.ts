import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/seo'
import { getCategories, getAllProducts } from '@/lib/data/catalog'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/`,        lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${SITE.url}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ]

  let categories: Awaited<ReturnType<typeof getCategories>> = []
  let products: Awaited<ReturnType<typeof getAllProducts>> = []
  try {
    ;[categories, products] = await Promise.all([getCategories(), getAllProducts()])
  } catch {
    // DB unavailable at build time — return static pages only.
    return staticPages
  }

  const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${SITE.url}/${c.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE.url}/${p.category}/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticPages, ...categoryPages, ...productPages]
}
