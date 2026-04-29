import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/jwt'
import { connectDB } from '@/lib/db'
import Admin from '@/lib/models/Admin'

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('rawat_admin_token')?.value
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const payload = await verifyToken(token)
    await connectDB()
    const admin = await Admin.findById(payload.id).select('-password')

    if (!admin) return NextResponse.json({ error: 'Admin not found' }, { status: 404 })

    return NextResponse.json({ admin })
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}
