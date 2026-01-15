'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  honeypot: z.string().max(0, 'Bot detected'),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

export default function NewsletterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      name="newsletter"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="honeypot"
      className="flex flex-col sm:flex-row gap-4"
    >
      <input type="hidden" name="form-name" value="newsletter" />
      <input
        type="text"
        {...register('honeypot')}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="flex-1">
        <input
          type="email"
          id="newsletter-email"
          {...register('email')}
          placeholder="Enter your email"
          className="w-full px-4 py-3 border-2 border-medium-gray rounded-lg focus:outline-none focus:border-navy transition-colors duration-200"
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'newsletter-email-error' : undefined}
        />
        {errors.email && (
          <p id="newsletter-email-error" className="text-navy text-sm mt-1" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-medium-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-navy transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-medium-blue focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
      >
        {isSubmitting ? 'Subscribing...' : 'Subscribe'}
      </button>

      {submitStatus === 'success' && (
        <div className="absolute top-full mt-2 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-lg text-sm" role="alert">
          Successfully subscribed!
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="absolute top-full mt-2 bg-navy/10 border border-navy text-navy px-4 py-2 rounded-lg text-sm" role="alert">
          Error subscribing. Please try again.
        </div>
      )}
    </form>
  );
}
