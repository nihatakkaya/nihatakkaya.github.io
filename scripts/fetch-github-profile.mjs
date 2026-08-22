import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const USERNAME = "nihatakkaya";
const TOKEN = process.env.GH_PROFILE_TOKEN || process.env.GITHUB_TOKEN;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.resolve(__dirname, "../public/data/github-pinned.json");

const query = `
  query PinnedRepositories($login: String!) {
    user(login: $login) {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            id
            name
            nameWithOwner
            url
            description
            stargazerCount
            forkCount
            homepageUrl
            updatedAt
            openGraphImageUrl
            primaryLanguage {
              name
              color
            }
            repositoryTopics(first: 10) {
              nodes {
                topic {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

function requireToken() {
  if (!TOKEN) {
    throw new Error(
      "Missing GitHub token. Set GITHUB_TOKEN in GitHub Actions or GH_PROFILE_TOKEN for manual runs."
    );
  }
}

function normalizeUrl(value) {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

function normalizeRepository(repo) {
  return {
    id: repo.id,
    name: repo.name,
    nameWithOwner: repo.nameWithOwner,
    url: repo.url,
    description: repo.description ?? null,
    stargazerCount: repo.stargazerCount ?? 0,
    forkCount: repo.forkCount ?? 0,
    homepageUrl: normalizeUrl(repo.homepageUrl),
    updatedAt: repo.updatedAt ?? "",
    primaryLanguage: repo.primaryLanguage
      ? {
          name: repo.primaryLanguage.name,
          color: repo.primaryLanguage.color,
        }
      : null,
    topics:
      repo.repositoryTopics?.nodes
        ?.map((node) => node?.topic?.name)
        .filter((topic) => typeof topic === "string" && topic.length > 0) ?? [],
    imageUrl: normalizeUrl(repo.openGraphImageUrl),
  };
}

async function fetchPinnedRepositories() {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
      "User-Agent": "nihatakkaya-github-pages-profile-sync",
    },
    body: JSON.stringify({
      query,
      variables: { login: USERNAME },
    }),
  });

  if (!response.ok) {
    throw new Error(`GitHub GraphQL request failed with ${response.status}.`);
  }

  const result = await response.json();

  if (Array.isArray(result.errors) && result.errors.length > 0) {
    const message = result.errors
      .map((error) => error.message)
      .filter(Boolean)
      .join("; ");
    throw new Error(`GitHub GraphQL returned errors: ${message}`);
  }

  const nodes = result.data?.user?.pinnedItems?.nodes;

  if (!Array.isArray(nodes)) {
    throw new Error(`Pinned repositories were not found for ${USERNAME}.`);
  }

  return nodes.filter(Boolean).map(normalizeRepository);
}

async function readExisting() {
  try {
    return await readFile(outputPath, "utf8");
  } catch {
    return "";
  }
}

async function main() {
  requireToken();

  const payload = {
    username: USERNAME,
    repositories: await fetchPinnedRepositories(),
  };

  const nextContent = `${JSON.stringify(payload, null, 2)}\n`;
  const existingContent = await readExisting();

  if (existingContent === nextContent) {
    console.log("GitHub pinned repositories are already up to date.");
    return;
  }

  await writeFile(outputPath, nextContent, "utf8");
  console.log(`Updated ${path.relative(process.cwd(), outputPath)}.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
