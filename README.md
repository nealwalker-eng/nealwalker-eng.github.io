# America Protective Security Website

A SpaceX-inspired, high-performance website for America Protective Security (APS) built with Next.js, React, Tailwind CSS, and Framer Motion.

## Features

- 🚀 **SpaceX-Inspired Design**: Minimalist, tech-forward aesthetic with smooth animations
- 📱 **Fully Responsive**: Mobile-first design that works on all devices
- ♿ **WCAG AAA Compliant**: Full accessibility support with keyboard navigation
- ⚡ **High Performance**: Optimized for 100/100 Lighthouse scores
- 🎨 **Custom Design System**: Navy/white color scheme with red accents
- 📝 **Form Handling**: Contact, newsletter, and career application forms
- 🔍 **SEO Optimized**: Complete meta tags, sitemap, and robots.txt

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with fonts and metadata
│   ├── page.tsx          # Home page
│   ├── about/            # About page
│   ├── services/         # Services page
│   ├── training-careers/ # Training & Careers page
│   ├── news/             # News page
│   ├── contact/          # Contact page
│   └── globals.css       # Global styles
├── components/           # Reusable React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── ContactForm.tsx
│   └── ...
├── public/               # Static assets
│   └── images/          # Images and videos
└── package.json
```

## Customization

### Colors

Edit `tailwind.config.ts` to customize the color palette:

```typescript
colors: {
  navy: '#003366',
  'medium-blue': '#004080',
  'red-accent': '#FF0000',
  // ...
}
```

### Content

- Update page content in `app/*/page.tsx` files
- Modify components in `components/` directory
- Add images to `public/images/`

### Forms

Forms are configured for Netlify Forms by default. To use a different backend:

1. Update form submission handlers in form components
2. Configure API routes in `app/api/` if needed

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Deploy automatically

### Netlify

1. Build the project: `npm run build`
2. Deploy the `out` directory (if using static export)
3. Configure Netlify Forms for form submissions

## Environment Variables

Create a `.env.local` file for environment-specific variables:

```env
NEXT_PUBLIC_SITE_URL=https://americaprotectivesecurity.com
# Add other variables as needed
```

## License

© 2025 America Protective Security. All rights reserved.

## Contact

- **Phone**: 301-434-2220
- **Address**: 10304 New Hampshire Ave, Silver Spring, MD 20903
- **Licenses**: MD 106-4499, DC SAB3178, VA 11-4726
