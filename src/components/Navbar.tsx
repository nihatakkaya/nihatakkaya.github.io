"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Wrench, FolderOpen, GraduationCap, Mail, Globe, Menu, X } from "lucide-react";
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
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const toggleLang = () => setLang(lang === "en" ? "tr" : "en");

  // Close mobile menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (mobileOpen) setMobileOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileOpen]);

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

      {/* Mobile top navbar - hamburger menu */}
      <div className="lg:hidden">
        {/* Hamburger button - fixed top right */}
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="fixed top-4 right-4 z-[60] p-3 rounded-xl transition-all duration-300"
          style={{
            background: mobileOpen ? "rgba(0, 240, 255, 0.12)" : "rgba(8, 12, 24, 0.9)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: `1px solid ${mobileOpen ? "rgba(0, 240, 255, 0.4)" : "rgba(0, 240, 255, 0.2)"}`,
            boxShadow: mobileOpen
              ? "0 0 30px rgba(0, 240, 255, 0.2), inset 0 0 15px rgba(0, 240, 255, 0.1)"
              : "0 0 20px rgba(0, 240, 255, 0.08), 0 4px 20px rgba(0, 0, 0, 0.3)",
          }}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={22} className="text-neon-cyan" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={22} className="text-neon-cyan" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-[55] bg-navy-900/60 backdrop-blur-sm"
                onClick={() => setMobileOpen(false)}
              />

              {/* Menu panel */}
              <motion.nav
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="fixed top-16 right-4 left-4 z-[58] rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(8, 12, 24, 0.95)",
                  backdropFilter: "blur(32px)",
                  WebkitBackdropFilter: "blur(32px)",
                  border: "1px solid rgba(0, 240, 255, 0.2)",
                  boxShadow:
                    "0 0 50px rgba(0, 240, 255, 0.1), 0 20px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(0, 240, 255, 0.1)",
                }}
              >
                <div className="p-4 space-y-1">
                  {navKeys.map((item, index) => {
                    const Icon = iconMap[item.icon];
                    const isActive = activeSection === item.id;
                    const label = t.nav[item.key];

                    return (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        onClick={() => scrollTo(item.id)}
                        className="relative w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200"
                        style={{
                          background: isActive ? "rgba(0, 240, 255, 0.08)" : "transparent",
                          border: isActive
                            ? "1px solid rgba(0, 240, 255, 0.25)"
                            : "1px solid transparent",
                        }}
                      >
                        <div
                          className="flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0"
                          style={{
                            background: isActive
                              ? "rgba(0, 240, 255, 0.15)"
                              : "rgba(0, 240, 255, 0.05)",
                            border: `1px solid ${isActive ? "rgba(0, 240, 255, 0.3)" : "rgba(0, 240, 255, 0.08)"}`,
                          }}
                        >
                          <Icon
                            size={20}
                            className={`transition-all duration-300 ${
                              isActive
                                ? "text-neon-cyan drop-shadow-[0_0_12px_rgba(0,240,255,0.8)]"
                                : "text-gray-500"
                            }`}
                          />
                        </div>
                        <span
                          className={`text-base font-medium transition-colors duration-200 ${
                            isActive ? "text-neon-cyan" : "text-gray-400"
                          }`}
                        >
                          {label}
                        </span>
                        {isActive && (
                          <motion.div
                            layoutId="activeMobileIndicator"
                            className="ml-auto w-2 h-2 rounded-full bg-neon-cyan"
                            style={{
                              boxShadow: "0 0 10px rgba(0, 240, 255, 0.6)",
                            }}
                          />
                        )}
                      </motion.button>
                    );
                  })}

                  {/* Divider */}
                  <div className="h-px bg-neon-cyan/10 mx-2 my-2" />

                  {/* Language toggle */}
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: navKeys.length * 0.05 }}
                    onClick={() => {
                      toggleLang();
                      setMobileOpen(false);
                    }}
                    className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200"
                    style={{ background: "transparent" }}
                  >
                    <div
                      className="flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0"
                      style={{
                        background: "rgba(0, 240, 255, 0.05)",
                        border: "1px solid rgba(0, 240, 255, 0.08)",
                      }}
                    >
                      <Globe size={20} className="text-gray-500" />
                    </div>
                    <span className="text-base font-medium text-gray-400">
                      {lang === "en" ? "Türkçe" : "English"}
                    </span>
                  </motion.button>
                </div>
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
