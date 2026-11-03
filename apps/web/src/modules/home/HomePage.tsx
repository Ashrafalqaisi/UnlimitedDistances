import type { Locale } from '@/modules/common';
import { getEvents } from './data/events';
import { getHomeDictionary } from './i18n';
import { CallToAction } from './components/CallToAction';
import { Hero } from './components/Hero';
import { PreviousEvents } from './components/PreviousEvents';
import { Races } from './components/Races';
import { WhyParticipate } from './components/WhyParticipate';

// Header and footer come from the shared locale layout
export function HomePage({ locale }: { locale: Locale }) {
  const t = getHomeDictionary(locale);

  return (
    <>
      <Hero t={t.hero} />
      <Races locale={locale} t={t.events} events={getEvents()} />
      <WhyParticipate t={t.why} />
      <PreviousEvents locale={locale} t={t.previous} />
      <CallToAction t={t.cta} />
    </>
  );
}
