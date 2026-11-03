import type { HomeDictionary } from '../i18n';

export function Hero({ t }: { t: HomeDictionary['hero'] }) {
  return (
    <>
      <section className="hero">
        <div className="container">
          <p className="hero-eyebrow">{t.eyebrow}</p>
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
          <div className="hero-actions">
            <a href="#races" className="btn btn-primary">
              {t.primaryCta}
            </a>
            <a href="#contact" className="btn btn-ghost">
              {t.secondaryCta}
            </a>
          </div>
        </div>
      </section>
      <div className="highlights">
        {t.highlights.map((item) => (
          <div key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </>
  );
}
