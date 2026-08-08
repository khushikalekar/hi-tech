import {
  ShoppingBag,
  Sparkles,
  CalendarCheck,
  MessageCircle,
  ShieldCheck,
  Truck,
  Award,
  Users,
  Star,
  ArrowRight,
  CheckCircle2,
  Droplets,
  Phone,
  BadgeCheck,
  Clock,
  MapPin,
  Leaf,
  HeadphonesIcon,
} from 'lucide-react';
import { businessInfo, whatsappLink, callLink } from '@/data/business';
import { useServices, useApprovedReviews } from '@/hooks/useSupabaseData';
import { useEnquiry } from '@/context/EnquiryContext';
import type { Page } from '@/types';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

/** Reusable dot-grid texture — pass `dark` for use on navy/dark section backgrounds. */
function DotGrid({ dark = false, fade = true }: { dark?: boolean; fade?: boolean }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `radial-gradient(${
          dark ? 'rgba(255,255,255,0.14)' : 'rgba(15,23,42,0.08)'
        } 1px, transparent 1px)`,
        backgroundSize: '26px 26px',
        ...(fade
          ? {
              maskImage: 'radial-gradient(ellipse 90% 80% at 50% 30%, black 30%, transparent 100%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 90% 80% at 50% 30%, black 30%, transparent 100%)',
            }
          : {}),
      }}
    />
  );
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const { openCart, totalItems } = useEnquiry();
  const { services } = useServices();
  const { reviews } = useApprovedReviews();

  const highlights = [
    { icon: ShieldCheck, title: 'Premium Quality', desc: 'Professional-grade cleaning products' },
    { icon: Truck, title: 'Wholesale Supply', desc: 'Bulk supply for businesses & industries' },
    { icon: Award, title: 'Expert Service', desc: 'Trained & experienced cleaning teams' },
    { icon: Users, title: '500+ Clients', desc: 'Trusted by homes, offices & hotels' },
  ];

  const heroStats = [
    { value: '16+', label: 'Cleaning Services' },
    { value: '20+', label: 'Products' },
    { value: '9 AM–9 PM', label: 'Business Hours' },
    { value: '100%', label: 'Customer Focus' },
  ];

  // Distinct from the hero's numeric stats — these are the "how we operate" differentiators.
  const differentiators = [
    { icon: Clock, title: 'Same-day dispatch', desc: 'Orders placed before 4 PM go out the same day.' },
    { icon: Leaf, title: 'Eco-conscious formulas', desc: 'Biodegradable options across our chemical range.' },
    { icon: MapPin, title: 'Local, on-ground team', desc: 'Based in Shirdi — we know the district first-hand.' },
    { icon: HeadphonesIcon, title: 'Direct support line', desc: "Talk to a real person, not a call centre." },
  ];

  const featuredServices = services.slice(0, 6);
  const featuredReviews = reviews.slice(0, 3);

  return (
    <div className="relative">
      {/* ================= PREMIUM HERO ================= */}
      <section className="relative overflow-hidden bg-[#FAFAF8]">
        <DotGrid />
        <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-white via-white/70 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-28 lg:pt-28 lg:pb-36">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">

            {/* LEFT */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-navy-200 bg-white px-4 py-1.5 text-xs font-semibold tracking-wide uppercase text-navy-600 shadow-sm">
                <BadgeCheck className="h-3.5 w-3.5 text-brand-600" />
                Trusted Cleaning Partner · Shirdi
              </div>

              <h1 className="mt-6 font-heading text-5xl md:text-6xl xl:text-[4.5rem] font-black leading-[1.05] tracking-tight text-navy-900">
                Make every space
                <span className="relative inline-block px-1">
                  shine
                  <svg
                    className="absolute -bottom-1 left-0 w-full h-3 text-amber-400"
                    viewBox="0 0 200 12"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2 9C40 2 100 2 198 9"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </span>
                like new.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-navy-500">
                Premium cleaning chemicals, housekeeping materials, disposable
                products and professional deep cleaning services — for{' '}
                <span className="font-semibold text-navy-800">
                  homes, hospitals, hotels, industries and offices.
                </span>
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                {[
                  { icon: ShieldCheck, label: 'Safe & certified chemicals' },
                  { icon: Truck, label: 'Fast local delivery' },
                  { icon: Award, label: 'Trained cleaning teams' },
                ].map((t) => (
                  <div key={t.label} className="flex items-center gap-2 text-sm text-navy-500">
                    <t.icon className="h-4 w-4 text-brand-600" />
                    {t.label}
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigate('products')}
                  className="group inline-flex items-center gap-2 rounded-xl bg-navy-900 px-6 py-3.5 font-semibold text-white shadow-[0_12px_30px_rgba(15,23,42,0.25)] transition hover:bg-navy-800"
                >
                  <ShoppingBag className="h-5 w-5" />
                  Explore Products
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </button>

                <button
                  onClick={() => onNavigate('services')}
                  className="inline-flex items-center gap-2 rounded-xl border border-navy-200 bg-white px-6 py-3.5 font-semibold text-navy-800 transition hover:border-navy-300 hover:bg-navy-50"
                >
                  <CalendarCheck className="h-5 w-5 text-brand-600" />
                  Book Cleaning
                </button>

                <a
                  href={whatsappLink(
                    'Hello Hitech Solutions, I would like to know more about your products and services.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 font-semibold text-white shadow-[0_12px_30px_rgba(22,163,74,0.25)] transition hover:bg-green-700"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp Now
                </a>
              </div>
            </div>

            {/* RIGHT — signature credentials panel + pinned action rail */}
            <div className="relative hidden lg:block">
              <div className="relative mx-auto max-w-md">
                <div className="rounded-3xl bg-navy-900 p-8 shadow-[0_30px_70px_rgba(15,23,42,0.35)] relative overflow-hidden">
                  <DotGrid dark fade={false} />
                  <div className="relative flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wide">
                    <Sparkles className="h-4 w-4" />
                    Why Hitech Solutions
                  </div>

                  <div className="relative mt-6 grid grid-cols-2 gap-4">
                    {heroStats.map((s, i) => (
                      <div
                        key={s.label}
                        className={`rounded-2xl p-5 ${
                          i === 0 ? 'bg-amber-400 text-navy-900' : 'bg-white/8 text-white'
                        }`}
                      >
                        <p className="text-3xl font-black">{s.value}</p>
                        <p
                          className={`mt-1 text-xs ${
                            i === 0 ? 'text-navy-800/80' : 'text-navy-300'
                          }`}
                        >
                          {s.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="relative mt-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <Droplets className="h-6 w-6 text-brand-400 shrink-0" />
                    <p className="text-sm text-navy-200 leading-snug">
                      Serving Shirdi, Ahilyanagar &amp; nearby regions — homes to
                      industrial facilities.
                    </p>
                  </div>
                </div>

                <div className="absolute top-8 -right-6 flex flex-col gap-3">
                  <a
                    href={callLink}
                    aria-label="Call us"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-navy-900 shadow-[0_10px_25px_rgba(15,23,42,0.25)] transition hover:scale-105"
                  >
                    <Phone className="h-5 w-5" />
                  </a>
                  <a
                    href={whatsappLink('Hello Hitech Solutions, I would like to enquire.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp us"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-[0_10px_25px_rgba(22,163,74,0.3)] transition hover:scale-105"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HIGHLIGHTS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 md:-mt-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((h, i) => (
            <div
              key={h.title}
              className="rounded-2xl bg-white border border-navy-100 p-5 md:p-6 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(15,23,42,0.08)] animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="inline-flex p-3 rounded-2xl bg-navy-900 text-amber-400 mb-3">
                <h.icon className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-semibold text-navy-900">{h.title}</h3>
              <p className="text-sm text-navy-500 mt-1">{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= ABOUT PREVIEW — distinct content: how we operate, not a repeat of the hero ================= */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <DotGrid />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold uppercase tracking-wide px-4 py-1.5 mb-4">
                How We Operate
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-900 mb-4 tracking-tight">
                Built for reliability, not just a one-off clean
              </h2>
              <p className="text-lg text-navy-500 leading-relaxed mb-6">
                Most cleaning suppliers disappear after the invoice. We stay
                on as your ongoing supply partner — restocking on a schedule
                you set, keeping formulas consistent batch to batch, and
                picking up the phone when something's urgent.
              </p>
              <button
                onClick={() => onNavigate('about')}
                className="inline-flex items-center gap-2 rounded-xl bg-navy-900 px-6 py-3.5 font-semibold text-white transition hover:bg-navy-800"
              >
                Learn More About Us
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {differentiators.map((d, i) => (
                <div
                  key={d.title}
                  className="rounded-2xl bg-white border border-navy-100 p-5 animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="inline-flex p-2.5 rounded-xl bg-brand-50 text-brand-600 mb-3">
                    <d.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading font-semibold text-navy-900 text-sm">{d.title}</h3>
                  <p className="text-xs text-navy-500 mt-1 leading-relaxed">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURED SERVICES ================= */}
      <section className="relative overflow-hidden bg-navy-50/60 py-16 md:py-24">
        <DotGrid />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 rounded-full bg-white border border-navy-100 text-brand-700 text-xs font-semibold uppercase tracking-wide px-4 py-1.5 mb-4">
              Our Services
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-900 tracking-tight">
              Professional deep cleaning services
            </h2>
            <p className="text-navy-500 mt-3 max-w-2xl mx-auto">
              We offer specialised cleaning services for every type of space.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredServices.map((s, i) => (
              <div
                key={s.id}
                className="rounded-2xl bg-white border border-navy-100 p-6 transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(15,23,42,0.08)] animate-fade-in-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="inline-flex p-3 rounded-xl bg-navy-900 text-amber-400 mb-4">
                  <Droplets className="h-6 w-6" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-navy-900 mb-2">{s.name}</h3>
                <p className="text-sm text-navy-500 leading-relaxed line-clamp-3">{s.description}</p>
                <button
                  onClick={() => onNavigate('services')}
                  className="mt-4 text-brand-600 font-medium text-sm hover:text-brand-700 flex items-center gap-1"
                >
                  View Details <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-2 rounded-xl bg-navy-900 px-6 py-3.5 font-semibold text-white transition hover:bg-navy-800"
            >
              View All Services
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ================= PRODUCT CATEGORIES ================= */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <DotGrid />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold uppercase tracking-wide px-4 py-1.5 mb-4">
              Our Products
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-900 tracking-tight">
              Wholesale cleaning products
            </h2>
            <p className="text-navy-500 mt-3 max-w-2xl mx-auto">
              Quality cleaning chemicals and disposable products at wholesale prices.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-navy-100 bg-white p-8 transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
              <div className="inline-flex p-3 rounded-2xl bg-navy-900 text-amber-400 mb-4">
                <Droplets className="h-7 w-7" />
              </div>
              <h3 className="font-heading font-bold text-xl text-navy-900 mb-2">Cleaning Chemicals</h3>
              <p className="text-navy-500 mb-4">
                Liquid soap, floor cleaner, toilet cleaner, glass cleaner, phenyl, acid and more — available in Economic & Premium variants.
              </p>
              <button
                onClick={() => onNavigate('products')}
                className="text-brand-600 font-medium flex items-center gap-1 hover:gap-2 transition-all"
              >
                Browse Chemicals <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="rounded-2xl border border-navy-100 bg-white p-8 transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
              <div className="inline-flex p-3 rounded-2xl bg-navy-900 text-amber-400 mb-4">
                <ShoppingBag className="h-7 w-7" />
              </div>
              <h3 className="font-heading font-bold text-xl text-navy-900 mb-2">Disposable Products</h3>
              <p className="text-navy-500 mb-4">
                Containers, silver foils, paper plates, cups, spoons, straws, head caps, sambar bags and more — multiple sizes available.
              </p>
              <button
                onClick={() => onNavigate('products')}
                className="text-brand-600 font-medium flex items-center gap-1 hover:gap-2 transition-all"
              >
                Browse Disposables <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= REVIEWS ================= */}
      <section className="relative overflow-hidden bg-navy-900 py-16 md:py-24">
        <DotGrid dark />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 text-white text-xs font-semibold uppercase tracking-wide px-4 py-1.5 mb-4">
              Testimonials
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white tracking-tight">
              What our clients say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {featuredReviews.map((r, i) => (
              <div
                key={r.id}
                className="rounded-2xl bg-white/[0.06] border border-white/10 p-6 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-navy-200 text-sm leading-relaxed mb-4">"{r.text}"</p>
                <div>
                  <p className="font-semibold text-white">{r.name}</p>
                  <p className="text-xs text-navy-400">{r.location}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button
              onClick={() => onNavigate('reviews')}
              className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 font-semibold text-white transition hover:bg-white/20"
            >
              Read All Reviews
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <DotGrid />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-navy-900 p-8 md:p-14 text-center text-white">
            <DotGrid dark fade={false} />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-400/15 text-amber-400 text-xs font-semibold uppercase tracking-wide px-4 py-1.5 mb-5">
                <Sparkles className="h-3.5 w-3.5" />
                Let's get started
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                Ready for a cleaner space?
              </h2>
              <p className="text-navy-300 text-lg max-w-2xl mx-auto mb-8">
                Contact us today for wholesale product enquiries or to book a professional deep cleaning service.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <a
                  href={callLink}
                  className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-3.5 font-semibold text-navy-900 transition hover:bg-amber-300"
                >
                  <Phone className="h-5 w-5" />
                  Call {businessInfo.phoneDisplay}
                </a>
                <a
                  href={whatsappLink('Hello Hitech Solutions, I would like to enquire about your products and services.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-6 py-3.5 font-semibold text-white transition hover:bg-green-600"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp Us
                </a>
                {totalItems > 0 && (
                  <button
                    onClick={openCart}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 font-semibold text-white transition hover:bg-white/20"
                  >
                    View Enquiry ({totalItems})
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
