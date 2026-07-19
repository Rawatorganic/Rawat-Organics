'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import CategoryFormModal from './CategoryFormModal'
import ProductFormModal from './ProductFormModal'
import type { CategoryData, ProductData } from '@/lib/catalog-types'

type Tab = 'categories' | 'products'

interface DeleteTarget {
  kind: 'category' | 'product'
  id: string
  name: string
  note?: string
}

export default function CatalogManagement() {
  const [tab, setTab] = useState<Tab>('categories')
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [products, setProducts] = useState<ProductData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // modals
  const [catModal, setCatModal] = useState(false)
  const [editCat, setEditCat] = useState<CategoryData | null>(null)
  const [prodModal, setProdModal] = useState(false)
  const [editProd, setEditProd] = useState<ProductData | null>(null)
  const [prodCategoryFilter, setProdCategoryFilter] = useState<string>('all')
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null)
  const [deleting, setDeleting] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const [cRes, pRes] = await Promise.all([
        fetch('/api/categories', { cache: 'no-store' }),
        fetch('/api/products', { cache: 'no-store' }),
      ])
      if (!cRes.ok || !pRes.ok) throw new Error()
      const cData = await cRes.json()
      const pData = await pRes.json()
      setCategories(cData.categories ?? [])
      setProducts(pData.products ?? [])
    } catch {
      setError('Could not load catalog. Please refresh.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const productsByCat = useMemo(() => {
    const map = new Map<string, number>()
    products.forEach((p) => map.set(p.category, (map.get(p.category) ?? 0) + 1))
    return map
  }, [products])

  const filteredProducts = useMemo(
    () => (prodCategoryFilter === 'all' ? products : products.filter((p) => p.category === prodCategoryFilter)),
    [products, prodCategoryFilter]
  )

  const catName = (slug: string) => categories.find((c) => c.slug === slug)?.name ?? slug

  const confirmDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      const url =
        deleteTarget.kind === 'category'
          ? `/api/categories/${deleteTarget.id}`
          : `/api/products/${deleteTarget.id}`
      const res = await fetch(url, { method: 'DELETE' })
      if (res.ok) {
        setDeleteTarget(null)
        await load()
      }
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-[#0A2416]">Products</h1>
          <p className="text-gray-400 text-sm mt-1 font-headline">
            {categories.length} categories · {products.length} products
          </p>
        </div>
        <button
          onClick={() => (tab === 'categories' ? (setEditCat(null), setCatModal(true)) : (setEditProd(null), setProdModal(true)))}
          className="inline-flex items-center gap-2 px-5 py-3 bg-[#0A2416] text-white font-headline font-bold text-sm rounded-xl hover:bg-[#0A2416]/90 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
          {tab === 'categories' ? 'Create Category' : 'Add Product'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(['categories', 'products'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2.5 rounded-xl font-headline font-semibold text-sm capitalize transition-all ${
              tab === t ? 'bg-[#0A2416] text-white shadow-sm' : 'bg-white text-gray-500 border border-gray-100 hover:text-[#0A2416]'
            }`}
          >
            {t}
            <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-lg font-extrabold ${tab === t ? 'bg-white/20' : 'bg-gray-100 text-gray-500'}`}>
              {t === 'categories' ? categories.length : products.length}
            </span>
          </button>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="bg-white rounded-2xl p-10 text-center border border-gray-100">
          <span className="material-symbols-outlined text-gray-300 block mb-2" style={{ fontSize: '44px' }}>cloud_off</span>
          <p className="font-headline font-bold text-gray-500">{error}</p>
          <button onClick={load} className="mt-3 text-sm font-headline text-[#0A2416] underline">Retry</button>
        </div>
      )}

      {/* Loading */}
      {loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="aspect-[16/10] bg-gray-100 animate-pulse" />
              <div className="p-4 space-y-2">
                <div className="h-4 w-1/2 bg-gray-100 rounded-full animate-pulse" />
                <div className="h-3 w-3/4 bg-gray-100 rounded-full animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Categories tab ── */}
      {!loading && !error && tab === 'categories' && (
        categories.length === 0 ? (
          <EmptyState icon="category" title="No categories yet" sub="Create your first category to start." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {categories.map((c) => (
                <motion.div
                  key={c._id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden group"
                >
                  <div className="relative aspect-[16/10] bg-gray-100">
                    {c.bannerImage ? (
                      <Image src={c.bannerImage} alt={c.name} fill className="object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                        <span className="material-symbols-outlined" style={{ fontSize: '40px' }}>image</span>
                      </div>
                    )}
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/55 text-white text-[10px] font-headline font-bold rounded-full backdrop-blur-sm">
                      #{c.index} · /{c.slug}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="font-headline font-extrabold text-[#0A2416]">{c.name}</h3>
                      <span className="text-xs text-gray-400 font-headline">{productsByCat.get(c.slug) ?? 0} items</span>
                    </div>
                    <p className="text-gray-500 text-xs line-clamp-2 mb-4 min-h-[2rem]">{c.description || '—'}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => { setEditCat(c); setCatModal(true) }}
                        className="flex-1 py-2 rounded-lg border border-gray-200 text-gray-600 text-xs font-headline font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>edit</span> Edit
                      </button>
                      <button
                        onClick={() => setDeleteTarget({ kind: 'category', id: c._id, name: c.name, note: `This will also delete its ${productsByCat.get(c.slug) ?? 0} product(s).` })}
                        className="py-2 px-3 rounded-lg border border-red-200 text-red-500 text-xs font-headline font-bold hover:bg-red-50 transition-colors flex items-center justify-center"
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>delete</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )
      )}

      {/* ── Products tab ── */}
      {!loading && !error && tab === 'products' && (
        <>
          {/* category filter */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            <FilterPill active={prodCategoryFilter === 'all'} onClick={() => setProdCategoryFilter('all')} label="All" count={products.length} />
            {categories.map((c) => (
              <FilterPill
                key={c._id}
                active={prodCategoryFilter === c.slug}
                onClick={() => setProdCategoryFilter(c.slug)}
                label={c.name}
                count={productsByCat.get(c.slug) ?? 0}
              />
            ))}
          </div>

          {filteredProducts.length === 0 ? (
            <EmptyState icon="grocery" title="No products" sub="Add a product to this category." />
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="divide-y divide-gray-50">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((p) => (
                    <motion.div
                      key={p._id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-4 p-3 sm:p-4 hover:bg-[#F7F5F0]/60 transition-colors group"
                    >
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                        {p.primaryImage ? (
                          <Image src={p.primaryImage} alt={p.name} fill className="object-cover" />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>image</span>
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-headline font-bold text-[#0A2416] text-sm truncate">{p.name}</p>
                        <p className="text-gray-400 text-xs truncate">{p.tagline || p.description}</p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="text-[10px] font-headline bg-[#0A2416]/8 text-[#0A2416] px-2 py-0.5 rounded-full">{catName(p.category)}</span>
                          {p.tags.map((t) => (
                            <span key={t} className="text-[10px] text-gray-400 capitalize">#{t}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-1.5 flex-shrink-0">
                        <button
                          onClick={() => { setEditProd(p); setProdModal(true) }}
                          className="w-9 h-9 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 flex items-center justify-center transition-colors"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: '17px' }}>edit</span>
                        </button>
                        <button
                          onClick={() => setDeleteTarget({ kind: 'product', id: p._id, name: p.name })}
                          className="w-9 h-9 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors"
                          title="Delete"
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: '17px' }}>delete</span>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        </>
      )}

      {/* Modals */}
      <CategoryFormModal open={catModal} onClose={() => setCatModal(false)} onSaved={load} category={editCat} />
      <ProductFormModal
        open={prodModal}
        onClose={() => setProdModal(false)}
        onSaved={load}
        categories={categories}
        defaultCategory={prodCategoryFilter !== 'all' ? prodCategoryFilter : undefined}
        product={editProd}
      />

      {/* Delete confirm */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm"
            onClick={() => !deleting && setDeleteTarget(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-red-500" style={{ fontSize: '28px' }}>delete</span>
              </div>
              <h3 className="font-headline font-extrabold text-[#0A2416] text-lg mb-1">Delete {deleteTarget.name}?</h3>
              <p className="text-gray-500 text-sm mb-1">This action cannot be undone.</p>
              {deleteTarget.note && <p className="text-red-500 text-xs mb-5">{deleteTarget.note}</p>}
              <div className="flex gap-3 mt-5">
                <button onClick={() => setDeleteTarget(null)} disabled={deleting} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-headline font-bold text-sm hover:bg-gray-50 disabled:opacity-50">
                  Cancel
                </button>
                <button onClick={confirmDelete} disabled={deleting} className="flex-1 py-3 rounded-xl bg-red-500 text-white font-headline font-bold text-sm hover:bg-red-600 disabled:opacity-60 flex items-center justify-center gap-2">
                  {deleting && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function FilterPill({ active, onClick, label, count }: { active: boolean; onClick: () => void; label: string; count: number }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-headline font-semibold text-sm whitespace-nowrap transition-all ${
        active ? 'bg-[#0A2416] text-white shadow-sm' : 'bg-white text-gray-500 border border-gray-100 hover:text-[#0A2416]'
      }`}
    >
      {label}
      <span className={`text-xs px-1.5 py-0.5 rounded-lg font-extrabold ${active ? 'bg-white/20' : 'bg-gray-100 text-gray-500'}`}>{count}</span>
    </button>
  )
}

function EmptyState({ icon, title, sub }: { icon: string; title: string; sub: string }) {
  return (
    <div className="bg-white rounded-2xl p-16 text-center border border-gray-100">
      <span className="material-symbols-outlined text-gray-200 block mb-3" style={{ fontSize: '56px', fontVariationSettings: "'FILL' 1" }}>{icon}</span>
      <p className="font-headline font-bold text-gray-400 text-lg">{title}</p>
      <p className="text-gray-300 text-sm mt-1">{sub}</p>
    </div>
  )
}
