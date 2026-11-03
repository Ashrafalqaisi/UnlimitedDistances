import type { Lang } from '@/modules/common';

const en = {
  heroEyebrow: 'Organizing sports in Jordan',
  heroTitle: 'Explore the adventure',
  heroSubtitle: 'Desert marathons and forest trail runs across Jordan, from Wadi Rum to Wasfi Al Tal Forest.',
  joinNow: 'Join now',
  highlights: [
    { value: '+2500', label: 'Participants' },
    { value: '84 km', label: 'Longest track' },
    { value: '2', label: 'Race series' },
  ],
  racesTitle: 'Unlimited distance races',
  racesSubtitle: 'Our signature events',
  details: 'Details',
  whyTitle: 'Why participate',
  why: ['Be healthy', 'Stay strong', 'Be the fastest', 'Be one of our participants'],
  previousTitle: 'Previous events',
  quote: 'Running is a way of life.',
  quoteAuthor: 'Coach Mohammad Al Swaiti, founder',
};

export type HomeMessages = typeof en;

const ar: HomeMessages = {
  heroEyebrow: 'تنظيم الفعاليات الرياضية في الأردن',
  heroTitle: 'استكشف المغامرة',
  heroSubtitle: 'ماراثونات صحراوية وسباقات جري في الغابات في أنحاء الأردن، من وادي رم إلى غابات وصفي التل.',
  joinNow: 'انضم الآن',
  highlights: [
    { value: '+2500', label: 'مشارك' },
    { value: '84 كم', label: 'أطول مسار' },
    { value: '2', label: 'سلسلة سباقات' },
  ],
  racesTitle: 'سباقات مسافات بلا حدود',
  racesSubtitle: 'فعالياتنا الرئيسية',
  details: 'التفاصيل',
  whyTitle: 'لماذا تشارك',
  why: ['كن بصحة جيدة', 'ابقَ قوياً', 'كن الأسرع', 'كن أحد مشاركينا'],
  previousTitle: 'فعاليات سابقة',
  quote: 'الجري أسلوب حياة.',
  quoteAuthor: 'المدرب محمد السويطي، المؤسس',
};

export const homeMessages: Record<Lang, HomeMessages> = { en, ar };
