"use client";

import Reveal from "./Reveal";

const sources = [
  { name: "KUSATSU", lat: "36.622° N", pH: "2.08" },
  { name: "BEPPU", lat: "33.279° N", pH: "6.04" },
  { name: "GERO", lat: "35.806° N", pH: "8.92" },
];

const marqueeNames = [
  "KUSATSU",
  "BEPPU",
  "GERO",
  "NOBORIBETSU",
  "HAKONE",
];

export default function Onsens() {
  return (
    <section
      id="onsens"
      className="relative w-full overflow-hidden bg-stone text-washi border-t border-ash"
    >
      <Reveal as="p" mode="fade" className="block px-6 pt-24 md:px-[clamp(48px,6vw,120px)] md:pt-[160px]">
        <span className="font-mono text-[10px] uppercase tracking-mono text-copper">
          03 / SOURCED FROM FIVE PROTECTED ONSENS
        </span>
      </Reveal>

      {/* Top — three parallel video plates */}
      <div className="mt-12 grid grid-cols-1 md:mt-20 md:grid-cols-3">
        {sources.map((s, i) => (
          <div
            key={s.name}
            className={`relative h-[40svh] md:h-[55svh] overflow-hidden bg-stone-mid ${
              i > 0 ? "md:border-l border-ash" : ""
            } ${i > 0 ? "border-t border-ash md:border-t-0" : ""}`}
          >
            {/* TODO: replace with V3 cuts (early-morning steam, color graded 4500K). */}
            <video
              className="absolute inset-0 h-full w-full object-cover opacity-90 mix-blend-screen"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster={`/media/v3-${s.name.toLowerCase()}-poster.jpg`}
              aria-hidden="true"
            >
              <source src={`/media/v3-${s.name.toLowerCase()}.webm`} type="video/webm" />
              <source src={`/media/v3-${s.name.toLowerCase()}.mp4`} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-sumi/70 via-sumi/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div className="font-mono text-[10px] uppercase tracking-mono text-mist">
                <div className="text-washi">{s.name}</div>
                <div className="mt-1 tnum">
                  {s.lat} · pH {s.pH}
                </div>
              </div>
              <span className="h-px w-10 bg-copper" />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom block — left headline, right meta */}
      <div className="mx-auto grid max-w-[1920px] grid-cols-1 gap-16 px-6 py-24 md:grid-cols-12 md:gap-12 md:px-[clamp(48px,6vw,120px)] md:py-[200px]">
        <div className="md:col-span-7">
          <h2
            className="font-display font-light leading-[1.02] tracking-tight text-washi"
            style={{ fontSize: "clamp(40px, 6vw, 96px)" }}
          >
            <Reveal as="span" mode="lines" duration={1.2}>
              Kusatsu. Beppu. Gero.{" "}
              <span className="text-copper">Each a chemical signature</span>{" "}
              evolved over 13 centuries.
            </Reveal>
          </h2>
        </div>
        <div className="md:col-span-4 md:col-start-9 flex flex-col gap-8 self-end">
          <p className="font-jp text-[16px] font-light leading-[1.85] text-mist" lang="en">
            Mineral profiles certified by Onsen Lab&apos;s lab in Tokyo. Sourced
            under partnerships with five protected hot springs.
          </p>
          <span className="h-px w-full bg-ash" />
          <span className="font-mono text-[10px] uppercase tracking-mono text-copper tnum">
            LAT 36.622° N · LON 138.596° E · pH 2.08 · SO₄²⁻ 1,432 mg/L
          </span>
        </div>
      </div>

      {/* Marquee — slow one-direction scroll, outline-only display type */}
      <div
        aria-hidden="true"
        className="relative w-full overflow-hidden border-t border-ash py-6 md:py-12"
      >
        <div className="marquee-track">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center">
              {marqueeNames.concat(marqueeNames).map((n, idx) => (
                <span
                  key={`${dup}-${idx}`}
                  className="mx-12 font-display font-light leading-none"
                  style={{
                    fontSize: "clamp(72px, 10vw, 144px)",
                    WebkitTextFillColor: "transparent",
                    WebkitTextStroke: "1px var(--color-ash)",
                    color: "transparent",
                  }}
                >
                  {n}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
