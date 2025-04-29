import Footer from "@/features/footer";
import HeroSection from "@/features/hero-section";
import HowItWorks from "@/features/how-it-works";
import Prices from "@/features/prices";

export default function Home() {
  return (
    <div>
      <main className="mx-auto">
        <HeroSection />
        <HowItWorks />
        <Prices />
      </main>
      <Footer />
    </div>
  );
}

