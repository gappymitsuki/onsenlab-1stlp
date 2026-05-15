"use client";

// Custom cursor — split architecture to prevent transform clobbering.
//
// Why split: the original version had a single element per layer doing both
// translate3d (via rAF) and scale/opacity/size (via GSAP). Both wrote to the
// same `style.transform` string, so rAF would wipe GSAP's matrix every frame
// and GSAP's CSSPlugin would lose its baseline cache. After enough mouseover
// events the dot could lock at a stale position ("カーソルが途中で動かなくなる").
//
// Fix: an outer `*-pos` wrapper handles position only (rAF → translate3d);
// the inner `*-art` element handles visual state via CSS transitions toggled
// by an `is-interactive` class. No two writers ever touch the same property.

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const [mounted, setMounted] = useState(false);

  const dotPos = useRef<HTMLDivElement>(null);
  const ringPos = useRef<HTMLDivElement>(null);
  const labelPos = useRef<HTMLDivElement>(null);
  const dotArt = useRef<HTMLDivElement>(null);
  const ringArt = useRef<HTMLDivElement>(null);
  const labelArt = useRef<HTMLSpanElement>(null);

  // Decide once: do we even render?
  useEffect(() => {
    if (typeof window === "undefined") return;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) return;
    document.documentElement.classList.add("has-custom-cursor");
    setMounted(true);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  // After the DOM is in place, wire the rAF loop + listeners.
  useEffect(() => {
    if (!mounted) return;

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

    const SELECTOR =
      "a, button, [role='button'], input, textarea, select, [data-cursor-label]";

    let lastInteractive: HTMLElement | null = null;
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest(SELECTOR) as HTMLElement | null;
      if (interactive === lastInteractive) return;
      lastInteractive = interactive;

      if (interactive) {
        const label = interactive.getAttribute("data-cursor-label") ?? "ENTER";
        if (labelArt.current) labelArt.current.textContent = label;
        dotArt.current?.classList.add("is-interactive");
        ringArt.current?.classList.add("is-interactive");
        labelArt.current?.classList.add("is-interactive");
      } else {
        dotArt.current?.classList.remove("is-interactive");
        ringArt.current?.classList.remove("is-interactive");
        labelArt.current?.classList.remove("is-interactive");
      }
    };
    window.addEventListener("mouseover", onOver, { passive: true });

    // If the pointer leaves the window, drop the interactive state so the
    // cursor doesn't get "stuck" enlarged when re-entering.
    const onLeave = () => {
      lastInteractive = null;
      dotArt.current?.classList.remove("is-interactive");
      ringArt.current?.classList.remove("is-interactive");
      labelArt.current?.classList.remove("is-interactive");
    };
    document.addEventListener("mouseleave", onLeave);

    let raf = 0;
    const tick = () => {
      dx += (mx - dx) * 0.55;
      dy += (my - dy) * 0.55;
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (dotPos.current)
        dotPos.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      if (ringPos.current)
        ringPos.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      if (labelPos.current)
        labelPos.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div aria-hidden="true" className="cursor-root pointer-events-none">
      {/* Position layer: rAF writes only translate3d. */}
      <div ref={dotPos} className="cursor-pos cursor-pos--dot">
        <div ref={dotArt} className="cursor-dot" />
      </div>
      <div ref={ringPos} className="cursor-pos cursor-pos--ring">
        <div ref={ringArt} className="cursor-ring" />
      </div>
      <div ref={labelPos} className="cursor-pos cursor-pos--label">
        <span ref={labelArt} className="cursor-label" />
      </div>
    </div>
  );
}
