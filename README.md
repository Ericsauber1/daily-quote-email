# daily-quote-email

A Vercel cron function that emails an inspirational quote every morning at 8am Pacific. There is no frontend or database. Resend is the only outside service.

**All product, architecture, and setup detail lives in** [`AGENTS.md`](./AGENTS.md)**.**

## Deploy

GitHub is [Ericsauber1/daily-quote-email](https://github.com/Ericsauber1/daily-quote-email). Pushing does **not** update production. Commit on `main` locally (do not merge PRs on github.com — Hobby blocks those authors), then:

```bash
npx vercel login
npm run deploy
git push
```

`npx vercel login` is only needed once (or if the CLI session expires). `npm run deploy` typechecks, tests, then `vercel --prod`. This folder is already linked to `esaubers-projects/quote-email`.

Use the linked project `esaubers-projects/quote-email` (code directory `./`). Do not link this folder to another Vercel app.

After deploy, production is `https://quote-email.vercel.app`. Cron only runs on that production deployment.

**Quotes / code:** append in `lib/quotes.ts` (or other files), then the commands above. Inserting or reordering quotes jumps today’s pick.

**Env vars:** set `RESEND_API_KEY`, `CRON_SECRET`, `EMAIL_TO`, and `EMAIL_FROM` in Vercel → Project → Settings → Environment Variables → **Production**, then `npx vercel --prod` so the function picks them up. Do not commit `.env`.

**Smoke test:**

```bash
set -a && source .env && set +a
curl -H "Authorization: Bearer $CRON_SECRET" "https://quote-email.vercel.app/api/send-quote?force=1"
```

Expect `{ "sent": true, "author": "…", "quoteIndex": 0 }`. Wrong or missing bearer → 401.
