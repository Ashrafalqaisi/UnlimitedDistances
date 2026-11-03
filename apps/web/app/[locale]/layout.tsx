import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import '../globals.css';
import { Footer, getCommonDictionary, Header, isLocale, locales, textDirection } from '@/modules/common';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { meta } = getCommonDictionary(locale);
  return { title: meta.title, description: meta.description };
}

// Shared shell for every page: <html> lang and dir follow the URL locale,
// and the common header and footer wrap each module's page.
export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getCommonDictionary(locale);

  return (
    <html lang={locale} dir={textDirection(locale)}>
      <body>
        <Header locale={locale} t={t.nav} />
        <main>{children}</main>
        <Footer t={t.footer} brand={t.nav.brand} />
      </body>
    </html>
  );
}
