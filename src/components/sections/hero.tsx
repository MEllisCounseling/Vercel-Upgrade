'use client';

import Image from 'next/image';
import { SITE } from '@/components/site';
import { useConsultation } from '@/components/consultation-context';

export default function Hero() {
  const { openConsultation } = useConsultation();

  return (
    <section id="home" className="relative isolate flex min-h-[92vh] items-end overflow-hidden bg-plum-ink text-white">
      {/* Photo, then a uniform wash, then a directional gradient for the text zone */}
      <Image
        src="/images/boat-on-lake.jpg"
        alt="Peaceful therapy environment"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        quality={70}
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-plum-ink/70" aria-hidden="true" />
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(100deg, rgba(62,51,70,0.55) 0%, rgba(62,51,70,0.15) 55%, rgba(62,51,70,0.45) 100%), linear-gradient(to top, rgba(62,51,70,0.85) 0%, rgba(62,51,70,0) 45%)',
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-36 sm:px-8 sm:pb-20 lg:pb-24 lg:pt-44">
        <div className="max-w-3xl">
          <p className="eyebrow text-sand">{SITE.name}</p>
          <h1 className="mt-5 font-serif text-5xl font-medium sm:text-6xl lg:text-7xl">
            Renew Your Mind,
            <br />
            <span className="italic text-sand">Heal Your Soul</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/88 sm:text-xl">
            Welcome to a therapy experience designed just for you. I&apos;m Michael Ellis, LCSW,
            committed to helping you broaden your perspective and discover peace and purpose as you
            move forward in your life.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button type="button" onClick={openConsultation} className="btn btn-caramel">
              Book Free Consultation
            </button>
            <a href={SITE.headwayUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light">
              Book via Headway
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M5 15 15 5M8 5h7v7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        {/* The practice's published facts, as the original footer listed them */}
        <dl className="mt-14 grid max-w-3xl grid-cols-1 gap-y-5 border-t border-white/20 pt-6 text-sm sm:grid-cols-3 sm:gap-x-8">
          <div>
            <dt className="eyebrow text-white/60">Therapist</dt>
            <dd className="mt-1.5 font-medium text-white">Michael Ellis, LCSW, Licensed Clinical Social Worker</dd>
          </div>
          <div>
            <dt className="eyebrow text-white/60">Location</dt>
            <dd className="mt-1.5 font-medium text-white">
              {SITE.addressLine1}, {SITE.addressLine2}
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-white/60">Contact</dt>
            <dd className="mt-1.5 font-medium text-white">
              <a href={SITE.phoneHref} className="hover:text-sand">
                {SITE.phoneDisplay}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
