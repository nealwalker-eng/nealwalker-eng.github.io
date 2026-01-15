import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import TwoColumnSection from '@/components/TwoColumnSection';
import ServiceCard from '@/components/ServiceCard';
import CTASection from '@/components/CTASection';
import ContactForm from '@/components/ContactForm';
import FadeIn from '@/components/FadeIn';

export const metadata: Metadata = {
  title: 'Security Services | America Protective Security',
  description: 'Comprehensive security solutions including armed and unarmed guards, patrol services, firewatch, and remote monitoring for government and commercial clients.',
};

export default function Services() {
  return (
    <>
      <HeroSection
        title="Comprehensive Security Solutions Tailored for You"
        subtitle="Professional security services meeting the highest standards of federal compliance and commercial excellence"
        ctaText="Request a Quote"
        ctaLink="#contact-form"
        backgroundImage="/images/guard stock.jpg"
      />

      {/* Overview */}
      <TwoColumnSection
        imageSrc="/images/fed building.jpg"
        imageAlt="Security services"
        title="Our Security Services"
        content={
          <>
            <p className="mb-4">
              America Protective Security delivers comprehensive security solutions designed to meet
              the unique needs of government agencies and commercial organizations. Our services are
              fully compliant with federal regulations, including FPS, DHS, and jurisdictional
              guidelines.
            </p>
            <p className="mb-4">
              We leverage advanced protocols and cutting-edge technology to provide security
              services that protect people, property, and assets while maintaining the highest
              levels of professionalism and compliance.
            </p>
            <p>
              Whether you need armed guards for high-risk facilities, unarmed officers for access
              control, patrol services for comprehensive coverage, firewatch for construction sites,
              or remote monitoring for real-time oversight, we have the expertise and resources to
              meet your security needs.
            </p>
          </>
        }
      />

      {/* Government vs Commercial Tabs */}
      <section className="py-16 lg:py-24 bg-light-gray">
        <div className="container mx-auto px-4 lg:px-8">
          <FadeIn>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-navy text-center mb-12">
              Government & Commercial Security
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <FadeIn delay={0.1}>
              <div className="bg-white rounded-lg p-8 shadow-soft" id="government">
                <h3 className="font-heading font-bold text-2xl text-navy mb-4">
                  Government Security
                </h3>
                <p className="text-dark-gray mb-4">
                  Specialized security services for federal facilities, meeting all FPS and DHS
                  requirements. Our team is trained in federal security protocols and jurisdictional
                  guidelines.
                </p>
                <ul className="space-y-2 text-dark-gray">
                  <li className="flex items-start gap-2">
                    <span className="text-medium-blue font-bold">•</span>
                    <span>Federal Protective Service (FPS) compliance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-medium-blue font-bold">•</span>
                    <span>Department of Homeland Security (DHS) protocols</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-medium-blue font-bold">•</span>
                    <span>18 U.S.C. §111 compliance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-medium-blue font-bold">•</span>
                    <span>41 CFR Part 102-74 adherence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-medium-blue font-bold">•</span>
                    <span>Jurisdictional security guidelines</span>
                  </li>
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-white rounded-lg p-8 shadow-soft" id="commercial">
                <h3 className="font-heading font-bold text-2xl text-navy mb-4">
                  Commercial Security
                </h3>
                <p className="text-dark-gray mb-4">
                  Comprehensive security solutions for corporate facilities, healthcare facilities,
                  transportation hubs, and commercial properties. Customized risk assessments and
                  security protocols.
                </p>
                <ul className="space-y-2 text-dark-gray">
                  <li className="flex items-start gap-2">
                    <span className="text-medium-blue font-bold">•</span>
                    <span>Corporate facility protection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-medium-blue font-bold">•</span>
                    <span>Healthcare facility security</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-medium-blue font-bold">•</span>
                    <span>Transportation hub security</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-medium-blue font-bold">•</span>
                    <span>Customized risk assessments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-medium-blue font-bold">•</span>
                    <span>24/7 monitoring and response</span>
                  </li>
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Specific Services */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <FadeIn>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-navy text-center mb-4">
              Specific Services
            </h2>
            <p className="text-dark-gray text-center text-lg mb-12 max-w-3xl mx-auto">
              Detailed security services tailored to your specific needs
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              title="Armed Guards"
              description="Licensed, trained, and certified armed security professionals providing 24/7 protection. Full licensing compliance and continuous training ensure the highest level of security for high-risk facilities."
              href="#armed"
              delay={0.1}
            />
            <ServiceCard
              title="Unarmed Guards"
              description="Professional unarmed security officers trained in access control, surveillance, and emergency response. Ideal for facilities requiring visible security presence without armed personnel."
              href="#unarmed"
              delay={0.2}
            />
            <ServiceCard
              title="Patrol Services"
              description="Mobile and static patrol services ensuring comprehensive coverage. Regular security checks, rapid response capabilities, and detailed reporting for complete property protection."
              href="#patrol"
              delay={0.3}
            />
            <ServiceCard
              title="Firewatch"
              description="Specialized firewatch services for construction sites, facilities with fire system maintenance, and high-risk fire zones. Trained personnel monitoring for fire hazards 24/7."
              href="#firewatch"
              delay={0.4}
            />
            <ServiceCard
              title="Remote Monitoring"
              description="Advanced remote monitoring solutions leveraging cutting-edge technology. Real-time security oversight, rapid incident response, and comprehensive reporting capabilities."
              href="#monitoring"
              delay={0.5}
            />
            <ServiceCard
              title="Event Security"
              description="Professional event security services for corporate gatherings, public events, and special occasions. Crowd management, access control, and emergency response expertise."
              href="#events"
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Service Inquiry Form */}
      <section id="contact-form" className="py-16 lg:py-24 bg-light-gray">
        <div className="container mx-auto px-4 lg:px-8">
          <FadeIn>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-navy text-center mb-4">
              Request a Service Quote
            </h2>
            <p className="text-dark-gray text-center text-lg mb-12 max-w-3xl mx-auto">
              Fill out the form below and our team will contact you to discuss your security needs
            </p>
          </FadeIn>

          <div className="max-w-2xl mx-auto">
            <FadeIn delay={0.2}>
              <div className="bg-white rounded-lg p-8 shadow-medium">
                <ContactForm />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to Secure Your Property?"
        description="Contact us today to discuss your security needs and learn how we can protect what matters most."
        ctaText="Get Started"
        ctaLink="/contact"
      />
    </>
  );
}
