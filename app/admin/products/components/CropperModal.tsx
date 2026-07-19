'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ImageCropper, type CropResult, type CropperError } from 'react-image-cropper-byjayesh'
import { useScrollLock } from '@/lib/useScrollLock'

interface Props {
  open: boolean
  onClose: () => void
  onUploaded: (url: string) => void
  aspectRatio?: number
  prefix?: string
  title?: string
}

// Matches the admin theme (deep green + cream).
const CROPPER_THEME = {
  primary: '#0A2416',
  secondary: '#F4F0E8',
  accent: '#1f5135',
  overlay: 'rgba(10, 36, 22, 0.55)',
  handleColor: '#0A2416',
  handleBorder: '#ffffff',
  gridColor: 'rgba(255,255,255,0.5)',
  text: '#1F1A14',
  background: '#ffffff',
  borderRadius: 14,
}

export default function CropperModal({
  open,
  onClose,
  onUploaded,
  aspectRatio,
  prefix = 'img',
  title = 'Upload & Crop Image',
}: Props) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useScrollLock(open)
  useEffect(() => setMounted(true), [])

  const handleComplete = async (result: CropResult) => {
    setError(null)
    setUploading(true)
    try {
      const ext = result.blob.type.split('/')[1] || 'webp'
      const file = new File([result.blob], `${prefix}.${ext}`, { type: result.blob.type })
      const form = new FormData()
      form.append('file', file)
      form.append('prefix', prefix)

      const res = await fetch('/api/upload', { method: 'POST', body: form })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Upload failed')
        return
      }
      onUploaded(data.url)
      onClose()
    } catch {
      setError('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleCropperError = (err: CropperError) => setError(err.message)

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center p-4 overflow-y-auto bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl my-8 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h3 className="font-headline font-extrabold text-[#0A2416]">{title}</h3>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>close</span>
              </button>
            </div>

            {/* Body */}
            <div className="p-5">
              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-xl mb-4 text-sm">
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>error</span>
                  {error}
                </div>
              )}

              <ImageCropper
                aspectRatio={aspectRatio}
                cropShape="rect"
                showDropzone
                showControls
                showGrid
                outputType="image/webp"
                outputQuality={0.9}
                maxSizeMB={8}
                height={320}
                theme={CROPPER_THEME}
                onComplete={handleComplete}
                onError={handleCropperError}
              />

              {uploading && (
                <div className="flex items-center justify-center gap-2 mt-4 text-sm font-headline text-[#0A2416]">
                  <span className="w-4 h-4 border-2 border-[#0A2416]/30 border-t-[#0A2416] rounded-full animate-spin" />
                  Uploading…
                </div>
              )}

              <p className="text-gray-400 text-xs text-center mt-3">
                Drop an image or click to browse · then crop and hit “Crop &amp; Upload”.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
