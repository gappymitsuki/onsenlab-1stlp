"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Wordmark from "./Wordmark";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[60] h-[88px] transition-[background-color,backdrop-filter] duration-medium ease-onsen-out ${
        scrolled
          ? "bg-sumi/85 [backdrop-filter:blur(20px)_saturate(120%)]"
          : "bg-transparent"
      }`}
      style={{ borderBottom: "1px solid var(--color-ash)" }}
    >
      <div className="mx-auto flex h-full max-w-[1920px] items-center justify-between px-6 md:px-[clamp(48px,6vw,120px)]">
        <Link
          href="/"
          aria-label="Onsen Labo — home"
          data-cursor-label="HOME"
          className="block text-washi"
        >
          <Wordmark size="sm" tone="washi" />
        </Link>

        <div className="flex items-center gap-6 md:gap-10">
          <span className="hidden md:inline font-mono text-[10px] uppercase tracking-mono text-mineral tnum">
            PROTOCOL · v1
          </span>
          <span className="hidden md:inline-block h-3 w-px bg-ash" />
          <Link
            href="/quiz"
            data-cursor-label="ENTER"
            className="group relative inline-flex items-center justify-center overflow-hidden border border-copper px-5 py-3 font-mono text-[10px] uppercase tracking-mono text-washi md:px-7 md:py-4"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 origin-bottom scale-y-0 bg-copper transition-transform duration-medium ease-onsen-out group-hover:scale-y-100"
            />
            <span className="relative z-10 inline-flex items-center transition-colors duration-medium ease-onsen-out group-hover:text-sumi">
              <span>TAKE THE BATH QUIZ</span>
              <span className="ml-3 transition-transform duration-medium ease-onsen-out group-hover:translate-x-1">
                →
              </span>
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
