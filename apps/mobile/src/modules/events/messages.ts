import type { Lang } from '@/modules/common';

const en = {
  date: 'Date',
  location: 'Location',
  distancesTitle: 'Distances',
  minAge: (age: number) => `Age ${age}+`,
  feesTitle: 'Registration fees',
  includesTitle: "What's included",
  registrationWindow: (opens: string, closes: string) => `Registration: ${opens} – ${closes}`,
  register: 'Register on Sajilni',
  registrationUnavailable: 'Registration is not open',
  moreOnWebsite: 'Full details on our website',
  notFound: 'Event not found.',
};

export type EventMessages = typeof en;

const ar: EventMessages = {
  date: 'التاريخ',
  location: 'الموقع',
  distancesTitle: 'المسافات',
  minAge: (age: number) => `العمر ${age}+`,
  feesTitle: 'رسوم التسجيل',
  includesTitle: 'تشمل الرسوم',
  registrationWindow: (opens: string, closes: string) => `التسجيل: ${opens} – ${closes}`,
  register: 'سجّل عبر سجلني',
  registrationUnavailable: 'التسجيل غير متاح حالياً',
  moreOnWebsite: 'التفاصيل الكاملة على موقعنا',
  notFound: 'الفعالية غير موجودة.',
};

export const eventMessages: Record<Lang, EventMessages> = { en, ar };
