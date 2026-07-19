'use client'

import { useEffect } from 'react'
import { useCatalogStore } from '@/lib/store/catalogStore'

/**
 * Fires the categories fetch as soon as the app mounts (during the loader
 * animation), hydrating the zustand store so the navbar & homepage render
 * instantly from cache. Renders nothing.
 */
export default function CatalogHydrator() {
  const fetchCategories = useCatalogStore((s) => s.fetchCategories)

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  return null
}
