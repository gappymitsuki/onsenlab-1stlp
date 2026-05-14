"use client";

import Reveal from "./Reveal";

const minerals = [
  { sym: "Mg²⁺", name: "MAGNESIUM", num: 12, mass: "24.305" },
  { sym: "Ca²⁺", name: "CALCIUM", num: 20, mass: "40.078" },
  { sym: "K⁺", name: "POTASSIUM", num: 19, mass: "39.098" },
  { sym: "HCO₃⁻", name: "BICARBONATE", num: null, mass: "61.016" },
  { sym: "Na⁺", name: "SODIUM", num: 11, mass: "22.990" },
];

export default function Mineral() {
  return (
    <section
      id="mineral"
      className="relative w-full bg-sumi text-washi border-t border-ash"
    >
      <div className="relative mx-auto max-w-[1920px] px-6 pt-32 pb-32 md:px-[clamp(48px,6vw,120px)] md:pt-[200px] md:pb-[240px]">
        <Reveal as="p" mode="fade" className="block">
          <span className="font-mono text-[10px] uppercase tracking-mono text-copper">
            02 / TRANSDERMAL MINERAL DELIVERY
          </span>
        </Reveal>

        {/* Top quote — top-left, dominant */}
        <h2
          className="mt-10 max-w-[1100px] font-display font-light leading-[1.02] tracking-tight"
          style={{ fontSize: "clamp(48px, 8vw, 128px)" }}
        >
          <Reveal as="span" mode="lines" duration={1.2}>
            #magnesium has{" "}
            <span className="text-mineral">1.2 billion</span> views on TikTok.
          </Reveal>
        </h2>

        {/* Bottom quote — pushed right, smaller */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5 md:col-start-7">
            <h3
              className="font-display font-light leading-[1.1] tracking-tight"
              style={{ fontSize: "clamp(28px, 3vw, 48px)" }}
            >
              <Reveal as="span" mode="lines" duration={1.2}>
                Bathing delivers it{" "}
                <span className="text-copper">through the largest organ in your body.</span>
              </Reveal>
            </h3>
          </div>
        </div>

        {/* Mineral panel row — no card chrome, just hairlines.
            TODO: replace with §6.2 WebGL molecule field. */}
        <div className="mt-32 border-t border-ash">
          <div className="grid grid-cols-2 md:grid-cols-5">
            {minerals.map((m, i) => (
              <div
                key={m.sym}
                className={`relative flex flex-col gap-6 px-6 py-12 md:px-8 md:py-16 ${
                  i > 0 ? "md:border-l border-ash" : ""
                } ${i % 2 === 1 ? "border-l border-ash md:border-l" : ""} ${
                  i >= 2 ? "border-t border-ash md:border-t-0" : ""
                }`}
              >
                <span className="font-mono text-[10px] uppercase tracking-mono text-mist">
                  {m.name}
                </span>
                <span
                  className="font-display font-light leading-none text-copper tabular-nums"
                  style={{ fontSize: "clamp(56px, 7vw, 112px)" }}
                >
                  {m.num ?? "—"}
                </span>
                <span className="font-display text-[20px] font-light text-mist">
                  {m.sym}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-mono text-mineral tnum">
                  {m.mass} · ATOMIC MASS
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
