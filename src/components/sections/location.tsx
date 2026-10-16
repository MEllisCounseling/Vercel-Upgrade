import { SITE } from '@/components/site';

export default function Location() {
  return (
    <section id="contact" className="bg-parchment grain">
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-14">
          <div className="lg:col-span-5">
            <p className="eyebrow text-caramel">Location and contact</p>
            <h2 className="mt-4 font-serif text-4xl font-medium text-plum-ink sm:text-5xl">
              Second floor, <span className="italic">Amherst Street</span>.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              Sessions are held in person at the Winchester office or by telehealth. Either way,
              reaching Michael starts here.
            </p>

            <dl className="mt-10 space-y-7">
              <div className="flex gap-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sand-light text-plum-ink">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                    <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" strokeLinejoin="round" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </span>
                <div>
                  <dt className="text-sm font-semibold uppercase tracking-wider text-ink-soft">Office</dt>
                  <dd className="mt-1 text-lg text-plum-ink">
                    <address className="not-italic">
                      {SITE.addressLine1}
                      <br />
                      {SITE.addressLine2}
                    </address>
                  </dd>
                </div>
              </div>
              <div className="flex gap-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sand-light text-plum-ink">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" strokeLinejoin="round" />
                  </svg>
                </span>
                <div>
                  <dt className="text-sm font-semibold uppercase tracking-wider text-ink-soft">Phone</dt>
                  <dd className="mt-1 text-lg">
                    <a href={SITE.phoneHref} className="text-plum-ink underline decoration-sand underline-offset-4 hover:decoration-caramel">
                      {SITE.phoneDisplay}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex gap-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sand-light text-plum-ink">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" strokeLinejoin="round" />
                  </svg>
                </span>
                <div>
                  <dt className="text-sm font-semibold uppercase tracking-wider text-ink-soft">Email</dt>
                  <dd className="mt-1 text-lg break-all">
                    <a href={`mailto:${SITE.email}`} className="text-plum-ink underline decoration-sand underline-offset-4 hover:decoration-caramel">
                      {SITE.email}
                    </a>
                  </dd>
                </div>
              </div>
            </dl>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href={SITE.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-plum">
                Get directions
              </a>
              <a href={SITE.phoneHref} className="btn btn-outline-plum">
                Call the office
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-3xl border border-sand bg-sand-light shadow-[0_30px_60px_-35px_rgba(62,51,70,0.5)]">
              <iframe
                src={SITE.mapEmbedUrl}
                title="Map showing Winchester Therapy Services at 1220 Amherst Street, Winchester, VA"
                className="aspect-[4/3] w-full lg:aspect-auto lg:h-full lg:min-h-[520px]"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
