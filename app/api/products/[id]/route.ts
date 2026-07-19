import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Product from '@/lib/models/Product'
import Category from '@/lib/models/Category'
import { getAdminFromRequest } from '@/lib/auth-guard'
import { PRODUCT_TAGS } from '@/lib/catalog-types'

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

    const current = await Product.findById(params.id)
    if (!current) return NextResponse.json({ error: 'Product not found' }, { status: 404 })

    const update: Record<string, unknown> = {}
    for (const key of ['name', 'tagline', 'description', 'longDescription', 'color', 'primaryImage'] as const) {
      if (body[key] !== undefined) update[key] = body[key]
    }
    if (body.order !== undefined) update.order = Number(body.order) || 0
    if (Array.isArray(body.images)) update.images = body.images.filter(Boolean)
    if (Array.isArray(body.tags)) {
      update.tags = body.tags.filter((t: string) => PRODUCT_TAGS.includes(t as never))
    }

    // Moving to a different category
    let targetCategory = current.category
    if (body.category !== undefined && body.category.toLowerCase() !== current.category) {
      const cat = await Category.findOne({ slug: body.category.toLowerCase() })
      if (!cat) return NextResponse.json({ error: 'Target category does not exist' }, { status: 400 })
      targetCategory = cat.slug
      update.category = cat.slug
    }

    // Slug change / category move → ensure no clash within the (new) category
    const nextSlug = body.slug !== undefined ? slugify(body.slug) : current.slug
    if (nextSlug !== current.slug || targetCategory !== current.category) {
      const clash = await Product.findOne({
        category: targetCategory,
        slug: nextSlug,
        _id: { $ne: params.id },
      })
      if (clash) {
        return NextResponse.json(
          { error: `Slug "${nextSlug}" already exists in that category.` },
          { status: 409 }
        )
      }
      update.slug = nextSlug
    }

    const product = await Product.findByIdAndUpdate(params.id, update, { new: true }).lean()
    return NextResponse.json({ product })
  } catch {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

// ─── DELETE — admin delete ────────────────────────────────────────────────────
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = await getAdminFromRequest(req)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    await connectDB()
    const deleted = await Product.findByIdAndDelete(params.id)
    if (!deleted) return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}
