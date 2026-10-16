import { ConsultationProvider } from "@/components/consultation-context";
import Navigation from "@/components/sections/navigation";
import Hero from "@/components/sections/hero";
import Promise from "@/components/sections/promise";
import Approach from "@/components/sections/approach";
import Focus from "@/components/sections/focus";
import Booking from "@/components/sections/booking";
import Story from "@/components/sections/story";
import Personal from "@/components/sections/personal";
import Location from "@/components/sections/location";
import Footer from "@/components/sections/footer";
import StickyCta from "@/components/ui/sticky-cta";

export default function Home() {
  return (
    <ConsultationProvider>
      <Navigation />
      <main>
        <Hero />
        <Promise />
        <Approach />
        <Focus />
        <Booking />
        <Story />
        <Personal />
        <Location />
      </main>
      <Footer />
      <StickyCta />
    </ConsultationProvider>
  );
}
