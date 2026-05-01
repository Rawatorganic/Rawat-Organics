'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { powderSpices } from '@/lib/products'
import type { FilterTab } from '@/lib/constants'
import Navbar from '@/components/Navbar'
import { POWDER_SPICES_PAGE } from '@/lib/constants'

const TABS = POWDER_SPICES_PAGE.filterTabs

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
  exit: { opacity: 0, scale: 0.97, transition: { duration: 0.22 } },
}

export default function PowderSpicesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all')

  const filtered =
    activeFilter === 'all'
      ? powderSpices
      : powderSpices.filter((p) => p.tags.includes(activeFilter))

  // Split into pairs for bento rows
  const pairs: (typeof powderSpices)[] = []
  for (let i = 0; i < filtered.length; i += 2) {
    pairs.push(filtered.slice(i, i + 2))
  }

  return (
    <main className="bg-[#f7f5f0] min-h-screen">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-[#0d0d0d]">
        {/* Background giant text */}
        <div className="absolute inset-0 flex items-center justify-end overflow-hidden pointer-events-none select-none">
          <span className="text-[clamp(80px,18vw,200px)] font-headline font-extrabold leading-none pr-8 text-white/[0.04] tracking-tighter whitespace-nowrap">
            ARTISANAL
          </span>
        </div>
        <div className="absolute inset-0 flex items-end justify-end overflow-hidden pointer-events-none select-none pb-16">
          <span className="text-[clamp(60px,12vw,150px)] font-headline font-extrabold leading-none pr-8 text-white/[0.04] tracking-tighter whitespace-nowrap">
            SPICES
          </span>
        </div>

        {/* Product image right side */}
        <div className="absolute right-0 top-0 w-1/2 h-full">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0d0d0d] z-10" />
          <Image
            src="/products/turmeric.png"
            alt="Artisanal powder spices"
            fill
            priority
            className="object-cover opacity-40"
          />
        </div>

        <div className="relative z-20 max-w-screen-2xl mx-auto px-8 md:px-16 w-full pt-32 pb-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm font-headline mb-12 transition-colors group"
          >
            <span className="material-symbols-outlined transition-transform duration-300 group-hover:-translate-x-1" style={{ fontSize: '16px' }}>arrow_back</span>
            {POWDER_SPICES_PAGE.hero.backLabel}
          </Link>

          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="w-2 h-2 rounded-full bg-primary-fixed animate-pulse" />
            <span className="text-white/70 font-headline font-bold text-xs tracking-[0.2em] uppercase">{POWDER_SPICES_PAGE.hero.badge}</span>
          </motion.div>

          <motion.h1
            className="text-white font-headline font-extrabold text-4xl md:text-6xl lg:text-7xl leading-tight max-w-2xl mb-6"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {POWDER_SPICES_PAGE.hero.headingStart}{' '}
            <span className="italic font-light text-primary-fixed/80">{POWDER_SPICES_PAGE.hero.headingHighlight}</span>
            {' '}{POWDER_SPICES_PAGE.hero.headingEnd}
          </motion.h1>

          <motion.p
            className="text-white/50 text-base md:text-lg max-w-xl leading-relaxed mb-10"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Cold-milled at low temperature to preserve volatile oils and vivid color.{' '}
            {powderSpices.length} botanicals ground to their purest, most potent form.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <a
              href="#collection"
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-primary-fixed text-primary font-headline font-bold text-sm rounded-full hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg"
            >
              {POWDER_SPICES_PAGE.hero.exploreLabel}
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>south</span>
            </a>
            <div className="flex items-center gap-3 text-white/30 text-sm font-headline">
              <div className="h-px w-8 bg-white/20" />
              {powderSpices.length} varieties available
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Collection with filters ──────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 lg:px-16" id="collection">
        <div className="max-w-screen-2xl mx-auto">

          {/* Section header + filter tabs */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary/40 font-headline font-bold tracking-[0.25em] uppercase text-xs mb-3 block">
                {POWDER_SPICES_PAGE.collection.eyebrow}
              </span>
              <h2 className="text-primary font-headline font-extrabold text-4xl md:text-5xl">
                {POWDER_SPICES_PAGE.collection.headingStart}{' '}
                <span className="font-light italic">{POWDER_SPICES_PAGE.collection.headingHighlight}</span>
              </h2>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {TABS.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveFilter(tab.value)}
                  className={`px-5 py-2 rounded-full font-headline font-semibold text-xs tracking-widest uppercase transition-all duration-300 border ${
                    activeFilter === tab.value
                      ? 'bg-primary text-primary-fixed border-primary shadow-md'
                      : 'bg-transparent text-on-surface/50 border-outline-variant/50 hover:border-primary/40 hover:text-primary'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Bento rows — alternating 3fr 2fr / 2fr 3fr, same as whole-spices */}
          <div className="flex flex-col gap-5">
            <AnimatePresence mode="popLayout">
              {pairs.map((pair, rowIdx) => (
                <motion.div
                  key={pair.map((s) => s.slug).join('-')}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`grid gap-5 ${
                    pair.length === 1
                      ? 'grid-cols-1'
                      : rowIdx % 2 === 0
                      ? 'grid-cols-1 md:grid-cols-[3fr_2fr]'
                      : 'grid-cols-1 md:grid-cols-[2fr_3fr]'
                  }`}
                >
                  {pair.map((spice, colIdx) => {
                    const isLarge =
                      pair.length === 1 ||
                      (rowIdx % 2 === 0 ? colIdx === 0 : colIdx === 1)
                    const cardIdx = rowIdx * 2 + colIdx

                    return (
                      <motion.div
                        key={spice.slug}
                        custom={cardIdx}
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        layout
                        viewport={{ once: true, margin: '-40px' }}
                      >
                        <Link
                          href={`/powder-spices/${spice.slug}`}
                          className="group block relative overflow-hidden rounded-2xl bg-[#021c10]"
                          style={{ aspectRatio: isLarge ? '16/10' : '4/3' }}
                        >
                          {/* Product image */}
                          <Image
                            src={spice.primaryImage}
                            alt={spice.name}
                            fill
                            className="object-cover opacity-60 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-70"
                          />

                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#021c10] via-[#021c10]/30 to-transparent" />

                          {/* Content overlay */}
                          <div className="absolute inset-0 p-7 flex flex-col justify-between">
                            {/* Top: tag badge + arrow */}
                            <div className="flex items-start justify-between">
                              <span
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-headline font-bold tracking-widest uppercase"
                                style={{
                                  backgroundColor: `${spice.color}25`,
                                  color: spice.color,
                                  border: `1px solid ${spice.color}40`,
                                }}
                              >
                                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: spice.color }} />
                                {spice.tags[0] ?? 'Powder'}
                              </span>

                              <span
                                className="material-symbols-outlined text-white/0 group-hover:text-white/80 -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500"
                                style={{ fontSize: '22px' }}
                              >
                                north_east
                              </span>
                            </div>

                            {/* Bottom: name + description + CTA */}
                            <div>
                              <h3 className="text-white font-headline font-extrabold text-2xl md:text-3xl mb-2 leading-tight">
                                {spice.name}
                              </h3>
                              <p className="text-white/55 text-xs md:text-sm leading-relaxed max-w-xs line-clamp-2">
                                {spice.description}
                              </p>
                              <div className="mt-5 inline-flex items-center gap-2 text-white/70 group-hover:text-white font-headline font-semibold text-xs tracking-wider uppercase transition-colors duration-300">
                                {POWDER_SPICES_PAGE.collection.viewDetails}
                                <span
                                  className="material-symbols-outlined transition-transform duration-300 group-hover:translate-x-1"
                                  style={{ fontSize: '14px' }}
                                >
                                  arrow_forward
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    )
                  })}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24"
            >
              <p className="font-headline font-semibold text-on-surface/30 text-lg">
                No spices match this filter.
              </p>
              <button
                onClick={() => setActiveFilter('all')}
                className="mt-4 text-sm font-headline text-primary underline underline-offset-4"
              >
                Show all
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── The Spice Journal CTA ────────────────────────────────────────────── */}
      <section className="bg-primary relative overflow-hidden">
        <div className="noise-overlay opacity-[0.04]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary-container/15 blur-[120px] pointer-events-none" />

        <div className="max-w-screen-2xl mx-auto px-8 md:px-16 py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <span className="text-primary-fixed/40 font-headline font-bold tracking-[0.25em] uppercase text-xs mb-5 block">
                {POWDER_SPICES_PAGE.journal.eyebrow}
              </span>
              <h2 className="text-primary-fixed font-headline font-extrabold text-4xl md:text-5xl leading-tight mb-6">
                {POWDER_SPICES_PAGE.journal.headingStart}{' '}
                <span className="font-light italic">{POWDER_SPICES_PAGE.journal.headingHighlight}</span>
              </h2>
              <p className="text-primary-fixed/55 text-base leading-relaxed mb-8 max-w-md">
                {POWDER_SPICES_PAGE.journal.description}
              </p>
              <a
                href={POWDER_SPICES_PAGE.journal.ctaHref}
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary-fixed text-primary font-headline font-bold text-sm rounded-full hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl"
              >
                {POWDER_SPICES_PAGE.journal.ctaLabel}
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>north_east</span>
              </a>
            </div>

            {/* Right: decorative rings */}
            <div className="flex items-center justify-center lg:justify-end">
              <div className="relative w-48 h-48 md:w-64 md:h-64">
                <div className="absolute inset-0 rounded-full bg-primary-fixed/5 border border-primary-fixed/10" />
                <div className="absolute inset-4 rounded-full bg-primary-fixed/5 border border-primary-fixed/10" />
                <div className="absolute inset-8 rounded-full bg-primary-fixed/5 border border-primary-fixed/10 flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-primary-fixed/40"
                    style={{ fontSize: '64px', fontVariationSettings: "'FILL' 1" }}
                  >
                    eco
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
