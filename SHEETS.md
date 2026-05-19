# Google Sheets data collection (Apps Script)

Free webhook-based logging of every quiz completion and every LP-bottom
waitlist signup into a single Google Spreadsheet. Runs alongside the
Resend automation in `EMAILS.md` — both sinks fire from the same API
route call, neither blocks the visitor.

## File map

```
lib/sheets.ts                          POST wrappers + QUIZ_QUESTION_ORDER
app/api/quiz-submit/route.ts           calls sendQuizToSheets(...)
app/api/waitlist/route.ts              calls sendWaitlistToSheets(...)
components/Quiz.tsx                    forwards document.referrer + UA
components/FinalCTA.tsx                same — on the LP-bottom form
.env.example                           documents GOOGLE_SHEET_WEBHOOK_URL
```

## Spreadsheet setup (one-time, manual)

1. Create a new sheet at https://sheets.google.com — name it
   **Onsen Labo — Waitlist**.
2. Rename Sheet1 → **`quiz_leads`**. Drop these headers into row 1
   (one column each, in order):

   ```
   timestamp | email | rx_number | onsen | formulation
   q1 | q2 | q3 | q4 | q5 | q6 | q7 | q8 | q9 | q10 | q11 | q12
   referrer | user_agent | country | source
   ```

3. Add a second sheet, rename → **`lp_leads`**. Headers in row 1:

   ```
   timestamp | email | referrer | user_agent | country | submitted_via | source
   ```

4. Extensions → **Apps Script** → replace the default `Code.gs` body
   with the script below, then **Save**.

5. **Deploy → New deployment** →
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click Deploy → copy the resulting **Web app URL**.

6. Paste the URL into `GOOGLE_SHEET_WEBHOOK_URL` in `.env.local`
   (and in Cloudflare Pages → Settings → Environment variables for
   production).

### `Code.gs` to paste

```javascript
// Set this to the spreadsheet's ID — the long string between /d/ and
// /edit in the URL when you open the sheet.
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const ts = new Date().toISOString();

    if (data.source === 'quiz') {
      ss.getSheetByName('quiz_leads').appendRow([
        ts,
        data.email,
        data.rx_number,
        data.onsen,
        data.formulation,
        data.q1, data.q2, data.q3, data.q4, data.q5, data.q6,
        data.q7, data.q8, data.q9, data.q10, data.q11, data.q12,
        data.referrer,
        data.user_agent,
        data.country,
        'quiz',
      ]);
    } else {
      ss.getSheetByName('lp_leads').appendRow([
        ts,
        data.email,
        data.referrer,
        data.user_agent,
        data.country,
        data.submitted_via,
        'lp_bottom',
      ]);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Smoke test

After dropping the env var:

```sh
curl -X POST http://localhost:3000/api/quiz-submit \
  -H "Content-Type: application/json" \
  -d '{
    "answers": {
      "sleep_challenge": "Falling asleep",
      "stress": "Chronic",
      "bathtub": "Yes, I use it",
      "frequency": "Daily",
      "bedtime": "23:00",
      "wearable": "Oura",
      "sleep_quality": "Light",
      "skin": "Sensitive",
      "scent": "Earthy",
      "goal": "Sleep onset",
      "prior": "First time",
      "contact": { "name": "Test", "email": "smoke@example.com" }
    },
    "referrer": "https://example.com",
    "userAgent": "curl-smoke"
  }'
```

→ `quiz_leads` row should appear within seconds. Same drill for
`/api/waitlist` with `{"email":"smoke@example.com","source":"lp_bottom"}`
→ `lp_leads`.

## Caveats

- **Apps Script webhooks are public.** Anyone who knows the URL can POST
  arbitrary rows. The URL stays server-side here (no `NEXT_PUBLIC_`
  prefix), so it's out of the client bundle, but treat it as
  semi-secret rather than secret. If abuse becomes a problem, add a
  shared-token header check inside `doPost(e)`.
- **No retries.** A network blip drops the row silently; we log
  `[sheets] post threw` to the edge logs but don't backfill. For
  smoke-test volume this is acceptable; if it matters, mirror the data
  in Resend (already done — `RESEND_AUDIENCE` carries the email) so
  recovery is possible.
- **Question order must stay in sync.** `QUIZ_QUESTION_ORDER` in
  `lib/sheets.ts` is the source of truth that maps the keyed answers
  object to q1..q12. When `components/Quiz.tsx` adds/reorders a
  question, update the array in the same commit or the sheet columns
  shift silently.
- **Country comes from `cf-ipcountry`** which Cloudflare populates on
  every edge request. Outside Cloudflare (e.g. `next start` on
  localhost), the column stays blank.

## Manual broadcast workflow (pre-launch)

Once leads accumulate:

1. Open the spreadsheet → select the `email` column on both tabs →
   copy.
2. Paste into Google Contacts (import → CSV or manual) — Resend
   Audience already mirrors them automatically, but Gmail BCC is the
   no-cost fallback if Resend is unavailable.
3. Use Resend Broadcast (preferred) or Gmail BCC to send the launch
   reminder. Per-recipient RX numbers come from the `rx_number` column
   on `quiz_leads`.
