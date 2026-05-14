"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

export default function Thermoregulation() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const seen = Math.min(total, Math.max(0, vh - rect.top));
      setProgress(Math.min(1, seen / total));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Linear interpolation between 36.8 → 35.9 over the scroll range
  const temp = (36.8 - 0.9 * progress).toFixed(1);

  return (
    <section
      ref={ref}
      id="thermoregulation"
      className="relative w-full bg-washi text-sumi"
    >
      <div className="relative grid min-h-[100svh] grid-cols-1 md:grid-cols-12">
        {/* Left half — V4 video plate */}
        <div className="relative col-span-1 md:col-span-6 min-h-[60svh] md:min-h-[100svh] overflow-hidden bg-bone">
          {/* TODO: drop /media/v4-clavicle.{webm,mp4} — anatomical close-up,
              steam off skin. Faces never shown. */}
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
        <div className="col-span-1 md:col-span-6 flex flex-col justify-center px-6 py-24 md:px-[clamp(48px,5vw,96px)] md:py-[200px]">
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

          {/* Hairline track with copper progress + draggable-style dot */}
          <div className="mt-16 max-w-md">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-mono text-mineral tnum">
              <span>T+0 MIN</span>
              <span>T+90 MIN</span>
            </div>
            <div className="relative mt-3 h-px w-full bg-mineral/40">
              <div
                className="absolute left-0 top-0 h-px bg-copper transition-[width] duration-300 ease-onsen-out"
                style={{ width: `${progress * 100}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                style={{
                  left: `${progress * 100}%`,
                  width: 8,
                  height: 8,
                  background: "var(--color-copper)",
                }}
              />
            </div>
            <div className="mt-6 flex items-baseline justify-between">
              <span className="font-mono text-[10px] uppercase tracking-mono text-mineral">
                CORE TEMP
              </span>
              <span className="font-mono text-[28px] font-light tabular-nums text-copper-leaf">
                {temp}°C
              </span>
            </div>
          </div>

          <Reveal as="p" mode="fade" delay={0.1} className="mt-12 max-w-sm">
            <span className="block font-jp font-light leading-[1.85] text-mineral" lang="en">
              Walker Lab, Stanford School of Medicine. Replicated across 12 peer-reviewed
              sleep studies.
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
