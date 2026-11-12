import type { Lang } from '@/modules/common';

const en = {
  listTitle: 'Races',
  listSubtitle: 'Desert marathons and forest trail runs across Jordan.',
  signatureTitle: 'Our signature events',
  previousTitle: 'Previous events',
  date: 'Date',
  location: 'Location',
  registration: 'Registration',
  distancesTitle: 'Distances',
  minAge: (age: number) => `Age ${age}+`,
  programmeTitle: 'Programme',
  feesTitle: 'Registration fees',
  includesTitle: 'Fees include',
  equipmentTitle: 'Equipment',
  mandatory: 'Mandatory',
  optional: 'Optional',
  rulesTitle: 'Rules and penalties',
  register: 'Register on Sajilni',
  registrationUnavailable: 'Registration closed',
  moreOnWebsite: 'Full details on our website',
  notFound: 'Event not found.',
};

export type EventMessages = typeof en;

const ar: EventMessages = {
  listTitle: 'السباقات',
  listSubtitle: 'ماراثونات صحراوية وسباقات جري في الغابات في أنحاء الأردن.',
  signatureTitle: 'فعالياتنا الرئيسية',
  previousTitle: 'فعاليات سابقة',
  date: 'التاريخ',
  location: 'الموقع',
  registration: 'التسجيل',
  distancesTitle: 'المسافات',
  minAge: (age: number) => `العمر ${age}+`,
  programmeTitle: 'البرنامج',
  feesTitle: 'رسوم التسجيل',
  includesTitle: 'تشمل الرسوم',
  equipmentTitle: 'المعدات',
  mandatory: 'إلزامية',
  optional: 'اختيارية',
  rulesTitle: 'القوانين والعقوبات',
  register: 'سجّل عبر سجلني',
  registrationUnavailable: 'التسجيل مغلق',
  moreOnWebsite: 'التفاصيل الكاملة على موقعنا',
  notFound: 'الفعالية غير موجودة.',
};

export const eventMessages: Record<Lang, EventMessages> = { en, ar };
