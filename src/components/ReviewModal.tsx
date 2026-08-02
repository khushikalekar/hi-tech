import { useState } from 'react';
import { Star, Send, User, MapPin, CheckCircle2, Loader2 } from 'lucide-react';
import Modal from './Modal';
import { supabase } from '@/lib/supabase';

interface ReviewModalProps {
  open: boolean;
  onClose: () => void;
}

const defaultReview =
  'I had a wonderful experience with Hitech Solutions. Their service was professional, reliable, and of excellent quality. I highly recommend Hitech Solutions for deep cleaning services and housekeeping materials.';

export default function ReviewModal({ open, onClose }: ReviewModalProps) {
  const [form, setForm] = useState({
    name: '',
    location: '',
    rating: 5,
    review: defaultReview,
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const { error: insertError } = await supabase.from('reviews').insert({
      name: form.name,
      location: form.location,
      rating: form.rating,
      text: form.review,
      status: 'pending',
      source: 'customer',
    });

    if (insertError) {
      setError('Failed to submit review. Please try again.');
      setSubmitting(false);
      return;
    }

    setSuccess(true);
    setSubmitting(false);
    setForm({ name: '', location: '', rating: 5, review: defaultReview });
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 3000);
  };

  const inputClass = 'w-full pl-11 pr-4 py-3 border border-navy-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all text-navy-800 placeholder-navy-400 bg-white';

  return (
    <Modal open={open} onClose={onClose} title="Write A Review" maxWidth="max-w-lg">
      {success ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="p-4 rounded-full bg-emerald-50 mb-4">
            <CheckCircle2 className="h-12 w-12 text-emerald-500" />
          </div>
          <h3 className="font-heading font-bold text-xl text-navy-900 mb-2">
            Thank you for your review!
          </h3>
          <p className="text-navy-500 max-w-sm">
            Your review has been submitted and will appear on our website after approval.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1.5">
              Your Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-navy-400" />
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1.5">
              Location <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-navy-400" />
              <input
                type="text"
                name="location"
                required
                value={form.location}
                onChange={handleChange}
                placeholder="City, State"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1.5">
              Rating <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setForm({ ...form, rating: n })}
                  className="p-1 transition-transform hover:scale-110"
                  aria-label={`${n} star${n > 1 ? 's' : ''}`}
                >
                  <Star
                    className={`h-8 w-8 ${
                      n <= form.rating
                        ? 'fill-gold-500 text-gold-500'
                        : 'fill-navy-100 text-navy-200'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1.5">
              Your Review <span className="text-red-500">*</span>
            </label>
            <textarea
              name="review"
              required
              value={form.review}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border border-navy-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all text-navy-800 resize-none"
            />
            <p className="text-xs text-navy-500 mt-1">
              You can edit the pre-filled text above before submitting.
            </p>
          </div>

          {error && (
            <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full !py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                Submit Review
              </>
            )}
          </button>
          <p className="text-xs text-navy-500 text-center">
            Your review will be submitted for approval. It will appear on our website after the owner approves it.
          </p>
        </form>
      )}
    </Modal>
  );
}
