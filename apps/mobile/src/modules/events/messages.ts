import type { Lang } from '@/modules/common';

const en = {
  date: 'Date',
  location: 'Location',
  distancesTitle: 'Distances',
  minAge: (age: number) => `Age ${age}+`,
  programmeTitle: 'Programme',
  feesTitle: 'Registration fees',
  includesTitle: 'Fees include',
  equipmentTitle: 'Equipment',
  mandatory: 'Mandatory',
  optional: 'Optional',
  rulesTitle: 'Rules and penalties',
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
  programmeTitle: 'البرنامج',
  feesTitle: 'رسوم التسجيل',
  includesTitle: 'تشمل الرسوم',
  equipmentTitle: 'المعدات',
  mandatory: 'إلزامية',
  optional: 'اختيارية',
  rulesTitle: 'القوانين والعقوبات',
  registrationWindow: (opens: string, closes: string) => `التسجيل: ${opens} – ${closes}`,
  register: 'سجّل عبر سجلني',
  registrationUnavailable: 'التسجيل غير متاح حالياً',
  moreOnWebsite: 'التفاصيل الكاملة على موقعنا',
  notFound: 'الفعالية غير موجودة.',
};

export const eventMessages: Record<Lang, EventMessages> = { en, ar };
