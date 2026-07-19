import 'dotenv/config'
import mongoose from 'mongoose'
import { WHOLE_SPICES, POWDER_SPICES } from '../lib/constants'

const MONGODB_URI = process.env.MONGODB_URI as string

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not set in environment')
  process.exit(1)
}

// ─── Inline schemas (kept self-contained for ts-node) ─────────────────────────
const CategorySchema = new mongoose.Schema(
  {
    index: Number,
    name: String,
    slug: { type: String, unique: true, lowercase: true },
    eyebrow: String,
    punchline: String,
    description: String,
    bannerImage: String,
    badge: String,
    badgeIcon: String,
  },
  { timestamps: true }
)

const ProductSchema = new mongoose.Schema(
  {
    productId: { type: String, unique: true },
    category: { type: String, lowercase: true, index: true },
    slug: { type: String, lowercase: true },
    name: String,
    tagline: String,
    description: String,
    longDescription: String,
    tags: [String],
    color: String,
    primaryImage: String,
    images: [String],
    order: Number,
  },
  { timestamps: true }
)
ProductSchema.index({ category: 1, slug: 1 }, { unique: true })

// ─── Category metadata ────────────────────────────────────────────────────────
const CATEGORY_SEED = [
  {
    index: 0,
    name: 'Whole Spices',
    slug: 'whole-spices',
    eyebrow: 'Our Whole Spices',
    punchline: 'Pure & Unaltered.',
    description:
      'Unground and aromatic, our whole spices are preserved in their natural form — offering intense, authentic flavors and maximum shelf life.',
    bannerImage: '/products/spices-variety.png',
    badge: 'Best Sellers',
    badgeIcon: 'star',
  },
  {
    index: 1,
    name: 'Powder Spices',
    slug: 'powder-spices',
    eyebrow: 'Our Powder Spices',
    punchline: 'Finely Ground Heritage.',
    description:
      'Finely ground, vibrant, and potent — our spice powders blend seamlessly to create bold color and deep flavor in every dish.',
    bannerImage: '/products/turmeric.png',
    badge: 'Premium',
    badgeIcon: 'workspace_premium',
  },
]

async function seed() {
  await mongoose.connect(MONGODB_URI)
  console.log('Connected to MongoDB')

  const Category = mongoose.models.Category ?? mongoose.model('Category', CategorySchema)
  const Product = mongoose.models.Product ?? mongoose.model('Product', ProductSchema)

  // Categories (upsert by slug)
  for (const cat of CATEGORY_SEED) {
    await Category.updateOne({ slug: cat.slug }, { $set: cat }, { upsert: true })
  }
  console.log(`Seeded ${CATEGORY_SEED.length} categories`)

  // Products (upsert by productId), order = position in source array
  const all = [...WHOLE_SPICES, ...POWDER_SPICES]
  let count = 0
  for (let i = 0; i < all.length; i++) {
    const p = all[i]
    await Product.updateOne(
      { productId: p.productId },
      {
        $set: {
          productId: p.productId,
          category: p.category,
          slug: p.slug,
          name: p.name,
          tagline: p.tagline,
          description: p.description,
          longDescription: p.longDescription,
          tags: p.tags,
          color: p.color,
          primaryImage: p.primaryImage,
          images: p.images,
          order: i,
        },
      },
      { upsert: true }
    )
    count++
  }
  console.log(`Seeded ${count} products`)

  await mongoose.disconnect()
  console.log('Done.')
}

seed().catch((err) => {
  console.error('Catalog seed failed:', err)
  process.exit(1)
})
