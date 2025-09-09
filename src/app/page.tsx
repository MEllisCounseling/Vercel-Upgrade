import Navigation from '@/components/sections/navigation';
import Hero from '@/components/sections/hero';
import Booking from '@/components/sections/booking';
import Approach from '@/components/sections/approach';
import About from '@/components/sections/about';
import Contact from '@/components/sections/contact';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Booking />
      <Approach />
      <About />
      <Contact />
    </div>
  );
}
