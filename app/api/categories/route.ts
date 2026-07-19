import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Category from '@/lib/models/Category'
import { getAdminFromRequest } from '@/lib/auth-guard'

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// ─── GET — public list ────────────────────────────────────────────────────────
export async function GET() {
  try {
    await connectDB()
    const categories = await Category.find().sort({ index: 1, name: 1 }).lean()
    return NextResponse.json({ categories })
  } catch {
    return NextResponse.json({ error: 'Failed to load categories' }, { status: 500 })
  }
}

// ─── POST — admin create ──────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const admin = await getAdminFromRequest(req)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { name, description, punchline, eyebrow, bannerImage, badge, badgeIcon } = body
    let { slug, index } = body

    if (!name) {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 })
    }

    slug = slug ? slugify(slug) : slugify(name)
    if (!slug) {
      return NextResponse.json({ error: 'Invalid slug' }, { status: 400 })
    }

    const exists = await connectDB().then(() => Category.findOne({ slug }))
    if (exists) {
      return NextResponse.json(
        { error: `A category with slug "${slug}" already exists.` },
        { status: 409 }
      )
    }

    if (index === undefined || index === null || index === '') {
      index = await Category.countDocuments()
    }

    const category = await Category.create({
      name,
      slug,
      index: Number(index) || 0,
      eyebrow: eyebrow || `Our ${name}`,
      punchline: punchline || '',
      description: description || '',
      bannerImage: bannerImage || '',
      badge: badge || '',
      badgeIcon: badgeIcon || '',
    })

    return NextResponse.json({ category }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })
  }
}
