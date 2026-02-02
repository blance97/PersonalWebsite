import { useContent } from '../context/ContentContext';
import styles from './ProjectsPage.module.css';

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"/>
  </svg>
);

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
  </svg>
);

const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 10v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-3zm-5 7.723v2.277h-2v-2.277c-.595-.347-1-.984-1-1.723 0-1.104.896-2 2-2s2 .896 2 2c0 .738-.404 1.376-1 1.723zm-5-7.723v-4c0-2.206 1.794-4 4-4s4 1.794 4 4v4h-8z"/>
  </svg>
);

export default function ProjectsPage() {
  const { content } = useContent();
  const projects = content.projects;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Projects</h1>
        <p className={styles.subtitle}>Things I've built and worked on</p>

        <div className={styles.grid}>
          {projects.map((project) => (
            <article key={project.id} className={styles.card}>
              {project.image && (
                <div className={styles.cardImage}>
                  <img src={project.image} alt={project.name} />
                </div>
              )}

              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <h2 className={styles.projectName}>
                    {project.name}
                    {project.isPrivate && (
                      <span className={styles.privateBadge} title="Private Repository">
                        <LockIcon />
                      </span>
                    )}
                  </h2>
                  <div className={styles.meta}>
                    <span className={styles.date}>{project.date}</span>
                    {project.source === 'github' && (
                      <span className={styles.sourceBadge}>GitHub</span>
                    )}
                  </div>
                </div>

                <p className={styles.description}>{project.description}</p>

                {(project.stars !== undefined && project.stars > 0) && (
                  <div className={styles.stats}>
                    <span className={styles.stat}>
                      <StarIcon /> {project.stars}
                    </span>
                  </div>
                )}

                <div className={styles.skills}>
                  {project.skills.map((skill) => (
                    <span key={skill} className={styles.skill}>{skill}</span>
                  ))}
                </div>

                <div className={styles.links}>
                  {project.githubLink && !project.isPrivate && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      <GithubIcon />
                      <span>Code</span>
                    </a>
                  )}
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      <ExternalLinkIcon />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {projects.length === 0 && (
          <div className={styles.empty}>
            <p>No projects to display.</p>
          </div>
        )}
      </div>
    </div>
  );
}
