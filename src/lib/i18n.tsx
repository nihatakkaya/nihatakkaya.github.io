"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "en" | "tr";

interface Translations {
  nav: { home: string; skills: string; experience: string; portfolio: string; education: string; contact: string };
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
    categories: {
      backend: string;
      data: string;
      architecture: string;
      devops: string;
      frontend: string;
    };
  };
  portfolio: {
    title1: string;
    title2: string;
    subtitle: string;
    viewAll: string;
    fallback: string;
    empty: string;
    viewOnGithub: string;
    noDescription: string;
  };
  experience: {
    title: string;
    subtitle: string;
    labels: {
      department: string;
      location: string;
      workModel: string;
      technologies: string;
    };
    volunteer: string;
  };
  education: {
    title: string;
    subtitle: string;
    educationLabel: string;
    certificationsLabel: string;
    alwaysLearning: string;
    degrees: { degree: string; institution: string; year: string; highlights: string[]; focusAreas: string[] }[];
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
    nav: {
      home: "Home",
      skills: "Skills",
      experience: "Experience",
      portfolio: "Portfolio",
      education: "Education",
      contact: "Contact",
    },
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
        "Backend-focused .NET developer building scalable web applications with modern database, architecture and containerization technologies.",
      categories: {
        backend: "Backend Development",
        data: "Data & Persistence",
        architecture: "Architecture & Realtime",
        devops: "DevOps & Tools",
        frontend: "Frontend",
      },
    },
    portfolio: {
      title1: "My",
      title2: "Portfolio",
      subtitle: "My latest projects from GitHub",
      viewAll: "View All Repositories",
      fallback: "Unable to load repositories right now.",
      empty: "Pinned repositories will appear here after they sync from GitHub.",
      viewOnGithub: "View on GitHub",
      noDescription: "No description provided.",
    },
    experience: {
      title: "Experience",
      subtitle:
        "Hands-on experience across internships, volunteer development and real-world software projects.",
      labels: {
        department: "Department",
        location: "Location",
        workModel: "Work model",
        technologies: "Technologies",
      },
      volunteer: "Volunteer",
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
    },
    contact: {
      title1: "Get in",
      title2: "Touch",
      subtitle: "Let's build something amazing together.",
      footer: "Designed & Built by Nihat Akkaya",
    },
  },
  tr: {
    nav: {
      home: "Ana Sayfa",
      skills: "Yetenekler",
      experience: "Deneyim",
      portfolio: "Portföy",
      education: "Eğitim",
      contact: "İletişim",
    },
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
        "Modern veritabanı, yazılım mimarisi ve container teknolojileriyle ölçeklenebilir web uygulamaları geliştiren .NET backend odaklı bir geliştiriciyim.",
      categories: {
        backend: "Backend Geliştirme",
        data: "Veri & Kalıcılık",
        architecture: "Mimari & Gerçek Zamanlı Sistemler",
        devops: "DevOps & Araçlar",
        frontend: "Frontend",
      },
    },
    portfolio: {
      title1: "",
      title2: "Portföyüm",
      subtitle: "GitHub'daki son projelerim",
      viewAll: "Tüm Projeleri Görüntüle",
      fallback: "Projeler şu anda yüklenemiyor.",
      empty: "GitHub'dan senkronize edilen sabitlenmiş projeler burada görünecek.",
      viewOnGithub: "GitHub'da Görüntüle",
      noDescription: "Açıklama bulunmuyor.",
    },
    experience: {
      title: "Deneyim",
      subtitle:
        "Stajlar, gönüllü yazılım geliştirme ve gerçek dünya projeleriyle edindiğim uygulamalı deneyimler.",
      labels: {
        department: "Birim",
        location: "Konum",
        workModel: "Çalışma modeli",
        technologies: "Teknolojiler",
      },
      volunteer: "Gönüllü",
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
    },
    contact: {
      title1: "İletişime",
      title2: "Geçin",
      subtitle: "Birlikte harika bir şeyler inşa edelim.",
      footer: "Nihat Akkaya tarafından tasarlandı ve geliştirildi",
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

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
