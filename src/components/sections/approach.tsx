import Image from 'next/image';

// The three approaches the site names, as an index to the paragraph beside it.
const MODALITIES = [
  { abbr: 'CBT', name: 'Cognitive Behavioral Therapy' },
  { abbr: 'SFBT', name: 'Solution-Focused Brief Therapy' },
  { abbr: 'MI', name: 'Motivational Interviewing' },
];

export default function Approach() {
  return (
    <section id="approach" className="bg-cream">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-x-14">
          <div className="lg:col-span-5">
            <figure className="mx-auto max-w-[320px] lg:sticky lg:top-28 lg:mx-0">
              <div className="relative">
                <div className="absolute left-4 top-4 h-full w-full rounded-[1.5rem] border border-sand" aria-hidden="true" />
                <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] bg-sand-light shadow-[0_30px_60px_-30px_rgba(62,51,70,0.45)]">
                  <Image
                    src="/images/michael-ellis.jpg"
                    alt="Michael Ellis, LCSW"
                    fill
                    sizes="320px"
                    className="object-cover object-top"
                  />
                </div>
              </div>
              <figcaption className="mt-9 text-center text-sm text-ink-soft lg:text-left">
                Michael Ellis, LCSW
              </figcaption>
            </figure>
          </div>

          <div className="lg:col-span-7">
            <p className="eyebrow text-caramel">Approach</p>
            <h2 className="mt-4 font-serif text-4xl font-medium text-plum-ink sm:text-5xl">
              My Counseling <span className="italic">Approach</span>
            </h2>
            <div className="mt-7 space-y-5 text-lg leading-relaxed text-ink-soft">
              <p>
                My counseling approach combines elements of Cognitive Behavioral Therapy (CBT) and
                Solution-Focused Brief Therapy (SFBT), with additional influence from Motivational
                Interviewing techniques.
              </p>
              <p>
                Above all, I want you to feel truly cared for, heard, and valued during our time
                together. If, at the end of a session, you don&apos;t feel that way, then I want to
                know, because something has gone wrong. My priority is to get it right for you, and
                if I&apos;m not the best fit, I&apos;ll gladly connect you with a trusted therapist in
                my network who can better meet your needs.
              </p>
            </div>

            <ul className="mt-10 divide-y divide-sand border-y border-sand">
              {MODALITIES.map(m => (
                <li key={m.abbr} className="grid items-baseline gap-1 py-4 sm:grid-cols-[5rem_1fr] sm:gap-6">
                  <span className="font-serif text-3xl font-medium text-caramel">{m.abbr}</span>
                  <span className="text-base font-semibold text-plum-ink">{m.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
