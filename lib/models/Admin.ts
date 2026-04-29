import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IAdmin extends Document {
  username: string
  email: string
  password: string
  phone: string
  role: 'admin' | 'superadmin'
  createdAt: Date
  updatedAt: Date
}

const AdminSchema = new Schema<IAdmin>(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    phone: { type: String, default: '' },
    role: { type: String, enum: ['admin', 'superadmin'], default: 'admin' },
  },
  { timestamps: true }
)

const Admin: Model<IAdmin> =
  mongoose.models.Admin ?? mongoose.model<IAdmin>('Admin', AdminSchema)

export default Admin
