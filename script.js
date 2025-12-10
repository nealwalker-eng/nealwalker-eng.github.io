// APS Website - Enhanced Security & Analytics
// Performance monitoring start
const performanceStart = performance.now();

// Content protection - disable right-click and copy (TEMPORARILY DISABLED)
// document.addEventListener('contextmenu', e => e.preventDefault());
// document.addEventListener('copy', e => e.preventDefault());
// document.addEventListener('selectstart', e => e.preventDefault());
// document.addEventListener('dragstart', e => e.preventDefault());

// Carousel scrolling functionality
function scrollCarousel(carouselId, scrollAmount) {
  const carousel = document.getElementById(carouselId);
  if (carousel) {
    carousel.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }
}

// Initialize Google Analytics 4 with consent management
function initGA4() {
  // Check for user consent before initializing GA4
  if (localStorage.getItem('analytics-consent') === 'true') {
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX', {
      page_title: document.title,
      page_location: window.location.href
    });
    
    // Performance monitoring
    gtag('event', 'page_load_time', {
      value: Math.round(performance.now())
    });
    
    console.log('GA4 initialized with consent');
  }
}

// HTML sanitization for form inputs
function sanitizeHTML(str) {
  const temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Error logging to GA4
function logError(error, context = '') {
  console.error('APS Error:', error);
  
  if (window.gtag && localStorage.getItem('analytics-consent') === 'true') {
    gtag('event', 'exception', {
      description: `${context}: ${error.message}`,
      fatal: false
    });
  }
}

// Track form submissions
function trackFormSubmit(formType, formData = {}) {
  if (window.gtag && localStorage.getItem('analytics-consent') === 'true') {
    gtag('event', 'submit_form', {
      form_type: formType,
      ...formData
    });
  }
}

// Track CTA clicks
function trackCTA(ctaName, ctaLocation) {
  if (window.gtag && localStorage.getItem('analytics-consent') === 'true') {
    gtag('event', 'click_cta', {
      cta_name: ctaName,
      cta_location: ctaLocation
    });
  }
}

// Progressive Enhancement Check
const hasJS = () => document.documentElement.classList.add('js-enabled');

// Initialize APS Website JavaScript with Enhanced Accessibility
document.addEventListener('DOMContentLoaded', function() {
  try {
    // Enable progressive enhancement
    hasJS();
    
    // Initialize analytics if consent given
    initGA4();
    
    // Core functionality with event delegation
    initEventDelegation();
    initMobileMenu();
    initLazyLoading();
    initSmoothScrolling();
    initHeroVideo();
    initFormValidation();
    initFadeInAnimations();
    initKeyboardNavigation();
    initModalFunctionality();
    initNewsletterForm();
    initCookieConsent();
    initCTATracking();
    initAccessibilityFeatures();
    initLeadGeneration();
    initFormCheckboxLogic();
    
    // Touch event support for mobile
    initTouchSupport();
    
    // Performance logging
    const loadTime = performance.now() - performanceStart;
    console.log(`APS Website initialized successfully in ${Math.round(loadTime)}ms`);
    
    // Track page load performance
    if (window.gtag && localStorage.getItem('analytics-consent') === 'true') {
      gtag('event', 'timing_complete', {
        name: 'page_load',
        value: Math.round(loadTime)
      });
    }
  } catch (error) {
    logError(error, 'Website initialization');
  }
});

// Event Delegation for Performance and Accessibility
function initEventDelegation() {
  try {
    // Delegate all click events
    document.addEventListener('click', function(e) {
      const target = e.target.closest('[data-action]');
      if (!target) return;
      
      const action = target.dataset.action;
      const context = target.dataset.context || 'unknown';
      
      switch (action) {
        case 'open-modal':
          e.preventDefault();
          openModal(target.dataset.modal);
          trackCTA('modal_open', context);
          break;
        case 'close-modal':
          e.preventDefault();
          closeModal();
          break;
        case 'cta-click':
          trackCTA(target.textContent.trim(), context);
          break;
      }
    });
    
    // Delegate form events
    document.addEventListener('change', function(e) {
      if (e.target.matches('select[name="service"]')) {
        trackServiceSelection(e.target.value);
      }
    });
    
    // Delegate focus events for accessibility
    document.addEventListener('focus', function(e) {
      if (e.target.matches('a, button, input, select, textarea')) {
        announceToScreenReader(`Focused on ${e.target.getAttribute('aria-label') || e.target.textContent || e.target.type}`);
      }
    }, true);
    
  } catch (error) {
    logError(error, 'Event delegation initialization');
  }
}

// Mobile menu functionality
function initMobileMenu() {
  try {
    const mobileMenuButton = document.querySelector('[data-mobile-menu-toggle]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    
    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        
        // Update ARIA attributes for accessibility
        const isExpanded = !mobileMenu.classList.contains('hidden');
        mobileMenuButton.setAttribute('aria-expanded', isExpanded);
      });
      
      // Close mobile menu when clicking outside
      document.addEventListener('click', function(e) {
        if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
          mobileMenu.classList.add('hidden');
          mobileMenuButton.setAttribute('aria-expanded', false);
        }
      });
    }
  } catch (error) {
    console.error('Error initializing mobile menu:', error);
  }
}

// Enhanced lazy loading with error handling
function initLazyLoading() {
  try {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const image = entry.target;
            
            // Add error handling for images
            image.addEventListener('error', function() {
              console.warn('Failed to load image:', this.src);
              // Fallback to placeholder
              this.src = 'https://via.placeholder.com/600x400?text=Image+Not+Available';
            });
            
            image.classList.add('loaded');
            observer.unobserve(image);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '50px'
      });
      
      lazyImages.forEach(image => imageObserver.observe(image));
    } else {
      // Fallback for older browsers
      lazyImages.forEach(image => image.classList.add('loaded'));
    }
  } catch (error) {
    console.error('Error initializing lazy loading:', error);
  }
}

// Smooth scrolling for internal links
function initSmoothScrolling() {
  try {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  } catch (error) {
    console.error('Error initializing smooth scrolling:', error);
  }
}

// Hero video initialization with error handling
function initHeroVideo() {
  try {
    const heroVideo = document.querySelector('.hero-video');
    
    if (heroVideo) {
      heroVideo.setAttribute('playsinline', 'true');
      
      heroVideo.addEventListener('error', function() {
        console.log('Hero video failed to load, falling back to gradient background');
        this.style.display = 'none';
      });
      
      // Pause video when page is not visible (performance optimization)
      document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
          heroVideo.pause();
        } else if (heroVideo.paused) {
          heroVideo.play().catch(e => console.log('Video play failed:', e));
        }
      });
    }
  } catch (error) {
    console.error('Error initializing hero video:', error);
  }
}

// Form validation with real-time feedback and sanitization
function initFormValidation() {
  try {
    const forms = document.querySelectorAll('form[name="contact"], form[name="careers"], form[name="newsletter"]');
    
    forms.forEach(form => {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Sanitize all form inputs before validation
        sanitizeFormInputs(this);
        
        if (validateForm(this)) {
          // Track form submission
          trackFormSubmit(this.name, {
            form_id: this.id || 'unknown',
            page_location: window.location.pathname
          });
          
          // Allow form submission to Netlify
          this.submit();
        }
      });
      
      // Real-time validation on input
      const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
      inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearError(input));
      });
    });
    
    // Email pattern validation
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
      input.addEventListener('blur', () => validateEmail(input));
    });
    
  } catch (error) {
    logError(error, 'Form validation initialization');
  }
}

// Sanitize all form inputs
function sanitizeFormInputs(form) {
  try {
    const textInputs = form.querySelectorAll('input[type="text"], input[type="email"], textarea');
    textInputs.forEach(input => {
      if (input.value) {
        input.value = sanitizeHTML(input.value.trim());
      }
    });
  } catch (error) {
    logError(error, 'Form input sanitization');
  }
}

// Validate individual field
function validateField(field) {
  try {
    const errorElement = document.getElementById(field.id + '-error');
    
    if (!field.checkValidity()) {
      if (errorElement) {
        errorElement.textContent = field.validationMessage;
        errorElement.classList.remove('hidden');
      }
      field.classList.add('border-red-500');
      return false;
    } else {
      if (errorElement) {
        errorElement.classList.add('hidden');
      }
      field.classList.remove('border-red-500');
      return true;
    }
  } catch (error) {
    console.error('Error validating field:', error);
    return false;
  }
}

// Validate email with regex
function validateEmail(input) {
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errorElement = document.getElementById(input.id + '-error');
    
    if (input.value && !emailRegex.test(input.value)) {
      if (errorElement) {
        errorElement.textContent = 'Please enter a valid email address';
        errorElement.classList.remove('hidden');
      }
      input.classList.add('border-red-500');
      return false;
    } else if (errorElement) {
      errorElement.classList.add('hidden');
      input.classList.remove('border-red-500');
    }
    return true;
  } catch (error) {
    console.error('Error validating email:', error);
    return false;
  }
}

// Clear error styling
function clearError(field) {
  try {
    const errorElement = document.getElementById(field.id + '-error');
    if (errorElement) {
      errorElement.classList.add('hidden');
    }
    field.classList.remove('border-red-500');
  } catch (error) {
    console.error('Error clearing field error:', error);
  }
}

// Validate entire form
function validateForm(form) {
  try {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
      if (!validateField(field)) {
        isValid = false;
      }
    });
    
    // Additional email validation
    const emailFields = form.querySelectorAll('input[type="email"]');
    emailFields.forEach(field => {
      if (!validateEmail(field)) {
        isValid = false;
      }
    });
    
    return isValid;
  } catch (error) {
    console.error('Error validating form:', error);
    return false;
  }
}

// Fade-in animations with Intersection Observer
function initFadeInAnimations() {
  try {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Skip animations for users who prefer reduced motion
      return;
    }
    
    const animatedElements = document.querySelectorAll('section, .fade-in');
    
    // Add initial opacity-0 class to elements that should animate
    animatedElements.forEach(element => {
      element.classList.add('opacity-0', 'transition-all', 'duration-700', 'ease-in-out');
    });
    
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0');
          entry.target.classList.add('opacity-100');
          animationObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });
    
    animatedElements.forEach(element => animationObserver.observe(element));
    
  } catch (error) {
    console.error('Error initializing fade-in animations:', error);
  }
}

// Enhanced keyboard navigation
function initKeyboardNavigation() {
  try {
    // Focus management for modals
    document.addEventListener('keydown', function(e) {
      // Close modals with Escape key
      if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal:not(.hidden)');
        if (openModal) {
          closeModal(openModal.id);
        }
      }
      
      // Improve tab navigation
      if (e.key === 'Tab') {
        const focusableElements = document.querySelectorAll(
          'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    });
    
    // Add visible focus indicators
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    focusableElements.forEach(element => {
      element.addEventListener('focus', function() {
        this.classList.add('ring-2', 'ring-medium-blue');
      });
      
      element.addEventListener('blur', function() {
        this.classList.remove('ring-2', 'ring-medium-blue');
      });
    });
    
  } catch (error) {
    console.error('Error initializing keyboard navigation:', error);
  }
}

// Modal functionality
function initModalFunctionality() {
  try {
    // Close modal when clicking backdrop
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('modal')) {
        closeModal(e.target.id);
      }
    });
  } catch (error) {
    console.error('Error initializing modal functionality:', error);
  }
}

// Open modal function
function openModal(modalId) {
  try {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
      
      // Focus first focusable element in modal
      const firstFocusable = modal.querySelector('button, input, textarea, select, a[href]');
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }
  } catch (error) {
    console.error('Error opening modal:', error);
  }
}

// Close modal function
function closeModal(modalId) {
  try {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = ''; // Restore scrolling
    }
  } catch (error) {
    console.error('Error closing modal:', error);
  }
}

// Newsletter form with localStorage consent
function initNewsletterForm() {
  try {
    const newsletterForm = document.getElementById('newsletter-form');
    const consentCheckbox = document.getElementById('newsletter-consent');
    
    if (newsletterForm && consentCheckbox) {
      // Load consent from localStorage
      const savedConsent = localStorage.getItem('newsletter-consent');
      if (savedConsent === 'true') {
        consentCheckbox.checked = true;
      }
      
      // Save consent to localStorage
      consentCheckbox.addEventListener('change', function() {
        localStorage.setItem('newsletter-consent', this.checked);
      });
      
      // Enhanced newsletter form validation
      newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        
        if (!consentCheckbox.checked) {
          alert('Please provide consent to receive email updates.');
          return;
        }
        
        if (validateEmail(emailInput)) {
          // Allow Netlify form submission
          this.submit();
        }
      });
    }
  } catch (error) {
    console.error('Error initializing newsletter form:', error);
  }
}

// Cookie consent management
function initCookieConsent() {
  try {
    // Check if consent already given
    if (localStorage.getItem('analytics-consent')) {
      return; // Already handled
    }
    
    // Create consent banner if not exists
    if (!document.getElementById('cookie-consent-banner')) {
      createConsentBanner();
    }
    
  } catch (error) {
    logError(error, 'Cookie consent initialization');
  }
}

function createConsentBanner() {
  const banner = document.createElement('div');
  banner.id = 'cookie-consent-banner';
  banner.className = 'fixed bottom-0 left-0 right-0 bg-navy text-white p-4 z-50 shadow-lg';
  banner.innerHTML = `
    <div class="container mx-auto flex flex-col sm:flex-row items-center justify-between">
      <div class="mb-4 sm:mb-0">
        <p class="text-sm">We use cookies and analytics to improve your experience and understand our website usage. 
        <a href="/privacy-policy" class="underline">Learn more</a></p>
      </div>
      <div class="flex gap-2">
        <button onclick="acceptCookies()" class="bg-medium-blue hover:bg-light-blue px-4 py-2 rounded text-sm font-semibold">
          Accept All
        </button>
        <button onclick="rejectCookies()" class="border border-white hover:bg-white hover:text-navy px-4 py-2 rounded text-sm font-semibold">
          Reject
        </button>
      </div>
    </div>
  `;
  
  document.body.appendChild(banner);
}

function acceptCookies() {
  localStorage.setItem('analytics-consent', 'true');
  localStorage.setItem('newsletter-consent', 'true');
  removeCookieBanner();
  initGA4(); // Initialize analytics after consent
  
  // Track consent given
  if (window.gtag) {
    gtag('event', 'consent_update', {
      analytics_storage: 'granted'
    });
  }
}

function rejectCookies() {
  localStorage.setItem('analytics-consent', 'false');
  localStorage.setItem('newsletter-consent', 'false');
  removeCookieBanner();
}

function removeCookieBanner() {
  const banner = document.getElementById('cookie-consent-banner');
  if (banner) {
    banner.remove();
  }
}

// Enhanced CTA tracking
function initCTATracking() {
  try {
    // Track all button clicks
    const ctaButtons = document.querySelectorAll('a[href*="contact"], button[onclick*="openModal"], a[href^="tel:"], a[href^="mailto:"]');
    
    ctaButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        const href = this.href || '';
        const text = this.textContent.trim();
        const section = this.closest('section')?.id || 'unknown';
        
        if (href.includes('contact')) {
          trackCTA('contact_page', section);
        } else if (href.startsWith('tel:')) {
          trackCTA('phone_call', section);
        } else if (href.startsWith('mailto:')) {
          trackCTA('email_click', section);
        } else if (this.onclick && this.onclick.toString().includes('openModal')) {
          trackCTA('modal_open', section);
        }
      });
    });
  } catch (error) {
    logError(error, 'CTA tracking initialization');
  }
}

// Enhanced Accessibility Features
function initAccessibilityFeatures() {
  try {
    // Skip to main content link
    createSkipLink();
    
    // Announce page changes to screen readers
    announcePageChange();
    
    // Enhanced keyboard navigation
    initEnhancedKeyboardNavigation();
    
    // Live regions for dynamic content
    createLiveRegions();
    
    // Focus management
    initFocusManagement();
    
  } catch (error) {
    logError(error, 'Accessibility features initialization');
  }
}

function createSkipLink() {
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.textContent = 'Skip to main content';
  skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-medium-blue text-white px-4 py-2 rounded z-50';
  skipLink.addEventListener('click', function(e) {
    e.preventDefault();
    const main = document.getElementById('main-content');
    if (main) {
      main.focus();
      main.scrollIntoView({ behavior: 'smooth' });
    }
  });
  document.body.insertBefore(skipLink, document.body.firstChild);
}

function announceToScreenReader(message) {
  const announcement = document.getElementById('screen-reader-announcements');
  if (announcement) {
    announcement.textContent = message;
    setTimeout(() => announcement.textContent = '', 1000);
  }
}

function announcePageChange() {
  const pageTitle = document.title;
  announceToScreenReader(`Page loaded: ${pageTitle}`);
}

function createLiveRegions() {
  // Create screen reader announcement region
  const announceRegion = document.createElement('div');
  announceRegion.id = 'screen-reader-announcements';
  announceRegion.setAttribute('aria-live', 'polite');
  announceRegion.setAttribute('aria-atomic', 'true');
  announceRegion.className = 'sr-only';
  document.body.appendChild(announceRegion);
  
  // Create form error region
  const errorRegion = document.createElement('div');
  errorRegion.id = 'form-errors';
  errorRegion.setAttribute('aria-live', 'polite');
  errorRegion.setAttribute('aria-atomic', 'true');
  errorRegion.className = 'sr-only';
  document.body.appendChild(errorRegion);
}

function initEnhancedKeyboardNavigation() {
  // Escape key handling
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      // Close any open modals
      const openModal = document.querySelector('.modal:not(.hidden)');
      if (openModal) {
        closeModal();
        return;
      }
      
      // Close mobile menu
      const mobileMenu = document.querySelector('[data-mobile-menu]');
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        document.querySelector('[data-mobile-menu-toggle]').setAttribute('aria-expanded', 'false');
      }
    }
  });
  
  // Arrow key navigation for menus
  document.addEventListener('keydown', function(e) {
    const activeElement = document.activeElement;
    if (activeElement.closest('[role="menubar"], [role="menu"]')) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        focusNextMenuItem(activeElement);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        focusPreviousMenuItem(activeElement);
      }
    }
  });
}

function focusNextMenuItem(current) {
  const menu = current.closest('[role="menubar"], [role="menu"]');
  const items = menu.querySelectorAll('[role="menuitem"]');
  const currentIndex = Array.from(items).indexOf(current);
  const nextIndex = (currentIndex + 1) % items.length;
  items[nextIndex].focus();
}

function focusPreviousMenuItem(current) {
  const menu = current.closest('[role="menubar"], [role="menu"]');
  const items = menu.querySelectorAll('[role="menuitem"]');
  const currentIndex = Array.from(items).indexOf(current);
  const prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
  items[prevIndex].focus();
}

function initFocusManagement() {
  // Store focus before modal opens
  let focusBeforeModal = null;
  
  document.addEventListener('modal:open', function() {
    focusBeforeModal = document.activeElement;
  });
  
  document.addEventListener('modal:close', function() {
    if (focusBeforeModal) {
      focusBeforeModal.focus();
      focusBeforeModal = null;
    }
  });
}

// Lead Generation Enhancements
function initLeadGeneration() {
  try {
    initServiceSelectionTracking();
    initCalendlyIntegration();
    initQualificationFields();
    initFormProgressTracking();
  } catch (error) {
    logError(error, 'Lead generation initialization');
  }
}

function initServiceSelectionTracking() {
  const serviceSelects = document.querySelectorAll('select[name="service"], select[name="interest"]');
  serviceSelects.forEach(select => {
    select.addEventListener('change', function() {
      trackServiceSelection(this.value, this.name);
    });
  });
}

function trackServiceSelection(service, fieldName = 'service') {
  if (window.gtag && localStorage.getItem('analytics-consent') === 'true') {
    gtag('event', 'select_service', {
      service_type: service,
      field_name: fieldName,
      page_location: window.location.pathname
    });
  }
  
  // Update lead scoring
  updateLeadScore('service_selection', service);
}

function initCalendlyIntegration() {
  // Check if we're on contact page
  if (window.location.pathname.includes('contact')) {
    loadCalendlyWidget();
  }
}

function loadCalendlyWidget() {
  // Create Calendly container if it doesn't exist
  let calendlyContainer = document.getElementById('calendly-container');
  if (!calendlyContainer) {
    calendlyContainer = document.createElement('div');
    calendlyContainer.id = 'calendly-container';
    calendlyContainer.className = 'mt-8';
    
    const contactForm = document.querySelector('form[name="contact"]');
    if (contactForm) {
      contactForm.parentNode.insertBefore(calendlyContainer, contactForm.nextSibling);
    }
  }
  
  // Create Calendly widget
  const calendlyWidget = document.createElement('div');
  calendlyWidget.className = 'calendly-inline-widget';
  calendlyWidget.setAttribute('data-url', 'https://calendly.com/aps-security/consult');
  calendlyWidget.style.minWidth = '320px';
  calendlyWidget.style.height = '630px';
  
  calendlyContainer.innerHTML = `
    <h3 class="text-2xl font-semibold mb-4">Schedule a Consultation</h3>
    <p class="mb-4">Prefer to speak directly? Schedule a consultation with our security experts.</p>
  `;
  calendlyContainer.appendChild(calendlyWidget);
  
  // Load Calendly script
  if (!document.querySelector('script[src*="calendly.com"]')) {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/js/embed.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log('Calendly widget loaded successfully');
      trackCTA('calendly_loaded', 'contact-page');
    };
    document.head.appendChild(script);
  }
}

function initQualificationFields() {
  // Add budget and timeline fields to contact forms only (not careers forms)
  const contactForms = document.querySelectorAll('form[name="contact"]');
  contactForms.forEach(form => {
    addQualificationFields(form);
  });
}

function addQualificationFields(form) {
  // Check if fields already exist
  if (form.querySelector('select[name="budget"]')) return;
  
  const budgetField = createSelectField('budget', 'Estimated Budget Range', [
    { value: '', text: 'Select budget range' },
    { value: 'under-10k', text: 'Under $10,000' },
    { value: '10k-25k', text: '$10,000 - $25,000' },
    { value: '25k-50k', text: '$25,000 - $50,000' },
    { value: '50k-100k', text: '$50,000 - $100,000' },
    { value: 'over-100k', text: 'Over $100,000' },
    { value: 'enterprise', text: 'Enterprise (Custom Quote)' }
  ]);
  
  const timelineField = createSelectField('timeline', 'Project Timeline', [
    { value: '', text: 'Select timeline' },
    { value: 'immediate', text: 'Immediate (Within 1 week)' },
    { value: '1-month', text: 'Within 1 month' },
    { value: '2-3-months', text: '2-3 months' },
    { value: '3-6-months', text: '3-6 months' },
    { value: '6-plus-months', text: '6+ months' },
    { value: 'planning', text: 'Planning phase' }
  ]);
  
  // Insert before submit button
  const submitButton = form.querySelector('button[type="submit"]');
  if (submitButton) {
    submitButton.parentNode.insertBefore(budgetField, submitButton);
    submitButton.parentNode.insertBefore(timelineField, submitButton);
  }
}

function createSelectField(name, label, options) {
  const container = document.createElement('div');
  container.className = 'mb-6';
  
  const labelEl = document.createElement('label');
  labelEl.setAttribute('for', name);
  labelEl.className = 'block text-sm font-medium text-dark-gray mb-2';
  labelEl.textContent = label;
  
  const select = document.createElement('select');
  select.name = name;
  select.id = name;
  select.className = 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-medium-blue focus:border-transparent';
  
  options.forEach(option => {
    const optionEl = document.createElement('option');
    optionEl.value = option.value;
    optionEl.textContent = option.text;
    select.appendChild(optionEl);
  });
  
  // Add change tracking
  select.addEventListener('change', function() {
    if (this.value) {
      updateLeadScore(name, this.value);
      trackServiceSelection(this.value, name);
    }
  });
  
  container.appendChild(labelEl);
  container.appendChild(select);
  
  return container;
}

function updateLeadScore(field, value) {
  // Simple lead scoring system
  let score = parseInt(localStorage.getItem('lead-score') || '0');
  
  switch (field) {
    case 'service_selection':
      score += 10;
      break;
    case 'budget':
      if (value.includes('100k') || value === 'enterprise') score += 25;
      else if (value.includes('50k')) score += 20;
      else if (value.includes('25k')) score += 15;
      else score += 10;
      break;
    case 'timeline':
      if (value === 'immediate') score += 20;
      else if (value === '1-month') score += 15;
      else score += 10;
      break;
  }
  
  localStorage.setItem('lead-score', score.toString());
  
  // Track high-value leads
  if (score >= 50 && window.gtag && localStorage.getItem('analytics-consent') === 'true') {
    gtag('event', 'high_value_lead', {
      lead_score: score,
      field_updated: field
    });
  }
}

function initFormProgressTracking() {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    const inputs = form.querySelectorAll('input, select, textarea');
    let completedFields = 0;
    
    inputs.forEach(input => {
      input.addEventListener('change', function() {
        const currentCompleted = Array.from(inputs).filter(inp => inp.value.trim() !== '').length;
        const progressPercent = Math.round((currentCompleted / inputs.length) * 100);
        
        if (currentCompleted > completedFields) {
          completedFields = currentCompleted;
          
          // Track significant progress milestones
          if (progressPercent >= 25 && progressPercent < 50) {
            trackFormProgress('25_percent', form.name);
          } else if (progressPercent >= 50 && progressPercent < 75) {
            trackFormProgress('50_percent', form.name);
          } else if (progressPercent >= 75) {
            trackFormProgress('75_percent', form.name);
          }
        }
      });
    });
  });
}

function trackFormProgress(milestone, formName) {
  if (window.gtag && localStorage.getItem('analytics-consent') === 'true') {
    gtag('event', 'form_progress', {
      form_name: formName,
      milestone: milestone,
      page_location: window.location.pathname
    });
  }
}

// Touch Support for Mobile
function initTouchSupport() {
  // Add touch-friendly classes
  document.documentElement.classList.add('touch-enabled');
  
  // Enhanced touch targets
  const touchTargets = document.querySelectorAll('button, a, input, select, textarea');
  touchTargets.forEach(target => {
    if (!target.classList.contains('touch-friendly')) {
      target.classList.add('touch-friendly');
    }
  });
  
  // Touch feedback
  document.addEventListener('touchstart', function(e) {
    if (e.target.matches('button, a, input[type="button"], input[type="submit"]')) {
      e.target.classList.add('touch-active');
    }
  });
  
  document.addEventListener('touchend', function(e) {
    if (e.target.matches('button, a, input[type="button"], input[type="submit"]')) {
      setTimeout(() => e.target.classList.remove('touch-active'), 150);
    }
  });
}

// Commercial Security Modal Functions
function openCommercialModal(modalId) {
  try {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      
      // Track modal open event
      if (window.gtag && localStorage.getItem('analytics-consent') === 'true') {
        gtag('event', 'view_service_details', {
          service_type: modalId.replace('Modal', ''),
          page_location: window.location.pathname
        });
      }
      
      // Focus first focusable element
      const firstFocusable = modal.querySelector('button, input, textarea, select, a[href]');
      if (firstFocusable) {
        setTimeout(() => firstFocusable.focus(), 100);
      }
    }
  } catch (error) {
    console.error('Error opening commercial modal:', error);
  }
}

function closeCommercialModal(modalId) {
  try {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  } catch (error) {
    console.error('Error closing commercial modal:', error);
  }
}

// Form checkbox logic for experience fields
function initFormCheckboxLogic() {
  try {
    // Experience checkboxes that need corresponding year inputs
    const experienceCheckboxes = [
      { checkbox: 'military-exp', years: 'military-years' },
      { checkbox: 'law-enforcement-exp', years: 'law-enforcement-years' },
      { checkbox: 'fire-ems-exp', years: 'fire-ems-years' },
      { checkbox: 'executive-protection-exp', years: 'executive-protection-years' }
    ];

    experienceCheckboxes.forEach(item => {
      const checkbox = document.getElementById(item.checkbox);
      const yearsInput = document.getElementById(item.years);
      
      if (checkbox && yearsInput) {
        checkbox.addEventListener('change', function() {
          if (this.checked) {
            yearsInput.style.display = 'block';
            yearsInput.required = true;
            yearsInput.setAttribute('aria-required', 'true');
            yearsInput.focus();
          } else {
            yearsInput.style.display = 'none';
            yearsInput.required = false;
            yearsInput.removeAttribute('aria-required');
            yearsInput.value = '';
            yearsInput.style.borderColor = ''; // Reset border color
          }
        });
        
        // Add validation on blur
        yearsInput.addEventListener('blur', function() {
          if (checkbox.checked && (!this.value || this.value < 1)) {
            this.style.borderColor = '#dc2626'; // Red border for invalid
          } else {
            this.style.borderColor = ''; // Reset border
          }
        });
      }
    });
    
    // Add form submission validation
    const form = document.getElementById('careers-form');
    if (form) {
      form.addEventListener('submit', function(e) {
        let isValid = true;
        
        experienceCheckboxes.forEach(item => {
          const checkbox = document.getElementById(item.checkbox);
          const yearsInput = document.getElementById(item.years);
          
          if (checkbox && yearsInput && checkbox.checked) {
            if (!yearsInput.value || yearsInput.value < 1) {
              isValid = false;
              yearsInput.style.borderColor = '#dc2626';
              yearsInput.focus();
            }
          }
        });
        
        if (!isValid) {
          e.preventDefault();
          alert('Please enter the number of years for all selected experience categories.');
        }
      });
    }
    
    console.log('Form checkbox logic initialized');
  } catch (error) {
    logError(error, 'Form checkbox logic initialization');
  }
}

// Make functions globally available for onclick handlers
window.openModal = openModal;
window.closeModal = closeModal;
window.openCommercialModal = openCommercialModal;
window.closeCommercialModal = closeCommercialModal;
window.acceptCookies = acceptCookies;
window.rejectCookies = rejectCookies;
window.trackCTA = trackCTA;
window.announceToScreenReader = announceToScreenReader;