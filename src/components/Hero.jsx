import { useState, useEffect, useRef } from 'react';
import { personalInfo, socialLinks } from '../data/config';

const SOCIAL_ICONS = [
  {
    key: 'linkedin',
    label: 'LinkedIn',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    key: 'github',
    label: 'GitHub',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>
    ),
  },
  {
    key: 'instagram',
    label: 'Instagram',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    key: 'twitter',
    label: 'Twitter/X',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    key: 'facebook',
    label: 'Facebook',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.107 1.523 5.832L0 24l6.335-1.506C8.05 23.45 9.989 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.897 0-3.673-.505-5.197-1.385l-.373-.22-3.867.919.955-3.765-.244-.393C2.509 15.66 2 13.888 2 12 2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
      </svg>
    ),
  },
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
            Available for New Projects.
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
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
    Hire Me
  </a>
  <button
    className="btn btn-outline"
    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
  >
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
    View Projects
  </button>
  <a href={personalInfo.resumeUrl} className="btn btn-ghost" download aria-label="Download CV">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
    Download CV
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
              <span className="badge-num gradient-text">2+</span>
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
  object-position: center top;   /* ← shows face + body, not center */
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
