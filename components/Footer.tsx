import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services' },
    { href: '/training-careers', label: 'Training & Careers' },
    { href: '/news', label: 'News' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <footer className="bg-navy text-white" role="contentinfo">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-xl mb-4">Quick Links</h3>
            <ul className="space-y-2" role="list">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-light-gray transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-light-gray rounded px-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-heading font-bold text-xl mb-4">Contact Us</h3>
            <address className="not-italic space-y-2 text-white/80">
              <p>
                <strong className="text-white">Phone:</strong>{' '}
                <a
                  href="tel:301-434-2220"
                  className="hover:text-light-gray transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-light-gray rounded px-1"
                >
                  301-434-2220
                </a>
              </p>
              <p>
                <strong className="text-white">Address:</strong>
                <br />
                10304 New Hampshire Ave
                <br />
                Silver Spring, MD 20903
              </p>
            </address>
          </div>

          {/* Licenses */}
          <div>
            <h3 className="font-heading font-bold text-xl mb-4">Licenses</h3>
            <ul className="space-y-2 text-white/80" role="list">
              <li>
                <strong className="text-white">Maryland:</strong> 106-4499
              </li>
              <li>
                <strong className="text-white">Washington DC:</strong> SAB3178
              </li>
              <li>
                <strong className="text-white">Virginia:</strong> 11-4726
              </li>
            </ul>
            <div className="mt-4">
              <Image
                src="/images/sdvosb.png"
                alt="SDVOSB Certified"
                width={100}
                height={50}
                className="h-auto w-24"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3">
            <Image
              src="/images/logo.png"
              alt="America Protective Security Logo"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <span className="font-heading font-bold text-lg">
              America Protective Security
            </span>
          </div>
          <p className="text-white/60 text-sm">
            © {currentYear} America Protective Security. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
