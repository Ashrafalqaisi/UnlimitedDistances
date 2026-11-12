import Image from 'next/image';
import Link from 'next/link';
import type { CommonDictionary, Locale } from '../i18n';
import { SiteNav } from './SiteNav';

export function Header({ locale, t }: { locale: Locale; t: CommonDictionary['nav'] }) {
  const home = `/${locale}`;

  return (
    <header className="site-header">
      <Link href={home} className="brand" aria-label={t.brand}>
        <Image src="/images/logo.png" alt={t.brand} width={1430} height={299} priority />
      </Link>

      <SiteNav locale={locale} t={t} />

      <Link href={`${home}/login`} className="btn btn-primary header-signin">
        {t.signIn}
      </Link>
    </header>
  );
}
