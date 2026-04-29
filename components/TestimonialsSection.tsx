'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { TESTIMONIALS_SECTION, TESTIMONIALS } from '@/lib/constants'

function Stars() {
  return (
    <div className="flex gap-0.5 mb-8">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className="material-symbols-outlined text-secondary"
          style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1, 'wght' 400" }}
        >
          star
        </span>
      ))}
    </div>
  )
}

const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
}

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const go = (dir: number) => {
    setDirection(dir)
    setIndex((prev) => (prev + dir + TESTIMONIALS.length) % TESTIMONIALS.length)
  }

  const current = TESTIMONIALS[index]

  return (
    <section className="py-32 bg-surface overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div>
            <span className="text-secondary font-headline font-bold tracking-[0.2em] uppercase text-sm mb-4 block">
              {TESTIMONIALS_SECTION.eyebrow}
            </span>
            <h2 className="text-primary font-headline font-extrabold text-4xl md:text-5xl leading-tight">
              {TESTIMONIALS_SECTION.headingStart}{' '}
              <span className="font-light italic">{TESTIMONIALS_SECTION.headingHighlight}</span>
            </h2>
          </div>

          {/* Nav controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => go(-1)}
              className="w-12 h-12 rounded-full border border-outline/30 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 group"
              aria-label="Previous"
            >
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
                chevron_left
              </span>
            </button>
            <span className="font-headline text-sm text-on-surface/40 tabular-nums min-w-[3rem] text-center">
              {index + 1} / {TESTIMONIALS.length}
            </span>
            <button
              onClick={() => go(1)}
              className="w-12 h-12 rounded-full border border-outline/30 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 group"
              aria-label="Next"
            >
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
                chevron_right
              </span>
            </button>
          </div>
        </div>

        {/* Testimonial card */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-full"
            >
              <div className="bg-surface-container rounded-[2.5rem] p-10 md:p-16 flex flex-col md:flex-row gap-12 items-start">
                {/* Avatar */}
                <div className="shrink-0">
                  <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center font-headline font-extrabold text-on-primary-container text-xl">
                    {current.initial}
                  </div>
                </div>
                {/* Content */}
                <div className="flex-1">
                  <Stars />
                  <p className="text-primary font-body text-2xl md:text-3xl font-light italic leading-relaxed mb-10">
                    &ldquo;{current.quote}&rdquo;
                  </p>
                  <div className="h-px w-12 bg-secondary/40 mb-6" />
                  <p className="font-headline font-bold text-primary text-lg">{current.name}</p>
                  <p className="text-on-surface/50 text-sm mt-1">{current.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-10">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i) }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'bg-primary w-8' : 'bg-outline-variant/50 w-2 hover:bg-outline'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
