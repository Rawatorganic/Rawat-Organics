import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/seo'
import { wholeSpices, powderSpices } from '@/lib/products'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/`,              lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${SITE.url}/whole-spices`,  lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${SITE.url}/powder-spices`, lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${SITE.url}/contact`,       lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ]

  const wholeSpicePages: MetadataRoute.Sitemap = wholeSpices.map((p) => ({
    url: `${SITE.url}/whole-spices/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const powderSpicePages: MetadataRoute.Sitemap = powderSpices.map((p) => ({
    url: `${SITE.url}/powder-spices/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticPages, ...wholeSpicePages, ...powderSpicePages]
}
