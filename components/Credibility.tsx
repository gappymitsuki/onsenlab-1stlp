"use client";

import Reveal from "./Reveal";

// Pre-launch posture: surface only facts that are already true (sourcing,
// the lab, shipping origin). Hide the advisor row until a name lands — a
// single "[name TBD]" or "1 medical advisor" reads as weaker than not
// claiming an advisor at all. When the advisor signs, pass it via props:
//
//   <Credibility advisor={{ value: "Dr. Yumi Sato", sub: "MD · Sleep Medicine" }} />
//
// The component will re-introduce the ADVISED BY block in the four-column
// grid, no further code changes required.
type Advisor = { value: string; sub: string };

type Block = { label: string; value: string; sub: string };

const BASE_BLOCKS: Block[] = [
  { label: "SOURCED FROM", value: "5 Onsens",  sub: "Kusatsu, Beppu, Gero +2" },
  { label: "FORMULATED IN", value: "Tokyo Lab", sub: "Bunkyō-ku" },
  { label: "SHIPPED FROM",  value: "Tokyo",     sub: "Narita Logistics" },
];

export default function Credibility({ advisor }: { advisor?: Advisor }) {
  const blocks: Block[] = advisor
    ? [{ label: "ADVISED BY", value: advisor.value, sub: advisor.sub }, ...BASE_BLOCKS]
    : BASE_BLOCKS;

  const cols = blocks.length; // 3 pre-launch, 4 once advisor lands

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
            Sourced from 5 protected onsens in Japan.
          </Reveal>
        </h2>

        <div
          className={`mt-24 grid grid-cols-2 md:mt-32 ${
            cols === 4 ? "md:grid-cols-4" : "md:grid-cols-3"
          }`}
        >
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
