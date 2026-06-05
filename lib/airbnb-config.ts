import { VillaId, VILLA_IDS } from './constants';

export interface AirbnbVillaConfig {
  icalUrl: string;
  listingUrl: string;
}

const ENV_KEYS: Record<VillaId, { ical: string; listing: string }> = {
  'villa-1': {
    ical: 'AIRBNB_ICAL_URL_VILLA_1',
    listing: 'AIRBNB_LISTING_URL_VILLA_1',
  },
  'villa-2': {
    ical: 'AIRBNB_ICAL_URL_VILLA_2',
    listing: 'AIRBNB_LISTING_URL_VILLA_2',
  },
  'villa-3': {
    ical: 'AIRBNB_ICAL_URL_VILLA_3',
    listing: 'AIRBNB_LISTING_URL_VILLA_3',
  },
};

export function isVillaId(id: string): id is VillaId {
  return (VILLA_IDS as readonly string[]).includes(id);
}

export function getAirbnbConfig(villaId: VillaId): AirbnbVillaConfig | null {
  const keys = ENV_KEYS[villaId];
  const icalUrl = process.env[keys.ical];
  const listingUrl = process.env[keys.listing];

  if (!icalUrl || !listingUrl) {
    return null;
  }

  return { icalUrl, listingUrl };
}

export function getAirbnbListingUrl(villaId: VillaId): string | null {
  return getAirbnbConfig(villaId)?.listingUrl ?? null;
}
