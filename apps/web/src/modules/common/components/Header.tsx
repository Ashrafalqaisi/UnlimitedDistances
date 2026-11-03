import Image from 'next/image';
import Link from 'next/link';
import type { CommonDictionary, Locale } from '../i18n';
import { LanguageSwitch } from './LanguageSwitch';

export function Header({ locale, t }: { locale: Locale; t: CommonDictionary['nav'] }) {
  // Section links point at the home page so they work from every page
  const home = `/${locale}`;

  return (
    <header className="site-header">
      <Link href={home} className="brand" aria-label={t.brand}>
        <Image src="/images/logo.png" alt={t.brand} width={1430} height={299} priority />
      </Link>

      <nav className="nav-links">
        <Link href={`${home}#races`}>{t.races}</Link>
        <Link href={`${home}#why`}>{t.why}</Link>
        <Link href={`${home}#previous`}>{t.previous}</Link>
        <a href="#contact">{t.contact}</a>
      </nav>

      <div className="header-actions">
        <LanguageSwitch locale={locale} />
        <Link href={`${home}/login`} className="btn btn-primary">
          {t.signIn}
        </Link>
      </div>
    </header>
  );
}
