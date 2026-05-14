"use client";

import { useEffect, useRef } from "react";
import SplitType from "split-type";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";

type Mode = "lines" | "words" | "chars" | "fade";

// Sediment-rising text reveal — words/lines lift from below their mask,
// staggered with the onsen-out cubic-bezier. Triggered when the element
// enters the viewport.
export default function Reveal({
  children,
  as: Tag = "div",
  mode = "lines",
  delay = 0,
  className,
  stagger = 0.06,
  duration = 1.2,
  start = "top 85%",
}: {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  mode?: Mode;
  delay?: number;
  className?: string;
  stagger?: number;
  duration?: number;
  start?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(el, { opacity: 1 });
      return;
    }

    let split: SplitType | null = null;
    let targets: Element[] | Element = el;

    if (mode === "fade") {
      gsap.set(el, { opacity: 0, y: 28 });
    } else {
      split = new SplitType(el, {
        types: mode === "chars" ? "chars" : mode === "words" ? "words" : "lines,words",
        lineClass: "reveal-line-wrap",
        wordClass: "reveal-word-wrap",
        charClass: "reveal-char-wrap",
      });
      const targetSelector =
        mode === "chars" ? ".char" : mode === "words" ? ".word" : ".line";
      // Wrap each target in an overflow:hidden mask so glyphs slide up
      const tArray = el.querySelectorAll<HTMLElement>(targetSelector);
      tArray.forEach((t) => {
        t.style.display = "inline-block";
        t.style.overflow = "hidden";
        t.style.verticalAlign = "bottom";
        const inner = document.createElement("span");
        inner.className = "reveal-inner";
        inner.style.display = "inline-block";
        inner.style.willChange = "transform";
        while (t.firstChild) inner.appendChild(t.firstChild);
        t.appendChild(inner);
      });
      const inners = el.querySelectorAll<HTMLElement>(".reveal-inner");
      gsap.set(inners, { yPercent: 110 });
      targets = Array.from(inners);
    }

    const tween =
      mode === "fade"
        ? gsap.to(el, {
            opacity: 1,
            y: 0,
            duration,
            ease: "expo.out",
            delay,
          })
        : gsap.to(targets, {
            yPercent: 0,
            duration,
            ease: "expo.out",
            stagger,
            delay,
          });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      once: true,
      animation: tween,
      toggleActions: "play none none none",
    });

    return () => {
      trigger.kill();
      tween.kill();
      try {
        split?.revert();
      } catch {}
    };
  }, [mode, delay, stagger, duration, start]);

  return (
    // @ts-expect-error - dynamic tag
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
