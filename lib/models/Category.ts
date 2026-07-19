import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ICategory extends Document {
  index: number
  name: string
  slug: string
  eyebrow: string
  punchline: string
  description: string
  bannerImage: string
  badge?: string
  badgeIcon?: string
  createdAt: Date
  updatedAt: Date
}

const CategorySchema = new Schema<ICategory>(
  {
    index: { type: Number, default: 0 },
    name: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    eyebrow: { type: String, default: '' },
    punchline: { type: String, default: '' },
    description: { type: String, default: '' },
    bannerImage: { type: String, default: '' },
    badge: { type: String, default: '' },
    badgeIcon: { type: String, default: '' },
  },
  { timestamps: true }
)

const Category: Model<ICategory> =
  mongoose.models.Category ?? mongoose.model<ICategory>('Category', CategorySchema)

export default Category
