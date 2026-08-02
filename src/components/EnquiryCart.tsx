import { useState } from 'react';
import { X, Plus, Minus, Trash2, Send, MessageCircle, User, Phone, MapPin, FileText, Loader2 } from 'lucide-react';
import { useEnquiry } from '@/context/EnquiryContext';
import { whatsappLink, businessInfo } from '@/data/business';
import { supabase } from '@/lib/supabase';

export default function EnquiryCart() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, clearCart } = useEnquiry();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', address: '', notes: '' });

  if (!isOpen) return null;

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Save to database
    await supabase.from('enquiries').insert({
      customer_name: form.name,
      phone: form.phone,
      address: form.address,
      notes: form.notes || null,
      items: items.map((i) => ({
        productName: i.productName,
        size: i.size,
        variant: i.variant,
        quantity: i.quantity,
      })),
      status: 'new',
    });

    // Also open WhatsApp
    const lines = items.map(
      (i) =>
        `${i.productName}\n  Size: ${i.size}\n  Variant: ${i.variant}\n  Quantity: ${i.quantity}`,
    ).join('\n\n');

    const message = `Hello Hitech Solutions,

I would like to enquire about:

${lines}

Customer Name:
${form.name}

Phone:
${form.phone}

Address:
${form.address}

Additional Notes:
${form.notes || 'None'}

Please provide availability.`;
    window.open(whatsappLink(message), '_blank');
    clearCart();
    setShowForm(false);
    setForm({ name: '', phone: '', address: '', notes: '' });
    closeCart();
    setSubmitting(false);
  };

  const inputClass = 'w-full pl-11 pr-4 py-3 border border-navy-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all text-navy-800 placeholder-navy-400 bg-white';

  return (
    <div className="fixed inset-0 z-[60] flex justify-end modal-backdrop" onClick={closeCart}>
      <div className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm" />
      <div
        className="relative bg-white w-full max-w-md h-full shadow-strong flex flex-col animate-slide-in-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-navy-100 bg-navy-900 text-white">
          <h3 className="font-heading font-bold text-lg flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-emerald-400" />
            Enquiry Cart ({items.length})
          </h3>
          <button
            onClick={closeCart}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="p-4 rounded-full bg-navy-50 mb-4">
                <MessageCircle className="h-10 w-10 text-navy-300" />
              </div>
              <p className="font-semibold text-navy-700">Your enquiry cart is empty</p>
              <p className="text-sm text-navy-500 mt-1">
                Add products from the Products page to start an enquiry.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="border border-navy-200 rounded-xl p-4 bg-navy-50/50"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-semibold text-navy-900">{item.productName}</h4>
                      <p className="text-sm text-navy-500 mt-0.5">
                        Size: {item.size} · Variant: {item.variant}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1.5 rounded-lg border border-navy-200 hover:bg-navy-100 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="font-semibold text-navy-900 w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1.5 rounded-lg border border-navy-200 hover:bg-navy-100 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Form */}
        {items.length > 0 && (
          <div className="border-t border-navy-100 p-5 bg-white">
            {!showForm ? (
              <button
                onClick={() => setShowForm(true)}
                className="btn-whatsapp w-full !py-3.5"
              >
                <Send className="h-5 w-5" />
                Proceed to Enquiry
              </button>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-navy-400" />
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-navy-400" />
                  <input
                    type="tel"
                    required
                    placeholder="Mobile Number"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3.5 h-5 w-5 text-navy-400" />
                  <textarea
                    required
                    placeholder="Address"
                    rows={2}
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className={inputClass + ' resize-none'}
                  />
                </div>
                <div className="relative">
                  <FileText className="absolute left-3.5 top-3.5 h-5 w-5 text-navy-400" />
                  <textarea
                    placeholder="Additional Notes (optional)"
                    rows={2}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className={inputClass + ' resize-none'}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="btn-ghost flex-1"
                  >
                    Back
                  </button>
                  <button type="submit" disabled={submitting} className="btn-whatsapp flex-1 disabled:opacity-60">
                    {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                    {submitting ? 'Sending...' : 'Send Enquiry'}
                  </button>
                </div>
                <p className="text-xs text-navy-500 text-center">
                  Enquiry will be sent to {businessInfo.phoneDisplay}
                </p>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
