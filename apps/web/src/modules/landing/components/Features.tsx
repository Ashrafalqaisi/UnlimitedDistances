import type { Dictionary } from '../i18n';

export function Features({ t }: { t: Dictionary['why'] }) {
  return (
    <section id="why" style={{ background: 'var(--surface)' }}>
      <div className="container">
        <div className="section-head">
          <h2>{t.title}</h2>
        </div>

        <div className="card-grid why-grid">
          {t.items.map((item, index) => (
            <article key={item} className="card feature">
              <span className="step-number" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3>{item}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
