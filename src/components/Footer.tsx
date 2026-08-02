import { Phone, Mail, MapPin, Clock, MessageCircle, Facebook, Instagram, Linkedin } from 'lucide-react';
import { businessInfo, callLink, emailLink, whatsappLink, mapsLink } from '@/data/business';
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

  return (
    <footer className="bg-navy-900 text-navy-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={businessInfo.logo}
                alt="Hitech Solutions"
                className="h-12 w-12 rounded-xl object-cover ring-2 ring-white/10"
              />
              <span className="font-heading font-bold text-xl text-white">
                Hitech Solutions
              </span>
            </div>
            <p className="text-sm leading-relaxed text-navy-300">
              {businessInfo.tagline}
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href={whatsappLink('Hello Hitech Solutions, I would like to know more about your services.')}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white/5 hover:bg-emerald-500 hover:text-white transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2.5 rounded-lg bg-white/5 hover:bg-brand-600 hover:text-white transition-all"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2.5 rounded-lg bg-white/5 hover:bg-pink-600 hover:text-white transition-all"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2.5 rounded-lg bg-white/5 hover:bg-brand-700 hover:text-white transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.page}>
                  <button
                    onClick={() => go(l.page)}
                    className="text-sm hover:text-brand-300 transition-colors text-left"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-4">Our Services</h3>
            <ul className="space-y-2.5">
              {[
                'Home Deep Cleaning',
                'Office Deep Cleaning',
                'Commercial Cleaning',
                'Hotel & Restaurant Cleaning',
                'Industrial Cleaning',
                'Hospital & School Cleaning',
              ].map((s) => (
                <li key={s}>
                  <button
                    onClick={() => go('services')}
                    className="text-sm hover:text-brand-300 transition-colors text-left"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 text-brand-400 shrink-0 mt-0.5" />
                <span>
                  {businessInfo.address.line1}, {businessInfo.address.line2},{' '}
                  {businessInfo.address.city}, {businessInfo.address.district},{' '}
                  {businessInfo.address.state} – {businessInfo.address.pincode}
                </span>
              </li>
              <li>
                <a href={`tel:+91${businessInfo.contactPhone}`} className="flex items-center gap-3 hover:text-brand-300 transition-colors">
                  <Phone className="h-5 w-5 text-brand-400 shrink-0" />
                  <span>
                    <span className="block text-xs text-navy-400">Call / Contact</span>
                    {businessInfo.contactPhoneDisplay}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink('Hello Hitech Solutions, I would like to enquire about your products and services.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-brand-300 transition-colors"
                >
                  <MessageCircle className="h-5 w-5 text-brand-400 shrink-0" />
                  <span>
                    <span className="block text-xs text-navy-400">WhatsApp Orders & Enquiries</span>
                    {businessInfo.phoneDisplay}
                  </span>
                </a>
              </li>
              <li>
                <a href={emailLink} className="flex items-center gap-3 hover:text-brand-300 transition-colors break-all">
                  <Mail className="h-5 w-5 text-brand-400 shrink-0 mt-0.5" />
                  {businessInfo.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-brand-400 shrink-0" />
                {businessInfo.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-navy-400">
            © {new Date().getFullYear()} {businessInfo.name}. All rights reserved.
          </p>
          <p className="text-sm text-navy-400">
            Designed for a cleaner, healthier space.
          </p>
        </div>
      </div>
    </footer>
  );
}
