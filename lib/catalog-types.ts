// ─── Shared plain catalog types ───────────────────────────────────────────────
// No mongoose import here — safe to use in client components & the zustand store.

export type ProductTag = 'spicy' | 'sweet' | 'earthy' | 'aromatic'

export const PRODUCT_TAGS: ProductTag[] = ['spicy', 'sweet', 'earthy', 'aromatic']

/** A category as consumed by the UI (already serialized — ids/dates are strings). */
export interface CategoryData {
  _id: string
  index: number
  name: string          // "Whole Spices"
  slug: string          // "whole-spices"  (the key / URL segment)
  eyebrow: string       // "Our Whole Spices"
  punchline: string     // "Pure & Unaltered."
  description: string
  bannerImage: string
  badge?: string
  badgeIcon?: string
  createdAt?: string
  updatedAt?: string
}

/** A product as consumed by the UI (already serialized). */
export interface ProductData {
  _id: string
  productId: string     // "Whole_Spice_Cumin"
  category: string      // category slug, e.g. "whole-spices"
  slug: string          // "cumin"
  name: string
  tagline: string
  description: string
  longDescription: string
  tags: ProductTag[]
  color: string
  primaryImage: string
  images: string[]
  order: number
  createdAt?: string
  updatedAt?: string
}

/** Category + its products, used by category pages. */
export interface CategoryWithProducts extends CategoryData {
  products: ProductData[]
}
