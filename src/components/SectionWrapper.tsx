"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export default function SectionWrapper({ id, children, className = "" }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="w-full max-w-6xl mx-auto"
      >
        {children}
      </motion.div>
    </section>
  );
}
