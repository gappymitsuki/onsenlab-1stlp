import { NextResponse } from "next/server";
import { matchProfile } from "@/lib/email/matching";
import { addContact, sendEmail } from "@/lib/email/resend";
import { email1Html, email1Subject } from "@/lib/email/templates";

export const runtime = "edge";

type Body = {
  answers?: Record<string, unknown>;
};

function extractEmail(answers: Record<string, unknown>): string | null {
  // The Quiz schema stores the email response under `email_q` as
  // `{ name?: string; email: string }`. Fall back to a top-level `email`
  // if a different caller submits manually.
  const eq = answers["email_q"];
  if (eq && typeof eq === "object" && "email" in eq) {
    const e = String((eq as { email?: unknown }).email ?? "").trim();
    if (e) return e;
  }
  const direct = answers["email"];
  if (typeof direct === "string" && direct.trim()) return direct.trim();
  return null;
}

function extractName(answers: Record<string, unknown>): string {
  const eq = answers["email_q"];
  if (eq && typeof eq === "object" && "name" in eq) {
    return String((eq as { name?: unknown }).name ?? "").trim();
  }
  return "";
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

  // Fire-and-forget the two outbound calls in parallel. Audience add can
  // 409 on duplicate; sendEmail logs its own failures. Neither is allowed
  // to block the visitor — they always see ok+position.
  const [emailRes, contactRes] = await Promise.allSettled([
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
  ]);

  console.log("[quiz-submit]", {
    email,
    rxNumber: match.rxNumber,
    onsen: match.onsen,
    formulation: match.formulation,
    emailSent: emailRes.status === "fulfilled" && emailRes.value !== null,
    contactAdded: contactRes.status === "fulfilled" && contactRes.value !== null,
  });

  return NextResponse.json({
    ok: true,
    position: 12848,
    rxNumber: match.rxNumber,
    onsen: match.onsen,
    formulation: match.formulation,
  });
}
