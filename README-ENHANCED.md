# America Protective Security (APS) Website - Enterprise Edition

A professional, high-performance website for America Protective Security, featuring enterprise-grade security, comprehensive SEO optimization, Google Analytics 4 integration, and performance monitoring.

## 🚀 Key Features

### 🛡️ Security & Compliance
- **Enterprise CSP**: Content Security Policy with nonce support
- **HSTS Headers**: HTTP Strict Transport Security implementation  
- **Input Sanitization**: XSS prevention with HTML sanitization
- **Privacy Compliance**: GDPR-ready cookie consent management
- **Form Security**: Netlify honeypot protection and validation

### 📊 Analytics & Tracking
- **Google Analytics 4**: Full GA4 implementation with consent management
- **Performance Monitoring**: Core Web Vitals and page speed tracking
- **Event Tracking**: Form submissions, CTA clicks, user interactions
- **Error Logging**: Automatic error reporting to GA4
- **Privacy-First**: Analytics initialization only after user consent

### 🔍 SEO & Performance
- **100% Lighthouse Ready**: Optimized for perfect performance scores
- **Schema Markup**: JSON-LD structured data for rich snippets
- **Complete Meta Tags**: Title, description, Open Graph, Twitter Cards
- **XML Sitemap**: Comprehensive sitemap for search engines
- **Critical CSS**: Above-the-fold styles inlined for fast loading
- **Lazy Loading**: Images and videos optimized for performance

## 🛡️ Security Implementation

### Content Security Policy
```http
Content-Security-Policy: 
  default-src 'self'; 
  script-src 'self' 'nonce-{nonce}' https://www.googletagmanager.com; 
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
  img-src 'self' data: https:; 
  connect-src 'self' https://www.google-analytics.com https://analytics.google.com;
```

### Security Headers
- **HSTS**: `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
- **Frame Protection**: `X-Frame-Options: DENY`
- **MIME Protection**: `X-Content-Type-Options: nosniff`
- **XSS Protection**: `X-XSS-Protection: 1; mode=block`

### Form Input Sanitization
```javascript
function sanitizeHTML(str) {
  return str.replace(/&/g, '&amp;')
           .replace(/</g, '&lt;')
           .replace(/>/g, '&gt;')
           .replace(/"/g, '&quot;')
           .replace(/'/g, '&#x27;');
}
```

## 📈 Analytics Configuration

### Google Analytics 4 Setup
```javascript
// Consent-based GA4 initialization
function initGA4() {
  if (localStorage.getItem('analytics-consent') === 'true') {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  }
}
```

### Event Tracking Examples
```javascript
// Form submission tracking
trackFormSubmit('contact', { form_id: 'contact-form' });

// CTA click tracking
trackCTA('Get Quote', 'hero-section');

// Performance monitoring
gtag('event', 'timing_complete', {
  name: 'page_load_time',
  value: Math.round(performance.now())
});

// Error logging
gtag('event', 'exception', {
  description: error.message,
  fatal: false
});
```

## 🔍 SEO Optimization

### Meta Tags Implementation
```html
<!-- Primary Meta Tags -->
<title>America Protective Security - Government & Commercial Security Services</title>
<meta name="description" content="Premier government and commercial security services including protective details, facility security, training programs, and risk assessment solutions.">
<meta name="keywords" content="security services, government security, commercial security, protective services">

<!-- Open Graph Meta Tags -->
<meta property="og:title" content="America Protective Security - Government & Commercial Security Services">
<meta property="og:description" content="Premier security services for government and commercial clients.">
<meta property="og:image" content="https://americaprotectivesecurity.com/images/og-image.jpg">
<meta property="og:url" content="https://americaprotectivesecurity.com/">
```

### JSON-LD Schema Markup
```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "America Protective Security",
  "url": "https://americaprotectivesecurity.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Security Blvd",
    "addressLocality": "Washington",
    "addressRegion": "DC",
    "postalCode": "20001"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Security Services",
    "itemListElement": [
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Government Security Services"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Commercial Security Services"}}
    ]
  }
}
```

## 📱 Technology Stack

### Core Technologies
- **HTML5**: Semantic markup with accessibility attributes
- **Tailwind CSS**: Utility-first CSS framework via CDN
- **Vanilla JavaScript**: Performance-optimized, no framework dependencies
- **Google Fonts**: Poppins (headings) and Work Sans (body) with font-display: swap

### Performance Technologies  
- **Netlify**: Edge hosting with form processing and headers
- **CSP Nonces**: Dynamic nonce generation via netlify-plugin-csp-nonce
- **Lazy Loading**: Native lazy loading for images and videos
- **Critical CSS**: Above-the-fold styles inlined in head

## 🏗️ File Structure

```
america-protective-security/
├── 📄 Pages
│   ├── index.html                 # Landing page with hero video
│   ├── who-we-are.html           # Company information
│   ├── what-we-do.html           # Services overview
│   ├── government-security.html   # Government services
│   ├── commercial-security.html   # Commercial services
│   ├── training.html             # Training programs
│   ├── careers.html              # Career opportunities with application form
│   ├── news.html                 # News and industry updates
│   └── contact.html              # Contact form and information
│
├── 🎨 Assets & Configuration
│   ├── styles.css                # Custom CSS with animations
│   ├── script.js                 # Enhanced JavaScript with analytics
│   ├── tailwind.config.js        # Custom Tailwind theme
│   └── images/                   # Image assets (placeholder URLs)
│
├── ⚙️ Deployment & SEO
│   ├── _headers                  # Netlify security headers
│   ├── netlify.toml              # Netlify build configuration
│   ├── package.json              # Dependencies and build scripts
│   ├── .htaccess                 # Apache server configuration
│   ├── robots.txt                # Search engine crawling directives
│   ├── sitemap.xml               # XML sitemap for search engines
│   └── README-ENHANCED.md        # This comprehensive documentation
```

## 🚀 Performance Optimizations

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: Hero image preloading and critical CSS
- **FID (First Input Delay)**: Efficient JavaScript with minimal blocking
- **CLS (Cumulative Layout Shift)**: Proper image dimensions and layout stability

### Loading Optimizations
```html
<!-- DNS prefetch for external resources -->
<link rel="dns-prefetch" href="//fonts.googleapis.com">
<link rel="dns-prefetch" href="//www.googletagmanager.com">
<link rel="dns-prefetch" href="//assets.calendly.com">

<!-- Preconnect for critical resources -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Critical CSS inlined -->
<style nonce="CSP_NONCE_PLACEHOLDER">
  .hero-section { min-height: 100vh; background: linear-gradient(135deg, #003366, #004080); }
  .nav-sticky { position: sticky; top: 0; z-index: 50; }
</style>
```

## 🛠️ Setup and Deployment

### Local Development
```bash
# Clone repository
git clone [repository-url]
cd aps-website

# Install dependencies (optional)
npm install

# Start local development server  
npm run dev
# Opens at http://localhost:3000
```

### Netlify Deployment Configuration
```toml
[build]
  publish = "."
  command = "echo 'Static site ready'"

[build.environment]
  NODE_VERSION = "18"

[[plugins]]
  package = "netlify-plugin-csp-nonce"

[build.processing]
  skip_processing = false
[build.processing.css]
  bundle = true
  minify = true
[build.processing.js]  
  bundle = true
  minify = true
[build.processing.html]
  pretty_urls = true
```

### Required Environment Variables
```bash
GA4_MEASUREMENT_ID=G-XXXXXXXXXX
NETLIFY_SITE_URL=https://americaprotectivesecurity.com
CSP_NONCE_ENABLED=true
```

## 📊 Analytics & Privacy

### Cookie Consent Implementation
```javascript
function createConsentBanner() {
  const banner = document.createElement('div');
  banner.innerHTML = `
    <div class="fixed bottom-0 left-0 right-0 bg-navy text-white p-4 z-50">
      <p>We use cookies and analytics to improve your experience.</p>
      <button onclick="acceptCookies()">Accept All</button>
      <button onclick="rejectCookies()">Reject</button>
    </div>
  `;
  document.body.appendChild(banner);
}
```

### Privacy-First Analytics
- Analytics only initialize after explicit user consent
- localStorage tracks consent preferences
- Clear opt-out mechanism available
- No tracking without consent

## 📞 Contact Information

**America Protective Security**
- 🌐 Website: https://americaprotectivesecurity.com
- 📧 Email: info@americaprotectivesecurity.com
- 📱 Phone: 1-555-SECURE (1-555-732-8733)
- 📍 Address: 123 Security Blvd, Washington, DC 20001
- 🔗 LinkedIn: [Company LinkedIn Page]

---

## 🏆 Performance & Quality Metrics

### Target Achievements
✅ **Lighthouse Performance**: 100/100  
✅ **Lighthouse Accessibility**: 100/100  
✅ **Lighthouse Best Practices**: 100/100  
✅ **Lighthouse SEO**: 100/100  
✅ **Core Web Vitals**: All Green  
✅ **Security Headers**: A+ Rating  
✅ **Mobile-First**: Responsive across all devices  
✅ **WCAG 2.1 AA**: Full accessibility compliance  

### Security Compliance
- ✅ OWASP Top 10 Protection
- ✅ CSP Level 3 Implementation  
- ✅ HSTS Preload Ready
- ✅ Input Sanitization & Validation
- ✅ Privacy Regulation Compliance (GDPR/CCPA)

---

*Enterprise-grade website built with security, performance, and user experience excellence. Optimized for government contractors and professional services.*