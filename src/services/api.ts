import type { SiteContent, Profile, Experience, Project, Skills, GitHubConfig } from '../types';

const API_BASE = '/api';

async function fetchWithError<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

export const api = {
  // Get all content
  getContent: (): Promise<SiteContent> => fetchWithError(`${API_BASE}/content`),

  // Profile
  updateProfile: (profile: Profile): Promise<Profile> =>
    fetchWithError(`${API_BASE}/profile`, {
      method: 'PUT',
      body: JSON.stringify(profile),
    }),

  // Experience
  getExperience: (): Promise<Experience[]> => fetchWithError(`${API_BASE}/experience`),

  updateExperience: (experience: Experience[]): Promise<Experience[]> =>
    fetchWithError(`${API_BASE}/experience`, {
      method: 'PUT',
      body: JSON.stringify(experience),
    }),

  createExperience: (experience: Omit<Experience, 'id'>): Promise<Experience> =>
    fetchWithError(`${API_BASE}/experience`, {
      method: 'POST',
      body: JSON.stringify(experience),
    }),

  deleteExperience: (id: string): Promise<void> =>
    fetchWithError(`${API_BASE}/experience/${id}`, {
      method: 'DELETE',
    }),

  // Projects
  getProjects: (): Promise<Project[]> => fetchWithError(`${API_BASE}/projects`),

  updateProjects: (projects: Project[]): Promise<Project[]> =>
    fetchWithError(`${API_BASE}/projects`, {
      method: 'PUT',
      body: JSON.stringify(projects),
    }),

  createProject: (project: Omit<Project, 'id'>): Promise<Project> =>
    fetchWithError(`${API_BASE}/projects`, {
      method: 'POST',
      body: JSON.stringify(project),
    }),

  deleteProject: (id: string): Promise<void> =>
    fetchWithError(`${API_BASE}/projects/${id}`, {
      method: 'DELETE',
    }),

  // Skills
  updateSkills: (skills: Skills): Promise<Skills> =>
    fetchWithError(`${API_BASE}/skills`, {
      method: 'PUT',
      body: JSON.stringify(skills),
    }),

  // GitHub Config
  getGitHubConfig: (): Promise<GitHubConfig> => fetchWithError(`${API_BASE}/github/config`),

  updateGitHubConfig: (config: GitHubConfig): Promise<GitHubConfig> =>
    fetchWithError(`${API_BASE}/github/config`, {
      method: 'PUT',
      body: JSON.stringify(config),
    }),

  // Health check
  health: (): Promise<{ status: string; timestamp: string }> => fetchWithError('/health'),

  // Images
  getImages: (): Promise<ImageMeta[]> => fetchWithError(`${API_BASE}/images`),

  uploadImage: (file: File): Promise<ImageUploadResponse> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64 = (reader.result as string).split(',')[1]; // Remove data:image/...;base64, prefix
          const result = await fetchWithError<ImageUploadResponse>(`${API_BASE}/images`, {
            method: 'POST',
            body: JSON.stringify({
              name: file.name,
              mimeType: file.type,
              data: base64,
            }),
          });
          resolve(result);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  },

  deleteImage: (id: string): Promise<void> =>
    fetchWithError(`${API_BASE}/images/${id}`, {
      method: 'DELETE',
    }),

  getImageUrl: (id: string): string => `${API_BASE}/images/${id}/raw`,
};

export interface ImageMeta {
  id: string;
  name: string;
  mimeType: string;
  size: number;
  createdAt: string;
}

export interface ImageUploadResponse {
  id: string;
  name: string;
  mimeType: string;
  size: number;
  url: string;
  createdAt: string;
}
