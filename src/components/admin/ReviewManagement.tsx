import { useEffect, useState } from 'react';
import { Check, X, Trash2, Star, Loader2, Inbox } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Review } from '@/types';

type FilterStatus = 'pending' | 'approved' | 'rejected';

export default function ReviewManagement() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterStatus>('pending');
  const [deleteId, setDeleteId] = useState<string | null>(null);

const fetchReviews = async () => {
  console.log('1. fetchReviews started');

  setLoading(true);

  try {
    console.log('2. Sending request to Supabase...');

    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });

    console.log('3. Supabase response received');
    console.log('DATA:', data);
    console.log('ERROR:', error);

    if (error) {
      console.error('Supabase reviews error:', error);
      setReviews([]);
      return;
    }

    setReviews((data ?? []) as Review[]);
  } catch (err) {
    console.error('FETCH REVIEWS CRASHED:', err);
    setReviews([]);
  } finally {
    console.log('4. Setting loading to false');
    setLoading(false);
  }
};

  useEffect(() => {
    fetchReviews();
  }, []);

  const updateStatus = async (id: string, status: Review['status']) => {
    await supabase.from('reviews').update({ status }).eq('id', id);
    fetchReviews();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await supabase.from('reviews').delete().eq('id', deleteId);
    setDeleteId(null);
    fetchReviews();
  };

const filtered = reviews.filter((r) => r.status === filter);

const counts = {
  pending: reviews.filter((r) => r.status === 'pending').length,
  approved: reviews.filter((r) => r.status === 'approved').length,
  rejected: reviews.filter((r) => r.status === 'rejected').length,
};

  const tabs: { id: FilterStatus; label: string; count: number }[] = [
    { id: 'pending', label: 'Pending', count: counts.pending },
    { id: 'approved', label: 'Approved', count: counts.approved },
    { id: 'rejected', label: 'Rejected', count: counts.rejected },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-8 w-8 text-brand-600 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-heading font-bold text-2xl text-navy-900">Customer Reviews</h2>
        <p className="text-navy-500 mt-1">Approve, reject, or delete customer-submitted reviews.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setFilter(t.id)}
            className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
              filter === t.id
                ? t.id === 'pending'
                  ? 'bg-gold-500 text-white'
                  : t.id === 'approved'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-red-500 text-white'
                : 'bg-white text-navy-600 border border-navy-200 hover:bg-navy-50'
            }`}
          >
            {t.label} ({t.count})
          </button>
        ))}
      </div>

      {/* Reviews */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-soft border border-navy-100 py-16 text-center text-navy-500">
          <Inbox className="h-12 w-12 mx-auto mb-3 text-navy-300" />
          <p>No {filter} reviews.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((r) => (
            <div key={r.id} className="bg-white rounded-2xl shadow-soft border border-navy-100 p-5">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-navy-900">{r.name}</p>
                    <p className="text-xs text-navy-500">{r.location} · {new Date(r.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className={`h-4 w-4 ${j < r.rating ? 'fill-gold-500 text-gold-500' : 'fill-navy-100 text-navy-200'}`} />
                  ))}
                </div>
              </div>
              <p className="text-navy-600 text-sm leading-relaxed mb-4">"{r.text}"</p>
              <div className="flex items-center gap-2 pt-3 border-t border-navy-100">
                {r.status === 'pending' && (
                  <>
                    <button onClick={() => updateStatus(r.id, 'approved')} className="px-4 py-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors text-sm font-medium flex items-center gap-1.5">
                      <Check className="h-4 w-4" /> Approve
                    </button>
                    <button onClick={() => updateStatus(r.id, 'rejected')} className="px-4 py-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors text-sm font-medium flex items-center gap-1.5">
                      <X className="h-4 w-4" /> Reject
                    </button>
                  </>
                )}
                {r.status === 'approved' && (
                  <button onClick={() => updateStatus(r.id, 'pending')} className="px-4 py-2 rounded-lg bg-gold-500/10 text-gold-600 hover:bg-gold-500/20 transition-colors text-sm font-medium flex items-center gap-1.5">
                    <X className="h-4 w-4" /> Unapprove
                  </button>
                )}
                {r.status === 'rejected' && (
                  <button onClick={() => updateStatus(r.id, 'approved')} className="px-4 py-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors text-sm font-medium flex items-center gap-1.5">
                    <Check className="h-4 w-4" /> Approve
                  </button>
                )}
                <button onClick={() => setDeleteId(r.id)} className="px-4 py-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors text-sm font-medium flex items-center gap-1.5 ml-auto">
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={() => setDeleteId(null)}>
          <div className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl shadow-strong p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col items-center text-center">
              <div className="p-3 rounded-full bg-red-50 mb-4">
                <Trash2 className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="font-heading font-bold text-lg text-navy-900 mb-2">Delete this review?</h3>
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
