'use client';

import Image from 'next/image';
import { useState } from 'react';
import LocationModal from '../ui/location-modal';

export default function Approach() {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const showLocation = () => {
    setIsLocationModalOpen(true);
  };

  const hideLocation = () => {
    setIsLocationModalOpen(false);
  };

  return (
    <>
      <section id="approach" className="py-20" style={{background: 'linear-gradient(135deg, var(--approach-bg-start) 0%, var(--approach-bg-end) 100%)'}}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <Image 
                src="/images/Profile_Aug2018.jpg" 
                alt="Michael Ellis, LCSW" 
                width={400}
                height={500}
                className="rounded-lg shadow-lg w-full max-w-[250px] mx-auto"
              />
            </div>
            <div className="flex-1 space-y-6 mr-12">
              <h2 className="text-3xl font-bold text-primary">My Counseling Approach</h2>
              <p className="text-foreground/80 leading-relaxed">
                My counseling approach combines elements of Cognitive Behavioral Therapy (CBT) and Solution-Focused Brief Therapy (SFBT), 
                with additional influence from Motivational Interviewing techniques.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Above all, I want you to feel truly cared for, heard, and valued during our time together. If, at the end of a session, 
                you don't feel that way, then I want to know—because something has gone wrong. My priority is to get it right for you, 
                and if I'm not the best fit, I'll gladly connect you with a trusted therapist in my network who can better meet your needs.
              </p>
              <button 
                onClick={showLocation}
                className="px-6 py-3 rounded-lg transition-all duration-300 font-medium text-white cursor-pointer hover:transform hover:-translate-y-1"
                style={{backgroundColor: 'var(--button-primary)', boxShadow: '0 3px 10px rgba(122, 140, 168, 0.3)'}}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = 'var(--button-primary-hover)';
                  e.target.style.transform = 'translateY(-4px)';
                  e.target.style.boxShadow = '0 5px 15px rgba(122, 140, 168, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'var(--button-primary)';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 3px 10px rgba(122, 140, 168, 0.3)';
                }}
              >
                Location
              </button>
            </div>
          </div>
        </div>
      </section>

      <LocationModal 
        isOpen={isLocationModalOpen} 
        onClose={hideLocation} 
      />
    </>
  );
}