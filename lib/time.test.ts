import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  getPacificDateLabel,
  getPacificDayNumber,
  getPacificHour,
} from './time.js';

test('Pacific day number increments across a DST fall-back', () => {
  const halloween = getPacificDayNumber(new Date('2026-10-31T20:00:00Z'));
  const nov1 = getPacificDayNumber(new Date('2026-11-01T20:00:00Z'));
  assert.equal(nov1 - halloween, 1);
});

test('getPacificHour uses h23 in Los Angeles', () => {
  const hour = getPacificHour(new Date('2026-10-30T15:00:00Z'));
  assert.equal(hour, 8);
});

test('getPacificDateLabel is a short Pacific calendar date', () => {
  const label = getPacificDateLabel(new Date('2026-10-30T15:00:00Z'));
  assert.match(label, /Oct/);
  assert.match(label, /30/);
});
