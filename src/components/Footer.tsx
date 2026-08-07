import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Facebook,
  Instagram,
  Linkedin,
  ArrowUpRight,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import {
  businessInfo,
  callLink,
  emailLink,
  whatsappLink,
  mapsLink,
} from '@/data/business';
import type { Page } from '@/types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const go = (page: Page) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks: { label: string; page: Page }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About Us', page: 'about' },
    { label: 'Products', page: 'products' },
    { label: 'Services', page: 'services' },
    { label: 'Reviews', page: 'reviews' },
    { label: 'Contact', page: 'contact' },
  ];

  const services = [
    'Home Deep Cleaning',
    'Office Deep Cleaning',
    'Commercial Cleaning',
    'Hotel & Restaurant Cleaning',
    'Industrial Cleaning',
    'Hospital & School Cleaning',
  ];

  const socialLinks = [
    {
      label: 'Facebook',
      href: 'https://facebook.com/',
      icon: Facebook,
    },
    {
      label: 'Instagram',
      href: 'https://instagram.com/',
      icon: Instagram,
    },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/',
      icon: Linkedin,
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#07111f] text-white">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-brand-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* CTA Banner */}


        {/* Main Footer */}
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12 lg:py-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <button
              onClick={() => go('home')}
              className="group mb-5 flex items-center gap-3 text-left focus:outline-none"
              aria-label="Go to homepage"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-500/20 transition-transform duration-300 group-hover:scale-105">
                <Sparkles className="h-6 w-6 text-white" />
              </div>

              <div>
                <span className="block font-heading text-xl font-bold tracking-tight text-white">
                  {businessInfo.name || 'Hitech Solutions'}
                </span>
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-400">
                  Cleaning Solutions
                </span>
              </div>
            </button>

            <p className="max-w-sm text-sm leading-7 text-slate-400">
              {businessInfo.tagline}
            </p>

            {/* Social links */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:bg-emerald-500 hover:text-white hover:shadow-lg hover:shadow-emerald-500/20 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  >
                    <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  </a>
                );
              })}

              {/* WhatsApp */}
              <a
                href={whatsappLink(
                  'Hello Hitech Solutions, I would like to know more about your services.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:bg-emerald-500 hover:text-white hover:shadow-lg hover:shadow-emerald-500/20 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                <MessageCircle className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 font-heading text-base font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => go(link.page)}
                    className="group flex w-full items-center gap-2 text-left text-sm text-slate-400 transition-colors duration-200 hover:text-emerald-400 focus:outline-none focus:text-emerald-400"
                  >
                    <ChevronRight className="h-3.5 w-3.5 text-slate-600 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-emerald-400" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-5 font-heading text-base font-semibold text-white">
              Our Services
            </h3>

            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <button
                    onClick={() => go('services')}
                    className="group flex w-full items-start gap-2 text-left text-sm leading-5 text-slate-400 transition-colors duration-200 hover:text-emerald-400 focus:outline-none focus:text-emerald-400"
                  >
                    <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-600 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-emerald-400" />
                    <span>{service}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 font-heading text-base font-semibold text-white">
              Contact Us
            </h3>

            <ul className="space-y-4">
              {/* Address */}
              <li>
                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex gap-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-emerald-400 transition-colors group-hover:bg-emerald-500 group-hover:text-white">
                    <MapPin className="h-4 w-4" />
                  </span>

                  <span className="text-sm leading-6 text-slate-400 transition-colors group-hover:text-slate-200">
                    {businessInfo.address.line1},{' '}
                    {businessInfo.address.line2},{' '}
                    {businessInfo.address.city},{' '}
                    {businessInfo.address.district},{' '}
                    {businessInfo.address.state} –{' '}
                    {businessInfo.address.pincode}
                  </span>
                </a>
              </li>

              {/* Phone */}
              <li>
                <a
                  href={callLink}
                  className="group flex items-center gap-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-emerald-400 transition-colors group-hover:bg-emerald-500 group-hover:text-white">
                    <Phone className="h-4 w-4" />
                  </span>

                  <span>
                    <span className="block text-[11px] font-medium uppercase tracking-wider text-slate-500">
                      Call / Contact
                    </span>
                    <span className="text-sm text-slate-300 transition-colors group-hover:text-emerald-400">
                      {businessInfo.contactPhoneDisplay}
                    </span>
                  </span>
                </a>
              </li>

              {/* WhatsApp */}
              <li>
                <a
                  href={whatsappLink(
                    'Hello Hitech Solutions, I would like to enquire about your products and services.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-emerald-400 transition-colors group-hover:bg-emerald-500 group-hover:text-white">
                    <MessageCircle className="h-4 w-4" />
                  </span>

                  <span>
                    <span className="block text-[11px] font-medium uppercase tracking-wider text-slate-500">
                      WhatsApp Orders & Enquiries
                    </span>
                    <span className="text-sm text-slate-300 transition-colors group-hover:text-emerald-400">
                      {businessInfo.phoneDisplay}
                    </span>
                  </span>
                </a>
              </li>

              {/* Email */}
              <li>
                <a
                  href={emailLink}
                  className="group flex items-start gap-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-emerald-400 transition-colors group-hover:bg-emerald-500 group-hover:text-white">
                    <Mail className="h-4 w-4" />
                  </span>

                  <span className="break-all text-sm leading-6 text-slate-300 transition-colors group-hover:text-emerald-400">
                    {businessInfo.email}
                  </span>
                </a>
              </li>

              {/* Hours */}
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-emerald-400">
                  <Clock className="h-4 w-4" />
                </span>

                <span className="text-sm text-slate-400">
                  {businessInfo.hours}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <p className="text-xs leading-5 text-slate-500 sm:text-sm">
                © {new Date().getFullYear()}{' '}
                <span className="font-medium text-slate-400">
                  {businessInfo.name}
                </span>
                . All rights reserved.
              </p>

              <p className="mt-1 text-xs text-slate-600">
                Designed for a cleaner, healthier space.
              </p>
            </div>

            {/* Bottom navigation */}
            <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
              <button
                onClick={() => go('contact')}
                className="transition-colors hover:text-emerald-400 focus:outline-none focus:text-emerald-400"
              >
                Contact
              </button>

              <span className="h-1 w-1 rounded-full bg-slate-700" />

              <button
                onClick={() => go('services')}
                className="transition-colors hover:text-emerald-400 focus:outline-none focus:text-emerald-400"
              >
                Services
              </button>

              <span className="h-1 w-1 rounded-full bg-slate-700" />

              <button
                onClick={() => go('products')}
                className="transition-colors hover:text-emerald-400 focus:outline-none focus:text-emerald-400"
              >
                Products
              </button>
            </div>
          </div>
        </div>

        {/* Back to top */}
        <button
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
          }
          aria-label="Back to top"
          className="group absolute bottom-6 right-4 hidden h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:bg-emerald-500 hover:text-white sm:flex"
        >
          <ArrowUpRight className="h-4 w-4 -rotate-45 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </footer>
  );
}