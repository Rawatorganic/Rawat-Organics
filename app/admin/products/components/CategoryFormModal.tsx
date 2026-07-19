'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ImageField } from './ImageFields'
import type { CategoryData } from '@/lib/catalog-types'
import { useScrollLock } from '@/lib/useScrollLock'

interface Props {
  open: boolean
  onClose: () => void
  onSaved: () => void
  category?: CategoryData | null
}

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A2416] focus:ring-2 focus:ring-[#0A2416]/10 outline-none text-sm text-[#1F1A14] placeholder:text-gray-300 transition-all'

const labelClass =
  'block text-xs font-headline font-bold text-gray-500 uppercase tracking-widest mb-2'

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

const empty = {
  name: '',
  slug: '',
  index: 0,
  eyebrow: '',
  punchline: '',
  description: '',
  bannerImage: '',
  badge: '',
  badgeIcon: '',
}

export default function CategoryFormModal({ open, onClose, onSaved, category }: Props) {
  const isEdit = !!category
  const [form, setForm] = useState({ ...empty })
  const [slugTouched, setSlugTouched] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useScrollLock(open)

  useEffect(() => {
    if (open) {
      setError('')
      setSlugTouched(isEdit)
      setForm(
        category
          ? {
              name: category.name,
              slug: category.slug,
              index: category.index ?? 0,
              eyebrow: category.eyebrow ?? '',
              punchline: category.punchline ?? '',
              description: category.description ?? '',
              bannerImage: category.bannerImage ?? '',
              badge: category.badge ?? '',
              badgeIcon: category.badgeIcon ?? '',
            }
          : { ...empty }
      )
    }
  }, [open, category, isEdit])

  const set = (k: keyof typeof form, v: string | number) => setForm((p) => ({ ...p, [k]: v }))

  const handleName = (v: string) => {
    setForm((p) => ({ ...p, name: v, slug: slugTouched ? p.slug : slugify(v) }))
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!form.name.trim()) return setError('Category name is required')
    setSaving(true)
    try {
      const url = isEdit ? `/api/categories/${category!._id}` : '/api/categories'
      const res = await fetch(url, {
        method: isEdit ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
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
            className="bg-white rounded-3xl shadow-2xl w-full max-w-xl my-8 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h3 className="font-headline font-extrabold text-[#0A2416] text-lg">
                {isEdit ? 'Edit Category' : 'Create Category'}
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
                label="Banner Image"
                value={form.bannerImage}
                onChange={(url) => set('bannerImage', url)}
                aspectRatio={16 / 9}
                prefix={`cat-${form.slug || 'banner'}`}
                hint="Shown as the category page hero & homepage card. 16:9 recommended."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Category Name *</label>
                  <input className={inputClass} value={form.name} onChange={(e) => handleName(e.target.value)} placeholder="Whole Spices" />
                </div>
                <div>
                  <label className={labelClass}>Slug / Key *</label>
                  <input
                    className={inputClass}
                    value={form.slug}
                    onChange={(e) => { setSlugTouched(true); set('slug', slugify(e.target.value)) }}
                    placeholder="whole-spices"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Eyebrow</label>
                  <input className={inputClass} value={form.eyebrow} onChange={(e) => set('eyebrow', e.target.value)} placeholder="Our Whole Spices" />
                </div>
                <div>
                  <label className={labelClass}>Punchline</label>
                  <input className={inputClass} value={form.punchline} onChange={(e) => set('punchline', e.target.value)} placeholder="Pure & Unaltered." />
                </div>
              </div>

              <div>
                <label className={labelClass}>Description</label>
                <textarea
                  className={`${inputClass} resize-none`}
                  rows={3}
                  value={form.description}
                  onChange={(e) => set('description', e.target.value)}
                  placeholder="Short description shown on the category card & hero…"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className={labelClass}>Order #</label>
                  <input type="number" className={inputClass} value={form.index} onChange={(e) => set('index', Number(e.target.value))} />
                </div>
                <div>
                  <label className={labelClass}>Badge</label>
                  <input className={inputClass} value={form.badge} onChange={(e) => set('badge', e.target.value)} placeholder="Best Sellers" />
                </div>
                <div>
                  <label className={labelClass}>Badge Icon</label>
                  <input className={inputClass} value={form.badgeIcon} onChange={(e) => set('badgeIcon', e.target.value)} placeholder="star" />
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
                  {isEdit ? 'Save Changes' : 'Create Category'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
