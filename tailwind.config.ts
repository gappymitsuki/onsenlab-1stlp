import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    // Disable Tailwind's default border-radius scale entirely.
    // Sharp rectangles only — see design system rule.
    borderRadius: {
      none: "0",
      DEFAULT: "0",
    },
    // Kill all box shadows. No drop shadows, no glows.
    boxShadow: {
      none: "none",
      DEFAULT: "none",
    },
    extend: {
      colors: {
        "bg-base": "#0A0908",
        "bg-elevated": "#14110F",
        "text-primary": "#F5F1EA",
        "text-secondary": "#8B8680",
        "text-tertiary": "#4A4642",
        accent: "#C9A961",
        line: "#2A2622",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        serif: ["var(--font-noto-serif-jp)", "Noto Serif JP", "serif"],
        mono: ["var(--font-jetbrains-mono)", "JetBrains Mono", "monospace"],
      },
      letterSpacing: {
        display: "-0.04em",
        tight: "-0.03em",
        caption: "0.15em",
      },
      fontSize: {
        // mobile / desktop pairs
        "display-1": ["56px", { lineHeight: "1.02", letterSpacing: "-0.04em" }],
        "display-1-lg": ["120px", { lineHeight: "0.98", letterSpacing: "-0.04em" }],
        "display-2": ["40px", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display-2-lg": ["80px", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "h3": ["28px", { lineHeight: "1.2" }],
        "h3-lg": ["40px", { lineHeight: "1.2" }],
        "body": ["15px", { lineHeight: "1.7" }],
        "body-lg": ["16px", { lineHeight: "1.7" }],
        "caption": ["11px", { lineHeight: "1.4", letterSpacing: "0.15em" }],
        "caption-lg": ["12px", { lineHeight: "1.4", letterSpacing: "0.15em" }],
      },
      transitionTimingFunction: {
        cinema: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
