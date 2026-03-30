"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, AlertCircle } from "lucide-react";
import Image from "next/image";
import SectionWrapper from "@/components/SectionWrapper";
import { useLang } from "@/lib/i18n";

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  updated_at: string;
  topics: string[];
}

const languageColors: Record<string, string> = {
  "C#": "#178600",
  "C++": "#f34b7d",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
};

const projectImages: Record<string, string> = {
  MarketOtomasyonu: "/images/market-otomasyonu.png",
  "asp.net-mvc-sehir-tanitimi": "/images/sehir-tanitimi.png",
  "Maze-Game": "/images/maze-game.png",
};

function RepoCard({ repo, index }: { repo: GitHubRepo; index: number }) {
  const image = projectImages[repo.name];

  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      className="block glass-card glow-border glow-border-hover rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300"
    >
      {image && (
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={image}
            alt={repo.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/20 to-transparent" />
        </div>
      )}

      <div className="p-7">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Github size={22} className="text-neon-cyan/70 flex-shrink-0" />
            <h3 className="font-bold text-lg text-white group-hover:text-neon-cyan transition-colors">
              {repo.name}
            </h3>
          </div>
          <ExternalLink
            size={18}
            className="text-gray-600 group-hover:text-neon-cyan/60 transition-colors flex-shrink-0"
          />
        </div>

        <div className="flex items-center gap-4">
          {repo.language && (
            <div className="flex items-center gap-2">
              <span
                className="w-3.5 h-3.5 rounded-full"
                style={{ backgroundColor: languageColors[repo.language] || "#8b949e" }}
              />
              <span className="text-sm text-gray-400">{repo.language}</span>
            </div>
          )}
          {repo.topics.length > 0 && (
            <div className="flex gap-2 overflow-hidden">
              {repo.topics.slice(0, 2).map((topic) => (
                <span
                  key={topic}
                  className="text-xs px-2.5 py-0.5 rounded-full bg-neon-cyan/10 text-neon-cyan/70 border border-neon-cyan/15"
                >
                  {topic}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.a>
  );
}

function FallbackUI({ texts }: { texts: { fallback: string; viewOnGithub: string } }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card glow-border rounded-2xl p-10 text-center max-w-md mx-auto"
    >
      <AlertCircle size={36} className="text-neon-cyan/50 mx-auto mb-5" />
      <p className="text-gray-400 text-lg mb-5">{texts.fallback}</p>
      <a
        href="https://github.com/nihatakkaya"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-base font-medium text-neon-cyan border border-neon-cyan/30 hover:bg-neon-cyan/10 transition-all"
      >
        <Github size={18} />
        {texts.viewOnGithub}
      </a>
    </motion.div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="glass-card glow-border rounded-2xl overflow-hidden animate-pulse">
          <div className="h-48 bg-navy-600/20" />
          <div className="p-7">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 rounded bg-navy-600/40" />
              <div className="h-5 bg-navy-600/40 rounded w-2/3" />
            </div>
            <div className="flex gap-3">
              <div className="h-4 bg-navy-600/20 rounded w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PortfolioSection() {
  const { t } = useLang();
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch(
          "https://api.github.com/users/nihatakkaya/repos?sort=updated&per_page=30"
        );
        if (!res.ok) throw new Error("GitHub API error");
        const data: GitHubRepo[] = await res.json();

        const filtered = data
          .filter((r) => !r.fork)
          .sort(
            (a, b) =>
              new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          )
          .slice(0, 6);

        setRepos(filtered);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, []);

  return (
    <SectionWrapper id="portfolio">
      <div className="text-center mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold mb-4"
        >
          {t.portfolio.title1}{t.portfolio.title1 && " "}<span className="text-gradient">{t.portfolio.title2}</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-gray-400 text-lg max-w-lg mx-auto"
        >
          {t.portfolio.subtitle}
        </motion.p>
      </div>

      {loading && <LoadingSkeleton />}
      {error && <FallbackUI texts={{ fallback: t.portfolio.fallback, viewOnGithub: t.portfolio.viewOnGithub }} />}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
          {repos.map((repo, index) => (
            <RepoCard key={repo.id} repo={repo} index={index} />
          ))}
        </div>
      )}

      {!loading && !error && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/nihatakkaya"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-base font-medium text-neon-cyan border border-neon-cyan/25 hover:border-neon-cyan/50 hover:bg-neon-cyan/5 hover:shadow-[0_0_25px_rgba(0,240,255,0.12)] transition-all duration-300"
          >
            <Github size={20} />
            {t.portfolio.viewAll}
          </a>
        </motion.div>
      )}
    </SectionWrapper>
  );
}
