import type { Locale } from '@runner/shared';

export { defaultLocale, isLocale, locales, textDirection, type Locale } from '@runner/shared';

// Strings for the shared header, footer and page metadata
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
    signIn: 'Sign in',
  },
  footer: {
    rights: 'All rights reserved.',
    contact: 'Contact us',
  },
};

export type CommonDictionary = typeof en;

const ar: CommonDictionary = {
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
    signIn: 'تسجيل الدخول',
  },
  footer: {
    rights: 'جميع الحقوق محفوظة.',
    contact: 'تواصل معنا',
  },
};

const dictionaries: Record<Locale, CommonDictionary> = { en, ar };

export function getCommonDictionary(locale: Locale): CommonDictionary {
  return dictionaries[locale];
}
