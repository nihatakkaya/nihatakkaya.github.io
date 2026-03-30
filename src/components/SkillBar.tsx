"use client";

import { motion } from "framer-motion";

interface SkillBarProps {
  name: string;
  percentage: number;
  delay?: number;
}

function SkillLogo({ name }: { name: string }) {
  const s = "w-8 h-8 flex-shrink-0";

  switch (name) {
    case "C#":
      return (
        <svg viewBox="0 0 128 128" className={s}>
          <path d="M117.5 33.5l.3-.2c-2.1-3.7-5.1-6.5-8.8-8.1L65.5.5c-3.7-2.1-8.3-2.1-12 0L10 25.2c-3.7 2.1-6.8 6-8.8 8.1l.3.2C.5 36.7 0 40.3 0 44v40c0 3.7.5 7.3 1.5 10.5l-.3.2c2 2.1 5.1 6 8.8 8.1L53.5 128c1.9 1.1 3.8 1.5 6 1.5s4.1-.4 6-1.5l43.5-25.2c3.7-2.1 6.7-6 8.8-8.1l-.3-.2c1-3.2 1.5-6.8 1.5-10.5V44c0-3.7-.5-7.3-1.5-10.5z" fill="#68217A" />
          <path d="M59.5 22c-20.7 0-37.5 16.8-37.5 37.5S38.8 97 59.5 97c13.8 0 25.8-7.5 32.3-18.6l-16.3-9.5C72 74.7 66.2 79 59.5 79c-10.8 0-19.5-8.7-19.5-19.5S48.7 40 59.5 40c6.7 0 12.5 4.3 16 10.1l16.3-9.5C85.3 29.5 73.3 22 59.5 22z" fill="#fff" />
          <path d="M95 56.5h-4.5V52H86v4.5h-4.5V61H86v4.5h4.5V61H95V56.5z" fill="#fff" />
          <path d="M107 56.5h-4.5V52H98v4.5h-4.5V61H98v4.5h4.5V61H107V56.5z" fill="#fff" />
        </svg>
      );
    case ".NET":
      return (
        <svg viewBox="0 0 128 128" className={s}>
          <circle cx="64" cy="64" r="64" fill="#512BD4" />
          <g transform="translate(18, 36) scale(0.72)">
            <circle cx="10" cy="57" r="5" fill="white" />
            <path d="M33 62h-7L6 24c-.5-1-1-2-1.2-3h-.2c.2 1.3.3 3.6.3 7v34H0V0h8l19.5 37c1 1.8 1.5 2.5 1.7 3.1h.1c-.3-1.5-.4-4-.4-7.3V0h5v62z" fill="white" transform="translate(22, 0)" />
            <path d="M22 62H0V0h21v5H6v22h14v5H6v25h16v5z" fill="white" transform="translate(62, 0)" />
            <path d="M16 62H10V5H0V0h26v5H16v57z" fill="white" transform="translate(88, 0)" />
          </g>
        </svg>
      );
    case "SQL":
      return (
        <svg viewBox="0 0 128 128" className={s}>
          <g transform="translate(14, 10)">
            <ellipse cx="50" cy="18" rx="46" ry="18" fill="#E8910C" />
            <path d="M4 18v72c0 10 20.6 18 46 18s46-8 46-18V18" fill="none" stroke="#E8910C" strokeWidth="8" />
            <path d="M4 54c0 10 20.6 18 46 18s46-8 46-18" fill="none" stroke="#E8910C" strokeWidth="6" opacity="0.7" />
            <ellipse cx="50" cy="18" rx="36" ry="10" fill="#F4A83D" opacity="0.4" />
          </g>
        </svg>
      );
    case "HTML":
      return (
        <svg viewBox="0 0 128 128" className={s}>
          <path d="M19.6 2l8.8 98.4L64 112l35.6-11.6L108.4 2H19.6z" fill="#E44D26" />
          <path d="M64 99.8V10.2H30.8l2 22.5H64v22.3H36.8l2.1 23.4L64 85.8" fill="#F16529" />
          <path d="M64 99.8l24.8-7.4 3.4-38.1H64V32.7h29l-1-11.2-.7-9.3H64V2h40.2" fill="#F16529" />
          <path d="M64 54.3v22.3l-23.2-6.5-.5-5.8H64z" fill="#EBEBEB" />
          <path d="M64 32.7v-22.5h-31l.5 5.7.5 5.6H64v11.2z" fill="#EBEBEB" />
        </svg>
      );
    case "CSS":
      return (
        <svg viewBox="0 0 128 128" className={s}>
          <path d="M19.6 2l8.8 98.4L64 112l35.6-11.6L108.4 2H19.6z" fill="#1572B6" />
          <path d="M64 99.8V10.2H30.8l.5 5.7.5 5.6H64v22.3H36.8l.5 5.6 2.1 23.4.4 4.4L64 85.8" fill="#33A9DC" />
          <path d="M64 54.3v22.3l24.4-6.5 2.5-28.1.3-3.3H64V10.2h40.2l-.4 3.7-3.4 38.1-.2 2.3H64z" fill="#33A9DC" />
        </svg>
      );
    default:
      return null;
  }
}

export default function SkillBar({ name, percentage, delay = 0 }: SkillBarProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-3">
          <SkillLogo name={name} />
          <span className="text-base font-semibold text-gray-200">{name}</span>
        </div>
        <span className="text-base font-bold text-neon-cyan tabular-nums">{percentage}%</span>
      </div>
      <div className="h-3 bg-navy-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          transition={{ duration: 1.2, delay, ease: "easeOut" }}
          viewport={{ once: true }}
          className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue"
          style={{
            boxShadow:
              "0 0 10px rgba(0, 240, 255, 0.4), 0 0 20px rgba(0, 240, 255, 0.2)",
          }}
        />
      </div>
    </div>
  );
}
