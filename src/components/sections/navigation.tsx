'use client';

import { useEffect, useState } from 'react';
import { NAV_LINKS, SITE } from '@/components/site';
import { useConsultation } from '@/components/consultation-context';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openConsultation } = useConsultation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled || isMenuOpen
          ? 'bg-parchment/95 shadow-[0_1px_0_0_rgba(62,51,70,0.08),0_12px_30px_-18px_rgba(62,51,70,0.35)] backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8" aria-label="Main">
        <a href="#home" onClick={closeMenu} className="group flex flex-col leading-none">
          <span
            className={`font-serif text-xl font-semibold tracking-tight transition-colors sm:text-2xl ${
              scrolled || isMenuOpen ? 'text-plum-ink' : 'text-white'
            }`}
          >
            {SITE.shortName}
          </span>
          <span
            className={`mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] transition-colors ${
              scrolled || isMenuOpen ? 'text-caramel' : 'text-sand'
            }`}
          >
            {SITE.clinician}
          </span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  scrolled ? 'text-ink-soft hover:text-plum-ink' : 'text-white/85 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={SITE.phoneHref}
            className={`text-sm font-semibold transition-colors ${
              scrolled ? 'text-plum-ink hover:text-caramel' : 'text-white hover:text-sand'
            }`}
          >
            {SITE.phoneDisplay}
          </a>
          <button type="button" onClick={openConsultation} className="btn btn-caramel btn-sm">
            Free consultation
          </button>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full lg:hidden"
          onClick={() => setIsMenuOpen(open => !open)}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className={`block h-0.5 w-6 rounded transition-all duration-300 ${
                scrolled || isMenuOpen ? 'bg-plum-ink' : 'bg-white'
              } ${
                isMenuOpen && i === 0 ? 'translate-y-2 rotate-45' : ''
              } ${isMenuOpen && i === 1 ? 'opacity-0' : ''} ${
                isMenuOpen && i === 2 ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          ))}
        </button>
      </nav>

      {isMenuOpen && (
        <div id="mobile-menu" className="border-t border-sand/70 bg-parchment px-5 pb-6 pt-2 lg:hidden">
          <ul className="flex flex-col">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className="block border-b border-sand/60 py-3.5 font-serif text-xl text-plum-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                closeMenu();
                openConsultation();
              }}
              className="btn btn-caramel w-full"
            >
              Book a free consultation
            </button>
            <a href={SITE.phoneHref} className="btn btn-outline-plum w-full">
              Call {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
