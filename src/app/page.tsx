import dynamic from 'next/dynamic';
import Navigation from '@/components/sections/navigation';
import Hero from '@/components/sections/hero';

// Dynamically import components below the fold
const Booking = dynamic(() => import('@/components/sections/booking'), {
  loading: () => <div className="h-64 bg-gray-50/50" />,
});
const Approach = dynamic(() => import('@/components/sections/approach'), {
  loading: () => <div className="h-64 bg-gray-50/50" />,
});
const About = dynamic(() => import('@/components/sections/about'), {
  loading: () => <div className="h-64 bg-gray-50/50" />,
});
const Contact = dynamic(() => import('@/components/sections/contact'), {
  loading: () => <div className="h-32 bg-gray-50/50" />,
});

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <Hero />
        <Booking />
        <Approach />
        <About />
        <Contact />
      </main>
    </>
  );
}
