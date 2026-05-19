"use client";

import Link from "next/link";
import SteamField from "./SteamField";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-sumi text-washi">
      {/* z-0: WebGL Curl-noise steam field (with reduced-motion fallback) */}
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

      {/* TASK-12 — Left 2px copper rail spanning the hero (after header) */}
      <div
        className="pointer-events-none absolute left-6 top-[120px] hidden w-[2px] bg-copper md:block md:left-[clamp(48px,6vw,120px)]"
        style={{ height: "calc(100% - 160px)" }}
        aria-hidden="true"
      />

      {/* Hairline above content */}
      <div
        className="pointer-events-none absolute inset-x-0 top-[88px] h-px bg-ash"
        aria-hidden="true"
      />

      {/* Waitlist badge — non-interactive social proof, ranked below the
          primary CTA (border-only, no fill, opacity 0.85). The "as of
          May 2026" timestamp anchors the 12,847 number to a real
          calendar moment — addresses the smoke-test concern that a bare
          counter reads as fabricated. */}
      <div
        role="status"
        aria-label="Waitlist count, launch window, and counter timestamp"
        className="absolute right-6 top-[120px] z-10 inline-flex flex-col items-end gap-2 border border-mist/40 px-3 py-2 md:right-[clamp(48px,6vw,120px)] md:top-[140px] md:px-4"
        style={{ opacity: 0.85 }}
      >
        <div className="flex flex-col items-end gap-2 md:flex-row md:items-center md:gap-3">
          <span className="font-mono text-[10px] uppercase tracking-mono text-mist">
            <span className="tnum text-washi">12,847</span> reservations
          </span>
          <span
            aria-hidden="true"
            className="hidden h-3 w-px bg-mist/40 md:inline-block"
          />
          <span className="font-mono text-[10px] uppercase tracking-mono text-mist">
            Launching <span className="tnum text-washi">Q3 2026</span>
          </span>
        </div>
        <span
          className="font-mono uppercase tracking-mono text-mist"
          style={{ fontSize: "9px", opacity: 0.6 }}
        >
          as of May 2026
        </span>
      </div>

      {/* Bottom-left content cluster */}
      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-20 md:px-[clamp(72px,7vw,148px)] md:pb-[12vh]">
        <Reveal as="p" mode="fade" delay={0.1}>
          <span className="block font-mono text-[10px] uppercase tracking-mono text-copper">
            ONSEN LABO · SLEEP-TECH PROTOCOL · v1 · EST. 2026 · TOKYO
          </span>
        </Reveal>

        {/* TASK-10 — Monolith Hero type up to 220px at 1920px */}
        <h1
          className="mt-10 max-w-[1280px] font-display font-light leading-[0.92] tracking-display text-washi"
          style={{ fontSize: "clamp(72px, 14vw, 220px)" }}
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
          {/* Sub-headline option C selected: names the category ("Japanese
              onsen minerals" — Tatcha-style cultural anchor without JP
              characters), makes the AI personalization explicit (the actual
              differentiator vs Da Bomb), and ties to the primary outcome
              (sleep). Tightest of the three candidates. JP cultural anchor
              is preserved downstream in Footer ("Sourced in Japan · Shipped
              from Tokyo") and in the kanji artifacts on the Onsens cards. */}
          <Reveal as="p" mode="fade" delay={0.6}>
            <span
              className="font-serif font-light italic text-mist"
              style={{ fontSize: "clamp(15px, 1.6vw, 22px)" }}
            >
              Japanese onsen minerals, AI-matched to your sleep profile.
            </span>
          </Reveal>
        </div>

        {/* Primary CTA */}
        <Reveal as="div" mode="fade" delay={0.85} className="mt-12 inline-block">
          <Link
            href="/quiz"
            data-cursor-label="ENTER"
            data-track="cta_quiz_hero"
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

        {/* Ritual axis — runs in parallel with the medical/protocol frame
            above. Small, subordinate, but visible. */}
        <Reveal as="p" mode="fade" delay={1.05} className="mt-6">
          <span className="font-mono text-[10px] uppercase tracking-mono text-mist">
            An evening ritual. Backed by sleep science.
          </span>
        </Reveal>
      </div>

      {/* TASK-12 — Bottom-right falling-light scroll indicator */}
      <div
        className="pointer-events-none absolute bottom-12 right-6 z-10 hidden flex-col items-center gap-4 md:right-[clamp(48px,6vw,120px)] md:flex"
        aria-hidden="true"
      >
        <div className="relative h-[120px] w-px overflow-hidden bg-mist/40">
          <div
            className="absolute left-0 w-px bg-copper"
            style={{
              height: 24,
              top: -24,
              animation: "fallingLight 3.2s cubic-bezier(0.83, 0, 0.17, 1) infinite",
            }}
          />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-mono text-mist">
          SCROLL
        </span>
        <style>{`
          @keyframes fallingLight {
            0%   { transform: translateY(0);     opacity: 0; }
            18%  { opacity: 1; }
            82%  { opacity: 1; }
            100% { transform: translateY(144px); opacity: 0; }
          }
        `}</style>
      </div>
    </section>
  );
}
