export interface Profile {
  name: string;
  title: string;
  birthDate: string; // ISO date string (YYYY-MM-DD)
  major: string;
  education: string;
  currentEmployment: string;
  bio: string;
  interests: string[];
  notableProjects: string[];
  resumeLink: string;
  schoolLink: string;
  socialLinks: {
    email: string;
    github: string;
    linkedin: string;
  };
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  skills: string[];
  logo: string;
  website: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  date: string;
  skills: string[];
  githubLink: string;
  liveLink: string;
  image: string;
  isPrivate?: boolean;
  stars?: number;
  forks?: number;
  source?: 'manual' | 'github';
}

export interface Skills {
  languages: string[];
  tools: string[];
  coursework: string[];
}

export interface GitHubConfig {
  username: string;
  token?: string;
  includePrivate: boolean;
  includeForks: boolean;
  excludeRepos: string[];
  pinnedRepos: string[];
}

export interface Photo {
  id: string;
  title: string;
  caption?: string;
  url: string;
  createdAt?: string;
}

export interface SiteContent {
  profile: Profile;
  experience: Experience[];
  projects: Project[];
  skills: Skills;
  githubConfig: GitHubConfig;
  photos: Photo[];
}
