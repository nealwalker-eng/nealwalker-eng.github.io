# Setup Guide - America Protective Security Website

## ✅ What's Been Built

Your SpaceX-inspired website is complete! Here's what's included:

### Pages
- ✅ Home page with hero video, services, clients, and service areas
- ✅ About page with company history, values, and differentiators
- ✅ Services page with government/commercial tabs and service details
- ✅ Training & Careers page with job listings and application form
- ✅ News page with article grid and newsletter signup
- ✅ Contact page with form, Calendly integration, and map

### Components
- ✅ Sticky header with mobile menu
- ✅ Footer with contact info and licenses
- ✅ Hero sections with video backgrounds
- ✅ Animated components (FadeIn, scroll indicators)
- ✅ Forms (Contact, Newsletter, Career Application)
- ✅ Cookie consent banner
- ✅ Service cards, client logos, CTA sections

### Features
- ✅ SEO optimized (sitemap, robots.txt, meta tags)
- ✅ WCAG AAA accessibility
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smooth animations with Framer Motion
- ✅ Security headers configured
- ✅ Form validation with Zod

## 🔧 Configuration Needed

### 1. Calendly Integration

Update the Calendly URLs in these files:
- `app/training-careers/page.tsx` (line ~200)
- `app/contact/page.tsx` (line ~100)

Replace `https://calendly.com/your-calendly-url` with your actual Calendly URL.

### 2. Google Maps Embed

Update the Google Maps iframe in `app/contact/page.tsx` (line ~150) with the correct coordinates for:
**10304 New Hampshire Ave, Silver Spring, MD 20903**

You can get the embed code from Google Maps:
1. Go to Google Maps
2. Search for your address
3. Click "Share" → "Embed a map"
4. Copy the iframe code and replace the current one

### 3. Google Analytics (Optional)

If you want Google Analytics 4:

1. Get your GA4 Measurement ID (format: G-XXXXXXXXXX)
2. Add it to `components/CookieConsent.tsx` in the `handleAccept` function
3. Create `lib/analytics.ts`:

```typescript
export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
```

4. Add the GA script to `app/layout.tsx` in the `<head>` section (after cookie consent).

### 4. Form Submissions

Forms are configured for **Netlify Forms** by default. If deploying to Netlify, they'll work automatically.

For other platforms:
- **Vercel**: Use API routes in `app/api/`
- **Custom Backend**: Update form submission handlers in form components

### 5. Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SITE_URL=https://americaprotectivesecurity.com
# Add other variables as needed
```

## 🚀 Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your website.

## 📦 Building for Production

```bash
npm run build
npm start
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import repository in Vercel
3. Deploy automatically

### Netlify

1. Build: `npm run build`
2. Deploy the `.next` folder
3. Configure Netlify Forms

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` to change colors

### Content
- Pages: `app/*/page.tsx`
- Components: `components/*.tsx`
- Images: `public/images/`

### Fonts
Fonts are already configured (Poppins for headings, Work Sans for body)

## 📝 Notes

- All images are in `public/images/` (copied from your original `images/` folder)
- The logo path is `/images/logo.png` - make sure this file exists
- Forms include honeypot spam protection
- All pages are SEO optimized with meta tags
- Accessibility features are built-in (keyboard navigation, ARIA labels)

## 🐛 Troubleshooting

### Images not loading
- Check that images are in `public/images/`
- Use Next.js Image component for optimization

### Forms not submitting
- Check Netlify Forms configuration if on Netlify
- Check browser console for errors
- Verify form action URLs

### Video not playing
- Check video file path in `public/images/`
- Ensure video format is MP4
- Check browser console for errors

## ✨ Next Steps

1. ✅ Update Calendly URLs
2. ✅ Update Google Maps embed
3. ✅ Test all forms
4. ✅ Add Google Analytics (optional)
5. ✅ Review and customize content
6. ✅ Test on mobile devices
7. ✅ Run Lighthouse audit
8. ✅ Deploy to production

## 📞 Support

For questions or issues, refer to the README.md or Next.js documentation.

---

**Built with ❤️ for America Protective Security**
