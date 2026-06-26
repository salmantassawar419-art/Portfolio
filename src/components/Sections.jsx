import { useState, useEffect } from 'react';
import { team, stats, techStack, testimonials } from '../data/config';
import { useScrollReveal, useCounter } from '../hooks';

// ── Team Section ──────────────────────────────────────────
export function Team() {
  const [ref, visible] = useScrollReveal();

  return (
    <section id="team" className="section team-section" aria-label="Team members">
      <div className="container">
        <div className="section-header" ref={ref}>
          <div className={`reveal ${visible ? 'visible' : ''}`}>
            <span className="section-eyebrow">The People</span>
            <h2 className="section-title">Meet the <span>Team</span></h2>
            <div className="divider" />
            <p className="section-subtitle">A small, focused team with deep expertise across the full stack.</p>
          </div>
        </div>

        <div className="team-grid" role="list">
          {team.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .team-section { background: var(--bg-primary); }
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 24px;
        }
      `}</style>
    </section>
  );
}

function TeamCard({ member, index }) {
  const [ref, visible] = useScrollReveal();

  return (
    <article
      ref={ref}
      className={`team-card glass-card reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
      role="listitem"
    >
      <div className="team-img-wrap">
        <img src={member.image} alt={member.name} className="team-img" loading="lazy" width="300" height="300" />
        <div className="team-img-overlay" />
      </div>
      <div className="team-body">
        <h3 className="team-name">{member.name}</h3>
        <p className="team-role gradient-text">{member.role}</p>
        <p className="team-bio">{member.bio}</p>
        <div className="team-skills">
          {member.skills.map(s => <span className="tag" key={s}>{s}</span>)}
        </div>
        <div className="team-actions">
          <a href={member.linkedin} className="team-btn" target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on LinkedIn`}>🔗</a>
          <a href={member.github} className="team-btn" target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on GitHub`}>💻</a>
          <a href={member.whatsapp} className="team-btn whatsapp-btn" target="_blank" rel="noopener noreferrer" aria-label={`Message ${member.name} on WhatsApp`}>💬 WhatsApp</a>
        </div>
      </div>

      <style>{`
        .team-card { overflow: hidden; padding: 0; }
        .team-img-wrap { position: relative; aspect-ratio: 1; overflow: hidden; }
        .team-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .team-card:hover .team-img { transform: scale(1.05); }
        .team-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 50%, var(--bg-card) 100%);
        }
        .team-body { padding: 20px; }
        .team-name { font-size: 1.05rem; font-weight: 700; margin-bottom: 4px; }
        .team-role { font-size: 0.82rem; font-weight: 600; margin-bottom: 10px; }
        .team-bio { font-size: 0.82rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 12px; }
        .team-skills { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
        .team-actions { display: flex; gap: 8px; align-items: center; }
        .team-btn {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: var(--bg-glass);
          border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.9rem;
          transition: var(--transition);
        }
        .team-btn:hover { border-color: var(--accent-purple); transform: translateY(-2px); }
        .team-btn.whatsapp-btn {
          width: auto;
          padding: 0 14px;
          border-radius: 100px;
          background: rgba(37,211,102,0.1);
          border-color: rgba(37,211,102,0.3);
          font-size: 0.78rem;
          font-weight: 600;
          color: #25d366;
          gap: 4px;
        }
        .whatsapp-btn:hover {
          background: #25d366;
          color: #fff;
          border-color: #25d366;
        }
      `}</style>
    </article>
  );
}

// ── Stats Section ─────────────────────────────────────────
export function Stats() {
  const [ref, visible] = useScrollReveal();

  return (
    <section className="stats-section" aria-label="Statistics">
      <div className="container">
        <div className="stats-grid" ref={ref} role="list">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .stats-section {
          padding: 80px 0;
          background: var(--bg-secondary);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          position: relative;
          overflow: hidden;
        }
        .stats-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--gradient-subtle);
          opacity: 0.5;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 24px;
          position: relative;
        }
        @media (max-width: 1024px) { .stats-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 640px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
    </section>
  );
}

function StatItem({ stat, index }) {
  const [ref, count] = useCounter(stat.value, 1800);

  return (
    <div
      ref={ref}
      className="stat-item glass-card"
      style={{ animationDelay: `${index * 100}ms` }}
      role="listitem"
    >
      <div className="stat-value gradient-text">
        {count}{stat.suffix}
      </div>
      <div className="stat-label">{stat.label}</div>

      <style>{`
        .stat-item {
          text-align: center;
          padding: 28px 20px;
          border-radius: var(--radius-md);
        }
        .stat-value {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 900;
          line-height: 1;
          margin-bottom: 8px;
          font-family: 'Space Grotesk', sans-serif;
        }
        .stat-label { font-size: 0.8rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; }
      `}</style>
    </div>
  );
}

// ── Tech Stack Section ────────────────────────────────────
export function TechStack() {
  const [ref, visible] = useScrollReveal();

  return (
    <section className="section tech-section" aria-label="Technologies used">
      <div className="container">
        <div className="section-header" ref={ref}>
          <div className={`reveal ${visible ? 'visible' : ''}`}>
            <span className="section-eyebrow">My Toolbox</span>
            <h2 className="section-title">Tech <span>Stack</span></h2>
            <div className="divider" />
          </div>
        </div>

        <div className="tech-grid" role="list">
          {techStack.map((tech, i) => (
            <TechItem key={tech.name} tech={tech} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .tech-section { background: var(--bg-primary); }
        .tech-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 16px;
        }
      `}</style>
    </section>
  );
}

function TechItem({ tech, index }) {
  const [ref, visible] = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`tech-item glass-card reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${(index % 8) * 50}ms` }}
      role="listitem"
      aria-label={tech.name}
    >
      <div className="tech-icon" aria-hidden="true" style={{ color: tech.color, textShadow: `0 0 20px ${tech.color}40` }}>
        {tech.icon}
      </div>
      <span className="tech-name">{tech.name}</span>

      <style>{`
        .tech-item {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 8px;
          padding: 20px 12px;
          text-align: center;
          border-radius: var(--radius-md);
          cursor: default;
        }
        .tech-item:hover { transform: translateY(-6px) scale(1.04); }
        .tech-icon { font-size: 2rem; transition: var(--transition); line-height: 1; }
        .tech-item:hover .tech-icon { transform: scale(1.15) rotate(5deg); filter: drop-shadow(0 0 8px currentColor); }
        .tech-name { font-size: 0.75rem; font-weight: 600; color: var(--text-secondary); }
      `}</style>
    </div>
  );
}

// ── Testimonials Section ──────────────────────────────────
export function Testimonials() {
  const [active, setActive] = useState(0);
  const [ref, visible] = useScrollReveal();

  // Auto-advance
  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  const current = testimonials[active];

  return (
    <section id="testimonials" className="section testimonials-section" aria-label="Client testimonials">
      <div className="container">
        <div className="section-header" ref={ref}>
          <div className={`reveal ${visible ? 'visible' : ''}`}>
            <span className="section-eyebrow">Social Proof</span>
            <h2 className="section-title">Client <span>Reviews</span></h2>
            <div className="divider" />
          </div>
        </div>

        <div className="testimonial-wrapper">
          <div className="testimonial-card glass-card" key={active}>
            <div className="testimonial-quote" aria-hidden="true">"</div>
            <div className="stars" role="img" aria-label={`${current.rating} out of 5 stars`}>
              {'★'.repeat(current.rating)}
            </div>
            <blockquote className="testimonial-text">"{current.review}"</blockquote>
            <div className="testimonial-author">
              <img src={current.image} alt={current.name} className="testimonial-avatar" loading="lazy" width="56" height="56" />
              <div>
                <div className="author-name">{current.name}</div>
                <div className="author-company">{current.company}</div>
              </div>
            </div>
          </div>

          <div className="testimonial-dots" role="tablist" aria-label="Testimonial navigation">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`dot${active === i ? ' active' : ''}`}
                onClick={() => setActive(i)}
                role="tab"
                aria-selected={active === i}
                aria-label={`Testimonial ${i + 1} of ${testimonials.length}`}
              />
            ))}
          </div>

          <div className="testimonial-thumbs">
            {testimonials.map((t, i) => (
              <button
                key={i}
                className={`testimonial-thumb${active === i ? ' active' : ''}`}
                onClick={() => setActive(i)}
                aria-label={`View review by ${t.name}`}
              >
                <img src={t.image} alt={t.name} width="44" height="44" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .testimonials-section { background: var(--bg-secondary); }
        .testimonial-wrapper { max-width: 720px; margin: 0 auto; text-align: center; }
        .testimonial-card {
          padding: 48px 40px;
          position: relative;
          animation: scale-in 0.4s ease;
          border-radius: var(--radius-lg);
          margin-bottom: 28px;
        }
        .testimonial-quote {
          position: absolute;
          top: 20px; left: 30px;
          font-size: 6rem;
          font-family: 'Space Grotesk', serif;
          line-height: 1;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          opacity: 0.3;
          pointer-events: none;
        }
        .testimonial-text {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.8;
          margin: 16px 0 24px;
          font-style: italic;
        }
        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 14px;
          justify-content: center;
          text-align: left;
        }
        .testimonial-avatar {
          width: 56px; height: 56px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(139,92,246,0.4);
        }
        .author-name { font-weight: 700; font-size: 0.95rem; }
        .author-company { font-size: 0.8rem; color: var(--text-muted); }
        .testimonial-dots { display: flex; gap: 8px; justify-content: center; margin-bottom: 20px; }
        .dot {
          width: 8px; height: 8px;
          border-radius: 100px;
          background: var(--border);
          transition: var(--transition);
          border: none;
        }
        .dot.active { background: var(--accent-purple); width: 24px; }
        .testimonial-thumbs { display: flex; gap: 10px; justify-content: center; }
        .testimonial-thumb {
          border-radius: 50%;
          overflow: hidden;
          width: 44px; height: 44px;
          border: 2px solid var(--border);
          transition: var(--transition);
          opacity: 0.5;
        }
        .testimonial-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .testimonial-thumb.active { border-color: var(--accent-purple); opacity: 1; }
        .testimonial-thumb:hover { opacity: 0.8; }
        @media (max-width: 640px) {
          .testimonial-card { padding: 32px 24px; }
          .testimonial-text { font-size: 0.95rem; }
        }
      `}</style>
    </section>
  );
}
