import { assertQuotes, type Quote } from './quotes.js';

export function quoteIndex(quotes: Quote[], dayNumber: number): number {
  assertQuotes(quotes);
  return dayNumber % quotes.length;
}

export function pickQuote(quotes: Quote[], dayNumber: number): Quote {
  return quotes[quoteIndex(quotes, dayNumber)]!;
}
