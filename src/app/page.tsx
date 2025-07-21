import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Header />
        <HeroSection />
        <FeatureSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
