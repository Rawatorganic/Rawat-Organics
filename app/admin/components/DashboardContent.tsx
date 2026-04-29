'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { InquiryStatus } from '@/lib/models/Inquiry'

interface Stats {
  total: number
  new: number
  read: number
  replied: number
}

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
  stats: Stats
  recentInquiries: Inquiry[]
}

const weeklyTraffic = [
  { day: 'Mon', visitors: 284 },
  { day: 'Tue', visitors: 312 },
  { day: 'Wed', visitors: 198 },
  { day: 'Thu', visitors: 405 },
  { day: 'Fri', visitors: 467 },
  { day: 'Sat', visitors: 523 },
  { day: 'Sun', visitors: 389 },
]
const maxVisitors = Math.max(...weeklyTraffic.map((d) => d.visitors))

const trendingProducts = [
  { name: 'Organic Turmeric Powder', category: 'Powder Spices', views: 847, change: '+12%', positive: true },
  { name: 'Red Chilli Powder',       category: 'Powder Spices', views: 612, change: '+8%',  positive: true },
  { name: 'Cumin Seeds',             category: 'Whole Spices',  views: 589, change: '+15%', positive: true },
  { name: 'Coriander Powder',        category: 'Powder Spices', views: 445, change: '-3%',  positive: false },
  { name: 'Garam Masala Blend',      category: 'Spice Blends',  views: 389, change: '+22%', positive: true },
]

const statusConfig: Record<InquiryStatus, { label: string; dot: string; badge: string }> = {
  new:     { label: 'New',     dot: 'bg-amber-400',  badge: 'bg-amber-50 text-amber-700 border-amber-200' },
  read:    { label: 'Read',    dot: 'bg-blue-400',   badge: 'bg-blue-50 text-blue-700 border-blue-200' },
  replied: { label: 'Replied', dot: 'bg-green-400',  badge: 'bg-green-50 text-green-700 border-green-200' },
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
})

export default function DashboardContent({ stats, recentInquiries }: Props) {
  const totalWeekly = weeklyTraffic.reduce((s, d) => s + d.visitors, 0)

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Page title */}
      <motion.div {...fadeUp(0)}>
        <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-[#0A2416]">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1 font-headline">Welcome back — here's what's happening today.</p>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: 'Total Inquiries', value: stats.total,   icon: 'inbox',            color: 'from-[#0A2416] to-[#1e4028]', text: 'text-white' },
          { label: 'New',            value: stats.new,     icon: 'mark_email_unread', color: 'from-amber-400 to-amber-500',  text: 'text-white' },
          { label: 'Read',           value: stats.read,    icon: 'drafts',            color: 'from-blue-500 to-blue-600',    text: 'text-white' },
          { label: 'Replied',        value: stats.replied, icon: 'reply',             color: 'from-emerald-500 to-emerald-600', text: 'text-white' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            {...fadeUp(0.1 + i * 0.07)}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className={`bg-gradient-to-br ${s.color} rounded-2xl p-4 sm:p-5 shadow-sm`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className={`${s.text} opacity-70 text-xs font-headline font-semibold uppercase tracking-wide`}>{s.label}</p>
                <p className={`${s.text} font-headline font-extrabold text-3xl sm:text-4xl mt-1`}>{s.value}</p>
              </div>
              <div className="bg-white/15 rounded-xl p-2">
                <span className={`material-symbols-outlined ${s.text} opacity-90`} style={{ fontSize: '22px', fontVariationSettings: "'FILL' 1" }}>
                  {s.icon}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Traffic + Trending row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Website Traffic */}
        <motion.div {...fadeUp(0.35)} className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h2 className="font-headline font-bold text-[#0A2416] text-base">Website Traffic</h2>
              <p className="text-gray-400 text-xs mt-0.5">Last 7 days</p>
            </div>
            <div className="text-right">
              <p className="font-headline font-extrabold text-2xl text-[#0A2416]">{totalWeekly.toLocaleString()}</p>
              <span className="inline-flex items-center gap-1 text-xs font-headline font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>trending_up</span>
                +12.3%
              </span>
            </div>
          </div>

          {/* Bar chart */}
          <div className="flex items-end gap-1.5 sm:gap-2 h-28">
            {weeklyTraffic.map((d, i) => (
              <motion.div
                key={d.day}
                className="flex-1 flex flex-col items-center gap-1"
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.06, ease: 'easeOut' }}
                style={{ transformOrigin: 'bottom' }}
              >
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-[#0A2416] to-[#3d7a56] opacity-80 hover:opacity-100 transition-opacity cursor-default"
                  style={{ height: `${(d.visitors / maxVisitors) * 100}%`, minHeight: 8 }}
                  title={`${d.visitors} visitors`}
                />
                <span className="text-[10px] font-headline text-gray-400">{d.day}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
              { label: 'Avg. Daily Visitors', value: Math.round(totalWeekly / 7).toLocaleString() },
              { label: 'Est. Page Views',      value: (totalWeekly * 3.2).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') },
            ].map((m) => (
              <div key={m.label} className="bg-[#F7F5F0] rounded-xl p-3">
                <p className="text-gray-400 text-[10px] font-headline uppercase tracking-wide">{m.label}</p>
                <p className="font-headline font-extrabold text-[#0A2416] text-lg mt-0.5">{m.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Trending Products */}
        <motion.div {...fadeUp(0.4)} className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-headline font-bold text-[#0A2416] text-base">Trending Products</h2>
              <p className="text-gray-400 text-xs mt-0.5">Most viewed this week</p>
            </div>
            <span className="material-symbols-outlined text-amber-500" style={{ fontSize: '22px', fontVariationSettings: "'FILL' 1" }}>
              local_fire_department
            </span>
          </div>

          <div className="space-y-3">
            {trendingProducts.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.45 + i * 0.07 }}
                className="flex items-center gap-3"
              >
                <span className="w-6 h-6 rounded-lg bg-[#F7F5F0] flex items-center justify-center text-[10px] font-headline font-extrabold text-[#0A2416] flex-shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-headline font-semibold text-[#0A2416] text-sm truncate">{p.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#0A2416] to-[#3d7a56] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(p.views / trendingProducts[0].views) * 100}%` }}
                        transition={{ duration: 0.6, delay: 0.5 + i * 0.07 }}
                      />
                    </div>
                    <span className="text-gray-400 text-xs font-headline flex-shrink-0">{p.views}</span>
                  </div>
                </div>
                <span className={`text-xs font-headline font-bold flex-shrink-0 ${p.positive ? 'text-emerald-600' : 'text-red-500'}`}>
                  {p.change}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Inquiries */}
      <motion.div {...fadeUp(0.5)}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-headline font-bold text-[#0A2416] text-base">Recent Inquiries</h2>
            <p className="text-gray-400 text-xs mt-0.5">Last 5 submissions</p>
          </div>
          <Link
            href="/admin/inquiries"
            className="inline-flex items-center gap-1.5 text-xs font-headline font-semibold text-[#0A2416] hover:text-[#3d7a56] transition-colors"
          >
            View all
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
          </Link>
        </div>

        {recentInquiries.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-gray-100">
            <span className="material-symbols-outlined text-gray-200 block mb-2" style={{ fontSize: '48px', fontVariationSettings: "'FILL' 1" }}>inbox</span>
            <p className="font-headline font-semibold text-gray-400">No inquiries yet</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm divide-y divide-gray-50">
            {recentInquiries.map((inq, i) => {
              const cfg = statusConfig[inq.status]
              return (
                <motion.div
                  key={inq._id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.55 + i * 0.06 }}
                  className="flex items-center gap-4 px-4 sm:px-6 py-4 hover:bg-[#F7F5F0] transition-colors"
                >
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full bg-[#0A2416]/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-headline font-extrabold text-[#0A2416] text-sm">
                      {inq.name.charAt(0).toUpperCase()}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-headline font-semibold text-[#0A2416] text-sm truncate">{inq.name}</p>
                      {inq.product && (
                        <span className="text-[10px] font-headline bg-[#0A2416]/8 text-[#0A2416] px-2 py-0.5 rounded-full truncate hidden sm:inline">
                          {inq.product.replace(/_/g, ' ')}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-xs truncate">{inq.message}</p>
                  </div>

                  {/* Status + date */}
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-headline font-bold border ${cfg.badge}`}>
                      <span className={`w-1 h-1 rounded-full ${cfg.dot}`} />
                      {cfg.label}
                    </span>
                    <span className="text-gray-300 text-[10px] font-headline hidden sm:block">
                      {new Date(inq.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </motion.div>
    </div>
  )
}
