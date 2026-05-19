"use client";

// Spec-locked: four label/value rows, nothing else.
//
// No headline, no caption, no advisor row, no Tokyo Lab / Bunkyō-ku /
// Narita Logistics operational detail. Each row is a horizontal pair —
// small mono label on the left, value on the right — separated by a
// hairline. The shape is intentionally flat: this section is the
// receipt at the bottom of the page, not a sales argument.

import Reveal from "./Reveal";

const rows: { label: string; value: string }[] = [
  {
    label: "INSPIRED BY",
    value: "Kusatsu · Beppu · Gero · Noboribetsu · Hakone",
  },
  {
    label: "CURATED IN",
    value: "Tokyo, Japan",
  },
  {
    label: "SHIPS FROM",
    value: "Tokyo → Worldwide",
  },
  {
    label: "BETA",
    value: "1,000+ rituals · 12 countries",
  },
];

export default function Credibility() {
  return (
    <section
      id="credibility"
      className="relative w-full bg-sumi text-washi border-t border-ash"
    >
      <div className="mx-auto max-w-[1920px] px-6 py-32 md:px-[clamp(48px,6vw,120px)] md:py-[200px]">
        <ul className="border-t border-ash">
          {rows.map((r) => (
            <li
              key={r.label}
              className="grid grid-cols-1 gap-3 border-b border-ash py-10 md:grid-cols-12 md:items-baseline md:gap-12 md:py-12"
            >
              <span className="md:col-span-3 font-mono text-[10px] uppercase tracking-mono text-mineral">
                {r.label}
              </span>
              <Reveal
                as="span"
                mode="fade"
                className="md:col-span-9 block font-display font-light tracking-tight text-washi"
              >
                <span style={{ fontSize: "clamp(20px, 2.2vw, 30px)" }}>
                  {r.value}
                </span>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
