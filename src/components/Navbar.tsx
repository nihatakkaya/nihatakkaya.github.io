"use client";

import { motion } from "framer-motion";
import { Home, Wrench, FolderOpen, GraduationCap, Mail, Globe } from "lucide-react";
import { useActiveSection } from "@/lib/hooks";
import { useLang } from "@/lib/i18n";

const iconMap = { Home, Wrench, FolderOpen, GraduationCap, Mail };

const navKeys = [
  { id: "home", icon: "Home" as const, key: "home" as const },
  { id: "skills", icon: "Wrench" as const, key: "skills" as const },
  { id: "portfolio", icon: "FolderOpen" as const, key: "portfolio" as const },
  { id: "education", icon: "GraduationCap" as const, key: "education" as const },
  { id: "contact", icon: "Mail" as const, key: "contact" as const },
];

export default function Navbar() {
  const activeSection = useActiveSection();
  const { lang, setLang, t } = useLang();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleLang = () => setLang(lang === "en" ? "tr" : "en");

  return (
    <>
      {/* Desktop sidebar */}
      <motion.nav
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="fixed left-5 top-0 bottom-0 z-50 hidden lg:flex flex-col items-center justify-center"
      >
        <div
          className="rounded-full py-5 px-3 flex flex-col items-center gap-2"
          style={{
            background: "rgba(8, 12, 24, 0.9)",
            backdropFilter: "blur(32px)",
            WebkitBackdropFilter: "blur(32px)",
            border: "1px solid rgba(0, 240, 255, 0.2)",
            boxShadow:
              "0 0 50px rgba(0, 240, 255, 0.1), inset 0 1px 0 rgba(0, 240, 255, 0.1), 0 8px 48px rgba(0, 0, 0, 0.5)",
          }}
        >
          {navKeys.map((item) => {
            const Icon = iconMap[item.icon];
            const isActive = activeSection === item.id;
            const label = t.nav[item.key];

            return (
              <motion.button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.85 }}
                className="relative p-3.5 rounded-full transition-all duration-300 group"
                aria-label={label}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(0,240,255,0.25) 0%, rgba(0,240,255,0.08) 50%, transparent 100%)",
                      border: "1px solid rgba(0, 240, 255, 0.55)",
                      boxShadow:
                        "0 0 28px rgba(0, 240, 255, 0.4), 0 0 56px rgba(0, 240, 255, 0.15), inset 0 0 20px rgba(0, 240, 255, 0.15)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.7 }}
                  />
                )}

                {!isActive && (
                  <span
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      boxShadow: "0 0 24px rgba(0, 240, 255, 0.3), inset 0 0 12px rgba(0, 240, 255, 0.1)",
                      border: "1px solid rgba(0, 240, 255, 0.25)",
                    }}
                  />
                )}

                <Icon
                  size={24}
                  className={`relative z-10 transition-all duration-300 ${
                    isActive
                      ? "text-neon-cyan drop-shadow-[0_0_12px_rgba(0,240,255,0.8)]"
                      : "text-gray-500 group-hover:text-neon-cyan group-hover:drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]"
                  }`}
                />

                <span
                  className="absolute left-full ml-4 px-3.5 py-2 text-sm font-medium rounded-lg whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0 -translate-x-1"
                  style={{
                    color: "#00f0ff",
                    background: "rgba(8, 12, 24, 0.95)",
                    border: "1px solid rgba(0, 240, 255, 0.3)",
                    boxShadow: "0 0 20px rgba(0, 240, 255, 0.15), 0 4px 16px rgba(0,0,0,0.4)",
                  }}
                >
                  {label}
                </span>
              </motion.button>
            );
          })}

          {/* Divider */}
          <div className="w-6 h-px bg-neon-cyan/15 my-1" />

          {/* Language toggle */}
          <motion.button
            onClick={toggleLang}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85 }}
            className="relative p-3.5 rounded-full transition-all duration-300 group"
            aria-label="Toggle Language"
          >
            <span
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                boxShadow: "0 0 24px rgba(0, 240, 255, 0.3), inset 0 0 12px rgba(0, 240, 255, 0.1)",
                border: "1px solid rgba(0, 240, 255, 0.25)",
              }}
            />
            <Globe
              size={20}
              className="relative z-10 text-gray-500 group-hover:text-neon-cyan group-hover:drop-shadow-[0_0_10px_rgba(0,240,255,0.5)] transition-all duration-300"
            />
            <span
              className="absolute left-full ml-4 px-3.5 py-2 text-sm font-medium rounded-lg whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0 -translate-x-1"
              style={{
                color: "#00f0ff",
                background: "rgba(8, 12, 24, 0.95)",
                border: "1px solid rgba(0, 240, 255, 0.3)",
                boxShadow: "0 0 20px rgba(0, 240, 255, 0.15), 0 4px 16px rgba(0,0,0,0.4)",
              }}
            >
              {lang === "en" ? "Türkçe" : "English"}
            </span>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile bottom navbar */}
      <motion.nav
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="fixed bottom-4 left-0 right-0 z-50 lg:hidden flex justify-center px-4"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <div
          className="rounded-full px-3 py-2.5 flex items-center gap-0.5 sm:gap-1 sm:px-4 w-auto max-w-full"
          style={{
            background: "rgba(8, 12, 24, 0.92)",
            backdropFilter: "blur(32px)",
            WebkitBackdropFilter: "blur(32px)",
            border: "1px solid rgba(0, 240, 255, 0.2)",
            boxShadow: "0 0 50px rgba(0, 240, 255, 0.1), 0 -4px 28px rgba(0, 0, 0, 0.4)",
          }}
        >
          {navKeys.map((item) => {
            const Icon = iconMap[item.icon];
            const isActive = activeSection === item.id;

            return (
              <motion.button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                whileTap={{ scale: 0.85 }}
                className="relative p-2.5 sm:p-3 rounded-full flex-shrink-0"
                aria-label={t.nav[item.key]}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeMobileNav"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "radial-gradient(circle, rgba(0,240,255,0.25) 0%, transparent 70%)",
                      border: "1px solid rgba(0, 240, 255, 0.5)",
                      boxShadow: "0 0 26px rgba(0, 240, 255, 0.35), inset 0 0 14px rgba(0, 240, 255, 0.12)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.7 }}
                  />
                )}

                <Icon
                  size={20}
                  className={`relative z-10 transition-all duration-300 ${
                    isActive
                      ? "text-neon-cyan drop-shadow-[0_0_12px_rgba(0,240,255,0.8)]"
                      : "text-gray-500"
                  }`}
                />
              </motion.button>
            );
          })}

          {/* Divider */}
          <div className="w-px h-5 bg-neon-cyan/15 mx-0.5 flex-shrink-0" />

          {/* Mobile lang toggle */}
          <motion.button
            onClick={toggleLang}
            whileTap={{ scale: 0.85 }}
            className="relative p-2.5 sm:p-3 rounded-full flex-shrink-0"
            aria-label="Toggle Language"
          >
            <Globe size={16} className="relative z-10 text-gray-500 transition-all duration-300" />
          </motion.button>
        </div>
      </motion.nav>
    </>
  );
}
