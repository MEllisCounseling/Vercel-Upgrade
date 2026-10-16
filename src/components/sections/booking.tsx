'use client';

import { SITE } from '@/components/site';
import { useConsultation } from '@/components/consultation-context';

export default function Booking() {
  const { openConsultation } = useConsultation();

  return (
    <section id="booking" className="bg-parchment grain">
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="max-w-2xl">
          <p className="eyebrow text-caramel">Booking</p>
          <h2 className="mt-4 font-serif text-4xl font-medium text-plum-ink sm:text-5xl">
            Schedule Your <span className="italic">Appointment</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            Ready to take the next step in your healing journey? Choose your preferred way to book
            your appointment.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          {/* Free consultation: the site's own form, live availability from the practice calendar */}
          <article className="relative flex flex-col overflow-hidden rounded-3xl bg-plum-ink p-8 text-white shadow-[0_40px_80px_-40px_rgba(62,51,70,0.7)] sm:p-10 lg:col-span-7">
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden="true"
              style={{ background: 'radial-gradient(22rem 18rem at 100% 0%, rgba(143,98,54,0.45), transparent 70%)' }}
            />
            <p className="eyebrow text-sand">No commitment</p>
            <h3 className="mt-3 font-serif text-3xl font-medium sm:text-4xl">Free 15-Minute Consultation</h3>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/85">
              Not sure if we&apos;re the right fit? Schedule a complimentary 15-minute consultation to
              meet Michael, discuss your goals, and see if his approach aligns with your needs. No
              commitment required.
            </p>
            <div className="mt-8">
              <button type="button" onClick={openConsultation} className="btn btn-caramel">
                Book Free Consultation
              </button>
            </div>
          </article>

          {/* Ongoing sessions through Headway */}
          <article className="flex flex-col rounded-3xl border border-sand bg-cream p-8 sm:p-10 lg:col-span-5">
            <p className="eyebrow text-caramel">Sessions</p>
            <h3 className="mt-3 font-serif text-3xl font-medium text-plum-ink sm:text-4xl">Book Through Headway</h3>
            <p className="mt-4 leading-relaxed text-ink-soft">
              We partner with Headway.co for billing, insurance, and scheduling. Their team is highly
              responsive. If you have any questions about appointments or billing, feel free to give
              us a call. We&apos;ll get back to you within 24 hours.
            </p>
            <div className="mt-auto pt-8">
              <a href={SITE.headwayUrl} target="_blank" rel="noopener noreferrer" className="btn btn-plum w-full sm:w-auto">
                Book via Headway
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M5 15 15 5M8 5h7v7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <p className="mt-5 text-sm text-ink-soft">
                Questions?{' '}
                <a href={SITE.phoneHref} className="font-semibold text-plum-ink underline decoration-sand underline-offset-4 hover:decoration-caramel">
                  Call {SITE.phoneDisplay}
                </a>
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
