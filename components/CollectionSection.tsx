"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import SpotlightCard from "./ui/SpotlightCard";
import { COLLECTION_SECTION, CATEGORIES } from "@/lib/constants";

const CARD_STYLE = [
  {
    imageBg: "bg-gradient-to-br from-amber-50 via-orange-50 to-stone-200",
    ringColor: "border-amber-300/30",
    orbColor: "bg-amber-200/30",
    eyebrow: "01 · Whole",
    accent: "#92400e",
  },
  {
    imageBg: "bg-gradient-to-br from-yellow-50 via-amber-100 to-amber-200/60",
    ringColor: "border-yellow-300/30",
    orbColor: "bg-yellow-200/40",
    eyebrow: "02 · Powder",
    accent: "#78350f",
  },
];

export default function CollectionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      className="py-32 bg-surface-container-high"
      id="collection"
      ref={ref}
    >
      <div className="max-w-screen-2xl mx-auto px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-secondary font-headline font-bold tracking-[0.2em] uppercase text-sm mb-4 block">
              {COLLECTION_SECTION.eyebrow}
            </span>
            <h2 className="text-primary font-headline font-extrabold text-4xl md:text-6xl leading-tight">
              {COLLECTION_SECTION.headingStart}{" "}
              <span className="font-light italic">
                {COLLECTION_SECTION.headingHighlight}
              </span>
            </h2>
          </motion.div>
          <motion.a
            href="/whole-spices"
            className="inline-flex items-center gap-2 text-primary font-headline font-bold border-b-2 border-primary pb-1 hover:gap-4 transition-all duration-300 text-sm self-start md:self-end"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {COLLECTION_SECTION.viewAll}
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "18px" }}
            >
              arrow_forward
            </span>
          </motion.a>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {CATEGORIES.map((cat, i) => {
            const style = CARD_STYLE[i] ?? CARD_STYLE[0];
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.75,
                  delay: i * 0.14,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="h-full"
              >
                <SpotlightCard
                  className="h-full rounded-[2.5rem]"
                  spotlightColor="rgba(2, 28, 16, 0.06)"
                >
                  <Link
                    href={cat.href}
                    className={`group flex flex-col h-full relative overflow-hidden rounded-[2.5rem]  shadow-[0_2px_24px_rgba(0,0,0,0.07)] hover:shadow-[0_8px_48px_rgba(0,0,0,0.14)] transition-all duration-500 bg-white`}
                  >
                    {/* ── Image zone ── */}
                    <div
                      className={`relative overflow-hidden ${style.imageBg} flex-shrink-0`}
                      style={{ aspectRatio: "4/3" }}
                    >
                      {/* Decorative concentric rings */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div
                          className={`absolute w-[280px] h-[280px] rounded-full border ${style.ringColor}`}
                        />
                        <div
                          className={`absolute w-[200px] h-[200px] rounded-full border ${style.ringColor}`}
                        />
                        <div
                          className={`absolute w-[120px] h-[120px] rounded-full ${style.orbColor} blur-xl`}
                        />
                      </div>

                      {/* Product image */}
                      <Image
                        src={cat.imgSrc}
                        alt={cat.imgAlt}
                        fill
                        className="object-contain p-10 transition-transform duration-700 ease-out group-hover:scale-[1.06] relative z-10 drop-shadow-xl "
                      />

                      {/* Subtle bottom fade into white card body */}
                      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-white/60 to-transparent z-20" />

                      {/* Badge — top-right, white pill */}
                      <div className="absolute top-5 right-5 z-30 bg-white/90 backdrop-blur-md text-primary px-3.5 py-1.5 rounded-full text-[11px] font-headline font-extrabold shadow-md flex items-center gap-1.5 tracking-wide">
                        <span
                          className="material-symbols-outlined"
                          style={{
                            fontSize: "12px",
                            fontVariationSettings: "'FILL' 1",
                            color: style.accent,
                          }}
                        >
                          {cat.badgeIcon}
                        </span>
                        {cat.badge}
                      </div>
                    </div>

                    {/* ── Content zone ── */}
                    <div className="px-8 pt-7 pb-8 flex flex-col flex-grow">
                      {/* Eyebrow */}
                      <span className="text-[10px] font-headline font-bold tracking-[0.28em] uppercase text-on-surface/30 mb-3 block">
                        {style.eyebrow}
                      </span>

                      {/* Title row */}
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h3 className="text-primary font-headline font-extrabold text-[1.7rem] leading-tight">
                          {cat.title}
                        </h3>
                        {/* Animated arrow circle */}
                        <div className="w-10 h-10 rounded-full border-2 border-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 group-hover:bg-primary group-hover:border-primary group-hover:scale-110">
                          <span
                            className="material-symbols-outlined text-primary/35 transition-colors duration-300 group-hover:text-white"
                            style={{ fontSize: "17px" }}
                          >
                            north_east
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-on-surface/55 text-sm leading-[1.75] flex-grow mb-7">
                        {cat.description}
                      </p>

                      {/* CTA */}
                      <div className="mt-auto">
                        <span className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full font-headline font-semibold text-sm transition-all duration-300 bg-[#F7F5F0] text-primary group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/25">
                          Explore Collection
                          <span
                            className="material-symbols-outlined opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5"
                            style={{ fontSize: "16px" }}
                          >
                            arrow_forward
                          </span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
