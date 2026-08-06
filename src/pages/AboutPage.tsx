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
    <div className="hs-root">
      {/* ---- Design system: fonts, tokens, signature checker-weave texture ---- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@500;700;800&family=Inter:wght@400;500;600&display=swap');

        .hs-root {
          --ink: #16181D;
          --porcelain: #FAFAF9;
          --cloud: #F2F4F7;
          --azure: #0A5FE0;
          --azure-deep: #063E9E;
          --navy: #0B1B33;
          --navy-deep: #061224;
          --brass: #B08D57;
          --line: rgba(11,27,51,0.08);
          font-family: 'Inter', system-ui, sans-serif;
          color: var(--ink);
          background: var(--porcelain);
        }
        .hs-root h1, .hs-root h2, .hs-root h3 {
          font-family: 'Manrope', system-ui, sans-serif;
        }

        /* Signature texture: a fine diagonal checker weave — evokes a folded
           microfiber cloth without being a literal illustration. */
        .hs-weave {
          background-image:
            conic-gradient(from 45deg, rgba(255,255,255,0.10) 90deg, transparent 90deg 180deg, rgba(255,255,255,0.10) 180deg 270deg, transparent 270deg);
          background-size: 22px 22px;
        }
        .hs-weave-dark {
          background-image:
            conic-gradient(from 45deg, rgba(10,95,224,0.07) 90deg, transparent 90deg 180deg, rgba(10,95,224,0.07) 180deg 270deg, transparent 270deg);
          background-size: 22px 22px;
        }
        .hs-swatch {
          background-image:
            conic-gradient(from 45deg, var(--azure) 90deg, transparent 90deg 180deg, var(--azure) 180deg 270deg, transparent 270deg);
          background-size: 10px 10px;
        }

        .hs-glass {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.14);
        }
        .hs-card {
          background: #FFFFFF;
          border: 1px solid var(--line);
          border-radius: 20px;
          box-shadow: 0 1px 2px rgba(11,27,51,0.04), 0 12px 32px -16px rgba(11,27,51,0.12);
          transition: transform 0.35s cubic-bezier(.2,.8,.2,1), box-shadow 0.35s cubic-bezier(.2,.8,.2,1);
        }
        .hs-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 1px 2px rgba(11,27,51,0.05), 0 24px 48px -20px rgba(10,95,224,0.22);
        }
        .hs-btn-primary {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.85rem 1.6rem; border-radius: 980px;
          background: var(--azure); color: white; font-weight: 600; font-size: 0.95rem;
          box-shadow: 0 8px 20px -8px rgba(10,95,224,0.55);
          transition: all 0.25s ease;
        }
        .hs-btn-primary:hover { background: var(--azure-deep); transform: translateY(-1px); }
        .hs-btn-ghost {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.85rem 1.6rem; border-radius: 980px;
          color: white; font-weight: 600; font-size: 0.95rem;
          border: 1px solid rgba(255,255,255,0.35);
          background: rgba(255,255,255,0.06);
          transition: all 0.25s ease;
        }
        .hs-btn-ghost:hover { background: rgba(255,255,255,0.14); }
        .hs-btn-whatsapp {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.85rem 1.6rem; border-radius: 980px;
          background: #17A34A; color: white; font-weight: 600; font-size: 0.95rem;
          box-shadow: 0 8px 20px -8px rgba(23,163,74,0.5);
          transition: all 0.25s ease;
        }
        .hs-btn-whatsapp:hover { background: #128C3E; transform: translateY(-1px); }
        .hs-eyebrow {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-size: 0.78rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
          padding: 0.4rem 0.85rem; border-radius: 980px;
        }
        .hs-fade-up { animation: hsFadeUp 0.7s cubic-bezier(.2,.8,.2,1) both; }
        @keyframes hsFadeUp { from { opacity: 0; transform: translateY(14px);} to { opacity: 1; transform: translateY(0);} }
        @media (prefers-reduced-motion: reduce) {
          .hs-fade-up { animation: none; }
          .hs-card:hover { transform: none; }
        }
      `}</style>

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, var(--navy) 0%, var(--navy-deep) 65%, #041022 100%)' }}>
        <div className="absolute inset-0 hs-weave" />
        <div
          className="absolute -top-32 -right-24 w-[520px] h-[520px] rounded-full opacity-40"
          style={{ background: 'radial-gradient(circle, rgba(10,95,224,0.55) 0%, transparent 70%)', filter: 'blur(10px)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 md:pt-32 md:pb-40">
          <div className="max-w-3xl">
            <span className="hs-eyebrow hs-glass text-white hs-fade-up">
              <Sparkles className="h-3.5 w-3.5" style={{ color: '#7EB2FF' }} />
              Your Trusted Cleaning Partner in Shirdi
            </span>
            <h1
              className="mt-6 text-4xl sm:text-5xl lg:text-[3.6rem] font-extrabold text-white leading-[1.08] tracking-tight hs-fade-up"
              style={{ animationDelay: '0.08s' }}
            >
              Professional cleaning,
              <br />
              engineered for every space.
            </h1>
            <p
              className="mt-6 text-lg md:text-xl leading-relaxed max-w-2xl hs-fade-up"
              style={{ color: 'rgba(255,255,255,0.68)', animationDelay: '0.16s' }}
            >
              Wholesale cleaning chemicals, housekeeping materials and disposable products —
              paired with professional deep-cleaning teams you can book on demand.
            </p>
            <div className="mt-9 flex flex-wrap gap-3 hs-fade-up" style={{ animationDelay: '0.24s' }}>
              <button onClick={() => onNavigate('products')} className="hs-btn-primary">
                <ShoppingBag className="h-4.5 w-4.5" />
                Browse Products
              </button>
              <button onClick={() => onNavigate('services')} className="hs-btn-ghost">
                <CalendarCheck className="h-4.5 w-4.5" />
                Book Cleaning Service
              </button>
              <a
                href={whatsappLink('Hello Hitech Solutions, I would like to know more about your products and services.')}
                target="_blank"
                rel="noopener noreferrer"
                className="hs-btn-whatsapp"
              >
                <MessageCircle className="h-4.5 w-4.5" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HIGHLIGHTS (floating over hero seam) ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 md:-mt-20 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((h, i) => (
            <div
              key={h.title}
              className="hs-card p-5 md:p-6 text-center hs-fade-up"
              style={{ animationDelay: `${0.05 * i}s` }}
            >
              <div
                className="inline-flex p-3 rounded-2xl mb-3"
                style={{ background: 'linear-gradient(135deg, #0A5FE0 0%, #063E9E 100%)', color: 'white' }}
              >
                <h.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold" style={{ fontFamily: 'Manrope', color: 'var(--navy)' }}>{h.title}</h3>
              <p className="text-sm mt-1" style={{ color: '#5B6472' }}>{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="hs-eyebrow" style={{ background: 'rgba(10,95,224,0.08)', color: 'var(--azure-deep)' }}>
              About Hitech Solutions
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight" style={{ color: 'var(--navy)' }}>
              Your one-stop cleaning solutions provider
            </h2>
            <p className="mt-4 text-lg leading-relaxed" style={{ color: '#5B6472' }}>
              We supply high-quality cleaning chemicals, housekeeping materials and disposable
              products, and provide professional deep-cleaning services for homes, offices,
              hotels, restaurants, hospitals, schools, commercial buildings and industries.
            </p>
            <ul className="mt-7 space-y-3.5">
              {[
                'Wholesale cleaning chemicals & housekeeping materials',
                'Disposable products for restaurants & catering',
                'Professional deep cleaning for every space',
                'Serving Shirdi, Ahilyanagar & nearby regions',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 rounded-full p-1" style={{ background: 'rgba(10,95,224,0.1)' }}>
                    <CheckCircle2 className="h-4 w-4" style={{ color: 'var(--azure)' }} />
                  </span>
                  <span style={{ color: 'var(--ink)' }}>{item}</span>
                </li>
              ))}
            </ul>
            <button onClick={() => onNavigate('about')} className="hs-btn-primary mt-9">
              Learn More About Us
              <ArrowRight className="h-4.5 w-4.5" />
            </button>
          </div>

          <div className="relative">
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-2xl hs-swatch opacity-70 hidden md:block" />
            <div className="grid grid-cols-2 gap-4 relative">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className="relative overflow-hidden rounded-2xl p-7 text-center text-white hs-fade-up"
                  style={{
                    background: 'linear-gradient(160deg, var(--navy) 0%, var(--navy-deep) 100%)',
                    animationDelay: `${0.08 * i}s`,
                  }}
                >
                  <div className="absolute inset-0 hs-weave-dark" />
                  <p className="relative text-3xl md:text-4xl font-extrabold" style={{ fontFamily: 'Manrope' }}>{s.value}</p>
                  <p className="relative text-sm mt-1.5" style={{ color: 'rgba(255,255,255,0.65)' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURED SERVICES ================= */}
      <section className="py-20 md:py-28" style={{ background: 'var(--cloud)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="hs-eyebrow" style={{ background: 'rgba(10,95,224,0.08)', color: 'var(--azure-deep)' }}>
              Our Services
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight" style={{ color: 'var(--navy)' }}>
              Professional deep cleaning services
            </h2>
            <p className="mt-3 text-lg max-w-2xl mx-auto" style={{ color: '#5B6472' }}>
              Specialised cleaning services for every type of space.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredServices.map((s, i) => (
              <div
                key={s.id}
                className="hs-card p-7 hs-fade-up"
                style={{ animationDelay: `${0.05 * i}s` }}
              >
                <div
                  className="inline-flex p-3 rounded-xl mb-4"
                  style={{ background: 'linear-gradient(135deg, #0A5FE0 0%, #063E9E 100%)', color: 'white' }}
                >
                  <Droplets className="h-5.5 w-5.5" />
                </div>
                <h3 className="font-semibold text-lg mb-2" style={{ fontFamily: 'Manrope', color: 'var(--navy)' }}>{s.name}</h3>
                <p className="text-sm leading-relaxed line-clamp-3" style={{ color: '#5B6472' }}>{s.description}</p>
                <button
                  onClick={() => onNavigate('services')}
                  className="mt-5 font-semibold text-sm flex items-center gap-1.5"
                  style={{ color: 'var(--azure)' }}
                >
                  View Details <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button onClick={() => onNavigate('services')} className="hs-btn-primary">
              View All Services
              <ArrowRight className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ================= PRODUCT CATEGORIES ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="text-center mb-14">
          <span className="hs-eyebrow" style={{ background: 'rgba(176,141,87,0.12)', color: 'var(--brass)' }}>
            Our Products
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight" style={{ color: 'var(--navy)' }}>
            Wholesale cleaning products
          </h2>
          <p className="mt-3 text-lg max-w-2xl mx-auto" style={{ color: '#5B6472' }}>
            Quality cleaning chemicals and disposable products at wholesale prices.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="hs-card p-9 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-28 h-28 hs-swatch opacity-[0.15]" />
            <div
              className="inline-flex p-3.5 rounded-2xl mb-5"
              style={{ background: 'linear-gradient(135deg, #0A5FE0 0%, #063E9E 100%)', color: 'white' }}
            >
              <Droplets className="h-6.5 w-6.5" />
            </div>
            <h3 className="text-xl font-bold mb-2.5" style={{ fontFamily: 'Manrope', color: 'var(--navy)' }}>Cleaning Chemicals</h3>
            <p className="mb-5 leading-relaxed" style={{ color: '#5B6472' }}>
              Liquid soap, floor cleaner, toilet cleaner, glass cleaner, phenyl, acid and more —
              available in Economic &amp; Premium variants.
            </p>
            <button onClick={() => onNavigate('products')} className="font-semibold flex items-center gap-1.5" style={{ color: 'var(--azure)' }}>
              Browse Chemicals <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="hs-card p-9 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-28 h-28 hs-swatch opacity-[0.15]" />
            <div
              className="inline-flex p-3.5 rounded-2xl mb-5"
              style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-deep) 100%)', color: 'white' }}
            >
              <ShoppingBag className="h-6.5 w-6.5" />
            </div>
            <h3 className="text-xl font-bold mb-2.5" style={{ fontFamily: 'Manrope', color: 'var(--navy)' }}>Disposable Products</h3>
            <p className="mb-5 leading-relaxed" style={{ color: '#5B6472' }}>
              Containers, silver foils, paper plates, cups, spoons, straws, head caps, sambar
              bags and more — multiple sizes available.
            </p>
            <button onClick={() => onNavigate('products')} className="font-semibold flex items-center gap-1.5" style={{ color: 'var(--azure)' }}>
              Browse Disposables <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ================= REVIEWS ================= */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, var(--navy) 0%, var(--navy-deep) 100%)' }}>
        <div className="absolute inset-0 hs-weave" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="hs-eyebrow hs-glass text-white">Testimonials</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-white tracking-tight">What our clients say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {featuredReviews.map((r, i) => (
              <div
                key={r.id}
                className="hs-glass rounded-2xl p-7 hs-fade-up"
                style={{ animationDelay: `${0.08 * i}s` }}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} className="h-4.5 w-4.5" style={{ fill: '#D9B65B', color: '#D9B65B' }} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.78)' }}>"{r.text}"</p>
                <div>
                  <p className="font-semibold text-white" style={{ fontFamily: 'Manrope' }}>{r.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>{r.location}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button onClick={() => onNavigate('reviews')} className="hs-btn-ghost">
              Read All Reviews
              <ArrowRight className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div
          className="relative overflow-hidden rounded-[28px] p-9 md:p-16 text-center text-white"
          style={{ background: 'linear-gradient(135deg, #0A5FE0 0%, #063E9E 100%)' }}
        >
          <div className="absolute inset-0 hs-weave opacity-60" />
          <div
            className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full opacity-40"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)' }}
          />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">
              Ready for a cleaner space?
            </h2>
            <p className="text-lg max-w-2xl mx-auto mb-9" style={{ color: 'rgba(255,255,255,0.85)' }}>
              Contact us today for wholesale product enquiries or to book a professional deep
              cleaning service.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href={callLink} className="hs-btn-primary" style={{ background: 'white', color: 'var(--azure-deep)', boxShadow: 'none' }}>
                <MessageCircle className="h-4.5 w-4.5" />
                Call {businessInfo.phoneDisplay}
              </a>
              <a
                href={whatsappLink('Hello Hitech Solutions, I would like to enquire about your products and services.')}
                target="_blank"
                rel="noopener noreferrer"
                className="hs-btn-whatsapp"
              >
                <MessageCircle className="h-4.5 w-4.5" />
                WhatsApp Us
              </a>
              {totalItems > 0 && (
                <button onClick={openCart} className="hs-btn-ghost">
                  View Enquiry ({totalItems})
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}