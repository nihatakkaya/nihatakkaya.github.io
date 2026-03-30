"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Award, BookOpen, ChevronDown } from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";
import GlowCard from "@/components/GlowCard";
import { useLang } from "@/lib/i18n";

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
                  <div className="p-6 flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                        <h4 className="font-semibold text-white text-lg">{item.degree}</h4>
                        <span className="text-sm px-3 py-1 rounded-full bg-neon-cyan/10 text-neon-cyan font-medium whitespace-nowrap flex-shrink-0">
                          {item.year}
                        </span>
                      </div>
                      <p className="text-base text-neon-cyan/70">{item.institution}</p>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown size={22} className="text-neon-cyan/60" />
                    </motion.div>
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

        {/* Certifications Column — unchanged */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Award className="text-neon-cyan" size={30} />
            <h3 className="text-2xl font-semibold text-white">{t.education.certificationsLabel}</h3>
          </div>
          <div className="space-y-5">
            {t.education.certs.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <GlowCard className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-blue/20 flex items-center justify-center flex-shrink-0">
                    <BookOpen size={26} className="text-neon-cyan" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-white text-base">{cert.name}</h4>
                    <p className="text-sm text-gray-400 mt-0.5">{cert.issuer}</p>
                  </div>
                  <span className="ml-auto text-sm px-3 py-1 rounded-full bg-neon-cyan/10 text-neon-cyan whitespace-nowrap flex-shrink-0 font-medium">
                    {cert.year}
                  </span>
                </GlowCard>
              </motion.div>
            ))}
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
