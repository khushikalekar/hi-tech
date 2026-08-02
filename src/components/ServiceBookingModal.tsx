import { useState } from 'react';
import { Calendar, Clock, User, Phone, MapPin, FileText, MessageCircle, Send } from 'lucide-react';
import Modal from './Modal';
import { whatsappLink, businessInfo } from '@/data/business';

interface ServiceBookingModalProps {
  open: boolean;
  onClose: () => void;
  serviceName: string;
}

export default function ServiceBookingModal({ open, onClose, serviceName }: ServiceBookingModalProps) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    service: serviceName,
    date: '',
    time: '',
    notes: '',
  });

  // Update service when prop changes
  if (form.service !== serviceName && open) {
    setForm((f) => ({ ...f, service: serviceName }));
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hello Hitech Solutions,

I would like to book the following service.

Service:
${form.service}

Customer Name:
${form.name}

Mobile Number:
${form.phone}

Address:
${form.address}

Preferred Date:
${form.date || 'Not specified'}

Preferred Time:
${form.time || 'Not specified'}

Additional Notes:
${form.notes || 'None'}

Please contact me.`;
    window.open(whatsappLink(message), '_blank');
    onClose();
    setForm({ name: '', phone: '', address: '', service: serviceName, date: '', time: '', notes: '' });
  };

  const inputClass = 'w-full pl-11 pr-4 py-3 border border-navy-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all text-navy-800 placeholder-navy-400 bg-white';

  return (
    <Modal open={open} onClose={onClose} title="Book Cleaning Service" maxWidth="max-w-xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-navy-700 mb-1.5">Selected Service</label>
          <div className="px-4 py-3 bg-brand-50 border border-brand-200 rounded-xl text-brand-800 font-semibold">
            {form.service}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-navy-700 mb-1.5">
            Customer Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-navy-400" />
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
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
              name="phone"
              required
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-navy-700 mb-1.5">
            Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-3.5 top-3.5 h-5 w-5 text-navy-400" />
            <textarea
              name="address"
              required
              value={form.address}
              onChange={handleChange}
              placeholder="Enter your complete address"
              rows={2}
              className={inputClass + ' resize-none'}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1.5">Preferred Date</label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-navy-400 pointer-events-none" />
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1.5">Preferred Time</label>
            <div className="relative">
              <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-navy-400 pointer-events-none" />
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-navy-700 mb-1.5">Additional Notes</label>
          <div className="relative">
            <FileText className="absolute left-3.5 top-3.5 h-5 w-5 text-navy-400" />
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Any special requirements or instructions"
              rows={2}
              className={inputClass + ' resize-none'}
            />
          </div>
        </div>

        <button type="submit" className="btn-whatsapp w-full !py-3.5">
          <Send className="h-5 w-5" />
          Send Booking via WhatsApp
        </button>
        <p className="text-xs text-navy-500 text-center flex items-center justify-center gap-1.5">
          <MessageCircle className="h-4 w-4" />
          Your booking will be sent to {businessInfo.phoneDisplay}
        </p>
      </form>
    </Modal>
  );
}


