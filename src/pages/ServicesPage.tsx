import { useState } from 'react';
import { CalendarCheck, ArrowRight, Loader2 } from 'lucide-react';
import { useServices } from '@/hooks/useSupabaseData';
import ServiceBookingModal from '@/components/ServiceBookingModal';

export default function ServicesPage() {
  const { services, loading } = useServices();
  const [bookingService, setBookingService] = useState<string | null>(null);

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
          <p className="mt-4 text-lg text-navy-100 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Professional deep cleaning services for homes, offices, hotels, restaurants, hospitals, schools, industries and more.
          </p>
        </div>
        <svg className="w-full h-12 md:h-16" viewBox="0 0 1440 80" preserveAspectRatio="none" fill="white">
          <path d="M0,40 C320,80 720,0 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </section>

      {/* Services grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-8 w-8 text-brand-600 animate-spin" />
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-24 text-navy-500">
            <p className="text-lg">No services available at the moment. Please check back soon.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <div
                key={s.id}
                className="card-hover p-6 flex flex-col animate-fade-in-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white mb-4">
                  <CalendarCheck className="h-6 w-6" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-navy-900 mb-2">{s.name}</h3>
                <p className="text-sm text-navy-500 leading-relaxed flex-1">{s.description}</p>
                <button
                  onClick={() => setBookingService(s.name)}
                  className="btn-primary mt-5 w-full !py-2.5 text-sm"
                >
                  Book Service
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-navy-50 py-12 md:py-16 section-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="section-title mb-3">Need a Custom Cleaning Solution?</h2>
          <p className="section-subtitle max-w-2xl mx-auto mb-6">
            We handle all types of cleaning requirements. Contact us to discuss your specific needs.
          </p>
          <button onClick={() => setBookingService('Custom Cleaning Service')} className="btn-primary">
            <CalendarCheck className="h-5 w-5" />
            Book a Service
          </button>
        </div>
      </section>

      <ServiceBookingModal
        open={bookingService !== null}
        onClose={() => setBookingService(null)}
        serviceName={bookingService ?? ''}
      />
    </div>
  );
}
