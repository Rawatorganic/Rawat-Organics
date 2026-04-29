'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ALL_PRODUCTS } from '@/lib/constants'

interface FormState {
  name: string
  email: string
  phone: string
  product: string
  message: string
}

const initialForm: FormState = { name: '', email: '', phone: '', product: '', message: '' }

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Failed to send inquiry')
        return
      }

      setSubmitted(true)
      setForm(initialForm)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="bg-[#f7f5f0] min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-primary pt-32 pb-24 px-8 overflow-hidden">
        <div className="noise-overlay opacity-[0.04]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary-container/15 blur-[120px] pointer-events-none" />

        <div className="max-w-screen-xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="text-primary-fixed/40 font-headline font-bold tracking-[0.25em] uppercase text-xs mb-4 block">
              Get in Touch
            </span>
            <h1 className="text-primary-fixed font-headline font-extrabold text-5xl md:text-6xl leading-tight mb-5 max-w-xl">
              We&apos;d Love to{' '}
              <span className="italic font-light">Hear From You</span>
            </h1>
            <p className="text-primary-fixed/55 text-base max-w-lg leading-relaxed">
              Inquire about our organic spices, bulk orders, or anything else. Our team responds within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-20 px-6 md:px-12 lg:px-16">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-start">

          {/* Form Card */}
          <motion.div
            className="bg-white rounded-3xl border border-outline-variant/20 shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary/50" />

            <div className="p-8 md:p-12">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center text-center py-12"
                  >
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                      <span
                        className="material-symbols-outlined text-green-600"
                        style={{ fontSize: '40px', fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                    </div>
                    <h3 className="font-headline font-extrabold text-2xl text-primary mb-3">
                      Inquiry Sent!
                    </h3>
                    <p className="text-on-surface/50 text-sm leading-relaxed max-w-sm mb-8">
                      Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="inline-flex items-center gap-2 px-6 py-3 border border-primary/30 text-primary font-headline font-bold text-sm rounded-full hover:bg-primary hover:text-primary-fixed transition-all duration-300"
                    >
                      Send Another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="font-headline font-extrabold text-2xl text-primary mb-1">
                        Send an Inquiry
                      </h2>
                      <p className="text-on-surface/40 text-sm">Fields marked * are required</p>
                    </div>

                    {error && (
                      <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                        <span className="material-symbols-outlined text-red-500" style={{ fontSize: '18px' }}>error</span>
                        {error}
                      </div>
                    )}

                    {/* Name + Email row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-headline font-bold text-on-surface/60 uppercase tracking-widest mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className="w-full px-4 py-3.5 rounded-xl border border-outline-variant/40 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none text-sm text-on-surface placeholder:text-on-surface/30 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-headline font-bold text-on-surface/60 uppercase tracking-widest mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className="w-full px-4 py-3.5 rounded-xl border border-outline-variant/40 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none text-sm text-on-surface placeholder:text-on-surface/30 transition-all"
                        />
                      </div>
                    </div>

                    {/* Phone + Product row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-headline font-bold text-on-surface/60 uppercase tracking-widest mb-2">
                          Phone <span className="normal-case font-normal">(optional)</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3.5 rounded-xl border border-outline-variant/40 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none text-sm text-on-surface placeholder:text-on-surface/30 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-headline font-bold text-on-surface/60 uppercase tracking-widest mb-2">
                          Product <span className="normal-case font-normal">(optional)</span>
                        </label>
                        <select
                          name="product"
                          value={form.product}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 rounded-xl border border-outline-variant/40 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none text-sm text-on-surface transition-all bg-white appearance-none"
                        >
                          <option value="">Select a product…</option>
                          <optgroup label="Whole Spices">
                            {ALL_PRODUCTS.filter((p) => p.category === 'whole-spices').map((p) => (
                              <option key={p.productId} value={p.productId}>
                                {p.name}
                              </option>
                            ))}
                          </optgroup>
                          <optgroup label="Powder Spices">
                            {ALL_PRODUCTS.filter((p) => p.category === 'powder-spices').map((p) => (
                              <option key={p.productId} value={p.productId}>
                                {p.name}
                              </option>
                            ))}
                          </optgroup>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-headline font-bold text-on-surface/60 uppercase tracking-widest mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about your inquiry, bulk order requirements, or any questions…"
                        className="w-full px-4 py-3.5 rounded-xl border border-outline-variant/40 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none text-sm text-on-surface placeholder:text-on-surface/30 transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-primary text-primary-fixed font-headline font-bold rounded-xl hover:bg-primary/90 active:scale-[0.98] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-primary-fixed/30 border-t-primary-fixed rounded-full animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send Inquiry
                          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>send</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Info Sidebar */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {[
              {
                icon: 'mail',
                title: 'Email Us',
                lines: ['hello@rawatorganics.com', 'admin@rawatorganics.com'],
              },
              {
                icon: 'schedule',
                title: 'Response Time',
                lines: ['Within 24 hours', 'Mon – Sat, 9am – 6pm IST'],
              },
              {
                icon: 'location_on',
                title: 'Our Farm',
                lines: ['Rawat Organics Farm', 'Rajasthan, India — 302001'],
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl border border-outline-variant/20 p-6 flex gap-4 items-start"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary" style={{ fontSize: '20px' }}>
                    {item.icon}
                  </span>
                </div>
                <div>
                  <h4 className="font-headline font-bold text-sm text-primary mb-1">{item.title}</h4>
                  {item.lines.map((line, i) => (
                    <p key={i} className="text-on-surface/50 text-sm">{line}</p>
                  ))}
                </div>
              </div>
            ))}

            {/* Assurance card */}
            <div className="bg-primary rounded-2xl p-6">
              <span
                className="material-symbols-outlined text-primary-fixed/50 mb-3 block"
                style={{ fontSize: '28px', fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
              <h4 className="font-headline font-extrabold text-primary-fixed mb-2">
                100% Organic Certified
              </h4>
              <p className="text-primary-fixed/55 text-xs leading-relaxed">
                All our spices are certified organic, free from pesticides and artificial additives.
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      <Footer />
    </main>
  )
}
