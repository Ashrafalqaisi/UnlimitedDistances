import { getEvents } from './data/events';
import { getDictionary, type Locale } from './i18n';
import { CallToAction } from './components/CallToAction';
import { Features } from './components/Features';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PreviousEvents } from './components/PreviousEvents';
import { UpcomingEvents } from './components/UpcomingEvents';

export function LandingPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <>
      <Header locale={locale} t={t.nav} />
      <main>
        <Hero t={t.hero} />
        <UpcomingEvents locale={locale} t={t.events} events={getEvents()} />
        <Features t={t.why} />
        <PreviousEvents locale={locale} t={t.previous} />
        <CallToAction t={t.cta} />
      </main>
      <Footer t={t.footer} brand={t.nav.brand} />
    </>
  );
}
