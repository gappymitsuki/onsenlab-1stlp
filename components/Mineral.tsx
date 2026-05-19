"use client";

import Reveal from "./Reveal";
import MineralField from "./MineralField";

export default function Mineral() {
  return (
    <section
      id="mineral"
      className="relative w-full bg-sumi text-washi border-t border-ash"
    >
      <div className="relative mx-auto max-w-[1920px] px-6 pt-32 pb-32 md:px-[clamp(48px,6vw,120px)] md:pt-[240px] md:pb-[240px]">
        <Reveal as="p" mode="fade" className="block">
          <span className="font-mono text-[10px] uppercase tracking-mono text-copper">
            02 / TRANSDERMAL MINERAL DELIVERY
          </span>
        </Reveal>

        {/* Top quote — top-left, dominant */}
        <h2
          className="mt-12 max-w-[1100px] font-display font-light leading-[1.02] tracking-tight"
          style={{ fontSize: "clamp(48px, 8vw, 128px)" }}
        >
          <Reveal as="span" mode="lines" duration={1.2}>
            #magnesium has{" "}
            <span className="text-mineral">1.2 billion</span> views on TikTok.
          </Reveal>
        </h2>

        {/* Bottom quote — pushed right, smaller */}
        <div className="mt-32 grid grid-cols-1 md:mt-40 md:grid-cols-12 md:gap-12">
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

        {/* Plate — transdermal moment rendered. Sits between the "largest
            organ" claim and the brownian ion field so the abstract
            chemistry has a single human anchor immediately before the
            particle visualization. 16:9 inside an ash-bordered frame to
            match the visual language of the other photographic plates. */}
        <figure className="mt-20 md:mt-28">
          <div
            className="relative w-full overflow-hidden border border-ash/40 bg-sumi-deep"
            style={{ aspectRatio: "16 / 9" }}
          >
            <img
              src="/media/mineral-skin.jpg"
              alt="The mineral protocol carried through skin — at the threshold between the bath and the body."
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <figcaption className="mt-6 font-mono text-[10px] uppercase tracking-mono text-mist md:mt-8">
            TRANSDERMAL · MINERAL DELIVERY · IN PRACTICE
          </figcaption>
        </figure>

        {/* Brownian mineral ion field */}
        <div className="mt-32 md:mt-40">
          <MineralField />
        </div>
      </div>
    </section>
  );
}
