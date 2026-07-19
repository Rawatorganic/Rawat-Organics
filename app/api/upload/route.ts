import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { getAdminFromRequest } from '@/lib/auth-guard'

export const runtime = 'nodejs'

const ALLOWED = new Set(['image/png', 'image/jpeg', 'image/webp'])
const MAX_BYTES = 8 * 1024 * 1024 // 8 MB

const EXT: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 40) || 'image'
}

export async function POST(req: NextRequest) {
  // Auth — only admins can upload
  const admin = await getAdminFromRequest(req)
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const form = await req.formData()
    const file = form.get('file')
    const prefixRaw = (form.get('prefix') as string) || 'img'

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }
    if (!ALLOWED.has(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Use PNG, JPG or WEBP.' },
        { status: 400 }
      )
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: 'File too large (max 8MB).' }, { status: 400 })
    }

    const bytes = Buffer.from(await file.arrayBuffer())
    const ext = EXT[file.type] ?? 'png'
    const filename = `${slugify(prefixRaw)}-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 7)}.${ext}`

    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    await mkdir(uploadDir, { recursive: true })
    await writeFile(path.join(uploadDir, filename), bytes)

    return NextResponse.json({ url: `/uploads/${filename}` }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
