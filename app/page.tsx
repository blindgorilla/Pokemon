import AudienceSection from "@/components/AudienceSection";
import CaseStudies from "@/components/CaseStudies";
import CollectorVsInvestor from "@/components/CollectorVsInvestor";
import DecisionResults from "@/components/DecisionResults";
import DisclaimerSection from "@/components/DisclaimerSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import FrameworkGrid from "@/components/FrameworkGrid";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import PrincipleBanner from "@/components/PrincipleBanner";
import ProblemSection from "@/components/ProblemSection";
import ProductContents from "@/components/ProductContents";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <PrincipleBanner />
        <FrameworkGrid />
        <DecisionResults />
        <CollectorVsInvestor />
        <CaseStudies />
        <ProductContents />
        <AudienceSection />
        <DisclaimerSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
