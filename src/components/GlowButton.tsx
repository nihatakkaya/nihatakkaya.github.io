"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlowButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function GlowButton({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
}: GlowButtonProps) {
  const baseStyles =
    "relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-medium text-base transition-all duration-300 overflow-hidden";

  const variants = {
    primary:
      "bg-gradient-to-r from-neon-cyan to-neon-blue text-navy-900 hover:shadow-[0_0_30px_rgba(0,240,255,0.4)]",
    secondary:
      "border border-neon-cyan/30 text-neon-cyan hover:border-neon-cyan/60 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:bg-neon-cyan/5",
  };

  const Component = href ? "a" : "button";

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
      <Component
        href={href}
        onClick={onClick}
        className={`${baseStyles} ${variants[variant]} ${className}`}
      >
        {children}
      </Component>
    </motion.div>
  );
}
