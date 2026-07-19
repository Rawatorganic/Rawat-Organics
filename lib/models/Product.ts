import mongoose, { Schema, Document, Model } from 'mongoose'
import type { ProductTag } from '@/lib/catalog-types'

export interface IProduct extends Document {
  productId: string
  category: string // category slug
  slug: string
  name: string
  tagline: string
  description: string
  longDescription: string
  tags: ProductTag[]
  color: string
  primaryImage: string
  images: string[]
  order: number
  createdAt: Date
  updatedAt: Date
}

const ProductSchema = new Schema<IProduct>(
  {
    productId: { type: String, required: true, unique: true, trim: true },
    category: { type: String, required: true, lowercase: true, trim: true, index: true },
    slug: { type: String, required: true, lowercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    tagline: { type: String, default: '' },
    description: { type: String, default: '' },
    longDescription: { type: String, default: '' },
    tags: {
      type: [String],
      enum: ['spicy', 'sweet', 'earthy', 'aromatic'],
      default: [],
    },
    color: { type: String, default: '#B45309' },
    primaryImage: { type: String, default: '' },
    images: { type: [String], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

// A slug is unique within its category (so two categories may both have "cumin").
ProductSchema.index({ category: 1, slug: 1 }, { unique: true })

const Product: Model<IProduct> =
  mongoose.models.Product ?? mongoose.model<IProduct>('Product', ProductSchema)

export default Product
