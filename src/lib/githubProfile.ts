export const GITHUB_USERNAME = "nihatakkaya";
export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;
export const GITHUB_AVATAR_URL = `${GITHUB_PROFILE_URL}.png?size=420`;
export const GITHUB_PINNED_DATA_URL = "/data/github-pinned.json";

export interface PinnedRepository {
  id: string;
  name: string;
  nameWithOwner: string;
  url: string;
  description: string | null;
  stargazerCount: number;
  forkCount: number;
  homepageUrl: string | null;
  updatedAt: string;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  topics: string[];
  imageUrl: string | null;
}

export interface GitHubPinnedData {
  username: string;
  repositories: PinnedRepository[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function nullableString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

function parseLanguage(value: unknown): PinnedRepository["primaryLanguage"] {
  if (!isRecord(value)) return null;

  const name = nullableString(value.name);
  const color = nullableString(value.color);

  if (!name || !color) return null;
  return { name, color };
}

function parseRepository(value: unknown): PinnedRepository | null {
  if (!isRecord(value)) return null;

  const id = nullableString(value.id);
  const name = nullableString(value.name);
  const nameWithOwner = nullableString(value.nameWithOwner);
  const url = nullableString(value.url);

  if (!id || !name || !nameWithOwner || !url) return null;

  return {
    id,
    name,
    nameWithOwner,
    url,
    description: nullableString(value.description),
    stargazerCount:
      typeof value.stargazerCount === "number" ? value.stargazerCount : 0,
    forkCount: typeof value.forkCount === "number" ? value.forkCount : 0,
    homepageUrl: nullableString(value.homepageUrl),
    updatedAt: nullableString(value.updatedAt) ?? "",
    primaryLanguage: parseLanguage(value.primaryLanguage),
    topics: Array.isArray(value.topics)
      ? value.topics.filter((topic): topic is string => typeof topic === "string")
      : [],
    imageUrl: nullableString(value.imageUrl),
  };
}

export function parseGitHubPinnedData(value: unknown): GitHubPinnedData {
  if (!isRecord(value) || !Array.isArray(value.repositories)) {
    throw new Error("Invalid GitHub pinned repositories data.");
  }

  return {
    username: nullableString(value.username) ?? GITHUB_USERNAME,
    repositories: value.repositories
      .map(parseRepository)
      .filter((repo): repo is PinnedRepository => repo !== null),
  };
}
