'use client'

import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { useEffect, useState } from 'react'

const TREE_COLOR = '#0D4D26'
const LEAF_COLOR = '#0DAC4B'

// Cinematic timing — entry (seconds)
const DRAW_START      = 0.4
const DRAW_DURATION   = 3.0
const DRAW_STAGGER    = 0.15
const FILL_DELAY      = DRAW_START + DRAW_DURATION - 0.4
const FILL_DURATION   = 0.8
const LEAVES_DELAY    = FILL_DELAY + 0.4
const TEXT_DELAY      = LEAVES_DELAY + 0.8

// Exit timing (seconds)
const EXIT_DOTS_DUR     = 0.3
const EXIT_TEXT_DUR     = 0.55
const EXIT_LOGO_DELAY   = 0.15
const EXIT_LOGO_DUR     = 0.85
const EXIT_CURTAIN_DELAY = 0.55
const EXIT_CURTAIN_DUR  = 1.05
const EXIT_TOTAL_MS     = (EXIT_CURTAIN_DELAY + EXIT_CURTAIN_DUR + 0.05) * 1000 // unmount window

const MIN_DISPLAY_MS  = 5500
const SAFETY_MS       = 8000

const TREE_PATHS: string[] = [
  'M309.19,147.59c0.43,0.21,0.89,0.3,1.34,0.3c1.15,0,2.26-0.64,2.81-1.73c8.7-17.3-10.72-38.55-11.55-39.44c-1.18-1.27-3.17-1.35-4.44-0.17c-1.27,1.18-1.35,3.17-0.17,4.44c0.16,0.17,15.04,16.44,11.61,29.53c-37.43-16.02-85.76-6.43-87.85-6.01c-1.7,0.35-2.8,2.01-2.45,3.71c0.35,1.7,2,2.8,3.71,2.45C222.71,140.57,273.27,130.52,309.19,147.59z',
  'M386.54,251.18c-12.21,12.88-28.71,19.98-46.46,19.98c-17.78,0-34.29-7.11-46.5-20.03c-1.19-1.26-3.18-1.32-4.44-0.12c-1.26,1.19-1.32,3.18-0.12,4.44c13.41,14.18,31.54,21.99,51.06,21.99c19.49,0,37.61-7.79,51.01-21.94c1.19-1.26,1.14-3.25-0.12-4.44C389.72,249.87,387.74,249.93,386.54,251.18z',
  'M459.24,134.12c-2.09-0.43-50.42-10.02-87.85,6.01c-3.41-13.06,11.45-29.36,11.61-29.53c1.18-1.27,1.1-3.26-0.17-4.44c-1.27-1.18-3.26-1.1-4.44,0.17c-0.83,0.9-20.25,22.15-11.55,39.44c0.55,1.09,1.66,1.73,2.81,1.73c0.45,0,0.91-0.1,1.34-0.3c35.88-17.05,86.48-7.02,86.99-6.92c1.7,0.35,3.36-0.75,3.7-2.45C462.04,136.12,460.94,134.47,459.24,134.12z',
  'M449.72,156.26c-2.18-0.44-53.69-10.51-77.5,14.18c-7.47,7.74-12.41,20.41-14.37,36.77c-0.72-0.11-1.44-0.25-2.16-0.43l-8-1.98c-1.47-0.36-2.96-0.61-4.47-0.76v-73.11c0-0.05,0.01-0.1,0.01-0.14c0-9.29,7.24-22.78,21.1-39.51c0,0,0,0,0,0c0,0,0.01-0.01,0.01-0.01c0.13-0.16,0.26-0.31,0.39-0.47c5.15-5.71,23.1-7.48,42.09-7.31c0.05,0,0.1,0.02,0.15,0.02c0.01,0,0.03,0,0.04,0c5.05,0,15.92,16.62,23.11,32.03c0.53,1.14,1.67,1.81,2.85,1.81c0.44,0,0.9-0.1,1.32-0.3c1.57-0.73,2.25-2.6,1.52-4.17c-0.16-0.35-4.09-8.74-9.35-17.27c-3.28-5.31-6.1-9.1-8.54-11.81c8.37,0.38,16.49,1.06,23.35,1.87c1.73,0.21,3.28-1.03,3.49-2.75c0.2-1.72-1.03-3.28-2.75-3.49c-0.17-0.02-17.54-2.06-36.05-2.22c-13.22-0.13-23.65,0.69-31.44,2.46c1.37-1.48,2.79-2.99,4.25-4.51c17.89-18.69,36.05-33.75,36.23-33.9c1.34-1.11,1.52-3.08,0.42-4.42c-1.11-1.34-3.09-1.52-4.42-0.42c-1.48,1.22-19.25,16.01-37.01,34.64c-1.96-12.42-0.93-23.64-0.92-23.77c0.17-1.73-1.1-3.26-2.82-3.43c-1.72-0.17-3.26,1.1-3.43,2.82c-0.06,0.63-1.4,15.08,1.84,30.08c-2.91,3.19-5.77,6.45-8.51,9.75c-0.3,0.33-0.59,0.66-0.85,1c-0.02,0.02-0.03,0.05-0.05,0.08c-6.35,7.73-12.01,15.63-16.04,23.12V56.56c0-0.06-0.01-0.11-0.01-0.17c0.01-0.08,0.02-0.15,0.02-0.23c0-10.38,18.52-31.59,25.66-38.88c1.21-1.24,1.19-3.23-0.05-4.44c-1.24-1.21-3.23-1.19-4.44,0.05c-2.2,2.25-17.74,18.39-24.42,32.4c-6.78-13.92-22.04-29.78-24.22-32c-1.21-1.24-3.2-1.26-4.44-0.05c-1.24,1.21-1.26,3.2-0.05,4.44c7.14,7.3,25.66,28.51,25.66,38.88v54.51c-4.03-7.49-9.68-15.37-16.03-23.09c-0.02-0.02-0.03-0.05-0.05-0.08c-0.26-0.34-0.54-0.68-0.85-1c-2.74-3.3-5.6-6.56-8.51-9.75c3.25-15,1.91-29.45,1.84-30.08c-0.17-1.73-1.71-2.98-3.43-2.82c-1.73,0.17-2.99,1.7-2.82,3.43c0.01,0.13,1.05,11.33-0.92,23.77c-17.76-18.62-35.53-33.42-37.01-34.64c-1.33-1.11-3.31-0.92-4.42,0.42c-1.11,1.34-0.92,3.32,0.42,4.42c0.18,0.15,18.29,15.17,36.19,33.86c1.47,1.54,2.9,3.05,4.28,4.55c-7.78-1.77-18.21-2.58-31.43-2.45c-18.51,0.16-35.88,2.2-36.05,2.22c-1.72,0.2-2.95,1.77-2.75,3.49c0.2,1.72,1.76,2.96,3.49,2.75c6.86-0.81,14.98-1.5,23.35-1.88c-2.44,2.71-5.26,6.5-8.54,11.81c-5.26,8.53-9.19,16.92-9.35,17.27c-0.73,1.57-0.05,3.44,1.52,4.17c0.43,0.2,0.88,0.3,1.32,0.3c1.18,0,2.32-0.67,2.85-1.81c7.19-15.42,18.06-32.03,23.11-32.03c0.02,0,0.03,0,0.04,0c0.06,0,0.11-0.01,0.17-0.02c18.98-0.17,36.93,1.6,42.07,7.31c0.13,0.16,0.26,0.31,0.39,0.47c0,0,0.01,0.01,0.01,0.01c0,0,0,0,0,0c13.86,16.74,21.1,30.22,21.1,39.52v72.86c-1.49,0.15-2.98,0.39-4.45,0.75l-8,1.98c-0.73,0.18-1.47,0.32-2.2,0.43c-1.99-16.16-6.91-28.69-14.32-36.37c-23.82-24.7-75.32-14.62-77.5-14.18c-1.7,0.34-2.8,2-2.46,3.7c0.34,1.7,2,2.8,3.7,2.46c0.29-0.06,17.04-3.33,35.27-1.8c-4.32,3.22-9.58,8.35-14.2,16.26c-0.87,1.5-0.37,3.42,1.13,4.3c0.5,0.29,1.04,0.43,1.58,0.43c1.08,0,2.13-0.56,2.72-1.56c7.21-12.36,16.17-16.97,18.71-18.08c10.05,1.94,19.72,5.77,26.53,12.83c6.37,6.61,10.67,17.7,12.53,32.2c-0.87-0.08-1.73-0.2-2.58-0.37l-13.79-2.77c-4.33-0.87-8.7-0.83-13,0.11l-17.97,3.93c-1.69,0.37-2.77,2.04-2.4,3.74c0.32,1.47,1.62,2.47,3.06,2.47c0.22,0,0.45-0.02,0.67-0.07l17.97-3.93c3.44-0.75,6.95-0.78,10.42-0.08l13.79,2.77c2.41,0.49,4.88,0.68,7.34,0.59c0,0,0.01,0,0.01,0c0.01,0,0.02,0,0.02,0c0.03,0,0.06,0,0.09,0c2.12-0.08,4.26-0.38,6.37-0.9l8-1.98c4.08-0.99,8.26-0.97,12.19,0l8,1.98c2.1,0.52,4.23,0.82,6.32,0.9c0.03,0,0.06,0,0.09,0c0.01,0,0.03,0,0.04,0c0,0,0.01,0,0.01,0c2.47,0.09,4.94-0.11,7.37-0.59l13.78-2.76c3.47-0.7,6.98-0.67,10.42,0.08l17.96,3.93c1.7,0.37,3.37-0.7,3.74-2.4c0.37-1.69-0.7-3.37-2.4-3.74l-17.96-3.94c-4.3-0.94-8.68-0.97-13-0.1l-13.78,2.76c-0.87,0.18-1.75,0.3-2.63,0.38c1.82-14.7,6.14-25.93,12.58-32.6c6.81-7.06,16.49-10.89,26.54-12.83c2.52,1.08,11.42,5.6,18.71,18.08c0.58,1,1.64,1.56,2.72,1.56c0.54,0,1.08-0.14,1.58-0.43c1.5-0.87,2-2.8,1.13-4.3c-4.62-7.92-9.89-13.04-14.2-16.27c18.23-1.53,34.98,1.74,35.27,1.8c1.7,0.35,3.36-0.76,3.7-2.46C452.52,158.26,451.42,156.6,449.72,156.26z',
  'M403.99,230.91l-16.75-3.62c-4.88-1.05-10-0.89-14.8,0.49l-4.38,1.25c-2.72,0.78-5.55,1.07-8.4,0.86c-1.19-0.08-2.42-0.27-3.65-0.55l-9.09-2.08c-4.42-1.02-9.22-1.03-13.65,0l-9.04,2.08c-1.2,0.27-2.43,0.46-3.68,0.55c-2.83,0.21-5.64-0.08-8.37-0.86l-4.45-1.26c-4.8-1.36-9.91-1.53-14.78-0.48l-16.76,3.62c-1.7,0.37-2.77,2.04-2.4,3.73c0.37,1.69,2.04,2.77,3.73,2.4l16.76-3.62c3.86-0.84,7.92-0.7,11.73,0.38l4.45,1.26c3.43,0.98,6.98,1.34,10.54,1.08c1.56-0.11,3.12-0.34,4.64-0.69l9.05-2.09c3.51-0.81,7.32-0.81,10.83,0l9.1,2.09c1.55,0.35,3.1,0.58,4.59,0.69c3.59,0.26,7.15-0.11,10.58-1.09l4.37-1.25c3.81-1.09,7.88-1.22,11.75-0.39l16.74,3.62c0.22,0.05,0.45,0.07,0.67,0.07c1.45,0,2.75-1.01,3.07-2.48C406.76,232.95,405.68,231.28,403.99,230.91z',
]

interface Leaf {
  type: 'path' | 'ellipse'
  d?: string
  cx?: number
  cy?: number
  rx?: number
  ry?: number
}

const LEAVES: Leaf[] = [
  { type: 'path', d: 'M395.63,28.96c2.65-3.26,3.19-7.54,1.79-11.2c-3.86-0.62-7.95,0.79-10.59,4.05c-2.65,3.26-3.19,7.54-1.79,11.2C388.9,33.63,392.98,32.22,395.63,28.96z' },
  { type: 'ellipse', cx: 340.1, cy: 9.82, rx: 5.67, ry: 9.82 },
  { type: 'path', d: 'M295.15,33.01c1.4-3.65,0.86-7.94-1.79-11.2c-2.65-3.26-6.73-4.67-10.59-4.05c-1.4,3.65-0.86,7.94,1.79,11.2C287.21,32.22,291.29,33.63,295.15,33.01z' },
  { type: 'path', d: 'M248.18,63.55c3.65,2.07,7.97,1.9,11.34-0.09c-0.03-3.91-2.09-7.71-5.75-9.78c-3.65-2.07-7.97-1.9-11.34,0.09C242.47,57.69,244.53,61.48,248.18,63.55z' },
  { type: 'path', d: 'M232.23,115.9c-1.86-3.44-5.46-5.83-9.66-5.95c-4.2-0.12-7.93,2.06-9.98,5.39c1.86,3.44,5.46,5.83,9.66,5.95C226.45,121.41,230.18,119.24,232.23,115.9z' },
  { type: 'path', d: 'M280.8,114.55c2.54-3.35,2.93-7.65,1.41-11.25c-3.88-0.49-7.91,1.06-10.45,4.41c-2.54,3.35-2.93,7.65-1.41,11.25C274.24,119.44,278.27,117.89,280.8,114.55z' },
  { type: 'path', d: 'M432,63.55c3.65-2.07,5.72-5.86,5.74-9.78c-3.37-1.98-7.69-2.16-11.34-0.09c-3.65,2.07-5.72,5.86-5.75,9.78C424.04,65.45,428.35,65.62,432,63.55z' },
  { type: 'path', d: 'M457.61,109.96c-4.2,0.12-7.8,2.5-9.66,5.95c2.05,3.33,5.78,5.51,9.98,5.39c4.2-0.12,7.8-2.5,9.66-5.95C465.54,112.01,461.81,109.84,457.61,109.96z' },
  { type: 'path', d: 'M397.98,103.29c-1.52,3.6-1.13,7.9,1.41,11.25c2.54,3.35,6.57,4.89,10.45,4.41c1.52-3.6,1.13-7.9-1.41-11.25C405.89,104.35,401.86,102.8,397.98,103.29z' },
]

const leafVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
  },
}

const leavesContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: LEAVES_DELAY },
  },
}

const leafStyle: React.CSSProperties = {
  transformBox: 'fill-box',
  transformOrigin: 'center',
}

// Easing curves
const EASE_OUT_CINE   = [0.25, 0.46, 0.45, 0.94] as const
const EASE_IN_CINE    = [0.55, 0.05, 0.7, 0.2] as const
const EASE_EXPO_INOUT = [0.83, 0, 0.17, 1] as const

export default function MainLoader() {
  const [show, setShow] = useState(true)
  const [exiting, setExiting] = useState(false)

  // Trigger exit when window loads (or after min display time)
  useEffect(() => {
    const start = Date.now()

    const beginExit = () => {
      const elapsed = Date.now() - start
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed)
      setTimeout(() => setExiting(true), remaining)
    }

    if (document.readyState === 'complete') {
      beginExit()
    } else {
      window.addEventListener('load', beginExit, { once: true })
    }

    const safety = setTimeout(() => setExiting(true), SAFETY_MS)

    return () => {
      window.removeEventListener('load', beginExit)
      clearTimeout(safety)
    }
  }, [])

  // After exit animation completes, fully unmount
  useEffect(() => {
    if (!exiting) return
    const t = setTimeout(() => setShow(false), EXIT_TOTAL_MS)
    return () => clearTimeout(t)
  }, [exiting])

  return (
    <AnimatePresence>
      {show && (
        <div
          key="rawat-loader"
          className="fixed inset-0 z-[9999] overflow-hidden pointer-events-none"
          aria-hidden="true"
        >
          {/* ── Curtain top half ────────────────────────────────── */}
          <motion.div
            className="absolute inset-x-0 top-0 h-[51%] bg-white"
            initial={{ y: 0 }}
            animate={exiting ? { y: '-101%' } : { y: 0 }}
            transition={{
              duration: EXIT_CURTAIN_DUR,
              delay: exiting ? EXIT_CURTAIN_DELAY : 0,
              ease: EXIT_EXPO,
            }}
            style={{ willChange: 'transform' }}
          />

          {/* ── Curtain bottom half ─────────────────────────────── */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-[51%] bg-white"
            initial={{ y: 0 }}
            animate={exiting ? { y: '101%' } : { y: 0 }}
            transition={{
              duration: EXIT_CURTAIN_DUR,
              delay: exiting ? EXIT_CURTAIN_DELAY : 0,
              ease: EXIT_EXPO,
            }}
            style={{ willChange: 'transform' }}
          />

          {/* ── Subtle ambient gradient (rides with curtains) ───── */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 1 }}
            animate={exiting ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              background:
                'radial-gradient(circle at 50% 55%, rgba(13,77,38,0.05) 0%, transparent 65%)',
            }}
          />

          {/* ── Content (logo + text + dots) ────────────────────── */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">

            {/* Logo container — scales up + fades + blurs on exit */}
            <motion.div
              className="relative w-80 sm:w-96 md:w-[28rem] lg:w-[32rem]"
              initial={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              animate={
                exiting
                  ? { scale: 1.18, opacity: 0, filter: 'blur(6px)' }
                  : { scale: 1, opacity: 1, filter: 'blur(0px)' }
              }
              transition={{
                duration: EXIT_LOGO_DUR,
                delay: exiting ? EXIT_LOGO_DELAY : 0,
                ease: exiting ? EXIT_IN : EASE_OUT_CINE,
              }}
              style={{ willChange: 'transform, opacity, filter' }}
            >
              {/* Tree paths — line drawing */}
              <svg
                viewBox="0 0 680.19 463.32"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto"
              >
                <g>
                  {TREE_PATHS.map((d, i) => (
                    <motion.path
                      key={i}
                      d={d}
                      fill={TREE_COLOR}
                      stroke={TREE_COLOR}
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0, fillOpacity: 0 }}
                      animate={{ pathLength: 1, fillOpacity: 1 }}
                      transition={{
                        pathLength: {
                          duration: DRAW_DURATION,
                          delay: DRAW_START + i * DRAW_STAGGER,
                          ease: [0.65, 0, 0.35, 1],
                        },
                        fillOpacity: {
                          duration: FILL_DURATION,
                          delay: FILL_DELAY + i * 0.05,
                          ease: 'easeOut',
                        },
                      }}
                    />
                  ))}
                </g>
              </svg>

              {/* Leaves overlay */}
              <svg
                viewBox="0 0 680.19 463.32"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 w-full h-auto pointer-events-none"
              >
                <motion.g
                  fill={LEAF_COLOR}
                  variants={leavesContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {LEAVES.map((leaf, i) =>
                    leaf.type === 'ellipse' ? (
                      <motion.ellipse
                        key={i}
                        cx={leaf.cx}
                        cy={leaf.cy}
                        rx={leaf.rx}
                        ry={leaf.ry}
                        variants={leafVariants}
                        style={leafStyle}
                      />
                    ) : (
                      <motion.path
                        key={i}
                        d={leaf.d}
                        variants={leafVariants}
                        style={leafStyle}
                      />
                    )
                  )}
                </motion.g>
              </svg>
            </motion.div>

            {/* Brand text */}
            <motion.div
              className="mt-12 md:mt-14 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={
                exiting
                  ? { opacity: 0, y: 14 }
                  : { opacity: 1, y: 0 }
              }
              transition={{
                duration: exiting ? EXIT_TEXT_DUR : 0.9,
                delay: exiting ? 0 : TEXT_DELAY,
                ease: exiting ? EXIT_IN : EASE_OUT_CINE,
              }}
            >
              <p
                className="font-headline font-extrabold text-3xl md:text-4xl tracking-tight"
                style={{ color: TREE_COLOR }}
              >
                Rawat Organics
              </p>

              <div className="mt-4 flex items-center justify-center gap-3">
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: 40 }}
                  transition={{ duration: 0.8, delay: TEXT_DELAY + 0.3 }}
                  className="block h-px"
                  style={{ backgroundColor: TREE_COLOR, opacity: 0.3 }}
                />
                <p
                  className="text-[11px] font-headline tracking-[0.3em] uppercase"
                  style={{ color: TREE_COLOR, opacity: 0.55 }}
                >
                  Pure · Organic · Natural
                </p>
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: 40 }}
                  transition={{ duration: 0.8, delay: TEXT_DELAY + 0.3 }}
                  className="block h-px"
                  style={{ backgroundColor: TREE_COLOR, opacity: 0.3 }}
                />
              </div>
            </motion.div>
          </div>

          {/* Loading dots — fade out first on exit */}
          <motion.div
            className="absolute bottom-14 left-0 right-0 flex justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={exiting ? { opacity: 0 } : { opacity: 1 }}
            transition={{
              duration: exiting ? EXIT_DOTS_DUR : 0.6,
              delay: exiting ? 0 : TEXT_DELAY + 0.7,
            }}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="block w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: TREE_COLOR }}
                animate={{ opacity: [0.25, 1, 0.25], scale: [0.85, 1, 0.85] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

// Re-export easing constants under shorter aliases used inside JSX
const EXIT_EXPO = EASE_EXPO_INOUT
const EXIT_IN   = EASE_IN_CINE
