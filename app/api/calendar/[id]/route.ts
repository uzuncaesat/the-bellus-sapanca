import { NextResponse } from 'next/server';
import ical from 'node-ical';
import { getAirbnbConfig, isVillaId } from '@/lib/airbnb-config';
import { expandDateRange, toDateKey } from '@/lib/calendar-utils';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 300;

interface CalendarResponse {
  blockedDates: string[];
  lastSynced: string;
  source: 'airbnb' | 'unavailable';
  listingUrl: string | null;
}

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!isVillaId(id)) {
    return NextResponse.json(
      { error: 'Geçersiz villa kimliği' },
      { status: 400 }
    );
  }

  const config = getAirbnbConfig(id);

  if (!config) {
    const empty: CalendarResponse = {
      blockedDates: [],
      lastSynced: new Date().toISOString(),
      source: 'unavailable',
      listingUrl: null,
    };
    return NextResponse.json(empty, {
      headers: { 'Cache-Control': 'public, s-maxage=300' },
    });
  }

  try {
    const res = await fetch(config.icalUrl, {
      next: { revalidate },
      headers: { 'User-Agent': 'TheBellusSapanca/1.0 (+calendar-sync)' },
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
    const blockedDates = Array.from(blocked)
      .filter((d) => d >= today)
      .sort();

    const payload: CalendarResponse = {
      blockedDates,
      lastSynced: new Date().toISOString(),
      source: 'airbnb',
      listingUrl: config.listingUrl,
    };

    return NextResponse.json(payload, {
      headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600' },
    });
  } catch (error) {
    const fallback: CalendarResponse = {
      blockedDates: [],
      lastSynced: new Date().toISOString(),
      source: 'unavailable',
      listingUrl: config.listingUrl,
    };
    return NextResponse.json(fallback, {
      status: 200,
      headers: { 'Cache-Control': 'public, s-maxage=120' },
    });
  }
}
