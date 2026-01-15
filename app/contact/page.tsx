import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import ContactForm from '@/components/ContactForm';
import FadeIn from '@/components/FadeIn';

export const metadata: Metadata = {
  title: 'Contact Us | America Protective Security',
  description: 'Get in touch with America Protective Security for professional security services. Contact us for consultations, quotes, and inquiries.',
};

export default function Contact() {
  return (
    <>
      <HeroSection
        title="Get in Touch for Secure Solutions"
        subtitle="Contact America Protective Security to discuss your security needs"
        backgroundImage="/images/guard car.jpeg"
      />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <FadeIn>
              <div>
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-navy mb-6">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-heading font-semibold text-xl text-navy mb-2">
                      Phone
                    </h3>
                    <a
                      href="tel:301-434-2220"
                      className="text-dark-gray hover:text-navy transition-colors duration-200 text-lg"
                    >
                      301-434-2220
                    </a>
                  </div>

                  <div>
                    <h3 className="font-heading font-semibold text-xl text-navy mb-2">
                      Address
                    </h3>
                    <address className="text-dark-gray not-italic text-lg">
                      10304 New Hampshire Ave
                      <br />
                      Silver Spring, MD 20903
                    </address>
                  </div>

                  <div>
                    <h3 className="font-heading font-semibold text-xl text-navy mb-4">
                      Licenses
                    </h3>
                    <ul className="space-y-2 text-dark-gray">
                      <li>
                        <strong>Maryland:</strong> 106-4499
                      </li>
                      <li>
                        <strong>Washington DC:</strong> SAB3178
                      </li>
                      <li>
                        <strong>Virginia:</strong> 11-4726
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-heading font-semibold text-xl text-navy mb-4">
                      Business Hours
                    </h3>
                    <p className="text-dark-gray">
                      Monday - Friday: 8:00 AM - 6:00 PM
                      <br />
                      Saturday: 9:00 AM - 2:00 PM
                      <br />
                      Sunday: Closed
                      <br />
                      <span className="text-navy font-semibold">
                        24/7 Emergency Services Available
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Contact Form */}
            <FadeIn delay={0.2}>
              <div className="bg-white rounded-lg p-8 shadow-medium">
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-navy mb-6">
                  Send Us a Message
                </h2>
                <ContactForm />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Calendly Widget */}
      <section className="py-16 lg:py-24 bg-light-gray">
        <div className="container mx-auto px-4 lg:px-8">
          <FadeIn>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-navy text-center mb-4">
              Schedule a Consultation
            </h2>
            <p className="text-dark-gray text-center text-lg mb-12 max-w-3xl mx-auto">
              Book a time to discuss your security needs with our team
            </p>
          </FadeIn>

          <div className="max-w-4xl mx-auto">
            <FadeIn delay={0.2}>
              <div className="bg-white rounded-lg p-8 shadow-medium">
                <div
                  className="calendly-inline-widget"
                  data-url="https://calendly.com/your-calendly-url"
                  style={{ minWidth: '320px', height: '700px' }}
                />
                <script
                  type="text/javascript"
                  src="https://assets.calendly.com/assets/external/widget.js"
                  async
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <FadeIn>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-navy text-center mb-12">
              Service Areas
            </h2>
          </FadeIn>

          <div className="max-w-6xl mx-auto">
            <FadeIn delay={0.2}>
              <div className="bg-light-gray rounded-lg p-8 shadow-soft">
                <div className="aspect-video w-full rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3101.234567890123!2d-77.01234567890123!3d39.01234567890123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDAwJzQ0LjQiTiA3N8KwMDAnNDQuNCJX!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="America Protective Security Location"
                  />
                </div>
                <p className="text-dark-gray text-center mt-4">
                  Serving Maryland, Washington DC, and Virginia
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
