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
      return <Home className="h-8 w-8" />;
    }

    if (
      name.includes('office') ||
      name.includes('corporate')
    ) {
      return <Building2 className="h-8 w-8" />;
    }

    if (
      name.includes('hotel') ||
      name.includes('resort')
    ) {
      return <Hotel className="h-8 w-8" />;
    }

    if (
      name.includes('hospital') ||
      name.includes('clinic') ||
      name.includes('medical')
    ) {
      return <HeartPulse className="h-8 w-8" />;
    }

    if (
      name.includes('school') ||
      name.includes('college') ||
      name.includes('university')
    ) {
      return <GraduationCap className="h-8 w-8" />;
    }

    if (
      name.includes('industry') ||
      name.includes('industrial') ||
      name.includes('factory')
    ) {
      return <Factory className="h-8 w-8" />;
    }

    if (
      name.includes('shop') ||
      name.includes('retail') ||
      name.includes('showroom')
    ) {
      return <Store className="h-8 w-8" />;
    }

    if (
      name.includes('warehouse') ||
      name.includes('godown')
    ) {
      return <Warehouse className="h-8 w-8" />;
    }

    return <Sparkles className="h-8 w-8" />;
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-hero relative overflow-hidden">
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 section-pattern opacity-30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white animate-fade-in-up">
            Our Cleaning Services
          </h1>

          <p
            className="mt-4 text-lg text-navy-100 max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            Professional deep cleaning services for homes, offices, hotels,
            restaurants, hospitals, schools, industries and more.
          </p>
        </div>

        <svg
          className="w-full h-12 md:h-16"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          fill="white"
        >
          <path d="M0,40 C320,80 720,0 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-8 w-8 text-brand-600 animate-spin" />
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-24 text-slate-500">
            <p className="text-lg">
              No services available at the moment. Please check back soon.
            </p>
          </div>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <div
                key={s.id}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-fade-in-up flex flex-col"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {/* Top Gradient */}
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-cyan-500 via-brand-500 to-indigo-600" />

                {/* Header */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 via-brand-600 to-indigo-700 text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    {getServiceIcon(s.name)}
                  </div>

                  <div>
                    <h3 className="font-heading text-xl font-bold text-slate-900">
                      {s.name}
                    </h3>

                    <p className="mt-1 text-sm font-semibold text-brand-600">
                      Premium Cleaning Service
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="flex-1 text-[15px] leading-7 text-slate-600">
                  {s.description}
                </p>

                {/* Divider */}
                <div className="my-6 border-t border-slate-100" />

                {/* CTA */}
                <button
                  onClick={() => setBookingService(s.name)}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-700 px-5 py-3 font-semibold text-white shadow-md hover:shadow-xl hover:from-brand-700 hover:to-indigo-800 transition-all duration-300"
                >
                  <CalendarCheck className="h-5 w-5" />
                  Book Service
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}


      {/* Booking Modal */}
      <ServiceBookingModal
        open={bookingService !== null}
        onClose={() => setBookingService(null)}
        serviceName={bookingService ?? ''}
      />
    </div>
  );
}