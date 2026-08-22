"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Layers3,
  Network,
  PanelsTopLeft,
  RadioTower,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import SectionWrapper from "@/components/SectionWrapper";
import SkillsVisual from "@/components/SkillsVisual";
import {
  skillCategories,
  type SkillCategory,
  type SkillIconKey,
  type SkillItem,
} from "@/lib/skills";
import { useLang } from "@/lib/i18n";

const categoryIcons: Record<SkillCategory["iconKey"], typeof Code2> = {
  code: Code2,
  database: Database,
  architecture: Layers3,
  tools: Wrench,
  frontend: PanelsTopLeft,
};

const skillIcons: Record<SkillIconKey, typeof Code2> = {
  api: Network,
  layers: Layers3,
  auth: ShieldCheck,
  realtime: RadioTower,
};

function SkillBadge({ skill }: { skill: SkillItem }) {
  const Icon = skill.iconKey ? skillIcons[skill.iconKey] : null;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={`inline-flex min-w-0 items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition-all duration-300 ${
        skill.featured
          ? "border-neon-cyan/30 bg-neon-cyan/10 text-white shadow-[0_0_18px_rgba(0,240,255,0.08)] hover:border-neon-cyan/55 hover:bg-neon-cyan/15"
          : "border-neon-cyan/15 bg-navy-800/55 text-gray-300 hover:border-neon-cyan/35 hover:bg-neon-cyan/10"
      }`}
    >
      {skill.icon && (
        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/95 p-1">
          <Image
            src={skill.icon}
            alt={`${skill.name} logo`}
            width={24}
            height={24}
            className="h-full w-full object-contain"
          />
        </span>
      )}
      {Icon && <Icon size={17} className="flex-shrink-0 text-neon-cyan/75" aria-hidden="true" />}
      <span className="min-w-0 break-words leading-tight">{skill.name}</span>
    </motion.div>
  );
}

function SkillCategoryCard({
  category,
  title,
  index,
}: {
  category: SkillCategory;
  title: string;
  index: number;
}) {
  const Icon = categoryIcons[category.iconKey];

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="glass-card glow-border glow-border-hover rounded-2xl p-5 transition-all duration-300"
    >
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-neon-cyan/20 bg-neon-cyan/10 text-neon-cyan">
          <Icon size={22} />
        </div>
        <h3 className="min-w-0 text-lg font-semibold leading-snug text-white">
          {title}
        </h3>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {category.skills.map((skill) => (
          <SkillBadge key={skill.name} skill={skill} />
        ))}
      </div>
    </motion.article>
  );
}

export default function SkillsSection() {
  const { t } = useLang();

  return (
    <SectionWrapper id="skills">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative order-2 flex items-center justify-center lg:order-1"
        >
          <SkillsVisual />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="order-1 min-w-0 lg:order-2"
        >
          <h2 className="mb-3 text-3xl font-bold sm:text-4xl">
            {t.skills.title1}
            {t.skills.title1 && " "}
            <span className="text-gradient">{t.skills.title2}</span>
          </h2>
          <p className="mb-8 max-w-2xl leading-relaxed text-gray-400">
            {t.skills.description}
          </p>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {skillCategories.map((category, index) => (
              <SkillCategoryCard
                key={category.key}
                category={category}
                title={t.skills.categories[category.key]}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
