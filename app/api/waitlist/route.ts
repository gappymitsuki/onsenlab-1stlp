import { NextResponse } from "next/server";
import { addContact } from "@/lib/email/resend";

export const runtime = "edge";

// LP-bottom email form. Visitor explicitly opted out of taking the Quiz
// ("Not ready for the quiz? Reserve your spot."), so we don't send the
// prescription confirmation — they have no RX number to confirm. Just
// add them to the Resend Audience so they get Email 2 with everyone
// else when the batch ships.

export async function POST(request: Request) {
  let body: unknown = null;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const email =
    typeof body === "object" && body !== null && "email" in body
      ? String((body as { email: unknown }).email ?? "").trim()
      : "";
  const source =
    typeof body === "object" && body !== null && "source" in body
      ? String((body as { source: unknown }).source ?? "").trim()
      : "lp_bottom";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const contactRes = await addContact({ email, unsubscribed: false });

  console.log("[waitlist]", {
    email,
    source,
    contactAdded: contactRes !== null,
  });

  return NextResponse.json({ ok: true, position: 12848 });
}
