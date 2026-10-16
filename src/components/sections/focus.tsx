'use client';

import { useConsultation } from '@/components/consultation-context';

// The concerns the practice's own intake form lists, in its order.
const AREAS = [
  'Anxiety',
  'Depression',
  'Relationship issues',
  'Trauma and PTSD',
  'Grief and loss',
  'Stress management',
  'Life transitions',
  'Family issues',
  'Work and career',
  'Self-esteem',
  'Just exploring therapy',
];

export default function Focus() {
  const { openConsultation } = useConsultation();

  return (
    <section id="focus" className="relative isolate overflow-hidden bg-plum-ink text-white">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(40rem 28rem at 100% 0%, rgba(107,91,115,0.55), transparent 70%), radial-gradient(34rem 26rem at 0% 100%, rgba(91,122,148,0.35), transparent 70%)',
        }}
      />
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-5">
            <p className="eyebrow text-sand">Areas of focus</p>
            <h2 className="mt-4 font-serif text-4xl font-medium sm:text-5xl">
              Whatever brings you in, the first step is the <span className="italic text-sand">same</span>.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/80">
              A short, unhurried conversation to understand what you are facing and whether this is
              the right place to work on it.
            </p>
            <button type="button" onClick={openConsultation} className="btn btn-caramel mt-8">
              Start with a free consultation
            </button>
          </div>
          <ul className="flex flex-wrap content-start gap-3 lg:col-span-7 lg:pt-3">
            {AREAS.map(area => (
              <li
                key={area}
                className="rounded-full border border-white/25 bg-white/5 px-5 py-2.5 font-serif text-xl text-white/95 sm:text-2xl"
              >
                {area}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
