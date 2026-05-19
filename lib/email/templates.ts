// Email HTML templates — kept as plain template functions so we don't
// drag MJML or react-email into the edge bundle. Each function returns
// a self-contained HTML string with inline styles (the only style mode
// that survives Gmail/Outlook intact).

import type { MatchResult } from "./matching";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://onsenlab-1stlp.pages.dev";

function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ---------------------------------------------------------------------------
// EMAIL 1 — Prescription confirmation, sent immediately on quiz completion.
// ---------------------------------------------------------------------------

export function email1Subject(rxNumber: string): string {
  return `Your Onsen Labo prescription — RX-${rxNumber}`;
}

export function email1Html({
  rxNumber,
  onsen,
  formulation,
  protocol,
  unsubscribeUrl,
}: MatchResult & { unsubscribeUrl: string }): string {
  return `
<div style="background:#1a1a1a; color:#F4EDE0; font-family:'Georgia',serif; max-width:600px; margin:0 auto; padding:48px 40px;">

  <p style="font-family:'Courier New',monospace; font-size:11px; letter-spacing:0.15em; color:#B87333; margin:0 0 48px;">
    ONSEN LABO · PROTOCOL v1 · EST. 2026 · TOKYO
  </p>

  <h1 style="font-size:28px; font-weight:400; margin:0 0 8px; letter-spacing:-0.01em;">
    Sleep, prescribed.
  </h1>
  <p style="font-size:14px; color:#999; margin:0 0 48px;">
    Your AI-personalized onsen protocol is reserved.
  </p>

  <div style="border:1px solid #333; padding:32px; margin:0 0 40px;">
    <p style="font-family:'Courier New',monospace; font-size:11px; letter-spacing:0.12em; color:#B87333; margin:0 0 24px;">
      YOUR PRESCRIPTION
    </p>
    <p style="font-size:32px; font-weight:400; letter-spacing:0.05em; margin:0 0 32px;">
      RX-${escape(rxNumber)}
    </p>
    <table style="width:100%; border-collapse:collapse;">
      <tr>
        <td style="font-family:'Courier New',monospace; font-size:11px; color:#666; padding:8px 0; letter-spacing:0.1em;">PRIMARY</td>
        <td style="font-size:13px; color:#F4EDE0; padding:8px 0; text-align:right;">${escape(onsen)}</td>
      </tr>
      <tr>
        <td style="font-family:'Courier New',monospace; font-size:11px; color:#666; padding:8px 0; letter-spacing:0.1em;">FORMULATION</td>
        <td style="font-size:13px; color:#F4EDE0; padding:8px 0; text-align:right;">${escape(formulation)}</td>
      </tr>
      <tr>
        <td style="font-family:'Courier New',monospace; font-size:11px; color:#666; padding:8px 0; letter-spacing:0.1em;">PROTOCOL</td>
        <td style="font-size:13px; color:#F4EDE0; padding:8px 0; text-align:right;">${escape(protocol)}</td>
      </tr>
      <tr>
        <td style="font-family:'Courier New',monospace; font-size:11px; color:#666; padding:8px 0; letter-spacing:0.1em;">BATCH</td>
        <td style="font-size:13px; color:#F4EDE0; padding:8px 0; text-align:right;">Q3 2026</td>
      </tr>
    </table>
  </div>

  <p style="font-size:15px; line-height:1.7; color:#ccc; margin:0 0 16px;">
    Your formulation has been matched to your sleep profile and locked under
    RX-${escape(rxNumber)}.
  </p>
  <p style="font-size:15px; line-height:1.7; color:#ccc; margin:0 0 40px;">
    When your batch ships in Q3 2026, you'll receive one email — and one email
    only. No newsletters. No promotions. Just your prescription.
  </p>

  <a href="${SITE_URL}/quiz"
     style="display:inline-block; background:#B87333; color:#1a1a1a; font-family:'Courier New',monospace; font-size:12px; letter-spacing:0.12em; padding:14px 28px; text-decoration:none;">
    SHARE YOUR PRESCRIPTION TYPE →
  </a>

  <p style="font-family:'Courier New',monospace; font-size:10px; color:#444; margin:48px 0 0; letter-spacing:0.08em;">
    ONSEN LABO · TOKYO, JAPAN · FORMULATED 2026<br>
    You're receiving this because you reserved RX-${escape(rxNumber)}.<br>
    <a href="${escape(unsubscribeUrl)}" style="color:#444;">Unsubscribe</a>
  </p>

</div>`.trim();
}

// ---------------------------------------------------------------------------
// EMAIL 2 — Launch reminder, 7 days before batch ships. Manual broadcast or
// cron-triggered via /api/cron/launch-reminder.
// ---------------------------------------------------------------------------

export function email2Subject(rxNumber: string): string {
  return `RX-${rxNumber} — your batch ships in 7 days`;
}

export function email2Html({
  rxNumber,
  onsen,
  formulation,
  weeksAgo,
  unsubscribeUrl,
}: {
  rxNumber: string;
  onsen: string;
  formulation: string;
  weeksAgo: number;
  unsubscribeUrl: string;
}): string {
  return `
<div style="background:#1a1a1a; color:#F4EDE0; font-family:'Georgia',serif; max-width:600px; margin:0 auto; padding:48px 40px;">

  <p style="font-family:'Courier New',monospace; font-size:11px; letter-spacing:0.15em; color:#B87333; margin:0 0 48px;">
    ONSEN LABO · BATCH 01 · SHIPPING IN 7 DAYS
  </p>

  <h1 style="font-size:28px; font-weight:400; margin:0 0 8px;">
    RX-${escape(rxNumber)}.
  </h1>
  <p style="font-size:16px; color:#999; margin:0 0 48px;">
    Your ${escape(onsen)} formulation ships next week.
  </p>

  <p style="font-size:15px; line-height:1.7; color:#ccc; margin:0 0 16px;">
    You reserved this prescription ${weeksAgo} week${weeksAgo === 1 ? "" : "s"} ago.
    Your ${escape(formulation)} formulation — sourced from ${escape(onsen)} — is
    packaged and ready.
  </p>
  <p style="font-size:15px; line-height:1.7; color:#ccc; margin:0 0 40px;">
    To complete your order before the batch closes, confirm below.
    Founding Member pricing: <strong style="color:#F4EDE0;">$89 for 14 baths.</strong>
  </p>

  <a href="${SITE_URL}/?ref=launch_email&rx=${escape(rxNumber)}"
     style="display:inline-block; background:#F4EDE0; color:#1a1a1a; font-family:'Courier New',monospace; font-size:12px; letter-spacing:0.12em; padding:14px 28px; text-decoration:none;">
    CONFIRM MY ORDER — RX-${escape(rxNumber)} →
  </a>

  <p style="font-size:13px; color:#666; margin:32px 0 0;">
    Batch closes when full. 12,847 reservations ahead of you.
  </p>

  <p style="font-family:'Courier New',monospace; font-size:10px; color:#444; margin:48px 0 0; letter-spacing:0.08em;">
    ONSEN LABO · TOKYO, JAPAN<br>
    This is the only email we'll send before your batch ships.<br>
    <a href="${escape(unsubscribeUrl)}" style="color:#444;">Unsubscribe</a>
  </p>

</div>`.trim();
}
