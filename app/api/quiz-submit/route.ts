import { NextResponse } from "next/server";
import { matchProfile } from "@/lib/email/matching";
import { addContact, sendEmail } from "@/lib/email/resend";
import { email1Html, email1Subject } from "@/lib/email/templates";
import { sendQuizToSheets } from "@/lib/sheets";

export const runtime = "edge";

type Body = {
  answers?: Record<string, unknown>;
  referrer?: string;
  userAgent?: string;
};

// The Quiz stores the email response under question id `contact` as
// `{ name?: string; email: string }`. Fall back to a top-level `email`
// or to a legacy `email_q` key in case any caller still posts the older
// shape.
function extractEmail(answers: Record<string, unknown>): string | null {
  for (const key of ["contact", "email_q"]) {
    const v = answers[key];
    if (v && typeof v === "object" && "email" in v) {
      const e = String((v as { email?: unknown }).email ?? "").trim();
      if (e) return e;
    }
  }
  const direct = answers["email"];
  if (typeof direct === "string" && direct.trim()) return direct.trim();
  return null;
}

function extractName(answers: Record<string, unknown>): string {
  for (const key of ["contact", "email_q"]) {
    const v = answers[key];
    if (v && typeof v === "object" && "name" in v) {
      return String((v as { name?: unknown }).name ?? "").trim();
    }
  }
  return "";
}

// Cloudflare populates cf-ipcountry on every edge request; fallback for
// non-Cloudflare environments is an empty string (column stays blank).
function extractCountry(request: Request): string {
  return request.headers.get("cf-ipcountry") ?? "";
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const answers = body.answers ?? {};
  const email = extractEmail(answers);
  const name = extractName(answers);

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const match = matchProfile(answers, email);
  const unsubscribeUrl =
    `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://onsenlab-1stlp.pages.dev"}` +
    `/api/unsubscribe?email=${encodeURIComponent(email)}`;

  const referrer = body.referrer ?? request.headers.get("referer") ?? "";
  const userAgent = body.userAgent ?? request.headers.get("user-agent") ?? "";
  const country = extractCountry(request);

  // Fire all three sinks in parallel. Each fails closed: Resend retries
  // internally on its end, Sheets logs + returns false. Visitor always
  // sees ok + their RX number regardless of which sink misbehaves.
  const [emailRes, contactRes, sheetsRes] = await Promise.allSettled([
    sendEmail({
      to: email,
      subject: email1Subject(match.rxNumber),
      html: email1Html({ ...match, unsubscribeUrl }),
    }),
    addContact({
      email,
      firstName: name,
      unsubscribed: false,
    }),
    sendQuizToSheets({
      email,
      rxNumber: match.rxNumber,
      onsen: match.onsen,
      formulation: match.formulation,
      answers,
      referrer,
      userAgent,
      country,
    }),
  ]);

  console.log("[quiz-submit]", {
    email,
    rxNumber: match.rxNumber,
    onsen: match.onsen,
    formulation: match.formulation,
    emailSent: emailRes.status === "fulfilled" && emailRes.value !== null,
    contactAdded: contactRes.status === "fulfilled" && contactRes.value !== null,
    sheetsLogged: sheetsRes.status === "fulfilled" && sheetsRes.value === true,
  });

  return NextResponse.json({
    ok: true,
    position: 12848,
    rxNumber: match.rxNumber,
    onsen: match.onsen,
    formulation: match.formulation,
  });
}
