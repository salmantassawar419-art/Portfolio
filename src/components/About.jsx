import { useEffect, useRef } from 'react';
import { personalInfo, skills, experience, education, certifications } from '../data/config';
import { useScrollReveal } from '../hooks';

function SkillBar({ name, level, color, visible }) {
  return (
    <div className="skill-item">
      <div className="skill-header">
        <span className="skill-name">{name}</span>
        <span className="skill-pct" style={{ color }}>{level}%</span>
      </div>
      <div className="progress-bar" role="progressbar" aria-valuenow={level} aria-valuemin="0" aria-valuemax="100" aria-label={`${name} proficiency ${level}%`}>
        <div
          className="progress-fill"
          style={{
            width: visible ? `${level}%` : '0%',
            background: `linear-gradient(90deg, ${color}99, ${color})`,
          }}
        />
      </div>
    </div>
  );
}

function TabItem({ icon, title, children }) {
  return (
    <div className="timeline-item">
      <div className="timeline-dot" aria-hidden="true" />
      <div className="timeline-content">
        <div className="timeline-icon" aria-hidden="true">{icon}</div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const [ref, visible] = useScrollReveal();
  const [skillsRef, skillsVisible] = useScrollReveal();

  return (
    <section id="about" className="section about-section" aria-label="About me">
      <div className="container">
        <div className="section-header" ref={ref}>
          <div className={`reveal ${visible ? 'visible' : ''}`}>
            <span className="section-eyebrow">Who I Am</span>
            <h2 className="section-title">About <span>Me</span></h2>
            <div className="divider" />
          </div>
        </div>

        <div className="about-grid">
          {/* Left: Bio + Info */}
          <div className={`about-left reveal-left ${visible ? 'visible' : ''}`}>
            <div className="about-image-container">
              <img
                src={personalInfo.profileImage}
                alt={personalInfo.name}
                className="about-img"
                loading="lazy"
                width="500"
                height="600"
              />
              <div className="about-img-decoration" aria-hidden="true" />
            </div>

<div className="personal-info-grid" role="list">
  {[
    {
      label: 'Email',
      value: personalInfo.email,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
    },
    {
      label: 'Phone',
      value: personalInfo.phone,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/>
        </svg>
      ),
    },
    {
      label: 'Location',
      value: personalInfo.address,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
    },
    {
      label: 'Status',
      value: 'Open to Work',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      ),
    },
  ].map(item => (                <div className="info-item glass-card" key={item.label} role="listitem">
                  <span className="info-icon" aria-hidden="true">{item.icon}</span>
                  <div>
                    <span className="info-label">{item.label}</span>
                    <span className="info-value">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Content */}
          <div className={`about-right reveal-right ${visible ? 'visible' : ''}`}>
            <h3 className="about-name">{personalInfo.name}</h3>
            <p className="about-title gradient-text">{personalInfo.title}</p>
            <p className="about-bio">{personalInfo.bio}</p>

            {/* Skills */}
            <div ref={skillsRef}>
              <h4 className="about-section-label">Core Skills</h4>
              <div className="skills-list">
                {skills.map(s => (
                  <SkillBar key={s.name} {...s} visible={skillsVisible} />
                ))}
              </div>
            </div>

            {/* Experience Timeline */}
            <h4 className="about-section-label" style={{ marginTop: 36 }}>Experience</h4>
            <div className="timeline" role="list">
              {experience.map((exp, i) => (
                <TabItem key={i} icon="💼">
                  <div className="tl-role">{exp.role}</div>
                  <div className="tl-company">
                    <span>{exp.company}</span>
                    <span className="tag">{exp.duration}</span>
                  </div>
                  <p className="tl-desc">{exp.description}</p>
                </TabItem>
              ))}
            </div>

            {/* Education */}
            <h4 className="about-section-label" style={{ marginTop: 36 }}>Education</h4>
            <div className="timeline" role="list">
              {education.map((edu, i) => (
                <TabItem key={i} icon="🎓">
                  <div className="tl-role">{edu.degree}</div>
                  <div className="tl-company">
                    <span>{edu.institution}</span>
                    <span className="tag">{edu.year}</span>
                  </div>
                  <p className="tl-desc">Grade: {edu.grade}</p>
                </TabItem>
              ))}
            </div>

            {/* Certifications */}
            <h4 className="about-section-label" style={{ marginTop: 36 }}>Certifications</h4>
            <div className="certs-grid" role="list">
              {certifications.map((cert, i) => (
                <div className="cert-item" key={i} role="listitem">
                  <span aria-hidden="true">🏆</span> {cert}
                </div>
              ))}
            </div>

           <a href={personalInfo.resumeUrl} className="btn btn-primary" style={{ marginTop: 32, width: 'fit-content' }} download>
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="12" y1="18" x2="12" y2="12"/>
    <line x1="9" y1="15" x2="12" y2="18"/>
    <line x1="15" y1="15" x2="12" y2="18"/>
  </svg>
  Download Full CV
</a>
          </div>
        </div>
      </div>

      <style>{`
        .about-section { background: var(--bg-secondary); }
        .about-grid {
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 60px;
          align-items: start;
        }
        .about-image-container {
  position: relative;
  border-radius: 24px;
  overflow: visible;
  margin-bottom: 24px;
  max-height: 500px;              /* ← controls max height */
}
       .about-img {
  width: 100%;
  height: 460px;                  /* ← taller to show full body */
  object-fit: cover;
  object-position: center top;    /* ← shows face + body from top */
  border-radius: 24px;            /* ← rounded rectangle */
  position: relative;
  z-index: 1;
}
        .about-img-decoration {
          position: absolute;
          inset: -8px;
          border-radius: var(--radius-lg);
          background: var(--gradient-primary);
          z-index: 0;
          opacity: 0.2;
          filter: blur(16px);
        }
        .personal-info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .info-item {
          padding: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          border-radius: var(--radius-sm);
        }
        .info-icon { font-size: 1.1rem; flex-shrink: 0; }
        .info-label { display: block; font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600; }
        .info-value { display: block; font-size: 0.82rem; color: var(--text-primary); font-weight: 500; margin-top: 1px; word-break: break-all; }
        .about-name { font-size: 1.8rem; font-weight: 800; }
        .about-title { font-size: 1rem; font-weight: 600; margin: 4px 0 16px; }
        .about-bio { color: var(--text-secondary); line-height: 1.8; font-size: 0.95rem; }
        .about-section-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-weight: 700;
          color: var(--accent-purple);
          margin-bottom: 16px;
          margin-top: 28px;
        }
        .skills-list { display: flex; flex-direction: column; gap: 14px; }
        .skill-item {}
        .skill-header { display: flex; justify-content: space-between; margin-bottom: 6px; }
        .skill-name { font-size: 0.875rem; font-weight: 600; color: var(--text-primary); }
        .skill-pct { font-size: 0.8rem; font-weight: 700; }
        .timeline { position: relative; padding-left: 24px; border-left: 2px solid var(--border); }
        .timeline-item {
          position: relative;
          padding: 0 0 24px 20px;
        }
        .timeline-item:last-child { padding-bottom: 0; }
        .timeline-dot {
          position: absolute;
          left: -29px;
          top: 4px;
          width: 12px; height: 12px;
          border-radius: 50%;
          background: var(--gradient-primary);
          border: 2px solid var(--bg-secondary);
          box-shadow: 0 0 8px rgba(139,92,246,0.5);
        }
        .timeline-content { display: flex; gap: 12px; align-items: flex-start; }
        .timeline-icon { font-size: 1.2rem; margin-top: 2px; flex-shrink: 0; }
        .tl-role { font-size: 0.95rem; font-weight: 700; color: var(--text-primary); }
        .tl-company { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin: 4px 0; font-size: 0.82rem; color: var(--text-secondary); }
        .tl-desc { font-size: 0.82rem; color: var(--text-muted); line-height: 1.6; margin-top: 4px; }
        .certs-grid { display: flex; flex-direction: column; gap: 8px; }
        .cert-item {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 16px;
          background: var(--bg-glass);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          color: var(--text-secondary);
          transition: var(--transition);
        }
        .cert-item:hover { border-color: var(--accent-purple); color: var(--text-primary); }
        @media (max-width: 1024px) {
          .about-grid { grid-template-columns: 1fr; gap: 40px; }
          .about-image-container { max-width: 400px; margin: 0 auto 24px; }
          .about-img { height: 320px; }
        }
        @media (max-width: 480px) {
          .personal-info-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
