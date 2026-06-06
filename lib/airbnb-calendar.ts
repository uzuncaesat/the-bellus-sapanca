import ical from 'node-ical';
import { expandDateRange, toDateKey } from './calendar-utils';

const FETCH_TIMEOUT_MS = 8000;

export async function fetchBlockedDates(icalUrl: string): Promise<string[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(icalUrl, {
      next: { revalidate: 300 },
      headers: { 'User-Agent': 'TheBellusSapanca/1.0 (+calendar-sync)' },
      signal: controller.signal,
    });

    if (!res.ok) {
      throw new Error(`iCal fetch failed: ${res.status}`);
    }

    const icsText = await res.text();
    const parsed = ical.sync.parseICS(icsText);

    const blocked = new Set<string>();

    for (const key of Object.keys(parsed)) {
      const event = parsed[key];
      if (!event || event.type !== 'VEVENT') continue;
      if (!event.start || !event.end) continue;

      const start = new Date(event.start as unknown as string);
      const end = new Date(event.end as unknown as string);

      for (const day of expandDateRange(start, end)) {
        blocked.add(day);
      }
    }

    const today = toDateKey(new Date());
    return Array.from(blocked)
      .filter((d) => d >= today)
      .sort();
  } finally {
    clearTimeout(timeout);
  }
}
