import { Resend } from 'resend';
import { pickQuote, quoteIndex } from '../lib/pickQuote.js';
import { quotes } from '../lib/quotes.js';
import {
  getPacificDateLabel,
  getPacificDayNumber,
  getPacificHour,
} from '../lib/time.js';

const REQUIRED_ENV = [
  'CRON_SECRET',
  'RESEND_API_KEY',
  'EMAIL_TO',
  'EMAIL_FROM',
] as const;

function json(body: unknown, status: number): Response {
  return Response.json(body, { status });
}

function missingEnvVars(): string[] {
  return REQUIRED_ENV.filter((name) => {
    const value = process.env[name];
    return !value || value === 'stillneeded';
  });
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

async function handleGet(request: Request): Promise<Response> {
  const missing = missingEnvVars();
  if (missing.length > 0) {
    return json(
      { error: `Missing environment variables: ${missing.join(', ')}` },
      500,
    );
  }

  const cronSecret = process.env.CRON_SECRET!;
  const expectedAuth = `Bearer ${cronSecret}`;
  if (request.headers.get('authorization') !== expectedAuth) {
    return json({ error: 'Unauthorized' }, 401);
  }

  const url = new URL(request.url);
  const force = url.searchParams.get('force') === '1';
  const now = new Date();

  if (!force && getPacificHour(now) !== 8) {
    return json({ skipped: true, reason: 'not 8am Pacific' }, 200);
  }

  const dayNumber = getPacificDayNumber(now);
  const index = quoteIndex(quotes, dayNumber);
  const quote = pickQuote(quotes, dayNumber);
  const text = `"${quote.quote}"\n\n— ${quote.author}`;
  const html = `<div style="font-family: Georgia, 'Times New Roman', serif; max-width: 560px; padding: 24px;">
  <p style="font-size: 22px; font-style: italic; line-height: 1.45; margin: 0 0 16px;">${escapeHtml(quote.quote)}</p>
  <p style="font-size: 16px; margin: 0;">— ${escapeHtml(quote.author)}</p>
</div>`;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: process.env.EMAIL_TO!,
      subject: `Quote of the day — ${getPacificDateLabel(now)}`,
      text,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return json({ error: 'Failed to send email' }, 500);
    }
  } catch (error) {
    console.error('Resend error:', error);
    return json({ error: 'Failed to send email' }, 500);
  }

  return json({ sent: true, author: quote.author, quoteIndex: index }, 200);
}

export default {
  async fetch(request: Request): Promise<Response> {
    try {
      if (request.method !== 'GET') {
        return json({ error: 'Method not allowed' }, 405);
      }
      return await handleGet(request);
    } catch (error) {
      console.error('Function error:', error);
      return json({ error: 'Internal error' }, 500);
    }
  },
};
