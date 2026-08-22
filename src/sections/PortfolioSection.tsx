"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, GitFork, Star } from "lucide-react";
import Image from "next/image";
import SectionWrapper from "@/components/SectionWrapper";
import {
  GITHUB_PINNED_DATA_URL,
  GITHUB_PROFILE_URL,
  parseGitHubPinnedData,
  type PinnedRepository,
} from "@/lib/githubProfile";
import { useLang } from "@/lib/i18n";

type LoadStatus = "loading" | "ready" | "empty" | "error";

function ProjectImage({ repo }: { repo: PinnedRepository }) {
  const [failed, setFailed] = useState(false);
  const imageUrl = !failed ? repo.imageUrl : null;

  return (
    <div className="relative w-full h-48 overflow-hidden bg-navy-800/80">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={`${repo.name} preview`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(0,240,255,0.16),transparent_32%),linear-gradient(135deg,rgba(13,18,36,0.95),rgba(10,14,26,0.9))]">
          <Github size={58} className="text-neon-cyan/35" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/20 to-transparent" />
    </div>
  );
}

function RepoCard({ repo, index }: { repo: PinnedRepository; index: number }) {
  const { t } = useLang();
  const hasHomepage = Boolean(repo.homepageUrl && repo.homepageUrl !== repo.url);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      className="relative h-full glass-card glow-border glow-border-hover rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300"
    >
      <a
        href={repo.url}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-10"
        aria-label={`${t.portfolio.viewOnGithub}: ${repo.name}`}
      />

      <ProjectImage repo={repo} />

      <div className="relative z-20 p-7 flex h-[calc(100%-12rem)] min-h-64 flex-col pointer-events-none">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex min-w-0 items-center gap-3">
            <Github size={22} className="text-neon-cyan/70 flex-shrink-0" />
            <h3 className="font-bold text-lg text-white group-hover:text-neon-cyan transition-colors truncate">
              {repo.name}
            </h3>
          </div>
          <ExternalLink
            size={18}
            className="text-gray-600 group-hover:text-neon-cyan/60 transition-colors flex-shrink-0 mt-1"
          />
        </div>

        <p className="text-sm leading-relaxed text-gray-400 mb-5 line-clamp-3 min-h-[4.5rem]">
          {repo.description ?? t.portfolio.noDescription}
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-400 mb-5">
          {repo.primaryLanguage && (
            <div className="flex items-center gap-2">
              <span
                className="w-3.5 h-3.5 rounded-full"
                style={{ backgroundColor: repo.primaryLanguage.color }}
              />
              <span>{repo.primaryLanguage.name}</span>
            </div>
          )}

          <div className="flex items-center gap-1.5">
            <Star size={15} className="text-neon-cyan/55" />
            <span>{repo.stargazerCount}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <GitFork size={15} className="text-neon-cyan/55" />
            <span>{repo.forkCount}</span>
          </div>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-2">
          {repo.topics.slice(0, 3).map((topic) => (
            <span
              key={topic}
              className="max-w-full truncate text-xs px-2.5 py-0.5 rounded-full bg-neon-cyan/10 text-neon-cyan/70 border border-neon-cyan/15"
            >
              {topic}
            </span>
          ))}

          {hasHomepage && (
            <a
              href={repo.homepageUrl ?? undefined}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto ml-auto inline-flex items-center gap-1.5 text-xs font-medium text-neon-cyan/80 hover:text-neon-cyan transition-colors"
            >
              Demo
              <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="glass-card glow-border rounded-2xl overflow-hidden animate-pulse">
          <div className="h-48 bg-navy-600/20" />
          <div className="p-7">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 rounded bg-navy-600/40" />
              <div className="h-5 bg-navy-600/40 rounded w-2/3" />
            </div>
            <div className="h-16 bg-navy-600/20 rounded mb-5" />
            <div className="flex gap-3">
              <div className="h-4 bg-navy-600/20 rounded w-20" />
              <div className="h-4 bg-navy-600/20 rounded w-14" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function PortfolioStateMessage({ message }: { message: string }) {
  return (
    <div className="glass-card glow-border rounded-2xl px-6 py-10 text-center text-gray-400">
      <Github size={34} className="mx-auto mb-4 text-neon-cyan/45" />
      <p>{message}</p>
    </div>
  );
}

export default function PortfolioSection() {
  const { t } = useLang();
  const [repos, setRepos] = useState<PinnedRepository[]>([]);
  const [status, setStatus] = useState<LoadStatus>("loading");

  useEffect(() => {
    let isMounted = true;

    async function fetchRepos() {
      try {
        const response = await fetch(GITHUB_PINNED_DATA_URL, {
          cache: "no-store",
          headers: { Accept: "application/json" },
        });

        if (!response.ok) {
          throw new Error(`GitHub pinned data request failed: ${response.status}`);
        }

        const data = parseGitHubPinnedData(await response.json());

        if (!isMounted) return;

        setRepos(data.repositories);
        setStatus(data.repositories.length > 0 ? "ready" : "empty");
      } catch {
        if (!isMounted) return;
        setRepos([]);
        setStatus("error");
      }
    }

    fetchRepos();

    return () => {
      isMounted = false;
    };
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
          {t.portfolio.title1}
          {t.portfolio.title1 && " "}
          <span className="text-gradient">{t.portfolio.title2}</span>
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

      {status === "loading" && <LoadingSkeleton />}

      {status === "ready" && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 items-stretch">
          {repos.map((repo, index) => (
            <RepoCard key={repo.id} repo={repo} index={index} />
          ))}
        </div>
      )}

      {status === "empty" && (
        <PortfolioStateMessage message={t.portfolio.empty} />
      )}

      {status === "error" && <PortfolioStateMessage message={t.portfolio.fallback} />}

      {status !== "loading" && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href={GITHUB_PROFILE_URL}
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
