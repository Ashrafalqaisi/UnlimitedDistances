import type { Dictionary } from '../i18n';

export function Features({ t }: { t: Dictionary['features'] }) {
  return (
    <section style={{ background: 'var(--surface)' }}>
      <div className="container">
        <div className="section-head">
          <h2>{t.title}</h2>
        </div>

        <div className="card-grid">
          {t.items.map((item, index) => (
            <article key={item.title} className="card feature">
              <div className="feature-icon" aria-hidden="true">
                {index + 1}
              </div>
              <h3>{item.title}</h3>
              <p className="muted">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
