import type { Lang } from '@/modules/common';

const en = {
  title: 'My races',
  emptyTitle: 'No races yet',
  emptyMessage: 'Races you register for will appear here, with your bib number, start time and results.',
  browseRaces: 'Browse races',
};

export type RegistrationMessages = typeof en;

const ar: RegistrationMessages = {
  title: 'سباقاتي',
  emptyTitle: 'لا توجد سباقات بعد',
  emptyMessage: 'ستظهر هنا السباقات التي تسجّل فيها، مع رقم صدريتك ووقت الانطلاق والنتائج.',
  browseRaces: 'تصفّح السباقات',
};

export const registrationMessages: Record<Lang, RegistrationMessages> = { en, ar };
