import { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { useAuth } from '../context/AuthContext';
import { fetchGitHubRepos, type GitHubRepo } from '../services/github';
import type { Profile, Experience, Project, Skills, GitHubConfig } from '../types';
import LoginPage from './LoginPage';
import styles from './AdminPage.module.css';

type Tab = 'profile' | 'experience' | 'projects' | 'skills' | 'github';

export default function AdminPage() {
  const { isAuthenticated, logout, userEmail } = useAuth();
  const { content, updateProfile, updateExperience, updateProjects, updateSkills, updateGitHubConfig, resetToDefaults, exportContent } = useContent();
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [saved, setSaved] = useState(false);

  const showSavedMessage = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage onSuccess={() => {}} />;
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'profile', label: 'Profile' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'github', label: 'GitHub' },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Admin Panel</h1>
            <p className={styles.userInfo}>Logged in as {userEmail}</p>
          </div>
          <div className={styles.actions}>
            <button onClick={exportContent} className={styles.exportButton}>
              Export JSON
            </button>
            <button onClick={resetToDefaults} className={styles.resetButton}>
              Reset to Defaults
            </button>
            <button onClick={logout} className={styles.logoutButton}>
              Logout
            </button>
          </div>
        </div>

        {saved && (
          <div className={styles.savedMessage}>
            ✓ Changes saved successfully!
          </div>
        )}

        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className={styles.content}>
          {activeTab === 'profile' && (
            <ProfileEditor
              profile={content.profile}
              onSave={(profile) => { updateProfile(profile); showSavedMessage(); }}
            />
          )}
          {activeTab === 'experience' && (
            <ExperienceEditor
              experience={content.experience}
              onSave={(experience) => { updateExperience(experience); showSavedMessage(); }}
            />
          )}
          {activeTab === 'projects' && (
            <ProjectsEditor
              projects={content.projects}
              githubConfig={content.githubConfig}
              onSave={(projects) => { updateProjects(projects); showSavedMessage(); }}
            />
          )}
          {activeTab === 'skills' && (
            <SkillsEditor
              skills={content.skills}
              onSave={(skills) => { updateSkills(skills); showSavedMessage(); }}
            />
          )}
          {activeTab === 'github' && (
            <GitHubEditor
              config={content.githubConfig}
              onSave={(config) => { updateGitHubConfig(config); showSavedMessage(); }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// Profile Editor Component
function ProfileEditor({ profile, onSave }: { profile: Profile; onSave: (p: Profile) => void }) {
  const [formData, setFormData] = useState<Profile>(profile);

  const handleChange = (field: keyof Profile, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSocialChange = (field: keyof Profile['socialLinks'], value: string) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [field]: value },
    }));
  };

  const handleArrayChange = (field: 'interests' | 'notableProjects', value: string) => {
    const array = value.split(',').map((s) => s.trim()).filter(Boolean);
    setFormData((prev) => ({ ...prev, [field]: array }));
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className={styles.form}>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label>Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Birth Date</label>
          <input
            type="date"
            value={formData.birthDate}
            onChange={(e) => handleChange('birthDate', e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Major</label>
          <input
            type="text"
            value={formData.major}
            onChange={(e) => handleChange('major', e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Education</label>
          <input
            type="text"
            value={formData.education}
            onChange={(e) => handleChange('education', e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Current Employment</label>
          <input
            type="text"
            value={formData.currentEmployment}
            onChange={(e) => handleChange('currentEmployment', e.target.value)}
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label>Bio</label>
        <textarea
          value={formData.bio}
          onChange={(e) => handleChange('bio', e.target.value)}
          rows={3}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Interests (comma-separated)</label>
        <input
          type="text"
          value={formData.interests.join(', ')}
          onChange={(e) => handleArrayChange('interests', e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Notable Projects (comma-separated)</label>
        <input
          type="text"
          value={formData.notableProjects.join(', ')}
          onChange={(e) => handleArrayChange('notableProjects', e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Resume Link</label>
        <input
          type="url"
          value={formData.resumeLink}
          onChange={(e) => handleChange('resumeLink', e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label>School Link</label>
        <input
          type="url"
          value={formData.schoolLink}
          onChange={(e) => handleChange('schoolLink', e.target.value)}
        />
      </div>

      <h3 className={styles.subheading}>Social Links</h3>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label>Email</label>
          <input
            type="email"
            value={formData.socialLinks.email}
            onChange={(e) => handleSocialChange('email', e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label>GitHub URL</label>
          <input
            type="url"
            value={formData.socialLinks.github}
            onChange={(e) => handleSocialChange('github', e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label>LinkedIn URL</label>
          <input
            type="url"
            value={formData.socialLinks.linkedin}
            onChange={(e) => handleSocialChange('linkedin', e.target.value)}
          />
        </div>
      </div>

      <button type="submit" className={styles.saveButton}>Save Profile</button>
    </form>
  );
}

// Experience Editor Component
function ExperienceEditor({ experience, onSave }: { experience: Experience[]; onSave: (e: Experience[]) => void }) {
  const [items, setItems] = useState<Experience[]>(experience);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const addNew = () => {
    const newItem: Experience = {
      id: `exp-${Date.now()}`,
      company: 'New Company',
      position: 'Position',
      description: 'Description here...',
      startDate: new Date().getFullYear().toString(),
      endDate: 'Present',
      location: 'City, State',
      skills: [],
      logo: '',
      website: '',
    };
    setItems([newItem, ...items]);
    setEditingIndex(0);
  };

  const updateItem = (index: number, updates: Partial<Experience>) => {
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, ...updates } : item)));
  };

  const deleteItem = (index: number) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setItems((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= items.length) return;
    const newItems = [...items];
    [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]];
    setItems(newItems);
  };

  return (
    <div className={styles.listEditor}>
      <div className={styles.listHeader}>
        <button onClick={addNew} className={styles.addButton}>+ Add Experience</button>
        <button onClick={() => onSave(items)} className={styles.saveButton}>Save All</button>
      </div>

      {items.map((item, index) => (
        <div key={item.id} className={styles.listItem}>
          <div className={styles.listItemHeader}>
            <div>
              <h4>{item.company}</h4>
              <p className={styles.listItemSubtitle}>{item.position}</p>
            </div>
            <div className={styles.listItemActions}>
              <button onClick={() => moveItem(index, 'up')} disabled={index === 0}>↑</button>
              <button onClick={() => moveItem(index, 'down')} disabled={index === items.length - 1}>↓</button>
              <button onClick={() => setEditingIndex(editingIndex === index ? null : index)}>
                {editingIndex === index ? 'Close' : 'Edit'}
              </button>
              <button onClick={() => deleteItem(index)} className={styles.deleteButton}>Delete</button>
            </div>
          </div>

          {editingIndex === index && (
            <div className={styles.listItemEditor}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Company</label>
                  <input
                    type="text"
                    value={item.company}
                    onChange={(e) => updateItem(index, { company: e.target.value })}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Position</label>
                  <input
                    type="text"
                    value={item.position}
                    onChange={(e) => updateItem(index, { position: e.target.value })}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Start Date</label>
                  <input
                    type="text"
                    value={item.startDate}
                    onChange={(e) => updateItem(index, { startDate: e.target.value })}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>End Date</label>
                  <input
                    type="text"
                    value={item.endDate}
                    onChange={(e) => updateItem(index, { endDate: e.target.value })}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Location</label>
                  <input
                    type="text"
                    value={item.location}
                    onChange={(e) => updateItem(index, { location: e.target.value })}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Website</label>
                  <input
                    type="url"
                    value={item.website}
                    onChange={(e) => updateItem(index, { website: e.target.value })}
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Description</label>
                <textarea
                  value={item.description}
                  onChange={(e) => updateItem(index, { description: e.target.value })}
                  rows={4}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Skills (comma-separated)</label>
                <input
                  type="text"
                  value={item.skills.join(', ')}
                  onChange={(e) => updateItem(index, { skills: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Projects Editor Component
function ProjectsEditor({ projects, githubConfig, onSave }: {
  projects: Project[];
  githubConfig: GitHubConfig;
  onSave: (p: Project[]) => void;
}) {
  const [items, setItems] = useState<Project[]>(projects);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showImport, setShowImport] = useState(false);
  const [githubRepos, setGithubRepos] = useState<GitHubRepo[]>([]);
  const [loadingRepos, setLoadingRepos] = useState(false);

  const fetchReposForImport = async () => {
    if (!githubConfig.username) return;
    setLoadingRepos(true);
    try {
      const repos = await fetchGitHubRepos({
        ...githubConfig,
        excludeRepos: [], // Show all repos for import
      });
      // Filter out repos that are already imported
      const existingGithubIds = items
        .filter(p => p.id.startsWith('github-'))
        .map(p => p.id);
      setGithubRepos(repos.filter(r => !existingGithubIds.includes(`github-${r.id}`)));
    } catch (err) {
      console.error('Failed to fetch repos:', err);
    } finally {
      setLoadingRepos(false);
    }
  };

  const importRepo = (repo: GitHubRepo) => {
    const newProject: Project = {
      id: `github-${repo.id}`,
      name: repo.name.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      description: repo.description || 'No description available',
      date: new Date(repo.created_at).getFullYear().toString(),
      skills: [
        ...(repo.language ? [repo.language] : []),
        ...repo.topics.slice(0, 5),
      ],
      githubLink: repo.html_url,
      liveLink: repo.homepage || '',
      image: '',
      isPrivate: repo.private,
      stars: repo.stargazers_count,
      source: 'github',
    };
    setItems([newProject, ...items]);
    setGithubRepos(prev => prev.filter(r => r.id !== repo.id));
  };

  const addNew = () => {
    const newItem: Project = {
      id: `proj-${Date.now()}`,
      name: 'New Project',
      description: 'Project description here...',
      date: new Date().getFullYear().toString(),
      skills: [],
      githubLink: '',
      liveLink: '',
      image: '',
    };
    setItems([newItem, ...items]);
    setEditingIndex(0);
  };

  const updateItem = (index: number, updates: Partial<Project>) => {
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, ...updates } : item)));
  };

  const deleteItem = (index: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setItems((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= items.length) return;
    const newItems = [...items];
    [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]];
    setItems(newItems);
  };

  return (
    <div className={styles.listEditor}>
      <div className={styles.listHeader}>
        <div className={styles.headerButtons}>
          <button onClick={addNew} className={styles.addButton}>+ Add Project</button>
          <button
            onClick={() => { setShowImport(!showImport); if (!showImport) fetchReposForImport(); }}
            className={styles.importButton}
          >
            {showImport ? '✕ Close Import' : '📥 Import from GitHub'}
          </button>
        </div>
        <button onClick={() => onSave(items)} className={styles.saveButton}>Save All</button>
      </div>

      {/* Import from GitHub Section */}
      {showImport && (
        <div className={styles.importSection}>
          <h4>Import from GitHub</h4>
          <p className={styles.importHint}>
            Select repos to import. Once imported, you can edit them like any other project.
          </p>
          {loadingRepos && <p className={styles.loadingText}>Loading repositories...</p>}
          {!loadingRepos && githubRepos.length === 0 && (
            <p className={styles.emptyText}>No more repos to import. All repos are already in your projects list.</p>
          )}
          {!loadingRepos && githubRepos.length > 0 && (
            <div className={styles.importList}>
              {githubRepos.map((repo) => (
                <div key={repo.id} className={styles.importItem}>
                  <div className={styles.importItemInfo}>
                    <span className={styles.importItemName}>
                      {repo.name}
                      {repo.private && <span className={styles.privateBadge}>🔒</span>}
                    </span>
                    <span className={styles.importItemMeta}>
                      {repo.language && <span>{repo.language}</span>}
                      {repo.stargazers_count > 0 && <span>⭐ {repo.stargazers_count}</span>}
                    </span>
                  </div>
                  <button
                    onClick={() => importRepo(repo)}
                    className={styles.importItemButton}
                  >
                    + Import
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {items.map((item, index) => (
        <div key={item.id} className={`${styles.listItem} ${item.source === 'github' ? styles.githubItem : ''}`}>
          <div className={styles.listItemHeader}>
            <div>
              <h4>
                {item.name}
                {item.source === 'github' && <span className={styles.sourceBadge}>GitHub</span>}
                {item.isPrivate && <span className={styles.privateBadge}>🔒</span>}
              </h4>
              <p className={styles.listItemSubtitle}>{item.date}</p>
            </div>
            <div className={styles.listItemActions}>
              <button onClick={() => moveItem(index, 'up')} disabled={index === 0}>↑</button>
              <button onClick={() => moveItem(index, 'down')} disabled={index === items.length - 1}>↓</button>
              <button onClick={() => setEditingIndex(editingIndex === index ? null : index)}>
                {editingIndex === index ? 'Close' : 'Edit'}
              </button>
              <button onClick={() => deleteItem(index)} className={styles.deleteButton}>Delete</button>
            </div>
          </div>

          {editingIndex === index && (
            <div className={styles.listItemEditor}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Project Name</label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateItem(index, { name: e.target.value })}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Date</label>
                  <input
                    type="text"
                    value={item.date}
                    onChange={(e) => updateItem(index, { date: e.target.value })}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>GitHub Link</label>
                  <input
                    type="url"
                    value={item.githubLink}
                    onChange={(e) => updateItem(index, { githubLink: e.target.value })}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Live Demo Link</label>
                  <input
                    type="url"
                    value={item.liveLink}
                    onChange={(e) => updateItem(index, { liveLink: e.target.value })}
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Description</label>
                <textarea
                  value={item.description}
                  onChange={(e) => updateItem(index, { description: e.target.value })}
                  rows={4}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Skills (comma-separated)</label>
                <input
                  type="text"
                  value={item.skills.join(', ')}
                  onChange={(e) => updateItem(index, { skills: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Project Image</label>
                <div className={styles.imageUpload}>
                  {item.image && (
                    <div className={styles.imagePreview}>
                      <img src={item.image} alt="Preview" />
                      <button
                        type="button"
                        onClick={() => updateItem(index, { image: '' })}
                        className={styles.removeImageButton}
                      >
                        ✕ Remove
                      </button>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          updateItem(index, { image: reader.result as string });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className={styles.fileInput}
                  />
                  <span className={styles.orText}>or</span>
                  <input
                    type="url"
                    value={item.image?.startsWith('data:') ? '' : item.image}
                    onChange={(e) => updateItem(index, { image: e.target.value })}
                    placeholder="Paste image URL"
                    className={styles.urlInput}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Skills Editor Component
function SkillsEditor({ skills, onSave }: { skills: Skills; onSave: (s: Skills) => void }) {
  const [formData, setFormData] = useState<Skills>(skills);

  const handleArrayChange = (field: keyof Skills, value: string) => {
    const array = value.split(',').map((s) => s.trim()).filter(Boolean);
    setFormData((prev) => ({ ...prev, [field]: array }));
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className={styles.form}>
      <div className={styles.formGroup}>
        <label>Languages & Frameworks (comma-separated)</label>
        <textarea
          value={formData.languages.join(', ')}
          onChange={(e) => handleArrayChange('languages', e.target.value)}
          rows={3}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Tools & Technologies (comma-separated)</label>
        <textarea
          value={formData.tools.join(', ')}
          onChange={(e) => handleArrayChange('tools', e.target.value)}
          rows={3}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Coursework (comma-separated)</label>
        <textarea
          value={formData.coursework.join(', ')}
          onChange={(e) => handleArrayChange('coursework', e.target.value)}
          rows={3}
        />
      </div>

      <button type="submit" className={styles.saveButton}>Save Skills</button>
    </form>
  );
}

// GitHub Config Editor Component
function GitHubEditor({ config, onSave }: {
  config: GitHubConfig;
  onSave: (c: GitHubConfig) => void;
}) {
  const [formData, setFormData] = useState<GitHubConfig>(config);

  const handleChange = (field: keyof GitHubConfig, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className={styles.form}>
      <div className={styles.infoBox}>
        <h4>📦 GitHub Integration</h4>
        <p>
          Connect your GitHub account to automatically display your repositories on the Projects page.
          Go to the <strong>Projects</strong> tab to import and manage individual repos.
        </p>
      </div>

      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label>GitHub Username</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => handleChange('username', e.target.value)}
            placeholder="e.g., blance97"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Personal Access Token (optional)</label>
          <input
            type="password"
            value={formData.token || ''}
            onChange={(e) => handleChange('token', e.target.value)}
            placeholder="ghp_xxxxxxxxxxxx"
          />
          <small className={styles.hint}>
            Required for private repos. Needs 'repo' scope.
          </small>
        </div>
      </div>

      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={formData.includePrivate}
              onChange={(e) => handleChange('includePrivate', e.target.checked)}
            />
            <span>Include Private Repositories</span>
          </label>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={formData.includeForks}
              onChange={(e) => handleChange('includeForks', e.target.checked)}
            />
            <span>Include Forked Repositories</span>
          </label>
        </div>
      </div>

      <button type="button" onClick={() => onSave(formData)} className={styles.saveButton}>
        Save GitHub Settings
      </button>
    </div>
  );
}
