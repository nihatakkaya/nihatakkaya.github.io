"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "tr";

interface Translations {
  nav: { home: string; skills: string; portfolio: string; education: string; contact: string };
  hero: {
    greeting: string;
    roles: string[];
    description: string;
    viewWork: string;
    downloadCV: string;
  };
  skills: {
    title1: string;
    title2: string;
    description: string;
  };
  portfolio: {
    title1: string;
    title2: string;
    subtitle: string;
    viewAll: string;
    fallback: string;
    viewOnGithub: string;
    noDescription: string;
  };
  education: {
    title: string;
    subtitle: string;
    educationLabel: string;
    certificationsLabel: string;
    alwaysLearning: string;
    degrees: { degree: string; institution: string; year: string; highlights: string[]; focusAreas: string[] }[];
    certs: { name: string; issuer: string; year: string }[];
  };
  contact: {
    title1: string;
    title2: string;
    subtitle: string;
    footer: string;
  };
}

const translations: Record<Lang, Translations> = {
  en: {
    nav: { home: "Home", skills: "Skills", portfolio: "Portfolio", education: "Education", contact: "Contact" },
    hero: {
      greeting: "Hi, I'm",
      roles: ["Computer Engineering Student", "Full Stack Developer", "Software Developer"],
      description:
        "Computer Engineering student with a strong interest in .NET technologies. I focus on backend development and continuously work on improving my skills in software engineering. Passionate about learning, building scalable solutions, and writing clean, maintainable code.",
      viewWork: "View My Work",
      downloadCV: "Download CV",
    },
    skills: {
      title1: "My",
      title2: "Skills",
      description:
        "I'm a passionate developer specializing in .NET ecosystem and web technologies. I build robust, scalable applications with clean architecture and modern best practices.",
    },
    portfolio: {
      title1: "My",
      title2: "Portfolio",
      subtitle: "My latest projects from GitHub",
      viewAll: "View All Repositories",
      fallback: "Unable to load repositories right now.",
      viewOnGithub: "View on GitHub",
      noDescription: "No description provided.",
    },
    education: {
      title: "Education",
      subtitle: "My learning journey and certifications",
      educationLabel: "Education",
      certificationsLabel: "Certifications",
      alwaysLearning: "Always learning and growing",
      degrees: [
        {
          degree: "English Preparatory Program",
          institution: "Sakarya University of Applied Sciences",
          year: "2022 – 2023",
          highlights: [
            "Completed intensive English language training",
            "Prepared for English-medium engineering education",
          ],
          focusAreas: ["Academic English", "Technical Writing"],
        },
        {
          degree: "Bachelor's Degree in Computer Engineering",
          institution: "Sakarya University of Applied Sciences",
          year: "2023 – 2027",
          highlights: [
            "Focusing on .NET ecosystem and backend technologies",
            "Building full-stack web applications",
            "Learning software architecture and design patterns",
          ],
          focusAreas: ["C#", ".NET", "SQL", "Web Development", "Software Architecture"],
        },
      ],
      certs: [
        { name: "C# Programming", issuer: "Udemy", year: "2024" },
        { name: "ASP.NET Core MVC", issuer: "Udemy", year: "2024" },
        { name: "SQL Server & Database Design", issuer: "Udemy", year: "2024" },
      ],
    },
    contact: {
      title1: "Get in",
      title2: "Touch",
      subtitle: "Let's build something amazing together.",
      footer: "Designed & Built by Nihat",
    },
  },
  tr: {
    nav: { home: "Ana Sayfa", skills: "Yetenekler", portfolio: "Portföy", education: "Eğitim", contact: "İletişim" },
    hero: {
      greeting: "Merhaba, Ben",
      roles: ["Bilgisayar Mühendisliği Öğrencisi", "Full Stack Geliştirici", "Yazılım Geliştirici"],
      description:
        ".NET teknolojilerine güçlü bir ilgi duyan Bilgisayar Mühendisliği öğrencisiyim. Backend geliştirmeye odaklanıyor ve yazılım mühendisliğindeki becerilerimi sürekli geliştiriyorum. Öğrenmeye, ölçeklenebilir çözümler üretmeye ve temiz, sürdürülebilir kod yazmaya tutkuyla bağlıyım.",
      viewWork: "Çalışmalarım",
      downloadCV: "CV İndir",
    },
    skills: {
      title1: "",
      title2: "Yeteneklerim",
      description:
        ".NET ekosistemi ve web teknolojilerinde uzmanlaşmış tutkulu bir geliştiriciyim. Temiz mimari ve modern en iyi uygulamalarla sağlam, ölçeklenebilir uygulamalar geliştiriyorum.",
    },
    portfolio: {
      title1: "",
      title2: "Portföyüm",
      subtitle: "GitHub'daki son projelerim",
      viewAll: "Tüm Projeleri Görüntüle",
      fallback: "Projeler şu anda yüklenemiyor.",
      viewOnGithub: "GitHub'da Görüntüle",
      noDescription: "Açıklama bulunmuyor.",
    },
    education: {
      title: "Eğitim",
      subtitle: "Öğrenim yolculuğum ve sertifikalarım",
      educationLabel: "Eğitim",
      certificationsLabel: "Sertifikalar",
      alwaysLearning: "Her zaman öğrenmeye ve gelişmeye devam",
      degrees: [
        {
          degree: "İngilizce Hazırlık Programı",
          institution: "Sakarya Uygulamalı Bilimler Üniversitesi",
          year: "2022 – 2023",
          highlights: [
            "Yoğun İngilizce dil eğitimi tamamlandı",
            "İngilizce mühendislik eğitimine hazırlık yapıldı",
          ],
          focusAreas: ["Akademik İngilizce", "Teknik Yazım"],
        },
        {
          degree: "Bilgisayar Mühendisliği Lisans",
          institution: "Sakarya Uygulamalı Bilimler Üniversitesi",
          year: "2023 – 2027",
          highlights: [
            ".NET ekosistemi ve backend teknolojilerine odaklanma",
            "Full-stack web uygulamaları geliştirme",
            "Yazılım mimarisi ve tasarım kalıpları öğrenimi",
          ],
          focusAreas: ["C#", ".NET", "SQL", "Web Geliştirme", "Yazılım Mimarisi"],
        },
      ],
      certs: [
        { name: "C# Programlama", issuer: "Udemy", year: "2024" },
        { name: "ASP.NET Core MVC", issuer: "Udemy", year: "2024" },
        { name: "SQL Server & Veritabanı Tasarımı", issuer: "Udemy", year: "2024" },
      ],
    },
    contact: {
      title1: "İletişime",
      title2: "Geçin",
      subtitle: "Birlikte harika bir şeyler inşa edelim.",
      footer: "Nihat tarafından tasarlandı ve geliştirildi",
    },
  },
};

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LangContext = createContext<LangContextType>({
  lang: "en",
  setLang: () => {},
  t: translations.en,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
