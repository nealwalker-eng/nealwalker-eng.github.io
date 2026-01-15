'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const careerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^[\d\s\-\(\)]+$/, 'Please enter a valid phone number'),
  position: z.string().min(1, 'Please select a position'),
  resume: z.instanceof(FileList).refine((files) => files.length > 0, 'Please upload your resume'),
  coverLetter: z.string().optional(),
  honeypot: z.string().max(0, 'Bot detected'),
});

type CareerFormData = z.infer<typeof careerSchema>;

export default function CareerApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CareerFormData>({
    resolver: zodResolver(careerSchema),
  });

  const onSubmit = async (data: CareerFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'resume' && value instanceof FileList) {
          formData.append(key, value[0]);
        } else if (value) {
          formData.append(key, value);
        }
      });

      const response = await fetch('/api/careers', {
        method: 'POST',
        body: formData,
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
      className="space-y-6"
      encType="multipart/form-data"
    >
      <input
        type="text"
        {...register('honeypot')}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Name */}
      <div>
        <label htmlFor="career-name" className="block text-navy font-semibold mb-2">
          Full Name <span className="text-navy">*</span>
        </label>
        <input
          type="text"
          id="career-name"
          {...register('name')}
          className="w-full px-4 py-3 border-2 border-medium-gray rounded-lg focus:outline-none focus:border-medium-blue transition-colors duration-200"
          aria-invalid={errors.name ? 'true' : 'false'}
        />
        {errors.name && (
          <p className="text-medium-blue text-sm mt-1" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="career-email" className="block text-navy font-semibold mb-2">
          Email <span className="text-navy">*</span>
        </label>
        <input
          type="email"
          id="career-email"
          {...register('email')}
          className="w-full px-4 py-3 border-2 border-medium-gray rounded-lg focus:outline-none focus:border-medium-blue transition-colors duration-200"
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email && (
          <p className="text-medium-blue text-sm mt-1" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="career-phone" className="block text-navy font-semibold mb-2">
          Phone <span className="text-navy">*</span>
        </label>
        <input
          type="tel"
          id="career-phone"
          {...register('phone')}
          className="w-full px-4 py-3 border-2 border-medium-gray rounded-lg focus:outline-none focus:border-medium-blue transition-colors duration-200"
          aria-invalid={errors.phone ? 'true' : 'false'}
        />
        {errors.phone && (
          <p className="text-medium-blue text-sm mt-1" role="alert">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Position */}
      <div>
        <label htmlFor="position" className="block text-navy font-semibold mb-2">
          Position <span className="text-navy">*</span>
        </label>
        <select
          id="position"
          {...register('position')}
          className="w-full px-4 py-3 border-2 border-medium-gray rounded-lg focus:outline-none focus:border-medium-blue transition-colors duration-200"
          aria-invalid={errors.position ? 'true' : 'false'}
        >
          <option value="">Select a position...</option>
          <option value="armed-guard">Armed Security Guard</option>
          <option value="unarmed-guard">Unarmed Security Guard</option>
          <option value="patrol-officer">Patrol Officer</option>
          <option value="supervisor">Security Supervisor</option>
          <option value="other">Other</option>
        </select>
        {errors.position && (
          <p className="text-medium-blue text-sm mt-1" role="alert">
            {errors.position.message}
          </p>
        )}
      </div>

      {/* Resume */}
      <div>
        <label htmlFor="resume" className="block text-navy font-semibold mb-2">
          Resume (PDF, DOC, DOCX) <span className="text-navy">*</span>
        </label>
        <input
          type="file"
          id="resume"
          accept=".pdf,.doc,.docx"
          {...register('resume')}
          className="w-full px-4 py-3 border-2 border-medium-gray rounded-lg focus:outline-none focus:border-medium-blue transition-colors duration-200"
          aria-invalid={errors.resume ? 'true' : 'false'}
        />
        {errors.resume && (
          <p className="text-medium-blue text-sm mt-1" role="alert">
            {errors.resume.message}
          </p>
        )}
      </div>

      {/* Cover Letter */}
      <div>
        <label htmlFor="coverLetter" className="block text-navy font-semibold mb-2">
          Cover Letter (Optional)
        </label>
        <textarea
          id="coverLetter"
          {...register('coverLetter')}
          rows={6}
          className="w-full px-4 py-3 border-2 border-medium-gray rounded-lg focus:outline-none focus:border-medium-blue transition-colors duration-200 resize-vertical"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-medium-blue text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-navy transition-colors duration-300 shadow-medium focus:outline-none focus:ring-2 focus:ring-medium-blue focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Application'}
      </button>

      {submitStatus === 'success' && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg" role="alert">
          Thank you! Your application has been submitted successfully.
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="bg-navy/10 border border-navy/30 text-navy px-4 py-3 rounded-lg" role="alert">
          There was an error submitting your application. Please try again.
        </div>
      )}
    </form>
  );
}
