'use client';

import { useState, useEffect, useMemo } from 'react';

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

  // Get today's date in YYYY-MM-DD format
  const today = useMemo(() => {
    const date = new Date();
    return date.toISOString().split('T')[0];
  }, []);

  // Get current time in minutes since midnight
  const currentTimeMinutes = useMemo(() => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  }, []);

  // Check if a time slot should be disabled
  const isTimeDisabled = (timeString: string) => {
    if (formData.preferredDate !== today) return false;
    
    const [time, period] = timeString.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    let hour24 = hours;
    
    if (period === 'PM' && hours !== 12) hour24 += 12;
    if (period === 'AM' && hours === 12) hour24 = 0;
    
    const timeMinutes = hour24 * 60 + minutes;
    
    // Disable if less than 2 hours from now
    return timeMinutes < currentTimeMinutes + 120;
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-primary">Book Your Free 15-Minute Consultation</h3>
            <button 
              onClick={onClose}
              className="text-3xl text-foreground/60 hover:text-foreground transition-colors"
            >
              ×
            </button>
          </div>

          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-700 text-sm">🔒 This form is securely encrypted. No insurance information needed for free consultations.</p>
          </div>

          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 font-medium">Thank you! Your consultation request has been submitted. We&apos;ll contact you within 24 hours to confirm your appointment.</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 font-medium">There was an error submitting your form. Please try again or call us directly.</p>
            </div>
          )}

          <form onSubmit={submitBookingForm} className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-primary">Required Information</h4>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-1">First Name *</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    name="firstName" 
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required 
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-1">Last Name *</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    name="lastName" 
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required 
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">Email Address *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">Phone Number *</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    required 
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      phoneError 
                        ? 'border-red-300 focus:ring-red-500' 
                        : 'border-border focus:ring-primary'
                    }`}
                  />
                  {phoneError && (
                    <p className="mt-1 text-sm text-red-600">{phoneError}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-foreground mb-1">City *</label>
                  <input 
                    type="text" 
                    id="city" 
                    name="city" 
                    value={formData.city}
                    onChange={handleInputChange}
                    required 
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-foreground mb-1">State *</label>
                  <select 
                    id="state" 
                    name="state" 
                    value={formData.state}
                    onChange={handleInputChange}
                    required 
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select State</option>
                    <option value="VA">Virginia</option>
                    <option value="MD">Maryland</option>
                    <option value="WV">West Virginia</option>
                    <option value="DC">Washington DC</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-foreground mb-1">Gender *</label>
                  <select 
                    id="gender" 
                    name="gender" 
                    value={formData.gender}
                    onChange={handleInputChange}
                    required 
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer Not to Say">Prefer Not to Say</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="reasonForVisit" className="block text-sm font-medium text-foreground mb-1">What would you like to discuss? *</label>
                  <select 
                    id="reasonForVisit" 
                    name="reasonForVisit" 
                    value={formData.reasonForVisit}
                    onChange={handleInputChange}
                    required 
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
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

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="preferredDate" className="block text-sm font-medium text-foreground mb-1">Preferred Date *</label>
                  <input 
                    type="date" 
                    id="preferredDate" 
                    name="preferredDate" 
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    min={today}
                    required 
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="preferredTime" className="block text-sm font-medium text-foreground mb-1">Preferred Time *</label>
                  <select 
                    id="preferredTime" 
                    name="preferredTime" 
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    required 
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select preferred time</option>
                    {[
                      "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
                      "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
                      "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM"
                    ].map(time => (
                      <option 
                        key={time} 
                        value={time} 
                        disabled={isTimeDisabled(time)}
                        style={isTimeDisabled(time) ? {color: '#9ca3af', backgroundColor: '#f9fafb'} : {}}
                      >
                        {time} {isTimeDisabled(time) ? '(unavailable)' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Optional Section */}
            <div className="space-y-4 pt-6 border-t">
              <div>
                <h4 className="text-lg font-semibold text-primary">Optional but Helpful</h4>
                <p className="text-sm text-foreground/70 mb-4">These fields help us better prepare for your consultation, but are not required.</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="birthMonth" className="block text-sm font-medium text-foreground mb-1">Date of Birth</label>
                  <div className="grid grid-cols-2 gap-2">
                    <select 
                      id="birthMonth" 
                      name="birthMonth" 
                      value={formData.birthMonth}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
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
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
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
                  <label htmlFor="zipCode" className="block text-sm font-medium text-foreground mb-1">ZIP Code</label>
                  <input 
                    type="text" 
                    id="zipCode" 
                    name="zipCode" 
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="12345"
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-foreground mb-1">Address</label>
                <input 
                  type="text" 
                  id="address" 
                  name="address" 
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Street Address"
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="sessionFormat" className="block text-sm font-medium text-foreground mb-1">Session Format Preference</label>
                <select 
                  id="sessionFormat" 
                  name="sessionFormat" 
                  value={formData.sessionFormat}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select format preference</option>
                  <option value="in-person">In-Person</option>
                  <option value="telehealth">Telehealth/Video</option>
                  <option value="either">Either In-Person or Telehealth</option>
                </select>
              </div>

              <div>
                <label htmlFor="questions" className="block text-sm font-medium text-foreground mb-1">Questions about my approach or anything else you&apos;d like to know?</label>
                <textarea 
                  id="questions" 
                  name="questions" 
                  value={formData.questions}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Questions about therapy approach, scheduling, insurance, etc..."
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-vertical"
                />
              </div>
            </div>

            {/* Consultation Agreement */}
            <div className="space-y-4 pt-6 border-t">
              <h4 className="text-lg font-semibold text-primary">Consultation Agreement</h4>
              
              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="consultationAgreement" 
                    checked={formData.consultationAgreement}
                    onChange={handleInputChange}
                    required
                    className="mt-1 h-4 w-4 text-primary border-border rounded focus:ring-2 focus:ring-primary"
                  />
                  <span className="text-sm text-foreground">I understand this is a free 15-minute consultation to explore therapy options and determine if Michael Ellis, LCSW is a good fit for my needs.</span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="confidentialityAgreement" 
                    checked={formData.confidentialityAgreement}
                    onChange={handleInputChange}
                    required
                    className="mt-1 h-4 w-4 text-primary border-border rounded focus:ring-2 focus:ring-primary"
                  />
                  <span className="text-sm text-foreground">I understand that my information will be kept confidential and used only for scheduling this consultation.</span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="contactConsent" 
                    checked={formData.contactConsent}
                    onChange={handleInputChange}
                    required
                    className="mt-1 h-4 w-4 text-primary border-border rounded focus:ring-2 focus:ring-primary"
                  />
                  <span className="text-sm text-foreground">I consent to being contacted via the methods provided above for consultation scheduling.</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t">
              <button 
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Book Consultation'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}