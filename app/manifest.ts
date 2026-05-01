import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/seo'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.shortName,
    description: SITE.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#f7f5f0',
    theme_color: '#021c10',
    orientation: 'portrait-primary',
    categories: ['food', 'shopping', 'lifestyle'],
    icons: [
      { src: '/logo/favicon-16x16.png',           sizes: '16x16',   type: 'image/png' },
      { src: '/logo/favicon-32x32.png',           sizes: '32x32',   type: 'image/png' },
      { src: '/logo/apple-touch-icon.png',        sizes: '180x180', type: 'image/png' },
      { src: '/logo/android-chrome-192x192.png',  sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/logo/android-chrome-512x512.png',  sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/logo/android-chrome-512x512.png',  sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
