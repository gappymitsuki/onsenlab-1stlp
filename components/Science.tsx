"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
};

function Pane({
  label,
  headline,
  citation,
  visual,
}: {
  label: string;
  headline: ReactNode;
  citation?: string;
  visual: ReactNode;
}) {
  return (
    <section className="relative w-full border-t border-line bg-bg-base">
      <div className="mx-auto grid min-h-[100svh] max-w-[1440px] grid-cols-1 gap-16 px-6 py-24 md:grid-cols-12 md:gap-12 md:px-[120px] md:py-[160px]">
        <div className="md:col-span-7 md:flex md:flex-col md:justify-center">
          <motion.p
            {...reveal}
            className="mb-12 font-mono text-caption uppercase tracking-caption text-text-secondary md:text-caption-lg"
          >
            {label}
          </motion.p>
          <motion.h2
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.1 }}
            className="font-sans font-extralight text-text-primary text-[40px] leading-[1.05] tracking-tight md:text-[64px] md:leading-[1.04]"
          >
            {headline}
          </motion.h2>
          {citation && (
            <motion.p
              {...reveal}
              transition={{ ...reveal.transition, delay: 0.25 }}
              className="mt-10 max-w-md font-serif text-[14px] font-light text-text-secondary md:text-[16px]"
            >
              {citation}
            </motion.p>
          )}
        </div>
        <motion.div
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.2 }}
          className="md:col-span-5 md:flex md:items-center md:justify-center"
        >
          {visual}
        </motion.div>
      </div>
    </section>
  );
}

function TempCurve() {
  return (
    <svg
      viewBox="0 0 360 200"
      className="h-auto w-full max-w-[420px]"
      aria-label="Core body temperature curve showing the 90-minute sleep onset window after a 40°C bath"
    >
      <line
        x1="0"
        y1="180"
        x2="360"
        y2="180"
        stroke="#2A2622"
        strokeWidth="1"
      />
      <path
        d="M 0 120 C 40 110, 80 60, 130 50 C 170 45, 200 80, 230 130 C 260 165, 300 175, 360 175"
        stroke="#C9A961"
        strokeWidth="1"
        fill="none"
      />
      <text
        x="0"
        y="198"
        fill="#8B8680"
        style={{ font: "300 10px var(--font-jetbrains-mono), monospace", letterSpacing: "0.15em" }}
      >
        T+0
      </text>
      <text
        x="320"
        y="198"
        fill="#8B8680"
        style={{ font: "300 10px var(--font-jetbrains-mono), monospace", letterSpacing: "0.15em" }}
      >
        T+90 MIN
      </text>
      <line
        x1="130"
        y1="50"
        x2="130"
        y2="180"
        stroke="#2A2622"
        strokeWidth="1"
        strokeDasharray="2 4"
      />
    </svg>
  );
}

function MgCell() {
  return (
    <div className="flex w-full max-w-[280px] flex-col border border-line p-8">
      <div className="flex items-start justify-between font-mono text-caption uppercase tracking-caption text-text-secondary">
        <span>12</span>
        <span>24.305</span>
      </div>
      <div className="mt-10 font-sans text-[88px] font-extralight leading-none text-text-primary md:text-[112px]">
        Mg
      </div>
      <div className="mt-6 font-mono text-caption uppercase tracking-caption text-text-secondary">
        Magnesium
      </div>
      <div className="mt-2 h-px w-12 bg-accent" />
    </div>
  );
}

function OnsenPhoto() {
  return (
    <figure className="relative w-full">
      <div className="h-px w-full bg-line" aria-hidden="true" />
      {/* TODO: replace with documentary B&W photograph: yumori hands + analog thermometer.
          Photo direction: macro, harsh light, no faces, no romanticization. */}
      <div
        className="relative aspect-[4/5] w-full bg-bg-elevated"
        role="img"
        aria-label="Black and white photograph of an onsen yumori measuring mineral water temperature"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(20,17,15,1) 0%, rgba(10,9,8,1) 100%)",
        }}
      />
      <div className="h-px w-full bg-line" aria-hidden="true" />
      <figcaption className="mt-6 font-mono text-caption uppercase tracking-caption text-text-tertiary">
        Beppu Onsen · Mineral verification · 2026
      </figcaption>
    </figure>
  );
}

export default function Science() {
  return (
    <>
      <Pane
        label="01 / THE THERMOREGULATION EFFECT"
        headline={
          <>
            A 40-minute bath at <span className="text-accent">40°C</span> lowers
            core body temperature for 90 minutes after — the exact window
            required for sleep onset.
          </>
        }
        citation="Walker Lab, Stanford School of Medicine. Replicated across 12 peer-reviewed sleep studies."
        visual={<TempCurve />}
      />
      <Pane
        label="02 / TRANSDERMAL MINERAL DELIVERY"
        headline={
          <>
            #magnesium has{" "}
            <span className="text-accent">1.2 billion views</span> on TikTok.
            Bathing delivers it through the largest organ in your body.
          </>
        }
        citation="Skin absorbs ionic magnesium at concentrations oral supplementation cannot match without GI side effects."
        visual={<MgCell />}
      />
      <Pane
        label="03 / SOURCED FROM FIVE PROTECTED ONSENS"
        headline={
          <>
            Kusatsu. Beppu. Gero. Each onsen profile is a chemical signature
            evolved over{" "}
            <span className="text-accent">13 centuries</span> of geology.
          </>
        }
        citation="Mineral profiles certified by Onsen Labo's lab in Tokyo. Sourced under partnerships with five protected hot springs."
        visual={<OnsenPhoto />}
      />
    </>
  );
}
