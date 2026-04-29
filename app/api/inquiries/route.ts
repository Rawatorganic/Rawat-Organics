import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Inquiry from '@/lib/models/Inquiry'
import { verifyToken } from '@/lib/jwt'

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('rawat_admin_token')?.value
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    await verifyToken(token)

    await connectDB()
    const inquiries = await Inquiry.find().sort({ createdAt: -1 }).lean()
    return NextResponse.json({ inquiries })
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, product, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 })
    }

    await connectDB()
    const inquiry = await Inquiry.create({ name, email, phone, product, message })
    return NextResponse.json({ success: true, id: inquiry._id }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
