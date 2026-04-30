'use client'

import { useEffect } from 'react'
import { analytics } from '@/lib/firebase'

export default function FirebaseAnalytics() {
  useEffect(() => {
    // This effect runs once on mount, ensuring that the analytics
    // instance is loaded on the client side.
    if (analytics) {
      console.log('Firebase Analytics initialized')
    }
  }, [])

  return null
}
