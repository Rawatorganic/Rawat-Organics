import { connectDB } from '@/lib/db'
import Category from '@/lib/models/Category'
import Product from '@/lib/models/Product'
import type {
  CategoryData,
  ProductData,
  CategoryWithProducts,
} from '@/lib/catalog-types'

/** Strip mongoose internals → plain JSON-safe objects for client components. */
function serialize<T>(doc: unknown): T {
  return JSON.parse(JSON.stringify(doc)) as T
}

/** All categories, ordered by `index` then name. */
export async function getCategories(): Promise<CategoryData[]> {
  await connectDB()
  const docs = await Category.find().sort({ index: 1, name: 1 }).lean()
  return serialize<CategoryData[]>(docs)
}

/** Single category by its slug (the URL key). */
export async function getCategoryBySlug(slug: string): Promise<CategoryData | null> {
  await connectDB()
  const doc = await Category.findOne({ slug: slug.toLowerCase() }).lean()
  return doc ? serialize<CategoryData>(doc) : null
}

/** Products belonging to a category slug, ordered by `order` then name. */
export async function getProductsByCategory(slug: string): Promise<ProductData[]> {
  await connectDB()
  const docs = await Product.find({ category: slug.toLowerCase() })
    .sort({ order: 1, name: 1 })
    .lean()
  return serialize<ProductData[]>(docs)
}

/** A category together with its products — one round-trip for the category page. */
export async function getCategoryWithProducts(
  slug: string
): Promise<CategoryWithProducts | null> {
  await connectDB()
  const key = slug.toLowerCase()
  const [category, products] = await Promise.all([
    Category.findOne({ slug: key }).lean(),
    Product.find({ category: key }).sort({ order: 1, name: 1 }).lean(),
  ])
  if (!category) return null
  return {
    ...serialize<CategoryData>(category),
    products: serialize<ProductData[]>(products),
  }
}

/** One product, scoped to its category slug. */
export async function getProduct(
  categorySlug: string,
  productSlug: string
): Promise<ProductData | null> {
  await connectDB()
  const doc = await Product.findOne({
    category: categorySlug.toLowerCase(),
    slug: productSlug.toLowerCase(),
  }).lean()
  return doc ? serialize<ProductData>(doc) : null
}

/** Related products in the same category (excludes the given product). */
export async function getRelatedProducts(
  categorySlug: string,
  excludeSlug: string,
  limit = 4
): Promise<ProductData[]> {
  await connectDB()
  const docs = await Product.find({
    category: categorySlug.toLowerCase(),
    slug: { $ne: excludeSlug.toLowerCase() },
  })
    .sort({ order: 1, name: 1 })
    .limit(limit)
    .lean()
  return serialize<ProductData[]>(docs)
}

/** Every product (used for sitemap / cross-category needs). */
export async function getAllProducts(): Promise<ProductData[]> {
  await connectDB()
  const docs = await Product.find().sort({ category: 1, order: 1 }).lean()
  return serialize<ProductData[]>(docs)
}
