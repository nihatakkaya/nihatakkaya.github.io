import type { Lang } from "@/lib/i18n";

export interface ExperienceItem {
  id: string;
  logo: {
    src: string;
    alt: string;
    frame: "transparent" | "light";
  };
  badge?: Record<Lang, string>;
  position: Record<Lang, string>;
  organization: Record<Lang, string>;
  department?: Record<Lang, string>;
  dateRange: Record<Lang, string>;
  location?: Record<Lang, string>;
  workModel?: Record<Lang, string>;
  description?: Record<Lang, string>;
  technologies: string[];
}

export const experienceItems: ExperienceItem[] = [
  {
    id: "hayy-apps-it-intern",
    logo: {
      src: "/images/logos/hayy-apps.png",
      alt: "Hayy Apps logo",
      frame: "transparent",
    },
    position: {
      en: "IT Intern",
      tr: "BT Stajyeri",
    },
    organization: {
      en: "Hayy Apps",
      tr: "Hayy Apps",
    },
    dateRange: {
      en: "August 2026 — Present",
      tr: "Ağustos 2026 — Devam ediyor",
    },
    location: {
      en: "Istanbul, Türkiye",
      tr: "İstanbul, Türkiye",
    },
    workModel: {
      en: "Hybrid",
      tr: "Hibrit",
    },
    technologies: ["C#", "ASP.NET"],
  },
  {
    id: "subu-it-intern",
    logo: {
      src: "/images/logos/subu.svg",
      alt: "Sakarya University of Applied Sciences logo",
      frame: "light",
    },
    position: {
      en: "IT Intern",
      tr: "BT Stajyeri",
    },
    organization: {
      en: "Sakarya University of Applied Sciences",
      tr: "Sakarya Uygulamalı Bilimler Üniversitesi",
    },
    department: {
      en: "Information Technology Department",
      tr: "Bilgi İşlem Daire Başkanlığı",
    },
    dateRange: {
      en: "January 2026 — February 2026",
      tr: "Ocak 2026 — Şubat 2026",
    },
    location: {
      en: "Sakarya, Türkiye",
      tr: "Sakarya, Türkiye",
    },
    workModel: {
      en: "On-site",
      tr: "Ofisten",
    },
    technologies: ["C#", "ASP.NET"],
  },
  {
    id: "subu-volunteer-software-developer",
    logo: {
      src: "/images/logos/subu.svg",
      alt: "Sakarya University of Applied Sciences logo",
      frame: "light",
    },
    badge: {
      en: "Volunteer",
      tr: "Gönüllü",
    },
    position: {
      en: "Volunteer Software Developer",
      tr: "Gönüllü Yazılım Geliştirici",
    },
    organization: {
      en: "Sakarya University of Applied Sciences",
      tr: "Sakarya Uygulamalı Bilimler Üniversitesi",
    },
    dateRange: {
      en: "October 2025 — Present",
      tr: "Ekim 2025 — Devam ediyor",
    },
    description: {
      en: "Contributed voluntarily to web projects developed with C# and ASP.NET Core, gaining experience in backend development, MSSQL database operations and API integration.",
      tr: "C# ve ASP.NET Core teknolojileri ile geliştirilen web projelerinde gönüllü olarak görev aldım. Backend geliştirme, MSSQL veritabanı işlemleri ve API entegrasyon süreçlerinde deneyim kazandım.",
    },
    technologies: ["C#", "ASP.NET Core", "MSSQL", "API Integration"],
  },
  {
    id: "enyakincom-it-intern",
    logo: {
      src: "/images/logos/enyakincom.svg",
      alt: "enyakincom logo",
      frame: "light",
    },
    position: {
      en: "IT Intern",
      tr: "BT Stajyeri",
    },
    organization: {
      en: "enyakincom",
      tr: "enyakincom",
    },
    dateRange: {
      en: "July 2025 — August 2025",
      tr: "Temmuz 2025 — Ağustos 2025",
    },
    location: {
      en: "Sakarya, Türkiye",
      tr: "Sakarya, Türkiye",
    },
    workModel: {
      en: "On-site",
      tr: "Ofisten",
    },
    technologies: ["HTML", "CSS"],
  },
];
