'use client';

import Image from 'next/image';

export default function Hero() {
  const scrollToBooking = () => {
    const element = document.getElementById('booking');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center pt-20" style={{background: 'linear-gradient(135deg, var(--hero-gradient-start) 0%, var(--hero-gradient-middle) 50%, var(--hero-gradient-end) 100%)'}}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6 ml-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-white">
              Winchester Therapy Services LLC
            </h1>
            <h2 className="text-2xl lg:text-3xl text-white/95">
              Renew Your Mind, Heal Your Soul
            </h2>
            <p className="text-lg text-white/90 leading-relaxed">
              Welcome to a therapy experience designed just for you. I&apos;m Michael Ellis, LCSW, 
              committed to helping you broaden your perspective and discover peace and purpose 
              as you move forward in your life.
            </p>
            <button 
              onClick={scrollToBooking}
              className="px-8 py-3 rounded-lg transition-all duration-300 font-medium text-white cursor-pointer hover:transform hover:-translate-y-1"
              style={{backgroundColor: 'var(--button-secondary)', boxShadow: '0 5px 15px rgba(139, 111, 71, 0.5)'}}
              onMouseOver={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.backgroundColor = 'var(--button-secondary-hover)';
                target.style.transform = 'translateY(-4px)';
                target.style.boxShadow = '0 7px 20px rgba(139, 111, 71, 0.6)';
              }}
              onMouseOut={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.backgroundColor = 'var(--button-secondary)';
                target.style.transform = 'translateY(0)';
                target.style.boxShadow = '0 5px 15px rgba(139, 111, 71, 0.5)';
              }}
            >
              Learn More
            </button>
          </div>
          <div className="flex-1 flex justify-center">
            <Image 
              src="/images/Boat_on_lake.jpg" 
              alt="Peaceful therapy environment" 
              width={750}
              height={456}
              className="rounded-lg shadow-lg"
              priority
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, 750px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}