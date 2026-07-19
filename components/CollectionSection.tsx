"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import SpotlightCard from "./ui/SpotlightCard";
import { COLLECTION_SECTION } from "@/lib/constants";
import { useCatalogStore } from "@/lib/store/catalogStore";

const CARD_STYLE = [
  {
    imageBg: "bg-gradient-to-br from-amber-50 via-orange-50 to-stone-200",
    ringColor: "border-amber-300/30",
    orbColor: "bg-amber-200/30",
    accent: "#92400e",
  },
  {
    imageBg: "bg-gradient-to-br from-yellow-50 via-amber-100 to-amber-200/60",
    ringColor: "border-yellow-300/30",
    orbColor: "bg-yellow-200/40",
    accent: "#78350f",
  },
  {
    imageBg: "bg-gradient-to-br from-rose-50 via-orange-50 to-stone-200",
    ringColor: "border-rose-300/30",
    orbColor: "bg-rose-200/30",
    accent: "#9f1239",
  },
];

function pad(n: number): string {
  return String(n + 1).padStart(2, "0");
}

export default function CollectionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const categories = useCatalogStore((s) => s.categories);
  const status = useCatalogStore((s) => s.status);
  const error = useCatalogStore((s) => s.error);
  const fetchCategories = useCatalogStore((s) => s.fetchCategories);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const isLoading = status === "loading" || status === "idle";

  return (
    <section className="py-32 bg-surface-container-high" id="collection" ref={ref}>
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
          {categories.length > 0 && (
            <motion.a
              href={`/${categories[0].slug}`}
              className="inline-flex items-center gap-2 text-primary font-headline font-bold border-b-2 border-primary pb-1 hover:gap-4 transition-all duration-300 text-sm self-start md:self-end"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {COLLECTION_SECTION.viewAll}
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                arrow_forward
              </span>
            </motion.a>
          )}
        </div>

        {/* ── Error state ── */}
        {status === "error" && (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-[2.5rem] border border-outline-variant/20">
            <span
              className="material-symbols-outlined text-on-surface/20 mb-4"
              style={{ fontSize: "52px" }}
            >
              cloud_off
            </span>
            <p className="font-headline font-bold text-on-surface/60 text-lg mb-1">
              Couldn&apos;t load collections
            </p>
            <p className="text-on-surface/40 text-sm mb-6">
              {error ?? "Something went wrong."}
            </p>
            <button
              onClick={() => fetchCategories(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-fixed font-headline font-bold text-sm rounded-full hover:scale-105 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>refresh</span>
              Try Again
            </button>
          </div>
        )}

        {/* ── Skeleton ── */}
        {status !== "error" && isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="rounded-[2.5rem] bg-white border border-outline-variant/20 overflow-hidden"
              >
                <div className="aspect-[4/3] bg-surface-container animate-pulse" />
                <div className="px-8 pt-7 pb-8 space-y-4">
                  <div className="h-3 w-20 bg-surface-container animate-pulse rounded-full" />
                  <div className="h-7 w-1/2 bg-surface-container animate-pulse rounded-full" />
                  <div className="h-3 w-full bg-surface-container animate-pulse rounded-full" />
                  <div className="h-3 w-4/5 bg-surface-container animate-pulse rounded-full" />
                  <div className="h-11 w-44 bg-surface-container animate-pulse rounded-full mt-6" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Empty ── */}
        {status === "ready" && categories.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-[2.5rem] border border-outline-variant/20">
            <span
              className="material-symbols-outlined text-on-surface/20 mb-4"
              style={{ fontSize: "52px", fontVariationSettings: "'FILL' 1" }}
            >
              category
            </span>
            <p className="font-headline font-bold text-on-surface/60 text-lg">
              No collections yet
            </p>
            <p className="text-on-surface/40 text-sm mt-1">
              Collections will appear here once added.
            </p>
          </div>
        )}

        {/* ── Cards grid ── */}
        {status === "ready" && categories.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {categories.map((cat, i) => {
              const style = CARD_STYLE[i % CARD_STYLE.length];
              return (
                <motion.div
                  key={cat._id}
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
                      href={`/${cat.slug}`}
                      className="group flex flex-col h-full relative overflow-hidden rounded-[2.5rem] shadow-[0_2px_24px_rgba(0,0,0,0.07)] hover:shadow-[0_8px_48px_rgba(0,0,0,0.14)] transition-all duration-500 bg-white"
                    >
                      {/* Image zone */}
                      <div
                        className={`relative overflow-hidden ${style.imageBg} flex-shrink-0`}
                        style={{ aspectRatio: "4/3" }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className={`absolute w-[280px] h-[280px] rounded-full border ${style.ringColor}`} />
                          <div className={`absolute w-[200px] h-[200px] rounded-full border ${style.ringColor}`} />
                          <div className={`absolute w-[120px] h-[120px] rounded-full ${style.orbColor} blur-xl`} />
                        </div>

                        {cat.bannerImage && (
                          <Image
                            src={cat.bannerImage}
                            alt={cat.name}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] relative z-10"
                          />
                        )}

                        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-white/60 to-transparent z-20" />

                        {cat.badge && (
                          <div className="absolute top-5 right-5 z-30 bg-white/90 backdrop-blur-md text-primary px-3.5 py-1.5 rounded-full text-[11px] font-headline font-extrabold shadow-md flex items-center gap-1.5 tracking-wide">
                            {cat.badgeIcon && (
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
                            )}
                            {cat.badge}
                          </div>
                        )}
                      </div>

                      {/* Content zone */}
                      <div className="px-8 pt-7 pb-8 flex flex-col flex-grow">
                        <span className="text-[10px] font-headline font-bold tracking-[0.28em] uppercase text-on-surface/30 mb-3 block">
                          {pad(i)} · {cat.name.split(" ")[0]}
                        </span>

                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h3 className="text-primary font-headline font-extrabold text-[1.7rem] leading-tight">
                            {cat.name}
                          </h3>
                          <div className="w-10 h-10 rounded-full border-2 border-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 group-hover:bg-primary group-hover:border-primary group-hover:scale-110">
                            <span
                              className="material-symbols-outlined text-primary/35 transition-colors duration-300 group-hover:text-white"
                              style={{ fontSize: "17px" }}
                            >
                              north_east
                            </span>
                          </div>
                        </div>

                        <p className="text-on-surface/55 text-sm leading-[1.75] flex-grow mb-7 line-clamp-3">
                          {cat.description}
                        </p>

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
        )}
      </div>
    </section>
  );
}
