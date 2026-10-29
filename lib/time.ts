const PACIFIC = 'America/Los_Angeles';

export function getPacificHour(date: Date): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: PACIFIC,
    hour: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(date);
  const hour = parts.find((part) => part.type === 'hour')?.value;
  if (hour === undefined) {
    throw new Error('Could not determine Pacific hour');
  }
  return Number(hour);
}

export function getPacificDayNumber(date: Date): number {
  const ymd = new Intl.DateTimeFormat('en-CA', {
    timeZone: PACIFIC,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
  return Math.floor(Date.parse(`${ymd}T00:00:00Z`) / 86_400_000);
}
