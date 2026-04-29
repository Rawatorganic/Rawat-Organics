'use client'

import ScrollVelocity from './ui/ScrollVelocity'
import { MARQUEE_TEXT } from '@/lib/constants'

export default function MarqueeStrip() {
  return (
    <div className="bg-primary border-y border-primary-container/20 py-3 overflow-hidden select-none">
      <ScrollVelocity
        texts={[MARQUEE_TEXT]}
        velocity={60}
        className="text-primary-fixed/65 font-headline font-semibold text-xs tracking-[0.22em] uppercase pr-4"
        numCopies={4}
        parallaxClassName="py-0"
        scrollerClassName="items-center"
      />
    </div>
  )
}
