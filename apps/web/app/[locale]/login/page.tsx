import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAuthDictionary, LoginPage } from '@/modules/auth';
import { isLocale } from '@/modules/common';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? { title: getAuthDictionary(locale).meta.title } : {};
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <LoginPage locale={locale} />;
}
