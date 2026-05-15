"use client";

// TASK-05 (modified) — vertical stack (no pin horizontal per user request),
// but the outline numerals are filled with copper via clip-path tied to each
// step's scroll progress through the viewport.

import Link from "next/link";
import { useEffect, useRef } from "react";
import Reveal from "./Reveal";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";

// Each step now carries a `ritual` micro-copy that runs in parallel with
// the prescription/protocol/formula vocabulary. The pharmacology frame
// (heading + body) stays primary; the ritual frame rides under it so the
// "nightly ceremony" register coexists with the "measurable input" one.
const steps = [
  {
    n: "01",
    en: "Answer 12 questions.",
    body: "Twelve questions translate your sleep, physiology, and seasonal context into a measurable profile.",
    ritual: "About your sleep, your skin, your evening.",
    meta: "~ 90 SECONDS",
  },
  {
    n: "02",
    en: "AI matches your profile.",
    body: "Thousands of onsen mineral compositions are cross-referenced against your neural and metabolic signature.",
    ritual: "To one of 47 onsen mineral profiles.",
    meta: "~ 5 SECONDS",
  },
  {
    n: "03",
    en: "Receive your bath formula.",
    body: "A formulation engraved with your name arrives — a single, unrepeatable onsen protocol.",
    ritual: "And your nightly ritual begins.",
    meta: "Q3 2026 SHIPMENT",
  },
];

export default function Process() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const triggers: ScrollTrigger[] = [];
      el.querySelectorAll<HTMLElement>(".step").forEach((step) => {
        const fill = step.querySelector<HTMLElement>(".numeral-fill");
        if (!fill) return;
        const st = ScrollTrigger.create({
          trigger: step,
          start: "top 75%",
          end: "bottom 25%",
          scrub: 0.6,
          onUpdate: (self) => {
            const inset = 100 - self.progress * 100;
            fill.style.clipPath = `inset(${inset}% 0 0 0)`;
          },
        });
        triggers.push(st);
      });
      return () => triggers.forEach((t) => t.kill());
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="process"
      className="relative w-full bg-washi text-sumi"
    >
      <div className="mx-auto max-w-[1920px] px-6 pt-32 md:px-[clamp(48px,6vw,120px)] md:pt-[200px]">
        <span className="font-mono text-[10px] uppercase tracking-mono text-mineral">
          THE PRESCRIPTION PROCESS
        </span>
      </div>

      <ol className="mx-auto max-w-[1920px] px-6 md:px-[clamp(48px,6vw,120px)]">
        {steps.map((s, i) => (
          <li
            key={s.n}
            className={`step relative grid grid-cols-1 items-center gap-12 py-24 md:grid-cols-12 md:gap-16 md:py-[200px] ${
              i > 0 ? "border-t border-bone" : "border-t border-bone mt-12 md:mt-24"
            }`}
          >
            {/* Numeral with scroll-bound copper fill */}
            <div className="md:col-span-6 relative flex items-center justify-center md:justify-start">
              <div
                className="relative leading-none"
                style={{ fontSize: "clamp(180px, 28vw, 420px)" }}
              >
                {/* Base outline */}
                <span
                  aria-hidden="true"
                  className="block font-display font-light"
                  style={{
                    WebkitTextFillColor: "transparent",
                    WebkitTextStroke: "1px var(--color-copper)",
                    color: "transparent",
                  }}
                >
                  {s.n}
                </span>
                {/* Copper fill clipped from the bottom */}
                <span
                  aria-hidden="true"
                  className="numeral-fill pointer-events-none absolute inset-0 block font-display font-light text-copper"
                  style={{
                    clipPath: "inset(100% 0 0 0)",
                    willChange: "clip-path",
                  }}
                >
                  {s.n}
                </span>
              </div>
            </div>

            {/* Copy */}
            <div className="md:col-span-5 md:col-start-8">
              <span className="font-mono text-[10px] uppercase tracking-mono text-mineral tnum">
                STEP {s.n} / 03
              </span>
              <h3
                className="mt-6 font-display font-light leading-[1.02] tracking-tight text-sumi"
                style={{ fontSize: "clamp(36px, 5vw, 72px)" }}
              >
                <Reveal as="span" mode="lines" duration={1.0}>
                  {s.en}
                </Reveal>
              </h3>
              {/* Ritual micro-copy — italic serif, small, paired immediately
                  with the heading so the ceremony register lands before the
                  pharmacology body copy. */}
              <p
                className="mt-4 max-w-md font-serif text-[15px] font-light italic leading-[1.55] text-copper md:text-[17px]"
                lang="en"
              >
                {s.ritual}
              </p>
              <p className="mt-6 max-w-md font-serif text-[16px] font-light leading-[1.55] text-mineral md:text-[18px]">
                {s.body}
              </p>
              <span className="mt-8 inline-block font-mono text-[11px] uppercase tracking-mono text-copper tnum">
                {s.meta}
              </span>
            </div>
          </li>
        ))}
      </ol>

      <div className="flex justify-center pb-32 pt-24 md:pb-[240px] md:pt-32">
        <Link
          href="/quiz"
          data-cursor-label="ENTER"
          className="group relative inline-flex h-16 items-center justify-between gap-8 overflow-hidden border border-sumi pl-7 pr-6 font-mono text-[10px] uppercase tracking-mono text-sumi"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 origin-bottom scale-y-0 bg-sumi transition-transform duration-medium ease-onsen-out group-hover:scale-y-100"
          />
          <span className="relative z-10 transition-colors duration-medium ease-onsen-out group-hover:text-washi">
            START THE QUIZ
          </span>
          <span className="relative z-10 transition-[transform,color] duration-medium ease-onsen-out group-hover:translate-x-1 group-hover:text-washi">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
