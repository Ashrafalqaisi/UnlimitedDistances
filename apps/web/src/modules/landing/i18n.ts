import type { Locale } from '@runner/shared';

export { defaultLocale, isLocale, locales, textDirection, type Locale } from '@runner/shared';

const en = {
  meta: {
    title: 'Runner Platform: races, registration and results',
    description: 'Find marathons and road races near you, register in minutes, and track your results.',
  },
  nav: {
    events: 'Events',
    howItWorks: 'How it works',
    signIn: 'Sign in',
    getStarted: 'Get started',
  },
  hero: {
    title: 'Find your next race',
    subtitle:
      'Discover marathons and road races near you, register in minutes, and track your results.',
    primaryCta: 'Browse events',
    secondaryCta: 'Create free account',
  },
  events: {
    title: 'Upcoming events',
    subtitle: 'Registration is open for these races',
    viewAll: 'View all events',
    register: 'Register',
    from: 'From',
    empty: 'No upcoming events yet.',
  },
  features: {
    title: 'Everything a runner needs',
    items: [
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
  },
  howItWorks: {
    title: 'How it works',
    items: [
      { title: 'Find an event', body: 'Browse upcoming races by city and distance.' },
      { title: 'Register', body: 'Pick your category and complete checkout.' },
      { title: 'Race and track', body: 'Get your bib and see your results after the race.' },
    ],
  },
  cta: {
    title: 'Ready for your next start line?',
    body: 'Create a free account and never miss a registration window.',
    button: 'Create free account',
  },
  footer: {
    rights: 'All rights reserved.',
    terms: 'Terms',
    privacy: 'Privacy',
    contact: 'Contact',
  },
};

export type Dictionary = typeof en;

const ar: Dictionary = {
  meta: {
    title: 'منصة العدائين: السباقات والتسجيل والنتائج',
    description: 'اعثر على الماراثونات وسباقات الطرق القريبة منك، وسجّل خلال دقائق، وتابع نتائجك.',
  },
  nav: {
    events: 'الفعاليات',
    howItWorks: 'كيف يعمل',
    signIn: 'تسجيل الدخول',
    getStarted: 'ابدأ الآن',
  },
  hero: {
    title: 'اعثر على سباقك القادم',
    subtitle: 'اكتشف الماراثونات وسباقات الطرق القريبة منك، وسجّل خلال دقائق، وتابع نتائجك.',
    primaryCta: 'تصفح الفعاليات',
    secondaryCta: 'أنشئ حساباً مجانياً',
  },
  events: {
    title: 'الفعاليات القادمة',
    subtitle: 'التسجيل مفتوح لهذه السباقات',
    viewAll: 'عرض كل الفعاليات',
    register: 'سجّل الآن',
    from: 'من',
    empty: 'لا توجد فعاليات قادمة حالياً.',
  },
  features: {
    title: 'كل ما يحتاجه العداء',
    items: [
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
  },
  howItWorks: {
    title: 'كيف يعمل',
    items: [
      { title: 'ابحث عن فعالية', body: 'تصفح السباقات القادمة حسب المدينة والمسافة.' },
      { title: 'سجّل', body: 'اختر فئتك وأكمل عملية الدفع.' },
      { title: 'اركض وتابع', body: 'استلم رقم السباق واطّلع على نتائجك بعد السباق.' },
    ],
  },
  cta: {
    title: 'جاهز لخط البداية التالي؟',
    body: 'أنشئ حساباً مجانياً ولن تفوتك أي فترة تسجيل.',
    button: 'أنشئ حساباً مجانياً',
  },
  footer: {
    rights: 'جميع الحقوق محفوظة.',
    terms: 'الشروط',
    privacy: 'الخصوصية',
    contact: 'تواصل معنا',
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, ar };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
