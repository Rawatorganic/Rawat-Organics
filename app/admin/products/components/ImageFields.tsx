'use client'

import { useState } from 'react'
import Image from 'next/image'
import CropperModal from './CropperModal'

// ─── Single image (banner / primary) ─────────────────────────────────────────
interface ImageFieldProps {
  label: string
  value: string
  onChange: (url: string) => void
  aspectRatio?: number
  prefix?: string
  hint?: string
}

export function ImageField({ label, value, onChange, aspectRatio, prefix, hint }: ImageFieldProps) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <label className="block text-xs font-headline font-bold text-gray-500 uppercase tracking-widest mb-2">
        {label}
      </label>

      {value ? (
        <div className="relative group rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
          <div className="relative w-full" style={{ aspectRatio: aspectRatio ?? 16 / 9 }}>
            <Image src={value} alt={label} fill className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="px-4 py-2 bg-white text-[#0A2416] rounded-full text-xs font-headline font-bold hover:scale-105 transition-transform"
            >
              Change
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              className="px-4 py-2 bg-red-500 text-white rounded-full text-xs font-headline font-bold hover:scale-105 transition-transform"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="w-full rounded-2xl border-2 border-dashed border-gray-200 hover:border-[#0A2416]/40 hover:bg-[#0A2416]/[0.02] transition-all py-10 flex flex-col items-center gap-2 text-gray-400 hover:text-[#0A2416]"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>add_photo_alternate</span>
          <span className="text-sm font-headline font-semibold">Upload image</span>
        </button>
      )}

      {hint && <p className="text-gray-400 text-xs mt-1.5">{hint}</p>}

      <CropperModal
        open={open}
        onClose={() => setOpen(false)}
        onUploaded={onChange}
        aspectRatio={aspectRatio}
        prefix={prefix}
        title={`Upload ${label}`}
      />
    </div>
  )
}

// ─── Gallery (multiple images) ────────────────────────────────────────────────
interface GalleryFieldProps {
  label: string
  value: string[]
  onChange: (urls: string[]) => void
  aspectRatio?: number
  prefix?: string
  hint?: string
}

export function GalleryField({ label, value, onChange, aspectRatio, prefix, hint }: GalleryFieldProps) {
  const [open, setOpen] = useState(false)

  const add = (url: string) => onChange([...value, url])
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i))
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir
    if (j < 0 || j >= value.length) return
    const next = [...value]
    ;[next[i], next[j]] = [next[j], next[i]]
    onChange(next)
  }

  return (
    <div>
      <label className="block text-xs font-headline font-bold text-gray-500 uppercase tracking-widest mb-2">
        {label}
      </label>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {value.map((url, i) => (
          <div key={`${url}-${i}`} className="relative group rounded-xl overflow-hidden border border-gray-200 bg-gray-50 aspect-square">
            <Image src={url} alt={`${label} ${i + 1}`} fill className="object-cover" />
            <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5">
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  className="w-7 h-7 rounded-lg bg-white/90 text-[#0A2416] flex items-center justify-center disabled:opacity-30"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_left</span>
                </button>
                <button
                  type="button"
                  onClick={() => move(i, 1)}
                  disabled={i === value.length - 1}
                  className="w-7 h-7 rounded-lg bg-white/90 text-[#0A2416] flex items-center justify-center disabled:opacity-30"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_right</span>
                </button>
              </div>
              <button
                type="button"
                onClick={() => remove(i)}
                className="px-3 py-1 bg-red-500 text-white rounded-full text-[10px] font-headline font-bold"
              >
                Remove
              </button>
            </div>
            {i === 0 && (
              <span className="absolute top-1.5 left-1.5 px-2 py-0.5 bg-[#0A2416] text-white text-[9px] font-headline font-bold rounded-full">
                Cover
              </span>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="aspect-square rounded-xl border-2 border-dashed border-gray-200 hover:border-[#0A2416]/40 hover:bg-[#0A2416]/[0.02] transition-all flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-[#0A2416]"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>add</span>
          <span className="text-[10px] font-headline font-semibold">Add</span>
        </button>
      </div>

      {hint && <p className="text-gray-400 text-xs mt-1.5">{hint}</p>}

      <CropperModal
        open={open}
        onClose={() => setOpen(false)}
        onUploaded={add}
        aspectRatio={aspectRatio}
        prefix={prefix}
        title={`Add to ${label}`}
      />
    </div>
  )
}
