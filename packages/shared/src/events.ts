import type { Locale } from './locale';

export type Localized = Record<Locale, string>;

export interface RaceDistance {
  name: Localized;
  /** How the distance is split, for example per day or per relay runner. */
  details?: Localized;
  startsAt: string; // ISO 8601 with offset
  minAge?: number;
}

export interface FeeTable {
  appliesTo: Localized;
  /** amount is in the event currency; amountUsd is the published US dollar price, when there is one. */
  rows: { label: Localized; amount: number; amountUsd?: number }[];
}

/** Timeline for one group of distances: gathering, buses, start and course closing. */
export interface EventProgramme {
  appliesTo: Localized;
  items: { at: string; label: Localized }[]; // at: ISO 8601 with offset, in time order
}

export interface EquipmentList {
  appliesTo: Localized;
  mandatory: Localized[];
  optional: Localized[];
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
  programmes?: EventProgramme[];
  equipment?: EquipmentList;
  /** Rules with their penalties, in the order the organizer publishes them. */
  rules?: Localized[];
  registerUrl: string;
  websiteUrl: string;
}

export interface PastEdition {
  slug: string;
  title: Localized;
}

type SixPrices = [number, number, number, number, number, number];
type SixUsdPrices = [number?, number?, number?, number?, number?, number?];

const RUM_FEE_ROWS = (prices: SixPrices, usd: SixUsdPrices = []) => {
  const labels: Localized[] = [
    { en: 'Jordanian or resident', ar: 'أردني أو مقيم' },
    { en: 'Companion (Jordanian or resident)', ar: 'مرافق (أردني أو مقيم)' },
    { en: 'Non-resident', ar: 'غير مقيم' },
    { en: 'Companion (non-resident)', ar: 'مرافق (غير مقيم)' },
    { en: 'Race only, Jordanian or resident', ar: 'السباق فقط، أردني أو مقيم' },
    { en: 'Race only, non-resident', ar: 'السباق فقط، غير مقيم' },
  ];
  return labels.map((label, i) => ({ label, amount: prices[i], amountUsd: usd[i] }));
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
      {
        name: { en: '84 km individual (2 days)', ar: '84 كم فردي (يومان)' },
        details: { en: 'Day 1: 62 km · Day 2: 22 km', ar: 'اليوم الأول: 62 كم · اليوم الثاني: 22 كم' },
        startsAt: '2025-10-31T06:00:00+03:00',
        minAge: 18,
      },
      {
        name: { en: '84 km relay (pairs, 2 days)', ar: '84 كم تتابع (فريق من شخصين، يومان)' },
        details: {
          en: 'Day 1: 31 km per runner · Day 2: 11 km per runner',
          ar: 'اليوم الأول: 31 كم لكل عدّاء · اليوم الثاني: 11 كم لكل عدّاء',
        },
        startsAt: '2025-10-31T06:00:00+03:00',
        minAge: 18,
      },
      { name: { en: '22 km individual', ar: '22 كم فردي' }, startsAt: '2025-11-01T06:30:00+03:00', minAge: 18 },
      { name: { en: '10 km fun run', ar: '10 كم للمتعة' }, startsAt: '2025-11-01T06:30:00+03:00', minAge: 13 },
    ],
    currency: 'JOD',
    fees: [
      {
        appliesTo: { en: '84 km and relay (per person)', ar: '84 كم والتتابع (للشخص الواحد)' },
        rows: RUM_FEE_ROWS([180, 130, 285, 215, 80, 110], [255, 184, 400, 300, undefined, 150]),
      },
      { appliesTo: { en: '22 km and 10 km', ar: '22 كم و10 كم' }, rows: RUM_FEE_ROWS([100, 80, 150, 100, 40, 60]) },
    ],
    includes: [
      { en: 'Bus transport from Amman and back', ar: 'المواصلات من عمّان والعودة' },
      {
        en: 'Overnight stay in Wadi Rum with all meals (two nights for 84 km)',
        ar: 'المبيت في وادي رم مع جميع الوجبات (ليلتان لسباق 84 كم)',
      },
      { en: 'T-shirt, bib number and medal', ar: 'قميص ورقم السباق وميدالية' },
      {
        en: '"Race only" fees cover the race entry without transport or accommodation',
        ar: 'رسوم "السباق فقط" تشمل المشاركة في السباق دون المواصلات أو الإقامة',
      },
    ],
    programmes: [
      {
        appliesTo: { en: '84 km individual and relay', ar: '84 كم فردي وتتابع' },
        items: [
          {
            at: '2025-10-30T11:00:00+03:00',
            label: { en: 'Gathering at Cozmo, 7th Circle, Amman', ar: 'التجمع عند كوزمو، الدوار السابع، عمّان' },
          },
          { at: '2025-10-30T12:00:00+03:00', label: { en: 'Buses leave for Wadi Rum', ar: 'انطلاق الحافلات إلى وادي رم' } },
          {
            at: '2025-10-31T06:00:00+03:00',
            label: { en: 'Day 1 start: 84 km individual and relay', ar: 'انطلاق اليوم الأول: 84 كم فردي وتتابع' },
          },
          { at: '2025-10-31T18:00:00+03:00', label: { en: 'Course closes', ar: 'إغلاق المسار' } },
          {
            at: '2025-11-01T06:30:00+03:00',
            label: { en: 'Day 2 start: 84 km relay', ar: 'انطلاق اليوم الثاني: 84 كم تتابع' },
          },
          { at: '2025-11-01T10:00:00+03:00', label: { en: 'Course closes', ar: 'إغلاق المسار' } },
        ],
      },
      {
        appliesTo: { en: '22 km individual and 10 km fun run', ar: '22 كم فردي و10 كم للمتعة' },
        items: [
          {
            at: '2025-10-31T09:00:00+03:00',
            label: { en: 'Gathering at Cozmo, 7th Circle, Amman', ar: 'التجمع عند كوزمو، الدوار السابع، عمّان' },
          },
          {
            at: '2025-10-31T10:00:00+03:00',
            label: { en: 'Buses leave for Wadi Rum / Disi', ar: 'انطلاق الحافلات إلى وادي رم / الديسة' },
          },
          { at: '2025-11-01T06:30:00+03:00', label: { en: 'Start: 22 km and 10 km', ar: 'الانطلاق: 22 كم و10 كم' } },
          { at: '2025-11-01T10:00:00+03:00', label: { en: 'Course closes', ar: 'إغلاق المسار' } },
        ],
      },
    ],
    equipment: {
      appliesTo: { en: '84 km runners must bring', ar: 'على عدّائي 84 كم إحضار' },
      mandatory: [
        { en: 'Backpack', ar: 'حقيبة ظهر' },
        { en: '1 litre of water (two 500 ml bottles)', ar: 'لتر واحد من الماء (عبوتان سعة 500 مل)' },
        { en: 'Head torch', ar: 'مصباح رأس' },
        { en: 'Whistle', ar: 'صافرة' },
        { en: 'Cap', ar: 'قبعة' },
        { en: 'Mobile phone', ar: 'هاتف محمول' },
        { en: 'Reflective material', ar: 'مادة عاكسة للضوء' },
        { en: 'First-aid kit', ar: 'حقيبة إسعافات أولية' },
        { en: 'One aluminium survival blanket', ar: 'بطانية نجاة من الألمنيوم' },
      ],
      optional: [
        { en: 'Mobile internet', ar: 'إنترنت على الهاتف' },
        { en: 'Energy bars or gels', ar: 'ألواح أو جل الطاقة' },
      ],
    },
    rules: [
      {
        en: 'Exclusion for any participant who does not present a medical report and ECG at the inspection.',
        ar: 'يُستبعد أي مشارك لا يقدّم التقرير الطبي وتخطيط القلب عند الفحص.',
      },
      {
        en: 'Exclusion for any participant missing any of the mandatory equipment.',
        ar: 'يُستبعد أي مشارك لا يحضر أياً من المعدات الإلزامية.',
      },
      {
        en: 'Two-hour penalty for receiving assistance from outside the race, such as food or drink.',
        ar: 'عقوبة ساعتين لمن يتلقى مساعدة من خارج السباق، مثل الطعام أو الشراب.',
      },
      {
        en: 'One-hour penalty for throwing litter on the course.',
        ar: 'عقوبة ساعة واحدة لمن يرمي النفايات على مسار السباق.',
      },
      {
        en: 'Exclusion for not reaching each station within the cut-off time announced at the pre-race briefing.',
        ar: 'يُستبعد من لا يصل إلى كل محطة ضمن الوقت المحدد الذي يُعلن في اجتماع ما قبل السباق.',
      },
      {
        en: 'Exclusion for accepting transport of any kind during the race.',
        ar: 'يُستبعد أي مشارك يتلقى مساعدة في التنقل بأي وسيلة.',
      },
      {
        en: 'If you lose the track and cannot find your way back, contact us and stay where you are until we reach you.',
        ar: 'إذا فقدت المسار ولم تتمكن من العودة، تواصل معنا وابقَ في مكانك حتى نصل إليك.',
      },
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

/** Splits a programme's items into calendar days in Amman time, keeping their order. */
export function groupProgrammeByDay(programme: EventProgramme) {
  const dayKey = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Amman' });
  const days: { day: string; items: EventProgramme['items'] }[] = [];
  for (const item of programme.items) {
    const key = dayKey.format(new Date(item.at));
    const last = days[days.length - 1];
    if (last && dayKey.format(new Date(last.day)) === key) last.items.push(item);
    else days.push({ day: item.at, items: [item] });
  }
  return days;
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
