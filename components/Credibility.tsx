"use client";

import Reveal from "./Reveal";

const blocks = [
  { label: "ADVISED BY", value: "Sleep Scientist", sub: "[name TBD]" },
  { label: "SOURCED FROM", value: "5 Onsens", sub: "Kusatsu, Beppu, Gero +2" },
  { label: "FORMULATED IN", value: "Tokyo Lab", sub: "Bunkyō-ku" },
  { label: "SHIPPED FROM", value: "Tokyo", sub: "Narita Logistics" },
];

export default function Credibility() {
  return (
    <section
      id="credibility"
      className="relative w-full bg-sumi text-washi border-t border-ash"
    >
      <div className="mx-auto max-w-[1920px] px-6 py-32 md:px-[clamp(48px,6vw,120px)] md:py-[200px]">
        <h2
          className="max-w-[1100px] font-display font-light leading-[1.05] tracking-tight"
          style={{ fontSize: "clamp(36px, 5vw, 72px)" }}
        >
          <Reveal as="span" mode="lines" duration={1.2}>
            Sourced from 5 protected onsens.
          </Reveal>
          <br />
          <Reveal as="span" mode="lines" duration={1.2} delay={0.15}>
            Verified by 1 medical advisor in Beppu.
          </Reveal>
          <br />
          <Reveal as="span" mode="lines" duration={1.2} delay={0.3}>
            <span className="text-mist">
              Tested in 1,000+ home rituals before launch.
            </span>
          </Reveal>
        </h2>

        <div className="mt-24 grid grid-cols-2 md:mt-32 md:grid-cols-4">
          {blocks.map((b, i) => (
            <div
              key={b.label}
              className={`flex flex-col gap-6 px-2 py-10 md:py-0 md:px-8 ${
                i > 0 ? "md:border-l border-ash" : ""
              } ${i % 2 === 1 ? "border-l border-ash md:border-l" : ""} ${
                i >= 2 ? "border-t border-ash md:border-t-0" : ""
              }`}
            >
              <span className="font-mono text-[10px] uppercase tracking-mono text-mineral">
                {b.label}
              </span>
              <span className="h-px w-8 bg-copper" />
              <span className="font-display text-[24px] font-light text-washi">
                {b.value}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-mono text-mist">
                {b.sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
