"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    n: "01",
    en: "Answer 12 questions.",
    jp: "あなたの睡眠・体質・季節を、12問の問診で言語化する。",
    meta: "~ 90 SECONDS",
  },
  {
    n: "02",
    en: "AI matches your profile.",
    jp: "数千の温泉組成と、あなたの神経・代謝プロファイルを照合する。",
    meta: "~ 5 SECONDS",
  },
  {
    n: "03",
    en: "Receive your prescription.",
    jp: "あなたの名前が刻印された、固有の温泉処方が届く。",
    meta: "Q3 2026 SHIPMENT",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile) return; // mobile renders steps stacked vertically

    const ctx = gsap.context(() => {
      const distance = () => track.scrollWidth - window.innerWidth;
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${distance() + window.innerHeight}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        animation: tween,
        invalidateOnRefresh: true,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-washi text-sumi"
    >
      <div className="relative h-[100svh] w-full">
        {/* Header overlay */}
        <div className="pointer-events-none absolute left-6 top-12 z-10 md:left-[clamp(48px,6vw,120px)] md:top-16">
          <span className="font-mono text-[10px] uppercase tracking-mono text-mineral">
            THE PRESCRIPTION PROCESS
          </span>
        </div>

        {/* Pinned progress hairline */}
        <div className="pointer-events-none absolute inset-x-0 bottom-12 z-10 mx-6 h-px bg-mineral/30 md:mx-[clamp(48px,6vw,120px)]">
          <div
            id="process-progress"
            className="h-px bg-copper"
            style={{ width: "0%" }}
          />
        </div>

        {/* Horizontal track — wider than viewport, scrubbed by ScrollTrigger */}
        <div
          ref={trackRef}
          className="absolute inset-y-0 left-0 flex h-full md:w-[300vw]"
        >
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="relative flex h-full w-full shrink-0 items-center md:w-screen"
            >
              {/* Outline numeral background */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex items-center justify-center font-display font-light leading-none"
                style={{
                  fontSize: "min(80vh, 70vw)",
                  WebkitTextFillColor: "transparent",
                  WebkitTextStroke: "1px var(--color-copper)",
                  color: "transparent",
                  opacity: 0.85,
                }}
              >
                {s.n}
              </span>

              <div className="relative z-10 mx-auto max-w-3xl px-6 text-center md:px-0">
                <h3
                  className="font-display font-light leading-[1.02] tracking-tight text-sumi"
                  style={{ fontSize: "clamp(40px, 7vw, 96px)" }}
                >
                  {s.en}
                </h3>
                <p
                  className="mt-6 font-jp text-[16px] font-light leading-[1.85] text-mineral md:text-[18px]"
                  lang="ja"
                >
                  {s.jp}
                </p>
                <span className="mt-10 inline-block font-mono text-[11px] uppercase tracking-mono text-copper tnum">
                  {s.meta}
                </span>
              </div>

              {/* Step counter at the lower edge */}
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-mono text-mineral tnum">
                {s.n} / 03
              </div>

              {i === steps.length - 1 && (
                <div className="absolute right-6 bottom-32 md:right-[clamp(48px,6vw,120px)] md:bottom-32">
                  <Link
                    href="/quiz"
                    data-cursor-label="ENTER"
                    className="group relative inline-flex h-14 items-center justify-between gap-6 overflow-hidden border border-sumi pl-6 pr-5 font-mono text-[10px] uppercase tracking-mono text-sumi"
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
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile-only stacked fallback (desktop hides this; pin runs there) */}
      <div className="md:hidden">
        <div className="space-y-24 px-6 pb-24 pt-12">
          {steps.map((s) => (
            <div key={s.n} className="border-t border-ash pt-12">
              <div className="font-mono text-[10px] uppercase tracking-mono text-mineral tnum">
                {s.n} / 03
              </div>
              <h3
                className="mt-6 font-display font-light leading-tight text-sumi"
                style={{ fontSize: "clamp(36px, 8vw, 64px)" }}
              >
                {s.en}
              </h3>
              <p className="mt-4 font-jp text-[15px] font-light leading-[1.85] text-mineral" lang="ja">
                {s.jp}
              </p>
              <span className="mt-6 inline-block font-mono text-[11px] uppercase tracking-mono text-copper tnum">
                {s.meta}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
