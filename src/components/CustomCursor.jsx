import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const raf = useRef(null);

  useEffect(() => {
    // Only on pointer devices
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    cursor.style.display = 'block';
    dot.style.display = 'block';

    const onMouseMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseDown = () => cursor.classList.add('clicking');
    const onMouseUp = () => cursor.classList.remove('clicking');

    const onMouseEnterLink = () => cursor.classList.add('hovering');
    const onMouseLeaveLink = () => cursor.classList.remove('hovering');

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    const addLinkListeners = () => {
      document.querySelectorAll('a, button, [role="tab"], [role="button"]').forEach(el => {
        el.addEventListener('mouseenter', onMouseEnterLink);
        el.addEventListener('mouseleave', onMouseLeaveLink);
      });
    };

    addLinkListeners();

    // Smooth cursor follow
    const animate = () => {
      dotPos.current.x += (pos.current.x - dotPos.current.x) * 0.12;
      dotPos.current.y += (pos.current.y - dotPos.current.y) * 0.12;

      dot.style.transform = `translate(${dotPos.current.x - 20}px, ${dotPos.current.y - 20}px)`;
      cursor.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;

      raf.current = requestAnimationFrame(animate);
    };

    raf.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      {/* Inner dot */}
      <div ref={cursorRef} className="cursor-dot" aria-hidden="true" />
      {/* Outer ring */}
      <div ref={dotRef} className="cursor-ring" aria-hidden="true" />

      <style>{`
        .cursor-dot, .cursor-ring { display: none; pointer-events: none; position: fixed; top: 0; left: 0; z-index: 99999; border-radius: 50%; }
        .cursor-dot {
          width: 8px; height: 8px;
          background: var(--accent-purple);
          box-shadow: 0 0 8px var(--accent-purple);
          transition: width 0.2s, height 0.2s, background 0.2s;
        }
        .cursor-ring {
          width: 40px; height: 40px;
          border: 1.5px solid rgba(139,92,246,0.5);
          transition: width 0.3s, height 0.3s, border-color 0.3s, opacity 0.3s;
        }
        .cursor-dot.hovering {
          width: 12px; height: 12px;
          background: var(--accent-cyan);
          box-shadow: 0 0 12px var(--accent-cyan);
        }
        .cursor-ring.hovering {
          width: 56px; height: 56px;
          border-color: rgba(34,211,238,0.6);
        }
        .cursor-dot.clicking { transform: scale(0.7) !important; }
        @media (hover: none) { .cursor-dot, .cursor-ring { display: none !important; } }
      `}</style>
    </>
  );
}
