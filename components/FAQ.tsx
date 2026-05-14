"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const faqs: { q: string; a: string }[] = [
  {
    q: "Why does bath formulation need to be personalized?",
    a: "Sleep latency, recovery load, stress baseline, and skin tolerance vary by person. A single off-the-shelf formula optimizes for none of them. The AI Bath Quiz reads your sleep, training, and stress profile, then matches a mineral concentration and aromatic profile drawn from five protected onsens.",
  },
  {
    q: "What if I don't have a bathtub?",
    a: "Roughly 60% of our early waitlist ships in the United States, where shower-only households are common. Our shower steamer formulations deliver the same mineral and aromatic protocol via warm-steam transdermal delivery. Quiz Q3 routes you to the correct format automatically.",
  },
  {
    q: "How is Onsen Labo different from LUSH?",
    a: "LUSH sells a bath as entertainment. Onsen Labo sells a bath as a measurable input to sleep quality. Our formulations contain no synthetic dyes, no glitter, no fragrance load designed for retail-shelf appeal. Every component has a function and a citation.",
  },
  {
    q: "Is the sleep science real?",
    a: "Yes. The thermoregulation pathway — a 40-minute bath at 40°C lowers core body temperature for ~90 minutes — is replicated across studies at the Walker Lab (Stanford) and the National Center for Biotechnology Information. Magnesium's role in sleep latency and parasympathetic activation is similarly well-attested.",
  },
  {
    q: "When will I receive my prescription?",
    a: "First production run ships Q3 2026. Waitlist position determines order. Referrals advance your position 50 spots per share.",
  },
  {
    q: "Do you ship outside the US?",
    a: "At launch: United States, Canada, Japan, United Kingdom, EU. Other markets follow within 90 days of public launch.",
  },
  {
    q: "What's the price?",
    a: "$32–$58 per ritual depending on formulation complexity. Monthly subscription, cancel anytime. Single-purchase available at +20%.",
  },
];

function Row({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <li className="border-b border-line">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group flex w-full items-center justify-between gap-6 py-8 text-left transition-colors duration-200 md:py-10"
      >
        <span className="font-sans text-[18px] font-light leading-snug text-text-primary md:text-[22px]">
          {q}
        </span>
        <span
          aria-hidden="true"
          className="shrink-0 font-mono text-[18px] font-light text-text-secondary transition-all duration-300 group-hover:text-accent"
          style={{
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-10 font-serif text-[15px] font-light leading-relaxed text-text-secondary md:text-[17px]">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export default function FAQ() {
  return (
    <section className="relative w-full border-t border-line bg-bg-base">
      <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-[120px] md:py-[160px]">
        <p className="mb-16 font-mono text-caption uppercase tracking-caption text-text-secondary md:mb-24 md:text-caption-lg">
          QUESTIONS
        </p>
        <ul>
          {faqs.map((f) => (
            <Row key={f.q} q={f.q} a={f.a} />
          ))}
        </ul>
      </div>
    </section>
  );
}
