
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
  ArrowRight,
  Building2,
  Star,
} from 'lucide-react';

import {
  businessInfo,
  callLink,
  emailLink,
  mapsLink,
} from '@/data/business';

import type { Page } from '@/types';

interface AboutPageProps {
  onNavigate: (page: Page) => void;
}

/* -------------------------------------------------------
   Premium Background Grid
------------------------------------------------------- */

function DotGrid({
  dark = false,
  fade = true,
}: {
  dark?: boolean;
  fade?: boolean;
}) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `radial-gradient(
          ${dark
            ? 'rgba(255,255,255,0.13)'
            : 'rgba(15,23,42,0.075)'} 1px,
          transparent 1px
        )`,
        backgroundSize: '28px 28px',
        ...(fade
          ? {
              maskImage:
                'radial-gradient(ellipse 90% 75% at 50% 25%, black 25%, transparent 100%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 90% 75% at 50% 25%, black 25%, transparent 100%)',
            }
          : {}),
      }}
    />
  );
}

/* -------------------------------------------------------
   Premium Section Heading
------------------------------------------------------- */

function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-3xl mx-auto text-center">
      <div
        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] ${
          light
            ? 'bg-white/10 text-amber-200 border border-white/10'
            : 'bg-brand-50 text-brand-700 border border-brand-100'
        }`}
      >
        <Sparkles className="h-3.5 w-3.5" />
        {eyebrow}
      </div>

      <h2
        className={`mt-5 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${
          light ? 'text-white' : 'text-navy-950'
        }`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mt-5 text-base sm:text-lg leading-8 ${
            light ? 'text-navy-200' : 'text-navy-500'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------
   Page
------------------------------------------------------- */

export default function AboutPage({ onNavigate }: AboutPageProps) {
  const whyChooseUs = [
    {
      icon: ShieldCheck,
      number: '01',
      title: 'Premium Quality',
      desc: 'Professional-grade cleaning products carefully selected for performance, reliability, and consistent results.',
    },
    {
      icon: Truck,
      number: '02',
      title: 'Wholesale Pricing',
      desc: 'Competitive B2B pricing designed for hotels, offices, hospitals, restaurants, institutions, and industries.',
    },
    {
      icon: Award,
      number: '03',
      title: 'Expert Teams',
      desc: 'Experienced cleaning professionals equipped to handle demanding commercial and residential environments.',
    },
    {
      icon: Users,
      number: '04',
      title: 'Customer First',
      desc: 'We focus on dependable service and long-term relationships rather than one-time transactions.',
    },
    {
      icon: Clock,
      number: '05',
      title: 'Reliable Service',
      desc: 'Professional coordination and punctual execution to keep your cleaning operations running smoothly.',
    },
    {
      icon: Sparkles,
      number: '06',
      title: 'Complete Solutions',
      desc: 'Cleaning chemicals, housekeeping supplies, disposables, and professional services from one trusted partner.',
    },
  ];

  return (
    <div className="overflow-hidden bg-white text-navy-900">

      {/* =====================================================
          HERO
      ===================================================== */}

        <section className="relative isolate overflow-hidden bg-hero">
          <div className="absolute inset-0 hero-overlay" />
          <DotGrid dark />

          {/* Decorative glow */}
          <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-brand-500/15 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            {/* Compact Hero */}
            <div className="min-h-[360px] md:min-h-[400px] flex items-center justify-center py-12 md:py-14">
              <div className="max-w-4xl text-center">

                {/* Location badge */}
                <div
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3.5 py-1.5 text-xs sm:text-sm text-amber-100 backdrop-blur-xl animate-fade-in-up"
                >
                  <MapPin className="h-3.5 w-3.5 text-brand-400" />
                  Shirdi, Maharashtra
                </div>

                {/* Heading */}
                <h1
                  className="mt-5 font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-white animate-fade-in-up"
                  style={{ animationDelay: '0.05s' }}
                >
                  Cleaning Solutions
                  <span className="block bg-gradient-to-r from-brand-300 via-amber-200 to-brand-400 bg-clip-text text-transparent">
                    Built Around You.
                  </span>
                </h1>

                <p
                  className="mx-auto mt-4 max-w-2xl text-sm sm:text-base md:text-lg leading-7 text-navy-100 animate-fade-in-up"
                  style={{ animationDelay: '0.12s' }}
                >
                  Hitech Solutions combines professional cleaning services
                  with premium wholesale products to help homes and businesses
                  maintain cleaner, healthier spaces.
                </p>

                {/* CTA */}
                <div
                  className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in-up"
                  style={{ animationDelay: '0.2s' }}
                >
                  <button
                    onClick={() => onNavigate('contact')}
                    className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-brand-500 px-5 py-3 font-semibold text-sm text-white shadow-xl shadow-brand-900/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-400"
                  >
                    Talk to Our Team
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  <a
                    href={callLink}
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-5 py-3 font-semibold text-sm text-white backdrop-blur-md transition-all duration-300 hover:bg-white/10"
                  >
                    <Phone className="h-4 w-4" />
                    {businessInfo.phoneDisplay}
                  </a>
                </div>

                {/* Trust indicators */}
                <div
                  className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-navy-200 animate-fade-in-up"
                  style={{ animationDelay: '0.28s' }}
                >
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    Professional Service
                  </span>

                  <span className="hidden sm:block h-4 w-px bg-white/15" />

                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    Wholesale Solutions
                  </span>

                  <span className="hidden sm:block h-4 w-px bg-white/15" />

                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    Trusted Locally
                  </span>
                </div>

              </div>
            </div>

          </div>

          {/* Bottom wave */}
          <svg
            className="relative block h-8 w-full md:h-10"
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            fill="white"
          >
            <path d="M0,45 C300,85 650,0 1000,32 C1190,50 1320,58 1440,30 L1440,80 L0,80 Z" />
          </svg>
        </section>
      {/* =====================================================
          COMPANY INTRO
      ===================================================== */}

      <section className="relative overflow-hidden py-20 md:py-28">
        <DotGrid />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">

            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-700">
                <Building2 className="h-3.5 w-3.5" />
                Who We Are
              </div>

              <h2 className="mt-5 max-w-2xl font-heading text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-navy-950">
                A complete partner for
                <span className="text-brand-600"> cleaner spaces.</span>
              </h2>

              <div className="mt-6 space-y-5 text-base leading-8 text-navy-600">
                <p>
                  Hitech Solutions is a wholesale supplier of cleaning
                  chemicals, housekeeping materials, and disposable products,
                  based in Shirdi, Ahilyanagar, Maharashtra.
                </p>

                <p>
                  Alongside our product range, we provide professional deep
                  cleaning services for homes, offices, hotels, restaurants,
                  hospitals, schools, commercial buildings, industries, and
                  businesses.
                </p>
              </div>

              {/* Mini trust row */}
              <div className="mt-8 flex flex-wrap gap-3">
                <div className="rounded-xl border border-navy-100 bg-white px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-brand-600" />
                    <span className="text-sm font-semibold text-navy-800">
                      Growing Business
                    </span>
                  </div>
                </div>

                <div className="rounded-xl border border-navy-100 bg-white px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-brand-600" />
                    <span className="text-sm font-semibold text-navy-800">
                      Shirdi, Maharashtra
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature panel */}
            <div className="relative">

              <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-brand-500/10 via-transparent to-navy-900/10 blur-2xl" />

              <div className="relative grid grid-cols-2 gap-3 sm:gap-4">

                {[
                  {
                    icon: Truck,
                    title: 'Wholesale',
                    desc: 'Cleaning Products',
                    accent: true,
                  },
                  {
                    icon: Sparkles,
                    title: 'Deep',
                    desc: 'Cleaning Services',
                    accent: false,
                  },
                  {
                    icon: ShieldCheck,
                    title: 'Premium',
                    desc: 'Quality Assured',
                    accent: false,
                  },
                  {
                    icon: Users,
                    title: 'B2B & B2C',
                    desc: 'All Welcome',
                    accent: true,
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className={`group relative min-h-[175px] overflow-hidden rounded-2xl p-6 text-white shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${
                      item.accent
                        ? 'bg-gradient-to-br from-brand-600 to-brand-800'
                        : 'bg-gradient-to-br from-navy-800 to-navy-950'
                    }`}
                  >
                    <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/10 blur-2xl transition-transform duration-500 group-hover:scale-150" />

                    <item.icon className="relative h-9 w-9 text-white/90" />

                    <div className="relative mt-8">
                      <p className="font-heading text-xl font-bold">
                        {item.title}
                      </p>

                      <p
                        className={`mt-1 text-sm ${
                          item.accent
                            ? 'text-brand-100'
                            : 'text-navy-200'
                        }`}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MISSION / VISION
      ===================================================== */}

      <section className="relative overflow-hidden bg-navy-50 py-10 md:py-28">
        <DotGrid />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <SectionHeading
            eyebrow="Our Direction"
            title="Built on purpose. Driven by quality."
            description="Everything we do is focused on delivering dependable cleaning solutions and creating lasting customer relationships."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2">

            {/* Mission */}
            <div className="group relative overflow-hidden rounded-3xl border border-navy-100 bg-white p-7 sm:p-9 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-brand-500/5 blur-3xl transition-all duration-500 group-hover:bg-brand-500/10" />

              <div className="relative">
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                    <Target className="h-7 w-7" />
                  </div>

                  <span className="font-heading text-5xl font-bold text-navy-100">
                    01
                  </span>
                </div>

                <h3 className="mt-7 font-heading text-2xl font-bold text-navy-950">
                  Our Mission
                </h3>

                <p className="mt-4 leading-8 text-navy-600">
                  To provide high-quality cleaning products and professional
                  deep cleaning services at competitive wholesale prices,
                  helping our customers maintain clean, hygienic, and healthy
                  spaces — whether at home, at work, or in commercial and
                  industrial environments.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="group relative overflow-hidden rounded-3xl border border-navy-100 bg-white p-7 sm:p-9 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-navy-500/5 blur-3xl transition-all duration-500 group-hover:bg-navy-500/10" />

              <div className="relative">
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-100 text-navy-700">
                    <Eye className="h-7 w-7" />
                  </div>

                  <span className="font-heading text-5xl font-bold text-navy-100">
                    02
                  </span>
                </div>

                <h3 className="mt-7 font-heading text-2xl font-bold text-navy-950">
                  Our Vision
                </h3>

                <p className="mt-4 leading-8 text-navy-600">
                  To become the most trusted and preferred cleaning solutions
                  provider in Shirdi and the surrounding region — known for
                  product quality, service excellence, and unwavering
                  commitment to customer satisfaction.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          WHY CHOOSE US
      ===================================================== */}

      <section className="relative overflow-hidden py-20 md:py-28">
        <DotGrid />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <SectionHeading
            eyebrow="Why Hitech Solutions"
            title="The advantage of having one trusted partner."
            description="From everyday cleaning supplies to professional deep cleaning, we bring products, people, and service together."
          />

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {whyChooseUs.map((item, index) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border border-navy-100 bg-white p-6 sm:p-7 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl animate-fade-in-up"
                style={{
                  animationDelay: `${index * 0.07}s`,
                }}
              >
                {/* Number */}
                <div className="absolute right-5 top-5 font-heading text-4xl font-bold text-navy-50 transition-colors group-hover:text-brand-50">
                  {item.number}
                </div>

                {/* Icon */}
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-all duration-300 group-hover:bg-brand-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand-600/20">
                  <item.icon className="h-6 w-6" />
                </div>

                <h3 className="relative mt-6 font-heading text-lg font-bold text-navy-950">
                  {item.title}
                </h3>

                <p className="relative mt-2 text-sm leading-7 text-navy-500">
                  {item.desc}
                </p>

                <div className="mt-5 flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-brand-600 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Hitech Advantage
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* =====================================================
          PREMIUM TRUST BANNER
      ===================================================== */}

      <section className="relative overflow-hidden bg-navy-950 py-16 md:py-20">
        <DotGrid dark fade={false} />

        <div className="absolute -left-32 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-brand-500/10 blur-3xl" />
        <div className="absolute -right-32 top-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">

            <div>
              <div className="flex items-center gap-2 text-brand-300">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-xs font-bold uppercase tracking-[0.18em]">
                  Trusted Cleaning Partner
                </span>
              </div>

              <h2 className="mt-4 max-w-3xl font-heading text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Cleaner spaces start with
                <span className="text-brand-400"> better solutions.</span>
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-navy-300">
                Whether you need products in bulk or professional cleaning
                services, our team is ready to help you find the right
                solution.
              </p>
            </div>

            <button
              onClick={() => onNavigate('contact')}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-6 py-3.5 font-semibold text-white shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-400"
            >
              Get in Touch
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>

          </div>
        </div>
      </section>

      {/* =====================================================
          BUSINESS + CONTACT
      ===================================================== */}

      <section className="relative overflow-hidden bg-navy-50 py-20 md:py-28">
        <DotGrid />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <SectionHeading
            eyebrow="Visit & Connect"
            title="We're here when you need us."
            description="Reach out to discuss cleaning products, deep cleaning services, or your business requirements."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2">

            {/* Business hours */}
            <div className="rounded-3xl border border-navy-100 bg-white p-7 sm:p-9 shadow-sm">

              <div className="flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                  <Clock className="h-7 w-7" />
                </div>

                <div className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                  Open All Days
                </div>
              </div>

              <h3 className="mt-7 font-heading text-2xl font-bold text-navy-950">
                Business Hours
              </h3>

              <div className="mt-6 rounded-2xl border border-navy-100 bg-navy-50/70 p-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-medium text-navy-700">
                    Monday – Sunday
                  </span>

                  <span className="font-bold text-brand-700">
                    {businessInfo.hours}
                  </span>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 text-sm text-navy-500">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Available throughout the week
              </div>
            </div>

            {/* Contact */}
            <div className="rounded-3xl border border-navy-100 bg-white p-7 sm:p-9 shadow-sm">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                <Phone className="h-7 w-7" />
              </div>

              <h3 className="mt-7 font-heading text-2xl font-bold text-navy-950">
                Contact Details
              </h3>

              <div className="mt-6 space-y-4">

                <a
                  href={mapsLink}
                  className="group flex items-start gap-4 rounded-xl p-3 -mx-3 transition-colors hover:bg-navy-50"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    <MapPin className="h-4 w-4" />
                  </div>

                  <span className="text-sm leading-6 text-navy-600 group-hover:text-brand-700">
                    {businessInfo.address.line1},{' '}
                    {businessInfo.address.line2},{' '}
                    {businessInfo.address.city},{' '}
                    {businessInfo.address.district},{' '}
                    {businessInfo.address.state} –{' '}
                    {businessInfo.address.pincode}
                  </span>
                </a>

                <a
                  href={callLink}
                  className="group flex items-center gap-4 rounded-xl p-3 -mx-3 transition-colors hover:bg-navy-50"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    <Phone className="h-4 w-4" />
                  </div>

                  <span className="font-medium text-navy-700 group-hover:text-brand-700">
                    {businessInfo.phoneDisplay}
                  </span>
                </a>

                <a
                  href={emailLink}
                  className="group flex items-center gap-4 rounded-xl p-3 -mx-3 transition-colors hover:bg-navy-50"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    <Mail className="h-4 w-4" />
                  </div>

                  <span className="break-all text-sm text-navy-700 group-hover:text-brand-700">
                    {businessInfo.email}
                  </span>
                </a>

              </div>

              <button
                onClick={() => onNavigate('contact')}
                className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-navy-950 px-5 py-3.5 font-semibold text-white transition-all duration-300 hover:bg-brand-600"
              >
                Contact Us
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

    </div>
  );
}
