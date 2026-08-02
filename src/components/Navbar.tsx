import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, Phone } from 'lucide-react';
import { businessInfo, callLink } from '@/data/business';
import { useEnquiry } from '@/context/EnquiryContext';
import type { Page } from '@/types';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const navItems: { label: string; page: Page }[] = [
  { label: 'Home', page: 'home' },
  { label: 'About', page: 'about' },
  { label: 'Products', page: 'products' },
  { label: 'Services', page: 'services' },
  { label: 'Reviews', page: 'reviews' },
  { label: 'Contact', page: 'contact' },
];

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, openCart } = useEnquiry();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (page: Page) => {
    onNavigate(page);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-soft py-2'
            : 'bg-white/80 backdrop-blur-sm py-3'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 group"
            aria-label="Hitech Solutions Home"
          >
            <img
              src={businessInfo.logo}
              alt="Hitech Solutions Logo"
              className="h-11 w-11 md:h-12 md:w-12 rounded-xl object-cover ring-2 ring-brand-100 group-hover:ring-brand-300 transition-all"
            />
            <div className="text-left">
              <span className="font-heading font-bold text-lg md:text-xl text-navy-900 block leading-tight">
                Hitech Solutions
              </span>
              <span className="text-xs text-navy-500 hidden sm:block">
                Cleaning & Deep Cleaning Experts
              </span>
            </div>
          </button>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.page}>
                <button
                  onClick={() => handleNav(item.page)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                    currentPage === item.page
                      ? 'text-brand-700 bg-brand-50'
                      : 'text-navy-700 hover:text-brand-600 hover:bg-navy-50'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-xl text-navy-700 hover:bg-navy-50 transition-colors"
              aria-label="Enquiry cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            <a
              href={callLink}
              className="hidden md:inline-flex btn-primary !px-4 !py-2.5 text-sm"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2.5 rounded-xl text-navy-700 hover:bg-navy-50 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-medium border-t border-navy-100 animate-fade-in">
            <ul className="flex flex-col p-4 gap-1">
              {navItems.map((item) => (
                <li key={item.page}>
                  <button
                    onClick={() => handleNav(item.page)}
                    className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all ${
                      currentPage === item.page
                        ? 'text-brand-700 bg-brand-50'
                        : 'text-navy-700 hover:bg-navy-50'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <a href={callLink} className="btn-primary w-full">
                  <Phone className="h-4 w-4" />
                  Call {businessInfo.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>
      <div className="h-20" />
    </>
  );
}
