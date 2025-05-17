import Footer from "@/features/footer";
import HeroSection from "@/features/hero-section";
import HowItWorks from "@/features/how-it-works";
import Prices from "@/features/prices";
import FAQs from "@/features/faqs";

export default function Home() {
  return (
    <div>
      <main className="mx-auto">
        <HeroSection />
        <HowItWorks />
        <Prices />
        <FAQs />
      </main>
      <Footer />
    </div>
  );
}

