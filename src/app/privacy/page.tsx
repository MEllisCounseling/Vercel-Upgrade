import type { Metadata } from 'next';
import LegalPage from '@/components/legal-page';
import { SITE } from '@/components/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Winchester Therapy Services LLC handles the information you share through this website, including the free consultation request form.',
  alternates: { canonical: '/privacy' },
};

const EFFECTIVE = 'October 16, 2026';

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title={
        <>
          Privacy <span className="italic">Policy</span>
        </>
      }
      effectiveDate={EFFECTIVE}
      intro={
        <>
          <p>
            This policy explains what information this website collects, how {SITE.name} uses it,
            and the choices you have. It is written to be read, not skimmed past. If anything here
            is unclear, call or email and we will explain it plainly.
          </p>
          <p>
            It covers this website only. Once you become a client, your clinical records are
            protected under a separate Notice of Privacy Practices that you receive at intake, as
            required by HIPAA. Therapy sessions, billing, and insurance are handled through Headway,
            whose own privacy policy governs the information you give them.
          </p>
        </>
      }
    >
      <h2>Information you give us</h2>
      <p>
        The only place this website asks you for personal information is the free 15-minute
        consultation request form. When you submit it, we receive what you typed:
      </p>
      <ul>
        <li>Your first and last name, email address, and phone number.</li>
        <li>Your city and state, and optionally your street address and ZIP code.</li>
        <li>Your gender and, optionally, your birth month and year.</li>
        <li>What you would like to discuss, chosen from a short list, and any questions you add.</li>
        <li>Your preferred consultation date and time, and your preferred session format.</li>
        <li>The three agreement boxes you check before submitting.</li>
      </ul>
      <p>
        Please keep the form to what is needed to schedule the conversation. The details of what
        you are going through belong in the consultation itself, not in a web form.
      </p>

      <h2>How we use it</h2>
      <p>We use the information from the form to:</p>
      <ul>
        <li>Schedule and confirm your free consultation.</li>
        <li>Contact you by the phone number or email you provided, as you consented to on the form.</li>
        <li>Keep a record of your request so we can follow up and avoid double-booking.</li>
      </ul>
      <p>
        We do not sell your information, share it with advertisers, or add you to a mailing list.
        We do not use it for anything other than arranging and following up on your consultation.
      </p>

      <h2>Where it is stored</h2>
      <p>
        Form submissions travel over an encrypted connection (HTTPS) and are stored in Airtable, a
        cloud database service, in a workspace that only the practice can access. The schedule
        shown in the booking calendar is also read from Airtable; viewing it sends nothing about you.
      </p>
      <p>
        We keep consultation requests for as long as needed to schedule and follow up, and
        afterwards only as long as the practice&apos;s record-keeping requires. You can ask us to
        delete your request at any time using the contact details below.
      </p>

      <h2>Information collected automatically</h2>
      <p>
        This site uses Vercel Web Analytics and Speed Insights to count page views and measure how
        quickly pages load. These tools do not use cookies, do not track you across other websites,
        and do not build a profile of you. They record aggregate information such as the page
        visited, the country, the browser type, and the device type.
      </p>
      <p>
        Like almost every website, our hosting provider keeps standard server logs, which include IP
        addresses and the pages requested, for security and troubleshooting.
      </p>

      <h2>Third-party services on this site</h2>
      <ul>
        <li>
          <strong>Google Maps.</strong> The office map on the home page is loaded from Google. When
          it loads, Google receives the same information it would if you visited Google Maps
          directly, under Google&apos;s privacy policy.
        </li>
        <li>
          <strong>Headway.</strong> The &ldquo;Book via Headway&rdquo; links take you to Headway&apos;s
          website. Anything you enter there, including insurance and payment details, is collected
          by Headway under its own privacy policy and HIPAA safeguards.
        </li>
        <li>
          <strong>Vercel.</strong> This website is hosted on Vercel, which processes requests to the
          site on our behalf.
        </li>
      </ul>

      <h2>Email, phone, and text</h2>
      <p>
        Ordinary email, phone calls, and text messages are convenient but are not guaranteed to be
        private. By giving us your contact details you agree that we may use them to reach you
        about scheduling. If you would prefer that we not leave voicemails or send texts, tell us
        and we will note it.
      </p>
      <p>
        This website is not monitored around the clock. If you are in crisis or thinking about
        harming yourself, call or text 988 (the Suicide and Crisis Lifeline) or call 911.
      </p>

      <h2>Children</h2>
      <p>
        This website is not directed at children under 13, and we do not knowingly collect
        information from them through it. Questions about services for a minor should come from a
        parent or guardian by phone or email.
      </p>

      <h2>Your choices</h2>
      <p>
        You can ask to see, correct, or delete the information you submitted through this website,
        or ask us to stop contacting you, by emailing{' '}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or calling{' '}
        <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>. Requests about your clinical records
        after you become a client are handled under the Notice of Privacy Practices instead.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If we change how this website handles information, we will update this page and the
        effective date at the top. Continued use of the site after a change means you accept the
        updated policy.
      </p>

      <h2>Contact</h2>
      <p>
        {SITE.name}
        <br />
        {SITE.addressLine1}
        <br />
        {SITE.addressLine2}
        <br />
        <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>
        <br />
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </p>
    </LegalPage>
  );
}
