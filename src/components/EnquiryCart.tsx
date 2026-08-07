
import { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  Send,
  MessageCircle,
  User,
  Phone,
  MapPin,
  FileText,
  Loader2,
} from 'lucide-react';
import { useEnquiry } from '@/context/EnquiryContext';
import { whatsappLink, businessInfo } from '@/data/business';
import { supabase } from '@/lib/supabase';

export default function EnquiryCart() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    clearCart,
  } = useEnquiry();

  // IMPORTANT:
  // All hooks must be declared BEFORE any conditional return.
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) return;

    setSubmitting(true);

    try {
      // Save enquiry to Supabase
      const { error } = await supabase.from('enquiries').insert({
        customer_name: form.name,
        phone: form.phone,
        address: form.address,
        notes: form.notes || null,
        items: items.map((item) => ({
          productName: item.productName,
          size: item.size,
          variant: item.variant,
          quantity: item.quantity,
        })),
        status: 'new',
      });

      if (error) {
        console.error('Error saving enquiry:', error);
        throw error;
      }

      // Create WhatsApp message
      const lines = items
        .map(
          (item) =>
            `${item.productName}\n` +
            `Size: ${item.size}\n` +
            `Variant: ${item.variant}\n` +
            `Quantity: ${item.quantity}`,
        )
        .join('\n\n');

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

Please provide availability and details.`;

      // Open WhatsApp
      window.open(whatsappLink(message), '_blank');

      // Clear enquiry cart
      clearCart();

      // Reset form
      setShowForm(false);
      setForm({
        name: '',
        phone: '',
        address: '',
        notes: '',
      });

      // Close cart
      closeCart();
    } catch (error) {
      console.error('Failed to submit enquiry:', error);

      alert(
        'Unable to submit your enquiry right now. Please try again or contact us directly on WhatsApp.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    'w-full pl-11 pr-4 py-3 border border-navy-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all text-navy-800 placeholder-navy-400 bg-white';

  // Conditional return MUST come after all hooks.
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex justify-end bg-navy-950/50 backdrop-blur-sm"
      onClick={closeCart}
    >
      <div
        className="relative flex h-full w-full max-w-md flex-col bg-white shadow-strong animate-slide-in-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-navy-100 bg-white px-5 py-4">
          <div>
            <h2 className="font-heading text-lg font-bold text-navy-900">
              Enquiry Cart
            </h2>

            <p className="mt-0.5 text-xs text-navy-500">
              {items.length === 0
                ? 'No products selected'
                : `${items.length} ${
                    items.length === 1 ? 'product' : 'products'
                  } selected`}
            </p>
          </div>

          <button
            onClick={closeCart}
            className="rounded-xl p-2 text-navy-500 transition-colors hover:bg-navy-50 hover:text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-400"
            aria-label="Close enquiry cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-4 rounded-full bg-navy-50 p-4">
                <MessageCircle className="h-10 w-10 text-navy-300" />
              </div>

              <p className="font-semibold text-navy-700">
                Your enquiry cart is empty
              </p>

              <p className="mt-1 max-w-xs text-sm leading-6 text-navy-500">
                Add products from the Products page to start an enquiry.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-navy-200 bg-navy-50/50 p-4"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h4 className="font-semibold text-navy-900">
                        {item.productName}
                      </h4>

                      <p className="mt-0.5 text-sm text-navy-500">
                        Size: {item.size} · Variant: {item.variant}
                      </p>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="shrink-0 rounded-lg p-1.5 text-red-500 transition-colors hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-300"
                      aria-label={`Remove ${item.productName}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Quantity */}
                  <div className="mt-3 flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="rounded-lg border border-navy-200 p-1.5 transition-colors hover:bg-navy-100 focus:outline-none focus:ring-2 focus:ring-brand-400"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>

                    <span className="w-8 text-center font-semibold text-navy-900">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="rounded-lg border border-navy-200 p-1.5 transition-colors hover:bg-navy-100 focus:outline-none focus:ring-2 focus:ring-brand-400"
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
          <div className="border-t border-navy-100 bg-white p-5">
            {!showForm ? (
              <button
                onClick={() => setShowForm(true)}
                className="btn-whatsapp flex w-full items-center justify-center gap-2 !py-3.5"
              >
                <Send className="h-5 w-5" />
                Proceed to Enquiry
              </button>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Name */}
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-400" />

                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                    className={inputClass}
                  />
                </div>

                {/* Phone */}
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-400" />

                  <input
                    type="tel"
                    required
                    placeholder="Mobile Number"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        phone: e.target.value,
                      })
                    }
                    className={inputClass}
                  />
                </div>

                {/* Address */}
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3.5 h-5 w-5 text-navy-400" />

                  <textarea
                    required
                    placeholder="Address"
                    rows={2}
                    value={form.address}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        address: e.target.value,
                      })
                    }
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* Notes */}
                <div className="relative">
                  <FileText className="absolute left-3.5 top-3.5 h-5 w-5 text-navy-400" />

                  <textarea
                    placeholder="Additional Notes (optional)"
                    rows={2}
                    value={form.notes}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        notes: e.target.value,
                      })
                    }
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    disabled={submitting}
                    className="btn-ghost flex-1"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-whatsapp flex flex-1 items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Send className="h-5 w-5" />
                    )}

                    {submitting ? 'Sending...' : 'Send Enquiry'}
                  </button>
                </div>

                <p className="text-center text-xs text-navy-500">
                  Enquiry will be sent to{' '}
                  <span className="font-medium text-navy-700">
                    {businessInfo.phoneDisplay}
                  </span>
                </p>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

