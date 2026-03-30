"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";
import { useLang } from "@/lib/i18n";

const contacts = [
  {
    label: "GitHub",
    href: "https://github.com/nihatakkaya",
    icon: Github,
    color: "hover:text-white hover:border-white/30",
    glowHover: "hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nihatakkayaa/?skipRedirect=true",
    icon: Linkedin,
    color: "hover:text-blue-400 hover:border-blue-400/30",
    glowHover: "hover:shadow-[0_0_30px_rgba(96,165,250,0.2)]",
  },
  {
    label: "Email",
    href: "mailto:nihatakky@gmail.com",
    icon: Mail,
    color: "hover:text-neon-cyan hover:border-neon-cyan/30",
    glowHover: "hover:shadow-[0_0_30px_rgba(0,240,255,0.2)]",
  },
];

export default function ContactSection() {
  const { t } = useLang();

  return (
    <SectionWrapper id="contact">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold mb-5"
        >
          {t.contact.title1} <span className="text-gradient">{t.contact.title2}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-gray-400 text-xl sm:text-2xl mb-12"
        >
          {t.contact.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative rounded-2xl p-10 sm:p-12 overflow-hidden"
          style={{
            background: "rgba(13, 18, 36, 0.65)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(0, 240, 255, 0.15)",
            boxShadow:
              "0 0 40px rgba(0, 240, 255, 0.08), 0 0 80px rgba(0, 120, 255, 0.04), inset 0 0 30px rgba(0, 240, 255, 0.04)",
          }}
        >
          {/* Cyan glow top-center */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-36 rounded-full blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(0,200,255,0.18), transparent 70%)" }}
          />
          {/* Cyan glow bottom-left */}
          <div
            className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-56 h-56 rounded-full blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(0,180,255,0.1), transparent 70%)" }}
          />
          {/* Blue glow bottom-right */}
          <div
            className="absolute bottom-0 right-0 translate-y-1/3 translate-x-1/4 w-56 h-56 rounded-full blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(0,100,255,0.08), transparent 70%)" }}
          />

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-5">
            {contacts.map((contact, index) => {
              const Icon = contact.icon;
              return (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  target={contact.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={contact.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-3 px-8 py-4 rounded-full text-gray-400 transition-all duration-300 text-lg ${contact.color} ${contact.glowHover}`}
                  style={{
                    border: "1px solid rgba(0, 240, 255, 0.1)",
                    background: "rgba(0, 200, 255, 0.04)",
                    boxShadow: "0 0 15px rgba(0, 200, 255, 0.05), inset 0 0 15px rgba(0, 200, 255, 0.02)",
                  }}
                >
                  <Icon size={24} />
                  <span className="font-medium">{contact.label}</span>
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-14 text-base text-gray-600"
        >
          {t.contact.footer}
        </motion.p>
      </div>
    </SectionWrapper>
  );
}
