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
} from 'lucide-react';
import { businessInfo, whatsappLink, callLink } from '@/data/business';
import { useServices, useApprovedReviews } from '@/hooks/useSupabaseData';
import { useEnquiry } from '@/context/EnquiryContext';
import type { Page } from '@/types';

interface HomePageProps {
  onNavigate: (page: Page) => void;
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

  const stats = [
    { value: '16+', label: 'Cleaning Services' },
    { value: '20+', label: 'Products' },
    { value: '9 AM–9 PM', label: 'Business Hours' },
    { value: '100%', label: 'Customer Focus' },
  ];

  const featuredServices = services.slice(0, 6);
  const featuredReviews = reviews.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-hero overflow-hidden">
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 section-pattern opacity-30" />
        <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
          <div className="max-w-3xl">
            <span className="badge glass text-white mb-5 animate-fade-in">
              <Sparkles className="h-4 w-4" />
              Your Trusted Cleaning Partner in Shirdi
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight animate-fade-in-up">
              Professional Cleaning Solutions For Every Space
            </h1>
            <p className="mt-5 text-lg md:text-xl text-navy-100 leading-relaxed max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Wholesale cleaning chemicals, housekeeping materials, disposable products and professional deep cleaning services.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <button onClick={() => onNavigate('products')} className="btn-primary">
                <ShoppingBag className="h-5 w-5" />
                Browse Products
              </button>
              <button onClick={() => onNavigate('services')} className="btn-secondary !bg-white/10 !text-white !border-white/30 hover:!bg-white/20">
                <CalendarCheck className="h-5 w-5" />
                Book Cleaning Service
              </button>
              <a
                href={whatsappLink('Hello Hitech Solutions, I would like to know more about your products and services.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
        {/* Wave divider */}
        <div className="relative">
          <svg className="w-full h-12 md:h-20" viewBox="0 0 1440 80" preserveAspectRatio="none" fill="white">
            <path d="M0,40 C320,80 720,0 1440,40 L1440,80 L0,80 Z" />
          </svg>
        </div>
      </section>

      {/* Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 md:-mt-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((h, i) => (
            <div
              key={h.title}
              className="card p-5 md:p-6 text-center animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="inline-flex p-3 rounded-2xl bg-brand-50 text-brand-600 mb-3">
                <h.icon className="h-7 w-7" />
              </div>
              <h3 className="font-heading font-semibold text-navy-900">{h.title}</h3>
              <p className="text-sm text-navy-500 mt-1">{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="badge bg-brand-50 text-brand-700 mb-4">About Hitech Solutions</span>
            <h2 className="section-title mb-4">Your One-Stop Cleaning Solutions Provider</h2>
            <p className="section-subtitle mb-6">
              Hitech Solutions supplies high-quality cleaning chemicals, housekeeping materials, disposable products, and provides professional deep cleaning services for homes, offices, hotels, restaurants, hospitals, schools, commercial buildings, industries, and businesses.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Wholesale cleaning chemicals & housekeeping materials',
                'Disposable products for restaurants & catering',
                'Professional deep cleaning for every space',
                'Serving Shirdi, Ahilyanagar & nearby regions',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-600 shrink-0 mt-0.5" />
                  <span className="text-navy-700">{item}</span>
                </li>
              ))}
            </ul>
            <button onClick={() => onNavigate('about')} className="btn-primary">
              Learn More About Us
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="bg-gradient-to-br from-navy-900 to-brand-800 rounded-2xl p-6 text-center text-white animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <p className="font-heading text-3xl md:text-4xl font-bold text-white">{s.value}</p>
                <p className="text-sm text-navy-200 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured services */}
      <section className="bg-navy-50 py-16 md:py-24 section-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="badge bg-brand-100 text-brand-700 mb-4">Our Services</span>
            <h2 className="section-title">Professional Deep Cleaning Services</h2>
            <p className="section-subtitle mt-3 max-w-2xl mx-auto">
              We offer specialised cleaning services for every type of space.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredServices.map((s, i) => (
              <div
                key={s.id}
                className="card-hover p-6 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="inline-flex p-3 rounded-xl bg-brand-50 text-brand-600 mb-4">
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
            <button onClick={() => onNavigate('services')} className="btn-primary">
              View All Services
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Product categories preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <span className="badge bg-brand-50 text-brand-700 mb-4">Our Products</span>
          <h2 className="section-title">Wholesale Cleaning Products</h2>
          <p className="section-subtitle mt-3 max-w-2xl mx-auto">
            Quality cleaning chemicals and disposable products at wholesale prices.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card-hover p-8 bg-gradient-to-br from-brand-50 to-white">
            <div className="inline-flex p-3 rounded-2xl bg-brand-600 text-white mb-4">
              <Droplets className="h-7 w-7" />
            </div>
            <h3 className="font-heading font-bold text-xl text-navy-900 mb-2">Cleaning Chemicals</h3>
            <p className="text-navy-500 mb-4">
              Liquid soap, floor cleaner, toilet cleaner, glass cleaner, phenyl, acid and more — available in Economic & Premium variants.
            </p>
            <button onClick={() => onNavigate('products')} className="text-brand-600 font-medium flex items-center gap-1 hover:gap-2 transition-all">
              Browse Chemicals <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="card-hover p-8 bg-gradient-to-br from-navy-50 to-white">
            <div className="inline-flex p-3 rounded-2xl bg-navy-700 text-white mb-4">
              <ShoppingBag className="h-7 w-7" />
            </div>
            <h3 className="font-heading font-bold text-xl text-navy-900 mb-2">Disposable Products</h3>
            <p className="text-navy-500 mb-4">
              Containers, silver foils, paper plates, cups, spoons, straws, head caps, sambar bags and more — multiple sizes available.
            </p>
            <button onClick={() => onNavigate('products')} className="text-brand-600 font-medium flex items-center gap-1 hover:gap-2 transition-all">
              Browse Disposables <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Reviews preview */}
      <section className="bg-navy-900 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="badge glass text-white mb-4">Testimonials</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">What Our Clients Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {featuredReviews.map((r, i) => (
              <div
                key={r.id}
                className="glass-dark rounded-2xl p-6 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} className="h-5 w-5 fill-gold-500 text-gold-500" />
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
            <button onClick={() => onNavigate('reviews')} className="btn-secondary !bg-white/10 !text-white !border-white/30 hover:!bg-white/20">
              Read All Reviews
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA 
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-3xl p-8 md:p-14 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 section-pattern opacity-20" />
          <div className="relative">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Ready for a Cleaner Space?
            </h2>
            <p className="text-brand-100 text-lg max-w-2xl mx-auto mb-8">
              Contact us today for wholesale product enquiries or to book a professional deep cleaning service.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href={callLink} className="btn-secondary !bg-white !text-brand-700 !border-white">
                <MessageCircle className="h-5 w-5" />
                Call {businessInfo.phoneDisplay}
              </a>
              <a
                href={whatsappLink('Hello Hitech Solutions, I would like to enquire about your products and services.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Us
              </a>
              {totalItems > 0 && (
                <button onClick={openCart} className="btn-secondary !bg-white/10 !text-white !border-white/30 hover:!bg-white/20">
                  View Enquiry ({totalItems})
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
      */}
    </div>
  );
}
