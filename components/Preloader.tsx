"use client";

// TASK-02 — Preloader rebuild
// Silent. GSAP timeline: 2s counter ramp + ring scale to 200 + wordmark
// crossfade + clip-path peel reveal. prefers-reduced-motion → instant dismiss.

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap-init";

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Lock scroll during preloader
    document.body.style.overflow = "hidden";

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(root.current, { display: "none" });
      document.body.style.overflow = "";
      return;
    }

    const counterObj = { val: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
      },
    });

    tl.to(counterObj, {
      val: 100,
      duration: 2.0,
      ease: "onsenOut",
      onUpdate: () => {
        if (counter.current) {
          counter.current.textContent =
            String(Math.floor(counterObj.val)).padStart(3, "0") + "%";
        }
      },
    })
      .to(
        ring.current,
        { scale: 200, duration: 1.4, ease: "onsenMineral" },
        "<+0.6"
      )
      .to(
        mark.current,
        { opacity: 1, duration: 0.6, ease: "onsenOut" },
        "-=0.8"
      )
      .to(
        mark.current,
        { y: "-100vh", duration: 1.2, ease: "onsenIn" },
        "+=0.3"
      )
      .to(
        root.current,
        {
          clipPath: "inset(0 0 100% 0)",
          duration: 1.4,
          ease: "onsenMineral",
        },
        "<+0.2"
      )
      .set(root.current, { display: "none" });

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="fixed inset-0 z-[10000] overflow-hidden"
      style={{ backgroundColor: "#050403", clipPath: "inset(0 0 0 0)" }}
    >
      {/* Expanding copper hairline ring */}
      <div
        ref={ring}
        className="absolute left-1/2 top-1/2"
        style={{
          width: 40,
          height: 40,
          marginLeft: -20,
          marginTop: -20,
          border: "1px solid #B87333",
          borderRadius: "50%",
          willChange: "transform",
        }}
      />

      {/* Wordmark resolves at center, then lifts off */}
      <div
        ref={mark}
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: 0, willChange: "transform, opacity" }}
      >
        <span
          className="font-display font-light text-washi"
          style={{ fontSize: 28, letterSpacing: "-0.02em" }}
        >
          Onsen Lab
        </span>
      </div>

      {/* Bottom-left counter */}
      <span
        ref={counter}
        className="absolute bottom-8 left-8 font-mono text-[10px] uppercase text-mist tnum"
        style={{ letterSpacing: "0.2em" }}
      >
        000%
      </span>
      {/* Bottom-right protocol label */}
      <span
        className="absolute bottom-8 right-8 font-mono text-[10px] uppercase text-mineral"
        style={{ letterSpacing: "0.2em" }}
      >
        ONSEN LAB · INITIALISING PROTOCOL
      </span>
    </div>
  );
}
