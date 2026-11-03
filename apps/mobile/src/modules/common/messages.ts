import type { EventStatus, Locale } from '@runner/shared';

export type Lang = Locale;

// Strings used by the shared header, footer, and more than one feature module
const en = {
  brand: 'Unlimited Distances',
  languageToggle: 'عربي',
  back: 'Back',
  signIn: 'Sign in',
  contactTitle: 'Contact us',
  footer: 'All rights reserved.',
  from: 'From',
  status: {
    soon: 'Registration opens soon',
    open: 'Registration open',
    closed: 'Registration closed',
    finished: 'Event finished',
  } satisfies Record<EventStatus, string>,
};

export type CommonMessages = typeof en;

const ar: CommonMessages = {
  brand: 'مسافات بلا حدود',
  languageToggle: 'English',
  back: 'رجوع',
  signIn: 'تسجيل الدخول',
  contactTitle: 'تواصل معنا',
  footer: 'جميع الحقوق محفوظة.',
  from: 'ابتداءً من',
  status: {
    soon: 'التسجيل يفتح قريباً',
    open: 'التسجيل مفتوح',
    closed: 'التسجيل مغلق',
    finished: 'انتهت الفعالية',
  },
};

export const commonMessages: Record<Lang, CommonMessages> = { en, ar };
