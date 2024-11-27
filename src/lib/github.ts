import { Octokit } from "octokit"

const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_TOKEN,
})

export async function getRepository(repo: string, owner = "atilafassina") {
  const repository = await octokit.request("GET /repos/{owner}/{repo}", {
    owner,
    repo,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  })

  return repository.data
}

export type Repository = Awaited<ReturnType<typeof getRepository>>

export async function getRepositories(
  repo: string | string[],
  fetcher: typeof getRepository = getRepository,
): Promise<Repository[]> {
  if (Array.isArray(repo)) {
    return Promise.all(repo.map(async (r) => fetcher(r)))
  } else {
    return [await fetcher(repo)]
  }
}
