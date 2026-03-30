"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import GlowButton from "@/components/GlowButton";
import { useTypewriter } from "@/lib/hooks";
import { useLang } from "@/lib/i18n";

export default function HeroSection() {
  const { t } = useLang();

  const typedText = useTypewriter(t.hero.roles, 80, 40, 2000);

  const scrollToPortfolio = () => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="relative mx-auto mb-10 w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue opacity-20 blur-xl animate-glow-pulse" />
          <motion.div
            whileHover={{ scale: 1.06 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative w-full h-full rounded-full overflow-hidden animate-float"
            style={{
              border: "3px solid rgba(0, 240, 255, 0.35)",
              boxShadow:
                "0 0 25px rgba(0, 240, 255, 0.2), 0 0 50px rgba(0, 240, 255, 0.08), 0 8px 32px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Image
              src="/images/profile.png"
              alt="Nihat Akkaya"
              fill
              sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, 208px"
              className="object-cover"
              priority
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-5">
            {t.hero.greeting}{" "}
            <span className="text-gradient">Nihat</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <p className="text-2xl sm:text-3xl text-gray-300">
            <span className="text-neon-cyan font-semibold">
              {typedText}
              <span className="animate-pulse">|</span>
            </span>
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {t.hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <GlowButton variant="primary" onClick={scrollToPortfolio}>
            <ArrowDown size={20} />
            {t.hero.viewWork}
          </GlowButton>
        </motion.div>
      </div>

    </section>
  );
}
