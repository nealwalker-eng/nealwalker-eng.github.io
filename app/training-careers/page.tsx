import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import TwoColumnSection from '@/components/TwoColumnSection';
import CareerApplicationForm from '@/components/CareerApplicationForm';
import CTASection from '@/components/CTASection';
import FadeIn from '@/components/FadeIn';

export const metadata: Metadata = {
  title: 'Training & Careers | America Protective Security',
  description: 'Build your future in security with America Protective Security. Explore training programs, certifications, and career opportunities.',
};

export default function TrainingCareers() {
  return (
    <>
      <HeroSection
        title="Build Your Future in Security"
        subtitle="Join America Protective Security and advance your career in professional security services"
        ctaText="View Open Positions"
        ctaLink="#careers"
        backgroundImage="/images/new careers hero.jpg"
      />

      {/* Training Programs */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <FadeIn>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-navy text-center mb-12">
              Training Programs
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <FadeIn delay={0.1}>
              <div className="bg-white rounded-lg p-8 shadow-soft">
                <h3 className="font-heading font-bold text-2xl text-navy mb-4">
                  Security Guard Certification
                </h3>
                <p className="text-dark-gray mb-4">
                  Comprehensive training program covering all aspects of professional security
                  services, including access control, surveillance, emergency response, and
                  report writing.
                </p>
                <ul className="space-y-2 text-dark-gray">
                  <li className="flex items-start gap-2">
                    <span className="text-medium-blue font-bold">✓</span>
                    <span>State licensing requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-medium-blue font-bold">✓</span>
                    <span>Federal compliance training</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-medium-blue font-bold">✓</span>
                    <span>Emergency response protocols</span>
                  </li>
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-white rounded-lg p-8 shadow-soft">
                <h3 className="font-heading font-bold text-2xl text-navy mb-4">
                  Armed Security Training
                </h3>
                <p className="text-dark-gray mb-4">
                  Specialized training for armed security personnel, including firearms proficiency,
                  use of force protocols, and federal security requirements.
                </p>
                <ul className="space-y-2 text-dark-gray">
                  <li className="flex items-start gap-2">
                    <span className="text-medium-blue font-bold">✓</span>
                    <span>Firearms training and certification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-medium-blue font-bold">✓</span>
                    <span>Use of force training</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-medium-blue font-bold">✓</span>
                    <span>Federal security protocols</span>
                  </li>
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="bg-white rounded-lg p-8 shadow-soft">
                <h3 className="font-heading font-bold text-2xl text-navy mb-4">
                  Federal Security Courses
                </h3>
                <p className="text-dark-gray mb-4">
                  Advanced training in federal security requirements, including FPS, DHS, and
                  jurisdictional guidelines for government facility protection.
                </p>
                <ul className="space-y-2 text-dark-gray">
                  <li className="flex items-start gap-2">
                    <span className="text-medium-blue font-bold">✓</span>
                    <span>FPS compliance training</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-medium-blue font-bold">✓</span>
                    <span>DHS security protocols</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-medium-blue font-bold">✓</span>
                    <span>Jurisdictional guidelines</span>
                  </li>
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="bg-white rounded-lg p-8 shadow-soft">
                <h3 className="font-heading font-bold text-2xl text-navy mb-4">
                  Continuing Education
                </h3>
                <p className="text-dark-gray mb-4">
                  Ongoing training and professional development opportunities to keep our team
                  current with the latest security protocols and best practices.
                </p>
                <ul className="space-y-2 text-dark-gray">
                  <li className="flex items-start gap-2">
                    <span className="text-medium-blue font-bold">✓</span>
                    <span>Regular training updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-medium-blue font-bold">✓</span>
                    <span>Professional development</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-medium-blue font-bold">✓</span>
                    <span>Certification renewals</span>
                  </li>
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Careers */}
      <section id="careers" className="py-16 lg:py-24 bg-light-gray">
        <div className="container mx-auto px-4 lg:px-8">
          <FadeIn>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-navy text-center mb-4">
              Career Opportunities
            </h2>
            <p className="text-dark-gray text-center text-lg mb-12 max-w-3xl mx-auto">
              Join our team of professional security experts and build a rewarding career
              protecting what matters most.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <FadeIn delay={0.1}>
              <div className="bg-white rounded-lg p-8 shadow-soft">
                <h3 className="font-heading font-bold text-2xl text-navy mb-4">
                  Armed Security Guard
                </h3>
                <p className="text-dark-gray mb-4">
                  Licensed armed security professionals needed for federal and commercial facilities.
                  Must have valid state license and firearms certification.
                </p>
                <ul className="space-y-2 text-dark-gray mb-4">
                  <li>• Valid armed security license</li>
                  <li>• Firearms certification</li>
                  <li>• Federal compliance training</li>
                  <li>• 24/7 availability</li>
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-white rounded-lg p-8 shadow-soft">
                <h3 className="font-heading font-bold text-2xl text-navy mb-4">
                  Unarmed Security Guard
                </h3>
                <p className="text-dark-gray mb-4">
                  Professional unarmed security officers for access control, surveillance, and
                  facility protection. Training provided.
                </p>
                <ul className="space-y-2 text-dark-gray mb-4">
                  <li>• State security license preferred</li>
                  <li>• Training provided</li>
                  <li>• Professional appearance</li>
                  <li>• Excellent communication skills</li>
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="bg-white rounded-lg p-8 shadow-soft">
                <h3 className="font-heading font-bold text-2xl text-navy mb-4">
                  Patrol Officer
                </h3>
                <p className="text-dark-gray mb-4">
                  Mobile and static patrol officers needed for comprehensive property coverage.
                  Valid driver&apos;s license required.
                </p>
                <ul className="space-y-2 text-dark-gray mb-4">
                  <li>• Valid driver&apos;s license</li>
                  <li>• Security license preferred</li>
                  <li>• Flexible schedule</li>
                  <li>• Strong observation skills</li>
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="bg-white rounded-lg p-8 shadow-soft">
                <h3 className="font-heading font-bold text-2xl text-navy mb-4">
                  Security Supervisor
                </h3>
                <p className="text-dark-gray mb-4">
                  Experienced security supervisors needed to lead teams and ensure compliance
                  with all security protocols and regulations.
                </p>
                <ul className="space-y-2 text-dark-gray mb-4">
                  <li>• 5+ years security experience</li>
                  <li>• Leadership experience</li>
                  <li>• Federal compliance knowledge</li>
                  <li>• Management skills</li>
                </ul>
              </div>
            </FadeIn>
          </div>

          {/* Benefits */}
          <FadeIn delay={0.5}>
            <div className="bg-navy text-white rounded-lg p-8 shadow-medium max-w-4xl mx-auto">
              <h3 className="font-heading font-bold text-2xl mb-6 text-center">
                Benefits & Perks
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-medium-blue font-bold">✓</span>
                    <span>Competitive wages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-medium-blue font-bold">✓</span>
                    <span>Health insurance options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-medium-blue font-bold">✓</span>
                    <span>Paid training</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-medium-blue font-bold">✓</span>
                    <span>Career advancement opportunities</span>
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-medium-blue font-bold">✓</span>
                    <span>Flexible scheduling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-medium-blue font-bold">✓</span>
                    <span>Professional development</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-medium-blue font-bold">✓</span>
                    <span>Supportive team environment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-medium-blue font-bold">✓</span>
                    <span>Federal compliance training</span>
                  </li>
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <FadeIn>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-navy text-center mb-4">
              Apply Now
            </h2>
            <p className="text-dark-gray text-center text-lg mb-12 max-w-3xl mx-auto">
              Fill out the application form below or schedule an interview using the Calendly
              widget to discuss career opportunities with our team.
            </p>
          </FadeIn>

          <div className="max-w-2xl mx-auto">
            <FadeIn delay={0.2}>
              <div className="bg-white rounded-lg p-8 shadow-medium">
                <CareerApplicationForm />
              </div>
            </FadeIn>
          </div>

          {/* Calendly Integration */}
          <FadeIn delay={0.4}>
            <div className="mt-12 max-w-4xl mx-auto">
              <div className="bg-light-gray rounded-lg p-8 text-center">
                <h3 className="font-heading font-bold text-2xl text-navy mb-4">
                  Schedule an Interview
                </h3>
                <p className="text-dark-gray mb-6">
                  Prefer to schedule a call? Use the calendar below to book a time that works for you.
                </p>
                <div
                  className="calendly-inline-widget"
                  data-url="https://calendly.com/your-calendly-url"
                  style={{ minWidth: '320px', height: '630px' }}
                />
                <script
                  type="text/javascript"
                  src="https://assets.calendly.com/assets/external/widget.js"
                  async
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to Start Your Security Career?"
        description="Join America Protective Security and become part of a team dedicated to protecting what matters most."
        ctaText="Apply Now"
        ctaLink="#careers"
      />
    </>
  );
}
