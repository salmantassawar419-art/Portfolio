import { personalInfo, socialLinks } from '../data/config';

const QUICK_LINKS = [
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Projects', id: 'projects' },
  { label: 'Team', id: 'team' },
  { label: 'Contact', id: 'contact' },
];

const SOCIAL_ICONS = [
  {
    key: 'linkedin', label: 'LinkedIn',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
  },
  {
    key: 'github', label: 'GitHub',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>,
  },
  {
    key: 'twitter', label: 'Twitter/X',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  },
  {
    key: 'instagram', label: 'Instagram',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  },
  {
    key: 'youtube', label: 'YouTube',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="var(--bg-primary)"/></svg>,
  },
  {
    key: 'email', label: 'Email',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  },
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
              <span style={{ fontWeight: 700 }}>Nexa</span>
              <span style={{ color: 'var(--accent-purple)' }}>.</span>
              <span className="gradient-text" style={{ fontWeight: 700 }}>Studio</span>
              <span style={{ color: 'var(--text-muted)' }}>/&gt;</span>
            </div>
            <p className="footer-desc">
              Empowering businesses with modern web development, SEO, e-commerce solutions, Meta Ads, and creative branding to build a strong digital presence and achieve sustainable growth.</p>
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
              {['Web Development', 'SEO Optimization', 'E-Commerce Solutions', 'Meta Ads Management', 'Graphic Designing', "Content Strategy"].map(s => (
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
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
      {personalInfo.email}
    </a>
  </li>
  <li>
    <a href={`tel:${personalInfo.phone}`} className="footer-contact-item">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/>
      </svg>
      {personalInfo.phone}
    </a>
  </li>
  <li>
    <span className="footer-contact-item">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
      {personalInfo.address}
    </span>
  </li>
  <li>
    <a href={socialLinks.whatsapp} className="footer-whatsapp" target="_blank" rel="noopener noreferrer">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.107 1.523 5.832L0 24l6.335-1.506C8.05 23.45 9.989 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.897 0-3.673-.505-5.197-1.385l-.373-.22-3.867.919.955-3.765-.244-.393C2.509 15.66 2 13.888 2 12 2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
      </svg>
      Chat on WhatsApp
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
