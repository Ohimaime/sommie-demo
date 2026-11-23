import BookingProvider from "@/components/BookingProvider";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import IntroVideo from "@/components/IntroVideo";
import MobileNav from "@/components/MobileNav";
import Reviews from "@/components/Reviews";
import Webinars from "@/components/Webinars";

export default function Home() {
  return (
    <BookingProvider>
      <Header />
      <main>
        <Hero />
        <div className="mx-auto max-w-5xl px-5">
          <div className="h-px bg-gold/40" />
        </div>
        <IntroVideo />
        <Webinars />
        <Reviews />
      </main>
      <Footer />
      <MobileNav />
    </BookingProvider>
  );
}
