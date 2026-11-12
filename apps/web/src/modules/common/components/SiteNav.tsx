'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { CommonDictionary, Locale } from '../i18n';
import { LanguageSwitch } from './LanguageSwitch';

/**
 * Section links and language switch. Inline on wide screens; on narrow screens they
 * collapse behind a menu button and open as a panel under the header.
 */
export function SiteNav({ locale, t }: { locale: Locale; t: CommonDictionary['nav'] }) {
  const pathname = usePathname();
  // Remember which page the menu was opened on, so navigating elsewhere closes it
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const close = () => setOpenOn(null);
  // Section links point at the home page so they work from every page
  const home = `/${locale}`;

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenOn(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="site-nav"
        aria-label={open ? t.closeMenu : t.openMenu}
        onClick={() => setOpenOn(open ? null : pathname)}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          )}
        </svg>
      </button>

      <div id="site-nav" className="site-nav" data-open={open}>
        <nav className="nav-links">
          <Link href={`${home}#races`} onClick={close}>
            {t.races}
          </Link>
          <Link href={`${home}#why`} onClick={close}>
            {t.why}
          </Link>
          <Link href={`${home}#previous`} onClick={close}>
            {t.previous}
          </Link>
          <a href="#contact" onClick={close}>
            {t.contact}
          </a>
        </nav>
        <LanguageSwitch locale={locale} />
      </div>
    </>
  );
}
