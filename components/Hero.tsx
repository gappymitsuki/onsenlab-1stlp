"use client";

import Link from "next/link";
import SteamField from "./SteamField";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-sumi text-washi">
      {/* z-0: WebGL placeholder steam field */}
      <SteamField />

      {/* z-1: V1 cinematic plate — water sliding across wet basalt.
          TODO: drop /media/v1-basalt.{webm,mp4} (graded per §7.2). */}
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-screen"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/media/v1-basalt-poster.jpg"
        aria-hidden="true"
      >
        <source src="/media/v1-basalt.webm" type="video/webm" />
        <source src="/media/v1-basalt.mp4" type="video/mp4" />
      </video>

      {/* z-2: deep sumi tint to keep type legible */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(5, 4, 3, 0.45)" }}
        aria-hidden="true"
      />

      {/* Hairline frame */}
      <div className="pointer-events-none absolute inset-x-0 top-[88px] h-px bg-ash" aria-hidden="true" />

      {/* Top-right tape — waitlist + batch */}
      <div className="absolute right-6 top-[120px] z-10 flex flex-col items-end gap-2 md:right-[clamp(48px,6vw,120px)] md:top-[140px]">
        <span className="font-mono text-[10px] uppercase tracking-mono text-mist">
          WAITLIST <span className="ml-2 tnum text-washi">12,847</span>
        </span>
        <span className="h-px w-12 bg-ash" />
        <span className="font-mono text-[10px] uppercase tracking-mono text-mist">
          NEXT BATCH <span className="ml-2 tnum text-washi">Q3 2026</span>
        </span>
      </div>

      {/* Bottom-left content cluster */}
      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-20 md:px-[clamp(48px,6vw,120px)] md:pb-[12vh]">
        <Reveal as="p" mode="fade" delay={0.1}>
          <span className="block font-mono text-[10px] uppercase tracking-mono text-copper">
            ONSEN LAB · SLEEP-TECH PROTOCOL · v1 · EST. 2026 · TOKYO
          </span>
        </Reveal>

        <h1
          className="mt-10 max-w-[1100px] font-display leading-monolith tracking-display text-washi"
          style={{ fontSize: "clamp(64px, 14vw, 220px)" }}
        >
          <Reveal as="span" mode="words" stagger={0.05} duration={1.4}>
            Sleep,
          </Reveal>
          <br />
          <Reveal as="span" mode="words" stagger={0.05} duration={1.4} delay={0.2}>
            prescribed.
          </Reveal>
        </h1>

        <div className="mt-10 flex items-center gap-6">
          <span className="h-px w-20 bg-copper" aria-hidden="true" />
          <Reveal as="p" mode="fade" delay={0.6}>
            <span
              className="font-serif font-light italic text-mist"
              style={{ fontSize: "clamp(15px, 1.6vw, 22px)" }}
            >
              An AI-prescribed onsen protocol, made for you.
            </span>
          </Reveal>
        </div>

        {/* Primary CTA */}
        <Reveal as="div" mode="fade" delay={0.85} className="mt-12 inline-block">
          <Link
            href="/quiz"
            data-cursor-label="ENTER"
            className="group relative inline-flex h-16 w-[320px] items-center justify-between overflow-hidden border border-copper pl-7 pr-6 font-mono text-[11px] uppercase tracking-mono text-washi"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 origin-bottom scale-y-0 bg-copper transition-transform duration-medium ease-onsen-out group-hover:scale-y-100"
            />
            <span className="relative z-10 transition-colors duration-medium ease-onsen-out group-hover:text-sumi">
              TAKE THE AI BATH QUIZ
            </span>
            <span
              className="relative z-10 transition-[transform,color] duration-medium ease-onsen-out group-hover:translate-x-2 group-hover:text-sumi"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </Reveal>
      </div>

      {/* Bottom-right scroll indicator — vertical hairline + traveling copper dot */}
      <div
        className="pointer-events-none absolute bottom-12 right-6 z-10 hidden flex-col items-center md:right-[clamp(48px,6vw,120px)] md:flex"
        aria-hidden="true"
      >
        <span className="relative block h-[120px] w-px overflow-hidden bg-mist/40">
          <span
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              top: "-10%",
              width: 6,
              height: 6,
              background: "var(--color-copper)",
              animation: "scroll-dot 3.2s linear infinite",
            }}
          />
        </span>
        <span className="mt-4 font-mono text-[10px] uppercase tracking-mono text-mist">SCROLL</span>
        <style>{`
          @keyframes scroll-dot {
            from { top: -10%; }
            to   { top: 110%; }
          }
        `}</style>
      </div>
    </section>
  );
}
