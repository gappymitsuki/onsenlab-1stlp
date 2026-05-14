"use client";

// TASK-04 — Custom Cursor
// 12px copper dot on idle, transitions to 32px hairline ring with a sliding
// UPPERCASE label on interactive elements. Desktop fine-pointer only.

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap-init";

export default function Cursor() {
  const wrap = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)")
      .matches;
    if (!canHover) return;

    document.documentElement.classList.add("has-custom-cursor");
    setMounted(true);

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let dx = mx;
    let dy = my;
    let rx = mx;
    let ry = my;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor-label]"
      ) as HTMLElement | null;

      if (interactive) {
        const lbl = interactive.getAttribute("data-cursor-label") ?? "ENTER";
        gsap.to(ring.current, {
          width: 64,
          height: 64,
          opacity: 1,
          borderColor: "#B87333",
          duration: 0.6,
          ease: "onsenOut",
        });
        gsap.to(dot.current, {
          scale: 0.5,
          opacity: 0.4,
          duration: 0.4,
          ease: "onsenOut",
        });
        if (label.current) label.current.textContent = lbl;
        gsap.to(label.current, {
          opacity: 1,
          x: 44,
          duration: 0.4,
          ease: "onsenOut",
        });
      } else {
        gsap.to(ring.current, {
          width: 0,
          height: 0,
          opacity: 0,
          duration: 0.6,
          ease: "onsenOut",
        });
        gsap.to(dot.current, {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "onsenOut",
        });
        gsap.to(label.current, {
          opacity: 0,
          x: 0,
          duration: 0.3,
          ease: "onsenOut",
        });
      }
    };
    window.addEventListener("mouseover", onOver, { passive: true });

    let raf = 0;
    const tick = () => {
      dx += (mx - dx) * 0.55;
      dy += (my - dy) * 0.55;
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (dot.current)
        dot.current.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`;
      if (ring.current)
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!mounted) return null;

  return (
    <div ref={wrap} aria-hidden="true" className="pointer-events-none">
      {/* Copper dot */}
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[9998]"
        style={{
          width: 12,
          height: 12,
          background: "#B87333",
          borderRadius: "50%",
          mixBlendMode: "difference",
          willChange: "transform, opacity",
        }}
      />
      {/* Hairline ring */}
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[9997]"
        style={{
          width: 0,
          height: 0,
          border: "1px solid #B87333",
          borderRadius: "50%",
          opacity: 0,
          willChange: "transform, width, height, opacity",
        }}
      />
      {/* Sliding label */}
      <span
        ref={label}
        className="pointer-events-none fixed z-[9999] font-mono text-[10px] uppercase text-copper-hot"
        style={{
          left: 0,
          top: 0,
          letterSpacing: "0.2em",
          opacity: 0,
          mixBlendMode: "difference",
          whiteSpace: "nowrap",
          transform: "translate3d(0,0,0)",
        }}
      />
    </div>
  );
}
