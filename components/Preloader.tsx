"use client";

import { useEffect, useState } from "react";
import Wordmark from "./Wordmark";

// Initial preloader: silent, copper hairline circle expands while a 0% → 100%
// counter ticks in the corner. After 2.4s, the panel peels away downward.
export default function Preloader() {
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [pct, setPct] = useState(0);
  const [logoOn, setLogoOn] = useState(false);
  const [peel, setPeel] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    document.body.style.overflow = "hidden";

    const start = performance.now();
    const duration = 2400;
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setPct(Math.round(t * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setLogoOn(true);
        setTimeout(() => setPeel(true), 350);
        setTimeout(() => {
          setDone(true);
          document.body.style.overflow = "";
        }, 350 + 1100);
        setTimeout(() => setHidden(true), 350 + 1100 + 200);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[10000] bg-sumi-deep overflow-hidden"
      style={{
        transition: "clip-path 1100ms cubic-bezier(0.16, 1, 0.3, 1)",
        clipPath: peel ? "inset(100% 0 0 0)" : "inset(0 0 0 0)",
      }}
    >
      {/* Expanding copper hairline circle */}
      <div
        className="absolute left-1/2 top-1/2 rounded-none border border-copper"
        style={{
          width: 40,
          height: 40,
          transform: `translate(-50%, -50%) scale(${1 + pct * 0.6})`,
          opacity: done ? 0 : 1,
          borderRadius: "50%",
          transition: "transform 60ms linear, opacity 600ms var(--ease-onsen-out)",
        }}
      />
      {/* Logo briefly resolves at center, then lifts up */}
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          transform: `translate(-50%, ${logoOn ? "-150vh" : "-50%"})`,
          opacity: logoOn ? 0 : 0,
          transition:
            "transform 1100ms cubic-bezier(0.16, 1, 0.3, 1), opacity 600ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <Wordmark size="md" tone="washi" />
      </div>
      {/* Logo flash on completion */}
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          transform: "translate(-50%, -50%)",
          opacity: logoOn ? (peel ? 0 : 1) : 0,
          transition: "opacity 600ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <Wordmark size="md" tone="washi" />
      </div>
      {/* Counter */}
      <div className="absolute bottom-8 left-8 font-mono text-[10px] uppercase tracking-mono text-mist tnum">
        {String(pct).padStart(3, "0")}%
      </div>
      <div className="absolute bottom-8 right-8 font-mono text-[10px] uppercase tracking-mono text-mineral">
        ONSEN LAB · INITIALISING PROTOCOL
      </div>
    </div>
  );
}
