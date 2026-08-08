import {
  Target,
  Eye,
  CheckCircle2,
  Award,
  Users,
  Clock,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Truck,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { businessInfo, callLink, emailLink, mapsLink } from '@/data/business';
import type { Page } from '@/types';

interface AboutPageProps {
  onNavigate: (page: Page) => void;
}

/**
 * Minute grid texture — a fine dot grid, rendered as a radial-gradient
 * background rather than an SVG pattern. Kept deliberately subtle (small
 * dots, low opacity) so it reads as material/depth rather than decoration.
 * Reused across sections for a cohesive, premium surface treatment instead
 * of one flat background.
 */
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

export default function AboutPage({ onNavigate }: AboutPageProps) {
  const whyChooseUs = [
    { icon: ShieldCheck, title: 'Premium Quality', desc: 'We supply only high-quality, professional-grade cleaning products.' },
    { icon: Truck, title: 'Wholesale Pricing', desc: 'Best wholesale prices for businesses, hotels, and industries.' },
    { icon: Award, title: 'Expert Teams', desc: 'Trained and experienced cleaning professionals for every job.' },
    { icon: Users, title: 'Customer First', desc: 'We build long-term relationships with our clients.' },
    { icon: Clock, title: 'On-Time Service', desc: 'Punctual and reliable service, every single time.' },
    { icon: Sparkles, title: 'Complete Solutions', desc: 'Products and services under one roof — your one-stop shop.' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-hero relative overflow-hidden">
        <div className="absolute inset-0 hero-overlay" />
        <DotGrid dark />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
          <span
            className="badge bg-white/10 text-amber-200 border border-white/15 mb-4 animate-fade-in-up backdrop-blur-sm"
          >
            Shirdi, Maharashtra
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
            About Hitech Solutions
          </h1>
          <p className="mt-4 text-lg text-navy-100 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            Your trusted partner for wholesale cleaning products and professional deep cleaning services.
          </p>
        </div>
        <svg className="w-full h-12 md:h-16 relative" viewBox="0 0 1440 80" preserveAspectRatio="none" fill="white">
          <path d="M0,40 C320,80 720,0 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </section>

      {/* Who We Are */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 overflow-hidden">
        <div className="hidden md:block absolute inset-0">
          <DotGrid />
        </div>
        <div className="relative grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="badge bg-brand-50 text-brand-700 mb-4">Who We Are</span>
            <h2 className="section-title mb-4">A Complete Cleaning Solutions Provider</h2>
            <p className="section-subtitle mb-4">
              Hitech Solutions is a wholesale supplier of cleaning chemicals, housekeeping materials, and disposable products, based in Shirdi, Ahilyanagar, Maharashtra. We also provide professional deep cleaning services for a wide range of clients.
            </p>
            <p className="section-subtitle mb-6">
              We serve homes, offices, hotels, restaurants, hospitals, schools, commercial buildings, industries, and businesses — delivering quality products and reliable service that our customers can trust.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-navy-700">
                <TrendingUp className="h-5 w-5 text-brand-600" />
                <span className="font-medium">Growing Business</span>
              </div>
              <div className="flex items-center gap-2 text-navy-700">
                <MapPin className="h-5 w-5 text-brand-600" />
                <span className="font-medium">Shirdi, Maharashtra</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="group relative overflow-hidden bg-gradient-to-br from-brand-600 to-brand-800 rounded-2xl p-6 text-white text-center transition-transform duration-300 hover:-translate-y-1">
              <DotGrid dark />
              <Truck className="relative h-10 w-10 mx-auto mb-2" />
              <p className="relative font-heading text-2xl font-bold">Wholesale</p>
              <p className="relative text-sm text-brand-100">Cleaning Products</p>
            </div>
            <div className="group relative overflow-hidden bg-gradient-to-br from-navy-800 to-navy-900 rounded-2xl p-6 text-white text-center transition-transform duration-300 hover:-translate-y-1">
              <DotGrid dark />
              <Sparkles className="relative h-10 w-10 mx-auto mb-2" />
              <p className="relative font-heading text-2xl font-bold">Deep</p>
              <p className="relative text-sm text-navy-200">Cleaning Services</p>
            </div>
            <div className="group relative overflow-hidden bg-gradient-to-br from-navy-800 to-navy-900 rounded-2xl p-6 text-white text-center transition-transform duration-300 hover:-translate-y-1">
              <DotGrid dark />
              <ShieldCheck className="relative h-10 w-10 mx-auto mb-2" />
              <p className="relative font-heading text-2xl font-bold">Premium</p>
              <p className="relative text-sm text-navy-200">Quality Assured</p>
            </div>
            <div className="group relative overflow-hidden bg-gradient-to-br from-brand-600 to-brand-800 rounded-2xl p-6 text-white text-center transition-transform duration-300 hover:-translate-y-1">
              <DotGrid dark />
              <Users className="relative h-10 w-10 mx-auto mb-2" />
              <p className="relative font-heading text-2xl font-bold">B2B & B2C</p>
              <p className="relative text-sm text-brand-100">All Welcome</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative bg-navy-50 py-16 md:py-20 overflow-hidden">
        <DotGrid />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-8 relative overflow-hidden border-t-2 border-t-brand-500">
              <div className="inline-flex p-3 rounded-2xl bg-brand-50 text-brand-600 mb-4">
                <Target className="h-7 w-7" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-navy-900 mb-3">Our Mission</h3>
              <p className="text-navy-600 leading-relaxed">
                To provide high-quality cleaning products and professional deep cleaning services at competitive wholesale prices, helping our customers maintain clean, hygienic, and healthy spaces — whether at home, at work, or in commercial and industrial environments.
              </p>
            </div>
            <div className="card p-8 relative overflow-hidden border-t-2 border-t-navy-700">
              <div className="inline-flex p-3 rounded-2xl bg-navy-100 text-navy-700 mb-4">
                <Eye className="h-7 w-7" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-navy-900 mb-3">Our Vision</h3>
              <p className="text-navy-600 leading-relaxed">
                To become the most trusted and preferred cleaning solutions provider in Shirdi and the surrounding region — known for product quality, service excellence, and unwavering commitment to customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 overflow-hidden">
        <div className="hidden lg:block absolute inset-0">
          <DotGrid />
        </div>
        <div className="relative text-center mb-12">
          <span className="badge bg-brand-50 text-brand-700 mb-4">Why Choose Us</span>
          <h2 className="section-title">The Hitech Solutions Advantage</h2>
          <p className="section-subtitle mt-3 max-w-2xl mx-auto">
            We combine quality products with professional service to deliver complete cleaning solutions.
          </p>
        </div>
        <div className="relative grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyChooseUs.map((w, i) => (
            <div
              key={w.title}
              className="card-hover p-6 animate-fade-in-up group"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="inline-flex p-3 rounded-xl bg-brand-50 text-brand-600 mb-4 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
                <w.icon className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-navy-900 mb-2">{w.title}</h3>
              <p className="text-sm text-navy-500 leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Business Hours & Contact */}
      <section className="relative bg-navy-50 py-16 md:py-20 overflow-hidden">
        <DotGrid />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Hours */}
            <div className="card p-8">
              <div className="inline-flex p-3 rounded-2xl bg-brand-50 text-brand-600 mb-4">
                <Clock className="h-7 w-7" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-navy-900 mb-4">Business Hours</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2 border-b border-navy-100">
                  <span className="text-navy-700 font-medium">Monday – Sunday</span>
                  <span className="text-brand-700 font-semibold">{businessInfo.hours}</span>
                </div>
                <div className="flex items-center gap-2 pt-2 text-sm text-navy-500">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Open all days of the week
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="card p-8">
              <div className="inline-flex p-3 rounded-2xl bg-brand-50 text-brand-600 mb-4">
                <Phone className="h-7 w-7" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-navy-900 mb-4">Contact Details</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-brand-600 shrink-0 mt-0.5" />
                  <span className="text-navy-700 text-sm">
                    {businessInfo.address.line1}, {businessInfo.address.line2}, {businessInfo.address.city}, {businessInfo.address.district}, {businessInfo.address.state} – {businessInfo.address.pincode}
                  </span>
                </li>
                <li>
                  <a href={callLink} className="flex items-center gap-3 text-navy-700 hover:text-brand-600 transition-colors">
                    <Phone className="h-5 w-5 text-brand-600" />
                    {businessInfo.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={emailLink} className="flex items-center gap-3 text-navy-700 hover:text-brand-600 transition-colors break-all">
                    <Mail className="h-5 w-5 text-brand-600 shrink-0" />
                    {businessInfo.email}
                  </a>
                </li>
              </ul>
              <button onClick={() => onNavigate('contact')} className="btn-primary mt-5">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}