import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAuthDictionary, VerifyEmailPage } from '@/modules/auth';
import { isLocale } from '@/modules/common';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? { title: getAuthDictionary(locale).meta.verifyTitle } : {};
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ token?: string | string[] }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { token } = await searchParams;

  return <VerifyEmailPage locale={locale} token={typeof token === 'string' ? token : null} />;
}
