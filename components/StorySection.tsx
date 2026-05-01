'use client'

import { motion, useInView } from 'framer-motion'
import BlurText from './ui/BlurText'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { STORY } from '@/lib/constants'
import { cn } from '@/lib/utils'

function WobbleCard({ children, containerClassName, className }: { children: React.ReactNode, containerClassName?: string, className?: string }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = event;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (clientX - (rect.left + rect.width / 2)) / 20;
    const y = (clientY - (rect.top + rect.height / 2)) / 20;
    setMousePosition({ x, y });
  };
  return (
    <motion.section
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      style={{
        transform: isHovering
          ? `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) scale3d(1, 1, 1)`
          : "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
        transition: "transform 0.1s ease-out",
      }}
      className={cn(
        "mx-auto w-full relative rounded-3xl overflow-hidden",
        containerClassName
      )}
    >
      <div
        className="relative h-full sm:mx-0 sm:rounded-3xl overflow-hidden"
        style={{
          boxShadow:
            "0 10px 32px rgba(34, 42, 53, 0.12), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.05), 0 4px 6px rgba(34, 42, 53, 0.08), 0 24px 108px rgba(47, 48, 55, 0.10)",
        }}
      >
        <motion.div
          style={{
            transform: isHovering
              ? `translate3d(${-mousePosition.x}px, ${-mousePosition.y}px, 0) scale3d(1.03, 1.03, 1)`
              : "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
            transition: "transform 0.1s ease-out",
          }}
          className={cn("h-full", className)}
        >
          {children}
        </motion.div>
      </div>
    </motion.section>
  );
}
export default function StorySection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 40 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
  })

  return (
    <section className="py-32 px-8 bg-surface" id="story" ref={ref}>
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Image stack */}
          <motion.div className="lg:col-span-5 relative" {...fadeUp(0)}>
            <WobbleCard 
              containerClassName="relative z-10 aspect-[4/5] rounded-3xl overflow-hidden editorial-shadow"
            >
              <Image
                src="/cardImages/image-2.png"
                alt="Hands holding fresh organic soil with green sprouts"
                fill
                className="object-cover"
              />
            </WobbleCard>
            {/* Decorative inset image */}
            <WobbleCard 
              containerClassName="absolute -bottom-12 -right-12 w-2/3 aspect-square rounded-3xl overflow-hidden editorial-shadow border-8 border-surface z-20 hidden md:block"
            >
              <Image
                src="/cardImages/image-1.png"
                alt="Organic lentils and seeds arranged in rustic wooden bowls"
                fill
                className="object-cover"
              />
            </WobbleCard>
          </motion.div>

          {/* Text content */}
          <div className="lg:col-span-7 lg:pl-12">
            <motion.span
              className="text-secondary font-headline font-bold tracking-[0.2em] uppercase text-sm mb-6 block"
              {...fadeUp(0.1)}
            >
              {STORY.eyebrow}
            </motion.span>

            <BlurText
              text={STORY.heading}
              className="text-primary font-headline font-extrabold text-4xl md:text-5xl mb-8 leading-tight"
              delay={110}
              animateBy="words"
              direction="top"
            />

            <motion.div
              className="space-y-6 text-on-surface/80 text-lg leading-relaxed max-w-xl"
              {...fadeUp(0.3)}
            >
              {STORY.paragraphs.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
              <div className="pt-8">
                <a
                  href="#collection"
                  className="inline-flex items-center gap-3 text-primary font-headline font-bold border-b-2 border-primary pb-1 hover:gap-5 transition-all duration-300"
                >
                  {STORY.cta}{' '}
                  <span className="material-symbols-outlined">arrow_forward</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
