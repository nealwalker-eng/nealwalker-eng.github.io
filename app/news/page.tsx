import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import NewsletterForm from '@/components/NewsletterForm';
import FadeIn from '@/components/FadeIn';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'News & Updates | America Protective Security',
  description: 'Stay informed on security trends, industry news, and updates from America Protective Security.',
};

const newsArticles = [
  {
    id: 1,
    title: 'Armed Security Guards Maryland: What to Know',
    date: '2025-01-10',
    summary: 'Essential information about armed security guard services in Maryland, including licensing requirements, training, and compliance standards.',
    image: '/images/guard stock.jpg',
    category: 'Security Services',
  },
  {
    id: 2,
    title: 'Best Practices Event Security DC',
    date: '2025-01-05',
    summary: 'Learn about best practices for event security in Washington DC, including crowd management, access control, and emergency response protocols.',
    image: '/images/event sec.jpg',
    category: 'Event Security',
  },
  {
    id: 3,
    title: 'Private Security Virginia Trends 2025',
    date: '2024-12-28',
    summary: 'Exploring the latest trends in private security services in Virginia, including technology integration, compliance updates, and industry developments.',
    image: '/images/Virginia Hero.jpg',
    category: 'Industry News',
  },
  {
    id: 4,
    title: 'Federal Security Compliance: FPS and DHS Requirements',
    date: '2024-12-20',
    summary: 'Understanding federal security compliance requirements, including FPS and DHS protocols, and how to ensure your facility meets all standards.',
    image: '/images/fed building.jpg',
    category: 'Compliance',
  },
  {
    id: 5,
    title: 'Remote Monitoring: The Future of Security',
    date: '2024-12-15',
    summary: 'How remote monitoring technology is revolutionizing security services, providing real-time oversight and rapid response capabilities.',
    image: '/images/vault door.jpg',
    category: 'Technology',
  },
  {
    id: 6,
    title: 'Firewatch Services: When and Why You Need Them',
    date: '2024-12-10',
    summary: 'Comprehensive guide to firewatch services, including when they are required, what they entail, and how to ensure compliance.',
    image: '/images/construction - service.jpg',
    category: 'Services',
  },
];

export default function News() {
  return (
    <>
      <HeroSection
        title="Stay Informed on Security Trends"
        subtitle="Latest news, insights, and updates from America Protective Security"
        backgroundImage="/images/usa flag hero.jpg"
      />

      {/* News Articles Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <FadeIn>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-navy text-center mb-12">
              Latest News & Articles
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article, index) => (
              <FadeIn key={article.id} delay={index * 0.1}>
                <article className="bg-white rounded-lg shadow-soft overflow-hidden hover:shadow-medium transition-shadow duration-300">
                  <Link href={`/news/${article.id}`} className="block">
                    <div className="relative w-full h-48">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-medium-blue text-sm font-semibold uppercase tracking-wide">
                        {article.category}
                      </span>
                      <h3 className="font-heading font-bold text-xl text-navy mt-2 mb-3 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-dark-gray text-sm mb-4 line-clamp-3">
                        {article.summary}
                      </p>
                      <time className="text-medium-gray text-sm">
                        {new Date(article.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    </div>
                  </Link>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Industry News */}
      <section className="py-16 lg:py-24 bg-light-gray">
        <div className="container mx-auto px-4 lg:px-8">
          <FadeIn>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-navy text-center mb-12">
              Industry News
            </h2>
          </FadeIn>

          <div className="max-w-4xl mx-auto space-y-6">
            <FadeIn delay={0.1}>
              <div className="bg-white rounded-lg p-6 shadow-soft">
                <h3 className="font-heading font-bold text-xl text-navy mb-2">
                  Security Industry Growth in 2025
                </h3>
                <p className="text-dark-gray mb-2">
                  The private security industry continues to grow, with increased demand for
                  professional security services across government and commercial sectors.
                </p>
                <time className="text-medium-gray text-sm">January 15, 2025</time>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-white rounded-lg p-6 shadow-soft">
                <h3 className="font-heading font-bold text-xl text-navy mb-2">
                  Federal Security Regulations Update
                </h3>
                <p className="text-dark-gray mb-2">
                  Recent updates to federal security regulations emphasize the importance of
                  compliance and ongoing training for security personnel.
                </p>
                <time className="text-medium-gray text-sm">January 8, 2025</time>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="bg-white rounded-lg p-6 shadow-soft">
                <h3 className="font-heading font-bold text-xl text-navy mb-2">
                  Technology Integration in Security Services
                </h3>
                <p className="text-dark-gray mb-2">
                  Advancements in security technology are transforming how security services are
                  delivered, with increased focus on remote monitoring and AI-powered solutions.
                </p>
                <time className="text-medium-gray text-sm">December 30, 2024</time>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <FadeIn>
              <div className="bg-navy text-white rounded-lg p-8 shadow-medium text-center">
                <h2 className="font-heading font-bold text-3xl mb-4">
                  Stay Updated
                </h2>
                <p className="text-white/80 mb-6">
                  Subscribe to our newsletter to receive the latest security news, industry
                  insights, and updates from America Protective Security.
                </p>
                <NewsletterForm />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
