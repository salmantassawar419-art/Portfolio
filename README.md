# 🚀 Premium Portfolio Website

A modern, premium portfolio website built with **React + Vite**. Dark/light theme, smooth animations, fully responsive, SEO-optimized, and production-ready.

---

## ✨ Features

| Feature | Details |
|---|---|
| **Theme** | Dark default + Light toggle, saved to localStorage |
| **Hero** | Typing animation, floating particles, profile image, CTAs |
| **About** | Animated skill bars, timeline experience, education, certs |
| **Services** | 10 animated service cards with hover effects |
| **Projects** | Gallery with category filtering (React, Next.js, etc.) |
| **Team** | Member cards with WhatsApp + LinkedIn + GitHub |
| **Stats** | Animated counters triggered on scroll |
| **Tech Stack** | Icon grid with hover glow effects |
| **Testimonials** | Auto-sliding carousel with star ratings |
| **Contact** | Validated form with Formspree / EmailJS integration |
| **WhatsApp** | Floating CTA with pulse animation |
| **Footer** | Full footer with links, socials, back-to-top |
| **SEO** | Meta, OG tags, Twitter cards, JSON-LD schema |
| **Performance** | Lazy loading, Vite code splitting, optimized build |
| **Accessibility** | Skip link, ARIA labels, focus styles, semantic HTML |

---

## 🛠 Tech Stack

- **React 18** + **Vite 5**
- **Vanilla CSS** with CSS custom properties (no Tailwind needed)
- **Intersection Observer API** for scroll animations & counters
- **Formspree** / EmailJS for contact form emails
- Zero external CSS dependencies for maximum performance

---

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Sticky nav, mobile menu, theme toggle
│   │   ├── Hero.jsx            # Hero with particles + typing animation
│   │   ├── About.jsx           # Bio, skills, experience, education
│   │   ├── Services.jsx        # Animated service cards
│   │   ├── Projects.jsx        # Filterable project gallery
│   │   ├── Sections.jsx        # Team, Stats, TechStack, Testimonials
│   │   ├── Contact.jsx         # Contact form with validation
│   │   ├── Footer.jsx          # Full footer
│   │   └── WhatsAppFloat.jsx   # Floating WhatsApp button
│   ├── data/
│   │   └── config.js           # ⭐ ALL YOUR CONTENT IS HERE
│   ├── hooks/
│   │   └── index.js            # useScrollReveal, useCounter, useTheme
│   ├── styles.css              # Global styles + theme system
│   ├── App.jsx                 # Root component
│   └── main.jsx                # Entry point
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## ✏️ Personalizing Your Portfolio

**Edit ONE file to update everything:** `src/data/config.js`

```js
// Change these to your real info:
export const personalInfo = {
  name: "Your Name",
  email: "you@example.com",
  phone: "+1 (555) 000-0000",
  whatsapp: "+15550000000",
  // ...
};
```

The config file controls:
- ✅ Personal info (name, email, phone, address)
- ✅ Social links (LinkedIn, GitHub, Twitter, etc.)
- ✅ Skills with levels and colors
- ✅ Work experience timeline
- ✅ Education & certifications
- ✅ Services list (icons, titles, descriptions)
- ✅ Projects gallery (images, tech, links)
- ✅ Team members
- ✅ Tech stack icons
- ✅ Statistics counters
- ✅ Client testimonials
- ✅ SEO meta (title, description, keywords)

---

## 📧 Contact Form Setup

### Option A: Formspree (Easiest)
1. Go to [formspree.io](https://formspree.io) → create a free account
2. Create a new form → copy your Form ID
3. In `src/components/Contact.jsx`, replace:
   ```js
   'https://formspree.io/f/YOUR_FORM_ID'
   ```
   with your actual form URL.

### Option B: EmailJS
1. Sign up at [emailjs.com](https://www.emailjs.com)
2. Create a service and template
3. Install: `npm install @emailjs/browser`
4. Replace the fetch call in Contact.jsx with:
   ```js
   import emailjs from '@emailjs/browser';
   await emailjs.send('SERVICE_ID', 'TEMPLATE_ID', form, 'PUBLIC_KEY');
   ```

---

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Drag & drop the `dist/` folder to netlify.com
```

### GitHub Pages
```bash
npm install --save-dev gh-pages
# Add to package.json scripts: "deploy": "gh-pages -d dist"
npm run build && npm run deploy
```

---

## 🎨 Theme Customization

Edit CSS variables in `src/styles.css` under `:root` for dark theme and `[data-theme="light"]` for light theme:

```css
:root {
  --accent-purple: #8b5cf6;  /* Main accent color */
  --accent-blue: #3b82f6;    /* Secondary accent */
  --accent-cyan: #22d3ee;    /* Highlight color */
}
```

---

## 📊 Performance Tips

- Replace Unsplash URLs with your own optimized images
- Use WebP format for images where possible
- Add `loading="lazy"` to below-the-fold images (already done)
- Run `npm run build` and check bundle size with `vite-bundle-visualizer`

---

## 📝 License

MIT – free to use, modify, and distribute.
