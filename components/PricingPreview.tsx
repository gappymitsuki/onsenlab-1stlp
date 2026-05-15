"use client";

// Pre-launch price disclosure. Hiding the price behind a collapsed FAQ
// row is the #1 documented exit reason on D2C waitlist LPs. Surfaces the
// monthly tier + the trial-box price plainly. Numbers come from props so
// pricing decisions live in app/page.tsx, not in copy.

import Reveal from "./Reveal";

export default function PricingPreview({
  tier1Price = 45,
  trialPrice = 35,
  currency = "$",
}: {
  tier1Price?: number;
  trialPrice?: number;
  currency?: string;
}) {
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

          <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-7">
              <p
                className="font-display font-light leading-[1.05] tracking-tight text-sumi"
                style={{ fontSize: "clamp(28px, 3.6vw, 56px)" }}
              >
                <Reveal as="span" mode="lines" duration={1.0}>
                  Subscription starts at{" "}
                  <span className="text-copper tnum">
                    {currency}
                    {tier1Price}
                  </span>{" "}
                  / month.
                </Reveal>
              </p>
              <p className="mt-6 font-serif text-[16px] font-light leading-[1.7] text-mineral md:text-[18px]">
                First box:{" "}
                <span className="text-sumi tnum">
                  {currency}
                  {trialPrice}
                </span>{" "}
                trial · Cancel anytime.
              </p>
            </div>

            <ul className="md:col-span-4 md:col-start-9 flex flex-col gap-4 self-end font-mono text-[10px] uppercase tracking-mono text-mineral">
              <li className="flex items-baseline gap-3">
                <span className="text-copper">·</span>
                <span>1 prescription / month</span>
              </li>
              <li className="flex items-baseline gap-3">
                <span className="text-copper">·</span>
                <span>Ships from Tokyo</span>
              </li>
              <li className="flex items-baseline gap-3">
                <span className="text-copper">·</span>
                <span>Pause or cancel in one click</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
