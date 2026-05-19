"use client";

// Ritual mini-section, slotted between FinalCTA and Footer. Closes the
// page on the ceremony register so the last note isn't a form field.
// The right column is the only photographic moment on the page below
// the fold — used here because the prior abstract SVG drawing read as
// decoration; the photo carries the "nightly ceremony" claim with
// concrete evidence.

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

          {/* Ceremony plate — single photograph carrying the
              "nightly ritual" claim. Aspect-ratio locked so the image
              never reshapes the grid on layout shift. */}
          <div className="md:col-span-5 md:col-start-8">
            <div
              className="relative w-full overflow-hidden border border-ash/50 bg-sumi"
              style={{ aspectRatio: "4 / 3" }}
            >
              <img
                src="/media/ritual-ceremony.jpg"
                alt="An evening ritual — a Japanese bath protocol, the moment after the soak."
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
