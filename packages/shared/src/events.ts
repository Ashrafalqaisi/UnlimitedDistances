import type { Locale } from './locale';

export type Localized = Record<Locale, string>;

export interface RaceDistance {
  name: Localized;
  startsAt: string; // ISO 8601 with offset
  minAge?: number;
}

export interface FeeTable {
  appliesTo: Localized;
  rows: { label: Localized; amount: number }[];
}

// Event content comes from maasafatmarathon.com. Replace with GET /api/v1/events once the events module exists.
export interface EventSummary {
  slug: string;
  title: Localized;
  tagline: Localized;
  location: Localized;
  startsAt: string; // ISO 8601 with offset
  registrationOpensAt: string;
  registrationClosesAt: string;
  distances: RaceDistance[];
  currency: string;
  fees: FeeTable[];
  includes: Localized[];
  registerUrl: string;
  websiteUrl: string;
}

export interface PastEdition {
  slug: string;
  title: Localized;
}

const RUM_FEE_ROWS = (prices: [number, number, number, number, number, number]) => {
  const labels: Localized[] = [
    { en: 'Jordanian or resident', ar: 'أردني أو مقيم' },
    { en: 'Companion (Jordanian or resident)', ar: 'مرافق (أردني أو مقيم)' },
    { en: 'Non-resident', ar: 'غير مقيم' },
    { en: 'Companion (non-resident)', ar: 'مرافق (غير مقيم)' },
    { en: 'Race only, Jordanian or resident', ar: 'السباق فقط، أردني أو مقيم' },
    { en: 'Race only, non-resident', ar: 'السباق فقط، غير مقيم' },
  ];
  return labels.map((label, i) => ({ label, amount: prices[i] }));
};

const EVENTS: EventSummary[] = [
  {
    slug: 'rum-international-marathon',
    title: { en: '11th Rum International Marathon', ar: 'ماراثون رم الدولي الحادي عشر' },
    tagline: {
      en: 'Run for the Spirit, Pace for the Adventure',
      ar: 'اركض من أجل الروح، وانطلق نحو المغامرة',
    },
    location: { en: 'Wadi Rum', ar: 'وادي رم' },
    startsAt: '2025-10-31T06:00:00+03:00',
    registrationOpensAt: '2025-05-01T00:00:00+03:00',
    registrationClosesAt: '2025-10-22T23:59:00+03:00',
    distances: [
      { name: { en: '84 km individual (2 days)', ar: '84 كم فردي (يومان)' }, startsAt: '2025-10-31T06:00:00+03:00', minAge: 18 },
      { name: { en: '84 km relay (pairs)', ar: '84 كم تتابع (فريق من شخصين)' }, startsAt: '2025-10-31T06:00:00+03:00', minAge: 18 },
      { name: { en: '22 km', ar: '22 كم' }, startsAt: '2025-11-01T06:30:00+03:00', minAge: 18 },
      { name: { en: '10 km fun run', ar: '10 كم للمتعة' }, startsAt: '2025-11-01T06:30:00+03:00', minAge: 13 },
    ],
    currency: 'JOD',
    fees: [
      { appliesTo: { en: '84 km and relay', ar: '84 كم والتتابع' }, rows: RUM_FEE_ROWS([180, 130, 285, 215, 80, 110]) },
      { appliesTo: { en: '22 km and 10 km', ar: '22 كم و10 كم' }, rows: RUM_FEE_ROWS([100, 80, 150, 100, 40, 60]) },
    ],
    includes: [
      { en: 'Bus transport from Amman and back', ar: 'المواصلات من عمّان والعودة' },
      {
        en: 'Camp accommodation in Wadi Rum with meals (two nights for 84 km)',
        ar: 'الإقامة في مخيم بوادي رم مع الوجبات (ليلتان لسباق 84 كم)',
      },
      { en: 'T-shirt, bib number and medal', ar: 'قميص ورقم السباق وميدالية' },
    ],
    registerUrl: 'https://www.sajilni.com/event/11th-rum-international-marathon',
    websiteUrl: 'https://maasafatmarathon.com/rum-international-marathon/',
  },
  {
    slug: 'jordan-eco-trail',
    title: { en: '4th Jordan Eco Trail Run', ar: 'سباق الأردن البيئي الرابع' },
    tagline: { en: 'Me, My Health and Nature', ar: 'أنا وصحتي والطبيعة' },
    location: { en: 'Wasfi Al Tal Forest', ar: 'غابات الشهيد وصفي التل' },
    startsAt: '2025-06-27T07:15:00+03:00',
    registrationOpensAt: '2025-04-10T00:00:00+03:00',
    registrationClosesAt: '2025-06-23T23:59:00+03:00',
    distances: [
      { name: { en: '20 km', ar: '20 كم' }, startsAt: '2025-06-27T07:15:00+03:00' },
      { name: { en: '10 km', ar: '10 كم' }, startsAt: '2025-06-27T07:15:00+03:00' },
      { name: { en: '5 km walk', ar: '5 كم مشي' }, startsAt: '2025-06-27T07:30:00+03:00' },
    ],
    currency: 'JOD',
    fees: [
      {
        appliesTo: { en: 'All distances', ar: 'جميع المسافات' },
        rows: [
          { label: { en: '20 km', ar: '20 كم' }, amount: 15 },
          { label: { en: '10 km', ar: '10 كم' }, amount: 15 },
          { label: { en: '5 km walk', ar: '5 كم مشي' }, amount: 10 },
        ],
      },
    ],
    includes: [
      { en: 'T-shirt, bib number and medal', ar: 'قميص ورقم السباق وميدالية' },
      {
        en: 'Free buses from King Hussein Park and back',
        ar: 'حافلات مجانية من حدائق الملك حسين والعودة',
      },
    ],
    registerUrl: 'https://www.sajilni.com',
    websiteUrl: 'https://maasafatmarathon.com/jordan-eco-trail/',
  },
];

export const PAST_EDITIONS: PastEdition[] = [
  { slug: 'rum-marathon-10th', title: { en: '10th International Rum Marathon', ar: 'ماراثون رم الدولي العاشر' } },
  { slug: 'rum-marathon-9th', title: { en: '9th International Rum Marathon', ar: 'ماراثون رم الدولي التاسع' } },
  { slug: 'eco-trail-4th', title: { en: '4th Jordan Eco Trail Run', ar: 'سباق الأردن البيئي الرابع' } },
];

export const ORGANIZER = {
  name: { en: 'Unlimited Distances', ar: 'مسافات بلا حدود' } satisfies Localized,
  phones: ['+962795632241', '+962796784556'],
  email: 'masafat_official@maasafatmarathon.com',
  website: 'https://maasafatmarathon.com',
  social: {
    facebook: 'https://www.facebook.com/UnlimitedDistances',
    instagram: 'https://www.instagram.com/unlimited_distances',
    linkedin: 'https://www.linkedin.com/company/unlimitedsistances',
  },
};

export type EventStatus = 'soon' | 'open' | 'closed' | 'finished';

export function getEvents(): EventSummary[] {
  return [...EVENTS].sort((a, b) => b.startsAt.localeCompare(a.startsAt));
}

export function getEvent(slug: string): EventSummary | undefined {
  return EVENTS.find((event) => event.slug === slug);
}

export function getUpcomingEvents(limit = 3): EventSummary[] {
  const now = Date.now();
  return EVENTS.filter((event) => new Date(event.startsAt).getTime() > now)
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt))
    .slice(0, limit);
}

export function getEventStatus(event: EventSummary, now = Date.now()): EventStatus {
  if (now < new Date(event.registrationOpensAt).getTime()) return 'soon';
  if (now <= new Date(event.registrationClosesAt).getTime()) return 'open';
  if (now < new Date(event.startsAt).getTime()) return 'closed';
  return 'finished';
}

export function lowestFee(event: EventSummary): number {
  return Math.min(...event.fees.flatMap((table) => table.rows.map((row) => row.amount)));
}

export function localizeEvent(event: EventSummary, locale: Locale) {
  return {
    title: event.title[locale],
    tagline: event.tagline[locale],
    city: event.location[locale],
  };
}

const dateLocale = (locale: Locale) => (locale === 'ar' ? 'ar-JO' : 'en-GB');

export function formatEventDate(iso: string, locale: Locale) {
  return new Intl.DateTimeFormat(dateLocale(locale), {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Amman',
  }).format(new Date(iso));
}

export function formatDay(iso: string, locale: Locale) {
  return new Intl.DateTimeFormat(dateLocale(locale), {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Amman',
  }).format(new Date(iso));
}

export function formatTime(iso: string, locale: Locale) {
  return new Intl.DateTimeFormat(dateLocale(locale), {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'Asia/Amman',
  }).format(new Date(iso));
}

export function formatPrice(amount: number, currency: string, locale: Locale) {
  return new Intl.NumberFormat(locale === 'ar' ? 'ar-JO' : 'en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
