import type { Lang } from '@/modules/common';

const en = {
  title: 'Sign in',
  subtitle: 'Welcome back, runner. Sign in to manage your race registrations.',
  email: 'Email',
  password: 'Password',
  submit: 'Sign in',
  submitting: 'Signing in…',
  required: 'Enter your email and password.',
  invalidCredentials: 'Email or password is incorrect.',
  networkError: "Can't reach the server. Check your connection and try again.",
  success: 'You are signed in.',
};

export type AuthMessages = typeof en;

const ar: AuthMessages = {
  title: 'تسجيل الدخول',
  subtitle: 'أهلاً بعودتك. سجّل الدخول لإدارة تسجيلاتك في السباقات.',
  email: 'البريد الإلكتروني',
  password: 'كلمة المرور',
  submit: 'تسجيل الدخول',
  submitting: 'جارٍ تسجيل الدخول…',
  required: 'أدخل بريدك الإلكتروني وكلمة المرور.',
  invalidCredentials: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.',
  networkError: 'تعذّر الاتصال بالخادم. تحقق من اتصالك وحاول مرة أخرى.',
  success: 'تم تسجيل دخولك.',
};

export const authMessages: Record<Lang, AuthMessages> = { en, ar };
