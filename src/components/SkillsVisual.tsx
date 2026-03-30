"use client";

import { motion } from "framer-motion";

const codeLines = [
  { indent: 0, tokens: [{ text: "using", color: "#569CD6" }, { text: " System;", color: "#DCDCAA" }] },
  { indent: 0, tokens: [{ text: "using", color: "#569CD6" }, { text: " Microsoft.AspNetCore.Mvc;", color: "#DCDCAA" }] },
  { indent: 0, tokens: [] },
  { indent: 0, tokens: [{ text: "namespace", color: "#569CD6" }, { text: " Portfolio", color: "#4EC9B0" }] },
  { indent: 0, tokens: [{ text: "{", color: "#D4D4D4" }] },
  { indent: 1, tokens: [{ text: "public", color: "#569CD6" }, { text: " class ", color: "#569CD6" }, { text: "Developer", color: "#4EC9B0" }] },
  { indent: 1, tokens: [{ text: "{", color: "#D4D4D4" }] },
  { indent: 2, tokens: [{ text: "public", color: "#569CD6" }, { text: " string", color: "#569CD6" }, { text: " Name", color: "#9CDCFE" }, { text: " => ", color: "#D4D4D4" }, { text: "\"Nihat\"", color: "#CE9178" }, { text: ";", color: "#D4D4D4" }] },
  { indent: 2, tokens: [{ text: "public", color: "#569CD6" }, { text: " string", color: "#569CD6" }, { text: " Role", color: "#9CDCFE" }, { text: " => ", color: "#D4D4D4" }, { text: "\"Full Stack Dev\"", color: "#CE9178" }, { text: ";", color: "#D4D4D4" }] },
  { indent: 0, tokens: [] },
  { indent: 2, tokens: [{ text: "public", color: "#569CD6" }, { text: " List", color: "#4EC9B0" }, { text: "<", color: "#D4D4D4" }, { text: "string", color: "#569CD6" }, { text: ">", color: "#D4D4D4" }, { text: " Skills", color: "#9CDCFE" }, { text: " =>", color: "#D4D4D4" }] },
  { indent: 3, tokens: [{ text: "new", color: "#569CD6" }, { text: "() { ", color: "#D4D4D4" }, { text: "\"C#\"", color: "#CE9178" }, { text: ", ", color: "#D4D4D4" }, { text: "\".NET\"", color: "#CE9178" }, { text: ", ", color: "#D4D4D4" }, { text: "\"SQL\"", color: "#CE9178" }, { text: " };", color: "#D4D4D4" }] },
  { indent: 0, tokens: [] },
  { indent: 2, tokens: [{ text: "public", color: "#569CD6" }, { text: " async ", color: "#569CD6" }, { text: "Task", color: "#4EC9B0" }, { text: " BuildAsync", color: "#DCDCAA" }, { text: "()", color: "#D4D4D4" }] },
  { indent: 2, tokens: [{ text: "{", color: "#D4D4D4" }] },
  { indent: 3, tokens: [{ text: "await", color: "#C586C0" }, { text: " CreateSomethingAwesome", color: "#DCDCAA" }, { text: "();", color: "#D4D4D4" }] },
  { indent: 2, tokens: [{ text: "}", color: "#D4D4D4" }] },
  { indent: 1, tokens: [{ text: "}", color: "#D4D4D4" }] },
  { indent: 0, tokens: [{ text: "}", color: "#D4D4D4" }] },
];

function TerminalDots() {
  return (
    <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
      <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
      <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
      <div className="w-3 h-3 rounded-full bg-[#28CA42]" />
      <span className="ml-3 text-xs text-gray-500 font-mono">Developer.cs</span>
    </div>
  );
}

export default function SkillsVisual() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Glow behind the editor */}
      <div className="absolute -inset-4 rounded-3xl opacity-40 blur-2xl"
        style={{ background: "linear-gradient(135deg, rgba(0,200,255,0.12), rgba(81,43,212,0.1), rgba(0,200,255,0.08))" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative rounded-2xl overflow-hidden border border-white/8"
        style={{
          background: "linear-gradient(145deg, rgba(15,20,40,0.95), rgba(10,14,30,0.98))",
          boxShadow: "0 0 40px rgba(0,180,255,0.06), 0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        <TerminalDots />

        {/* Code area */}
        <div className="px-5 py-4 font-mono text-[11px] sm:text-[13px] leading-relaxed overflow-hidden">
          {codeLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              viewport={{ once: true }}
              className="flex"
            >
              {/* Line number */}
              <span className="w-7 text-right mr-4 text-gray-600 select-none flex-shrink-0 text-[10px] sm:text-xs">
                {i + 1}
              </span>

              {/* Code content */}
              <div style={{ paddingLeft: `${line.indent * 20}px` }}>
                {line.tokens.length === 0 ? (
                  <span>&nbsp;</span>
                ) : (
                  line.tokens.map((token, j) => (
                    <span key={j} style={{ color: token.color }}>
                      {token.text}
                    </span>
                  ))
                )}
              </div>
            </motion.div>
          ))}

          {/* Blinking cursor */}
          <motion.div className="flex mt-0.5">
            <span className="w-7 text-right mr-4 text-gray-600 select-none flex-shrink-0 text-[10px] sm:text-xs">
              {codeLines.length + 1}
            </span>
            <motion.span
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
              className="w-[2px] h-4 bg-neon-cyan/80 inline-block"
            />
          </motion.div>
        </div>

        {/* Bottom status bar */}
        <div className="flex items-center justify-between px-4 py-1.5 border-t border-white/5 text-[10px] text-gray-500 font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#28CA42]" />
              Ready
            </span>
            <span>UTF-8</span>
          </div>
          <div className="flex items-center gap-3">
            <span>C#</span>
            <span>Ln {codeLines.length}, Col 1</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
