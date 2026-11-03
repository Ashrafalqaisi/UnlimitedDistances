import type { PasswordCheck, RegisterFieldError } from '@runner/shared';
import type { Locale } from '@/modules/common';

// Plain strings only: the dictionary is passed from server pages to client forms, so no functions.
// "{email}" placeholders are filled in by the component that shows the message.
const en = {
  meta: {
    title: 'Sign in | Unlimited Distances',
    registerTitle: 'Create account | Unlimited Distances',
    verifyTitle: 'Confirm email | Unlimited Distances',
  },
  title: 'Sign in',
  subtitle: 'Welcome back, runner. Sign in to manage your race registrations.',
  identifier: 'Email or username',
  password: 'Password',
  submit: 'Sign in',
  submitting: 'Signing in…',
  invalidCredentials: 'Email, username or password is incorrect.',
  notVerified: 'Please confirm your email first. Open the link we sent to your inbox.',
  resend: 'Resend confirmation email',
  resent: 'If your account still needs confirming, a new link is on its way.',
  networkError: "Can't reach the server. Check your connection and try again.",
  success: 'You are signed in.',
  noAccount: "Don't have an account?",
  createAccount: 'Create one',
  register: {
    title: 'Create account',
    subtitle: 'Join Unlimited Distances to register for races and track your results.',
    fullName: 'Full name',
    email: 'Email',
    username: 'Username',
    usernameHint: '3–30 characters: letters, numbers, dot or underscore, starting with a letter.',
    phone: 'Phone number (optional)',
    phoneHint: 'Needed later when you register for an event.',
    password: 'Password',
    confirmPassword: 'Confirm password',
    submit: 'Create account',
    submitting: 'Creating account…',
    fixErrors: 'Please fix the highlighted fields.',
    haveAccount: 'Already have an account?',
    signIn: 'Sign in',
    welcomeTitle: 'Welcome aboard!',
    welcomeMessage:
      'We sent a confirmation link to {email}. Confirm your email before your next sign-in and before registering for a race.',
    dismiss: 'Dismiss',
  },
  verify: {
    title: 'Confirm email',
    verifying: 'Confirming your email…',
    success: 'Your email is confirmed. You can now sign in and register for races.',
    failed: 'This confirmation link is invalid or has expired. Sign in to request a new one.',
    missing: 'This confirmation link is incomplete. Open the full link from the email.',
    signIn: 'Go to sign in',
  },
  passwordChecks: {
    length: '8 characters or more',
    uppercase: 'One capital letter',
    number: 'One number',
    special: 'One special character (for example ! @ # $)',
  } satisfies Record<PasswordCheck, string>,
  fieldErrors: {
    required: 'This field is required.',
    fullNameLength: 'Enter 2 to 100 characters.',
    emailInvalid: 'Enter a valid email address.',
    usernameInvalid: 'Use 3–30 letters, numbers, dot or underscore, starting with a letter.',
    phoneInvalid: 'Enter 7–15 digits, optionally starting with +.',
    passwordWeak: 'Password does not meet all the requirements below.',
    passwordMismatch: 'Passwords do not match.',
    emailTaken: 'This email is already registered.',
    usernameTaken: 'This username is taken.',
    phoneTaken: 'This phone number is already registered.',
  } satisfies Record<RegisterFieldError | 'emailTaken' | 'usernameTaken' | 'phoneTaken', string>,
};

export type AuthDictionary = typeof en;

const ar: AuthDictionary = {
  meta: {
    title: 'تسجيل الدخول | مسافات بلا حدود',
    registerTitle: 'إنشاء حساب | مسافات بلا حدود',
    verifyTitle: 'تأكيد البريد الإلكتروني | مسافات بلا حدود',
  },
  title: 'تسجيل الدخول',
  subtitle: 'أهلاً بعودتك. سجّل الدخول لإدارة تسجيلاتك في السباقات.',
  identifier: 'البريد الإلكتروني أو اسم المستخدم',
  password: 'كلمة المرور',
  submit: 'تسجيل الدخول',
  submitting: 'جارٍ تسجيل الدخول…',
  invalidCredentials: 'البريد الإلكتروني أو اسم المستخدم أو كلمة المرور غير صحيحة.',
  notVerified: 'يرجى تأكيد بريدك الإلكتروني أولاً. افتح الرابط الذي أرسلناه إلى بريدك.',
  resend: 'إعادة إرسال رسالة التأكيد',
  resent: 'إذا كان حسابك لا يزال بحاجة إلى تأكيد، فسيصلك رابط جديد قريباً.',
  networkError: 'تعذّر الاتصال بالخادم. تحقق من اتصالك وحاول مرة أخرى.',
  success: 'تم تسجيل دخولك.',
  noAccount: 'ليس لديك حساب؟',
  createAccount: 'أنشئ حساباً',
  register: {
    title: 'إنشاء حساب',
    subtitle: 'انضم إلى مسافات بلا حدود للتسجيل في السباقات ومتابعة نتائجك.',
    fullName: 'الاسم الكامل',
    email: 'البريد الإلكتروني',
    username: 'اسم المستخدم',
    usernameHint: 'من 3 إلى 30 حرفاً: أحرف إنجليزية أو أرقام أو نقطة أو شرطة سفلية، ويبدأ بحرف.',
    phone: 'رقم الهاتف (اختياري)',
    phoneHint: 'ستحتاجه لاحقاً عند التسجيل في فعالية.',
    password: 'كلمة المرور',
    confirmPassword: 'تأكيد كلمة المرور',
    submit: 'إنشاء الحساب',
    submitting: 'جارٍ إنشاء الحساب…',
    fixErrors: 'يرجى تصحيح الحقول المحددة.',
    haveAccount: 'لديك حساب بالفعل؟',
    signIn: 'تسجيل الدخول',
    welcomeTitle: 'أهلاً بك!',
    welcomeMessage:
      'أرسلنا رابط تأكيد إلى {email}. أكّد بريدك الإلكتروني قبل تسجيل الدخول القادم وقبل التسجيل في أي سباق.',
    dismiss: 'إغلاق',
  },
  verify: {
    title: 'تأكيد البريد الإلكتروني',
    verifying: 'جارٍ تأكيد بريدك الإلكتروني…',
    success: 'تم تأكيد بريدك الإلكتروني. يمكنك الآن تسجيل الدخول والتسجيل في السباقات.',
    failed: 'رابط التأكيد غير صالح أو منتهي الصلاحية. سجّل الدخول لطلب رابط جديد.',
    missing: 'رابط التأكيد غير مكتمل. افتح الرابط كاملاً من الرسالة.',
    signIn: 'الذهاب لتسجيل الدخول',
  },
  passwordChecks: {
    length: '8 أحرف أو أكثر',
    uppercase: 'حرف إنجليزي كبير واحد',
    number: 'رقم واحد',
    special: 'رمز خاص واحد (مثل ! @ # $)',
  },
  fieldErrors: {
    required: 'هذا الحقل مطلوب.',
    fullNameLength: 'أدخل من 2 إلى 100 حرف.',
    emailInvalid: 'أدخل بريداً إلكترونياً صحيحاً.',
    usernameInvalid: 'استخدم من 3 إلى 30 حرفاً إنجليزياً أو رقماً أو نقطة أو شرطة سفلية، ويبدأ بحرف.',
    phoneInvalid: 'أدخل من 7 إلى 15 رقماً، ويمكن أن يبدأ بـ +.',
    passwordWeak: 'كلمة المرور لا تستوفي جميع الشروط أدناه.',
    passwordMismatch: 'كلمتا المرور غير متطابقتين.',
    emailTaken: 'هذا البريد الإلكتروني مسجّل بالفعل.',
    usernameTaken: 'اسم المستخدم هذا مستخدم بالفعل.',
    phoneTaken: 'رقم الهاتف هذا مسجّل بالفعل.',
  },
};

const dictionaries: Record<Locale, AuthDictionary> = { en, ar };

export function getAuthDictionary(locale: Locale): AuthDictionary {
  return dictionaries[locale];
}
