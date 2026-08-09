import { useState } from 'react';
import {
  Star,
  Quote,
  PenLine,
  Loader2,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

import { useApprovedReviews } from '@/hooks/useSupabaseData';
import ReviewModal from '@/components/ReviewModal';

export default function ReviewsPage() {
  const { reviews, loading } = useApprovedReviews();
  const [reviewOpen, setReviewOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f9fc]">

      {/* =========================================================
          PREMIUM COMPACT HERO
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#06152f]">

        {/* Ambient background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-cyan-500/15 blur-[110px]" />

          <div className="absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-indigo-600/20 blur-[120px]" />

          <div className="absolute bottom-0 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-brand-500/10 blur-[100px]" />
        </div>

        {/* Subtle grid */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)',
              backgroundSize: '42px 42px',
            }}
          />
        </div>

        {/* Hero content */}
        <div className="relative z-10 mx-auto flex min-h-[270px] max-w-7xl items-center px-4 py-10 text-center sm:px-6 md:min-h-[300px] md:py-12 lg:px-8">

          <div className="w-full">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-cyan-200 backdrop-blur-xl animate-fade-in-up">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
              Customer Reviews
            </div>

            {/* Heading */}
            <h1
              className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl animate-fade-in-up"
              style={{ animationDelay: '0.05s' }}
            >
              What Our Customers
              <span className="block bg-gradient-to-r from-cyan-300 via-brand-400 to-indigo-400 bg-clip-text text-transparent">
                Say About Us
              </span>
            </h1>

            {/* Description */}
            <p
              className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base animate-fade-in-up"
              style={{ animationDelay: '0.1s' }}
            >
              Genuine experiences from customers who trust us
              with their cleaning needs.
            </p>

            {/* Rating */}
            <div
              className="mt-5 flex items-center justify-center gap-2 text-sm animate-fade-in-up"
              style={{ animationDelay: '0.15s' }}
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <span className="text-white/60">
                Trusted customer experiences
              </span>
            </div>

          </div>
        </div>

        {/* Bottom curve */}
        <svg
          className="relative block h-7 w-full md:h-9"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
        >
          <path
            d="M0 40C320 70 720 15 1440 40V80H0Z"
            fill="#f7f9fc"
          />
        </svg>

      </section>


      {/* =========================================================
          REVIEWS
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 md:pb-24 md:pt-12 lg:px-8">

        {/* Section heading */}
        <div className="mb-10 text-center">

          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600">
            Customer Experiences
          </span>

          <h2 className="mt-2 font-heading text-2xl font-extrabold tracking-tight text-[#07162f] sm:text-3xl md:text-4xl">
            Loved by Our Customers
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            Every review represents a real experience and motivates
            us to keep delivering exceptional cleaning services.
          </p>

        </div>


        {/* =====================================================
            LOADING
        ===================================================== */}
        {loading ? (

          <div className="flex min-h-[300px] flex-col items-center justify-center">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-xl">
              <Loader2 className="h-7 w-7 animate-spin text-brand-600" />
            </div>

            <p className="mt-4 text-sm font-medium text-slate-500">
              Loading customer reviews...
            </p>

          </div>

        ) : reviews.length === 0 ? (

          /* ===================================================
             EMPTY STATE
          =================================================== */
          <div className="mx-auto max-w-xl rounded-[28px] border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50">
              <Quote className="h-7 w-7 text-brand-500" />
            </div>

            <h3 className="mt-5 font-heading text-xl font-bold text-slate-900">
              No Reviews Yet
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Be the first customer to share your experience
              with our services.
            </p>

            <button
              onClick={() => setReviewOpen(true)}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#07162f] px-5 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-xl"
            >
              <PenLine className="h-4 w-4" />
              Write a Review
            </button>

          </div>

        ) : (

          /* ===================================================
             REVIEW GRID
          =================================================== */
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {reviews.map((r, i) => (

              <article
                key={r.id}
                className="group relative flex flex-col overflow-hidden rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-[0_25px_60px_-20px_rgba(15,23,42,0.22)] animate-fade-in-up"
                style={{
                  animationDelay: `${Math.min(i * 0.06, 0.4)}s`,
                }}
              >

                {/* Top accent */}
                <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-brand-500 to-indigo-600" />

                {/* Decorative quote */}
                <div className="absolute right-5 top-5 opacity-[0.06] transition-all duration-500 group-hover:scale-110 group-hover:opacity-[0.1]">
                  <Quote className="h-20 w-20 text-brand-700" />
                </div>


                {/* Rating */}
                <div className="relative flex items-center justify-between">

                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className={`h-4 w-4 ${
                          j < r.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-slate-100 text-slate-200'
                        }`}
                      />
                    ))}
                  </div>

                  <span className="text-xs font-semibold text-slate-400">
                    {r.rating}.0 / 5
                  </span>

                </div>


                {/* Review */}
                <div className="relative mt-5 flex-1">

                  <Quote className="mb-3 h-6 w-6 text-brand-200" />

                  <p className="text-[15px] leading-7 text-slate-600">
                    "{r.text}"
                  </p>

                </div>


                {/* Customer */}
                <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">

                  {/* Avatar */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-brand-600 to-indigo-700 text-sm font-bold text-white shadow-md">
                    {r.name.charAt(0).toUpperCase()}
                  </div>

                  <div className="min-w-0 flex-1">

                    <div className="flex items-center gap-1.5">

                      <p className="truncate text-sm font-bold text-slate-900">
                        {r.name}
                      </p>

                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-brand-500" />

                    </div>

                    <p className="mt-0.5 truncate text-xs text-slate-400">
                      {r.location || 'Verified Customer'}
                    </p>

                  </div>

                </div>

              </article>

            ))}

          </div>
        )}


        {/* =====================================================
            WRITE REVIEW CTA
        ===================================================== */}
        <div className="relative mt-14 overflow-hidden rounded-[30px] bg-[#06152f]">

          {/* Background glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-cyan-500/15 blur-[100px]" />

            <div className="absolute -right-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-indigo-600/20 blur-[110px]" />
          </div>

          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          <div className="relative px-6 py-10 text-center sm:px-10 md:py-12">

            {/* Icon */}
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-cyan-300 backdrop-blur-md">
              <PenLine className="h-6 w-6" />
            </div>

            <h3 className="mt-5 font-heading text-2xl font-extrabold text-white sm:text-3xl">
              Share Your Experience
            </h3>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-300">
              Used our products or services?
              We'd love to hear about your experience.
              Your feedback helps us serve you better.
            </p>

            <button
              onClick={() => setReviewOpen(true)}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#07162f] shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <PenLine className="h-4 w-4" />
              Write a Review
            </button>

          </div>
        </div>

      </section>


      {/* Review modal */}
      <ReviewModal
        open={reviewOpen}
        onClose={() => setReviewOpen(false)}
      />

    </div>
  );
}