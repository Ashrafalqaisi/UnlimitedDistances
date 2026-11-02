import Link from 'next/link';
import type { Dictionary, Locale } from '../i18n';

export function Header({ locale, t }: { locale: Locale; t: Dictionary['nav'] }) {
  const otherLocale: Locale = locale === 'en' ? 'ar' : 'en';

  return (
    <header className="site-header">
      <Link href={`/${locale}`} className="brand">
        Runner<span>Platform</span>
      </Link>

      <nav className="nav-links">
        <Link href={`/${locale}/events`}>{t.events}</Link>
        <a href="#how-it-works">{t.howItWorks}</a>
      </nav>

      <div className="header-actions">
        <Link href={`/${otherLocale}`} className="lang-switch" hrefLang={otherLocale}>
          {otherLocale === 'ar' ? 'العربية' : 'English'}
        </Link>
        <Link href={`/${locale}/login`}>{t.signIn}</Link>
        <Link href={`/${locale}/register`} className="btn btn-primary">
          {t.getStarted}
        </Link>
      </div>
    </header>
  );
}
