import Hero from "@/components/Hero";
import Science from "@/components/Science";
import HowItWorks from "@/components/HowItWorks";
import OnsenLayer from "@/components/OnsenLayer";
import TrustBar from "@/components/TrustBar";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="bg-bg-base text-text-primary">
      <Hero />
      <Science />
      <HowItWorks />
      <OnsenLayer />
      <TrustBar />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
