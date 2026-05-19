// Google Sheets webhook — fire-and-forget data collection through Apps
// Script. Webhook URL stays server-side (GOOGLE_SHEET_WEBHOOK_URL, no
// NEXT_PUBLIC) so it's not baked into the client bundle; the route
// handlers in app/api/* call these helpers alongside Resend.
//
// Both helpers no-op + warn when GOOGLE_SHEET_WEBHOOK_URL is unset.
// Failures never throw to the caller — analytics must not block the
// visitor's flow.

// Canonical display order of the 12 quiz questions. Used to flatten the
// keyed answers object into q1..q12 columns on the Sheet. Must stay in
// sync with `questions` in components/Quiz.tsx — when reordering or
// inserting a question, update both.
export const QUIZ_QUESTION_ORDER = [
  "sleep_challenge", // q1
  "stress",          // q2
  "bathtub",         // q3
  "frequency",       // q4
  "bedtime",         // q5
  "wearable",        // q6
  "sleep_quality",   // q7
  "skin",            // q8
  "scent",           // q9
  "goal",            // q10
  "prior",           // q11
  "contact",         // q12 (email — also surfaced as the `email` column)
] as const;

function answerToCell(v: unknown): string {
  if (v === null || v === undefined) return "";
  if (typeof v === "string") return v;
  if (typeof v === "number") return String(v);
  if (Array.isArray(v)) return v.map(answerToCell).join(" | ");
  // contact answer is { name?: string; email: string } — store email only;
  // other future object shapes get a JSON fallback so nothing crashes.
  if (typeof v === "object") {
    const obj = v as Record<string, unknown>;
    if (typeof obj.email === "string") return obj.email;
    try {
      return JSON.stringify(v);
    } catch {
      return "[object]";
    }
  }
  return String(v);
}

async function post(payload: unknown): Promise<boolean> {
  const url = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!url) {
    console.warn("[sheets] GOOGLE_SHEET_WEBHOOK_URL missing — skipping post");
    return false;
  }
  try {
    // Apps Script web apps don't honor CORS preflight; sending a plain
    // POST with text/plain content-type avoids the preflight entirely.
    // The Apps Script handler still reads e.postData.contents as JSON.
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error("[sheets] post failed", res.status);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[sheets] post threw", err);
    return false;
  }
}

type QuizArgs = {
  email: string;
  rxNumber: string;
  onsen: string;
  formulation: string;
  answers: Record<string, unknown>;
  referrer?: string;
  userAgent?: string;
  country?: string;
};

export async function sendQuizToSheets(args: QuizArgs): Promise<boolean> {
  const qCells: Record<string, string> = {};
  QUIZ_QUESTION_ORDER.forEach((qid, i) => {
    qCells[`q${i + 1}`] = answerToCell(args.answers[qid]);
  });

  return post({
    source: "quiz",
    email: args.email,
    rx_number: args.rxNumber,
    onsen: args.onsen,
    formulation: args.formulation,
    ...qCells,
    referrer: args.referrer ?? "",
    user_agent: args.userAgent ?? "",
    country: args.country ?? "",
  });
}

type WaitlistArgs = {
  email: string;
  referrer?: string;
  userAgent?: string;
  country?: string;
  source?: string;
};

export async function sendWaitlistToSheets(args: WaitlistArgs): Promise<boolean> {
  return post({
    source: "lp_bottom",
    email: args.email,
    referrer: args.referrer ?? "",
    user_agent: args.userAgent ?? "",
    country: args.country ?? "",
    submitted_via: args.source ?? "lp_bottom",
  });
}
