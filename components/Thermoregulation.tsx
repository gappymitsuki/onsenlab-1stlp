"use client";

// TASK-07 — Thermo ScrollTrigger scrub
// Section's progress through the viewport drives core-temp readout
// (36.8 → 35.9 °C) and the hairline progress slider via GSAP onUpdate.

import { useEffect, useRef } from "react";
import Reveal from "./Reveal";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";

export default function Thermoregulation() {
  const section = useRef<HTMLDivElement>(null);
  const tempEl = useRef<HTMLSpanElement>(null);
  const fillEl = useRef<HTMLDivElement>(null);
  const dotEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = section.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 70%",
        end: "bottom 30%",
        scrub: 0.6,
        onUpdate: (self) => {
          const p = self.progress;
          const t = 36.8 - p * 0.9;
          if (tempEl.current) tempEl.current.textContent = t.toFixed(1) + "°C";
          if (fillEl.current) fillEl.current.style.width = `${p * 100}%`;
          if (dotEl.current) dotEl.current.style.left = `${p * 100}%`;
        },
      });
      return () => st.kill();
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={section}
      id="thermoregulation"
      className="relative w-full bg-washi text-sumi"
    >
      <div className="relative grid min-h-[100svh] grid-cols-1 md:grid-cols-12">
        {/* Left half — V4 video plate */}
        <div className="relative col-span-1 md:col-span-6 min-h-[60svh] md:min-h-[100svh] overflow-hidden bg-bone">
          {/* TODO: drop /media/v4-clavicle.{webm,mp4} */}
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-90 mix-blend-multiply"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/media/v4-clavicle-poster.jpg"
            aria-hidden="true"
          >
            <source src="/media/v4-clavicle.webm" type="video/webm" />
            <source src="/media/v4-clavicle.mp4" type="video/mp4" />
          </video>
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: "rgba(242, 237, 228, 0.22)" }}
          />
        </div>

        {/* Right half — text + temperature track */}
        <div className="col-span-1 md:col-span-6 flex flex-col justify-center px-6 py-24 md:px-[clamp(48px,5vw,96px)] md:py-[240px]">
          <Reveal as="p" mode="fade">
            <span className="font-mono text-[10px] uppercase tracking-mono text-mineral">
              01 / THE THERMOREGULATION EFFECT
            </span>
          </Reveal>

          <h2
            className="mt-10 max-w-xl font-display font-light leading-[1.05] tracking-tight text-sumi"
            style={{ fontSize: "clamp(36px, 5vw, 80px)" }}
          >
            <Reveal as="span" mode="lines" duration={1.2}>
              A 40-minute bath at 40°C lowers core body temperature for 90 minutes after —
              <span className="text-copper-leaf"> the exact window required for sleep onset.</span>
            </Reveal>
          </h2>

          {/* Hairline track with scroll-bound progress + dot */}
          <div className="mt-16 max-w-md">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-mono text-mineral tnum">
              <span>T+0 MIN</span>
              <span>T+90 MIN</span>
            </div>
            <div className="relative mt-3 h-px w-full bg-mineral/40">
              <div
                ref={fillEl}
                className="absolute left-0 top-0 h-px bg-copper"
                style={{ width: "0%" }}
              />
              <div
                ref={dotEl}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                style={{
                  left: "0%",
                  width: 10,
                  height: 10,
                  background: "var(--color-copper)",
                }}
              />
            </div>
            <div className="mt-8 flex items-baseline justify-between">
              <span className="font-mono text-[10px] uppercase tracking-mono text-mineral">
                CORE TEMP
              </span>
              <span
                ref={tempEl}
                className="font-mono text-[28px] font-light tabular-nums text-copper-leaf"
              >
                36.8°C
              </span>
            </div>
          </div>

          <Reveal as="p" mode="fade" delay={0.1} className="mt-12 max-w-sm">
            <span className="block font-serif font-light leading-[1.55] text-mineral">
              Walker Lab, Stanford School of Medicine. Replicated across 12 peer-reviewed
              sleep studies.
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
