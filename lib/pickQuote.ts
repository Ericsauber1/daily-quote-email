import type { Quote } from './quotes.js';

export function pickQuote(quotes: Quote[], dayNumber: number): Quote {
  if (quotes.length === 0) {
    throw new Error('Quote list is empty');
  }
  return quotes[dayNumber % quotes.length]!;
}
