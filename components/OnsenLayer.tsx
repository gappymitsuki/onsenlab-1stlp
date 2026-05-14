"use client";

import { motion } from "framer-motion";

export default function OnsenLayer() {
  return (
    <section className="relative w-full border-t border-line bg-bg-base">
      {/* Full-bleed B&W documentary photograph — no founder, no romanticization.
          TODO: replace with final image (macro of yumori hands + analog thermometer).
          Treatment: harsh light, no Instagram filter, color-graded to palette. */}
      <div
        className="relative h-[70svh] w-full bg-bg-elevated md:h-[90svh]"
        role="img"
        aria-label="Documentary photograph of an onsen yumori testing mineral water temperature with an analog thermometer"
        style={{
          backgroundImage:
            "radial-gradient(120% 80% at 30% 40%, rgba(60,52,42,0.35) 0%, rgba(10,9,8,1) 70%)",
        }}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-line" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-line" aria-hidden="true" />
      </div>

      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-[120px] md:py-24">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl font-serif text-[16px] font-light leading-relaxed text-text-secondary md:text-[18px]"
        >
          Sourced from 5 protected onsens. Verified by 1 medical advisor in
          Beppu. Tested in 1,000+ home rituals before launch.
        </motion.p>
      </div>
    </section>
  );
}
