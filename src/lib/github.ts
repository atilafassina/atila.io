import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
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
