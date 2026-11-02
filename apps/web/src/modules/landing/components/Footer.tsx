import Link from 'next/link';
import type { Dictionary, Locale } from '../i18n';

export function Footer({ locale, t }: { locale: Locale; t: Dictionary['footer'] }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <span>
          © {new Date().getFullYear()} RunnerPlatform. {t.rights}
        </span>
        <nav>
          <Link href={`/${locale}/terms`}>{t.terms}</Link>
          <Link href={`/${locale}/privacy`}>{t.privacy}</Link>
          <Link href={`/${locale}/contact`}>{t.contact}</Link>
        </nav>
      </div>
    </footer>
  );
}
