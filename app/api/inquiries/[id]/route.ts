import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Inquiry from '@/lib/models/Inquiry'
import { verifyToken } from '@/lib/jwt'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = req.cookies.get('rawat_admin_token')?.value
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    await verifyToken(token)

    const { status } = await req.json()
    if (!['new', 'read', 'replied'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    await connectDB()
    const inquiry = await Inquiry.findByIdAndUpdate(
      params.id,
      { status },
      { new: true }
    ).lean()

    if (!inquiry) return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 })

    return NextResponse.json({ success: true, inquiry })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
