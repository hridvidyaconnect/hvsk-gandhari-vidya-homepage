import Header from "@/components/Header";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import GandhariVidyaSection from "@/components/sections/GandhariVidyaSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import FounderSection from "@/components/sections/FounderSection";
import EnrollSection from "@/components/sections/EnrollSection";
import FAQSection from "@/components/sections/FAQSection";
import Footer from "@/components/Footer";
import FloatingRibbon from "@/components/FloatingRibbon";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <GandhariVidyaSection />
      <BenefitsSection />
      <FounderSection />
      <EnrollSection />
      <FAQSection />
      <Footer />
      <FloatingRibbon />
    </main>
  );
};

export default Index;