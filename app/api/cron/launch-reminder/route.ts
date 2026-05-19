import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email/resend";
import { email2Html, email2Subject } from "@/lib/email/templates";

export const runtime = "edge";

// Email 2 sender — broadcast the launch reminder to every waitlist
// contact. Wired for Cloudflare Cron Trigger OR manual invocation:
//
//   curl -X POST https://<host>/api/cron/launch-reminder \
//        -H "Authorization: Bearer $CRON_SECRET"
//
// Spec offered two paths for Email 2: (A) Resend dashboard broadcast,
// (B) cron-triggered programmatic send. This route is path B. It pulls
// contacts directly from the Resend Audience so we don't need a
// separate database — same source of truth as the waitlist counter.
//
// Per-contact RX number / onsen / formulation aren't stored on Resend
// (we only push email + name there). For Smoke-Test launch comms that's
// fine — the email uses a single generic RX/onsen string. Once a real
// DB is wired in, swap `listContacts()` for the DB query and pass the
// per-contact match through to email2Html().

type ResendContact = {
  id: string;
  email: string;
  first_name?: string | null;
  unsubscribed?: boolean;
};

async function listContacts(): Promise<ResendContact[]> {
  const key = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!key || !audienceId) {
    console.warn("[launch-reminder] env missing — returning empty list");
    return [];
  }
  const res = await fetch(
    `https://api.resend.com/audiences/${audienceId}/contacts`,
    {
      headers: { Authorization: `Bearer ${key}` },
    }
  );
  if (!res.ok) {
    console.error("[launch-reminder] contacts fetch failed", res.status);
    return [];
  }
  const json = (await res.json().catch(() => ({}))) as {
    data?: ResendContact[];
  };
  return (json.data ?? []).filter((c) => !c.unsubscribed && !!c.email);
}

function authorized(request: Request): boolean {
  const expected = process.env.CRON_SECRET;
  if (!expected) {
    // No secret configured = local dev. Allow.
    return true;
  }
  const hdr = request.headers.get("authorization") ?? "";
  return hdr === `Bearer ${expected}`;
}

async function handle(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const contacts = await listContacts();
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://onsenlab-1stlp.pages.dev";

  // Smoke-test placeholder values — see note in module header.
  const placeholderRx = "00001";
  const placeholderOnsen = "KUSATSU · pH 2.08";
  const placeholderFormulation = "Sulfur Reset Protocol";

  let sent = 0;
  let failed = 0;

  for (const contact of contacts) {
    const unsubscribeUrl = `${siteUrl}/api/unsubscribe?email=${encodeURIComponent(contact.email)}`;
    const result = await sendEmail({
      to: contact.email,
      subject: email2Subject(placeholderRx),
      html: email2Html({
        rxNumber: placeholderRx,
        onsen: placeholderOnsen,
        formulation: placeholderFormulation,
        weeksAgo: 8,
        unsubscribeUrl,
      }),
    });
    if (result) sent++;
    else failed++;
  }

  return NextResponse.json({
    ok: true,
    contacts: contacts.length,
    sent,
    failed,
  });
}

export async function POST(request: Request) {
  return handle(request);
}

// Cloudflare Cron Triggers call workers with GET. Allow either verb so
// the same route works for manual curl and scheduled invocations.
export async function GET(request: Request) {
  return handle(request);
}
