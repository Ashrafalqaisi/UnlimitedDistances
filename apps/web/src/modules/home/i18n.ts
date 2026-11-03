import type { EventStatus } from '@runner/shared';
import type { Locale } from '@/modules/common';

const en = {
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
};

export type HomeDictionary = typeof en;

const ar: HomeDictionary = {
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
};

const dictionaries: Record<Locale, HomeDictionary> = { en, ar };

export function getHomeDictionary(locale: Locale): HomeDictionary {
  return dictionaries[locale];
}
