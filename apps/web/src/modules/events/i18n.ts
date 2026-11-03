import type { EventStatus } from '@runner/shared';
import type { Locale } from '@/modules/common';

// Plain strings only, so the dictionary can be passed to client components later.
// "{age}", "{opens}" and "{closes}" placeholders are filled in by the page.
const en = {
  metaSuffix: 'Unlimited Distances',
  date: 'Date',
  location: 'Location',
  registration: 'Registration',
  distancesTitle: 'Distances',
  minAge: 'Age {age}+',
  programmeTitle: 'Programme',
  feesTitle: 'Registration fees',
  feeCategory: 'Category',
  feeJod: 'JOD',
  feeUsd: 'USD',
  includesTitle: 'Fees include',
  equipmentTitle: 'Equipment',
  mandatory: 'Mandatory',
  optional: 'Optional',
  rulesTitle: 'Rules and penalties',
  registrationWindow: 'Registration: {opens} – {closes}',
  register: 'Register on Sajilni',
  registrationUnavailable: 'Registration is not open',
  moreOnWebsite: 'Full details on our website',
  backToRaces: 'All races',
  status: {
    soon: 'Registration opens soon',
    open: 'Registration open',
    closed: 'Registration closed',
    finished: 'Event finished',
  } satisfies Record<EventStatus, string>,
};

export type EventDictionary = typeof en;

const ar: EventDictionary = {
  metaSuffix: 'مسافات بلا حدود',
  date: 'التاريخ',
  location: 'الموقع',
  registration: 'التسجيل',
  distancesTitle: 'المسافات',
  minAge: 'العمر {age}+',
  programmeTitle: 'البرنامج',
  feesTitle: 'رسوم التسجيل',
  feeCategory: 'الفئة',
  feeJod: 'دينار',
  feeUsd: 'دولار',
  includesTitle: 'تشمل الرسوم',
  equipmentTitle: 'المعدات',
  mandatory: 'إلزامية',
  optional: 'اختيارية',
  rulesTitle: 'القوانين والعقوبات',
  registrationWindow: 'التسجيل: {opens} – {closes}',
  register: 'سجّل عبر سجلني',
  registrationUnavailable: 'التسجيل غير متاح حالياً',
  moreOnWebsite: 'التفاصيل الكاملة على موقعنا',
  backToRaces: 'جميع السباقات',
  status: {
    soon: 'التسجيل يفتح قريباً',
    open: 'التسجيل مفتوح',
    closed: 'التسجيل مغلق',
    finished: 'انتهت الفعالية',
  },
};

const dictionaries: Record<Locale, EventDictionary> = { en, ar };

export function getEventDictionary(locale: Locale): EventDictionary {
  return dictionaries[locale];
}
