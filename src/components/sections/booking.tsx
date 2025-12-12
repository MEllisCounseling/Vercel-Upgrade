'use client';

import { useState } from 'react';
import ConsultationModal from '../ui/consultation-modal';

export default function Booking() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showConsultationForm = () => {
    setIsModalOpen(true);
  };

  const hideConsultationForm = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <section id="booking" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Schedule Your Appointment</h2>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
              Ready to take the next step in your healing journey? Choose your preferred way to book your appointment.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-50 p-8 rounded-lg shadow-md border border-gray-200 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-lg">
              <h3 className="text-xl font-semibold text-primary mb-4">Book Through Headway</h3>
              <p className="text-foreground/80 mb-6 leading-relaxed">
                We partner with Headway.co for billing, insurance, and scheduling. Their team is highly responsive. 
                If you have any questions about appointments or billing, feel free to give us a call—we&apos;ll get back to you within 24 hours.
              </p>
              <a 
                href="https://care.headway.co/providers/michael-ellis-2?utm_source=pem&utm_medium=direct_link&utm_campaign=46377" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-light transition-all duration-300 font-medium cursor-pointer hover:transform hover:-translate-y-1 hover:shadow-lg"
              >
                Book via Headway
              </a>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg shadow-md border border-gray-200 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-lg">
              <h3 className="text-xl font-semibold text-primary mb-4">Free 15-Minute Consultation</h3>
              <p className="text-foreground/80 mb-6 leading-relaxed">
                Not sure if we&apos;re the right fit? Schedule a complimentary 15-minute consultation to meet Michael, 
                discuss your goals, and see if his approach aligns with your needs—no commitment required.
              </p>
              <button
                onClick={showConsultationForm}
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-light transition-all duration-300 font-medium cursor-pointer hover:transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                style={{ backgroundColor: '#5a4a62' }}
              >
                Book Free Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      <ConsultationModal 
        isOpen={isModalOpen} 
        onClose={hideConsultationForm} 
      />
    </>
  );
}