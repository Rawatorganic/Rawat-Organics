'use client'

import { create } from 'zustand'
import type { CategoryData } from '@/lib/catalog-types'

type Status = 'idle' | 'loading' | 'ready' | 'error'

interface CatalogState {
  categories: CategoryData[]
  status: Status
  error: string | null
  /** Fetch categories once. Pass force=true to refetch (e.g. after admin edits). */
  fetchCategories: (force?: boolean) => Promise<void>
}

export const useCatalogStore = create<CatalogState>((set, get) => ({
  categories: [],
  status: 'idle',
  error: null,

  fetchCategories: async (force = false) => {
    const { status } = get()
    // Avoid duplicate / redundant fetches unless forced.
    if (!force && (status === 'loading' || status === 'ready')) return

    set({ status: 'loading', error: null })
    try {
      const res = await fetch('/api/categories', { cache: 'no-store' })
      if (!res.ok) throw new Error('Request failed')
      const data = await res.json()
      set({
        categories: Array.isArray(data.categories) ? data.categories : [],
        status: 'ready',
        error: null,
      })
    } catch {
      set({
        status: 'error',
        error: 'Could not load categories. Please try again.',
      })
    }
  },
}))
