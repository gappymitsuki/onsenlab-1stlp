"use client";

// TASK-09 — Velocity-bound marquee
// Idles at a slow constant drift; scroll velocity gets injected as a
// transient boost that decays each frame. Fast scrolls visibly accelerate
// (and can reverse direction) without losing the underlying drift.

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";

export default function VelocityMarquee({
  words,
  className = "",
  baseSpeed = -0.4,
  fontSize = "clamp(72px, 10vw, 144px)",
}: {
  words: string[];
  className?: string;
  baseSpeed?: number;
  fontSize?: string;
}) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let xPos = 0;
    let velocity = 0;
    let raf = 0;

    const tick = () => {
      xPos += baseSpeed + velocity;
      velocity *= 0.92;

      // Wrap when half the track has scrolled (track is duplicated below)
      if (track.current) {
        const half = track.current.scrollWidth / 2;
        if (xPos < -half) xPos += half;
        if (xPos > 0) xPos -= half;
        track.current.style.transform = `translate3d(${xPos}px, 0, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Scroll velocity boost — px/sec divided to feel
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        velocity = self.getVelocity() * -0.0025;
      },
    });

    return () => {
      cancelAnimationFrame(raf);
      st.kill();
    };
  }, [baseSpeed]);

  // Duplicate the words so the wrap is seamless
  const items = words.concat(words);

  return (
    <div
      aria-hidden="true"
      className={`relative w-full overflow-hidden ${className}`}
    >
      <div
        ref={track}
        className="inline-flex whitespace-nowrap will-change-transform"
      >
        {items.map((w, i) => (
          <span
            key={`${w}-${i}`}
            className="mx-12 font-display font-light leading-none"
            style={{
              fontSize,
              WebkitTextFillColor: "transparent",
              WebkitTextStroke: "1px var(--color-ash)",
              color: "transparent",
            }}
          >
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}
