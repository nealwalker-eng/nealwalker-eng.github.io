'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^[\d\s\-\(\)]+$/, 'Please enter a valid phone number'),
  serviceType: z.string().min(1, 'Please select a service type'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  honeypot: z.string().max(0, 'Bot detected'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Using Netlify Forms - if deploying to Netlify
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
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="honeypot"
      className="space-y-6"
    >
      <input type="hidden" name="form-name" value="contact" />
      
      {/* Honeypot */}
      <input
        type="text"
        {...register('honeypot')}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-navy font-semibold mb-2">
          Name <span className="text-navy">*</span>
        </label>
        <input
          type="text"
          id="name"
          {...register('name')}
          className="w-full px-4 py-3 border-2 border-medium-gray rounded-lg focus:outline-none focus:border-medium-blue transition-colors duration-200"
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className="text-navy text-sm mt-1" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-navy font-semibold mb-2">
          Email <span className="text-navy">*</span>
        </label>
        <input
          type="email"
          id="email"
          {...register('email')}
          className="w-full px-4 py-3 border-2 border-medium-gray rounded-lg focus:outline-none focus:border-medium-blue transition-colors duration-200"
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="text-navy text-sm mt-1" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-navy font-semibold mb-2">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          {...register('phone')}
          className="w-full px-4 py-3 border-2 border-medium-gray rounded-lg focus:outline-none focus:border-medium-blue transition-colors duration-200"
          aria-invalid={errors.phone ? 'true' : 'false'}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
        />
        {errors.phone && (
          <p id="phone-error" className="text-navy text-sm mt-1" role="alert">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Service Type */}
      <div>
        <label htmlFor="serviceType" className="block text-navy font-semibold mb-2">
          Service Type <span className="text-navy">*</span>
        </label>
        <select
          id="serviceType"
          {...register('serviceType')}
          className="w-full px-4 py-3 border-2 border-medium-gray rounded-lg focus:outline-none focus:border-medium-blue transition-colors duration-200"
          aria-invalid={errors.serviceType ? 'true' : 'false'}
          aria-describedby={errors.serviceType ? 'serviceType-error' : undefined}
        >
          <option value="">Select a service...</option>
          <option value="armed">Armed Guards</option>
          <option value="unarmed">Unarmed Guards</option>
          <option value="patrol">Patrol Services</option>
          <option value="firewatch">Firewatch</option>
          <option value="monitoring">Remote Monitoring</option>
          <option value="other">Other</option>
        </select>
        {errors.serviceType && (
          <p id="serviceType-error" className="text-navy text-sm mt-1" role="alert">
            {errors.serviceType.message}
          </p>
        )}
      </div>

      {/* Budget */}
      <div>
        <label htmlFor="budget" className="block text-navy font-semibold mb-2">
          Budget Range
        </label>
        <select
          id="budget"
          {...register('budget')}
          className="w-full px-4 py-3 border-2 border-medium-gray rounded-lg focus:outline-none focus:border-medium-blue transition-colors duration-200"
        >
          <option value="">Select budget range...</option>
          <option value="under-10k">Under $10,000</option>
          <option value="10k-50k">$10,000 - $50,000</option>
          <option value="50k-100k">$50,000 - $100,000</option>
          <option value="100k-plus">$100,000+</option>
        </select>
      </div>

      {/* Timeline */}
      <div>
        <label htmlFor="timeline" className="block text-navy font-semibold mb-2">
          Timeline
        </label>
        <select
          id="timeline"
          {...register('timeline')}
          className="w-full px-4 py-3 border-2 border-medium-gray rounded-lg focus:outline-none focus:border-medium-blue transition-colors duration-200"
        >
          <option value="">Select timeline...</option>
          <option value="immediate">Immediate</option>
          <option value="1-month">Within 1 month</option>
          <option value="3-months">Within 3 months</option>
          <option value="6-months">Within 6 months</option>
          <option value="planning">Just planning</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-navy font-semibold mb-2">
          Message <span className="text-navy">*</span>
        </label>
        <textarea
          id="message"
          {...register('message')}
          rows={6}
          className="w-full px-4 py-3 border-2 border-medium-gray rounded-lg focus:outline-none focus:border-navy transition-colors duration-200 resize-vertical"
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className="text-navy text-sm mt-1" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-medium-blue text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-navy transition-colors duration-300 shadow-medium focus:outline-none focus:ring-2 focus:ring-medium-blue focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Send Message'}
      </button>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg" role="alert">
          Thank you! Your message has been sent successfully. We&apos;ll get back to you soon.
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="bg-navy/10 border border-navy text-navy px-4 py-3 rounded-lg" role="alert">
          There was an error sending your message. Please try again or call us at 301-434-2220.
        </div>
      )}
    </form>
  );
}
