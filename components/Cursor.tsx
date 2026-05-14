"use client";

import { useEffect, useRef, useState } from "react";

// Custom cursor — desktop fine-pointer only. Mobile/touch gets native interactions.
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) return;

    document.documentElement.classList.add("has-custom-cursor");
    setMounted(true);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX;
    let dotY = mouseY;
    let ringX = mouseX;
    let ringY = mouseY;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor-label]"
      ) as HTMLElement | null;

      if (interactive && ringRef.current && labelRef.current) {
        ringRef.current.style.width = "32px";
        ringRef.current.style.height = "32px";
        ringRef.current.style.borderColor = "var(--color-copper)";
        const label = interactive.getAttribute("data-cursor-label");
        labelRef.current.textContent = label ?? "";
      } else if (ringRef.current && labelRef.current) {
        ringRef.current.style.width = "0px";
        ringRef.current.style.height = "0px";
        labelRef.current.textContent = "";
      }
    };

    let raf = 0;
    const tick = () => {
      // Dot follows nearly instantly
      dotX += (mouseX - dotX) * 0.6;
      dotY += (mouseY - dotY) * 0.6;
      // Ring lags slightly (per spec)
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-3 w-3 bg-copper mix-blend-difference"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9997] border border-copper transition-[width,height,border-color] duration-[800ms] ease-onsen-out"
        style={{ width: 0, height: 0 }}
      />
      <span
        ref={labelRef}
        aria-hidden="true"
        className="pointer-events-none fixed z-[9999] font-mono text-[10px] uppercase tracking-mono text-copper-hot mix-blend-difference"
        style={{
          left: 0,
          top: 0,
          transform: "translate3d(0,0,0)",
        }}
      />
    </>
  );
}
