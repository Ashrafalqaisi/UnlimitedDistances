import type { Locale } from '@/modules/common';
import { VerifyEmail } from './components/VerifyEmail';
import { getAuthDictionary } from './i18n';

/** Opened from the link in the confirmation email. */
export function VerifyEmailPage({ locale, token }: { locale: Locale; token: string | null }) {
  const t = getAuthDictionary(locale);

  return (
    <section className="auth">
      <div className="auth-card">
        <h1>{t.verify.title}</h1>
        <VerifyEmail locale={locale} token={token} t={t} />
      </div>
    </section>
  );
}
