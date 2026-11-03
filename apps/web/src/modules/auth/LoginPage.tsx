import type { Locale } from '@/modules/common';
import { LoginForm } from './components/LoginForm';
import { getAuthDictionary } from './i18n';

// Header and footer come from the shared locale layout
export function LoginPage({ locale }: { locale: Locale }) {
  const t = getAuthDictionary(locale);

  return (
    <section className="auth">
      <div className="auth-card">
        <h1>{t.title}</h1>
        <p className="muted">{t.subtitle}</p>
        <LoginForm t={t} />
      </div>
    </section>
  );
}
