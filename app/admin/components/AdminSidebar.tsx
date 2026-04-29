'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { BRAND } from '@/lib/constants'

export default function AdminSidebar() {
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async () => {
    setLoggingOut(true)
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }

  return (
    <aside className="w-64 min-h-screen bg-primary flex flex-col">
      {/* Brand */}
      <div className="px-8 py-8 border-b border-primary-fixed/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary-fixed/10 flex items-center justify-center">
            <span
              className="material-symbols-outlined text-primary-fixed"
              style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}
            >
              eco
            </span>
          </div>
          <div>
            <div className="font-headline font-extrabold text-primary-fixed text-sm leading-tight">
              {BRAND.fullName}
            </div>
            <div className="text-primary-fixed/40 text-[10px] font-headline uppercase tracking-widest">
              Admin
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        <a
          href="/admin"
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary-fixed/10 text-primary-fixed font-headline font-semibold text-sm"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>dashboard</span>
          Dashboard
        </a>
        <a
          href="/contact"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-primary-fixed/60 hover:bg-primary-fixed/8 hover:text-primary-fixed font-headline font-semibold text-sm transition-all duration-200"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>open_in_new</span>
          Contact Page
        </a>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-primary-fixed/60 hover:bg-primary-fixed/8 hover:text-primary-fixed font-headline font-semibold text-sm transition-all duration-200"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>language</span>
          View Website
        </a>
      </nav>

      {/* Logout */}
      <div className="px-4 py-6 border-t border-primary-fixed/10">
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-primary-fixed/60 hover:bg-red-500/20 hover:text-red-300 font-headline font-semibold text-sm transition-all duration-200 disabled:opacity-50"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>logout</span>
          {loggingOut ? 'Signing out…' : 'Sign Out'}
        </button>
      </div>
    </aside>
  )
}
