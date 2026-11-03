import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  formatDay,
  formatPrice,
  formatTime,
  getEventStatus,
  groupProgrammeByDay,
  localizeEvent,
  type EventSummary,
} from '@runner/shared';
import { eventImages, type Locale } from '@/modules/common';
import { getEventDictionary } from './i18n';

// Header and footer come from the shared locale layout
export function EventPage({ locale, event }: { locale: Locale; event: EventSummary }) {
  const t = getEventDictionary(locale);
  const { title, tagline, city } = localizeEvent(event, locale);
  const status = getEventStatus(event);
  const price = (amount: number | undefined, currency: string) =>
    amount === undefined ? '—' : formatPrice(amount, currency, locale);

  return (
    <article className="event-page">
      <header className="event-cover">
        <Image src={eventImages[event.slug]} alt="" fill priority sizes="100vw" />
        <div className="container event-cover-text">
          <Link href={`/${locale}#races`} className="event-back">
            {t.backToRaces}
          </Link>
          <span className={`badge-inline ${status === 'open' ? 'badge-open' : ''}`}>{t.status[status]}</span>
          <h1>{title}</h1>
          <p>{tagline}</p>
        </div>
      </header>

      <dl className="highlights event-facts">
        <div>
          <dt>{t.date}</dt>
          <dd>{formatDay(event.startsAt, locale)}</dd>
        </div>
        <div>
          <dt>{t.location}</dt>
          <dd>{city}</dd>
        </div>
        <div>
          <dt>{t.registration}</dt>
          <dd>
            {formatDay(event.registrationOpensAt, locale)} – {formatDay(event.registrationClosesAt, locale)}
          </dd>
        </div>
      </dl>

      <div className="container event-body">
        <EventSection title={t.distancesTitle}>
          <ul className="event-list">
            {event.distances.map((distance) => (
              <li key={distance.name.en}>
                <div>
                  <strong>{distance.name[locale]}</strong>
                  {distance.details && <span className="muted">{distance.details[locale]}</span>}
                </div>
                <span className="event-list-side">
                  {formatDay(distance.startsAt, locale)} · {formatTime(distance.startsAt, locale)}
                  {distance.minAge !== undefined && (
                    <span>{t.minAge.replace('{age}', String(distance.minAge))}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </EventSection>

        {event.programmes && event.programmes.length > 0 && (
          <EventSection title={t.programmeTitle}>
            <div className="programme-grid">
              {event.programmes.map((programme) => (
                <div key={programme.appliesTo.en} className="programme">
                  <h3>{programme.appliesTo[locale]}</h3>
                  {groupProgrammeByDay(programme).map(({ day, items }) => (
                    <div key={day} className="programme-day">
                      <p className="programme-date">{formatDay(day, locale)}</p>
                      <ol>
                        {items.map((item) => (
                          <li key={item.at + item.label.en}>
                            <time dateTime={item.at}>{formatTime(item.at, locale)}</time>
                            <span>{item.label[locale]}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </EventSection>
        )}

        <EventSection title={t.feesTitle}>
          {event.fees.map((table) => {
            const hasUsd = table.rows.some((row) => row.amountUsd !== undefined);
            return (
              <div key={table.appliesTo.en} className="fee-table-wrap">
                <table className="fee-table">
                  <caption>{table.appliesTo[locale]}</caption>
                  <thead>
                    <tr>
                      <th scope="col">{t.feeCategory}</th>
                      <th scope="col">{t.feeJod}</th>
                      {hasUsd && <th scope="col">{t.feeUsd}</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {table.rows.map((row) => (
                      <tr key={row.label.en}>
                        <th scope="row">{row.label[locale]}</th>
                        <td>{price(row.amount, event.currency)}</td>
                        {hasUsd && <td>{price(row.amountUsd, 'USD')}</td>}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
        </EventSection>

        <EventSection title={t.includesTitle}>
          <ul className="check-list">
            {event.includes.map((item) => (
              <li key={item.en}>{item[locale]}</li>
            ))}
          </ul>
        </EventSection>

        {event.equipment && (
          <EventSection title={t.equipmentTitle}>
            <p className="muted">{event.equipment.appliesTo[locale]}</p>
            <div className="equipment-grid">
              <div>
                <h3>{t.mandatory}</h3>
                <ul className="check-list">
                  {event.equipment.mandatory.map((item) => (
                    <li key={item.en}>{item[locale]}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>{t.optional}</h3>
                <ul className="check-list check-list-optional">
                  {event.equipment.optional.map((item) => (
                    <li key={item.en}>{item[locale]}</li>
                  ))}
                </ul>
              </div>
            </div>
          </EventSection>
        )}

        {event.rules && event.rules.length > 0 && (
          <EventSection title={t.rulesTitle}>
            <ol className="rules-list">
              {event.rules.map((rule) => (
                <li key={rule.en}>{rule[locale]}</li>
              ))}
            </ol>
          </EventSection>
        )}

        <div className="event-actions">
          {status === 'open' ? (
            <a href={event.registerUrl} className="btn btn-primary" target="_blank" rel="noreferrer">
              {t.register}
            </a>
          ) : (
            <span className="btn btn-disabled" aria-disabled="true">
              {t.registrationUnavailable}
            </span>
          )}
          <a href={event.websiteUrl} className="btn btn-ghost" target="_blank" rel="noreferrer">
            {t.moreOnWebsite}
          </a>
        </div>
      </div>
    </article>
  );
}

function EventSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="event-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}
