import Image from 'next/image';
import type { Locale } from '@/modules/common';
import type { HomeDictionary } from '../i18n';
import { eventImages, PAST_EDITIONS } from '../data/events';

export function PreviousEvents({ locale, t }: { locale: Locale; t: HomeDictionary['previous'] }) {
  return (
    <section id="previous">
      <div className="container">
        <div className="section-head">
          <h2>{t.title}</h2>
        </div>

        <div className="card-grid">
          {PAST_EDITIONS.map((edition) => (
            <figure key={edition.slug} className="gallery-item">
              <Image src={eventImages[edition.slug]} alt="" fill sizes="(max-width: 720px) 100vw, 33vw" />
              <figcaption>{edition.title[locale]}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
