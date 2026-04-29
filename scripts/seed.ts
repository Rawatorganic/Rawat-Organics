import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const MONGODB_URI = process.env.MONGODB_URI as string

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not set in environment')
  process.exit(1)
}

const AdminSchema = new mongoose.Schema(
  {
    username: String,
    email: { type: String, unique: true, lowercase: true },
    password: String,
    phone: { type: String, default: '' },
    role: { type: String, default: 'admin' },
  },
  { timestamps: true }
)

async function seed() {
  await mongoose.connect(MONGODB_URI)
  console.log('Connected to MongoDB')

  const Admin = mongoose.models.Admin ?? mongoose.model('Admin', AdminSchema)

  const existing = await Admin.findOne({ email: 'admin@rawatorganics.com' })
  if (existing) {
    console.log('Admin already exists — skipping seed')
    await mongoose.disconnect()
    return
  }

  const hashed = await bcrypt.hash('Admin@123456', 12)
  await Admin.create({
    username: 'admin',
    email: 'admin@rawatorganics.com',
    password: hashed,
    phone: '',
    role: 'superadmin',
  })

  console.log('Admin seeded: admin@rawatorganics.com / Admin@123456')
  await mongoose.disconnect()
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
