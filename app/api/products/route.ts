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

// ─── GET — public list (optional ?category=slug) ──────────────────────────────
export async function GET(req: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')

    const query: Record<string, unknown> = {}
    if (category) query.category = category.toLowerCase()

    const products = await Product.find(query).sort({ order: 1, name: 1 }).lean()
    return NextResponse.json({ products })
  } catch {
    return NextResponse.json({ error: 'Failed to load products' }, { status: 500 })
  }
}

// ─── POST — admin create ──────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const admin = await getAdminFromRequest(req)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    await connectDB()
    const body = await req.json()
    const {
      name,
      category,
      tagline,
      description,
      longDescription,
      color,
      primaryImage,
      images,
      tags,
    } = body
    let { slug, productId, order } = body

    if (!name || !category) {
      return NextResponse.json(
        { error: 'Product name and category are required' },
        { status: 400 }
      )
    }

    const cat = await Category.findOne({ slug: category.toLowerCase() })
    if (!cat) {
      return NextResponse.json({ error: 'Selected category does not exist' }, { status: 400 })
    }

    slug = slug ? slugify(slug) : slugify(name)
    if (!slug) return NextResponse.json({ error: 'Invalid slug' }, { status: 400 })

    const dup = await Product.findOne({ category: cat.slug, slug })
    if (dup) {
      return NextResponse.json(
        { error: `"${name}" already exists in ${cat.name}.` },
        { status: 409 }
      )
    }

    // productId: caller-supplied or derived → "Whole_Spice_Cumin" style
    if (!productId) {
      const catKey = cat.name.replace(/s$/i, '').replace(/\s+/g, '_')
      productId = `${catKey}_${name.replace(/\s+/g, '_')}`
    }
    const pidClash = await Product.findOne({ productId })
    if (pidClash) productId = `${productId}_${Date.now().toString(36)}`

    const cleanTags = Array.isArray(tags)
      ? tags.filter((t: string) => PRODUCT_TAGS.includes(t as never))
      : []

    const cleanImages = Array.isArray(images) ? images.filter(Boolean) : []

    if (order === undefined || order === null || order === '') {
      order = await Product.countDocuments({ category: cat.slug })
    }

    const product = await Product.create({
      productId,
      category: cat.slug,
      slug,
      name,
      tagline: tagline || '',
      description: description || '',
      longDescription: longDescription || '',
      tags: cleanTags,
      color: color || '#B45309',
      primaryImage: primaryImage || cleanImages[0] || '',
      images: cleanImages.length ? cleanImages : primaryImage ? [primaryImage] : [],
      order: Number(order) || 0,
    })

    return NextResponse.json({ product }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
