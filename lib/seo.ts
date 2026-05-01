/**
 * Centralised SEO config for Rawat Organics.
 * One source of truth for site URL, brand strings, and OG defaults.
 */

export const SITE = {
  name: 'Rawat Organics',
  shortName: 'Rawat Organic',
  url: 'https://rawatorganic.com',
  locale: 'en_IN',
  language: 'en',
  email: 'hello@rawatorganics.com',
  description:
    'Rawat Organics — pure, farm-fresh, 100% organic Indian spices. Whole spices and powder spices grown chemical-free on our farms, hand-harvested and sun-dried for unmatched aroma and potency.',
  tagline: 'Pure Organic Spices, Straight from the Farm',
  keywords: [
    'rawat organics',
    'rawat organic',
    'rawat spices',
    'organic spices',
    'organic spices india',
    'pure organic spices',
    'farm fresh spices',
    'whole spices online',
    'powder spices online',
    'chemical free spices',
    'natural spices',
    'indian spices',
    'organic turmeric powder',
    'organic chilli powder',
    'organic coriander',
    'organic cumin',
    'organic garam masala',
    'wholesale spices india',
    'sustainable spices',
    'authentic indian masala',
  ],
  ogImage: '/products/spices-display.png',
  ogImageAlt: 'Rawat Organics — pure organic Indian spices',
  twitterHandle: '@rawatorganics',
} as const

export const ABSOLUTE = (path = '/') =>
  `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`
