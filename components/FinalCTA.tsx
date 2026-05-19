"use client";

import { FormEvent, useState } from "react";
import Reveal from "./Reveal";

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
      className="relative w-full bg-sumi-deep text-washi border-t border-ash"
    >
      <div className="mx-auto flex min-h-[100svh] max-w-[1920px] flex-col items-center justify-center px-6 py-32 md:px-[clamp(48px,6vw,120px)] md:py-[200px]">
        {/* V6 plate — quiet midnight lab vial.
            TODO: drop /media/v6-vial.{webm,mp4}. Aspect 4:5 portrait. */}
        <div
          className="relative w-full max-w-[480px] overflow-hidden border border-copper/40"
          style={{ aspectRatio: "4 / 5" }}
        >
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-80"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/media/v6-vial-poster.jpg"
            aria-hidden="true"
          >
            <source src="/media/v6-vial.webm" type="video/webm" />
            <source src="/media/v6-vial.mp4" type="video/mp4" />
          </video>
          <div
            className="absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                "linear-gradient(180deg, rgba(5,4,3,0.2) 0%, rgba(5,4,3,0.6) 100%)",
            }}
          />
        </div>

        {/* Headline reframed: the page-level primary action is the Quiz
            (Hero CTA + Process CTA). The email form is now positioned as
            the explicit fallback for fence-sitters — same component, but
            it no longer competes with the Quiz for primary intent. */}
        <h2
          className="mt-16 max-w-5xl text-center font-display font-light leading-[1.0] tracking-display"
          style={{ fontSize: "clamp(36px, 6.4vw, 96px)" }}
        >
          <Reveal as="span" mode="lines" duration={1.4}>
            Not ready for the quiz?
            <br />
            <span className="text-copper">Reserve your spot.</span>
          </Reveal>
        </h2>

        <Reveal as="p" mode="fade" delay={0.25} className="mt-10">
          <span
            className="block max-w-2xl text-center font-serif font-light italic text-mist"
            style={{ fontSize: "clamp(15px, 1.6vw, 22px)" }}
          >
            Skip the quiz for now — enter your email and we&apos;ll notify
            you at launch.
          </span>
        </Reveal>

        <form
          onSubmit={onSubmit}
          className="mt-16 flex w-full max-w-[480px] flex-col items-stretch gap-6"
        >
          <label className="block">
            <span className="font-mono text-[10px] uppercase tracking-mono text-mineral">
              EMAIL
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={state === "submitting" || state === "done"}
              autoComplete="email"
              data-cursor-label="WRITE"
              placeholder="your.address@email.com"
              className="mt-3 h-16 w-full border-b border-washi/40 bg-transparent font-mono text-[16px] text-washi placeholder:text-mineral focus:border-copper focus:outline-none disabled:opacity-50"
            />
          </label>
          <button
            type="submit"
            disabled={state === "submitting" || state === "done"}
            data-cursor-label="RESERVE"
            className="group relative inline-flex h-16 w-full items-center justify-between overflow-hidden border border-copper px-6 font-mono text-[10px] uppercase tracking-mono text-washi md:w-[200px] md:self-center"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 origin-bottom scale-y-0 bg-copper transition-transform duration-medium ease-onsen-out group-hover:scale-y-100"
            />
            <span className="relative z-10 transition-colors duration-medium ease-onsen-out group-hover:text-sumi">
              {state === "done"
                ? "RESERVED"
                : state === "submitting"
                ? "RESERVING..."
                : "RESERVE MY SPOT"}
            </span>
            <span className="relative z-10 transition-[transform,color] duration-medium ease-onsen-out group-hover:translate-x-1 group-hover:text-sumi">
              →
            </span>
          </button>
        </form>

        <p className="mt-8 text-center font-mono text-[10px] uppercase tracking-mono text-mineral tnum">
          12,847 RESERVATIONS · LAUNCHING Q3 2026 · NO SPAM. ONE EMAIL AT LAUNCH.
        </p>

        {state === "done" && (
          <p className="mt-6 text-center font-serif text-[14px] font-light text-copper-hot">
            Your spot is held. Check your inbox for the AI Bath Quiz link.
          </p>
        )}
        {state === "error" && (
          <p className="mt-6 text-center font-serif text-[14px] font-light text-mist">
            Something interrupted the reservation. Please try once more.
          </p>
        )}
      </div>
    </section>
  );
}
