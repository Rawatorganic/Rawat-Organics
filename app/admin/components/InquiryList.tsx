'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import InquiryCard from './InquiryCard'
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
  initialInquiries: Inquiry[]
}

const FILTERS: { label: string; value: InquiryStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'New', value: 'new' },
  { label: 'Read', value: 'read' },
  { label: 'Replied', value: 'replied' },
]

export default function InquiryList({ initialInquiries }: Props) {
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries)
  const [filter, setFilter] = useState<InquiryStatus | 'all'>('all')

  const handleStatusChange = (id: string, status: InquiryStatus) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq._id === id ? { ...inq, status } : inq))
    )
  }

  const filtered = filter === 'all' ? inquiries : inquiries.filter((i) => i.status === filter)

  const counts = {
    all: inquiries.length,
    new: inquiries.filter((i) => i.status === 'new').length,
    read: inquiries.filter((i) => i.status === 'read').length,
    replied: inquiries.filter((i) => i.status === 'replied').length,
  }

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-headline font-semibold text-xs tracking-widest uppercase transition-all duration-200 border ${
              filter === f.value
                ? 'bg-primary text-primary-fixed border-primary shadow-md'
                : 'bg-white text-on-surface/50 border-outline-variant/40 hover:border-primary/40 hover:text-primary'
            }`}
          >
            {f.label}
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${filter === f.value ? 'bg-primary-fixed/20 text-primary-fixed' : 'bg-outline-variant/20'}`}>
              {counts[f.value]}
            </span>
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <span
            className="material-symbols-outlined text-on-surface/15 mb-4"
            style={{ fontSize: '64px', fontVariationSettings: "'FILL' 1" }}
          >
            inbox
          </span>
          <p className="font-headline font-bold text-on-surface/30 text-lg">No inquiries here</p>
          <p className="text-on-surface/20 text-sm mt-1">
            {filter === 'all' ? 'No inquiries received yet.' : `No ${filter} inquiries.`}
          </p>
        </motion.div>
      ) : (
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          <AnimatePresence>
            {filtered.map((inq) => (
              <InquiryCard
                key={inq._id}
                inquiry={inq}
                onStatusChange={handleStatusChange}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}
