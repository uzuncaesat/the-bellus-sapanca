import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const EXPECTED_KEYS = [
  'AIRBNB_ICAL_URL_VILLA_1',
  'AIRBNB_ICAL_URL_VILLA_2',
  'AIRBNB_ICAL_URL_VILLA_3',
  'AIRBNB_LISTING_URL_VILLA_1',
  'AIRBNB_LISTING_URL_VILLA_2',
  'AIRBNB_LISTING_URL_VILLA_3',
];

export async function GET() {
  const expected: Record<string, { present: boolean; length: number }> = {};
  for (const key of EXPECTED_KEYS) {
    const value = process.env[key];
    expected[key] = {
      present: typeof value === 'string' && value.length > 0,
      length: value ? value.length : 0,
    };
  }

  const airbnbKeys = Object.keys(process.env)
    .filter((k) => k.toUpperCase().includes('AIRBNB'))
    .sort();

  return NextResponse.json(
    {
      expected,
      airbnbKeysFoundInRuntime: airbnbKeys,
    },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}
