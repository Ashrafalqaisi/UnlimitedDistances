import { getUpcomingEvents } from './data/events';
import { getDictionary, type Locale } from './i18n';
import { CallToAction } from './components/CallToAction';
import { Features } from './components/Features';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { UpcomingEvents } from './components/UpcomingEvents';

export function LandingPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const events = getUpcomingEvents(3);

  return (
    <>
      <Header locale={locale} t={t.nav} />
      <main>
        <Hero locale={locale} t={t.hero} />
        <UpcomingEvents locale={locale} t={t.events} events={events} />
        <Features t={t.features} />
        <HowItWorks t={t.howItWorks} />
        <CallToAction locale={locale} t={t.cta} />
      </main>
      <Footer locale={locale} t={t.footer} />
    </>
  );
}
