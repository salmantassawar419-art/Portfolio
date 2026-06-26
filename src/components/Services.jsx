import { services } from '../data/config';
import { useScrollReveal } from '../hooks';

export default function Services() {
  const [ref, visible] = useScrollReveal();

  return (
    <section id="services" className="section" aria-label="Services">
      <div className="container">
        <div className="section-header" ref={ref}>
          <div className={`reveal ${visible ? 'visible' : ''}`}>
            <span className="section-eyebrow">What I Offer</span>
            <h2 className="section-title">My <span>Services</span></h2>
            <div className="divider" />
            <p className="section-subtitle">
              End-to-end digital solutions designed to scale. From concept to deployment, I deliver products your users will love.
            </p>
          </div>
        </div>

        <div className="services-grid" role="list">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }
      `}</style>
    </section>
  );
}

function ServiceCard({ service, index }) {
  const [ref, visible] = useScrollReveal();

  return (
    <article
      ref={ref}
      className={`service-card glass-card reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${(index % 5) * 80}ms` }}
      role="listitem"
    >
      <div className="service-icon" aria-hidden="true">{service.icon}</div>
      <h3 className="service-title">{service.title}</h3>
      <p className="service-desc">{service.description}</p>
      <div className="service-arrow" aria-hidden="true">→</div>

      <style>{`
        .service-card {
          padding: 28px 24px;
          position: relative;
          overflow: hidden;
          cursor: default;
        }
        .service-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--gradient-subtle);
          opacity: 0;
          transition: opacity 0.4s;
          border-radius: inherit;
        }
        .service-card:hover::before { opacity: 1; }
        .service-card:hover .service-icon { transform: scale(1.1) rotate(5deg); }
        .service-card:hover .service-arrow { opacity: 1; transform: translateX(0); }
        .service-icon {
          font-size: 2.4rem;
          margin-bottom: 16px;
          display: block;
          transition: var(--transition);
          line-height: 1;
        }
        .service-title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 10px;
        }
        .service-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.7;
        }
        .service-arrow {
          position: absolute;
          bottom: 20px; right: 20px;
          font-size: 1.2rem;
          color: var(--accent-purple);
          opacity: 0;
          transform: translateX(-8px);
          transition: var(--transition);
          font-weight: 700;
        }
      `}</style>
    </article>
  );
}
