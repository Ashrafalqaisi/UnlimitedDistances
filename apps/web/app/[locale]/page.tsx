import { notFound } from 'next/navigation';
import { LandingPage } from '@/modules/landing';
import { isLocale } from '@/modules/landing/i18n';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <LandingPage locale={locale} />;
}
