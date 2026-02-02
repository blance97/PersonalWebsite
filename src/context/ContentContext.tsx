import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { SiteContent, Profile, Experience, Project, Skills, GitHubConfig } from '../types';

// Import default data
import defaultProfile from '../data/profile.json';
import defaultExperience from '../data/experience.json';
import defaultProjects from '../data/projects.json';
import defaultSkills from '../data/skills.json';
import defaultGitHubConfig from '../data/github-config.json';

const STORAGE_KEY = 'personal-website-content';

interface ContentContextType {
  content: SiteContent;
  updateProfile: (profile: Profile) => void;
  updateExperience: (experience: Experience[]) => void;
  updateProjects: (projects: Project[]) => void;
  updateSkills: (skills: Skills) => void;
  updateGitHubConfig: (config: GitHubConfig) => void;
  resetToDefaults: () => void;
  exportContent: () => void;
}

const ContentContext = createContext<ContentContextType | null>(null);

const getInitialContent = (): SiteContent => {
  if (typeof window === 'undefined') {
    return {
      profile: defaultProfile as Profile,
      experience: defaultExperience as Experience[],
      projects: defaultProjects as Project[],
      skills: defaultSkills as Skills,
      githubConfig: defaultGitHubConfig as GitHubConfig,
    };
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Ensure githubConfig exists (for backwards compatibility)
      if (!parsed.githubConfig) {
        parsed.githubConfig = defaultGitHubConfig;
      }
      return parsed;
    } catch {
      // If parsing fails, return defaults
    }
  }

  return {
    profile: defaultProfile as Profile,
    experience: defaultExperience as Experience[],
    projects: defaultProjects as Project[],
    skills: defaultSkills as Skills,
    githubConfig: defaultGitHubConfig as GitHubConfig,
  };
};

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(getInitialContent);

  // Save to localStorage whenever content changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  }, [content]);

  const updateProfile = (profile: Profile) => {
    setContent((prev) => ({ ...prev, profile }));
  };

  const updateExperience = (experience: Experience[]) => {
    setContent((prev) => ({ ...prev, experience }));
  };

  const updateProjects = (projects: Project[]) => {
    setContent((prev) => ({ ...prev, projects }));
  };

  const updateSkills = (skills: Skills) => {
    setContent((prev) => ({ ...prev, skills }));
  };

  const updateGitHubConfig = (githubConfig: GitHubConfig) => {
    setContent((prev) => ({ ...prev, githubConfig }));
  };

  const resetToDefaults = () => {
    const defaults: SiteContent = {
      profile: defaultProfile as Profile,
      experience: defaultExperience as Experience[],
      projects: defaultProjects as Project[],
      skills: defaultSkills as Skills,
      githubConfig: defaultGitHubConfig as GitHubConfig,
    };
    setContent(defaults);
  };

  const exportContent = () => {
    const dataStr = JSON.stringify(content, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'site-content.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        updateProfile,
        updateExperience,
        updateProjects,
        updateSkills,
        updateGitHubConfig,
        resetToDefaults,
        exportContent,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}
