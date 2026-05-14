"use client";

// TASK-06 — Mineral Field (2D Brownian)
// Ion symbols drift in viscous brownian motion. The cursor exerts a soft
// attractive force within ~400px (1.2s lag analogue). Wraps at field edges.

import { useEffect, useRef } from "react";

const MINERALS = [
  "Mg²⁺",
  "Ca²⁺",
  "K⁺",
  "HCO₃⁻",
  "Na⁺",
  "SO₄²⁻",
  "Fe²⁺",
  "Cl⁻",
];

export default function MineralField() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = container.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const nodes = Array.from(el.querySelectorAll<HTMLElement>(".mineral"));
    const rect = el.getBoundingClientRect();

    const state = nodes.map(() => ({
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }));

    let mouseX = rect.width / 2;
    let mouseY = rect.height / 2;
    let active = false;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mouseX = e.clientX - r.left;
      mouseY = e.clientY - r.top;
      active =
        mouseX >= 0 && mouseX <= r.width && mouseY >= 0 && mouseY <= r.height;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let raf = 0;
    const tick = () => {
      const r = el.getBoundingClientRect();
      state.forEach((s, i) => {
        // Brownian impulses
        if (!reduced) {
          s.vx += (Math.random() - 0.5) * 0.05;
          s.vy += (Math.random() - 0.5) * 0.05;
        }
        s.vx *= 0.95;
        s.vy *= 0.95;

        // Soft attraction toward cursor when nearby
        if (active && !reduced) {
          const dx = mouseX - s.x;
          const dy = mouseY - s.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 400 && dist > 1) {
            const force = (1 - dist / 400) * 0.04;
            s.vx += (dx / dist) * force;
            s.vy += (dy / dist) * force;
          }
        }

        s.x += s.vx;
        s.y += s.vy;

        // Wrap at edges
        if (s.x < -120) s.x = r.width + 60;
        if (s.x > r.width + 120) s.x = -60;
        if (s.y < -60) s.y = r.height + 30;
        if (s.y > r.height + 60) s.y = -30;

        nodes[i].style.transform = `translate3d(${s.x}px, ${s.y}px, 0)`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div
      ref={container}
      aria-hidden="true"
      className="relative h-[60svh] w-full overflow-hidden border border-ash md:h-[70svh]"
    >
      {MINERALS.map((m, i) => (
        <span
          key={m}
          className="mineral absolute left-0 top-0 font-display font-light text-copper select-none pointer-events-none will-change-transform"
          style={{
            fontSize: `${24 + (i % 4) * 14}px`,
            opacity: 0.45 + (i % 3) * 0.18,
            letterSpacing: "-0.01em",
          }}
        >
          {m}
        </span>
      ))}
      {/* Subtle grid framing */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(10,9,8,0) 0%, rgba(10,9,8,0.65) 90%)",
        }}
      />
      {/* Bottom legend */}
      <div className="pointer-events-none absolute bottom-6 left-6 right-6 flex items-end justify-between">
        <span className="font-mono text-[10px] uppercase tracking-mono text-mineral">
          PROTOTYPE MINERAL FIELD — 8 IONS · BROWNIAN
        </span>
        <span className="font-mono text-[10px] uppercase tracking-mono text-mineral tnum">
          TRACE · 0.05 mg/L
        </span>
      </div>
    </div>
  );
}
