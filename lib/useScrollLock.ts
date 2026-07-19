'use client'

import { useEffect } from 'react'

// Ref-counted so nested modals (form + cropper) keep the body locked
// until the *last* one closes.
let lockCount = 0
let previousOverflow = ''
let previousPaddingRight = ''

function lock() {
  if (lockCount === 0 && typeof document !== 'undefined') {
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    previousOverflow = document.body.style.overflow
    previousPaddingRight = document.body.style.paddingRight
    document.body.style.overflow = 'hidden'
    // Compensate for the disappearing scrollbar so layout doesn't jump.
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`
  }
  lockCount++
}

function unlock() {
  lockCount = Math.max(0, lockCount - 1)
  if (lockCount === 0 && typeof document !== 'undefined') {
    document.body.style.overflow = previousOverflow
    document.body.style.paddingRight = previousPaddingRight
  }
}

/** Lock body scroll while `active` is true. */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return
    lock()
    return () => unlock()
  }, [active])
}
