import Link from 'next/link';
import type { Dictionary, Locale } from '../i18n';
import {
  formatEventDate,
  formatPrice,
  localizeEvent,
  type EventSummary,
} from '../data/events';

interface Props {
  locale: Locale;
  t: Dictionary['events'];
  events: EventSummary[];
}

export function UpcomingEvents({ locale, t, events }: Props) {
  return (
    <section>
      <div className="container">
        <div className="section-head">
          <h2>{t.title}</h2>
          <p>{t.subtitle}</p>
        </div>

        {events.length === 0 ? (
          <p className="muted">{t.empty}</p>
        ) : (
          <div className="card-grid">
            {events.map((event) => {
              const { title, city } = localizeEvent(event, locale);
              return (
                <article key={event.slug} className="card">
                  <div
                    className="card-banner"
                    aria-hidden="true"
                    style={{
                      background: `linear-gradient(135deg, #0f766e, #f59e0b)`,
                    }}
                  />
                  <h3>{title}</h3>
                  <p className="meta">{city}</p>
                  <p className="meta">{formatEventDate(event.startsAt, locale)}</p>
                  <p className="price">
                    {t.from} {formatPrice(event.priceFrom, event.currency, locale)}
                  </p>
                  <Link href={`/${locale}/events/${event.slug}`} className="btn btn-ghost">
                    {t.register}
                  </Link>
                </article>
              );
            })}
          </div>
        )}

        <div className="section-head" style={{ marginTop: '2.5rem', marginBottom: 0 }}>
          <Link href={`/${locale}/events`} className="btn btn-ghost">
            {t.viewAll}
          </Link>
        </div>
      </div>
    </section>
  );
}
