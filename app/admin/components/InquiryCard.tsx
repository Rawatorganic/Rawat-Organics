'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { InquiryStatus } from '@/lib/models/Inquiry'

interface Inquiry {
  _id: string
  name: string
  email: string
  phone?: string
  product?: string
  message: string
  status: InquiryStatus
  createdAt: string
}

interface Props {
  inquiry: Inquiry
  onStatusChange: (id: string, status: InquiryStatus) => void
}

const statusConfig: Record<InquiryStatus, { label: string; color: string; bg: string; dot: string }> = {
  new: { label: 'New', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200', dot: 'bg-amber-500' },
  read: { label: 'Read', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200', dot: 'bg-blue-500' },
  replied: { label: 'Replied', color: 'text-green-700', bg: 'bg-green-50 border-green-200', dot: 'bg-green-500' },
}

export default function InquiryCard({ inquiry, onStatusChange }: Props) {
  const [updating, setUpdating] = useState(false)
  const cfg = statusConfig[inquiry.status]

  const updateStatus = async (status: InquiryStatus) => {
    if (status === inquiry.status || updating) return
    setUpdating(true)
    try {
      const res = await fetch(`/api/inquiries/${inquiry._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (res.ok) onStatusChange(inquiry._id, status)
    } finally {
      setUpdating(false)
    }
  }

  const date = new Date(inquiry.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-outline-variant/20 hover:shadow-lg transition-shadow duration-300 overflow-hidden"
    >
      {/* Top accent by status */}
      <div className={`h-1 ${inquiry.status === 'new' ? 'bg-amber-400' : inquiry.status === 'read' ? 'bg-blue-400' : 'bg-green-400'}`} />

      <div className="p-6">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="font-headline font-extrabold text-primary text-base">
                {inquiry.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="font-headline font-bold text-primary text-base leading-tight">{inquiry.name}</h3>
              <a
                href={`mailto:${inquiry.email}`}
                className="text-on-surface/50 text-xs hover:text-primary transition-colors"
              >
                {inquiry.email}
              </a>
            </div>
          </div>

          {/* Status badge */}
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-headline font-bold border ${cfg.bg} ${cfg.color}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
            {cfg.label}
          </span>
        </div>

        {/* Meta row: phone + product */}
        {(inquiry.phone || inquiry.product) && (
          <div className="flex flex-wrap gap-3 mb-4">
            {inquiry.phone && (
              <span className="inline-flex items-center gap-1.5 text-xs text-on-surface/50 bg-surface-container-highest/50 px-3 py-1 rounded-full">
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>phone</span>
                {inquiry.phone}
              </span>
            )}
            {inquiry.product && (
              <span className="inline-flex items-center gap-1.5 text-xs text-primary bg-primary/8 px-3 py-1 rounded-full font-headline font-semibold">
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>eco</span>
                {inquiry.product.replace(/_/g, ' ')}
              </span>
            )}
          </div>
        )}

        {/* Message */}
        <p className="text-on-surface/60 text-sm leading-relaxed mb-5 bg-[#f7f5f0] rounded-xl p-4">
          {inquiry.message}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <span className="text-on-surface/30 text-xs font-headline">{date}</span>

          <div className="flex gap-2">
            {inquiry.status !== 'read' && (
              <button
                onClick={() => updateStatus('read')}
                disabled={updating}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-blue-200 text-blue-600 hover:bg-blue-50 text-xs font-headline font-semibold transition-all duration-200 disabled:opacity-50"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>mark_email_read</span>
                Mark Read
              </button>
            )}
            {inquiry.status !== 'replied' && (
              <button
                onClick={() => updateStatus('replied')}
                disabled={updating}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-green-200 text-green-700 hover:bg-green-50 text-xs font-headline font-semibold transition-all duration-200 disabled:opacity-50"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>reply</span>
                Mark Replied
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
