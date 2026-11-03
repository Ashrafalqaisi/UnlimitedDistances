import Image from 'next/image';
import { ORGANIZER } from '@runner/shared';
import type { CommonDictionary } from '../i18n';

export function Footer({ t, brand }: { t: CommonDictionary['footer']; brand: string }) {
  const links = [
    ...ORGANIZER.phones.map((phone) => ({ label: phone, href: `tel:${phone}` })),
    { label: ORGANIZER.email, href: `mailto:${ORGANIZER.email}` },
    { label: 'Facebook', href: ORGANIZER.social.facebook },
    { label: 'Instagram', href: ORGANIZER.social.instagram },
    { label: 'LinkedIn', href: ORGANIZER.social.linkedin },
  ];

  return (
    <footer id="contact" className="site-footer">
      <div className="container">
        <Image src="/images/logo-white.png" alt={brand} width={1430} height={299} className="footer-logo" />
        <div>
          <h2>{t.contact}</h2>
          <nav>
            {links.map((link) => (
              <a key={link.href} href={link.href} dir="ltr">
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
      <p className="footer-copy">
        © {new Date().getFullYear()} {brand}. {t.rights}
      </p>
    </footer>
  );
}
