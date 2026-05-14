// Global GSAP plugin + custom ease registration.
// Imported as a side-effect by client components that depend on GSAP.

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

let registered = false;

export function ensureGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, CustomEase);
  CustomEase.create("onsenOut", "0.16, 1, 0.3, 1");
  CustomEase.create("onsenIn", "0.7, 0, 0.84, 0");
  CustomEase.create("onsenMineral", "0.83, 0, 0.17, 1");
  registered = true;
}

// Eager-register on import in the browser
if (typeof window !== "undefined") {
  ensureGsap();
}

export { gsap, ScrollTrigger };
