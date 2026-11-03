import Image from 'next/image';
import type { Locale } from '@/modules/common';
import type { HomeDictionary } from '../i18n';
import {
  eventImages,
  formatDay,
  formatPrice,
  getEventStatus,
  localizeEvent,
  lowestFee,
  type EventSummary,
} from '../data/events';

interface Props {
  locale: Locale;
  t: HomeDictionary['events'];
  events: EventSummary[];
}

export function Races({ locale, t, events }: Props) {
  return (
    <section id="races">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">{t.eyebrow}</p>
          <h2>{t.title}</h2>
        </div>

        <div className="card-grid">
          {events.map((event) => {
            const { title, tagline, city } = localizeEvent(event, locale);
            const status = getEventStatus(event);
            return (
              <article key={event.slug} className="card race-card">
                <div className="card-banner">
                  <Image src={eventImages[event.slug]} alt="" fill sizes="(max-width: 720px) 100vw, 50vw" />
                  <span className={`badge ${status === 'open' ? 'badge-open' : ''}`}>{t.status[status]}</span>
                </div>
                <h3>{title}</h3>
                <p className="tagline">{tagline}</p>
                <p className="meta">
                  {city} · {formatDay(event.startsAt, locale)}
                </p>
                <ul className="chips">
                  {event.distances.map((distance) => (
                    <li key={distance.name.en}>{distance.name[locale]}</li>
                  ))}
                </ul>
                <p className="price">
                  {t.from} {formatPrice(lowestFee(event), event.currency, locale)}
                </p>
                <a href={event.websiteUrl} className="btn btn-ghost" target="_blank" rel="noreferrer">
                  {t.details}
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
