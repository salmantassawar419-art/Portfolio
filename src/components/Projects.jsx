import { useState } from 'react';
import { projects } from '../data/config';
import { useScrollReveal } from '../hooks';

const FILTERS = ['All', 'Full Stack', 'E-Commerce', 'Graphic Design', 'Shopify'];
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [ref, visible] = useScrollReveal();

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="section projects-section" aria-label="Portfolio projects">
      <div className="container">
        <div className="section-header" ref={ref}>
          <div className={`reveal ${visible ? 'visible' : ''}`}>
            <span className="section-eyebrow">My Work</span>
            <h2 className="section-title">Featured <span>Projects</span></h2>
            <div className="divider" />
            <p className="section-subtitle">
              A selection of work spanning web apps, e-commerce, AI tools, and design systems.
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs" role="tablist" aria-label="Filter projects by category">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`filter-tab${activeFilter === f ? ' active' : ''}`}
              onClick={() => setActiveFilter(f)}
              role="tab"
              aria-selected={activeFilter === f}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid" key={activeFilter}>
          {filtered.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .projects-section { background: var(--bg-secondary); }
        .filter-tabs {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 40px;
        }
        .filter-tab {
          padding: 8px 20px;
          border-radius: 100px;
          font-size: 0.85rem;
          font-weight: 600;
          background: var(--bg-glass);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          transition: var(--transition);
        }
        .filter-tab:hover { border-color: var(--accent-purple); color: var(--accent-purple); }
        .filter-tab.active {
          background: var(--gradient-primary);
          color: #fff;
          border-color: transparent;
          box-shadow: 0 4px 16px rgba(139,92,246,0.4);
        }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 24px;
        }
        @media (max-width: 480px) {
          .projects-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const [ref, visible] = useScrollReveal();

  return (
    <article
      ref={ref}
      className={`project-card reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${(index % 3) * 100}ms` }}
      aria-label={project.title}
    >
      <div className="project-img-wrap">
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          className="project-img"
          loading="lazy"
          width="600"
          height="400"
        />
        <div className="project-overlay">
          <a href={project.demo} className="btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer" aria-label={`Live demo of ${project.title}`}>
            🚀 Live Demo
          </a>
          <a href={project.github} className="btn btn-outline btn-sm" target="_blank" rel="noopener noreferrer" aria-label={`GitHub repository for ${project.title}`}>
            💻 GitHub
          </a>
        </div>
        <div className="project-category-badge">{project.category}</div>
      </div>

      <div className="project-body">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>
        <div className="project-tech" aria-label="Technologies used">
          {project.tech.map(t => (
            <span className="tag" key={t}>{t}</span>
          ))}
        </div>
      </div>

      <style>{`
        .project-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          overflow: hidden;
          transition: var(--transition);
        }
        .project-card:hover {
          transform: translateY(-6px);
          border-color: var(--border-hover);
          box-shadow: var(--shadow-glow);
        }
        .project-img-wrap {
          position: relative;
          aspect-ratio: 16/10;
          overflow: hidden;
        }
        .project-img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .project-card:hover .project-img { transform: scale(1.06); }
        .project-overlay {
          position: absolute;
          inset: 0;
          background: rgba(5,5,8,0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          opacity: 0;
          transition: opacity 0.3s;
          backdrop-filter: blur(4px);
        }
        .project-card:hover .project-overlay { opacity: 1; }
        .project-category-badge {
          position: absolute;
          top: 12px; right: 12px;
          background: rgba(139,92,246,0.9);
          color: #fff;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 100px;
          backdrop-filter: blur(8px);
          letter-spacing: 0.05em;
        }
        .project-body { padding: 20px; }
        .project-title { font-size: 1rem; font-weight: 700; margin-bottom: 8px; color: var(--text-primary); }
        .project-desc { font-size: 0.83rem; color: var(--text-secondary); line-height: 1.65; margin-bottom: 14px; }
        .project-tech { display: flex; flex-wrap: wrap; gap: 6px; }
      `}</style>
    </article>
  );
}
