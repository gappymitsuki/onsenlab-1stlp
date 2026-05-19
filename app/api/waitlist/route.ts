import { NextResponse } from "next/server";
import { addContact } from "@/lib/email/resend";
import { sendWaitlistToSheets } from "@/lib/sheets";

export const runtime = "edge";

// LP-bottom email form. Visitor explicitly opted out of taking the Quiz
// ("Not ready for the quiz? Reserve your spot."), so we don't send the
// prescription confirmation — they have no RX number to confirm. They
// land in the same Resend Audience as quiz completers and on the
// `lp_leads` sheet for separate analytics.

type Body = {
  email?: unknown;
  source?: unknown;
  referrer?: unknown;
  userAgent?: unknown;
};

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(request: Request) {
  let body: Body = {};
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const email = str(body.email);
  const source = str(body.source) || "lp_bottom";
  const referrer = str(body.referrer) || request.headers.get("referer") || "";
  const userAgent = str(body.userAgent) || request.headers.get("user-agent") || "";
  const country = request.headers.get("cf-ipcountry") ?? "";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const [contactRes, sheetsRes] = await Promise.allSettled([
    addContact({ email, unsubscribed: false }),
    sendWaitlistToSheets({ email, referrer, userAgent, country, source }),
  ]);

  console.log("[waitlist]", {
    email,
    source,
    contactAdded: contactRes.status === "fulfilled" && contactRes.value !== null,
    sheetsLogged: sheetsRes.status === "fulfilled" && sheetsRes.value === true,
  });

  return NextResponse.json({ ok: true, position: 12848 });
}
