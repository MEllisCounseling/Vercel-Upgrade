import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPage from '@/components/legal-page';
import { SITE } from '@/components/site';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The terms that apply to using the Winchester Therapy Services LLC website and its free consultation request form.',
  alternates: { canonical: '/terms' },
};

const EFFECTIVE = 'October 16, 2026';

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms"
      title={
        <>
          Terms of <span className="italic">Service</span>
        </>
      }
      effectiveDate={EFFECTIVE}
      intro={
        <>
          <p>
            These terms apply to this website, winchestertherapyservices.org, which is operated by{' '}
            {SITE.name}. By using the site you agree to them. They are short on purpose.
          </p>
          <p>
            They cover the website and its consultation request form only. The therapy itself is
            governed by the agreements you sign at intake, and sessions booked through Headway are
            also subject to Headway&apos;s terms.
          </p>
        </>
      }
    >
      <h2>This website is information, not therapy</h2>
      <p>
        Everything on this site describes the practice and how to get in touch. It is not therapy,
        counseling, or medical advice, and reading it does not make you a client. A therapist-client
        relationship begins only after you and Michael Ellis, LCSW have met, completed intake, and
        agreed to work together.
      </p>
      <p>
        The free 15-minute consultation is a conversation to see whether the practice is a good fit
        for you. It is not a treatment session and does not create an ongoing obligation for either
        of us.
      </p>

      <h2>If you need help right now</h2>
      <p>
        This website and its form are not for emergencies and are not monitored around the clock. If
        you are in crisis or in danger, call 911, or call or text 988 to reach the Suicide and Crisis
        Lifeline, available 24 hours a day.
      </p>

      <h2>Consultation requests</h2>
      <ul>
        <li>
          Submitting the form is a request, not a confirmed appointment. Your consultation is
          confirmed only when we contact you to confirm it.
        </li>
        <li>
          The dates and times shown in the calendar reflect current availability and can change
          before we confirm. We may offer an alternative time.
        </li>
        <li>
          Please give accurate contact details and submit the form only for yourself or for someone
          you are authorized to act for, such as your minor child.
        </li>
        <li>
          We may decline or cancel a consultation when the practice is not the right fit for what
          you need, and in that case we will try to point you toward someone who is.
        </li>
      </ul>

      <h2>Booking and payment through Headway</h2>
      <p>
        Ongoing sessions, billing, and insurance are handled through Headway, an independent
        company. When you follow a &ldquo;Book via Headway&rdquo; link you leave this site, and
        Headway&apos;s terms and privacy policy apply to what you do there. We are not responsible
        for Headway&apos;s website or service, though we are glad to help if you run into trouble
        with a booking.
      </p>

      <h2>Using the site</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Submit false information or requests on behalf of someone who has not asked you to.</li>
        <li>Use automated tools to scrape, flood, or probe the site or its forms.</li>
        <li>Attempt to access any part of the site or its systems that is not meant for the public.</li>
        <li>Use the site in any way that breaks the law or interferes with others using it.</li>
      </ul>

      <h2>Content and photographs</h2>
      <p>
        The text, photographs, and design of this site belong to {SITE.name} unless noted otherwise.
        You are welcome to view, print, or share links to the site for personal, non-commercial
        purposes. Please do not copy or republish the content or photographs without permission.
      </p>

      <h2>Links to other sites</h2>
      <p>
        The site links to Headway, Google Maps, and other third parties for your convenience. We do
        not control those sites and are not responsible for their content or practices.
      </p>

      <h2>Disclaimers and limits of liability</h2>
      <p>
        We work to keep the site accurate and available, but it is provided &ldquo;as is&rdquo;
        without warranties of any kind, and we cannot promise it will always be error-free or
        uninterrupted. To the extent the law allows, {SITE.name} is not liable for indirect or
        consequential losses arising from your use of this website. Nothing in these terms limits
        any responsibility the practice has to you as a client under the agreements you sign at
        intake or under Virginia law.
      </p>

      <h2>Privacy</h2>
      <p>
        How we handle the information you share through the site is described in our{' '}
        <Link href="/privacy">Privacy Policy</Link>, which forms part of these terms.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the Commonwealth of Virginia. Any dispute about this
        website will be handled in the courts serving Winchester, Virginia.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms from time to time. Changes take effect when posted here, with the
        effective date updated at the top of the page.
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
