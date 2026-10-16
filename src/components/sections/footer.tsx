import { NAV_LINKS, SITE } from '@/components/site';

export default function Footer() {
  return (
    <footer className="bg-plum-ink text-white">
      <div className="mx-auto max-w-7xl px-5 pb-28 pt-14 sm:px-8 md:pb-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-serif text-2xl font-semibold tracking-tight">{SITE.shortName}</p>
            <p className="mt-1 text-sm uppercase tracking-[0.18em] text-sand">{SITE.clinician}</p>
            <p className="mt-5 max-w-sm font-serif text-xl italic text-white/80">{SITE.tagline}</p>
          </div>
          <div className="md:col-span-3">
            <p className="eyebrow text-white/60">On this page</p>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <a href={link.href} className="text-white/85 transition-colors hover:text-sand">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4">
            <p className="eyebrow text-white/60">Reach the office</p>
            <address className="mt-4 space-y-2.5 not-italic text-white/85">
              <p>
                {SITE.addressLine1}
                <br />
                {SITE.addressLine2}
              </p>
              <p>
                <a href={SITE.phoneHref} className="transition-colors hover:text-sand">
                  {SITE.phoneDisplay}
                </a>
              </p>
              <p>
                <a href={`mailto:${SITE.email}`} className="break-all transition-colors hover:text-sand">
                  {SITE.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved. Michael Ellis, LCSW,
            Licensed Clinical Social Worker.
          </p>
          <a
            href={SITE.referralUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-80"
          >
            Built with Web Launch Academy
          </a>
        </div>
      </div>
    </footer>
  );
}
