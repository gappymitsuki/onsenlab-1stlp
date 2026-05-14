import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Thermoregulation from "@/components/Thermoregulation";
import Mineral from "@/components/Mineral";
import Onsens from "@/components/Onsens";
import Process from "@/components/Process";
import Credibility from "@/components/Credibility";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";

export default function HomePage() {
  return (
    <>
      <Preloader />
      <Cursor />
      <SmoothScroll>
        <Header />
        <main>
          <Hero />
          <Thermoregulation />
          <Mineral />
          <Onsens />
          <Process />
          <Credibility />
          <FAQ />
          <FinalCTA />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
