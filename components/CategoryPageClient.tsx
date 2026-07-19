'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import type { CategoryData, ProductData, ProductTag } from '@/lib/catalog-types'
import { PRODUCT_TAGS } from '@/lib/catalog-types'

interface Props {
  category: CategoryData
  products: ProductData[]
}

type FilterTab = 'all' | ProductTag

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.04, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.2 } },
}

export default function CategoryPageClient({ category, products }: Props) {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all')

  // Only show tag tabs that actually appear in this category's products.
  const availableTags = useMemo(() => {
    const present = new Set<ProductTag>()
    products.forEach((p) => p.tags.forEach((t) => present.add(t)))
    return PRODUCT_TAGS.filter((t) => present.has(t))
  }, [products])

  const filtered = useMemo(
    () =>
      activeFilter === 'all'
        ? products
        : products.filter((p) => p.tags.includes(activeFilter)),
    [activeFilter, products]
  )

  return (
    <main className="bg-[#f7f5f0] min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative h-[78vh] min-h-[540px] overflow-hidden bg-[#021c10]">
        {category.bannerImage && (
          <Image
            src={category.bannerImage}
            alt={category.name}
            fill
            priority
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/75" />

        {/* Back link */}
        <Link
          href="/"
          className="absolute top-24 left-6 md:left-16 inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-headline transition-colors bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 z-20"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_back</span>
          Back to Home
        </Link>

        {/* Glass info card */}
        <motion.div
          className="absolute bottom-12 left-6 md:left-16 max-w-md z-20"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="bg-[#021c10]/75 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            {category.eyebrow && (
              <span className="text-primary-fixed/50 font-headline font-bold tracking-[0.25em] uppercase text-xs mb-3 block">
                {category.eyebrow}
              </span>
            )}
            <h1 className="text-primary-fixed font-headline font-extrabold text-4xl md:text-5xl leading-tight mb-4">
              {category.name}
              {category.punchline && (
                <>
                  <br />
                  <span className="font-light italic">{category.punchline}</span>
                </>
              )}
            </h1>
            {category.description && (
              <p className="text-primary-fixed/65 text-sm leading-relaxed">
                {category.description}
              </p>
            )}
          </div>
        </motion.div>
      </section>

      {/* ── Collection ───────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-16" id="collection">
        <div className="max-w-screen-2xl mx-auto">
          {/* Header + filters */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary/40 font-headline font-bold tracking-[0.25em] uppercase text-xs mb-3 block">
                Rawat Organics
              </span>
              <h2 className="text-primary font-headline font-extrabold text-4xl">
                The <span className="font-light italic">Collection</span>
              </h2>
              <p className="text-on-surface/50 font-headline text-sm mt-2">
                {products.length} hand-selected {products.length === 1 ? 'variety' : 'varieties'}.
              </p>
            </motion.div>

            {availableTags.length > 0 && (
              <motion.div
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {(['all', ...availableTags] as FilterTab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveFilter(tab)}
                    className={`px-5 py-2 rounded-full font-headline font-semibold text-xs tracking-widest uppercase transition-all duration-300 border ${
                      activeFilter === tab
                        ? 'bg-primary text-primary-fixed border-primary shadow-md'
                        : 'bg-transparent text-on-surface/50 border-outline-variant/50 hover:border-primary/40 hover:text-primary'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <span
                className="material-symbols-outlined text-on-surface/15 mb-4"
                style={{ fontSize: '56px', fontVariationSettings: "'FILL' 1" }}
              >
                grocery
              </span>
              <p className="font-headline font-bold text-on-surface/40 text-lg">
                No products here yet
              </p>
              <p className="text-on-surface/30 text-sm mt-1">
                {activeFilter === 'all'
                  ? 'Check back soon — new spices are on the way.'
                  : `No ${activeFilter} products in this collection.`}
              </p>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((spice, i) => (
                  <motion.div
                    key={spice._id}
                    layout
                    custom={i}
                    variants={cardVariant}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                  >
                    <Link
                      href={`/${category.slug}/${spice.slug}`}
                      className="group flex flex-col bg-white rounded-2xl border border-outline-variant/20 hover:border-primary/20 hover:shadow-xl transition-all duration-300 overflow-hidden h-full"
                    >
                      <div className="relative aspect-square overflow-hidden bg-[#f0ede6]">
                        {spice.primaryImage && (
                          <Image
                            src={spice.primaryImage}
                            alt={spice.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div
                          className="absolute top-3 left-3 w-3 h-3 rounded-full shadow-md"
                          style={{ backgroundColor: spice.color }}
                        />
                      </div>

                      <div className="p-5 flex flex-col flex-grow">
                        <h3 className="font-headline font-extrabold text-primary text-lg mb-2 group-hover:translate-x-0.5 transition-transform duration-300 leading-tight">
                          {spice.name}
                        </h3>
                        <p className="text-on-surface/50 text-xs leading-relaxed flex-grow mb-5 line-clamp-3">
                          {spice.description}
                        </p>
                        <div className="inline-flex items-center gap-1.5 text-primary font-headline font-bold text-xs tracking-wider uppercase group-hover:gap-3 transition-all duration-300 border border-primary/20 hover:border-primary rounded-full px-4 py-2 self-start">
                          View Details
                          <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>arrow_forward</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Inquiry CTA ──────────────────────────────────────────────────────── */}
      <section className="bg-primary relative overflow-hidden">
        <div className="noise-overlay opacity-[0.04]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary-container/15 blur-[120px] pointer-events-none" />
        <div className="max-w-screen-2xl mx-auto px-8 md:px-16 py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary-fixed/40 font-headline font-bold tracking-[0.25em] uppercase text-xs mb-5 block">
                Stay Connected
              </span>
              <h2 className="text-primary-fixed font-headline font-extrabold text-4xl md:text-5xl leading-tight mb-6">
                Wholesale & <span className="font-light italic">Custom Orders</span>
              </h2>
              <p className="text-primary-fixed/55 text-base leading-relaxed mb-8 max-w-md">
                Reach out for wholesale inquiries, custom blends, or to learn more about our
                sourcing practices and farm partnerships.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary-fixed text-primary font-headline font-bold text-sm rounded-full hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl"
              >
                Get in Touch
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>north_east</span>
              </Link>
            </div>
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
