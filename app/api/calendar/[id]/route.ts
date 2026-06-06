import { NextResponse } from 'next/server';
import { getAirbnbConfig, isVillaId } from '@/lib/airbnb-config';
import { fetchBlockedDates } from '@/lib/airbnb-calendar';

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
    const blockedDates = await fetchBlockedDates(config.icalUrl);

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
