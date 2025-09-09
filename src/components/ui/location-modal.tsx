'use client';

import { useEffect } from 'react';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LocationModal({ isOpen, onClose }: LocationModalProps) {
  const openNavigation = () => {
    const address = "1220 Amherst Street, Floor 2, Winchester, VA 22601";
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, '_blank');
  };

  const copyAddress = async () => {
    const address = "1220 Amherst Street, Floor 2, Winchester, VA 22601";
    try {
      await navigator.clipboard.writeText(address);
      alert('Address copied to clipboard!');
    } catch (err) {
      alert('Failed to copy address. Please copy manually: ' + address);
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
      <div className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-primary">Office Location</h3>
            <button 
              onClick={onClose}
              className="text-3xl text-foreground/60 hover:text-foreground transition-colors"
            >
              ×
            </button>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <p className="font-semibold text-primary">Winchester Therapy Services LLC</p>
              <p className="text-foreground">1220 Amherst Street, Floor 2</p>
              <p className="text-foreground">Winchester, VA 22601</p>
            </div>

            <div className="space-y-2">
              <p>
                <span className="font-medium">Email:</span>{' '}
                <a href="mailto:Michaelfellislcsw@gmail.com" className="text-primary hover:underline">
                  Michaelfellislcsw@gmail.com
                </a>
              </p>
              <p>
                <span className="font-medium">Phone:</span>{' '}
                <a href="tel:5404317376" className="text-primary hover:underline">
                  (540) 431-7376
                </a>
              </p>
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <button 
              onClick={openNavigation}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light transition-colors"
            >
              Get Directions
            </button>
            <button 
              onClick={copyAddress}
              className="border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors"
            >
              Copy Address
            </button>
          </div>

          <div className="rounded-lg overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3118.7856234567891!2d-78.1633!3d39.1856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDA3JzA4LjQiTiA3OMKwMTAnMzUuOSJX!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%" 
              height="300" 
              style={{border: 0}}
              allowFullScreen
              loading="lazy"
              title="Winchester Therapy Services Location"
            />
          </div>
        </div>
      </div>
    </div>
  );
}