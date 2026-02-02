import { useContent } from '../context/ContentContext';
import styles from './ExperiencePage.module.css';

const ExternalLinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"/>
  </svg>
);

export default function ExperiencePage() {
  const { content } = useContent();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Experience</h1>
        <p className={styles.subtitle}>My professional journey and work history</p>

        <div className={styles.timeline}>
          {content.experience.map((job, index) => (
            <div key={job.id} className={styles.timelineItem}>
              <div className={styles.timelineLine}>
                <div className={styles.timelineDot}></div>
                {index < content.experience.length - 1 && <div className={styles.timelineConnector}></div>}
              </div>

              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.companyInfo}>
                    {job.logo && (
                      <img src={job.logo} alt={job.company} className={styles.companyLogo} />
                    )}
                    <div>
                      <h2 className={styles.companyName}>
                        {job.company}
                        {job.website && (
                          <a
                            href={job.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.externalLink}
                            aria-label={`Visit ${job.company} website`}
                          >
                            <ExternalLinkIcon />
                          </a>
                        )}
                      </h2>
                      <p className={styles.position}>{job.position}</p>
                    </div>
                  </div>
                  <div className={styles.meta}>
                    <span className={styles.date}>
                      {job.startDate}{job.endDate ? ` - ${job.endDate}` : ''}
                    </span>
                    <span className={styles.location}>{job.location}</span>
                  </div>
                </div>

                <div className={styles.description}>
                  {job.description.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>

                <div className={styles.skills}>
                  {job.skills.map((skill) => (
                    <span key={skill} className={styles.skill}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
