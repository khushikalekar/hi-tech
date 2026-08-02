import { useState } from 'react';
import { Star, Quote, PenLine, Loader2 } from 'lucide-react';
import { useApprovedReviews } from '@/hooks/useSupabaseData';
import ReviewModal from '@/components/ReviewModal';

export default function ReviewsPage() {
  const { reviews, loading } = useApprovedReviews();
  const [reviewOpen, setReviewOpen] = useState(false);

  return (
    <div>
      {/* Hero */}
      <section className="bg-hero relative overflow-hidden">
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 section-pattern opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white animate-fade-in-up">
            What Our Customers Say
          </h1>
          <p className="mt-4 text-lg text-navy-100 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Genuine reviews from our valued customers.
          </p>
        </div>
        <svg className="w-full h-12 md:h-16" viewBox="0 0 1440 80" preserveAspectRatio="none" fill="white">
          <path d="M0,40 C320,80 720,0 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </section>

      {/* Reviews grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-8 w-8 text-brand-600 animate-spin" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-24 text-navy-500">
            <p className="text-lg">No reviews yet. Be the first to share your experience!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.map((r, i) => (
              <div
                key={r.id}
                className="card-hover p-6 flex flex-col animate-fade-in-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <Quote className="h-8 w-8 text-brand-200 mb-3" />
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className={`h-5 w-5 ${
                        j < r.rating ? 'fill-gold-500 text-gold-500' : 'fill-navy-100 text-navy-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-navy-600 leading-relaxed flex-1 mb-4">"{r.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-navy-100">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-navy-900">{r.name}</p>
                    <p className="text-xs text-navy-500">{r.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Write review CTA */}
        <div className="mt-12 text-center">
          <div className="card p-8 bg-gradient-to-br from-brand-600 to-brand-800 text-white">
            <h3 className="font-heading text-2xl font-bold mb-3">Share Your Experience</h3>
            <p className="text-brand-100 mb-6 max-w-xl mx-auto">
              Have you used our products or services? We'd love to hear from you. Write a review and it will appear on our website after approval.
            </p>
            <button onClick={() => setReviewOpen(true)} className="btn-secondary !bg-white !text-brand-700 !border-white">
              <PenLine className="h-5 w-5" />
              Write A Review
            </button>
          </div>
        </div>
      </section>

      <ReviewModal open={reviewOpen} onClose={() => setReviewOpen(false)} />
    </div>
  );
}
