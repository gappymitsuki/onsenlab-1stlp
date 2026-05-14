"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    num: "01",
    title: "Answer 12 questions",
    meta: "~ 90 SECONDS",
  },
  {
    num: "02",
    title: "AI matches your profile",
    meta: "~ 5 SECONDS",
  },
  {
    num: "03",
    title: "Receive your bath formula",
    meta: "Q3 2026 SHIPMENT",
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const dotY = useTransform(scrollYProgress, [0.25, 0.75], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      className="relative w-full border-t border-line bg-bg-base"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-[120px] md:py-[200px]">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 font-mono text-caption uppercase tracking-caption text-text-secondary md:text-caption-lg md:mb-32"
        >
          THE PRESCRIPTION PROCESS
        </motion.p>

        <div className="relative grid grid-cols-1 gap-16 md:grid-cols-[auto_1fr] md:gap-20">
          {/* Vertical rail with traveling accent dot */}
          <div className="relative hidden w-px bg-line md:block" aria-hidden="true">
            <motion.span
              className="absolute left-1/2 h-2 w-2 -translate-x-1/2 bg-accent"
              style={{ top: dotY }}
            />
          </div>

          <ol className="space-y-20 md:space-y-32">
            {steps.map((step, i) => (
              <motion.li
                key={step.num}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 1.2,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.1,
                }}
                className="grid grid-cols-[auto_1fr] items-baseline gap-6 md:gap-12"
              >
                <span className="font-mono text-[14px] font-light text-text-secondary md:text-[18px]">
                  {step.num}
                </span>
                <div>
                  <div className="hidden h-px w-16 bg-line md:mb-6 md:block" />
                  <h3 className="font-sans text-[28px] font-extralight leading-tight tracking-tight text-text-primary md:text-[48px]">
                    {step.title}
                  </h3>
                  <p className="mt-4 font-mono text-caption uppercase tracking-caption text-text-tertiary md:text-caption-lg">
                    {step.meta}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 flex justify-center md:mt-40"
        >
          <Link
            href="/quiz"
            className="group inline-flex items-center justify-center border border-text-primary px-8 py-4 font-mono text-caption uppercase tracking-caption text-text-primary transition-colors duration-200 hover:border-accent"
          >
            <span className="relative">
              Start Quiz
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </span>
            <span className="ml-3 transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
