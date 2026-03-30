"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import SkillBar from "@/components/SkillBar";
import SkillsVisual from "@/components/SkillsVisual";
import { skills } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export default function SkillsSection() {
  const { t } = useLang();

  return (
    <SectionWrapper id="skills">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative flex items-center justify-center order-2 lg:order-1"
        >
          <SkillsVisual />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="order-1 lg:order-2"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">
            {t.skills.title1}{t.skills.title1 && " "}<span className="text-gradient">{t.skills.title2}</span>
          </h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            {t.skills.description}
          </p>
          <div>
            {skills.map((skill, index) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                percentage={skill.percentage}
                delay={index * 0.15}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
