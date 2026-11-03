import type { Locale } from '@/modules/common';

const en = {
  meta: {
    title: 'Sign in | Unlimited Distances',
  },
  title: 'Sign in',
  subtitle: 'Welcome back, runner. Sign in to manage your race registrations.',
  email: 'Email',
  password: 'Password',
  submit: 'Sign in',
  submitting: 'Signing in…',
  invalidCredentials: 'Email or password is incorrect.',
  networkError: "Can't reach the server. Check your connection and try again.",
  success: 'You are signed in.',
};

export type AuthDictionary = typeof en;

const ar: AuthDictionary = {
  meta: {
    title: 'تسجيل الدخول | مسافات بلا حدود',
  },
  title: 'تسجيل الدخول',
  subtitle: 'أهلاً بعودتك. سجّل الدخول لإدارة تسجيلاتك في السباقات.',
  email: 'البريد الإلكتروني',
  password: 'كلمة المرور',
  submit: 'تسجيل الدخول',
  submitting: 'جارٍ تسجيل الدخول…',
  invalidCredentials: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.',
  networkError: 'تعذّر الاتصال بالخادم. تحقق من اتصالك وحاول مرة أخرى.',
  success: 'تم تسجيل دخولك.',
};

const dictionaries: Record<Locale, AuthDictionary> = { en, ar };

export function getAuthDictionary(locale: Locale): AuthDictionary {
  return dictionaries[locale];
}
