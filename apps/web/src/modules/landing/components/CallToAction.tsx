import Link from 'next/link';
import type { Dictionary, Locale } from '../i18n';

export function CallToAction({ locale, t }: { locale: Locale; t: Dictionary['cta'] }) {
  return (
    <section className="cta">
      <div className="container">
        <h2>{t.title}</h2>
        <p>{t.body}</p>
        <Link href={`/${locale}/register`} className="btn btn-primary">
          {t.button}
        </Link>
      </div>
    </section>
  );
}
