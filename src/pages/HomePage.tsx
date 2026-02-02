import { useContent } from '../context/ContentContext';
import { calculateAge } from '../utils/date';
import RoseSeal from '../assets/RoseSeal.png';
import styles from './HomePage.module.css';

// SVG Icons
const GithubIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
  </svg>
);

export default function HomePage() {
  const { content } = useContent();
  const { profile } = content;

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{profile.bio}</h1>
          <p className={styles.heroSubtitle}>
            {profile.title} at {profile.currentEmployment.split(' at ')[1] || profile.currentEmployment}
          </p>

          <div className={styles.socialLinks}>
            <a
              href={`mailto:${profile.socialLinks.email}`}
              className={styles.socialLink}
              aria-label="Email"
            >
              <EmailIcon />
            </a>
            <a
              href={profile.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="GitHub"
            >
              <GithubIcon />
            </a>
            <a
              href={profile.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>

        <a
          href={profile.schoolLink}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.schoolLink}
        >
          <img src={RoseSeal} alt="Rose-Hulman Institute of Technology" className={styles.schoolLogo} />
        </a>
      </section>

      {/* About Section */}
      <section className={styles.about}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>About Me</h2>
          <div className={styles.codeBlock}>
            <pre className={styles.code}>
{`{
  "name": "${profile.name}",
  "age": ${calculateAge(profile.birthDate)},
  "major": "${profile.major}",
  "education": "${profile.education}",
  "notableProjects": ${JSON.stringify(profile.notableProjects)},
  "interests": ${JSON.stringify(profile.interests)},
  "currentRole": "${profile.currentEmployment}",
  "resume": `}<a href={profile.resumeLink} target="_blank" rel="noopener noreferrer" className={styles.codeLink}>"View Resume"</a>
{`
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className={styles.quickLinks}>
        <div className={styles.container}>
          <div className={styles.linkCards}>
            <a href="/experience" className={styles.linkCard}>
              <div className={styles.linkCardIcon}>💼</div>
              <h3>Experience</h3>
              <p>View my work history and professional experience</p>
            </a>
            <a href="/projects" className={styles.linkCard}>
              <div className={styles.linkCardIcon}>🚀</div>
              <h3>Projects</h3>
              <p>Check out my personal and professional projects</p>
            </a>
            <a href="/resume" className={styles.linkCard}>
              <div className={styles.linkCardIcon}>📄</div>
              <h3>Resume</h3>
              <p>View my skills, education, and qualifications</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
