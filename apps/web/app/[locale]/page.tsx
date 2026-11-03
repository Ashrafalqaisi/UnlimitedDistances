import { notFound } from 'next/navigation';
import { isLocale } from '@/modules/common';
import { HomePage } from '@/modules/home';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <HomePage locale={locale} />;
}
