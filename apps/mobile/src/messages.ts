import type { Locale } from '@runner/shared';

export type Lang = Locale;

const en = {
  brand: 'RunnerPlatform',
  languageToggle: 'عربي',
  heroTitle: 'Find your next race',
  heroSubtitle: 'Discover marathons and road races near you, register in minutes, and track your results.',
  browse: 'Browse events',
  upcoming: 'Upcoming events',
  register: 'Register',
  from: 'From',
  featuresTitle: 'Everything a runner needs',
  features: [
    {
      title: 'Register in minutes',
      body: 'Choose your distance, pay securely, and get your bib confirmed.',
    },
    {
      title: 'Live results',
      body: 'Find your finish time and ranking as soon as results are published.',
    },
    {
      title: 'Your race history',
      body: 'Keep every event, medal, and personal best in one profile.',
    },
  ],
  comingSoon: 'Event details and registration are coming in the next step.',
  footer: 'All rights reserved.',
};

export type Messages = typeof en;

const ar: Messages = {
  brand: 'منصة العدائين',
  languageToggle: 'English',
  heroTitle: 'اعثر على سباقك القادم',
  heroSubtitle: 'اكتشف الماراثونات وسباقات الطرق القريبة منك، وسجّل خلال دقائق، وتابع نتائجك.',
  browse: 'تصفح الفعاليات',
  upcoming: 'الفعاليات القادمة',
  register: 'سجّل الآن',
  from: 'من',
  featuresTitle: 'كل ما يحتاجه العداء',
  features: [
    {
      title: 'سجّل في دقائق',
      body: 'اختر المسافة وادفع بأمان، واستلم رقم السباق كتأكيد.',
    },
    {
      title: 'نتائج فورية',
      body: 'اعرف زمن وصولك وترتيبك فور نشر النتائج.',
    },
    {
      title: 'سجل سباقاتك',
      body: 'احفظ كل فعالية وميدالية وأفضل زمن لك في ملف واحد.',
    },
  ],
  comingSoon: 'تفاصيل الفعالية والتسجيل ستكون متاحة في الخطوة القادمة.',
  footer: 'جميع الحقوق محفوظة.',
};

export const messages: Record<Lang, Messages> = { en, ar };
