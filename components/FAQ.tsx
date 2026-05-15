"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Reveal from "./Reveal";

// The "How is Onsen Lab different from LUSH?" row was removed in favor of
// a dedicated NotABathBomb section between Onsens and Process — see
// components/NotABathBomb.tsx. Don't add it back here.
const faqs: { q: string; a: string }[] = [
  {
    q: "Why does bath formulation need to be personalized?",
    a: "Sleep latency, recovery load, stress baseline, and skin tolerance vary by person. A single off-the-shelf formula optimizes for none of them. The AI Bath Quiz reads your sleep, training, and stress profile, then matches a mineral concentration and aromatic profile drawn from five protected onsens.",
  },
  {
    q: "What if I don't have a bathtub?",
    a: "Roughly 60% of our early waitlist ships in markets where shower-only households are common. Our shower-steamer formulations deliver the same mineral and aromatic protocol via warm-steam transdermal delivery. Quiz Q3 routes you to the correct format automatically.",
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
  // "What's the price?" was removed from the FAQ; pricing is now disclosed
  // openly in the PricingPreview section sitting between Process and
  // Credibility. Don't add it back here — duplicate disclosure invites
  // mismatches when the numbers shift.
];

function Row({ index, q, a }: { index: number; q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <li className="border-b border-bone">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        data-cursor-label={open ? "CLOSE" : "OPEN"}
        className="group flex w-full items-baseline gap-6 py-10 text-left md:gap-10 md:py-12"
      >
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-mono text-mineral tnum">
          Q.{String(index + 1).padStart(2, "0")}
        </span>
        <span
          className="flex-1 font-display font-light leading-[1.15] tracking-tight text-sumi"
          style={{ fontSize: "clamp(20px, 2.4vw, 32px)" }}
        >
          {q}
        </span>
        <span
          aria-hidden="true"
          className="shrink-0 font-mono text-[20px] font-light text-sumi transition-transform duration-medium ease-onsen-out"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
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
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-3xl pb-10 pl-0 font-serif text-[16px] font-light leading-[1.85] text-mineral md:pb-14 md:pl-[88px] md:text-[18px]">
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
    <section
      id="faq"
      className="relative w-full bg-washi text-sumi border-t border-bone"
    >
      <div className="mx-auto max-w-[1920px] px-6 py-32 md:px-[clamp(48px,6vw,120px)] md:py-[200px]">
        <span className="font-mono text-[10px] uppercase tracking-mono text-mineral">
          QUESTIONS
        </span>
        <h2
          className="mt-8 max-w-3xl font-display font-light leading-[1.02] tracking-tight text-sumi"
          style={{ fontSize: "clamp(40px, 7vw, 96px)" }}
        >
          <Reveal as="span" mode="lines" duration={1.2}>
            Things you may reasonably ask before submersion.
          </Reveal>
        </h2>

        <ul className="mt-20 md:mt-32 border-t border-bone">
          {faqs.map((f, i) => (
            <Row key={f.q} index={i} q={f.q} a={f.a} />
          ))}
        </ul>
      </div>
    </section>
  );
}
