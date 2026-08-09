import { useState } from 'react';
import {
  CalendarCheck,
  ArrowRight,
  Loader2,
  Home,
  Building2,
  Hotel,
  HeartPulse,
  GraduationCap,
  Factory,
  Store,
  Warehouse,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Clock3,
  Star,
} from 'lucide-react';

import { useServices } from '@/hooks/useSupabaseData';
import ServiceBookingModal from '@/components/ServiceBookingModal';

export default function ServicesPage() {
  const { services, loading } = useServices();
  const [bookingService, setBookingService] = useState<string | null>(null);

  const getServiceIcon = (serviceName: string) => {
    const name = serviceName.toLowerCase();

    if (
      name.includes('home') ||
      name.includes('house') ||
      name.includes('residential')
    ) {
      return <Home className="h-7 w-7" />;
    }

    if (name.includes('office') || name.includes('corporate')) {
      return <Building2 className="h-7 w-7" />;
    }

    if (name.includes('hotel') || name.includes('resort')) {
      return <Hotel className="h-7 w-7" />;
    }

    if (
      name.includes('hospital') ||
      name.includes('clinic') ||
      name.includes('medical')
    ) {
      return <HeartPulse className="h-7 w-7" />;
    }

    if (
      name.includes('school') ||
      name.includes('college') ||
      name.includes('university')
    ) {
      return <GraduationCap className="h-7 w-7" />;
    }

    if (
      name.includes('industry') ||
      name.includes('industrial') ||
      name.includes('factory')
    ) {
      return <Factory className="h-7 w-7" />;
    }

    if (
      name.includes('shop') ||
      name.includes('retail') ||
      name.includes('showroom')
    ) {
      return <Store className="h-7 w-7" />;
    }

    if (name.includes('warehouse') || name.includes('godown')) {
      return <Warehouse className="h-7 w-7" />;
    }

    return <Sparkles className="h-7 w-7" />;
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =========================================================
          HERO
      ========================================================= */}
{/* =========================================================
    COMPACT PREMIUM HERO
========================================================= */}
<section className="relative overflow-hidden bg-[#06152f]">

  {/* Ambient background */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-cyan-500/15 blur-[100px]" />
    <div className="absolute -right-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-indigo-600/20 blur-[110px]" />
  </div>

  {/* Subtle grid */}
  <div
    className="absolute inset-0 opacity-[0.035]"
    style={{
      backgroundImage:
        'linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)',
      backgroundSize: '40px 40px',
    }}
  />

  <div className="relative mx-auto flex min-h-[340px] max-w-7xl items-center px-4 py-16 sm:px-6 md:min-h-[380px] md:py-20 lg:px-8">

    <div className="w-full text-center">

      {/* Small badge */}
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-1.5 text-xs font-semibold text-cyan-200 backdrop-blur-xl animate-fade-in-up">
        <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
        Professional Cleaning Solutions
      </div>

      {/* Heading */}
      <h1 className="font-heading text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl animate-fade-in-up">
        Our Cleaning
        <span className="bg-gradient-to-r from-cyan-300 via-brand-400 to-indigo-400 bg-clip-text text-transparent">
          {" "}Services
        </span>
      </h1>

      {/* Description */}
      <p
        className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base md:text-lg animate-fade-in-up"
        style={{ animationDelay: '0.1s' }}
      >
        Professional deep cleaning services for homes, offices,
        hotels, hospitals, schools, industries and more.
      </p>

      {/* Small trust row */}
      <div
        className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-400 sm:text-sm animate-fade-in-up"
        style={{ animationDelay: '0.2s' }}
      >
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="h-4 w-4 text-cyan-400" />
          Professional Team
        </span>

        <span className="flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-cyan-400" />
          Trusted Service
        </span>

        <span className="flex items-center gap-1.5">
          <Clock3 className="h-4 w-4 text-cyan-400" />
          Flexible Scheduling
        </span>
      </div>

    </div>
  </div>

  {/* Bottom curve */}
  <svg
    className="relative block h-8 w-full md:h-10"
    viewBox="0 0 1440 80"
    preserveAspectRatio="none"
  >
    <path
      d="M0,40 C320,70 720,10 1440,40 L1440,80 L0,80 Z"
      fill="#f8fafc"
    />
  </svg>

</section>

      {/* =========================================================
          SERVICES
      ========================================================= */}
      <section className="relative mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 md:pb-28 lg:px-8">

        {/* Section heading */}
        <div className="mb-12 text-center">
          <div className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-brand-600">
            What We Offer
          </div>

          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Our Premium Services
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-500">
            From everyday cleaning to specialized deep-cleaning solutions,
            our professional team is equipped to handle every space.
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-xl ring-1 ring-slate-200">
                <Loader2 className="h-7 w-7 animate-spin text-brand-600" />
              </div>

              <p className="text-sm font-medium text-slate-500">
                Loading our services...
              </p>
            </div>
          </div>
        ) : services.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-20 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
              <Sparkles className="h-7 w-7 text-slate-400" />
            </div>

            <h3 className="mt-5 text-xl font-bold text-slate-900">
              Services Coming Soon
            </h3>

            <p className="mx-auto mt-2 max-w-md text-slate-500">
              We are currently updating our service catalog.
              Please check back soon.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {services.map((s, i) => (
              <div
                key={s.id}
                className="group relative flex min-h-[390px] flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-brand-200 hover:shadow-[0_25px_70px_-20px_rgba(15,23,42,0.25)] animate-fade-in-up"
                style={{
                  animationDelay: `${i * 0.06}s`,
                }}
              >

                {/* Hover background glow */}
                <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Top gradient */}
                <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-brand-500 to-indigo-600" />

                {/* Card content */}
                <div className="relative flex flex-1 flex-col p-7">

                  {/* Number */}
                  <div className="absolute right-7 top-6 text-5xl font-black text-slate-100 transition-colors duration-300 group-hover:text-brand-50">
                    {(i + 1).toString().padStart(2, '0')}
                  </div>

                  {/* Icon */}
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 via-brand-600 to-indigo-700 text-white shadow-lg shadow-brand-500/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-xl group-hover:shadow-brand-500/30">
                    {getServiceIcon(s.name)}
                  </div>

                  {/* Title */}
                  <div className="mt-6">
                    <h3 className="font-heading text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-brand-700">
                      {s.name}
                    </h3>

                    <div className="mt-2 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
                        Premium Service
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-5 flex-1 text-[15px] leading-7 text-slate-500">
                    {s.description}
                  </p>

                  {/* Divider */}
                  <div className="my-6 h-px bg-gradient-to-r from-slate-100 via-slate-200 to-transparent" />

                  {/* CTA */}
                  <button
                    onClick={() => setBookingService(s.name)}
                    className="group/button relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:bg-brand-600 hover:shadow-xl hover:shadow-brand-600/20"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover/button:translate-x-full" />

                    <CalendarCheck className="relative h-4.5 w-4.5" />

                    <span className="relative">
                      Book This Service
                    </span>

                    <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* =========================================================
          BOTTOM CTA
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#06152f]">
        <div className="absolute inset-0">
          <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-cyan-500/10 blur-[100px]" />
          <div className="absolute right-1/4 bottom-0 h-72 w-72 rounded-full bg-indigo-600/10 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 md:py-24 lg:px-8">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08] text-cyan-300 backdrop-blur-xl">
            <Sparkles className="h-7 w-7" />
          </div>

          <h2 className="mt-7 font-heading text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
            Need a Custom Cleaning Solution?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
            Tell us about your space and requirements.
            Our team will help you choose the right cleaning solution.
          </p>

          <button
            onClick={() => {
              if (services.length > 0) {
                setBookingService(services[0].name);
              }
            }}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-slate-950 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            <CalendarCheck className="h-5 w-5" />
            Get a Cleaning Quote
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* Booking Modal */}
      <ServiceBookingModal
        open={bookingService !== null}
        onClose={() => setBookingService(null)}
        serviceName={bookingService ?? ''}
      />
    </div>
  );
}