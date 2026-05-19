# Email automation — Onsen Labo

Two-email sequence wired through Resend. Smoke-test grade: nurture the
waitlist now, fire one launch-window reminder when batch 01 ships.

## Sequence

| # | Trigger | Sent by | Recipient |
|---|---|---|---|
| **1 — Prescription confirmation** | Immediately on `POST /api/quiz-submit` (quiz completion with valid email). | `lib/email/resend.ts → sendEmail()` | Quiz completers only. |
| **2 — Launch reminder (T-7 days)** | Manual broadcast from Resend dashboard, **OR** `POST /api/cron/launch-reminder` with `Authorization: Bearer $CRON_SECRET`. | `app/api/cron/launch-reminder/route.ts` (path B). | Entire Resend Audience — quiz completers + LP-bottom waitlist signers. |

The LP-bottom email form (`POST /api/waitlist`) does **not** send Email
1 — those visitors explicitly chose "skip the quiz", so they have no RX
number to confirm. They land in the same Resend Audience and get Email
2 alongside everyone else.

## File map

```
lib/email/
  resend.ts          fetch-wrapped sendEmail() + addContact()
  matching.ts        quiz answers → onsen / formulation / RX number
  templates.ts       email1Html(), email1Subject(), email2Html(), email2Subject()

app/api/
  quiz-submit/route.ts            sends Email 1 + addContact()
  waitlist/route.ts               addContact() only
  cron/launch-reminder/route.ts   sends Email 2 to every contact
```

## Setup checklist

1. **Resend API key** — reuse the Gappy Stay key, or create a new one.
   Put it in `RESEND_API_KEY`.
2. **Audience** — Resend dashboard → Audiences → create
   `onsen-labo-waitlist` → copy its UUID into `RESEND_AUDIENCE_ID`.
3. **Domain auth** — verify `onsenlabo.com` (or whatever sender domain
   you use) in Resend → Domains. Templates currently send from
   `prescription@onsenlabo.com` — adjust the `from` arg in
   `lib/email/resend.ts` if the domain changes.
4. **Cron secret** (optional but recommended for production) —
   `openssl rand -hex 32` → `CRON_SECRET` env. Without it the launch-
   reminder route is open; with it, callers must send
   `Authorization: Bearer $CRON_SECRET`.
5. **Cloudflare Pages env** — paste all four env vars into the project
   settings → Environment variables → Production. Set
   `NEXT_PUBLIC_SITE_URL` to the production domain so email links are
   correct.
6. **Local smoke test** — `npm run dev`, complete the quiz with your
   own address, confirm Email 1 lands. Then `curl -X POST
   http://localhost:3000/api/cron/launch-reminder` to dry-run Email 2.

## Sending Email 2 (T-7 days)

Two equivalent paths — pick the one that fits your launch routine:

### Path A — Resend dashboard broadcast (no code)

Resend → Broadcasts → New broadcast → select `onsen-labo-waitlist`
audience → paste `email2Html` rendered output → set subject from
`email2Subject` → send.

### Path B — Programmatic via the cron route

```sh
curl -X POST https://onsenlab-1stlp.pages.dev/api/cron/launch-reminder \
     -H "Authorization: Bearer $CRON_SECRET"
```

Or wire a Cloudflare Cron Trigger to hit `GET
/api/cron/launch-reminder` on the launch-minus-seven-days schedule.
The route iterates the Resend Audience and calls `sendEmail()` once per
non-unsubscribed contact, then returns `{ ok, contacts, sent, failed
}`.

## Per-contact data caveat

Path B currently uses a single placeholder RX / onsen / formulation in
the Email 2 template because Resend Audiences only store `email +
name`. For Smoke Test launch comms that's acceptable — the email reads
as a generic "your batch ships in 7 days" reminder.

When per-contact personalization matters (post-launch), wire a real DB
(Supabase, PlanetScale, etc.), persist the `MatchResult` from
`/api/quiz-submit` next to the email, and have `listContacts()` join
against it. The template already accepts per-contact values; only the
data source needs to change.

## Unsubscribe

Templates link to `/api/unsubscribe?email=…`. That route is not yet
implemented — when it is, it should `PATCH` the contact in the Resend
Audience to set `unsubscribed: true`. Resend also handles unsubscribes
via its own list-unsubscribe header automatically when the Audience is
used.
