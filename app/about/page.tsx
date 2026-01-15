import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import TwoColumnSection from '@/components/TwoColumnSection';
import CTASection from '@/components/CTASection';
import FadeIn from '@/components/FadeIn';

export const metadata: Metadata = {
  title: 'About America Protective Security',
  description: 'Learn about America Protective Security - 20+ years of experience providing professional security services to government and commercial clients in MD, DC, and VA.',
};

export default function About() {
  return (
    <>
      <HeroSection
        title="About America Protective Security – Your Trusted Partner in Protection"
        subtitle="Two decades of excellence in security services"
        ctaText="View Our Services"
        ctaLink="/services"
        backgroundImage="/images/fed building.jpg"
      />

      {/* Company History & Mission */}
      <TwoColumnSection
        imageSrc="/images/fed building 2.jpg"
        imageAlt="Federal building security"
        title="Company History & Mission"
        content={
          <>
            <p className="mb-4">
              Founded over 20 years ago, America Protective Security has established itself as a
              premier provider of professional security services in the Mid-Atlantic region. As a
              small business government contractor, we have built our reputation on delivering
              exceptional security solutions that meet the rigorous standards required for federal
              and commercial clients.
            </p>
            <p className="mb-4">
              Our journey began with a simple mission: to provide world-class security services
              that protect people, property, and assets while maintaining the highest levels of
              professionalism and compliance. Today, we serve numerous government agencies and
              commercial organizations across Maryland, Washington DC, and Virginia.
            </p>
            <p className="mb-4">
              <strong>Our Mission:</strong> To deliver exceptional security services through
              innovation, integrity, and unwavering commitment to excellence, ensuring the safety
              and security of our clients&apos; most valuable assets.
            </p>
            <p>
              <strong>Our Vision:</strong> To be the most trusted and respected security services
              provider in the Mid-Atlantic region, recognized for our expertise, reliability, and
              commitment to client success.
            </p>
          </>
        }
      />

      {/* Core Values */}
      <section className="py-16 lg:py-24 bg-light-gray">
        <div className="container mx-auto px-4 lg:px-8">
          <FadeIn>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-navy text-center mb-12">
              Our Core Values
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn delay={0.1}>
              <div className="bg-white rounded-lg p-8 shadow-soft text-center">
                <div className="text-5xl mb-4">🛡️</div>
                <h3 className="font-heading font-bold text-2xl text-navy mb-4">Integrity</h3>
                <p className="text-dark-gray">
                  We conduct all business with the highest ethical standards, ensuring transparency,
                  honesty, and accountability in every interaction.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-white rounded-lg p-8 shadow-soft text-center">
                <div className="text-5xl mb-4">🚀</div>
                <h3 className="font-heading font-bold text-2xl text-navy mb-4">Innovation</h3>
                <p className="text-dark-gray">
                  We leverage advanced protocols and cutting-edge technology to deliver security
                  solutions that exceed expectations and adapt to evolving threats.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="bg-white rounded-lg p-8 shadow-soft text-center">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="font-heading font-bold text-2xl text-navy mb-4">Compliance</h3>
                <p className="text-dark-gray">
                  We maintain strict adherence to all federal, state, and local regulations,
                  including FPS, DHS, and jurisdictional guidelines, ensuring full compliance
                  at all times.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <FadeIn>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-navy text-center mb-12">
              What Sets Us Apart
            </h2>
          </FadeIn>

          <div className="max-w-4xl mx-auto space-y-6">
            <FadeIn delay={0.1}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-medium-blue rounded-full flex items-center justify-center text-white font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl text-navy mb-2">
                    Federal Compliance Expertise
                  </h3>
                  <p className="text-dark-gray">
                    Full compliance with FPS, DHS, and all federal security requirements,
                    including 18 U.S.C. §111 and 41 CFR Part 102-74.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-medium-blue rounded-full flex items-center justify-center text-white font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl text-navy mb-2">
                    Multi-State Licensing
                  </h3>
                  <p className="text-dark-gray">
                    Licensed in Maryland (106-4499), Washington DC (SAB3178), and Virginia (11-4726),
                    ensuring seamless service across the Mid-Atlantic region.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-medium-blue rounded-full flex items-center justify-center text-white font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl text-navy mb-2">
                    Small Business Advantage
                  </h3>
                  <p className="text-dark-gray">
                    As a small business government contractor, we provide personalized service,
                    rapid response, and flexible solutions tailored to your specific needs.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-medium-blue rounded-full flex items-center justify-center text-white font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl text-navy mb-2">
                    20+ Years of Experience
                  </h3>
                  <p className="text-dark-gray">
                    Two decades of proven expertise in protecting government facilities and
                    commercial properties, with a track record of excellence and reliability.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Join Our Team"
        description="Explore career opportunities and training programs with America Protective Security."
        ctaText="View Training & Careers"
        ctaLink="/training-careers"
      />
    </>
  );
}
