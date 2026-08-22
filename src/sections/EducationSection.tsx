"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Award, ChevronDown } from "lucide-react";
import Image from "next/image";
import SectionWrapper from "@/components/SectionWrapper";
import GlowCard from "@/components/GlowCard";
import { certifications, getIssuerLogo } from "@/lib/certifications";
import { useLang } from "@/lib/i18n";

const UNIVERSITY_LOGO_SRC = "/images/logos/subu.svg";

export default function EducationSection() {
  const { t } = useLang();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <SectionWrapper id="education">
      <div className="text-center mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold mb-4"
        >
          <span className="text-gradient">{t.education.title}</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-gray-400 text-lg"
        >
          {t.education.subtitle}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Education Column — Accordion */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="text-neon-cyan" size={30} />
            <h3 className="text-2xl font-semibold text-white">{t.education.educationLabel}</h3>
          </div>
          <div className="space-y-4">
            {t.education.degrees.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <div
                  onClick={() => toggleExpand(index)}
                  className="glass-card glow-border rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-neon-cyan/35 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]"
                >
                  {/* Header — Always visible */}
                  <div className="flex items-start gap-4 p-5 sm:p-6">
                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl border border-neon-cyan/15 bg-white/95 p-2 shadow-[0_0_18px_rgba(0,240,255,0.08)] sm:h-16 sm:w-16">
                      <Image
                        src={UNIVERSITY_LOGO_SRC}
                        alt={`${item.institution} logo`}
                        width={64}
                        height={64}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <h4 className="break-words text-lg font-semibold leading-snug text-white">
                            {item.degree}
                          </h4>
                          <p className="mt-1 break-words text-base leading-snug text-neon-cyan/70">
                            {item.institution}
                          </p>
                        </div>

                        <div className="flex flex-shrink-0 items-center justify-between gap-3 sm:justify-end">
                          <span className="whitespace-nowrap rounded-full bg-neon-cyan/10 px-3 py-1 text-sm font-medium text-neon-cyan">
                            {item.year}
                          </span>
                          <motion.div
                            animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex-shrink-0"
                          >
                            <ChevronDown size={22} className="text-neon-cyan/60" />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {expandedIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-0 border-t border-neon-cyan/10">
                          {/* Highlights */}
                          {item.highlights.length > 0 && (
                            <div className="mt-4">
                              <h5 className="text-sm font-semibold text-neon-cyan/80 uppercase tracking-wider mb-3">
                                Highlights
                              </h5>
                              <ul className="space-y-2">
                                {item.highlights.map((h, hi) => (
                                  <li key={hi} className="flex items-start gap-2 text-gray-300 text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan/60 mt-1.5 flex-shrink-0" />
                                    {h}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Focus Areas */}
                          {item.focusAreas.length > 0 && (
                            <div className="mt-5">
                              <h5 className="text-sm font-semibold text-neon-cyan/80 uppercase tracking-wider mb-3">
                                Focus Areas
                              </h5>
                              <div className="flex flex-wrap gap-2">
                                {item.focusAreas.map((area, ai) => (
                                  <span
                                    key={ai}
                                    className="text-xs px-3 py-1.5 rounded-full bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 font-medium"
                                  >
                                    {area}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications Column */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Award className="text-neon-cyan" size={30} />
            <h3 className="text-2xl font-semibold text-white">{t.education.certificationsLabel}</h3>
          </div>
          <div className="space-y-5">
            {certifications.map((cert, index) => {
              const issuerLogo = getIssuerLogo(cert.issuer);
              const logoFrameClass = issuerLogo
                ? "bg-white/95 p-2"
                : "bg-gradient-to-br from-neon-cyan/20 to-neon-blue/20";

              return (
                <motion.div
                  key={`${cert.issuer}-${cert.name}`}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  viewport={{ once: true }}
                >
                  <GlowCard className="flex min-h-[88px] items-center gap-5 px-5 py-4 sm:px-6">
                    <div
                      className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-neon-cyan/15 shadow-[0_0_18px_rgba(0,240,255,0.08)] ${logoFrameClass}`}
                    >
                      {issuerLogo ? (
                        <Image
                          src={issuerLogo.src}
                          alt={issuerLogo.alt}
                          width={48}
                          height={48}
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <Award
                          size={25}
                          className="text-neon-cyan"
                          aria-label={`${cert.issuer} certificate issuer`}
                        />
                      )}
                    </div>
                    <h4 className="min-w-0 flex-1 text-base font-semibold leading-snug text-white break-words">
                      {cert.name}
                    </h4>
                  </GlowCard>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-10 text-center"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-neon-cyan/10 to-neon-blue/10 border border-neon-cyan/20">
              <span className="text-base text-neon-cyan">{t.education.alwaysLearning}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
