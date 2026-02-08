import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import type { SiteContent, Profile, Experience, Project, Skills, GitHubConfig, Photo } from '../types';
import { api } from '../services/api';

// Import default data for fallback
import defaultProfile from '../data/profile.json';
import defaultExperience from '../data/experience.json';
import defaultProjects from '../data/projects.json';
import defaultSkills from '../data/skills.json';
import defaultGitHubConfig from '../data/github-config.json';
import defaultPhotos from '../data/photos.json';

const STORAGE_KEY = 'personal-website-content';

interface ContentContextType {
  content: SiteContent;
  loading: boolean;
  error: string | null;
  updateProfile: (profile: Profile) => Promise<void>;
  updateExperience: (experience: Experience[]) => Promise<void>;
  updateProjects: (projects: Project[]) => Promise<void>;
  updateSkills: (skills: Skills) => Promise<void>;
  updateGitHubConfig: (config: GitHubConfig) => Promise<void>;
  updatePhotos: (photos: Photo[]) => Promise<void>;
  resetToDefaults: () => void;
  exportContent: () => void;
  refetch: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType | null>(null);

const getDefaultContent = (): SiteContent => ({
  profile: defaultProfile as Profile,
  experience: defaultExperience as Experience[],
  projects: defaultProjects as Project[],
  skills: defaultSkills as Skills,
  githubConfig: defaultGitHubConfig as GitHubConfig,
  photos: defaultPhotos as Photo[],
});

const getCachedContent = (): SiteContent | null => {
  if (typeof window === 'undefined') return null;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Ensure githubConfig exists (for backwards compatibility)
      if (!parsed.githubConfig) {
        parsed.githubConfig = defaultGitHubConfig;
      }
      // Ensure photos exists (for backwards compatibility)
      if (!parsed.photos) {
        parsed.photos = defaultPhotos;
      }
      return parsed;
    } catch {
      // If parsing fails, return null
    }
  }
  return null;
};

export function ContentProvider({ children }: { children: ReactNode }) {
  // Initialize with cached content or defaults
  const [content, setContent] = useState<SiteContent>(() => getCachedContent() || getDefaultContent());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch content from API
  const fetchContent = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await api.getContent();
      // Only update if we got valid data with a profile
      if (data && data.profile) {
        // Ensure photos exists (API might not include it yet)
        if (!data.photos) {
          data.photos = [];
        }
        setContent(data);
        // Cache in localStorage for offline support
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      }
    } catch (err) {
      console.warn('Failed to fetch content from API, using cached/default data:', err);
      // Keep using cached or default content
      setError(err instanceof Error ? err.message : 'Failed to load content');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch content on mount
  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const updateProfile = async (profile: Profile) => {
    try {
      const updated = await api.updateProfile(profile);
      setContent((prev) => {
        const newContent = { ...prev, profile: updated };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
        return newContent;
      });
    } catch (err) {
      // Fallback to local update if API fails
      console.warn('API update failed, updating locally:', err);
      setContent((prev) => {
        const newContent = { ...prev, profile };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
        return newContent;
      });
      throw err;
    }
  };

  const updateExperience = async (experience: Experience[]) => {
    try {
      const updated = await api.updateExperience(experience);
      setContent((prev) => {
        const newContent = { ...prev, experience: updated };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
        return newContent;
      });
    } catch (err) {
      console.warn('API update failed, updating locally:', err);
      setContent((prev) => {
        const newContent = { ...prev, experience };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
        return newContent;
      });
      throw err;
    }
  };

  const updateProjects = async (projects: Project[]) => {
    try {
      const updated = await api.updateProjects(projects);
      setContent((prev) => {
        const newContent = { ...prev, projects: updated };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
        return newContent;
      });
    } catch (err) {
      console.warn('API update failed, updating locally:', err);
      setContent((prev) => {
        const newContent = { ...prev, projects };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
        return newContent;
      });
      throw err;
    }
  };

  const updateSkills = async (skills: Skills) => {
    try {
      const updated = await api.updateSkills(skills);
      setContent((prev) => {
        const newContent = { ...prev, skills: updated };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
        return newContent;
      });
    } catch (err) {
      console.warn('API update failed, updating locally:', err);
      setContent((prev) => {
        const newContent = { ...prev, skills };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
        return newContent;
      });
      throw err;
    }
  };

  const updateGitHubConfig = async (githubConfig: GitHubConfig) => {
    try {
      const updated = await api.updateGitHubConfig(githubConfig);
      setContent((prev) => {
        const newContent = { ...prev, githubConfig: updated };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
        return newContent;
      });
    } catch (err) {
      console.warn('API update failed, updating locally:', err);
      setContent((prev) => {
        const newContent = { ...prev, githubConfig };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
        return newContent;
      });
      throw err;
    }
  };

  const updatePhotos = async (photos: Photo[]) => {
    try {
      const updated = await api.updatePhotos(photos);
      setContent((prev) => {
        const newContent = { ...prev, photos: updated };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
        return newContent;
      });
    } catch (err) {
      console.warn('API update failed, updating locally:', err);
      setContent((prev) => {
        const newContent = { ...prev, photos };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
        return newContent;
      });
      throw err;
    }
  };

  const resetToDefaults = () => {
    const defaults = getDefaultContent();
    setContent(defaults);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
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
        loading,
        error,
        updateProfile,
        updateExperience,
        updateProjects,
        updateSkills,
        updateGitHubConfig,
        updatePhotos,
        resetToDefaults,
        exportContent,
        refetch: fetchContent,
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
