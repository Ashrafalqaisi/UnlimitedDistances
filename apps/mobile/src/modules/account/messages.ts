import type { Lang } from '@/modules/common';

const en = {
  title: 'Account',
  guestTitle: 'Join Unlimited Distances',
  guestMessage: 'Sign in to register for races, track your results and keep your runner profile.',
  signIn: 'Sign in',
  createAccount: 'Create account',
  settingsTitle: 'Settings',
  language: 'Language',
  languageValue: 'English',
  contactTitle: 'Contact us',
  call: (phone: string) => `Call ${phone}`,
  email: 'Email us',
  website: 'Website',
  followTitle: 'Follow us',
  version: (v: string) => `Version ${v}`,
};

export type AccountMessages = typeof en;

const ar: AccountMessages = {
  title: 'حسابي',
  guestTitle: 'انضم إلى مسافات بلا حدود',
  guestMessage: 'سجّل الدخول للتسجيل في السباقات ومتابعة نتائجك وحفظ ملفك كعدّاء.',
  signIn: 'تسجيل الدخول',
  createAccount: 'إنشاء حساب',
  settingsTitle: 'الإعدادات',
  language: 'اللغة',
  languageValue: 'العربية',
  contactTitle: 'تواصل معنا',
  call: (phone: string) => `اتصل ${phone}`,
  email: 'راسلنا عبر البريد',
  website: 'الموقع الإلكتروني',
  followTitle: 'تابعنا',
  version: (v: string) => `الإصدار ${v}`,
};

export const accountMessages: Record<Lang, AccountMessages> = { en, ar };
