'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Locale } from '../i18n';

/** Links to the same page in the other language, e.g. /en/login -> /ar/login. */
export function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const otherLocale: Locale = locale === 'en' ? 'ar' : 'en';
  const href = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), `/${otherLocale}`);

  return (
    <Link href={href} className="lang-switch" hrefLang={otherLocale}>
      {otherLocale === 'ar' ? 'العربية' : 'English'}
    </Link>
  );
}
