'use client';

import { useEffect, useState } from 'react';
import { SITE } from '@/components/site';
import { useConsultation } from '@/components/consultation-context';

// Mobile-only bottom bar. Hidden while the hero (which has its own CTAs) is on
// screen, fades in once the visitor scrolls past it.
export default function StickyCta() {
  const [heroVisible, setHeroVisible] = useState(true);
  const { openConsultation } = useConsultation();

  useEffect(() => {
    const hero = document.getElementById('home');
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-2 gap-px bg-plum-ink/95 backdrop-blur transition-opacity duration-300 md:hidden"
      style={{
        opacity: heroVisible ? 0 : 1,
        pointerEvents: heroVisible ? 'none' : 'auto',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
      aria-hidden={heroVisible}
    >
      <a
        href={SITE.phoneHref}
        className="flex items-center justify-center gap-2 py-4 text-sm font-semibold text-white"
        tabIndex={heroVisible ? -1 : 0}
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" strokeLinejoin="round" />
        </svg>
        Call
      </a>
      <button
        type="button"
        onClick={openConsultation}
        className="flex items-center justify-center bg-caramel py-4 text-sm font-semibold text-white"
        tabIndex={heroVisible ? -1 : 0}
      >
        Free Consultation
      </button>
    </div>
  );
}
