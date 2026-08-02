import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, User, FileText, ExternalLink } from 'lucide-react';
import { businessInfo, callLink, emailLink, whatsappLink, mapsLink } from '@/data/business';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hello Hitech Solutions,

Name: ${form.name}
Phone: ${form.phone}

Message:
${form.message}`;
    window.open(whatsappLink(message), '_blank');
    setForm({ name: '', phone: '', message: '' });
  };

  const inputClass = 'w-full pl-11 pr-4 py-3 border border-navy-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all text-navy-800 placeholder-navy-400 bg-white';

  return (
    <div>
      {/* Hero */}
      <section className="bg-hero relative overflow-hidden">
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 section-pattern opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white animate-fade-in-up">
            Contact Us
          </h1>
          <p className="mt-4 text-lg text-navy-100 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Get in touch for product enquiries, service bookings, or any questions.
          </p>
        </div>
        <svg className="w-full h-12 md:h-16" viewBox="0 0 1440 80" preserveAspectRatio="none" fill="white">
          <path d="M0,40 C320,80 720,0 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </section>

      {/* Contact info cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          <a href={callLink} className="card-hover p-6 text-center group">
            <div className="inline-flex p-3 rounded-2xl bg-brand-50 text-brand-600 mb-3 group-hover:bg-brand-600 group-hover:text-white transition-all">
              <Phone className="h-7 w-7" />
            </div>
            <h3 className="font-heading font-semibold text-navy-900 mb-1">Call Us</h3>
            <p className="text-sm text-navy-500">{businessInfo.phoneDisplay}</p>
          </a>

          <a
            href={whatsappLink('Hello Hitech Solutions, I would like to enquire about your products and services.')}
            target="_blank"
            rel="noopener noreferrer"
            className="card-hover p-6 text-center group"
          >
            <div className="inline-flex p-3 rounded-2xl bg-emerald-50 text-emerald-600 mb-3 group-hover:bg-emerald-500 group-hover:text-white transition-all">
              <MessageCircle className="h-7 w-7" />
            </div>
            <h3 className="font-heading font-semibold text-navy-900 mb-1">WhatsApp</h3>
            <p className="text-sm text-navy-500">{businessInfo.phoneDisplay}</p>
          </a>

          <a href={emailLink} className="card-hover p-6 text-center group">
            <div className="inline-flex p-3 rounded-2xl bg-navy-100 text-navy-700 mb-3 group-hover:bg-navy-700 group-hover:text-white transition-all">
              <Mail className="h-7 w-7" />
            </div>
            <h3 className="font-heading font-semibold text-navy-900 mb-1">Email</h3>
            <p className="text-sm text-navy-500 break-all">{businessInfo.email}</p>
          </a>

          <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="card-hover p-6 text-center group">
            <div className="inline-flex p-3 rounded-2xl bg-brand-50 text-brand-600 mb-3 group-hover:bg-brand-600 group-hover:text-white transition-all">
              <MapPin className="h-7 w-7" />
            </div>
            <h3 className="font-heading font-semibold text-navy-900 mb-1">Visit Us</h3>
            <p className="text-sm text-navy-500">Shirdi, Maharashtra</p>
          </a>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact details */}
          <div>
            <h2 className="section-title mb-6">Get In Touch</h2>
            <div className="card p-6 space-y-5">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-brand-50 text-brand-600 shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 mb-1">Business Address</h3>
                  <p className="text-sm text-navy-600 leading-relaxed">
                    {businessInfo.address.line1}, {businessInfo.address.line2},<br />
                    {businessInfo.address.city}, {businessInfo.address.district},<br />
                    {businessInfo.address.state} – {businessInfo.address.pincode}
                  </p>
                  <a
                    href={mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-brand-600 hover:text-brand-700 mt-2 font-medium"
                  >
                    View on Map <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-brand-50 text-brand-600 shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 mb-1">Phone & WhatsApp</h3>
                  <a href={callLink} className="text-sm text-navy-600 hover:text-brand-600 transition-colors block">
                    {businessInfo.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-brand-50 text-brand-600 shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 mb-1">Email</h3>
                  <a href={emailLink} className="text-sm text-navy-600 hover:text-brand-600 transition-colors break-all">
                    {businessInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-brand-50 text-brand-600 shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 mb-1">Business Hours</h3>
                  <p className="text-sm text-navy-600">
                    Monday – Sunday: {businessInfo.hours}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="flex flex-wrap gap-3 mt-5">
              <a href={callLink} className="btn-primary flex-1">
                <Phone className="h-5 w-5" />
                Call Now
              </a>
              <a
                href={whatsappLink('Hello Hitech Solutions, I would like to know more.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp flex-1"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </a>
              <a href={emailLink} className="btn-ghost flex-1">
                <Mail className="h-5 w-5" />
                Email
              </a>
            </div>
          </div>

          {/* Contact form */}
          <div>
            <h2 className="section-title mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="card p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1.5">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-navy-400" />
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Enter your name"
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1.5">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-navy-400" />
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="Enter your mobile number"
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1.5">
                  Message <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FileText className="absolute left-3.5 top-3.5 h-5 w-5 text-navy-400" />
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="How can we help you?"
                    className={inputClass + ' resize-none'}
                  />
                </div>
              </div>
              <button type="submit" className="btn-whatsapp w-full !py-3.5">
                <Send className="h-5 w-5" />
                Send via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
