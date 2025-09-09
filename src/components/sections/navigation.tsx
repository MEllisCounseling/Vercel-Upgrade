'use client';

import { useState } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-card/95 backdrop-blur-sm shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div 
            className="text-xl font-bold text-primary cursor-pointer"
            onClick={() => scrollToSection('home')}
          >
            Winchester Therapy Services
          </div>
          
          <ul className="hidden md:flex space-x-8">
            <li>
              <button 
                onClick={() => scrollToSection('home')} 
                className="text-foreground hover:text-primary transition-colors"
              >
                Home
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('booking')} 
                className="text-foreground hover:text-primary transition-colors"
              >
                Booking
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('approach')} 
                className="text-foreground hover:text-primary transition-colors"
              >
                Approach
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-foreground hover:text-primary transition-colors"
              >
                About
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="text-foreground hover:text-primary transition-colors"
              >
                Contact
              </button>
            </li>
          </ul>
          
          <button 
            className="md:hidden flex flex-col space-y-1"
            onClick={toggleMenu}
          >
            <span className={`w-6 h-0.5 bg-foreground transition-transform ${isMenuOpen ? 'transform rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-foreground transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-foreground transition-transform ${isMenuOpen ? 'transform -rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <ul className="flex flex-col space-y-4">
              <li>
                <button 
                  onClick={() => scrollToSection('home')} 
                  className="text-foreground hover:text-primary transition-colors block w-full text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('booking')} 
                  className="text-foreground hover:text-primary transition-colors block w-full text-left"
                >
                  Booking
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('approach')} 
                  className="text-foreground hover:text-primary transition-colors block w-full text-left"
                >
                  Approach
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="text-foreground hover:text-primary transition-colors block w-full text-left"
                >
                  About
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="text-foreground hover:text-primary transition-colors block w-full text-left"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}