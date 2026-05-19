// Deterministic onsen + formulation matcher.
//
// Smoke-test grade: maps a small set of quiz signals (sleep_challenge,
// stress) onto one of four onsen profiles. Real matching against 47
// profiles ships post-launch. The shape of inputs/outputs is locked so
// the email template can stay stable when the matcher gets smarter.

export type QuizAnswers = Record<string, unknown>;

export type MatchResult = {
  rxNumber: string;          // five-digit serial, e.g. "00847"
  onsen: string;             // "KUSATSU · pH 2.08"
  formulation: string;       // "Magnesium-Forward Deep Sleep"
  protocol: string;          // "14 baths · 2 weeks"
};

const PROFILES = [
  {
    key: "kusatsu",
    onsen: "KUSATSU · pH 2.08",
    formulation: "Sulfur Reset Protocol",
  },
  {
    key: "beppu",
    onsen: "BEPPU · pH 6.04",
    formulation: "Magnesium-Forward Deep Sleep",
  },
  {
    key: "gero",
    onsen: "GERO · pH 8.92",
    formulation: "Alkaline Recovery Bath",
  },
  {
    key: "noboribetsu",
    onsen: "NOBORIBETSU · pH 4.20",
    formulation: "Mineral Balance",
  },
] as const;

function rxFromEmail(email: string): string {
  // Deterministic 5-digit serial keyed off the email so the same buyer
  // sees a consistent RX number across re-sends.
  let h = 0;
  for (const c of email) h = ((h << 5) - h + c.charCodeAt(0)) | 0;
  const n = Math.abs(h) % 100000;
  return String(n).padStart(5, "0");
}

export function matchProfile(answers: QuizAnswers, email: string): MatchResult {
  const sleep = String(answers["sleep_challenge"] ?? "").toLowerCase();
  const stress = String(answers["stress"] ?? "").toLowerCase();

  let profile: (typeof PROFILES)[number] = PROFILES[3]; // Noboribetsu default
  if (stress.includes("high") || stress.includes("chronic")) {
    profile = PROFILES[0]; // Kusatsu — strong reset
  } else if (sleep.includes("falling")) {
    profile = PROFILES[1]; // Beppu — Mg-forward
  } else if (sleep.includes("recovery") || sleep.includes("unrested")) {
    profile = PROFILES[2]; // Gero — alkaline recovery
  }

  return {
    rxNumber: rxFromEmail(email),
    onsen: profile.onsen,
    formulation: profile.formulation,
    protocol: "14 baths · 2 weeks",
  };
}
