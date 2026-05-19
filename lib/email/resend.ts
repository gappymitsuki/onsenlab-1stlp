// Resend HTTP wrappers — used by the API routes. Stays fetch-based so we
// don't pull a node-leaning SDK into the Cloudflare edge bundle.
// Every helper is a no-op (logs + returns null) when RESEND_API_KEY is
// missing so local dev works without env wiring.

const RESEND_API = "https://api.resend.com";

type SendArgs = {
  to: string;
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
};

export async function sendEmail(args: SendArgs): Promise<{ id: string } | null> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("[resend] RESEND_API_KEY missing — skipping send", {
      to: args.to,
      subject: args.subject,
    });
    return null;
  }
  const res = await fetch(`${RESEND_API}/emails`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: args.from ?? "Onsen Labo <prescription@onsenlabo.com>",
      to: [args.to],
      subject: args.subject,
      html: args.html,
      reply_to: args.replyTo,
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error("[resend] send failed", res.status, body);
    return null;
  }
  return (await res.json().catch(() => null)) as { id: string } | null;
}

type ContactArgs = {
  email: string;
  firstName?: string;
  lastName?: string;
  unsubscribed?: boolean;
};

export async function addContact(
  args: ContactArgs
): Promise<{ id: string } | null> {
  const key = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!key || !audienceId) {
    console.warn("[resend] RESEND_API_KEY or RESEND_AUDIENCE_ID missing — skipping audience add", {
      email: args.email,
    });
    return null;
  }
  const res = await fetch(
    `${RESEND_API}/audiences/${audienceId}/contacts`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: args.email,
        first_name: args.firstName ?? "",
        last_name: args.lastName ?? "",
        unsubscribed: args.unsubscribed ?? false,
      }),
    }
  );
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    // 409 = already exists, don't treat as error
    if (res.status !== 409) {
      console.error("[resend] contact add failed", res.status, body);
    }
    return null;
  }
  return (await res.json().catch(() => null)) as { id: string } | null;
}
