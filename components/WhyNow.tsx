"use client";

// Why-Now macro framing.
// Sits between Hero and Thermoregulation: "your problem → world's problem
// → mechanism → onsens → process". Anchors Onsen Lab inside the broader
// 2026 wellness shift (sleep-tech maturation, the rise of heat-exposure
// protocols, the magnesium-on-TikTok wave, record inbound to Japan)
// without name-checking individual influencers, brands, or competitors —
// abstract category language only, to avoid IP/legal exposure.

import Reveal from "./Reveal";

const indicators: { value: string; label: string; sub: string }[] = [
  {
    value: "$5.2B+",
    label: "Sleep-tech category",
    sub: "Recent valuations · 2024",
  },
  {
    value: "1.2B+",
    label: "#magnesium views",
    sub: "TikTok cumulative",
  },
  {
    value: "36.8M",
    label: "Inbound to Japan",
    sub: "2024 — record year",
  },
  {
    value: "#1",
    label: "Heat-exposure protocols",
    sub: "Top wellness research, 2026",
  },
];

export default function WhyNow() {
  return (
    <section
      id="why-now"
      className="relative w-full bg-washi text-sumi border-t border-bone"
    >
      <div className="mx-auto max-w-[1920px] px-6 py-32 md:px-[clamp(48px,6vw,120px)] md:py-[200px]">
        <Reveal as="p" mode="fade">
          <span className="font-mono text-[10px] uppercase tracking-mono text-mineral">
            WHY NOW
          </span>
        </Reveal>

        <h2
          className="mt-10 max-w-[1100px] font-display font-light leading-[1.02] tracking-tight text-sumi"
          style={{ fontSize: "clamp(40px, 6vw, 96px)" }}
        >
          <Reveal as="span" mode="lines" duration={1.2}>
            The bath is the next sleep device.
          </Reveal>
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-12 md:mt-20 md:grid-cols-12 md:gap-16">
          <p
            className="md:col-span-7 max-w-[640px] font-serif text-[16px] font-light leading-[1.85] text-mineral md:text-[18px]"
            lang="en"
          >
            Wearables made sleep measurable. Pharmacology is racing to make
            it prescriptive. Onsen Lab is building the third lane — a
            non-pharma, mineral-based protocol with reproducible
            thermoregulation data behind it, delivered as a ritual you
            already know how to perform.
          </p>
          <div className="md:col-span-4 md:col-start-9">
            <p
              className="font-serif text-[14px] font-light italic leading-[1.7] text-mineral"
              lang="en"
            >
              The cultural moment for hot-water immersion as a sleep input
              has arrived — well ahead of the supply chain built to serve
              it from real onsens.
            </p>
          </div>
        </div>

        {/* Indicators — horizontal data strip. */}
        <ul
          className="mt-24 grid grid-cols-2 border-t border-bone md:mt-32 md:grid-cols-4"
          aria-label="Macro indicators supporting the Why-Now thesis"
        >
          {indicators.map((it, i) => (
            <li
              key={it.label}
              className={`flex flex-col gap-3 px-2 py-10 md:px-8 md:py-12 ${
                i > 0 ? "md:border-l border-bone" : ""
              } ${i % 2 === 1 ? "border-l border-bone md:border-l" : ""} ${
                i >= 2 ? "border-t border-bone md:border-t-0" : ""
              }`}
            >
              <span
                className="font-display font-light leading-none tracking-tight text-sumi tnum"
                style={{ fontSize: "clamp(36px, 4.5vw, 64px)" }}
              >
                {it.value}
              </span>
              <span className="mt-2 font-mono text-[10px] uppercase tracking-mono text-mineral">
                {it.label}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-mono text-mist">
                {it.sub}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
