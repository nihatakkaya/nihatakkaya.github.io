export type SkillCategoryKey =
  | "backend"
  | "data"
  | "architecture"
  | "devops"
  | "frontend";

export type SkillIconKey = "api" | "layers" | "auth" | "realtime";

export interface SkillItem {
  name: string;
  icon?: string;
  iconKey?: SkillIconKey;
  featured?: boolean;
}

export interface SkillCategory {
  key: SkillCategoryKey;
  iconKey: "code" | "database" | "architecture" | "tools" | "frontend";
  skills: SkillItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    key: "backend",
    iconKey: "code",
    skills: [
      { name: "C#", icon: "/images/logos/csharp.png", featured: true },
      { name: ".NET", icon: "/images/logos/dotnet.png", featured: true },
      { name: "ASP.NET Core", icon: "/images/logos/dotnet.png", featured: true },
      { name: "REST APIs", iconKey: "api" },
    ],
  },
  {
    key: "data",
    iconKey: "database",
    skills: [
      { name: "Entity Framework Core", icon: "/images/logos/dotnet.png", featured: true },
      { name: "SQL Server", icon: "/images/logos/sql.png", featured: true },
      { name: "PostgreSQL", icon: "/images/logos/postgresql.svg", featured: true },
    ],
  },
  {
    key: "architecture",
    iconKey: "architecture",
    skills: [
      { name: "Layered Architecture", iconKey: "layers" },
      { name: "Authentication & Authorization", iconKey: "auth" },
      { name: "SignalR", iconKey: "realtime" },
    ],
  },
  {
    key: "devops",
    iconKey: "tools",
    skills: [
      { name: "Docker", icon: "/images/logos/docker.svg", featured: true },
      { name: "Docker Compose", icon: "/images/logos/docker.svg" },
      { name: "Git", icon: "/images/logos/git.svg" },
      { name: "GitHub", icon: "/images/logos/github.svg" },
    ],
  },
  {
    key: "frontend",
    iconKey: "frontend",
    skills: [
      { name: "Blazor", icon: "/images/logos/blazor.svg" },
      { name: "JavaScript", icon: "/images/logos/javascript.svg" },
      { name: "HTML", icon: "/images/logos/html5.png" },
      { name: "CSS", icon: "/images/logos/css3.png" },
    ],
  },
];
