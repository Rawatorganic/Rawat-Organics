import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Category from '@/lib/models/Category'
import Product from '@/lib/models/Product'
import { getAdminFromRequest } from '@/lib/auth-guard'

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// ─── PATCH — admin update ─────────────────────────────────────────────────────
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = await getAdminFromRequest(req)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    await connectDB()
    const body = await req.json()

    const update: Record<string, unknown> = {}
    for (const key of ['name', 'eyebrow', 'punchline', 'description', 'bannerImage', 'badge', 'badgeIcon'] as const) {
      if (body[key] !== undefined) update[key] = body[key]
    }
    if (body.index !== undefined) update.index = Number(body.index) || 0

    const current = await Category.findById(params.id)
    if (!current) return NextResponse.json({ error: 'Category not found' }, { status: 404 })

    // If slug changes, re-key the products that point at the old slug.
    if (body.slug !== undefined) {
      const newSlug = slugify(body.slug)
      if (newSlug && newSlug !== current.slug) {
        const clash = await Category.findOne({ slug: newSlug, _id: { $ne: params.id } })
        if (clash) {
          return NextResponse.json(
            { error: `Slug "${newSlug}" is already in use.` },
            { status: 409 }
          )
        }
        await Product.updateMany({ category: current.slug }, { category: newSlug })
        update.slug = newSlug
      }
    }

    const category = await Category.findByIdAndUpdate(params.id, update, { new: true }).lean()
    return NextResponse.json({ category })
  } catch {
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 })
  }
}

// ─── DELETE — admin delete (cascades to products) ─────────────────────────────
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = await getAdminFromRequest(req)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    await connectDB()
    const category = await Category.findById(params.id)
    if (!category) return NextResponse.json({ error: 'Category not found' }, { status: 404 })

    await Product.deleteMany({ category: category.slug })
    await category.deleteOne()

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 })
  }
}
