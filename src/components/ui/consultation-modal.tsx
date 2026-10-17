'use client';

import { useState, useEffect } from 'react';
import BookingCalendar from '@/components/ui/booking-calendar';
import {
  Availability,
  DEFAULT_SCHEDULE,
  PRACTICE_TIMEZONE,
  bookableSlotsForDate,
  nowInEastern,
} from '@/lib/availability';
import { SITE } from '@/components/site';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    gender: '',
    reasonForVisit: '',
    preferredDate: '',
    preferredTime: '',
    consultationType: '',
    previousTherapy: '',
    availability: '',
    questions: '',
    // Optional fields
    birthMonth: '',
    birthYear: '',
    zipCode: '',
    address: '',
    sessionFormat: '',
    // Consent checkboxes
    consultationAgreement: false,
    confidentialityAgreement: false,
    contactConsent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [phoneError, setPhoneError] = useState('');
  const [dateError, setDateError] = useState('');
  const [today, setToday] = useState('');
  const [currentTimeMinutes, setCurrentTimeMinutes] = useState(0);
  const [availability, setAvailability] = useState<Availability | null>(null);

  // Set today's date and current time only on client side to avoid hydration
  // mismatch, and refresh them each time the form opens. Both are computed in
  // Eastern Time, the practice's schedule timezone.
  useEffect(() => {
    const { date, minutes } = nowInEastern();
    setToday(date);
    setCurrentTimeMinutes(minutes);
  }, [isOpen]);

  // Load Mike's weekly hours and out-of-office dates when the modal opens
  useEffect(() => {
    if (!isOpen || availability) return;
    fetch('/api/availability')
      .then(res => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: Availability) => setAvailability(data))
      .catch(() => setAvailability({
        timezone: PRACTICE_TIMEZONE,
        schedule: DEFAULT_SCHEDULE,
        outOfOffice: [],
        fallback: true,
      }));
  }, [isOpen, availability]);

  // Time slots for the selected date: the weekday's hours minus any
  // out-of-office windows, and no sooner than the 12-hour lead time.
  const timeSlots = formData.preferredDate && availability && today
    ? bookableSlotsForDate(formData.preferredDate, availability, { date: today, minutes: currentTimeMinutes })
    : [];

  const handleDateSelect = (date: string) => {
    setFormData(prev => ({ ...prev, preferredDate: date, preferredTime: '' }));
  };

  // Validate phone number - allow numbers, spaces, dashes, parentheses, plus signs
  const validatePhone = (phone: string): string => {
    if (!phone) return '';
    
    // Check for letters or invalid characters
    const hasInvalidChars = /[a-zA-Z]/.test(phone);
    
    if (hasInvalidChars) {
      return 'Phone numbers should only contain numbers, spaces, dashes, parentheses, or plus signs';
    }
    
    return '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Validate phone number
    if (name === 'phone') {
      setPhoneError(validatePhone(value));
    }
  };

  const submitBookingForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.preferredDate || !formData.preferredTime) {
      setDateError('Please choose a date and time for your consultation.');
      return;
    }
    if (!formData.sessionFormat) {
      setDateError('Please select a session format preference.');
      return;
    }
    setDateError('');
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setPhoneError('');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          city: '',
          state: '',
          gender: '',
          reasonForVisit: '',
          preferredDate: '',
          preferredTime: '',
          consultationType: '',
          previousTherapy: '',
          availability: '',
          questions: '',
          birthMonth: '',
          birthYear: '',
          zipCode: '',
          address: '',
          sessionFormat: '',
          consultationAgreement: false,
          confidentialityAgreement: false,
          contactConsent: false
        });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Escape closes the dialog, as the X and Cancel buttons do.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-plum-ink/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="consultation-title">
      <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-parchment shadow-2xl">
        <div className="p-6 sm:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow text-caramel">Free 15-minute consultation</p>
              <h3 id="consultation-title" className="mt-1 font-serif text-3xl font-medium text-plum-ink">Book Your Free 15-Minute Consultation</h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-plum-ink transition-colors hover:bg-sand-light"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="m5 5 10 10M15 5 5 15" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="mb-5 flex items-start gap-3 rounded-xl border border-lake/30 bg-lake/10 p-3.5 text-sm text-lake-dark">
            <svg className="mt-0.5 h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <rect x="4" y="9" width="12" height="8" rx="1.5" />
              <path d="M7 9V6a3 3 0 0 1 6 0v3" strokeLinecap="round" />
            </svg>
            <p>This form is sent over a secure connection. No insurance information needed for free consultations.</p>
          </div>

          {submitStatus === 'success' && (
            <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4">
              <p className="font-medium text-green-800">Thank you! Your consultation request has been submitted. We&apos;ll contact you within 24 hours to confirm your appointment.</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
              <p className="font-medium text-red-800">There was an error submitting your form. Please try again or call us directly.</p>
            </div>
          )}

          <form onSubmit={submitBookingForm} className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-serif text-2xl font-medium text-plum-ink">Required Information</h4>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium text-plum-ink">First Name *</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    name="firstName" 
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required 
                    className="field"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium text-plum-ink">Last Name *</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    name="lastName" 
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required 
                    className="field"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-plum-ink">Email Address *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                    className="field"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-plum-ink">Phone Number *</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    required 
                    className={`field ${phoneError ? 'field-error' : ''}`}
                  />
                  {phoneError && (
                    <p className="mt-1.5 text-sm text-red-700">{phoneError}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="city" className="mb-1.5 block text-sm font-medium text-plum-ink">City *</label>
                  <input 
                    type="text" 
                    id="city" 
                    name="city" 
                    value={formData.city}
                    onChange={handleInputChange}
                    required 
                    className="field"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="mb-1.5 block text-sm font-medium text-plum-ink">State *</label>
                  <select 
                    id="state" 
                    name="state" 
                    value={formData.state}
                    onChange={handleInputChange}
                    required 
                    className="field"
                  >
                    <option value="">Select State</option>
                    <option value="VA">Virginia</option>
                    <option value="MD">Maryland</option>
                    <option value="WV">West Virginia</option>
                    <option value="DC">Washington DC</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="gender" className="mb-1.5 block text-sm font-medium text-plum-ink">Gender *</label>
                  <select 
                    id="gender" 
                    name="gender" 
                    value={formData.gender}
                    onChange={handleInputChange}
                    required 
                    className="field"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer Not to Say">Prefer Not to Say</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="reasonForVisit" className="mb-1.5 block text-sm font-medium text-plum-ink">What would you like to discuss? *</label>
                  <select 
                    id="reasonForVisit" 
                    name="reasonForVisit" 
                    value={formData.reasonForVisit}
                    onChange={handleInputChange}
                    required 
                    className="field"
                  >
                    <option value="">Select main area of interest</option>
                    <option value="anxiety">Anxiety</option>
                    <option value="depression">Depression</option>
                    <option value="relationship">Relationship Issues</option>
                    <option value="trauma">Trauma/PTSD</option>
                    <option value="grief">Grief/Loss</option>
                    <option value="stress">Stress Management</option>
                    <option value="life-transition">Life Transitions</option>
                    <option value="family">Family Issues</option>
                    <option value="work">Work/Career Issues</option>
                    <option value="self-esteem">Self-Esteem</option>
                    <option value="exploring">Just exploring therapy options</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <span className="mb-1.5 block text-sm font-medium text-plum-ink">Preferred Date *</span>
                  {today ? (
                    <BookingCalendar
                      selectedDate={formData.preferredDate}
                      onSelect={handleDateSelect}
                      availability={availability}
                      todayEastern={today}
                      nowMinutesEastern={currentTimeMinutes}
                    />
                  ) : (
                    <div className="rounded-xl border border-sand bg-white p-3 text-sm text-ink-soft">Loading calendar…</div>
                  )}
                </div>
                <div>
                  <label htmlFor="preferredTime" className="mb-1.5 block text-sm font-medium text-plum-ink">Preferred Time (Eastern Time) *</label>
                  <select
                    id="preferredTime"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    required
                    disabled={!formData.preferredDate || timeSlots.length === 0}
                    className="field"
                  >
                    <option value="">
                      {formData.preferredDate ? 'Select preferred time' : 'Select a date first'}
                    </option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1.5 text-xs text-ink-soft">
                    Times shown are US Eastern Time (ET). Consultations can be requested at least 12 hours ahead.
                  </p>
                  {dateError && (
                    <p className="mt-1.5 text-sm text-red-700">{dateError}</p>
                  )}
                </div>
              </div>

              <p className="rounded-xl border border-sand bg-parchment px-4 py-3 text-sm text-ink-soft">
                If you don&apos;t see a time that works, or you need to cancel or reschedule within 24
                hours of your consultation, please call{' '}
                <a href={SITE.phoneHref} className="font-semibold text-plum-ink underline decoration-sand underline-offset-4">
                  {SITE.phoneDisplay}
                </a>
                .
              </p>

              <div>
                <label htmlFor="sessionFormat" className="mb-1.5 block text-sm font-medium text-plum-ink">Session Format Preference *</label>
                <select 
                  id="sessionFormat" 
                  name="sessionFormat" 
                  value={formData.sessionFormat}
                  onChange={handleInputChange}
                  required
                  className="field"
                >
                  <option value="">Select format preference</option>
                  <option value="in-person">In-Person</option>
                  <option value="telehealth">Telehealth/Video</option>
                  <option value="either">Either In-Person or Telehealth</option>
                </select>
              </div>
            </div>

            {/* Optional Section */}
            <div className="space-y-4 border-t border-sand pt-6">
              <div>
                <h4 className="font-serif text-2xl font-medium text-plum-ink">Optional but Helpful</h4>
                <p className="mb-4 text-sm text-ink-soft">These fields help us better prepare for your consultation, but are not required.</p>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="birthMonth" className="mb-1.5 block text-sm font-medium text-plum-ink">Date of Birth</label>
                  <div className="grid grid-cols-2 gap-2">
                    <select 
                      id="birthMonth" 
                      name="birthMonth" 
                      value={formData.birthMonth}
                      onChange={handleInputChange}
                      className="field"
                    >
                      <option value="">Month</option>
                      <option value="01">January</option>
                      <option value="02">February</option>
                      <option value="03">March</option>
                      <option value="04">April</option>
                      <option value="05">May</option>
                      <option value="06">June</option>
                      <option value="07">July</option>
                      <option value="08">August</option>
                      <option value="09">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                    </select>
                    <select 
                      id="birthYear" 
                      name="birthYear" 
                      value={formData.birthYear}
                      onChange={handleInputChange}
                      className="field"
                    >
                      <option value="">Year</option>
                      {Array.from({ length: 80 }, (_, i) => {
                        const year = new Date().getFullYear() - i - 18;
                        return (
                          <option key={year} value={year}>{year}</option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="zipCode" className="mb-1.5 block text-sm font-medium text-plum-ink">ZIP Code</label>
                  <input 
                    type="text" 
                    id="zipCode" 
                    name="zipCode" 
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="12345"
                    className="field"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="address" className="mb-1.5 block text-sm font-medium text-plum-ink">Address</label>
                <input 
                  type="text" 
                  id="address" 
                  name="address" 
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Street Address"
                  className="field"
                />
              </div>

              <div>
                <label htmlFor="questions" className="mb-1.5 block text-sm font-medium text-plum-ink">Questions about my approach or anything else you&apos;d like to know?</label>
                <textarea 
                  id="questions" 
                  name="questions" 
                  value={formData.questions}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Questions about therapy approach, scheduling, insurance, etc..."
                  className="field resize-y"
                />
              </div>
            </div>

            {/* Consultation Agreement */}
            <div className="space-y-4 border-t border-sand pt-6">
              <h4 className="font-serif text-2xl font-medium text-plum-ink">Consultation Agreement</h4>
              
              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="consultationAgreement" 
                    checked={formData.consultationAgreement}
                    onChange={handleInputChange}
                    required
                    className="mt-1 h-4 w-4 shrink-0 rounded border-sand accent-plum-ink"
                  />
                  <span className="text-sm text-ink">I understand this is a free 15-minute consultation to explore therapy options and determine if Michael Ellis, LCSW is a good fit for my needs.</span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="confidentialityAgreement" 
                    checked={formData.confidentialityAgreement}
                    onChange={handleInputChange}
                    required
                    className="mt-1 h-4 w-4 shrink-0 rounded border-sand accent-plum-ink"
                  />
                  <span className="text-sm text-ink">I understand that my information will be kept confidential and used only for scheduling this consultation.</span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="contactConsent" 
                    checked={formData.contactConsent}
                    onChange={handleInputChange}
                    required
                    className="mt-1 h-4 w-4 shrink-0 rounded border-sand accent-plum-ink"
                  />
                  <span className="text-sm text-ink">I consent to being contacted via the methods provided above for consultation scheduling.</span>
                </label>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-sand pt-6 sm:flex-row sm:justify-end">
              <button 
                type="button"
                onClick={onClose}
                className="btn btn-outline-plum"
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="btn btn-caramel disabled:opacity-60"
              >
                {isSubmitting ? 'Submitting…' : 'Book Consultation'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}