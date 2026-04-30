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

    const { searchParams } = new URL(req.url)
    const page   = Math.max(1, parseInt(searchParams.get('page')  || '1'))
    const limit  = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '10')))
    const status = searchParams.get('status') || 'all'
    const search = searchParams.get('search')?.trim() || ''

    const searchFilter = search
      ? {
          $or: [
            { name:  { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { phone: { $regex: search, $options: 'i' } },
          ],
        }
      : {}

    const query: Record<string, unknown> = { ...searchFilter }
    if (status !== 'all') query.status = status

    const [total, newCount, readCount, repliedCount, inquiries] = await Promise.all([
      Inquiry.countDocuments(query),
      Inquiry.countDocuments({ ...searchFilter, status: 'new' }),
      Inquiry.countDocuments({ ...searchFilter, status: 'read' }),
      Inquiry.countDocuments({ ...searchFilter, status: 'replied' }),
      Inquiry.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
    ])

    return NextResponse.json({
      inquiries,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      counts: {
        all: newCount + readCount + repliedCount,
        new: newCount,
        read: readCount,
        replied: repliedCount,
      },
    })
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
