"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-bg-base">
      {/* Full-bleed silent video — macro mineral hot spring water, color graded warm-dark.
          TODO: replace /media/hero.webm + /media/hero.mp4 with final color-graded asset.
          Required: < 4MB, looped, no audio track. */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/media/hero-poster.jpg"
        aria-hidden="true"
      >
        <source src="/media/hero.webm" type="video/webm" />
        <source src="/media/hero.mp4" type="video/mp4" />
      </video>

      {/* Overlay — warms the video into the palette */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(10, 9, 8, 0.55)" }}
        aria-hidden="true"
      />

      {/* Left edge accent line — 2px, 60% viewport height, vertically centered */}
      <div
        className="absolute left-0 top-1/2 hidden h-[60vh] w-[2px] -translate-y-1/2 bg-accent md:block"
        aria-hidden="true"
      />

      {/* Content — bottom-left, 120px desktop padding */}
      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-16 md:px-[120px] md:pb-[120px]">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="mb-8 font-mono text-caption uppercase tracking-caption text-text-secondary md:text-caption-lg"
        >
          ONSEN LABO · SLEEP-TECH PROTOCOL · v1
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          className="font-sans font-extralight text-text-primary text-[56px] leading-[0.98] tracking-display md:text-[120px]"
        >
          Your sleep,
          <br />
          <span className="text-text-primary">prescribed.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
          className="mt-8 max-w-xl font-serif font-light text-[18px] leading-relaxed text-text-secondary md:text-[24px]"
        >
          あなたのための、AI処方温泉。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
          className="mt-12 flex flex-col gap-4 md:flex-row md:items-center md:gap-8"
        >
          <Link
            href="/quiz"
            className="group inline-flex items-center justify-center border border-text-primary px-6 py-4 font-mono text-caption uppercase tracking-caption text-text-primary transition-colors duration-200 hover:border-accent md:px-8"
          >
            <span className="relative">
              Take the AI Bath Quiz
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </span>
            <span className="ml-3 transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>

          <a
            href="#final-cta"
            className="group inline-flex items-center font-mono text-caption uppercase tracking-caption text-text-secondary transition-colors duration-200 hover:text-accent"
          >
            <span className="mr-3 inline-block h-px w-6 bg-text-tertiary transition-colors duration-200 group-hover:bg-accent" />
            12,847 on the waitlist
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator — bottom-right vertical line with traveling accent dot */}
      <div
        className="absolute bottom-12 right-6 hidden h-20 w-px overflow-hidden bg-line md:block md:right-[120px]"
        aria-hidden="true"
      >
        <motion.span
          className="absolute left-1/2 h-2 w-2 -translate-x-1/2 bg-accent"
          initial={{ top: "-10%" }}
          animate={{ top: "110%" }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </section>
  );
}
