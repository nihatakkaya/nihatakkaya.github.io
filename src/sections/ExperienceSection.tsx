"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  CalendarDays,
  Code2,
  MapPin,
  MonitorDot,
} from "lucide-react";
import Image from "next/image";
import SectionWrapper from "@/components/SectionWrapper";
import { experienceItems, type ExperienceItem } from "@/lib/experience";
import { useLang } from "@/lib/i18n";

function CompanyLogo({ item }: { item: ExperienceItem }) {
  const [failed, setFailed] = useState(false);
  const frameClass =
    item.logo.frame === "light"
      ? "border-neon-cyan/15 bg-white/95 p-2"
      : "border-neon-cyan/20 bg-navy-800/70 p-1";

  return (
    <div
      className={`flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border shadow-[0_0_18px_rgba(0,240,255,0.08)] sm:h-14 sm:w-14 ${frameClass}`}
    >
      {failed ? (
        <Building2 size={26} className="text-neon-cyan" aria-hidden="true" />
      ) : (
        <Image
          src={item.logo.src}
          alt={item.logo.alt}
          width={56}
          height={56}
          className="h-full w-full object-contain"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

function DetailPill({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarDays;
  label?: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-2 rounded-full border border-neon-cyan/10 bg-navy-800/55 px-3 py-2 text-sm text-gray-300">
      <Icon size={15} className="flex-shrink-0 text-neon-cyan/70" aria-hidden="true" />
      <span className="min-w-0 break-words leading-tight">
        {label && <span className="text-gray-500">{label}: </span>}
        {value}
      </span>
    </div>
  );
}

function ExperienceCard({
  item,
  index,
  align,
}: {
  item: ExperienceItem;
  index: number;
  align: "left" | "right";
}) {
  const { lang, t } = useLang();

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true, margin: "-80px" }}
      whileHover={{ y: -4 }}
      className={`glass-card glow-border glow-border-hover rounded-2xl p-5 transition-all duration-300 sm:p-6 ${
        align === "left" ? "sm:text-right" : ""
      }`}
    >
      <div
        className={`flex min-w-0 items-start gap-4 ${
          align === "left" ? "sm:flex-row-reverse" : ""
        }`}
      >
        <CompanyLogo item={item} />

        <div className="min-w-0 flex-1">
          <div
            className={`mb-2 flex min-w-0 flex-wrap items-center gap-2 ${
              align === "left" ? "sm:justify-end" : ""
            }`}
          >
            {item.badge && (
              <span className="rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-neon-cyan">
                {item.badge[lang]}
              </span>
            )}
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-gray-400">
              {item.dateRange[lang]}
            </span>
          </div>

          <h3 className="break-words text-xl font-semibold leading-snug text-white">
            {item.position[lang]}
          </h3>
          <p className="mt-1 break-words text-base font-medium leading-snug text-neon-cyan/80">
            {item.organization[lang]}
          </p>
        </div>
      </div>

      <div
        className={`mt-5 flex flex-wrap gap-2.5 ${
          align === "left" ? "sm:justify-end" : ""
        }`}
      >
        <DetailPill icon={CalendarDays} value={item.dateRange[lang]} />
        {item.department && (
          <DetailPill
            icon={Building2}
            label={t.experience.labels.department}
            value={item.department[lang]}
          />
        )}
        {item.location && (
          <DetailPill
            icon={MapPin}
            label={t.experience.labels.location}
            value={item.location[lang]}
          />
        )}
        {item.workModel && (
          <DetailPill
            icon={MonitorDot}
            label={t.experience.labels.workModel}
            value={item.workModel[lang]}
          />
        )}
      </div>

      {item.description && (
        <p className="mt-5 break-words text-sm leading-7 text-gray-300">
          {item.description[lang]}
        </p>
      )}

      <div
        className={`mt-5 flex flex-wrap gap-2 ${
          align === "left" ? "sm:justify-end" : ""
        }`}
        aria-label={t.experience.labels.technologies}
      >
        {item.technologies.map((technology) => (
          <span
            key={technology}
            className="inline-flex min-w-0 items-center gap-1.5 rounded-full border border-neon-cyan/20 bg-neon-cyan/10 px-3 py-1.5 text-xs font-medium text-neon-cyan"
          >
            <Code2 size={13} className="flex-shrink-0" aria-hidden="true" />
            <span className="break-words leading-tight">{technology}</span>
          </span>
        ))}
      </div>
    </motion.article>
  );
}

export default function ExperienceSection() {
  const { t } = useLang();

  return (
    <SectionWrapper id="experience">
      <div className="mb-14 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-4 text-4xl font-bold sm:text-5xl"
        >
          <span className="text-gradient">{t.experience.title}</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-400"
        >
          {t.experience.subtitle}
        </motion.p>
      </div>

      <div className="relative mx-auto max-w-5xl">
        <div
          className="absolute bottom-8 left-4 top-8 w-px bg-gradient-to-b from-transparent via-neon-cyan/25 to-transparent sm:left-1/2"
          aria-hidden="true"
        />

        <div className="space-y-8 sm:space-y-10">
          {experienceItems.map((item, index) => {
            const align = index % 2 === 0 ? "right" : "left";
            const cardColumn =
              align === "right"
                ? "sm:col-start-3"
                : "sm:col-start-1 sm:row-start-1";

            return (
              <div
                key={item.id}
                className="relative grid grid-cols-[2rem_minmax(0,1fr)] gap-4 sm:grid-cols-[minmax(0,1fr)_2.5rem_minmax(0,1fr)] sm:gap-5"
              >
                <div className="col-start-1 row-start-1 flex justify-center sm:col-start-2">
                  <span
                    className="mt-8 flex h-4 w-4 rounded-full border border-neon-cyan/45 bg-navy-900 shadow-[0_0_18px_rgba(0,240,255,0.35)]"
                    aria-hidden="true"
                  />
                </div>

                <div className={`col-start-2 min-w-0 ${cardColumn}`}>
                  <ExperienceCard item={item} index={index} align={align} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
