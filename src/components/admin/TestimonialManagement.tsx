import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X, Loader2, MessageSquare, Check, Power, Star } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Review } from '@/types';

export default function TestimonialManagement() {
  const [testimonials, setTestimonials] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Review | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('source', 'manual')
      .order('created_at', { ascending: false });
    if (!error && data) {
      setTestimonials(data as Review[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleToggleApproved = async (t: Review) => {
    const newStatus = t.status === 'approved' ? 'rejected' : 'approved';
    await supabase.from('reviews').update({ status: newStatus }).eq('id', t.id);
    fetchTestimonials();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await supabase.from('reviews').delete().eq('id', deleteId);
    setDeleteId(null);
    fetchTestimonials();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-8 w-8 text-brand-600 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading font-bold text-2xl text-navy-900">Manual Testimonials</h2>
          <p className="text-navy-500 mt-1">Manually added testimonials. Separate from customer-submitted reviews.</p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="btn-primary !py-2.5 text-sm"
        >
          <Plus className="h-5 w-5" />
          Add Testimonial
        </button>
      </div>

      {testimonials.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-soft border border-navy-100 py-16 text-center text-navy-500">
          <MessageSquare className="h-12 w-12 mx-auto mb-3 text-navy-300" />
          <p>No testimonials yet. Click "Add Testimonial" to create one.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-2xl shadow-soft border border-navy-100 p-5">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-navy-600 to-navy-800 flex items-center justify-center text-white font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-navy-900">{t.name}</p>
                    <p className="text-xs text-navy-500">{t.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className={`h-4 w-4 ${j < t.rating ? 'fill-gold-500 text-gold-500' : 'fill-navy-100 text-navy-200'}`} />
                    ))}
                  </div>
                  <span className={`badge ml-2 ${t.status === 'approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                    {t.status === 'approved' ? 'Visible' : 'Hidden'}
                  </span>
                </div>
              </div>
              <p className="text-navy-600 text-sm leading-relaxed mb-4">"{t.text}"</p>
              <div className="flex items-center gap-2 pt-3 border-t border-navy-100">
                <button
                  onClick={() => {
                    setEditing(t);
                    setShowForm(true);
                  }}
                  className="px-4 py-2 rounded-lg text-navy-600 hover:bg-navy-100 transition-colors text-sm font-medium flex items-center gap-1.5"
                >
                  <Edit2 className="h-4 w-4" /> Edit
                </button>
                <button
                  onClick={() => handleToggleApproved(t)}
                  className="px-4 py-2 rounded-lg transition-colors text-sm font-medium flex items-center gap-1.5"
                  style={t.status === 'approved' ? { color: '#d97706', background: 'rgba(245,158,11,0.1)' } : { color: '#059669', background: 'rgba(5,150,105,0.1)' }}
                >
                  <Power className="h-4 w-4" /> {t.status === 'approved' ? 'Hide' : 'Show'}
                </button>
                <button
                  onClick={() => setDeleteId(t.id)}
                  className="px-4 py-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors text-sm font-medium flex items-center gap-1.5 ml-auto"
                >
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <TestimonialForm
          testimonial={editing}
          onClose={() => setShowForm(false)}
          onSaved={() => {
            setShowForm(false);
            fetchTestimonials();
          }}
        />
      )}

      {deleteId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={() => setDeleteId(null)}>
          <div className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl shadow-strong p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col items-center text-center">
              <div className="p-3 rounded-full bg-red-50 mb-4">
                <Trash2 className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="font-heading font-bold text-lg text-navy-900 mb-2">Delete this testimonial?</h3>
              <p className="text-sm text-navy-500 mb-6">This action cannot be undone.</p>
              <div className="flex gap-3 w-full">
                <button onClick={() => setDeleteId(null)} className="btn-ghost flex-1">Cancel</button>
                <button onClick={handleDelete} className="btn-primary !bg-red-500 hover:!bg-red-600 flex-1">Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface TestimonialFormProps {
  testimonial: Review | null;
  onClose: () => void;
  onSaved: () => void;
}

function TestimonialForm({ testimonial, onClose, onSaved }: TestimonialFormProps) {
  const [name, setName] = useState(testimonial?.name ?? '');
  const [location, setLocation] = useState(testimonial?.location ?? '');
  const [rating, setRating] = useState(testimonial?.rating ?? 5);
  const [text, setText] = useState(testimonial?.text ?? '');
  const [status, setStatus] = useState<Review['status']>(testimonial?.status ?? 'approved');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      name,
      location,
      rating,
      text,
      status,
      source: 'manual' as const,
    };

    if (testimonial) {
      const { error } = await supabase.from('reviews').update(payload).eq('id', testimonial.id);
      if (error) setError(error.message);
    } else {
      const { error } = await supabase.from('reviews').insert(payload);
      if (error) setError(error.message);
    }

    setSaving(false);
    if (!error) onSaved();
  };

  const inputClass = 'w-full px-4 py-2.5 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all text-navy-800 placeholder-navy-400';

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl shadow-strong w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm flex items-center justify-between p-5 border-b border-navy-100 z-10">
          <h3 className="font-heading font-bold text-xl text-navy-900">{testimonial ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
          <button onClick={onClose} className="p-2 rounded-lg text-navy-500 hover:bg-navy-100 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1.5">Name *</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Customer name" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1.5">Location *</label>
              <input type="text" required value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City, State" className={inputClass} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1.5">Rating *</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} type="button" onClick={() => setRating(n)} className="p-1 transition-transform hover:scale-110">
                  <Star className={`h-8 w-8 ${n <= rating ? 'fill-gold-500 text-gold-500' : 'fill-navy-100 text-navy-200'}`} />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1.5">Testimonial *</label>
            <textarea required value={text} onChange={(e) => setText(e.target.value)} rows={4} placeholder="Testimonial text" className={inputClass + ' resize-none'} />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1.5">Status</label>
            <div className="flex gap-2">
              <button type="button" onClick={() => setStatus('approved')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${status === 'approved' ? 'bg-emerald-500 text-white' : 'bg-navy-50 text-navy-600'}`}>
                <Check className="h-4 w-4 inline" /> Visible
              </button>
              <button type="button" onClick={() => setStatus('rejected')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${status === 'rejected' ? 'bg-red-500 text-white' : 'bg-navy-50 text-navy-600'}`}>
                <X className="h-4 w-4 inline" /> Hidden
              </button>
            </div>
          </div>
          {error && <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">{error}</div>}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-ghost flex-1">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary flex-1 disabled:opacity-60">
              {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Plus className="h-5 w-5" />}
              {testimonial ? 'Save Changes' : 'Add Testimonial'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
