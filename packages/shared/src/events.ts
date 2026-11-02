import type { Locale } from './locale';

// Placeholder data. Replace with a call to GET /api/v1/events?status=PUBLISHED once the events module exists.
export interface EventSummary {
  slug: string;
  titleEn: string;
  titleAr: string;
  cityEn: string;
  cityAr: string;
  startsAt: string; // ISO 8601 with offset
  priceFrom: number;
  currency: string;
}

const SAMPLE_EVENTS: EventSummary[] = [
  {
    slug: 'amman-marathon-2027',
    titleEn: 'Amman Marathon 2027',
    titleAr: 'ماراثون عمّان 2027',
    cityEn: 'Amman',
    cityAr: 'عمّان',
    startsAt: '2027-03-12T06:00:00+03:00',
    priceFrom: 25,
    currency: 'USD',
  },
  {
    slug: 'dead-sea-10k-2027',
    titleEn: 'Dead Sea 10K',
    titleAr: 'سباق البحر الميت 10 كم',
    cityEn: 'Dead Sea',
    cityAr: 'البحر الميت',
    startsAt: '2027-02-05T07:00:00+03:00',
    priceFrom: 15,
    currency: 'USD',
  },
  {
    slug: 'petra-half-marathon-2027',
    titleEn: 'Petra Half Marathon',
    titleAr: 'نصف ماراثون البتراء',
    cityEn: 'Wadi Musa',
    cityAr: 'وادي موسى',
    startsAt: '2027-04-23T06:30:00+03:00',
    priceFrom: 30,
    currency: 'USD',
  },
];

export function getUpcomingEvents(limit = 3): EventSummary[] {
  const now = Date.now();
  return SAMPLE_EVENTS.filter((event) => new Date(event.startsAt).getTime() > now)
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt))
    .slice(0, limit);
}

export function localizeEvent(event: EventSummary, locale: Locale) {
  return {
    title: locale === 'ar' ? event.titleAr : event.titleEn,
    city: locale === 'ar' ? event.cityAr : event.cityEn,
  };
}

export function formatEventDate(iso: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-JO' : 'en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Amman',
  }).format(new Date(iso));
}

export function formatPrice(amount: number, currency: string, locale: Locale) {
  return new Intl.NumberFormat(locale === 'ar' ? 'ar-JO' : 'en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}
