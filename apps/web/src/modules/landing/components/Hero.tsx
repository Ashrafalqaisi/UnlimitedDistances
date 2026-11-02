import Link from 'next/link';
import type { Dictionary, Locale } from '../i18n';

export function Hero({ locale, t }: { locale: Locale; t: Dictionary['hero'] }) {
  return (
    <section className="hero">
      <div className="container">
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
        <div className="hero-actions">
          <Link href={`/${locale}/events`} className="btn btn-primary">
            {t.primaryCta}
          </Link>
          <Link href={`/${locale}/register`} className="btn btn-ghost">
            {t.secondaryCta}
          </Link>
        </div>
      </div>
    </section>
  );
}
