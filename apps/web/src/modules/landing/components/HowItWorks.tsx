import type { Dictionary } from '../i18n';

export function HowItWorks({ t }: { t: Dictionary['howItWorks'] }) {
  return (
    <section id="how-it-works">
      <div className="container">
        <div className="section-head">
          <h2>{t.title}</h2>
        </div>

        <div className="card-grid">
          {t.items.map((item, index) => (
            <article key={item.title} className="card">
              <span className="step-number" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3>{item.title}</h3>
              <p className="muted">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
