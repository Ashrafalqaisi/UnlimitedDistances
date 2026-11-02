import type { EventStatus, Locale } from '@runner/shared';

export { defaultLocale, isLocale, locales, textDirection, type Locale } from '@runner/shared';

const en = {
  meta: {
    title: 'Unlimited Distances: desert marathons and trail runs in Jordan',
    description:
      'Unlimited Distances organizes the Rum International Marathon and the Jordan Eco Trail Run. Explore the adventure.',
  },
  nav: {
    brand: 'Unlimited Distances',
    races: 'Races',
    why: 'Why participate',
    previous: 'Previous events',
    contact: 'Contact us',
  },
  hero: {
    eyebrow: 'Organizing sports in Jordan',
    title: 'Explore the adventure',
    subtitle:
      'Desert marathons and forest trail runs across Jordan, from Wadi Rum to Wasfi Al Tal Forest.',
    primaryCta: 'Join now',
    secondaryCta: 'Contact us',
    highlights: [
      { value: '+2500', label: 'Participants' },
      { value: '84 km', label: 'Longest track' },
      { value: '2', label: 'Race series' },
    ],
  },
  events: {
    eyebrow: 'Our signature events',
    title: 'Unlimited distance races',
    from: 'From',
    details: 'Race details',
    status: {
      soon: 'Registration opens soon',
      open: 'Registration open',
      closed: 'Registration closed',
      finished: 'Event finished',
    } satisfies Record<EventStatus, string>,
  },
  why: {
    title: 'Why participate',
    items: ['Be healthy', 'Stay strong', 'Be the fastest', 'Be one of our participants'],
  },
  previous: {
    title: 'Previous events',
  },
  cta: {
    title: 'Run and discover yourself',
    quote: 'Running is a way of life.',
    author: 'Coach Mohammad Al Swaiti, founder',
    button: 'Email us',
  },
  footer: {
    rights: 'All rights reserved.',
    contact: 'Contact us',
  },
};

export type Dictionary = typeof en;

const ar: Dictionary = {
  meta: {
    title: 'مسافات بلا حدود: ماراثونات صحراوية وسباقات جري في الأردن',
    description: 'تنظّم مسافات بلا حدود ماراثون رم الدولي وسباق الأردن البيئي. استكشف المغامرة.',
  },
  nav: {
    brand: 'مسافات بلا حدود',
    races: 'السباقات',
    why: 'لماذا تشارك',
    previous: 'فعاليات سابقة',
    contact: 'تواصل معنا',
  },
  hero: {
    eyebrow: 'تنظيم الفعاليات الرياضية في الأردن',
    title: 'استكشف المغامرة',
    subtitle: 'ماراثونات صحراوية وسباقات جري في الغابات في أنحاء الأردن، من وادي رم إلى غابات وصفي التل.',
    primaryCta: 'انضم الآن',
    secondaryCta: 'تواصل معنا',
    highlights: [
      { value: '+2500', label: 'مشارك' },
      { value: '84 كم', label: 'أطول مسار' },
      { value: '2', label: 'سلسلة سباقات' },
    ],
  },
  events: {
    eyebrow: 'فعالياتنا الرئيسية',
    title: 'سباقات مسافات بلا حدود',
    from: 'ابتداءً من',
    details: 'تفاصيل السباق',
    status: {
      soon: 'التسجيل يفتح قريباً',
      open: 'التسجيل مفتوح',
      closed: 'التسجيل مغلق',
      finished: 'انتهت الفعالية',
    },
  },
  why: {
    title: 'لماذا تشارك',
    items: ['كن بصحة جيدة', 'ابقَ قوياً', 'كن الأسرع', 'كن أحد مشاركينا'],
  },
  previous: {
    title: 'فعاليات سابقة',
  },
  cta: {
    title: 'اركض واكتشف نفسك',
    quote: 'الجري أسلوب حياة.',
    author: 'المدرب محمد السويطي، المؤسس',
    button: 'راسلنا',
  },
  footer: {
    rights: 'جميع الحقوق محفوظة.',
    contact: 'تواصل معنا',
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, ar };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
