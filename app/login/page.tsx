'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { BRAND } from '@/lib/constants'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Login failed')
        return
      }

      router.push('/admin')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f5f0] flex items-center justify-center px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <motion.div
        className="relative w-full max-w-md"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-outline-variant/20">
          {/* Top accent bar */}
          <div className="h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary/60" />

          <div className="px-10 py-12">
            {/* Logo / Brand */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary mb-5">
                <span
                  className="material-symbols-outlined text-primary-fixed"
                  style={{ fontSize: '32px', fontVariationSettings: "'FILL' 1" }}
                >
                  eco
                </span>
              </div>
              <h1 className="font-headline font-extrabold text-2xl text-primary">{BRAND.fullName}</h1>
              <p className="text-on-surface/40 text-sm font-headline mt-1">Admin Portal</p>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm"
              >
                <span className="material-symbols-outlined text-red-500" style={{ fontSize: '18px' }}>error</span>
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-xs font-headline font-bold text-on-surface/60 uppercase tracking-widest mb-2">
                  Email
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface/30" style={{ fontSize: '20px' }}>
                    mail
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@rawatorganics.com"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-outline-variant/40 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none text-sm text-on-surface placeholder:text-on-surface/30 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-headline font-bold text-on-surface/60 uppercase tracking-widest mb-2">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface/30" style={{ fontSize: '20px' }}>
                    lock
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-12 py-3.5 rounded-xl border border-outline-variant/40 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none text-sm text-on-surface placeholder:text-on-surface/30 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface/30 hover:text-on-surface/60 transition-colors"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-primary text-primary-fixed font-headline font-bold rounded-xl hover:bg-primary/90 active:scale-[0.98] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-primary-fixed/30 border-t-primary-fixed rounded-full animate-spin" />
                    Signing in…
                  </>
                ) : (
                  <>
                    Sign In
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <p className="text-center text-on-surface/30 text-xs mt-6 font-headline">
          {BRAND.copyright}
        </p>
      </motion.div>
    </div>
  )
}
