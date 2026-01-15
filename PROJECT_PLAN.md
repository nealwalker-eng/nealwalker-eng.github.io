# America Protective Security (APS) Website - Project Plan

## Project Overview
Building a SpaceX-inspired, high-performance website for America Protective Security (APS) using Next.js, React, Tailwind CSS, and modern web technologies. The site will feature a minimalist, tech-forward aesthetic with smooth animations, full-screen heroes, and a professional navy/white color scheme.

## Design System

### Color Palette
- **Primary Navy**: `#003366`
- **Medium Blue**: `#004080`
- **Black Primary**: `#000000`
- **Dark Gray**: `#4D4D4D`
- **Medium Gray**: `#6c757d`
- **Light Gray**: `#f8f9fa`
- **Very Light Gray**: `#e9ecef`
- **Red Accent**: `#FF0000` (for CTAs)
- **White**: `#FFFFFF`

### Typography
- **Headings**: Poppins (weights: 400, 600, 700)
- **Body**: Work Sans (weights: 300, 400, 500, 600)
- Font display: `swap` for performance

### Design Principles
- Minimalist, tech-forward aesthetic (SpaceX-inspired)
- Smooth animations and transitions
- High-performance SPA structure
- Full-screen heroes with video backgrounds
- Sticky navigation
- Fade-in animations on scroll
- WCAG 2.1 AAA compliance (7:1 contrast ratio)
- Target: 100/100 Lighthouse scores

## Project Structure

```
aps-website/
├── app/
│   ├── layout.tsx          # Global layout with header/footer
│   ├── page.tsx            # Home page
│   ├── about/
│   │   └── page.tsx        # About page
│   ├── services/
│   │   └── page.tsx        # Services page
│   ├── training-careers/
│   │   └── page.tsx        # Training & Careers page
│   ├── news/
│   │   └── page.tsx        # News page
│   ├── contact/
│   │   └── page.tsx        # Contact page
│   └── globals.css         # Global styles
├── components/
│   ├── HeroSection.tsx
│   ├── TwoColumnSection.tsx
│   ├── ServiceCard.tsx
│   ├── ClientLogo.tsx
│   ├── CTASection.tsx
│   ├── ContactForm.tsx
│   ├── NewsletterForm.tsx
│   ├── CareerApplicationForm.tsx
│   ├── Modal.tsx
│   ├── CookieConsent.tsx
│   ├── SEO.tsx
│   ├── LazyImage.tsx
│   ├── VideoBackground.tsx
│   └── FadeIn.tsx
├── lib/
│   ├── supabase.ts         # Supabase client (if needed)
│   └── utils.ts            # Utility functions
├── public/
│   ├── images/             # All images (already exists)
│   └── videos/             # Video files
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Implementation Phases

### Phase 1: Project Scaffolding
**Goal**: Set up the foundation of the Next.js application

**Tasks**:
1. Initialize Next.js project with App Router and TypeScript
2. Install and configure Tailwind CSS
3. Set up custom fonts (Poppins, Work Sans) using `next/font/google`
4. Extend Tailwind config with:
   - Custom color palette
   - Custom background gradients (`hero-gradient`)
   - Custom box shadows (`soft`, `medium`)
   - Custom font families
5. Install core dependencies:
   - `framer-motion` (animations)
   - `@supabase/supabase-js` (backend/forms)
   - `react-hook-form` (form handling)
   - `zod` (validation)
6. Create global layout structure
7. Set up basic SEO configuration

**Deliverables**:
- Working Next.js app with Tailwind CSS
- Custom theme configuration
- Basic layout structure

---

### Phase 2: Reusable Components
**Goal**: Build modular, reusable components for efficiency

**Components to Build**:

1. **HeroSection**
   - Full-screen height
   - Video background support (with fallback)
   - Hero gradient overlay
   - Animated text (slide-up, staggered)
   - Red accent CTA button
   - Scroll indicator with bounce animation

2. **TwoColumnSection**
   - Responsive 2-column layout
   - Image/text positioning (left/right, reverse option)
   - Fade-in on scroll (Intersection Observer)

3. **ServiceCard**
   - Navy border, white background
   - Icon/title/description
   - Hover effects (scale 1.05, red shadow)
   - Link to service details

4. **ClientLogo**
   - Grayscale-to-color transition on hover
   - Scale animation (1.05)

5. **CTASection**
   - Call-to-action block
   - Red accent button
   - White text on navy background

6. **ContactForm**
   - Multi-field form (react-hook-form + zod)
   - Fields: name, email, phone, service type, message, budget, timeline
   - Real-time validation
   - Error messages
   - Honeypot spam protection
   - Success/error states
   - Submit to Supabase or API route

7. **NewsletterForm**
   - Simple email subscription form

8. **CareerApplicationForm**
   - Job application form
   - File upload support

9. **Modal**
   - Reusable modal component
   - For Privacy Policy/Terms

10. **CookieConsent**
    - GDPR-compliant banner
    - Accept/decline functionality
    - localStorage persistence

11. **SEO Component**
    - Meta tags
    - Open Graph
    - Twitter Cards
    - Canonical URLs
    - JSON-LD schemas

12. **LazyImage**
    - Next.js Image with lazy loading

13. **VideoBackground**
    - Video background component
    - Autoplay with fallback

14. **FadeIn**
    - Framer Motion wrapper
    - Scroll-triggered opacity animation
    - 700ms ease-in-out at 10% viewport

**Requirements**:
- All components responsive
- WCAG AAA accessible (ARIA labels, focus indicators)
- Smooth scrolling for anchors
- Hover effects (0.3s transitions)

---

### Phase 3: Home Page
**Goal**: Create the main landing page with SpaceX-inspired design

**Sections**:
1. **Hero Section**
   - Video background: `World_video_Hero.mp4`
   - Headline: "Securing Tomorrow: Professional Protection for Government and Commercial Clients"
   - Subtext: 20+ years experience, small business status, service areas (MD, DC, VA)
   - Red CTA: "Request a Consultation"

2. **Who We Are**
   - TwoColumnSection
   - Image: `who_we_are.jpg`
   - Text: History, mission, core values

3. **Services Overview**
   - Grid of ServiceCards:
     - Armed Guards
     - Unarmed Guards
     - Patrol Services
     - Firewatch
     - Remote Monitoring
   - Brief descriptions
   - Compliance mentions (41 CFR Part 102-74)

4. **Client Success**
   - ClientLogo grid:
     - `SSA_Gov_Client.jpg`
     - `Whiting-Turner-new_logo.png`
     - `centronia client.png`
     - `thorlabs client.png`
     - `the hampton center new client logo.avif`
     - `Wellborn Client.avif`
   - Testimonials section

5. **Service Areas**
   - Tabbed/map section for MD/DC/VA
   - Local SEO keywords
   - License information

6. **Footer CTA**
   - Teaser to ContactForm

**SEO**:
- Title: "America Protective Security | Expert Security Services in MD, DC, VA"
- Description, keywords
- Emphasize federal compliance (FPS, DHS, 18 U.S.C. §111)

**Animations**:
- FadeIn animations on all sections
- Hero slide-up animation

---

### Phase 4: About, Services, and Training & Careers Pages

#### About Page (`/about`)
**Sections**:
1. Hero: "About America Protective Security – Your Trusted Partner in Protection"
2. Company History & Mission
   - Timeline/paragraphs
   - 20+ years experience
   - Small business government contractor status
3. Leadership & Team
   - Grid of team profiles
4. Core Values
   - Icon bullets: Integrity, Innovation, Compliance
5. Differentiators
   - Licenses, certifications
6. Red CTA to Training & Careers

#### Services Page (`/services`)
**Sections**:
1. Hero: "Comprehensive Security Solutions Tailored for You"
2. Overview TwoColumnSection
3. Tabs/Sections:
   - **Government Security**
     - Federal protection
     - FPS/DHS compliance
     - Jurisdictional guidelines
   - **Commercial Security**
     - Corporate/healthcare/transportation
     - Risk assessments
4. Specific Services Grid:
   - Armed Guards (licensing, 24/7)
   - Unarmed Guards
   - Patrol Services (mobile/static)
   - Firewatch
   - Remote Monitoring
5. CTA with service inquiry form

#### Training & Careers Page (`/training-careers`)
**Sections**:
1. Hero: "Build Your Future in Security"
2. Training Programs
   - Certifications
   - Federal courses
3. Careers
   - Job listings
   - Benefits
4. CareerApplicationForm
5. Red CTA with Calendly integration

**Navigation**:
- Add anchors for dropdown navigation
- Tech-focused tone: "Leveraging advanced protocols"

---

### Phase 5: News and Contact Pages

#### News Page (`/news`)
**Sections**:
1. Hero: "Stay Informed on Security Trends"
2. Grid of Articles:
   - "Armed Security Guards Maryland: What to Know"
   - "Best Practices Event Security DC"
   - "Private Security Virginia Trends 2025"
   - Dates, summaries, featured images
3. Industry News section
4. NewsletterForm CTA

#### Contact Page (`/contact`)
**Sections**:
1. Hero: "Get in Touch for Secure Solutions"
2. ContactForm with all fields
3. Contact Information Display:
   - Phone: 301-434-2220
   - Address: 10304 New Hampshire Ave, Silver Spring, MD 20903
   - Licenses: MD 106-4499, DC SAB3178, VA 11-4726
4. Calendly widget (async embed)
5. Interactive map for service areas

**Integrations**:
- Google Analytics 4 (initialize after consent)
- Track events: page views, form submits, CTAs
- CookieConsent component
- SEO components on all pages

---

### Phase 6: Advanced Functionality & Optimization

#### Animations
- Framer Motion animations across all pages
- Hero slide-up animations
- Section fade-ins
- Mobile menu toggle
- Keyboard navigation (Tab, Escape, Arrow keys)
- Reduced motion support (`@media prefers-reduced-motion`)

#### Security
- Security headers in `next.config.js`:
  - CSP with nonce
  - X-Frame-Options: DENY
  - X-Content-Type-Options: nosniff
  - Referrer-Policy
- Input sanitization
- XSS prevention

#### Performance
- Image optimization (WebP/AVIF)
- Font preloading
- DNS prefetch
- Code splitting
- Lazy loading

#### Forms
- Supabase integration (if dynamic backend needed)
- Alternative: Netlify Forms or API routes
- Input validation and sanitization

#### SEO & Analytics
- Google Analytics 4 (with consent)
- Sitemap.xml generation
- Robots.txt
- JSON-LD schemas (Organization, ProfessionalService)
- Meta tags for all pages
- Open Graph tags
- Twitter Cards

#### Testing & Quality Assurance
- Lighthouse audit (target: 90+ scores)
- Responsiveness testing:
  - Mobile: <640px
  - Tablet: 640-768px
  - Desktop: 768-1024px
  - Large: 1024px+
- Accessibility testing (WCAG AAA)
- Keyboard navigation testing
- Cross-browser testing

#### Deployment Preparation
- `vercel.json` configuration:
  - Redirects (www to non-www)
  - 404 to home
- Environment variables documentation
- Final polish and review

---

## Key Features

### Navigation
- Sticky header (navy background, white text)
- Logo on left (links to home)
- Menu items:
  - Home
  - About
  - Services (dropdown: Government, Commercial, Specific Services)
  - Training & Careers
  - News
  - Contact
- Mobile: Full-screen overlay menu with slide-in animation

### Footer
- 3 columns:
  1. Quick Links
  2. Contact Information
  3. Licenses Display

### Compliance & Accessibility
- WCAG 2.1 AAA compliance
- 7:1 contrast ratio
- ARIA labels
- Keyboard navigation
- Screen reader support

### Performance Targets
- Lighthouse Score: 100/100
- Fast page loads
- Smooth animations (60fps)
- Optimized images
- Code splitting

---

## Assets Available

### Images
- `APS Eagle Logo.jpg` - Main logo
- `who_we_are.jpg` - About section
- `SSA_Gov_Client.jpg` - Client logo
- `Whiting-Turner-new_logo.png` - Client logo
- `centronia client.png` - Client logo
- `thorlabs client.png` - Client logo
- `the hampton center new client logo.avif` - Client logo
- `Wellborn Client.avif` - Client logo
- Various service images (church, construction, event, office, warehouse)
- Hero images (Government, Maryland, Virginia, Washington DC)
- Training images
- Career images

### Videos
- `World_video_Hero.mp4` - Main hero video
- `capitol-video-hero.mp4` - Alternative hero video

---

## Technical Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Backend**: Supabase (optional) or Netlify Forms
- **Deployment**: Vercel
- **Analytics**: Google Analytics 4
- **Fonts**: Google Fonts (Poppins, Work Sans)

---

## Success Criteria

1. ✅ SpaceX-inspired minimalist design
2. ✅ Smooth animations and transitions
3. ✅ 100/100 Lighthouse scores
4. ✅ WCAG AAA accessibility compliance
5. ✅ Fully responsive (mobile, tablet, desktop)
6. ✅ SEO optimized
7. ✅ Fast page loads
8. ✅ Professional, authoritative appearance
9. ✅ All forms functional with validation
10. ✅ Ready for production deployment

---

## Next Steps

1. Review and approve this project plan
2. Begin Phase 1: Project Scaffolding
3. Iterate through each phase sequentially
4. Test and refine after each phase
5. Final deployment to Vercel

---

## Notes

- All assets are already available in the `/images` folder
- Focus on frontend-first approach (Supabase optional for forms)
- Emphasize tech-forward, innovative security solutions
- Maintain professional, authoritative tone
- Ensure federal compliance messaging is prominent
