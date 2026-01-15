'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    {
      href: '/services',
      label: 'Services',
      submenu: [
        { href: '/services#government', label: 'Government Security' },
        { href: '/services#commercial', label: 'Commercial Security' },
        { href: '/services#armed', label: 'Armed Guards' },
        { href: '/services#unarmed', label: 'Unarmed Guards' },
        { href: '/services#patrol', label: 'Patrol Services' },
        { href: '/services#firewatch', label: 'Firewatch' },
        { href: '/services#monitoring', label: 'Remote Monitoring' },
      ],
    },
    { href: '/training-careers', label: 'Training & Careers' },
    { href: '/news', label: 'News' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-navy shadow-medium'
          : 'bg-navy/95 backdrop-blur-sm'
      }`}
      role="banner"
    >
      <nav className="container mx-auto px-4 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-navy rounded"
            aria-label="America Protective Security Home"
          >
            <Image
              src="/images/logo.png"
              alt="America Protective Security Logo"
              width={50}
              height={50}
              className="h-12 w-auto"
              priority
            />
            <span className="text-white font-heading font-bold text-xl lg:text-2xl">
              APS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              if (link.submenu) {
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <button
                      className="text-white hover:text-light-gray transition-colors duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-navy rounded px-2 py-1"
                      aria-expanded={isServicesOpen}
                      aria-haspopup="true"
                    >
                      {link.label}
                      <span className="ml-1">▼</span>
                    </button>
                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-64 bg-white shadow-medium rounded-lg py-2"
                          role="menu"
                        >
                          {link.submenu.map((subLink) => (
                            <Link
                              key={subLink.href}
                              href={subLink.href}
                              className="block px-4 py-2 text-navy hover:bg-light-gray hover:text-medium-blue transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-navy rounded mx-2"
                              role="menuitem"
                            >
                              {subLink.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white hover:text-light-gray transition-colors duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-navy rounded px-2 py-1"
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="bg-medium-blue text-white px-6 py-2 rounded-lg font-semibold hover:bg-navy transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-medium-blue focus:ring-offset-2 focus:ring-offset-navy"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-navy rounded p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-navy z-40 lg:hidden pt-20"
          >
            <nav className="container mx-auto px-4 py-8" aria-label="Mobile navigation">
              <div className="flex flex-col space-y-6">
                {navLinks.map((link) => {
                  if (link.submenu) {
                    return (
                      <div key={link.href}>
                        <button
                          className="text-white text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-white rounded px-2 py-1"
                          onClick={() => setIsServicesOpen(!isServicesOpen)}
                          aria-expanded={isServicesOpen}
                        >
                          {link.label} {isServicesOpen ? '▲' : '▼'}
                        </button>
                        {isServicesOpen && (
                          <div className="mt-2 ml-4 space-y-3">
                            {link.submenu.map((subLink) => (
                              <Link
                                key={subLink.href}
                                href={subLink.href}
                                className="block text-white/80 hover:text-light-gray transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white rounded px-2 py-1"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {subLink.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-white text-xl font-semibold hover:text-light-gray transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white rounded px-2 py-1"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <Link
                  href="/contact"
                  className="bg-medium-blue text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-navy transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-medium-blue mt-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
