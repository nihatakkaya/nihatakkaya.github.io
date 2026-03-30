"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlowCard({ children, className = "", hover = true }: GlowCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -5, scale: 1.01 } : undefined}
      transition={{ duration: 0.3 }}
      className={`glass-card glow-border rounded-2xl p-6 transition-all duration-300 ${
        hover ? "glow-border-hover cursor-pointer" : ""
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}
