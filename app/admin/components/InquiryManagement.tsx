'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

interface Counts { all: number; new: number; read: number; replied: number }

interface ApiResponse {
  inquiries: Inquiry[]
  total: number
  page: number
  totalPages: number
  counts: Counts
}

type Tab = 'all' | InquiryStatus

const STATUS_CONFIG: Record<InquiryStatus, { label: string; dot: string; badge: string; accent: string }> = {
  new:     { label: 'New',     dot: 'bg-amber-400',  badge: 'bg-amber-50 text-amber-700 border-amber-200',  accent: 'bg-amber-400' },
  read:    { label: 'Read',    dot: 'bg-blue-400',   badge: 'bg-blue-50 text-blue-700 border-blue-200',     accent: 'bg-blue-400' },
  replied: { label: 'Replied', dot: 'bg-emerald-400',badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', accent: 'bg-emerald-400' },
}

const LIMIT = 10

export default function InquiryManagement() {
  const [inquiries, setInquiries]       = useState<Inquiry[]>([])
  const [counts, setCounts]             = useState<Counts>({ all: 0, new: 0, read: 0, replied: 0 })
  const [total, setTotal]               = useState(0)
  const [totalPages, setTotalPages]     = useState(1)
  const [page, setPage]                 = useState(1)
  const [tab, setTab]                   = useState<Tab>('all')
  const [search, setSearch]             = useState('')
  const [debouncedSearch, setDebounced] = useState('')
  const [loading, setLoading]           = useState(true)
  const [updatingId, setUpdatingId]     = useState<string | null>(null)
  const [expanded, setExpanded]         = useState<string | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>()

  // Debounce search
  useEffect(() => {
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setDebounced(search)
      setPage(1)
    }, 350)
    return () => clearTimeout(debounceRef.current)
  }, [search])

  const fetchInquiries = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: LIMIT.toString(),
        status: tab,
        search: debouncedSearch,
      })
      const res  = await fetch(`/api/inquiries?${params}`)
      const data: ApiResponse = await res.json()
      setInquiries(data.inquiries)
      setTotal(data.total)
      setTotalPages(data.totalPages)
      setCounts(data.counts)
    } finally {
      setLoading(false)
    }
  }, [page, tab, debouncedSearch])

  useEffect(() => { fetchInquiries() }, [fetchInquiries])

  // Reset page when tab/search changes
  const handleTab = (t: Tab) => { setTab(t); setPage(1) }

  const updateStatus = async (id: string, status: InquiryStatus) => {
    setUpdatingId(id)
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (res.ok) await fetchInquiries()
    } finally {
      setUpdatingId(null)
    }
  }

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: 'all',     label: 'All',     count: counts.all },
    { key: 'new',     label: 'New',     count: counts.new },
    { key: 'read',    label: 'Read',    count: counts.read },
    { key: 'replied', label: 'Replied', count: counts.replied },
  ]

  const tabColor: Record<Tab, string> = {
    all:     'bg-[#0A2416] text-white',
    new:     'bg-amber-500 text-white',
    read:    'bg-blue-500 text-white',
    replied: 'bg-emerald-500 text-white',
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-5">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-[#0A2416]">Inquiries</h1>
            <p className="text-gray-400 text-sm mt-1 font-headline">
              {total > 0 ? `${total} total enquir${total === 1 ? 'y' : 'ies'}` : 'No inquiries found'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.08 }}
        className="relative"
      >
        <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400" style={{ fontSize: '20px' }}>
          search
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email or phone…"
          className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white border border-gray-100 shadow-sm text-sm font-headline text-[#0A2416] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0A2416]/20 transition-all"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>close</span>
          </button>
        )}
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.14 }}
        className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
      >
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => handleTab(t.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-headline font-semibold text-sm whitespace-nowrap transition-all duration-200 ${
              tab === t.key
                ? `${tabColor[t.key]} shadow-sm`
                : 'bg-white text-gray-500 border border-gray-100 hover:border-gray-200 hover:text-[#0A2416]'
            }`}
          >
            {t.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-lg font-extrabold ${
              tab === t.key ? 'bg-white/20' : 'bg-gray-100 text-gray-500'
            }`}>
              {t.count}
            </span>
          </button>
        ))}
      </motion.div>

      {/* Table / Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3.5 bg-gray-100 rounded-full w-1/4" />
                    <div className="h-3 bg-gray-100 rounded-full w-1/3" />
                  </div>
                  <div className="h-6 w-16 bg-gray-100 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : inquiries.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center border border-gray-100 shadow-sm">
            <span className="material-symbols-outlined text-gray-200 block mb-3" style={{ fontSize: '56px', fontVariationSettings: "'FILL' 1" }}>inbox</span>
            <p className="font-headline font-bold text-gray-400 text-lg">No inquiries found</p>
            {(search || tab !== 'all') && (
              <button
                onClick={() => { setSearch(''); setTab('all') }}
                className="mt-3 text-sm font-headline text-[#0A2416] underline underline-offset-2"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-50">
                    {['Customer', 'Contact', 'Product', 'Message', 'Status', 'Date', ''].map((h) => (
                      <th key={h} className="text-left text-[10px] font-headline font-bold text-gray-400 uppercase tracking-widest px-5 py-4 first:pl-6">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <AnimatePresence mode="popLayout">
                    {inquiries.map((inq, i) => {
                      const cfg = STATUS_CONFIG[inq.status]
                      const isExpanded = expanded === inq._id
                      return (
                        <motion.tr
                          key={inq._id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.25, delay: i * 0.04 }}
                          className="hover:bg-[#F7F5F0]/60 transition-colors group"
                        >
                          {/* Customer */}
                          <td className="px-5 pl-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-[#0A2416]/10 flex items-center justify-center flex-shrink-0">
                                <span className="font-headline font-extrabold text-[#0A2416] text-sm">
                                  {inq.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div className="min-w-0">
                                <p className="font-headline font-semibold text-[#0A2416] text-sm truncate max-w-[120px]">{inq.name}</p>
                              </div>
                            </div>
                          </td>

                          {/* Contact */}
                          <td className="px-5 py-4">
                            <p className="text-gray-500 text-xs truncate max-w-[140px]">{inq.email}</p>
                            {inq.phone && <p className="text-gray-400 text-xs mt-0.5">{inq.phone}</p>}
                          </td>

                          {/* Product */}
                          <td className="px-5 py-4">
                            {inq.product ? (
                              <span className="text-xs font-headline bg-[#0A2416]/8 text-[#0A2416] px-2.5 py-1 rounded-full truncate max-w-[100px] block">
                                {inq.product.replace(/_/g, ' ')}
                              </span>
                            ) : (
                              <span className="text-gray-300 text-xs">—</span>
                            )}
                          </td>

                          {/* Message */}
                          <td className="px-5 py-4 max-w-[180px]">
                            <p
                              className={`text-gray-500 text-xs leading-relaxed cursor-pointer ${isExpanded ? '' : 'line-clamp-2'}`}
                              onClick={() => setExpanded(isExpanded ? null : inq._id)}
                            >
                              {inq.message}
                            </p>
                            {inq.message.length > 80 && (
                              <button
                                onClick={() => setExpanded(isExpanded ? null : inq._id)}
                                className="text-[10px] font-headline text-[#0A2416]/50 hover:text-[#0A2416] mt-0.5"
                              >
                                {isExpanded ? 'less' : 'more'}
                              </button>
                            )}
                          </td>

                          {/* Status */}
                          <td className="px-5 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-headline font-bold border ${cfg.badge}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                              {cfg.label}
                            </span>
                          </td>

                          {/* Date */}
                          <td className="px-5 py-4">
                            <p className="text-gray-400 text-xs font-headline whitespace-nowrap">
                              {new Date(inq.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })}
                            </p>
                          </td>

                          {/* Actions */}
                          <td className="px-5 pr-6 py-4">
                            <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                              {inq.status !== 'read' && (
                                <button
                                  onClick={() => updateStatus(inq._id, 'read')}
                                  disabled={updatingId === inq._id}
                                  title="Mark Read"
                                  className="w-8 h-8 rounded-lg border border-blue-200 text-blue-500 hover:bg-blue-50 flex items-center justify-center transition-colors disabled:opacity-40"
                                >
                                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>drafts</span>
                                </button>
                              )}
                              {inq.status !== 'replied' && (
                                <button
                                  onClick={() => updateStatus(inq._id, 'replied')}
                                  disabled={updatingId === inq._id}
                                  title="Mark Replied"
                                  className="w-8 h-8 rounded-lg border border-emerald-200 text-emerald-600 hover:bg-emerald-50 flex items-center justify-center transition-colors disabled:opacity-40"
                                >
                                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>reply</span>
                                </button>
                              )}
                            </div>
                          </td>
                        </motion.tr>
                      )
                    })}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              <AnimatePresence mode="popLayout">
                {inquiries.map((inq, i) => {
                  const cfg = STATUS_CONFIG[inq.status]
                  return (
                    <motion.div
                      key={inq._id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.25, delay: i * 0.05 }}
                      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                    >
                      <div className={`h-1 ${cfg.accent}`} />
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#0A2416]/10 flex items-center justify-center flex-shrink-0">
                              <span className="font-headline font-extrabold text-[#0A2416]">
                                {inq.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="font-headline font-bold text-[#0A2416] text-sm">{inq.name}</p>
                              <p className="text-gray-400 text-xs">{inq.email}</p>
                            </div>
                          </div>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-headline font-bold border flex-shrink-0 ${cfg.badge}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                            {cfg.label}
                          </span>
                        </div>

                        {(inq.phone || inq.product) && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {inq.phone && (
                              <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full">
                                <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>phone</span>
                                {inq.phone}
                              </span>
                            )}
                            {inq.product && (
                              <span className="inline-flex items-center gap-1 text-xs text-[#0A2416] bg-[#0A2416]/8 px-2.5 py-1 rounded-full font-headline font-semibold">
                                <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>eco</span>
                                {inq.product.replace(/_/g, ' ')}
                              </span>
                            )}
                          </div>
                        )}

                        <p className="text-gray-500 text-sm leading-relaxed bg-[#F7F5F0] rounded-xl p-3 mb-4">
                          {inq.message}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className="text-gray-300 text-xs font-headline">
                            {new Date(inq.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                          <div className="flex gap-2">
                            {inq.status !== 'read' && (
                              <button
                                onClick={() => updateStatus(inq._id, 'read')}
                                disabled={updatingId === inq._id}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-blue-200 text-blue-600 hover:bg-blue-50 text-xs font-headline font-semibold transition-all disabled:opacity-40"
                              >
                                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>drafts</span>
                                Read
                              </button>
                            )}
                            {inq.status !== 'replied' && (
                              <button
                                onClick={() => updateStatus(inq._id, 'replied')}
                                disabled={updatingId === inq._id}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-200 text-emerald-600 hover:bg-emerald-50 text-xs font-headline font-semibold transition-all disabled:opacity-40"
                              >
                                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>reply</span>
                                Replied
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </>
        )}
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-between gap-4 flex-wrap"
        >
          <p className="text-gray-400 text-xs font-headline">
            Showing {((page - 1) * LIMIT) + 1}–{Math.min(page * LIMIT, total)} of {total}
          </p>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || loading}
              className="w-9 h-9 rounded-xl bg-white border border-gray-100 text-gray-500 hover:bg-[#F7F5F0] disabled:opacity-30 flex items-center justify-center transition-all"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chevron_left</span>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
              .reduce<(number | '...')[]>((acc, p, idx, arr) => {
                if (idx > 0 && typeof arr[idx - 1] === 'number' && (p as number) - (arr[idx - 1] as number) > 1) {
                  acc.push('...')
                }
                acc.push(p)
                return acc
              }, [])
              .map((p, i) =>
                p === '...' ? (
                  <span key={`dots-${i}`} className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm">…</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p as number)}
                    disabled={loading}
                    className={`w-9 h-9 rounded-xl font-headline font-bold text-sm transition-all ${
                      page === p
                        ? 'bg-[#0A2416] text-white shadow-sm'
                        : 'bg-white border border-gray-100 text-gray-500 hover:bg-[#F7F5F0]'
                    }`}
                  >
                    {p}
                  </button>
                )
              )}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || loading}
              className="w-9 h-9 rounded-xl bg-white border border-gray-100 text-gray-500 hover:bg-[#F7F5F0] disabled:opacity-30 flex items-center justify-center transition-all"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chevron_right</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
