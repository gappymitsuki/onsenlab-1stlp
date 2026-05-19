"use client";

// Pre-launch price disclosure — two-tier per Business Plan v1.0 §6.1.
// Hiding price behind a FAQ row is the #1 documented exit reason on
// D2C waitlist LPs; we surface both tiers plainly and let the FAQ
// answer carry the longer-form repeat for visitors who land there
// without scrolling through Process. All numbers come from props so a
// pricing change is a one-line edit in app/page.tsx.

import Reveal from "./Reveal";

type Tier = {
  price: number;
  label: string;
  sachets: string;
  extra: string;
  meta: string;
};

export default function PricingPreview({
  founding = {
    price: 89,
    label: "Founding Members",
    sachets: "14 bath sachets",
    extra: "Handwritten Founder Letter, curated by Mitsuki",
    meta: "Limited to the first cohort",
  },
  standard = {
    price: 55,
    label: "Standard",
    sachets: "8–10 AI-personalized bath sachets",
    extra: "Prescription Card",
    meta: "Launches Q3 2026",
  },
  currency = "$",
}: {
  founding?: Tier;
  standard?: Tier;
  currency?: string;
}) {
  const tiers: (Tier & { emphasis?: boolean })[] = [
    { ...founding, emphasis: true },
    { ...standard },
  ];

  return (
    <section
      id="pricing"
      aria-label="Subscription price preview"
      className="relative w-full bg-washi text-sumi"
    >
      <div className="mx-auto max-w-[1920px] px-6 pb-24 md:px-[clamp(48px,6vw,120px)] md:pb-[160px]">
        <div className="border-t border-bone pt-16 md:pt-20">
          <Reveal as="p" mode="fade">
            <span className="font-mono text-[10px] uppercase tracking-mono text-mineral">
              PRICING · PRE-LAUNCH
            </span>
          </Reveal>

          <h3
            className="mt-8 max-w-[1100px] font-display font-light leading-[1.05] tracking-tight text-sumi"
            style={{ fontSize: "clamp(28px, 3.6vw, 56px)" }}
          >
            <Reveal as="span" mode="lines" duration={1.0}>
              Two tiers. One protocol.
            </Reveal>
          </h3>

          <div className="mt-14 grid grid-cols-1 gap-10 md:mt-16 md:grid-cols-2 md:gap-16">
            {tiers.map((t) => (
              <div
                key={t.label}
                className={`flex flex-col gap-5 border-t pt-8 md:pt-10 ${
                  t.emphasis ? "border-copper" : "border-bone"
                }`}
              >
                <span
                  className={`font-mono text-[10px] uppercase tracking-mono ${
                    t.emphasis ? "text-copper" : "text-mineral"
                  }`}
                >
                  {t.label}
                </span>
                <p
                  className="font-display font-light leading-none tracking-tight text-sumi tnum"
                  style={{ fontSize: "clamp(48px, 5.5vw, 80px)" }}
                >
                  {currency}
                  {t.price}
                  <span className="ml-2 font-mono text-[12px] uppercase tracking-mono text-mineral">
                    / month
                  </span>
                </p>
                <p className="max-w-[420px] font-serif text-[16px] font-light leading-[1.55] text-mineral md:text-[17px]">
                  {t.sachets} · {t.extra}.
                </p>
                <span className="font-mono text-[10px] uppercase tracking-mono text-mineral tnum">
                  {t.meta}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-12 font-mono text-[10px] uppercase tracking-mono text-mineral">
            No commitment · Cancel anytime before your next shipment
          </p>
        </div>
      </div>
    </section>
  );
}
