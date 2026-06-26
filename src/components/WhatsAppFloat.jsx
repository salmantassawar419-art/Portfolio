import { useState, useEffect } from 'react';
import { socialLinks } from '../data/config';

export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  const [tooltip, setTooltip] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2000);
    const t2 = setTimeout(() => setTooltip(false), 6000);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, []);

  return (
    <div className={`wa-wrap${visible ? ' visible' : ''}`}>
      {tooltip && (
        <div className="wa-tooltip" role="tooltip">
          💬 Let's chat!
        </div>
      )}
      <a
        href={socialLinks.whatsapp}
        className="wa-btn"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="26" height="26">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.107 1.523 5.832L0 24l6.335-1.506C8.05 23.45 9.989 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.897 0-3.673-.505-5.197-1.385l-.373-.22-3.867.919.955-3.765-.244-.393C2.509 15.66 2 13.888 2 12 2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        </svg>
      </a>

      <style>{`
        .wa-wrap {
          position: fixed;
          bottom: 28px; right: 28px;
          z-index: 900;
          display: flex;
          align-items: center;
          gap: 10px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
          pointer-events: none;
        }
        .wa-wrap.visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: all;
        }
        .wa-btn {
          width: 58px; height: 58px;
          border-radius: 50%;
          background: #25d366;
          color: #fff;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 20px rgba(37,211,102,0.5);
          transition: var(--transition);
          animation: whatsapp-pulse 2.5s ease-in-out infinite;
          text-decoration: none;
        }
        .wa-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 28px rgba(37,211,102,0.7);
          animation: none;
        }
        .wa-tooltip {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 8px 14px;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-primary);
          white-space: nowrap;
          box-shadow: var(--shadow-sm);
          animation: fade-in-up 0.4s ease;
        }
        .wa-tooltip::after {
          content: '';
          position: absolute;
          right: -6px; top: 50%;
          transform: translateY(-50%);
          border: 6px solid transparent;
          border-right: none;
          border-left-color: var(--border);
        }
        @media (max-width: 480px) {
          .wa-wrap { bottom: 20px; right: 20px; }
          .wa-btn { width: 50px; height: 50px; }
          .wa-tooltip { display: none; }
        }
      `}</style>
    </div>
  );
}
