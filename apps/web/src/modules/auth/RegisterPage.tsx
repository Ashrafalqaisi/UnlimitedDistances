import Link from 'next/link';
import type { Locale } from '@/modules/common';
import { RegisterForm } from './components/RegisterForm';
import { getAuthDictionary } from './i18n';

// Header and footer come from the shared locale layout
export function RegisterPage({ locale }: { locale: Locale }) {
  const t = getAuthDictionary(locale);

  return (
    <section className="auth">
      <div className="auth-card">
        <h1>{t.register.title}</h1>
        <p className="muted">{t.register.subtitle}</p>
        <RegisterForm locale={locale} t={t} />
        <p className="auth-switch">
          {t.register.haveAccount} <Link href={`/${locale}/login`}>{t.register.signIn}</Link>
        </p>
      </div>
    </section>
  );
}
