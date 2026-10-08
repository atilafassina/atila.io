import { Octokit } from "octokit";

const octokit = new Octokit({
  // empty/missing token → unauthenticated requests (lower rate limit) instead of a 401
  auth: process.env.GITHUB_TOKEN || undefined,
});

export async function getRepository(repo: string, owner = "atilafassina") {
  try {
    const repository = await octokit.request("GET /repos/{owner}/{repo}", {
      owner,
      repo,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    return repository.data;
  } catch (error) {
    console.error(`Failed to fetch repository ${owner}/${repo}:`, error);
    // Return minimal mock data to prevent the app from crashing
    return {
      name: repo,
      full_name: `${owner}/${repo}`,
      description: "Repository data unavailable",
      html_url: `https://github.com/${owner}/${repo}`,
      stargazers_count: 0,
      forks_count: 0,
      language: null,
      topics: [],
    } as any;
  }
}

export type Repository = Awaited<ReturnType<typeof getRepository>>;

export async function getRepositories(
  repo: string | string[],
  fetcher: typeof getRepository = getRepository,
): Promise<Repository[]> {
  if (Array.isArray(repo)) {
    return Promise.all(repo.map(async (r) => fetcher(r)));
  } else {
    return [await fetcher(repo)];
  }
}

export type RepoSnapshot = {
  stars: number;
  version: string | null;
  releasedAt: string | null;
};

/**
 * Live numbers for a showcased repo. Returns `null` on any failure so the UI can
 * hide the numbers instead of rendering misleading zeros.
 */
export async function getRepoSnapshot(
  repo: string,
  owner = "atilafassina",
): Promise<RepoSnapshot | null> {
  try {
    const headers = { "X-GitHub-Api-Version": "2022-11-28" };
    const [repository, release] = await Promise.all([
      octokit.request("GET /repos/{owner}/{repo}", { owner, repo, headers }),
      octokit
        .request("GET /repos/{owner}/{repo}/releases/latest", {
          owner,
          repo,
          headers,
        })
        .catch(() => null),
    ]);

    return {
      stars: repository.data.stargazers_count,
      version: release?.data.tag_name ?? null,
      releasedAt: release?.data.published_at ?? null,
    };
  } catch (error) {
    console.error(`Failed to fetch snapshot ${owner}/${repo}:`, error);
    return null;
  }
}
