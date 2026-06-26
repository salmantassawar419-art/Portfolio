import { personalInfo, socialLinks } from '../data/config';

const QUICK_LINKS = [
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Projects', id: 'projects' },
  { label: 'Team', id: 'team' },
  { label: 'Contact', id: 'contact' },
];

const SOCIAL_ICONS = [
  { key: 'linkedin', icon: '🔗', label: 'LinkedIn' },
  { key: 'github', icon: '💻', label: 'GitHub' },
  { key: 'twitter', icon: '𝕏', label: 'Twitter/X' },
  { key: 'instagram', icon: '📸', label: 'Instagram' },
  { key: 'youtube', icon: '▶️', label: 'YouTube' },
  { key: 'email', icon: '✉️', label: 'Email' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-glow" aria-hidden="true" />
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span style={{ color: 'var(--text-muted)' }}>&lt;</span>
              <span style={{ fontWeight: 700 }}>Alex</span>
              <span style={{ color: 'var(--accent-purple)' }}>.</span>
              <span className="gradient-text" style={{ fontWeight: 700 }}>dev</span>
              <span style={{ color: 'var(--text-muted)' }}>/&gt;</span>
            </div>
            <p className="footer-desc">
              Crafting premium digital experiences with clean code, stunning design, and an obsession with performance.
            </p>
            <div className="footer-socials" role="list" aria-label="Social media links">
              {SOCIAL_ICONS.map(s => (
                <a
                  key={s.key}
                  href={socialLinks[s.key]}
                  className="footer-social-btn"
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

          {/* Quick Links */}
          <div>
            <h3 className="footer-heading">Quick Links</h3>
            <nav aria-label="Footer navigation">
              <ul className="footer-links" role="list">
                {QUICK_LINKS.map(link => (
                  <li key={link.id}>
                    <button
                      className="footer-link"
                      onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      <span aria-hidden="true">→</span> {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Services */}
          <div>
            <h3 className="footer-heading">Services</h3>
            <ul className="footer-links" role="list">
              {['Full Stack Dev', 'React / Next.js', 'UI/UX Design', 'API Development', 'AI Integration', 'SEO Optimization'].map(s => (
                <li key={s}>
                  <span className="footer-service-item">
                    <span aria-hidden="true">✦</span> {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="footer-heading">Contact</h3>
            <ul className="footer-contact-list" role="list">
              <li>
                <a href={`mailto:${personalInfo.email}`} className="footer-contact-item">
                  <span aria-hidden="true">✉️</span> {personalInfo.email}
                </a>
              </li>
              <li>
                <a href={`tel:${personalInfo.phone}`} className="footer-contact-item">
                  <span aria-hidden="true">📞</span> {personalInfo.phone}
                </a>
              </li>
              <li>
                <span className="footer-contact-item">
                  <span aria-hidden="true">📍</span> {personalInfo.address}
                </span>
              </li>
              <li>
                <a href={socialLinks.whatsapp} className="footer-whatsapp" target="_blank" rel="noopener noreferrer">
                  <span aria-hidden="true">💬</span> Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {year} <span className="gradient-text" style={{ fontWeight: 700 }}>{personalInfo.name}</span>. All rights reserved.
          </p>
          <p className="footer-made">
            Made with <span aria-label="love">❤️</span> & React
          </p>
          <button className="back-to-top" onClick={scrollTop} aria-label="Back to top">
            ↑ Top
          </button>
        </div>
      </div>

      <style>{`
        .footer {
          background: var(--bg-secondary);
          border-top: 1px solid var(--border);
          position: relative;
          overflow: hidden;
        }
        .footer-glow {
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 600px; height: 200px;
          background: radial-gradient(ellipse, rgba(139,92,246,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 48px;
          padding: 72px 0 48px;
        }
        .footer-logo {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.4rem;
          margin-bottom: 16px;
          display: flex;
          gap: 1px;
        }
        .footer-desc {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.75;
          margin-bottom: 24px;
          max-width: 300px;
        }
        .footer-socials { display: flex; gap: 8px; flex-wrap: wrap; }
        .footer-social-btn {
          width: 38px; height: 38px;
          border-radius: 50%;
          background: var(--bg-glass);
          border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.9rem;
          transition: var(--transition);
        }
        .footer-social-btn:hover {
          border-color: var(--accent-purple);
          background: rgba(139,92,246,0.1);
          transform: translateY(-3px);
        }
        .footer-heading {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-weight: 700;
          color: var(--accent-purple);
          margin-bottom: 20px;
        }
        .footer-links { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .footer-link {
          font-size: 0.875rem;
          color: var(--text-secondary);
          transition: var(--transition);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .footer-link:hover { color: var(--text-primary); transform: translateX(4px); }
        .footer-service-item {
          font-size: 0.875rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .footer-contact-list { list-style: none; display: flex; flex-direction: column; gap: 12px; }
        .footer-contact-item {
          display: flex; align-items: flex-start; gap: 8px;
          font-size: 0.85rem;
          color: var(--text-secondary);
          transition: var(--transition);
          text-decoration: none;
          line-height: 1.4;
        }
        a.footer-contact-item:hover { color: var(--accent-purple); }
        .footer-whatsapp {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(37,211,102,0.1);
          border: 1px solid rgba(37,211,102,0.25);
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #25d366;
          transition: var(--transition);
          text-decoration: none;
        }
        .footer-whatsapp:hover {
          background: #25d366;
          color: #fff;
          border-color: #25d366;
        }
        .footer-bottom {
          border-top: 1px solid var(--border);
          padding: 24px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .footer-copy, .footer-made { font-size: 0.83rem; color: var(--text-muted); }
        .back-to-top {
          padding: 8px 18px;
          border-radius: 100px;
          background: var(--bg-glass);
          border: 1px solid var(--border);
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-secondary);
          transition: var(--transition);
        }
        .back-to-top:hover {
          border-color: var(--accent-purple);
          color: var(--accent-purple);
          transform: translateY(-2px);
        }
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 36px; }
        }
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr; gap: 28px; }
          .footer-bottom { justify-content: center; text-align: center; }
        }
      `}</style>
    </footer>
  );
}
