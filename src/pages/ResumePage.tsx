import { useContent } from '../context/ContentContext';
import RoseSeal from '../assets/RoseSeal.png';
import styles from './ResumePage.module.css';

const DownloadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21l-8-9h6v-12h4v12h6l-8 9zm9-1v2h-18v-2h-2v4h22v-4h-2z"/>
  </svg>
);

export default function ResumePage() {
  const { content } = useContent();
  const { profile, skills } = content;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Resume</h1>
          <a
            href={profile.resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.downloadButton}
          >
            <DownloadIcon />
            <span>Download PDF</span>
          </a>
        </div>

        {/* Education Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Education</h2>
          <div className={styles.educationCard}>
            <img
              src={RoseSeal}
              alt="Rose-Hulman Institute of Technology"
              className={styles.schoolLogo}
            />
            <div className={styles.educationInfo}>
              <h3>{profile.education}</h3>
              <p className={styles.major}>{profile.major} B.S.</p>
              <p className={styles.period}>2015 - 2019</p>
            </div>
          </div>

          <div className={styles.coursework}>
            <h4>Relevant Coursework</h4>
            <ul className={styles.courseList}>
              {skills.coursework.map((course) => (
                <li key={course}>{course}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Skills Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Skills</h2>

          <div className={styles.skillsGrid}>
            <div className={styles.skillCategory}>
              <h4>Languages & Frameworks</h4>
              <div className={styles.skillTags}>
                {skills.languages.map((skill) => (
                  <span key={skill} className={styles.skillTag}>{skill}</span>
                ))}
              </div>
            </div>

            <div className={styles.skillCategory}>
              <h4>Tools & Technologies</h4>
              <div className={styles.skillTags}>
                {skills.tools.map((skill) => (
                  <span key={skill} className={styles.skillTag}>{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Interests Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Interests</h2>
          <div className={styles.interests}>
            {profile.interests.map((interest) => (
              <span key={interest} className={styles.interestTag}>{interest}</span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
