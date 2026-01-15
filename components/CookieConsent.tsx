'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
    // Initialize Google Analytics here if needed
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 bg-navy text-white p-6 shadow-medium z-50"
          role="dialog"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-description"
        >
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-1">
                <h3 id="cookie-consent-title" className="font-heading font-bold text-lg mb-2">
                  Cookie Consent
                </h3>
                <p id="cookie-consent-description" className="text-white/80 text-sm">
                  We use cookies to enhance your browsing experience and analyze site traffic.
                  By clicking &quot;Accept&quot;, you consent to our use of cookies.
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleDecline}
                  className="px-6 py-2 border border-white/30 rounded-lg hover:bg-white/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-navy"
                  aria-label="Decline cookies"
                >
                  Decline
                </button>
                <button
                  onClick={handleAccept}
                  className="px-6 py-2 bg-medium-blue rounded-lg hover:bg-navy transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-medium-blue focus:ring-offset-2 focus:ring-offset-navy"
                  aria-label="Accept cookies"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
