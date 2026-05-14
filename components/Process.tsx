"use client";

import Link from "next/link";
import Reveal from "./Reveal";

const steps = [
  {
    n: "01",
    en: "Answer 12 questions.",
    body: "Twelve questions translate your sleep, physiology, and seasonal context into a measurable profile.",
    meta: "~ 90 SECONDS",
  },
  {
    n: "02",
    en: "AI matches your profile.",
    body: "Thousands of onsen mineral compositions are cross-referenced against your neural and metabolic signature.",
    meta: "~ 5 SECONDS",
  },
  {
    n: "03",
    en: "Receive your prescription.",
    body: "A formulation engraved with your name arrives — a single, unrepeatable onsen protocol.",
    meta: "Q3 2026 SHIPMENT",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="relative w-full bg-washi text-sumi"
    >
      <div className="mx-auto max-w-[1920px] px-6 pt-24 md:px-[clamp(48px,6vw,120px)] md:pt-[160px]">
        <span className="font-mono text-[10px] uppercase tracking-mono text-mineral">
          THE PRESCRIPTION PROCESS
        </span>
      </div>

      <ol className="mx-auto max-w-[1920px] px-6 md:px-[clamp(48px,6vw,120px)]">
        {steps.map((s, i) => (
          <li
            key={s.n}
            className={`relative grid grid-cols-1 items-center gap-12 py-24 md:grid-cols-12 md:gap-16 md:py-[180px] ${
              i > 0 ? "border-t border-bone" : "border-t border-bone mt-12 md:mt-20"
            }`}
          >
            {/* Outline numeral — left half */}
            <div className="md:col-span-6 flex items-center justify-center md:justify-start">
              <span
                aria-hidden="true"
                className="font-display font-light leading-none"
                style={{
                  fontSize: "clamp(180px, 28vw, 420px)",
                  WebkitTextFillColor: "transparent",
                  WebkitTextStroke: "1px var(--color-copper)",
                  color: "transparent",
                }}
              >
                {s.n}
              </span>
            </div>

            {/* Copy — right half */}
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
              <p className="mt-8 max-w-md font-serif text-[16px] font-light leading-[1.6] text-mineral md:text-[18px]">
                {s.body}
              </p>
              <span className="mt-8 inline-block font-mono text-[11px] uppercase tracking-mono text-copper tnum">
                {s.meta}
              </span>
            </div>
          </li>
        ))}
      </ol>

      <div className="flex justify-center pb-32 md:pb-[200px]">
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
