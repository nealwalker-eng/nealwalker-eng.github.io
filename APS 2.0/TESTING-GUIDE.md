# APS Website Testing & Validation Guide

## 🧪 Testing Checklist

### Accessibility Testing (WCAG 2.1 AA Compliance)

#### Automated Testing
- [ ] **WAVE**: https://wave.webaim.org/ - Test each page for accessibility issues
- [ ] **axe DevTools**: Browser extension for automated accessibility testing
- [ ] **Lighthouse Accessibility**: Target 100% accessibility score

#### Manual Testing
- [ ] **Keyboard Navigation**: Tab through entire site without mouse
- [ ] **Screen Reader**: Test with NVDA (Windows) or VoiceOver (Mac)
- [ ] **Focus Management**: Verify visible focus indicators
- [ ] **Color Contrast**: Minimum 4.5:1 ratio (preferably 7:1)
- [ ] **Form Labels**: All inputs properly labeled and associated
- [ ] **Alt Text**: All images have descriptive alt attributes
- [ ] **Headings**: Proper H1-H6 hierarchy on each page

#### Accessibility Features to Verify
```html
<!-- Skip to main content link -->
<a href="#main-content" class="sr-only focus:not-sr-only">Skip to main content</a>

<!-- ARIA landmarks -->
<main role="main" id="main-content">
<nav role="navigation" aria-label="Main navigation">
<header role="banner">

<!-- Form accessibility -->
<label for="input-id">Label Text</label>
<input id="input-id" aria-required="true" aria-describedby="error-id">
<div id="error-id" aria-live="polite">Error message</div>
```

### Performance Testing (Core Web Vitals)

#### Lighthouse Audits
```bash
# Run Lighthouse audit
npm run test:lighthouse

# Target scores:
# Performance: 100/100
# Accessibility: 100/100  
# Best Practices: 100/100
# SEO: 100/100
```

#### Core Web Vitals Targets
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms  
- **CLS (Cumulative Layout Shift)**: < 0.1

#### Performance Checklist
- [ ] **Images**: WebP format with lazy loading
- [ ] **Critical CSS**: Above-the-fold styles inlined
- [ ] **JavaScript**: Non-blocking, deferred loading
- [ ] **Fonts**: Optimized loading with font-display: swap
- [ ] **Compression**: Gzip/Brotli enabled on server
- [ ] **Caching**: Proper cache headers set

### HTML5 Validation

#### W3C Markup Validator
```bash
# Validate HTML files
npm run validate:html

# Or use online validator:
# https://validator.w3.org/
```

#### HTML5 Validation Points
- [ ] **DOCTYPE**: Proper HTML5 DOCTYPE declaration
- [ ] **Lang Attribute**: `<html lang="en">` specified
- [ ] **Meta Tags**: Required viewport, charset, description
- [ ] **Semantic Elements**: Proper use of header, main, nav, section, article
- [ ] **Form Validation**: Required attributes and proper input types
- [ ] **ARIA**: Valid ARIA attributes and roles

### CSS Validation & Linting

#### Stylelint Configuration
```bash
# Run CSS linting
npm run lint:css

# Fix auto-fixable issues
npx stylelint styles.css --fix
```

#### CSS Best Practices
- [ ] **Property Order**: Consistent ordering (position, display, margin, etc.)
- [ ] **Vendor Prefixes**: Proper autoprefixer configuration
- [ ] **Custom Properties**: CSS variables for maintainability
- [ ] **Media Queries**: Mobile-first responsive design
- [ ] **Specificity**: Avoid overly specific selectors

### JavaScript Testing & Linting

#### ESLint Configuration
```bash
# Run JavaScript linting
npm run lint:js

# Check for accessibility issues
eslint script.js --rule 'jsx-a11y/click-events-have-key-events: error'
```

#### JavaScript Best Practices
- [ ] **Event Delegation**: Use document-level event listeners
- [ ] **Progressive Enhancement**: Graceful degradation when JS disabled
- [ ] **Error Handling**: Try/catch blocks and error logging
- [ ] **Performance**: Efficient DOM queries and manipulation
- [ ] **Accessibility**: Keyboard event handlers alongside mouse events

### Cross-Browser Testing

#### Browser Compatibility Matrix
| Feature | Chrome | Firefox | Safari | Edge | iOS Safari | Android |
|---------|--------|---------|---------|------|------------|---------|
| CSS Grid | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Flexbox | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Custom Properties | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| IntersectionObserver | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| ES6 Modules | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

#### Manual Testing Checklist
- [ ] **Desktop**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- [ ] **Mobile**: iOS Safari, Chrome Mobile, Samsung Internet
- [ ] **Tablet**: iPad Safari, Android Chrome
- [ ] **Accessibility**: Windows Narrator, macOS VoiceOver

### Security Testing

#### Content Security Policy (CSP)
```bash
# Test CSP headers
curl -I https://americaprotectivesecurity.com

# Verify nonce implementation
# Check that scripts have proper nonce attributes
```

#### Security Checklist
- [ ] **HTTPS**: All resources served over HTTPS
- [ ] **Headers**: HSTS, CSP, X-Frame-Options, X-Content-Type-Options
- [ ] **Forms**: Input sanitization and validation
- [ ] **Dependencies**: No known vulnerabilities in packages
- [ ] **Privacy**: Cookie consent and GDPR compliance

### Mobile & Touch Testing

#### Device Testing
- [ ] **iPhone**: Safari (iOS 14+)
- [ ] **Android**: Chrome Mobile (Android 10+)
- [ ] **iPad**: Safari tablet mode
- [ ] **Touch Targets**: Minimum 44x44px touch areas
- [ ] **Viewport**: Proper mobile viewport configuration
- [ ] **Orientation**: Portrait and landscape modes

#### Touch Interactions
```javascript
// Touch event handling
element.addEventListener('touchstart', handleTouchStart);
element.addEventListener('touchmove', handleTouchMove);
element.addEventListener('touchend', handleTouchEnd);
```

### SEO Testing

#### Technical SEO Checklist
- [ ] **Sitemap**: XML sitemap accessible at /sitemap.xml
- [ ] **Robots.txt**: Proper directives for crawlers
- [ ] **Meta Tags**: Title, description, keywords per page
- [ ] **Open Graph**: Social media sharing optimization
- [ ] **Schema Markup**: JSON-LD structured data
- [ ] **Canonical URLs**: Prevent duplicate content issues
- [ ] **Page Speed**: Fast loading times for SEO ranking

#### SEO Tools
```bash
# Google PageSpeed Insights
# https://pagespeed.web.dev/

# Google Search Console
# https://search.google.com/search-console

# Schema.org Validator  
# https://validator.schema.org/
```

### Analytics Testing

#### Google Analytics 4 Verification
- [ ] **Tracking Code**: GA4 script loads correctly
- [ ] **Consent Management**: Analytics only after user consent
- [ ] **Events**: Form submissions, CTA clicks tracked
- [ ] **Conversions**: Goal completions recorded
- [ ] **Privacy**: IP anonymization and data retention policies

#### Testing Commands
```javascript
// Test GA4 in browser console
console.log(window.dataLayer);

// Verify event tracking
gtag('event', 'test_event', { test: true });
```

## 🚀 Deployment Testing

### Pre-Deployment Checklist
- [ ] All automated tests pass
- [ ] Manual accessibility testing complete
- [ ] Cross-browser testing verified
- [ ] Performance targets met
- [ ] Security headers configured
- [ ] Analytics tracking functional

### Post-Deployment Verification
- [ ] **Live Site**: All pages load correctly
- [ ] **Forms**: Contact and newsletter forms submit successfully
- [ ] **Analytics**: GA4 tracking active in production
- [ ] **Performance**: Lighthouse scores maintained
- [ ] **Security**: SSL certificate valid and headers present

### Monitoring & Maintenance
- [ ] **Uptime**: Monitor site availability
- [ ] **Performance**: Regular Lighthouse audits
- [ ] **Security**: Automated vulnerability scanning
- [ ] **Analytics**: Monthly performance reviews
- [ ] **Accessibility**: Quarterly accessibility audits

---

**Target Achievement Goals:**
- ✅ 100% Lighthouse Performance Score
- ✅ 100% Lighthouse Accessibility Score  
- ✅ WCAG 2.1 AA Compliance
- ✅ Core Web Vitals "Good" Rating
- ✅ Zero Critical Security Issues
- ✅ Cross-Browser Compatibility