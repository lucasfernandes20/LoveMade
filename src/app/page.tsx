import Footer from "@/modules/footer";
import HeroSection from "@/modules/hero-section";
import HowItWorks from "@/modules/how-it-works";
import Prices from "@/modules/prices";

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

