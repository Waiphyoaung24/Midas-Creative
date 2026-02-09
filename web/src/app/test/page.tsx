import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Ecosystem } from "@/components/Ecosystem";
import { StrategyDashboard } from "@/components/StrategyDashboard";
import { TrustSection } from "@/components/TrustSection";
import { Engagement } from "@/components/Engagement";
import { Footer } from "@/components/Footer";
import { DitherEffect } from "@/components/dither-effect";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-transparent text-white overflow-hidden selection:bg-midas/30 selection:text-white">
      {/* Interactive WebGL Bayer Dither Background */}
      <DitherEffect />

      <Navbar />
      <Hero />
      <Ecosystem />
      <StrategyDashboard />
      <TrustSection />
      <Engagement />
      <Footer />
    </main>
  );
}