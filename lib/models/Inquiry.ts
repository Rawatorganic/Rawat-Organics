import mongoose, { Schema, Document, Model } from 'mongoose'

export type InquiryStatus = 'new' | 'read' | 'replied'

export interface IInquiry extends Document {
  name: string
  email: string
  phone?: string
  product?: string
  message: string
  status: InquiryStatus
  createdAt: Date
  updatedAt: Date
}

const InquirySchema = new Schema<IInquiry>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, default: '' },
    product: { type: String, default: '' },
    message: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['new', 'read', 'replied'],
      default: 'new',
    },
  },
  { timestamps: true }
)

const Inquiry: Model<IInquiry> =
  mongoose.models.Inquiry ?? mongoose.model<IInquiry>('Inquiry', InquirySchema)

export default Inquiry
