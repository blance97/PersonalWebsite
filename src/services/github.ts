// GitHub API service for fetching repositories
// Can fetch public repos without auth, or private repos with a personal access token

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  private: boolean;
  fork: boolean;
}

export interface GitHubConfig {
  username: string;
  token?: string; // Personal access token for private repos
  includePrivate: boolean;
  includeForks: boolean;
  excludeRepos: string[]; // Repo names to exclude
  pinnedRepos: string[]; // Repo names to show first
}

const GITHUB_API_BASE = 'https://api.github.com';

export async function fetchGitHubRepos(config: GitHubConfig): Promise<GitHubRepo[]> {
  const { username, token, includePrivate, includeForks, excludeRepos, pinnedRepos } = config;

  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json',
  };

  // Add auth header if token provided (needed for private repos)
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    let repos: GitHubRepo[] = [];

    if (token && includePrivate) {
      // Use authenticated endpoint to get ALL repos (including private)
      // This endpoint returns repos for the authenticated user
      const response = await fetch(
        `${GITHUB_API_BASE}/user/repos?per_page=100&sort=updated&affiliation=owner`,
        { headers }
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }

      repos = await response.json();
    } else {
      // Use public endpoint for public repos only
      const response = await fetch(
        `${GITHUB_API_BASE}/users/${username}/repos?per_page=100&sort=updated`,
        { headers }
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }

      repos = await response.json();
    }

    // Filter based on config
    repos = repos.filter((repo) => {
      // Exclude specified repos
      if (excludeRepos.includes(repo.name)) return false;

      // Handle private repos
      if (repo.private && !includePrivate) return false;

      // Handle forks
      if (repo.fork && !includeForks) return false;

      return true;
    });

    // Sort: pinned repos first, then by updated date
    repos.sort((a, b) => {
      const aIsPinned = pinnedRepos.includes(a.name);
      const bIsPinned = pinnedRepos.includes(b.name);

      if (aIsPinned && !bIsPinned) return -1;
      if (!aIsPinned && bIsPinned) return 1;

      // If both pinned, maintain pinned order
      if (aIsPinned && bIsPinned) {
        return pinnedRepos.indexOf(a.name) - pinnedRepos.indexOf(b.name);
      }

      // Otherwise sort by last updated
      return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
    });

    return repos;
  } catch (error) {
    console.error('Failed to fetch GitHub repos:', error);
    throw error;
  }
}

// Fetch a single repo's details (includes topics)
export async function fetchRepoDetails(
  owner: string,
  repo: string,
  token?: string
): Promise<GitHubRepo> {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}`, { headers });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  return response.json();
}

// Convert GitHub repo to our Project format
export function repoToProject(repo: GitHubRepo): {
  id: string;
  name: string;
  description: string;
  date: string;
  skills: string[];
  githubLink: string;
  liveLink: string;
  image: string;
  isPrivate: boolean;
  stars: number;
  forks: number;
} {
  return {
    id: `github-${repo.id}`,
    name: repo.name.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    description: repo.description || 'No description available',
    date: new Date(repo.created_at).getFullYear().toString(),
    skills: [
      ...(repo.language ? [repo.language] : []),
      ...repo.topics.slice(0, 5), // Limit topics
    ],
    githubLink: repo.html_url,
    liveLink: repo.homepage || '',
    image: '',
    isPrivate: repo.private,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
  };
}
