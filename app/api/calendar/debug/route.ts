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

  const allKeys = Object.keys(process.env);
  const vercelKeys = allKeys.filter((k) => k.startsWith('VERCEL')).sort();

  return NextResponse.json(
    {
      marker: 'debug-v2',
      vercelEnv: process.env.VERCEL_ENV ?? null,
      commitSha: process.env.VERCEL_GIT_COMMIT_SHA ?? null,
      region: process.env.VERCEL_REGION ?? null,
      totalEnvKeyCount: allKeys.length,
      vercelSystemKeys: vercelKeys,
      expected,
      airbnbKeysFoundInRuntime: airbnbKeys,
    },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}
