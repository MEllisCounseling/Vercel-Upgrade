import type { ReactNode } from 'react';
import { ConsultationProvider } from '@/components/consultation-context';
import Navigation from '@/components/sections/navigation';
import Footer from '@/components/sections/footer';

interface LegalPageProps {
  eyebrow: string;
  title: ReactNode;
  effectiveDate: string;
  intro: ReactNode;
  children: ReactNode;
}

// Shared frame for /privacy and /terms: solid header (no hero behind it),
// a short title band, then a single readable column.
export default function LegalPage({ eyebrow, title, effectiveDate, intro, children }: LegalPageProps) {
  return (
    <ConsultationProvider>
      <Navigation solid />
      <main>
        <section className="bg-parchment grain">
          <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-32 sm:px-8 lg:pb-20 lg:pt-40">
            <div className="max-w-3xl">
              <p className="eyebrow text-caramel">{eyebrow}</p>
              <h1 className="mt-4 font-serif text-4xl font-medium text-plum-ink sm:text-5xl lg:text-6xl">{title}</h1>
              <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-ink-soft">Effective {effectiveDate}</p>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-soft">{intro}</div>
            </div>
          </div>
        </section>
        <section className="bg-cream">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
            <div className="legal max-w-3xl">{children}</div>
          </div>
        </section>
      </main>
      <Footer />
    </ConsultationProvider>
  );
}
