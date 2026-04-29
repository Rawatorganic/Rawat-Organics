'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const navItems = [
  { href: '/admin',        label: 'Dashboard',  icon: 'dashboard' },
  { href: '/admin/inquiries', label: 'Inquiries', icon: 'mail' },
]

const quickLinks = [
  { href: '/contact', label: 'Contact Page', icon: 'open_in_new', external: true },
  { href: '/',        label: 'View Website', icon: 'language',    external: true },
]

export default function AdminSidebar({ isOpen, onClose }: Props) {
  const pathname = usePathname()
  const router   = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async () => {
    setLoggingOut(true)
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="px-6 py-6 border-b border-white/10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 bg-white/10">
          <Image
            src="/logo/logo.jpeg"
            alt="Rawat Organics"
            width={40}
            height={40}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <p className="font-headline font-extrabold text-white text-sm leading-tight">Rawat Organics</p>
          <p className="text-white/40 text-[10px] font-headline uppercase tracking-widest">Admin Panel</p>
        </div>
        {/* Close on mobile */}
        <button
          onClick={onClose}
          className="ml-auto lg:hidden text-white/50 hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>close</span>
        </button>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <p className="text-white/30 text-[10px] font-headline uppercase tracking-widest px-4 mb-3">Menu</p>
        {navItems.map((item) => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-headline font-semibold text-sm transition-all duration-200 ${
                active
                  ? 'bg-white/15 text-white shadow-sm'
                  : 'text-white/60 hover:bg-white/8 hover:text-white'
              }`}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: '20px', fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              {item.label}
              {active && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400" />
              )}
            </Link>
          )
        })}

        <div className="pt-4">
          <p className="text-white/30 text-[10px] font-headline uppercase tracking-widest px-4 mb-3">Quick Links</p>
          {quickLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/8 hover:text-white font-headline font-semibold text-sm transition-all duration-200"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Logout */}
      <div className="px-4 py-5 border-t border-white/10">
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-red-500/20 hover:text-red-300 font-headline font-semibold text-sm transition-all duration-200 disabled:opacity-50"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>logout</span>
          {loggingOut ? 'Signing out…' : 'Sign Out'}
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop: always visible */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-[#0A2416] flex-col z-30">
        {sidebarContent}
      </aside>

      {/* Mobile: animated drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="lg:hidden fixed left-0 top-0 h-screen w-72 bg-[#0A2416] flex-col z-40 flex"
          >
            {sidebarContent}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
