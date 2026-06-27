import { useState, useEffect, useCallback } from 'react';
import { useTheme, useActiveSection } from '../hooks';

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'team', label: 'Team' },
  { id: 'testimonials', label: 'Reviews' },
  { id: 'contact', label: 'Contact' },
];

const SECTION_IDS = NAV_ITEMS.map(n => n.id);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, toggleTheme] = useTheme();
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  }, []);

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="container navbar-inner">
          {/* Logo */}
          <a href="#hero" className="navbar-logo" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <span className="logo-bracket">&lt;</span>
            <span className="logo-name">Nexa</span>
            <span className="logo-dot">.</span>
            <span className="logo-dev gradient-text">Studio</span>
            <span className="logo-bracket">/&gt;</span>
          </a>

          {/* Desktop Nav */}
          <ul className="navbar-links" role="list">
            {NAV_ITEMS.map(item => (
              <li key={item.id}>
                <button
                  className={`nav-link${active === item.id ? ' active' : ''}`}
                  onClick={() => scrollTo(item.id)}
                  aria-current={active === item.id ? 'page' : undefined}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Right Controls */}
          <div className="navbar-actions">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title="Toggle theme"
            >
              {theme === 'dark' ? (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
) : (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
)}
            </button>

            <button className="btn btn-primary btn-sm nav-cta" onClick={() => scrollTo('contact')}>
              Hire Me
            </button>

            <button
              className={`hamburger${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} role="dialog" aria-modal="true" aria-label="Mobile navigation">
        <div className="mobile-menu-overlay" onClick={() => setMenuOpen(false)} />
        <div className="mobile-menu-panel">
          <ul>
            {NAV_ITEMS.map(item => (
              <li key={item.id}>
                <button
                  className={`mobile-nav-link${active === item.id ? ' active' : ''}`}
                  onClick={() => scrollTo(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          <button className="btn btn-primary" onClick={() => scrollTo('contact')} style={{ marginTop: 24, width: '100%', justifyContent: 'center' }}>
            Hire Me
          </button>
        </div>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          height: var(--nav-height);
          transition: var(--transition);
          background: transparent;
        }
        .navbar.scrolled {
          background: rgba(5,5,8,0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
          box-shadow: 0 4px 30px rgba(0,0,0,0.3);
        }
        [data-theme="light"] .navbar.scrolled {
          background: rgba(248,249,255,0.85);
        }
        .navbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
        }
        .navbar-logo {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.2rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 1px;
          transition: var(--transition);
        }
        .navbar-logo:hover { opacity: 0.85; }
        .logo-bracket { color: var(--text-muted); font-size: 1.1rem; }
        .logo-name { color: var(--text-primary); }
        .logo-dot { color: var(--accent-purple); }
        .navbar-links {
          display: flex;
          list-style: none;
          gap: 4px;
        }
        .nav-link {
          padding: 8px 14px;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-secondary);
          border-radius: var(--radius-sm);
          transition: var(--transition);
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 2px; left: 50%; right: 50%;
          height: 2px;
          background: var(--gradient-primary);
          border-radius: 2px;
          transition: var(--transition);
        }
        .nav-link:hover { color: var(--text-primary); }
        .nav-link.active { color: var(--accent-purple); }
        .nav-link.active::after { left: 14px; right: 14px; }
        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .theme-toggle {
          width: 38px; height: 38px;
          border-radius: 50%;
          background: var(--bg-glass);
          border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem;
          transition: var(--transition);
        }
        .theme-toggle:hover {
          border-color: var(--accent-purple);
          background: rgba(139,92,246,0.1);
          transform: rotate(20deg);
        }
        .nav-cta { display: none; }
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 38px; height: 38px;
          border-radius: var(--radius-sm);
          background: var(--bg-glass);
          border: 1px solid var(--border);
        }
        .hamburger span {
          display: block;
          width: 18px; height: 2px;
          background: var(--text-primary);
          border-radius: 2px;
          transition: var(--transition);
          transform-origin: center;
        }
        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
        .mobile-menu { display: none; }

        @media (min-width: 768px) { .nav-cta { display: inline-flex; } }

        @media (max-width: 900px) {
          .navbar-links { display: none; }
          .hamburger { display: flex; }
          .mobile-menu { display: block; }
        }
        .mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 999;
          pointer-events: none;
        }
        .mobile-menu.open { pointer-events: all; }
        .mobile-menu-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.6);
          opacity: 0;
          transition: opacity 0.3s;
          backdrop-filter: blur(4px);
        }
        .mobile-menu.open .mobile-menu-overlay { opacity: 1; }
        .mobile-menu-panel {
          position: absolute;
          top: 0; right: 0; bottom: 0;
          width: 280px;
          background: var(--bg-secondary);
          border-left: 1px solid var(--border);
          padding: calc(var(--nav-height) + 24px) 24px 40px;
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        .mobile-menu.open .mobile-menu-panel { transform: translateX(0); }
        .mobile-menu-panel ul { list-style: none; display: flex; flex-direction: column; gap: 4px; }
        .mobile-nav-link {
          display: block;
          width: 100%;
          text-align: left;
          padding: 14px 16px;
          font-size: 1rem;
          font-weight: 500;
          color: var(--text-secondary);
          border-radius: var(--radius-sm);
          transition: var(--transition);
          border: 1px solid transparent;
        }
        .mobile-nav-link:hover, .mobile-nav-link.active {
          color: var(--accent-purple);
          background: rgba(139,92,246,0.08);
          border-color: rgba(139,92,246,0.2);
        }
      `}</style>
    </>
  );
}
