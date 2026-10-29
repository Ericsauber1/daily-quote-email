# Quote email — agent instructions

Catchall for humans and coding agents (Cursor’s equivalent of Kiro `instructions.md`). This is the only spec. Keep the project small: no UI, database, extra APIs, retry queue, or multiple recipients. A missed send after a 500 is acceptable; do not add retries.

## What it does

A no-framework Vercel function emails one inspirational quote every morning at **8am Pacific** (8:00–8:59 on the Los Angeles clock; PST in winter, PDT in summer). Exact minute is not required — Hobby cron and Resend may land anywhere in that hour. Resend is the only outside service. There is no frontend.

- Production: `https://quote-email.vercel.app`
- Function: `GET /api/send-quote`
- Vercel project: `esaubers-projects/quote-email` (own project; do not deploy this folder into another app)
- GitHub is optional; CLI deploy is enough. Crons only run on **production**.

## Stack

- TypeScript, `"type": "module"`, `strict: true`, target ES2022, module ESNext, `moduleResolution: Bundler`
- `resend` dependency; `typescript` + `@types/node` as devDependencies
- npm script: `"typecheck": "tsc --noEmit"`
- Vercel Node function, Web `Request` / `Response`
- Vercel Cron (UTC only)
- No Next.js, no date libraries

## Layout

```
api/send-quote.ts     # only function
lib/quotes.ts         # quote list
lib/pickQuote.ts      # dayNumber % length
lib/time.ts           # Pacific hour + day count
vercel.json           # two daily crons
package.json
tsconfig.json
.gitignore            # .env, node_modules, .vercel, .DS_Store
.env.example
AGENTS.md             # this file
README.md             # points here
```

Do not commit `.env`. Local `.env` is **not** uploaded by `vercel deploy`. Secrets live in Vercel Production env + gitignored `.env`.

Relative imports **must** use `.js` extensions (`../lib/pickQuote.js`). `"type": "module"` caused `ERR_MODULE_NOT_FOUND` / `FUNCTION_INVOCATION_FAILED` without them.

The handler is **not** Next.js `export async function GET` (that crashed on this no-framework project). Use:

```ts
export default {
  async fetch(request: Request): Promise<Response> { ... }
};
```

## Request flow (`api/send-quote.ts`)

1. **Env first:** `CRON_SECRET`, `RESEND_API_KEY`, `EMAIL_TO`, `EMAIL_FROM` must exist and must not be `stillneeded`. Else **500** naming what is missing. Do this before auth so a missing `CRON_SECRET` is not `Bearer undefined` (that would 401 cron itself).
2. **Auth:** `authorization` header must be exactly `Bearer ${CRON_SECRET}` → else **401**. Vercel cron sends this automatically when `CRON_SECRET` is set.
3. **Hour gate:** if Pacific hour ≠ 8 and `?force=1` is absent → **200** `{ skipped: true, reason: 'not 8am Pacific' }` so cron is not marked failed. `?force=1` still requires auth.
4. **Pick** today’s quote via `getPacificDayNumber(now)`.
5. **Send** via Resend:
   - `from`: `EMAIL_FROM`
   - `to`: `EMAIL_TO`
   - `subject`: `Quote of the day`
   - `text`: `"<quote>"\n\n— <author>`
   - `html`: Georgia, larger italic quote, author below, **inline styles** (email clients ignore classes). HTML-escape quote and author.
6. Resend failure: log and **500**. Treat **both** a thrown exception **and** `{ data, error }` as failure.
7. Success → **200** `{ sent: true, author }`.
8. Non-GET → **405**. Uncaught errors → **500** `{ error: 'Internal error' }`.

## Quote selection (`lib/pickQuote.ts`, `lib/quotes.ts`)

```ts
pickQuote(quotes, dayNumber) => quotes[dayNumber % quotes.length]
```

Throw if the list is empty.

Shape only: `{ quote: string; author: string }` (`type` or `interface`). No extra fields.

`dayNumber` is **not** day-of-month or day-of-year. It is Pacific `YYYY-MM-DD` parsed as UTC midnight (`T00:00:00Z`), divided by 86_400_000 — a monotonic day count that increments at Pacific midnight (including DST transition days).

Same Pacific date → same quote. Consecutive days walk the array in order, then wrap. No stored “already sent” state. Over 365 days, `365 % N` quotes appear one extra time; which ones depends on the start date, not “the last array entry.”

**Append** new quotes at the end of `lib/quotes.ts` and redeploy. Inserting or reordering jumps today’s index.

## Time (`lib/time.ts`)

`Intl.DateTimeFormat`, `timeZone: 'America/Los_Angeles'`. No date libraries.

- `getPacificHour(date): number` — `formatToParts`, `hourCycle: 'h23'`, 0–23.
- `getPacificDayNumber(date): number` — `en-CA` `YYYY-MM-DD` + `T00:00:00Z` / 86_400_000.

## Cron (`vercel.json`)

```json
{
  "crons": [
    { "path": "/api/send-quote", "schedule": "0 15 * * *" },
    { "path": "/api/send-quote", "schedule": "0 16 * * *" }
  ]
}
```

8am Pacific is 15:00 UTC (PDT) or 16:00 UTC (PST). Two **separate daily** jobs: Hobby crons cannot run twice per day in one expression (`0 15,16 * * *` is not allowed). The hour gate sends only once. Hobby may fire anytime in that hour (8:00–8:59), which is acceptable.

If Vercel keys crons by path and the second entry overwrites the first, split into `/api/send-quote` plus a tiny alias that calls the same handler. Only do that if duplicate paths fail.

The root URL is not a site. The only route is `/api/send-quote`.

## Env

`.env.example`:

```
RESEND_API_KEY=
CRON_SECRET=
EMAIL_TO=
EMAIL_FROM=onboarding@resend.dev
```

| Name | Role |
|---|---|
| `RESEND_API_KEY` | Resend sending key (`re_…`) |
| `CRON_SECRET` | Shared secret; generate with `openssl rand -hex 32`. Cron and `curl` tests use the same value. |
| `EMAIL_TO` | Inbox; must be the Resend account email while using the test sender |
| `EMAIL_FROM` | `onboarding@resend.dev` until a domain is verified |

Set all four on **Vercel Production**, then `npx vercel deploy --prod` so the function sees them.

## Setup (Resend + Vercel)

Already done for this project; keep for rebuilds.

1. Resend account: [https://resend.com/signup](https://resend.com/signup). Sign up with the inbox that should receive quotes.
2. API key: [https://resend.com/api-keys](https://resend.com/api-keys) — **Sending access**, copy once (`re_…`). Do not paste keys in chat; rotate if leaked.
3. Put `RESEND_API_KEY` and `EMAIL_TO` in `.env`. Leave `EMAIL_FROM=onboarding@resend.dev` until a custom domain is verified.
4. `npx vercel` / `vercel link` — create a **new** project named `quote-email` (code directory `./`, do not customize build settings).
5. Add the four Production env vars (`vercel env add … production` or dashboard).
6. `npx vercel deploy --prod`.

Later: verify a domain in Resend and change `EMAIL_FROM`.

## Commands

```bash
npm run typecheck
npx vercel deploy --prod

set -a && source .env && set +a
curl -H "Authorization: Bearer $CRON_SECRET" "https://quote-email.vercel.app/api/send-quote?force=1"
```

`vercel dev` is optional for local smoke tests. Expect `{ "sent": true, "author": "…" }` and one email. Wrong/missing bearer → 401.

## Acceptance criteria

- [x] `npm run typecheck` passes with strict mode
- [x] Wrong/missing bearer → 401
- [x] Missing env → 500 with a clear message, not a misleading 401
- [x] Outside 8am Pacific, skip 200 and send nothing (unless `?force=1`)
- [x] `?force=1` with a valid token sends today’s quote
- [x] Same Pacific date → same quote; consecutive days → consecutive quotes
- [x] Only two runtime pieces: the function and Resend

## Out of scope

Do not add a UI, database, logging service, retry queue, or multiple recipients.
