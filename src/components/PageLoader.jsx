import { useState, useEffect } from 'react';

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Fade out after 1.8s
    const t1 = setTimeout(() => setFadeOut(true), 1800);
    const t2 = setTimeout(() => setLoading(false), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!loading) return null;

  return (
    <div className={`page-loader${fadeOut ? ' fade-out' : ''}`} role="status" aria-label="Loading portfolio">
      <div className="loader-inner">
        <div className="loader-logo">
          <span className="loader-bracket">&lt;</span>
          <span className="loader-name gradient-text">Nexa</span>
          <span className="loader-dot" style={{ color: 'var(--accent-purple)' }}>.</span>
          <span className="loader-dev gradient-text">Studio</span>
          <span className="loader-bracket">/&gt;</span>
        </div>
        <div className="loader-bar-wrap">
          <div className="loader-bar" />
        </div>
        <p className="loader-text">Building your experience...</p>
      </div>

      <style>{`
        .page-loader {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: var(--bg-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .page-loader.fade-out {
          opacity: 0;
          pointer-events: none;
        }
        .loader-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 28px;
          animation: fade-in-up 0.5s ease both;
        }
        .loader-logo {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 2.5rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 2px;
          letter-spacing: -0.02em;
        }
        .loader-bracket { color: var(--text-muted); }
        .loader-name, .loader-dev { background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .loader-bar-wrap {
          width: 200px;
          height: 3px;
          background: var(--border);
          border-radius: 100px;
          overflow: hidden;
        }
        .loader-bar {
          height: 100%;
          background: var(--gradient-primary);
          border-radius: 100px;
          animation: loader-fill 1.6s cubic-bezier(0.4,0,0.2,1) forwards;
        }
        @keyframes loader-fill {
          0% { width: 0%; }
          30% { width: 40%; }
          70% { width: 75%; }
          100% { width: 100%; }
        }
        .loader-text {
          font-size: 0.82rem;
          color: var(--text-muted);
          font-weight: 500;
          letter-spacing: 0.05em;
        }
      `}</style>
    </div>
  );
}
