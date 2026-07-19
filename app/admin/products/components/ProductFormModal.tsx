'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ImageField, GalleryField } from './ImageFields'
import { PRODUCT_TAGS, type CategoryData, type ProductData, type ProductTag } from '@/lib/catalog-types'
import { useScrollLock } from '@/lib/useScrollLock'

interface Props {
  open: boolean
  onClose: () => void
  onSaved: () => void
  categories: CategoryData[]
  defaultCategory?: string
  product?: ProductData | null
}

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A2416] focus:ring-2 focus:ring-[#0A2416]/10 outline-none text-sm text-[#1F1A14] placeholder:text-gray-300 transition-all'

const labelClass =
  'block text-xs font-headline font-bold text-gray-500 uppercase tracking-widest mb-2'

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function ProductFormModal({
  open,
  onClose,
  onSaved,
  categories,
  defaultCategory,
  product,
}: Props) {
  const isEdit = !!product
  const [form, setForm] = useState({
    name: '',
    slug: '',
    category: defaultCategory ?? categories[0]?.slug ?? '',
    tagline: '',
    description: '',
    longDescription: '',
    color: '#B45309',
    primaryImage: '',
    images: [] as string[],
    tags: [] as ProductTag[],
    order: 0,
  })
  const [slugTouched, setSlugTouched] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useScrollLock(open)

  useEffect(() => {
    if (!open) return
    setError('')
    setSlugTouched(isEdit)
    if (product) {
      setForm({
        name: product.name,
        slug: product.slug,
        category: product.category,
        tagline: product.tagline ?? '',
        description: product.description ?? '',
        longDescription: product.longDescription ?? '',
        color: product.color ?? '#B45309',
        primaryImage: product.primaryImage ?? '',
        images: product.images ?? [],
        tags: product.tags ?? [],
        order: product.order ?? 0,
      })
    } else {
      setForm((p) => ({
        ...p,
        name: '', slug: '', tagline: '', description: '', longDescription: '',
        color: '#B45309', primaryImage: '', images: [], tags: [], order: 0,
        category: defaultCategory ?? categories[0]?.slug ?? '',
      }))
    }
  }, [open, product, isEdit, defaultCategory, categories])

  const set = (k: keyof typeof form, v: unknown) => setForm((p) => ({ ...p, [k]: v }))

  const handleName = (v: string) =>
    setForm((p) => ({ ...p, name: v, slug: slugTouched ? p.slug : slugify(v) }))

  const toggleTag = (t: ProductTag) =>
    setForm((p) => ({
      ...p,
      tags: p.tags.includes(t) ? p.tags.filter((x) => x !== t) : [...p.tags, t],
    }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!form.name.trim()) return setError('Product name is required')
    if (!form.category) return setError('Please select a category')

    // Ensure a primary image (fall back to first gallery image)
    const primaryImage = form.primaryImage || form.images[0] || ''
    const images = form.images.length ? form.images : primaryImage ? [primaryImage] : []

    setSaving(true)
    try {
      const url = isEdit ? `/api/products/${product!._id}` : '/api/products'
      const res = await fetch(url, {
        method: isEdit ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, primaryImage, images }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Failed to save')
        return
      }
      onSaved()
      onClose()
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-start justify-center p-4 overflow-y-auto bg-black/55 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl my-8 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h3 className="font-headline font-extrabold text-[#0A2416] text-lg">
                {isEdit ? 'Edit Product' : 'Add Product'}
              </h3>
              <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400">
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>close</span>
              </button>
            </div>

            <form onSubmit={submit} className="p-6 space-y-5">
              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-xl text-sm">
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>error</span>
                  {error}
                </div>
              )}

              <ImageField
                label="Primary Image"
                value={form.primaryImage}
                onChange={(url) => set('primaryImage', url)}
                aspectRatio={1}
                prefix={`prod-${form.slug || 'primary'}`}
                hint="Main thumbnail shown in listings. Square recommended."
              />

              <GalleryField
                label="Gallery Images (slider)"
                value={form.images}
                onChange={(urls) => set('images', urls)}
                aspectRatio={4 / 3}
                prefix={`prod-${form.slug || 'gallery'}`}
                hint="Shown in the product detail slider. First image is the cover."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Product Name *</label>
                  <input className={inputClass} value={form.name} onChange={(e) => handleName(e.target.value)} placeholder="Cumin" />
                </div>
                <div>
                  <label className={labelClass}>Slug *</label>
                  <input
                    className={inputClass}
                    value={form.slug}
                    onChange={(e) => { setSlugTouched(true); set('slug', slugify(e.target.value)) }}
                    placeholder="cumin"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Category *</label>
                  <select className={inputClass} value={form.category} onChange={(e) => set('category', e.target.value)}>
                    {categories.map((c) => (
                      <option key={c._id} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Accent Color</label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={form.color} onChange={(e) => set('color', e.target.value)} className="w-12 h-12 rounded-xl border border-gray-200 cursor-pointer p-1" />
                    <input className={inputClass} value={form.color} onChange={(e) => set('color', e.target.value)} placeholder="#B45309" />
                  </div>
                </div>
              </div>

              <div>
                <label className={labelClass}>Tagline</label>
                <input className={inputClass} value={form.tagline} onChange={(e) => set('tagline', e.target.value)} placeholder="The aromatic heartbeat of South Asian cuisine" />
              </div>

              <div>
                <label className={labelClass}>Short Description</label>
                <textarea className={`${inputClass} resize-none`} rows={2} value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="One-line description shown on cards…" />
              </div>

              <div>
                <label className={labelClass}>Long Description</label>
                <textarea className={`${inputClass} resize-none`} rows={4} value={form.longDescription} onChange={(e) => set('longDescription', e.target.value)} placeholder="Full description on the product detail page…" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4">
                <div>
                  <label className={labelClass}>Flavor Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {PRODUCT_TAGS.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => toggleTag(t)}
                        className={`px-4 py-2 rounded-full text-xs font-headline font-bold capitalize border transition-all ${
                          form.tags.includes(t)
                            ? 'bg-[#0A2416] text-white border-[#0A2416]'
                            : 'bg-white text-gray-500 border-gray-200 hover:border-[#0A2416]/40'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Order #</label>
                  <input type="number" className={`${inputClass} w-24`} value={form.order} onChange={(e) => set('order', Number(e.target.value))} />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-headline font-bold text-sm hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-3 rounded-xl bg-[#0A2416] text-white font-headline font-bold text-sm hover:bg-[#0A2416]/90 active:scale-[0.98] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {saving && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                  {isEdit ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
