"use client";

import { motion } from "framer-motion";
import { FormEvent, useState } from "react";

export default function FinalCTA() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "submitting" | "done" | "error">(
    "idle"
  );

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || state === "submitting") return;
    setState("submitting");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "final-cta" }),
      });
      if (!res.ok) throw new Error("non-200");
      setState("done");
    } catch {
      setState("error");
    }
  }

  return (
    <section
      id="final-cta"
      className="relative w-full border-t border-line bg-bg-base"
    >
      <div className="mx-auto max-w-[1440px] px-6 pb-32 pt-32 md:px-[120px] md:pb-[200px] md:pt-[240px]">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl font-sans text-[48px] font-extralight leading-[1.02] tracking-display text-text-primary md:text-[120px]"
        >
          Your prescription
          <br />
          is waiting.
        </motion.h2>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          onSubmit={onSubmit}
          className="mt-16 max-w-2xl md:mt-24"
        >
          <label
            htmlFor="email"
            className="block font-mono text-caption uppercase tracking-caption text-text-secondary md:text-caption-lg"
          >
            EMAIL
          </label>
          <div className="mt-4 flex items-end gap-4 border-b border-line transition-colors duration-200 focus-within:border-accent md:gap-8">
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={state === "submitting" || state === "done"}
              autoComplete="email"
              className="flex-1 bg-transparent py-4 font-sans text-[18px] font-light text-text-primary placeholder:text-text-tertiary focus:outline-none disabled:opacity-50 md:text-[22px]"
            />
            <button
              type="submit"
              disabled={state === "submitting" || state === "done"}
              className="group inline-flex shrink-0 items-center py-4 font-mono text-caption uppercase tracking-caption text-text-primary transition-colors duration-200 hover:text-accent disabled:opacity-50"
            >
              <span>
                {state === "done"
                  ? "RESERVED"
                  : state === "submitting"
                  ? "RESERVING..."
                  : "RESERVE MY SPOT"}
              </span>
              <span className="ml-3 transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>

          <p className="mt-6 font-mono text-caption uppercase tracking-caption text-text-tertiary md:text-caption-lg">
            12,847 RESERVATIONS · LAUNCHING Q3 2026
          </p>

          {state === "done" && (
            <p className="mt-6 font-serif text-[14px] font-light text-accent md:text-[16px]">
              Your spot is held. Check your inbox for the AI Bath Quiz link.
            </p>
          )}
          {state === "error" && (
            <p className="mt-6 font-serif text-[14px] font-light text-text-secondary md:text-[16px]">
              Something interrupted the reservation. Please try once more.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
