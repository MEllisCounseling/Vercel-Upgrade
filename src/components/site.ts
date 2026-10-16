// Facts shared across sections. Every value comes from the practice's own
// published site (see klaudius/gathered-content.md).
export const SITE = {
  name: 'Winchester Therapy Services LLC',
  shortName: 'Winchester Therapy Services',
  clinician: 'Michael Ellis, LCSW',
  tagline: 'Renew Your Mind, Heal Your Soul',
  phoneDisplay: '(540) 431-7376',
  phoneHref: 'tel:+15404317376',
  email: 'Michaelfellislcsw@gmail.com',
  addressLine1: '1220 Amherst Street, Floor 2',
  addressLine2: 'Winchester, VA 22601',
  headwayUrl:
    'https://care.headway.co/providers/michael-ellis-2?utm_source=pem&utm_medium=direct_link&utm_campaign=46377',
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=' +
    encodeURIComponent('1220 Amherst Street, Floor 2, Winchester, VA 22601'),
  // Exact street address, not a business-name search, so the pin cannot drift.
  mapEmbedUrl:
    'https://www.google.com/maps?q=' +
    encodeURIComponent('1220 Amherst Street, Winchester, VA 22601') +
    '&z=15&output=embed',
  referralUrl: 'https://www.weblaunchacademy.com/?ref=YMQMF83P',
} as const;

export const NAV_LINKS = [
  { href: '#approach', label: 'Approach' },
  { href: '#focus', label: 'Areas of focus' },
  { href: '#booking', label: 'Booking' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
] as const;
