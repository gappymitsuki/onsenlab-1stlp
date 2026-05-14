import type { Config } from "tailwindcss";

// Quiet Volume Doctrine v1.0 — see brand spec.
// Border radius and shadow scales are zeroed at the framework layer.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    borderRadius: { none: "0", DEFAULT: "0" },
    boxShadow: { none: "none", DEFAULT: "none" },
    extend: {
      colors: {
        // Base layer
        sumi: "#0A0908",
        "sumi-deep": "#050403",
        stone: "#1C1A17",
        "stone-mid": "#2A2620",
        ash: "#3D3833",

        // Paper layer
        washi: "#F2EDE4",
        yunohana: "#E8DFD0",
        bone: "#DCD3C3",

        // Copper accent (use < 3% per screen)
        copper: "#B87333",
        "copper-hot": "#C8956D",
        "copper-leaf": "#8B5A2B",

        // Information layer
        mist: "#A8A39D",
        mineral: "#6E6862",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Fraunces", "Editorial New", "GT Sectra Display", "serif"],
        serif: ["var(--font-fraunces)", "Fraunces", "Source Serif 4", "serif"],
        mono: ["var(--font-jetbrains-mono)", "JetBrains Mono", "monospace"],
        sans: ["var(--font-jetbrains-mono)", "JetBrains Mono", "monospace"],
      },
      letterSpacing: {
        display: "-0.04em",
        tight: "-0.02em",
        caption: "0.12em",
        mono: "0.2em",
      },
      lineHeight: {
        monolith: "0.92",
        display: "0.98",
        body: "1.55",
      },
      fontSize: {
        // Modular scale 1.333 perfect-fourth (clamp)
        monolith: ["clamp(64px, 14vw, 220px)", { lineHeight: "0.92", letterSpacing: "-0.04em" }],
        "display-1": ["clamp(48px, 8vw, 128px)", { lineHeight: "0.98", letterSpacing: "-0.03em" }],
        "display-2": ["clamp(36px, 5vw, 80px)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        headline: ["clamp(28px, 3vw, 32px)", { lineHeight: "1.15" }],
        lead: ["clamp(18px, 1.6vw, 22px)", { lineHeight: "1.55" }],
        body: ["clamp(15px, 1.1vw, 16px)", { lineHeight: "1.55" }],
        caption: ["12px", { lineHeight: "1.4", letterSpacing: "0.12em" }],
        micro: ["10px", { lineHeight: "1.4", letterSpacing: "0.2em" }],
      },
      transitionTimingFunction: {
        "onsen-out": "cubic-bezier(0.16, 1, 0.3, 1)",
        "onsen-in": "cubic-bezier(0.7, 0, 0.84, 0)",
        "onsen-mineral": "cubic-bezier(0.83, 0, 0.17, 1)",
      },
      transitionDuration: {
        micro: "400ms",
        small: "900ms",
        medium: "1400ms",
        large: "2400ms",
      },
    },
  },
  plugins: [],
};

export default config;
