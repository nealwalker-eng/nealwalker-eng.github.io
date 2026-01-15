import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import TwoColumnSection from '@/components/TwoColumnSection';
import ServiceCard from '@/components/ServiceCard';
import ClientLogo from '@/components/ClientLogo';
import CTASection from '@/components/CTASection';
import FadeIn from '@/components/FadeIn';

export const metadata: Metadata = {
  title: 'America Protective Security | Expert Security Services in MD, DC, VA',
  description: 'Professional security services for government and commercial clients. 20+ years of experience providing armed and unarmed guards, patrol services, firewatch, and remote monitoring in Maryland, DC, and Virginia.',
  keywords: [
    'security services',
    'armed guards',
    'unarmed guards',
    'patrol services',
    'firewatch',
    'remote monitoring',
    'Maryland security',
    'DC security',
    'Virginia security',
    'government security',
    'commercial security',
    'America Protective Security',
    'APS',
    'FPS',
    'DHS',
    '41 CFR Part 102-74',
  ],
};

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Delivering Exceptional Security Solutions"
        subtitle="for Government and Commercial Needs"
        ctaText="Request a Consultation"
        ctaLink="/contact"
        videoSrc="/images/World video Hero.mp4"
        posterSrc="/images/usa flag hero.jpg"
      />

      {/* Who We Are */}
      <TwoColumnSection
        imageSrc="/images/who we are.jpg"
        imageAlt="America Protective Security team"
        title="Who We Are"
        content={
          <>
            <p className="mb-4">
              America Protective Security (APS) is a trusted leader in professional security services,
              with over 20 years of experience protecting government facilities and commercial properties
              across Maryland, Washington DC, and Virginia.
            </p>
            <p className="mb-4">
              As a small business government contractor, we specialize in delivering comprehensive
              security solutions that meet the highest standards of federal compliance, including
              FPS (Federal Protective Service) and DHS (Department of Homeland Security) requirements.
            </p>
            <p className="mb-4">
              Our mission is to provide exceptional security services that protect people, property,
              and assets while maintaining the highest levels of professionalism, integrity, and
              compliance with all applicable regulations, including 18 U.S.C. §111 and 41 CFR Part 102-74.
            </p>
            <p>
              <strong>Core Values:</strong> Integrity, Innovation, Compliance, and Excellence in every
              assignment we undertake.
            </p>
          </>
        }
      />

      {/* Services Overview */}
      <section className="py-16 lg:py-24 bg-light-gray">
        <div className="container mx-auto px-4 lg:px-8">
          <FadeIn>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-navy text-center mb-4">
              Our Services
            </h2>
            <p className="text-dark-gray text-center text-lg mb-12 max-w-3xl mx-auto">
              Comprehensive security solutions tailored to meet your specific needs, with full
              compliance to federal regulations including 41 CFR Part 102-74.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              title="Armed Guards"
              description="Licensed, trained, and certified armed security professionals providing 24/7 protection for high-risk facilities and government properties."
              href="/services#armed"
              delay={0.1}
            />
            <ServiceCard
              title="Unarmed Guards"
              description="Professional unarmed security officers trained in access control, surveillance, and emergency response protocols."
              href="/services#unarmed"
              delay={0.2}
            />
            <ServiceCard
              title="Patrol Services"
              description="Mobile and static patrol services ensuring comprehensive coverage of your property with regular security checks and rapid response capabilities."
              href="/services#patrol"
              delay={0.3}
            />
            <ServiceCard
              title="Firewatch"
              description="Specialized firewatch services for construction sites, facilities with fire system maintenance, and high-risk fire zones."
              href="/services#firewatch"
              delay={0.4}
            />
            <ServiceCard
              title="Remote Monitoring"
              description="Advanced remote monitoring solutions leveraging cutting-edge technology to provide real-time security oversight and rapid incident response."
              href="/services#monitoring"
              delay={0.5}
            />
            <ServiceCard
              title="Event Security"
              description="Professional event security services for corporate gatherings, public events, and special occasions with crowd management expertise."
              href="/services"
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Client Success */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <FadeIn>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-navy text-center mb-4">
              Trusted by Leading Organizations
            </h2>
            <p className="text-dark-gray text-center text-lg mb-12 max-w-3xl mx-auto">
              We&apos;re proud to serve government agencies and commercial clients who trust us
              with their security needs.
            </p>
          </FadeIn>

          {/* Client Logos */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
            <ClientLogo
              src="/images/SSA Gov Client.jpg"
              alt="Social Security Administration"
              delay={0.1}
            />
            <ClientLogo
              src="/images/Whiting-Turner-new logo.png"
              alt="Whiting-Turner"
              delay={0.2}
            />
            <ClientLogo
              src="/images/centronia client.png"
              alt="Centronia"
              delay={0.3}
            />
            <ClientLogo
              src="/images/thorlabs client.png"
              alt="Thorlabs"
              delay={0.4}
            />
            <ClientLogo
              src="/images/the hampton center new client logo.avif"
              alt="The Hampton Center"
              delay={0.5}
            />
            <ClientLogo
              src="/images/Wellborn Client.avif"
              alt="Wellborn"
              delay={0.6}
            />
          </div>

          {/* Testimonials */}
          <FadeIn delay={0.7}>
            <div className="max-w-4xl mx-auto">
              <blockquote className="text-center">
                <p className="text-dark-gray text-xl md:text-2xl italic mb-4">
                  &quot;America Protective Security has provided exceptional service for our federal
                  facility. Their team is professional, reliable, and always compliant with all
                  federal security requirements.&quot;
                </p>
                <footer className="text-navy font-semibold">
                  — Federal Agency Client
                </footer>
              </blockquote>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 lg:py-24 bg-light-gray">
        <div className="container mx-auto px-4 lg:px-8">
          <FadeIn>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-navy text-center mb-12">
              Service Areas
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn delay={0.1}>
              <div className="bg-white rounded-lg p-8 shadow-soft text-center">
                <div className="mb-4">
                  <img
                    src="/images/MD Flag.png"
                    alt="Maryland Flag"
                    className="h-16 mx-auto"
                  />
                </div>
                <h3 className="font-heading font-bold text-2xl text-navy mb-4">Maryland</h3>
                <p className="text-dark-gray mb-4">
                  Licensed and certified security services throughout Maryland.
                </p>
                <p className="text-navy font-semibold">License: MD 106-4499</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-white rounded-lg p-8 shadow-soft text-center">
                <div className="mb-4">
                  <img
                    src="/images/DC Flag.png"
                    alt="Washington DC Flag"
                    className="h-16 mx-auto"
                  />
                </div>
                <h3 className="font-heading font-bold text-2xl text-navy mb-4">Washington DC</h3>
                <p className="text-dark-gray mb-4">
                  Professional security services for federal facilities and commercial properties in the nation&apos;s capital.
                </p>
                <p className="text-navy font-semibold">License: DC SAB3178</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="bg-white rounded-lg p-8 shadow-soft text-center">
                <div className="mb-4">
                  <img
                    src="/images/VA Flag.png"
                    alt="Virginia Flag"
                    className="h-16 mx-auto"
                  />
                </div>
                <h3 className="font-heading font-bold text-2xl text-navy mb-4">Virginia</h3>
                <p className="text-dark-gray mb-4">
                  Comprehensive security solutions across Virginia with full state licensing compliance.
                </p>
                <p className="text-navy font-semibold">License: VA 11-4726</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Secure Your Property?"
        description="Contact us today for a consultation and learn how America Protective Security can protect what matters most to you."
        ctaText="Get Started"
        ctaLink="/contact"
      />
    </>
  );
}
