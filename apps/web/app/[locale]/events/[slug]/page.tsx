import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getEvent, getEvents } from '@runner/shared';
import { isLocale, locales } from '@/modules/common';
import { EventPage, getEventDictionary } from '@/modules/events';

export function generateStaticParams() {
  return locales.flatMap((locale) => getEvents().map((event) => ({ locale, slug: event.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const event = getEvent(slug);
  if (!isLocale(locale) || !event) return {};
  return {
    title: `${event.title[locale]} | ${getEventDictionary(locale).metaSuffix}`,
    description: event.tagline[locale],
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const event = getEvent(slug);
  if (!isLocale(locale) || !event) notFound();

  return <EventPage locale={locale} event={event} />;
}
