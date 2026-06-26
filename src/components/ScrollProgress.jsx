import { useState, useEffect } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="scroll-progress"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    >
      <div className="scroll-progress-fill" style={{ width: `${progress}%` }} />
      <style>{`
        .scroll-progress {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 3px;
          z-index: 1001;
          background: transparent;
        }
        .scroll-progress-fill {
          height: 100%;
          background: var(--gradient-primary);
          border-radius: 0 2px 2px 0;
          transition: width 0.1s linear;
          box-shadow: 0 0 8px rgba(139,92,246,0.6);
        }
      `}</style>
    </div>
  );
}
