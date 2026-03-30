"use client";

import { LangProvider } from "@/lib/i18n";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import HeroSection from "@/sections/HeroSection";
import SkillsSection from "@/sections/SkillsSection";
import PortfolioSection from "@/sections/PortfolioSection";
import EducationSection from "@/sections/EducationSection";
import ContactSection from "@/sections/ContactSection";

export default function Home() {
  return (
    <LangProvider>
      <AnimatedBackground />
      <Navbar />

      <main className="relative z-10 lg:pl-24">
        <HeroSection />
        <SkillsSection />
        <PortfolioSection />
        <EducationSection />
        <ContactSection />
      </main>

      <ScrollToTop />
    </LangProvider>
  );
}
