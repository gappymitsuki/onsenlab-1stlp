"use client";

// Comparison table promoted from a hidden FAQ row to a first-class
// section. Sits between Onsens and Process — once the visitor knows what
// the source material is, the natural next question is "how is this not
// just a bath bomb?". We answer it before they ask.
//
// Legal posture: only category names appear in the column headers
// ("Bath Bombs", "Epsom Salts"). No brand is named in code or copy —
// LUSH, Dr Teal's, Herbivore, Bath & Body Works are referenced only in
// the internal spec, never in the rendered DOM.

import Reveal from "./Reveal";

type Row = {
  attribute: string;
  bathBomb: string;
  epsom: string;
  onsenLab: string;
};

const rows: Row[] = [
  {
    attribute: "Active mineral content",
    bathBomb: "Dyes and fragrance",
    epsom: "Generic MgSO₄",
    onsenLab: "5 onsen-sourced profiles",
  },
  {
    attribute: "Personalization",
    bathBomb: "None",
    epsom: "None",
    onsenLab: "AI-matched per profile",
  },
  {
    attribute: "Sleep evidence",
    bathBomb: "Anecdotal",
    epsom: "Partial",
    onsenLab: "Walker-lab thermoregulation",
  },
  {
    attribute: "Skin residue",
    bathBomb: "Dyes can stain",
    epsom: "Clean",
    onsenLab: "Clean + onsen minerals",
  },
  {
    attribute: "Origin",
    bathBomb: "Mass production",
    epsom: "Commodity salt",
    onsenLab: "Protected onsens, Japan",
  },
];

const columns: { key: keyof Row; label: string; emphasis?: boolean }[] = [
  { key: "bathBomb", label: "Bath Bombs" },
  { key: "epsom",    label: "Epsom Salts" },
  { key: "onsenLab", label: "Onsen Lab", emphasis: true },
];

export default function NotABathBomb() {
  return (
    <section
      id="not-a-bath-bomb"
      className="relative w-full bg-washi text-sumi border-t border-bone"
    >
      <div className="mx-auto max-w-[1920px] px-6 py-32 md:px-[clamp(48px,6vw,120px)] md:py-[200px]">
        <Reveal as="p" mode="fade">
          <span className="font-mono text-[10px] uppercase tracking-mono text-mineral">
            NOT A BATH BOMB
          </span>
        </Reveal>

        <h2
          className="mt-10 max-w-[1100px] font-display font-light leading-[1.02] tracking-tight text-sumi"
          style={{ fontSize: "clamp(40px, 6vw, 96px)" }}
        >
          <Reveal as="span" mode="lines" duration={1.2}>
            The end of the bath bomb era.
          </Reveal>
        </h2>

        <p
          className="mt-10 max-w-[640px] font-serif text-[16px] font-light leading-[1.85] text-mineral md:text-[18px]"
          lang="en"
        >
          The legacy bath category was built around scent, color, and
          retail-shelf appeal. The new category is built around
          measurable inputs to sleep.
        </p>

        {/* Comparison grid — minimal borders, data-table tone. Mobile
            shows a two-row layout per attribute (label + 3-col grid);
            desktop is a single 4-column row. */}
        <div className="mt-20 md:mt-24" role="table" aria-label="Bath category comparison">
          {/* Header — desktop only */}
          <div
            role="row"
            className="hidden grid-cols-12 border-t border-b border-sumi/30 py-5 md:grid"
          >
            <span role="columnheader" className="col-span-3 font-mono text-[10px] uppercase tracking-mono text-mineral">
              Attribute
            </span>
            {columns.map((c) => (
              <span
                key={c.key}
                role="columnheader"
                className={`col-span-3 font-mono text-[10px] uppercase tracking-mono ${
                  c.emphasis ? "text-copper" : "text-mineral"
                }`}
              >
                {c.label}
              </span>
            ))}
          </div>

          {/* Rows */}
          {rows.map((r) => (
            <div
              key={r.attribute}
              role="row"
              className="grid grid-cols-1 border-b border-bone py-6 md:grid-cols-12 md:py-7"
            >
              {/* Attribute label — uppercased on mobile too so it reads
                  as a row title, not body copy. */}
              <span
                role="rowheader"
                className="col-span-3 font-mono text-[10px] uppercase tracking-mono text-sumi md:flex md:items-center"
              >
                {r.attribute}
              </span>

              {/* Mobile: 3-column micro-grid under the attribute. */}
              <div className="mt-4 grid grid-cols-3 gap-4 md:hidden">
                {columns.map((c) => (
                  <div key={c.key} className="flex flex-col gap-2">
                    <span
                      className={`font-mono text-[10px] uppercase tracking-mono ${
                        c.emphasis ? "text-copper" : "text-mist"
                      }`}
                    >
                      {c.label}
                    </span>
                    <span
                      className={`font-serif text-[14px] font-light leading-[1.4] ${
                        c.emphasis ? "text-sumi" : "text-mineral"
                      }`}
                    >
                      {r[c.key]}
                    </span>
                  </div>
                ))}
              </div>

              {/* Desktop: data cells in the same 12-col grid. */}
              {columns.map((c) => (
                <span
                  key={c.key}
                  role="cell"
                  className={`hidden col-span-3 font-serif text-[16px] font-light leading-[1.55] md:flex md:items-center ${
                    c.emphasis ? "text-sumi" : "text-mineral"
                  }`}
                >
                  {r[c.key]}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
