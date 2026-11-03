import type { HomeDictionary } from '../i18n';
import { ORGANIZER } from '../data/events';

export function CallToAction({ t }: { t: HomeDictionary['cta'] }) {
  return (
    <section className="cta">
      <div className="container">
        <h2>{t.title}</h2>
        <blockquote>
          <p>“{t.quote}”</p>
          <cite>{t.author}</cite>
        </blockquote>
        <a href={`mailto:${ORGANIZER.email}`} className="btn btn-primary">
          {t.button}
        </a>
      </div>
    </section>
  );
}
