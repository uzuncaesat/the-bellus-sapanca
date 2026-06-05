const DATE_KEY_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function parseDateKey(key: string): Date {
  const [year, month, day] = key.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function daysBetween(startKey: string, endKey: string): number {
  const start = parseDateKey(startKey);
  const end = parseDateKey(endKey);
  const diff = end.getTime() - start.getTime();
  return Math.round(diff / (1000 * 60 * 60 * 24));
}

export function expandDateRange(start: Date, end: Date): string[] {
  const dates: string[] = [];
  const current = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const last = new Date(end.getFullYear(), end.getMonth(), end.getDate());

  while (current < last) {
    dates.push(toDateKey(current));
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

export function isValidDateKey(key: string): boolean {
  if (!DATE_KEY_REGEX.test(key)) return false;
  const date = parseDateKey(key);
  return toDateKey(date) === key;
}

export function formatDateTr(key: string): string {
  const date = parseDateKey(key);
  return date.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function rangeIncludesBlocked(
  checkIn: string,
  checkOut: string,
  blockedSet: Set<string>
): boolean {
  const nights = expandDateRange(parseDateKey(checkIn), parseDateKey(checkOut));
  return nights.some((date) => blockedSet.has(date));
}

export function buildAirbnbBookingUrl(
  listingUrl: string,
  checkIn: string,
  checkOut: string
): string {
  const url = new URL(listingUrl);
  url.searchParams.set('check_in', checkIn);
  url.searchParams.set('check_out', checkOut);
  url.searchParams.set('guests', '1');
  return url.toString();
}
