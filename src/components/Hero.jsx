import { useState, useEffect, useRef } from 'react';
import { personalInfo, socialLinks } from '../data/config';

const SOCIAL_ICONS = [
  { key: 'linkedin', label: 'LinkedIn', icon: '🔗' },
  { key: 'github', label: 'GitHub', icon: '💻' },
  { key: 'twitter', label: 'Twitter/X', icon: '𝕏' },
  { key: 'instagram', label: 'Instagram', icon: '📸' },
];

function TypingText({ texts }) {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[index];
    let timeout;

    if (!deleting && charIndex <= current.length) {
      setDisplayText(current.slice(0, charIndex));
      timeout = setTimeout(() => setCharIndex(c => c + 1), charIndex === current.length ? 1800 : 70);
    } else if (!deleting && charIndex > current.length) {
      setDeleting(true);
      timeout = setTimeout(() => setCharIndex(c => c - 1), 40);
    } else if (deleting && charIndex >= 0) {
      setDisplayText(current.slice(0, charIndex));
      if (charIndex === 0) {
        setDeleting(false);
        setIndex(i => (i + 1) % texts.length);
      } else {
        timeout = setTimeout(() => setCharIndex(c => c - 1), 40);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, index, texts]);

  return (
    <span className="typing-wrapper">
      <span className="typing-text gradient-text">{displayText}</span>
      <span className="typing-cursor" aria-hidden="true">|</span>
    </span>
  );
}

function Particle({ style }) {
  return <div className="particle" style={style} aria-hidden="true" />;
}

function generateParticles(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    tx: `${(Math.random() - 0.5) * 400}px`,
    ty: `${(Math.random() - 0.5) * 400}px`,
    duration: Math.random() * 12 + 8,
    delay: Math.random() * 8,
    opacity: Math.random() * 0.6 + 0.2,
  }));
}

const PARTICLES = generateParticles(35);

export default function Hero() {
  const scrollRef = useRef(null);

  const handleScrollDown = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero" aria-label="Introduction">
      {/* Animated Background */}
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <div className="hero-grid" />
        {PARTICLES.map(p => (
          <Particle
            key={p.id}
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              '--tx': p.tx,
              '--ty': p.ty,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      <div className="container hero-inner">
        {/* Left Content */}
        <div className="hero-content">
          <div className="hero-badge reveal">
            <span className="badge-dot" aria-hidden="true" />
            Available for freelance work
          </div>

          <h1 className="hero-heading reveal">
            Hi, I'm <span className="gradient-text">{personalInfo.name}</span>
          </h1>

          <div className="hero-typing reveal">
            <TypingText texts={personalInfo.typingTexts} />
          </div>

          <p className="hero-bio reveal">
            {personalInfo.bio}
          </p>

          <div className="hero-actions reveal">
            <a href={`mailto:${personalInfo.email}`} className="btn btn-primary">
              <span>✉️</span> Hire Me
            </a>
            <button
              className="btn btn-outline"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span>🚀</span> View Projects
            </button>
            <a href={personalInfo.resumeUrl} className="btn btn-ghost" download aria-label="Download CV">
              <span>📄</span> CV
            </a>
          </div>

          <div className="hero-socials reveal" role="list" aria-label="Social links">
            {SOCIAL_ICONS.map(s => (
              <a
                key={s.key}
                href={socialLinks[s.key]}
                className="social-btn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                role="listitem"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Right: Profile Image */}
        <div className="hero-visual reveal-right">
          <div className="hero-image-wrap">
            <div className="hero-image-ring" aria-hidden="true" />
            <div className="hero-image-ring hero-image-ring-2" aria-hidden="true" />
            <img
              src={personalInfo.profileImage}
              alt={`${personalInfo.name} – profile photo`}
              className="hero-image"
              loading="eager"
              width="400"
              height="400"
            />
            <div className="hero-image-glow" aria-hidden="true" />

            {/* Floating badges */}
            <div className="floating-badge badge-exp" aria-label="Years of experience">
              <span className="badge-num gradient-text">5+</span>
              <span className="badge-text">Years Exp.</span>
            </div>
            <div className="floating-badge badge-projects" aria-label="Projects completed">
              <span className="badge-num gradient-text">120+</span>
              <span className="badge-text">Projects</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button className="scroll-indicator" onClick={handleScrollDown} aria-label="Scroll to about section" ref={scrollRef}>
        <div className="scroll-mouse">
          <div className="scroll-wheel" aria-hidden="true" />
        </div>
        <span>Scroll down</span>
      </button>

      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding-top: var(--nav-height);
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .hero-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
        }
        .hero-orb-1 {
          width: 600px; height: 600px;
          top: -200px; right: -100px;
          background: radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%);
          animation: float-slow 12s ease-in-out infinite;
        }
        .hero-orb-2 {
          width: 500px; height: 500px;
          bottom: -150px; left: -150px;
          background: radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%);
          animation: float-slow 15s ease-in-out infinite reverse;
        }
        .hero-orb-3 {
          width: 300px; height: 300px;
          top: 40%; left: 40%;
          background: radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%);
          animation: float 8s ease-in-out infinite;
        }
        .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
        }
        .particle {
          position: absolute;
          border-radius: 50%;
          background: var(--accent-purple);
          animation: particle-drift linear infinite;
        }
        .hero-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          padding: 60px 24px;
        }
        .hero-content { display: flex; flex-direction: column; gap: 20px; }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(34,211,238,0.08);
          border: 1px solid rgba(34,211,238,0.2);
          border-radius: 100px;
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--accent-cyan);
          width: fit-content;
        }
        .badge-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--accent-cyan);
          animation: pulse-glow 2s ease-in-out infinite;
          box-shadow: 0 0 10px var(--accent-cyan);
        }
        .hero-heading {
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }
        .hero-typing {
          font-size: clamp(1.2rem, 2.5vw, 1.8rem);
          font-weight: 700;
          min-height: 2.2rem;
          display: flex;
          align-items: center;
        }
        .typing-wrapper { display: inline-flex; align-items: center; gap: 2px; }
        .typing-cursor {
          color: var(--accent-purple);
          animation: blink 0.8s step-end infinite;
          font-weight: 300;
        }
        .hero-bio {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.75;
          max-width: 500px;
        }
        .hero-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .hero-socials {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .social-btn {
          width: 44px; height: 44px;
          border-radius: 50%;
          background: var(--bg-glass);
          border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem;
          transition: var(--transition);
          text-decoration: none;
        }
        .social-btn:hover {
          border-color: var(--accent-purple);
          background: rgba(139,92,246,0.12);
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(139,92,246,0.3);
        }

        /* Profile Image */
        .hero-visual {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero-image-wrap {
          position: relative;
          width: 380px; height: 380px;
          flex-shrink: 0;
        }
        .hero-image-ring {
          position: absolute;
          inset: -16px;
          border-radius: 50%;
          border: 1px solid rgba(139,92,246,0.3);
          animation: rotate 20s linear infinite;
        }
        .hero-image-ring::before {
          content: '';
          position: absolute;
          top: 0; left: 50%;
          width: 10px; height: 10px;
          border-radius: 50%;
          background: var(--accent-purple);
          transform: translate(-50%, -50%);
          box-shadow: 0 0 12px var(--accent-purple);
        }
        .hero-image-ring-2 {
          inset: -32px;
          border-color: rgba(59,130,246,0.15);
          animation-duration: 30s;
          animation-direction: reverse;
        }
        .hero-image {
          width: 100%; height: 100%;
          object-fit: cover;
          border-radius: 50%;
          position: relative;
          z-index: 1;
          border: 3px solid rgba(139,92,246,0.4);
        }
        .hero-image-glow {
          position: absolute;
          inset: -20px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%);
          z-index: 0;
          animation: pulse-glow 3s ease-in-out infinite;
        }
        .floating-badge {
          position: absolute;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 10px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 2;
          box-shadow: var(--shadow-md);
          backdrop-filter: blur(20px);
        }
        .floating-badge.badge-exp {
          bottom: 20px; left: -30px;
          animation: float 4s ease-in-out infinite;
        }
        .floating-badge.badge-projects {
          top: 30px; right: -30px;
          animation: float 5s ease-in-out infinite reverse;
        }
        .badge-num { font-size: 1.3rem; font-weight: 800; line-height: 1; }
        .badge-text { font-size: 0.7rem; color: var(--text-muted); font-weight: 500; margin-top: 2px; }

        /* Scroll Indicator */
        .scroll-indicator {
          position: absolute;
          bottom: 32px; left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: var(--text-muted);
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          transition: var(--transition);
          animation: fade-in 1s ease 1.5s both;
        }
        .scroll-indicator:hover { color: var(--accent-purple); }
        .scroll-mouse {
          width: 26px; height: 42px;
          border: 2px solid currentColor;
          border-radius: 13px;
          display: flex;
          justify-content: center;
          padding-top: 6px;
        }
        .scroll-wheel {
          width: 4px; height: 8px;
          background: currentColor;
          border-radius: 2px;
          animation: float 1.5s ease-in-out infinite;
        }

        @media (max-width: 900px) {
          .hero-inner {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 40px;
          }
          .hero-content { align-items: center; }
          .hero-bio { text-align: left; }
          .hero-visual { order: -1; }
          .hero-image-wrap { width: 260px; height: 260px; }
          .floating-badge.badge-exp { left: -10px; bottom: 0; }
          .floating-badge.badge-projects { right: -10px; top: 10px; }
        }
        @media (max-width: 480px) {
          .hero-actions { justify-content: center; }
          .hero-socials { justify-content: center; }
          .hero-image-wrap { width: 220px; height: 220px; }
        }
      `}</style>
    </section>
  );
}
