"use client";

import { useState, useEffect, useRef } from "react";

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return activeSection;
}

export function useTypewriter(
  words: string[],
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseTime = 2000
) {
  const [displayText, setDisplayText] = useState("");
  const wordsRef = useRef(words);
  const textRef = useRef("");
  const wordIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  wordsRef.current = words;

  useEffect(() => {
    const tick = () => {
      const currentWord = wordsRef.current[wordIndexRef.current];
      const current = textRef.current;

      let next: string;
      if (isDeletingRef.current) {
        next = currentWord.substring(0, current.length - 1);
      } else {
        next = currentWord.substring(0, current.length + 1);
      }

      textRef.current = next;
      setDisplayText(next);

      let speed = isDeletingRef.current ? deletingSpeed : typingSpeed;

      if (!isDeletingRef.current && next === currentWord) {
        speed = pauseTime;
        isDeletingRef.current = true;
      } else if (isDeletingRef.current && next === "") {
        isDeletingRef.current = false;
        wordIndexRef.current =
          (wordIndexRef.current + 1) % wordsRef.current.length;
        speed = 300;
      }

      timeoutRef.current = setTimeout(tick, speed);
    };

    timeoutRef.current = setTimeout(tick, typingSpeed);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [typingSpeed, deletingSpeed, pauseTime]);

  return displayText;
}
