import { useState } from 'react';
import { personalInfo, socialLinks } from '../data/config';
import { useScrollReveal } from '../hooks';

const INITIAL_FORM = {
  name: '', email: '', phone: '', company: '', subject: '', message: '',
};

const SOCIAL_LINKS_DATA = [
  { key: 'email', label: 'Email', icon: '✉️', value: `mailto:${personalInfo.email}`, display: personalInfo.email },
  { key: 'phone', label: 'Phone', icon: '📞', value: `tel:${personalInfo.phone}`, display: personalInfo.phone },
  { key: 'whatsapp', label: 'WhatsApp', icon: '💬', value: socialLinks.whatsapp, display: 'Chat on WhatsApp' },
  { key: 'linkedin', label: 'LinkedIn', icon: '🔗', value: socialLinks.linkedin, display: 'linkedin.com/in/alexmorgan' },
];

function validate(form) {
  const errs = {};
  if (!form.name.trim()) errs.name = 'Name is required';
  if (!form.email.trim()) errs.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email';
  if (!form.subject.trim()) errs.subject = 'Subject is required';
  if (!form.message.trim()) errs.message = 'Message is required';
  else if (form.message.trim().length < 20) errs.message = 'Please write at least 20 characters';
  return errs;
}

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [ref, visible] = useScrollReveal();

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(err => ({ ...err, [name]: '' }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setStatus('loading');

    try {
      // Replace with your EmailJS credentials or Formspree endpoint
      // Using Formspree as fallback demo (replace YOUR_FORM_ID)
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          subject: form.subject,
          message: form.message,
        }),
      });

      // For demo purposes, simulate success after 1.5s
      await new Promise(r => setTimeout(r, 1500));
      setStatus('success');
      setForm(INITIAL_FORM);
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section contact-section" aria-label="Contact">
      <div className="container">
        <div className="section-header" ref={ref}>
          <div className={`reveal ${visible ? 'visible' : ''}`}>
            <span className="section-eyebrow">Get In Touch</span>
            <h2 className="section-title">Let's <span>Work Together</span></h2>
            <div className="divider" />
            <p className="section-subtitle">
              Have a project in mind? Let's build something great together.
            </p>
          </div>
        </div>

        <div className="contact-grid">
          {/* Info Column */}
          <div className={`contact-info reveal-left ${visible ? 'visible' : ''}`}>
            <h3 className="contact-info-title">Let's start a conversation</h3>
            <p className="contact-info-desc">
              Whether you have a project idea, a question, or just want to say hello — my inbox is always open. I respond within 24 hours.
            </p>

            <div className="contact-links" role="list">
              {SOCIAL_LINKS_DATA.map(link => (
                <a key={link.key} href={link.value} className="contact-link glass-card" target="_blank" rel="noopener noreferrer" role="listitem">
                  <span className="contact-link-icon" aria-hidden="true">{link.icon}</span>
                  <div>
                    <div className="contact-link-label">{link.label}</div>
                    <div className="contact-link-value">{link.display}</div>
                  </div>
                  <span className="contact-link-arrow" aria-hidden="true">→</span>
                </a>
              ))}
            </div>

            <div className="contact-availability">
              <div className="availability-dot" aria-hidden="true" />
              <span>Currently available for new projects</span>
            </div>
          </div>

          {/* Form */}
          <div className={`contact-form-wrap reveal-right ${visible ? 'visible' : ''}`}>
            {status === 'success' ? (
              <div className="success-state glass-card" role="alert">
                <div className="success-icon" aria-hidden="true">🎉</div>
                <h3>Message Sent!</h3>
                <p>Thanks for reaching out. I'll be in touch within 24 hours.</p>
                <button className="btn btn-primary" onClick={() => setStatus('idle')}>
                  Send Another
                </button>
              </div>
            ) : (
              <form
                className="contact-form glass-card"
                onSubmit={onSubmit}
                noValidate
                aria-label="Contact form"
              >
                <div className="form-row">
                  <FormField label="Full Name *" name="name" type="text" value={form.name} onChange={onChange} error={errors.name} placeholder="John Doe" />
                  <FormField label="Email Address *" name="email" type="email" value={form.email} onChange={onChange} error={errors.email} placeholder="john@example.com" />
                </div>
                <div className="form-row">
                  <FormField label="Phone Number" name="phone" type="tel" value={form.phone} onChange={onChange} error={errors.phone} placeholder="+1 (555) 000-0000" />
                  <FormField label="Company Name" name="company" type="text" value={form.company} onChange={onChange} error={errors.company} placeholder="Your Company" />
                </div>
                <FormField label="Subject *" name="subject" type="text" value={form.subject} onChange={onChange} error={errors.subject} placeholder="Project discussion, Partnership, etc." />
                <FormField label="Message *" name="message" type="textarea" value={form.message} onChange={onChange} error={errors.message} placeholder="Tell me about your project..." rows={5} />

                {status === 'error' && (
                  <div className="form-error-banner" role="alert">
                    Something went wrong. Please try again or email me directly.
                  </div>
                )}

                <button type="submit" className="btn btn-primary submit-btn" disabled={status === 'loading'} aria-busy={status === 'loading'}>
                  {status === 'loading' ? (
                    <><span className="spinner" aria-hidden="true" /> Sending...</>
                  ) : (
                    <><span aria-hidden="true">✉️</span> Send Message</>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .contact-section { background: var(--bg-secondary); }
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 48px;
          align-items: start;
        }
        .contact-info-title { font-size: 1.4rem; font-weight: 800; margin-bottom: 12px; }
        .contact-info-desc { font-size: 0.9rem; color: var(--text-secondary); line-height: 1.8; margin-bottom: 28px; }
        .contact-links { display: flex; flex-direction: column; gap: 12px; margin-bottom: 28px; }
        .contact-link {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px;
          border-radius: var(--radius-md);
          transition: var(--transition);
          text-decoration: none;
        }
        .contact-link:hover { transform: translateX(6px); }
        .contact-link-icon { font-size: 1.4rem; flex-shrink: 0; }
        .contact-link-label { font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; }
        .contact-link-value { font-size: 0.88rem; color: var(--text-primary); font-weight: 600; margin-top: 2px; }
        .contact-link-arrow { margin-left: auto; color: var(--accent-purple); font-size: 1.1rem; opacity: 0; transition: var(--transition); }
        .contact-link:hover .contact-link-arrow { opacity: 1; }
        .contact-availability {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.85rem;
          color: var(--text-secondary);
          font-weight: 500;
        }
        .availability-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 10px #22c55e;
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .contact-form {
          padding: 36px;
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .form-error-banner {
          padding: 12px 16px;
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.3);
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          color: #ef4444;
        }
        .submit-btn {
          width: 100%;
          justify-content: center;
          padding: 14px;
          font-size: 1rem;
        }
        .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .spinner {
          display: inline-block;
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.4);
          border-top-color: #fff;
          border-radius: 50%;
          animation: rotate 0.7s linear infinite;
        }
        .success-state {
          padding: 60px 40px;
          text-align: center;
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        .success-icon { font-size: 4rem; animation: float 2s ease-in-out infinite; }
        .success-state h3 { font-size: 1.5rem; }
        .success-state p { color: var(--text-secondary); }
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr; }
          .form-row { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) { .contact-form { padding: 24px; } }
      `}</style>
    </section>
  );
}

function FormField({ label, name, type, value, onChange, error, placeholder, rows }) {
  const id = `field-${name}`;

  return (
    <div className="form-field">
      <label htmlFor={id} className="form-label">{label}</label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows || 4}
          className={`form-input form-textarea${error ? ' error' : ''}`}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`form-input${error ? ' error' : ''}`}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
        />
      )}
      {error && <span id={`${id}-error`} className="form-error" role="alert">{error}</span>}

      <style>{`
        .form-field { display: flex; flex-direction: column; gap: 6px; }
        .form-label { font-size: 0.8rem; font-weight: 600; color: var(--text-secondary); }
        .form-input {
          padding: 12px 16px;
          border-radius: var(--radius-sm);
          background: var(--bg-glass);
          border: 1px solid var(--border);
          color: var(--text-primary);
          font-family: inherit;
          font-size: 0.9rem;
          transition: var(--transition);
          outline: none;
          resize: none;
        }
        .form-input:focus { border-color: var(--accent-purple); box-shadow: 0 0 0 3px rgba(139,92,246,0.15); }
        .form-input.error { border-color: #ef4444; }
        .form-input::placeholder { color: var(--text-muted); }
        .form-textarea { min-height: 120px; }
        .form-error { font-size: 0.75rem; color: #ef4444; font-weight: 500; }
      `}</style>
    </div>
  );
}
