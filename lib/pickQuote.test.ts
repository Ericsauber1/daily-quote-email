import assert from 'node:assert/strict';
import { test } from 'node:test';
import { pickQuote, quoteIndex } from './pickQuote.js';
import { assertQuotes, quotes } from './quotes.js';
import { getPacificDayNumber } from './time.js';

test('assertQuotes accepts the real list', () => {
  assertQuotes(quotes);
});

test('assertQuotes rejects empty quote or author', () => {
  assert.throws(() => assertQuotes([{ quote: '  ', author: 'X' }]));
  assert.throws(() => assertQuotes([{ quote: 'X', author: '' }]));
  assert.throws(() => assertQuotes([]));
});

test('pickQuote walks the array then wraps', () => {
  const list = [
    { quote: 'a', author: 'A' },
    { quote: 'b', author: 'B' },
    { quote: 'c', author: 'C' },
  ];
  assert.equal(pickQuote(list, 0).author, 'A');
  assert.equal(pickQuote(list, 1).author, 'B');
  assert.equal(pickQuote(list, 2).author, 'C');
  assert.equal(pickQuote(list, 3).author, 'A');
  assert.equal(quoteIndex(list, 5), 2);
});

test('consecutive Pacific days pick consecutive quotes', () => {
  const first = getPacificDayNumber(new Date('2026-10-30T20:00:00Z'));
  const second = getPacificDayNumber(new Date('2026-10-31T20:00:00Z'));
  assert.equal(second - first, 1);
  const i0 = quoteIndex(quotes, first);
  const i1 = quoteIndex(quotes, second);
  assert.equal(i1, (i0 + 1) % quotes.length);
});
