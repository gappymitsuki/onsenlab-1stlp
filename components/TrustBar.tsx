"use client";

import { motion } from "framer-motion";

const items = [
  {
    label: "ADVISED BY",
    body: "[ADVISOR TBD — Sleep Scientist]",
  },
  {
    label: "SOURCED FROM",
    body: "5 Onsens (Kusatsu, Beppu, Gero, +2)",
  },
  {
    label: "FORMULATED IN",
    body: "Tokyo Lab",
  },
  {
    label: "SHIPPED FROM",
    body: "Tokyo",
  },
];

export default function TrustBar() {
  return (
    <section className="relative w-full border-t border-b border-line bg-bg-base">
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-[120px] md:py-24">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.08,
              }}
              className="flex flex-col"
            >
              <span className="font-mono text-caption uppercase tracking-caption text-text-tertiary">
                {item.label}
              </span>
              <span className="mt-4 h-px w-8 bg-line" />
              <span className="mt-4 font-serif text-[16px] font-light leading-snug text-text-primary md:text-[18px]">
                {item.body}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
