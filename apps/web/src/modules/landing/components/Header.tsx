import Image from 'next/image';
import Link from 'next/link';
import type { Dictionary, Locale } from '../i18n';

export function Header({ locale, t }: { locale: Locale; t: Dictionary['nav'] }) {
  const otherLocale: Locale = locale === 'en' ? 'ar' : 'en';

  return (
    <header className="site-header">
      <Link href={`/${locale}`} className="brand" aria-label={t.brand}>
        <Image src="/images/logo.png" alt={t.brand} width={1430} height={299} priority />
      </Link>

      <nav className="nav-links">
        <a href="#races">{t.races}</a>
        <a href="#why">{t.why}</a>
        <a href="#previous">{t.previous}</a>
        <a href="#contact">{t.contact}</a>
      </nav>

      <div className="header-actions">
        <Link href={`/${otherLocale}`} className="lang-switch" hrefLang={otherLocale}>
          {otherLocale === 'ar' ? 'العربية' : 'English'}
        </Link>
      </div>
    </header>
  );
}
