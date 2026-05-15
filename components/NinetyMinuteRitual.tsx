"use client";

// Ritual mini-section, slotted between FinalCTA and Footer. Closes the
// page on the ceremony register so the last note isn't a form field. The
// drawing is a single-stroke copper SVG of a moon, three steam wisps, and
// a vessel — kept abstract enough to read as ink-line rather than
// illustration. No external asset; ships inline.

import Reveal from "./Reveal";

export default function NinetyMinuteRitual() {
  return (
    <section
      id="ninety-minute-ritual"
      aria-label="The ninety-minute ritual"
      className="relative w-full bg-sumi-deep text-washi border-t border-ash"
    >
      <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-[clamp(48px,6vw,120px)] md:py-32">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-16">
          {/* Copy column */}
          <div className="md:col-span-7">
            <Reveal as="p" mode="fade">
              <span className="font-mono text-[10px] uppercase tracking-mono text-copper">
                THE 90-MINUTE RITUAL
              </span>
            </Reveal>

            <h2
              className="mt-8 max-w-[640px] font-display font-light leading-[1.05] tracking-tight text-washi"
              style={{ fontSize: "clamp(32px, 4.4vw, 64px)" }}
            >
              <Reveal as="span" mode="lines" duration={1.2}>
                A prescription. And a nightly ceremony.
              </Reveal>
            </h2>

            <p
              className="mt-10 max-w-[560px] font-serif text-[16px] font-light leading-[1.85] text-mist md:text-[18px]"
              lang="en"
            >
              Forty minutes in the water. Fifty more under cooling sheets.
              The Japanese bath has been used this way for thirteen
              centuries — closer to tea ceremony than to soak. We have
              kept the form. The minerals are matched to you; the rhythm
              is the one your evening already knows.
            </p>
          </div>

          {/* Ink-line artifact column */}
          <div
            aria-hidden="true"
            className="md:col-span-5 md:col-start-8 flex justify-center md:justify-end"
          >
            <svg
              viewBox="0 0 220 220"
              width="220"
              height="220"
              fill="none"
              stroke="#B87333"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-[200px] w-[200px] md:h-[240px] md:w-[240px]"
            >
              {/* Moon */}
              <circle cx="160" cy="60" r="22" />
              {/* Three steam wisps rising */}
              <path d="M70 130 C 60 115, 80 105, 70 90 C 60 75, 80 65, 70 50" />
              <path d="M100 140 C 92 120, 108 110, 100 90" />
              <path d="M130 130 C 122 115, 138 105, 130 90 C 122 75, 138 65, 130 50" />
              {/* Vessel — open rectangle with rounded base */}
              <path d="M40 160 L40 190 Q40 200 50 200 L170 200 Q180 200 180 190 L180 160" />
              {/* Water line inside vessel */}
              <path d="M50 168 L170 168" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
