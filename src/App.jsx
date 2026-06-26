import './styles.css';
import { seo, personalInfo, socialLinks } from './data/config';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import { Team, Stats, TechStack, Testimonials } from './components/Sections';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import PageLoader from './components/PageLoader';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import { useEffect } from 'react';

function SEOHead() {
  useEffect(() => {
    document.title = seo.title;

    const setMeta = (name, content, prop = false) => {
      const attr = prop ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };

    setMeta('description', seo.description);
    setMeta('keywords', seo.keywords);
    setMeta('author', seo.author);
    setMeta('robots', 'index, follow');

    // Open Graph
    setMeta('og:title', seo.title, true);
    setMeta('og:description', seo.description, true);
    setMeta('og:type', 'website', true);
    setMeta('og:url', seo.siteUrl, true);
    setMeta('og:image', seo.ogImage, true);
    setMeta('og:site_name', personalInfo.name, true);

    // Twitter Cards
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', seo.title);
    setMeta('twitter:description', seo.description);
    setMeta('twitter:image', seo.ogImage);
    setMeta('twitter:creator', '@alexmorgan');

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    canonical.href = seo.siteUrl;

    // JSON-LD Person schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: seo.author,
      url: seo.siteUrl,
      description: seo.description,
      jobTitle: personalInfo.title,
      email: personalInfo.email,
      telephone: personalInfo.phone,
      address: { '@type': 'PostalAddress', addressLocality: 'San Francisco', addressRegion: 'CA', addressCountry: 'US' },
      sameAs: [socialLinks.linkedin, socialLinks.github, socialLinks.twitter],
      knowsAbout: ['React', 'Next.js', 'Node.js', 'TypeScript', 'UI/UX Design', 'Full Stack Development'],
    };

    let ldScript = document.querySelector('script[type="application/ld+json"]');
    if (!ldScript) { ldScript = document.createElement('script'); ldScript.type = 'application/ld+json'; document.head.appendChild(ldScript); }
    ldScript.textContent = JSON.stringify(schema);
  }, []);

  return null;
}

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    const observe = () => {
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
        if (!el.classList.contains('visible')) observer.observe(el);
      });
    };

    observe();
    const mutObs = new MutationObserver(observe);
    mutObs.observe(document.body, { childList: true, subtree: true });

    return () => { observer.disconnect(); mutObs.disconnect(); };
  }, []);

  return (
    <>
      <SEOHead />
      <PageLoader />
      <CustomCursor />
      <ScrollProgress />
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Stats />
        <Services />
        <TechStack />
        <Projects />
        <Team />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />

      <style>{`
        .skip-link {
          position: absolute;
          top: -40px; left: 0;
          background: var(--accent-purple);
          color: #fff;
          padding: 8px 16px;
          border-radius: 0 0 var(--radius-sm) 0;
          font-size: 0.875rem;
          font-weight: 600;
          z-index: 9999;
          transition: top 0.2s;
        }
        .skip-link:focus { top: 0; }
      `}</style>
    </>
  );
}
