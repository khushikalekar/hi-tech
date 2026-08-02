import { useEffect, useState, useCallback } from 'react';
import { Inbox, Phone, MapPin, FileText, Trash2, Loader2, Package, CheckCircle2, Clock } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Enquiry, EnquiryItemRecord } from '@/types';

type StatusFilter = 'new' | 'contacted' | 'resolved';

export default function EnquiryManagement() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<StatusFilter>('new');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchEnquiries = useCallback(async () => {
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) {
      setEnquiries(data as Enquiry[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);

  const updateStatus = async (id: string, status: Enquiry['status']) => {
    await supabase.from('enquiries').update({ status, updated_at: new Date().toISOString() }).eq('id', id);
    fetchEnquiries();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await supabase.from('enquiries').delete().eq('id', deleteId);
    setDeleteId(null);
    fetchEnquiries();
  };

  const counts = {
    new: enquiries.filter((e) => e.status === 'new').length,
    contacted: enquiries.filter((e) => e.status === 'contacted').length,
    resolved: enquiries.filter((e) => e.status === 'resolved').length,
  };

  const filtered = enquiries.filter((e) => e.status === filter);

  const tabs: { id: StatusFilter; label: string; count: number; color: string }[] = [
    { id: 'new', label: 'New', count: counts.new, color: 'bg-gold-500' },
    { id: 'contacted', label: 'Contacted', count: counts.contacted, color: 'bg-brand-500' },
    { id: 'resolved', label: 'Resolved', count: counts.resolved, color: 'bg-emerald-500' },
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
        <h2 className="font-heading font-bold text-2xl text-navy-900">Customer Enquiries</h2>
        <p className="text-navy-500 mt-1">View and manage product enquiries from your website.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setFilter(t.id)}
            className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
              filter === t.id
                ? `${t.color} text-white`
                : 'bg-white text-navy-600 border border-navy-200 hover:bg-navy-50'
            }`}
          >
            {t.label} ({t.count})
          </button>
        ))}
      </div>

      {/* Enquiries list */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-soft border border-navy-100 py-16 text-center text-navy-500">
          <Inbox className="h-12 w-12 mx-auto mb-3 text-navy-300" />
          <p>No {filter} enquiries.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((e) => (
            <div key={e.id} className="bg-white rounded-2xl shadow-soft border border-navy-100 overflow-hidden">
              <button
                onClick={() => setExpandedId(expandedId === e.id ? null : e.id)}
                className="w-full p-5 flex items-start justify-between gap-4 text-left hover:bg-navy-50/30 transition-colors"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="p-2.5 rounded-xl bg-brand-50 text-brand-600 shrink-0">
                    <Package className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-navy-900">{e.customer_name}</p>
                    <p className="text-sm text-navy-500 flex items-center gap-1.5 mt-0.5">
                      <Phone className="h-3.5 w-3.5" />
                      {e.phone}
                    </p>
                    <p className="text-xs text-navy-400 mt-1">
                      {new Date(e.created_at).toLocaleString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`badge ${
                    e.status === 'new' ? 'bg-gold-50 text-gold-600'
                    : e.status === 'contacted' ? 'bg-brand-50 text-brand-700'
                    : 'bg-emerald-50 text-emerald-600'
                  }`}>
                    {e.status === 'new' && <Clock className="h-3 w-3" />}
                    {e.status === 'contacted' && <Phone className="h-3 w-3" />}
                    {e.status === 'resolved' && <CheckCircle2 className="h-3 w-3" />}
                    {e.status}
                  </span>
                  <span className="text-xs text-navy-400 bg-navy-50 px-2 py-1 rounded-lg">
                    {(e.items as EnquiryItemRecord[]).length} item(s)
                  </span>
                </div>
              </button>

              {expandedId === e.id && (
                <div className="border-t border-navy-100 p-5 bg-navy-50/30 space-y-4">
                  {/* Items */}
                  <div>
                    <p className="text-xs font-semibold text-navy-500 uppercase tracking-wide mb-2">Enquired Items</p>
                    <div className="space-y-2">
                      {(e.items as EnquiryItemRecord[]).map((item, i) => (
                        <div key={i} className="flex items-center justify-between bg-white rounded-xl border border-navy-100 p-3">
                          <div>
                            <p className="font-medium text-sm text-navy-900">{item.productName}</p>
                            <p className="text-xs text-navy-500">
                              Size: {item.size} · Variant: {item.variant}
                            </p>
                          </div>
                          <span className="text-sm font-semibold text-brand-600">Qty: {item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Details */}
                  {e.address && (
                    <div className="flex items-start gap-2 text-sm text-navy-600">
                      <MapPin className="h-4 w-4 text-navy-400 shrink-0 mt-0.5" />
                      <p>{e.address}</p>
                    </div>
                  )}
                  {e.notes && (
                    <div className="flex items-start gap-2 text-sm text-navy-600">
                      <FileText className="h-4 w-4 text-navy-400 shrink-0 mt-0.5" />
                      <p>{e.notes}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2 flex-wrap">
                    {e.status === 'new' && (
                      <button
                        onClick={() => updateStatus(e.id, 'contacted')}
                        className="px-4 py-2 rounded-lg bg-brand-50 text-brand-700 hover:bg-brand-100 transition-colors text-sm font-medium flex items-center gap-1.5"
                      >
                        <Phone className="h-4 w-4" /> Mark Contacted
                      </button>
                    )}
                    {e.status !== 'resolved' && (
                      <button
                        onClick={() => updateStatus(e.id, 'resolved')}
                        className="px-4 py-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors text-sm font-medium flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="h-4 w-4" /> Mark Resolved
                      </button>
                    )}
                    {e.status !== 'new' && (
                      <button
                        onClick={() => updateStatus(e.id, 'new')}
                        className="px-4 py-2 rounded-lg bg-gold-50 text-gold-600 hover:bg-gold-100 transition-colors text-sm font-medium flex items-center gap-1.5"
                      >
                        <Clock className="h-4 w-4" /> Mark New
                      </button>
                    )}
                    <button
                      onClick={() => setDeleteId(e.id)}
                      className="px-4 py-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors text-sm font-medium flex items-center gap-1.5 ml-auto"
                    >
                      <Trash2 className="h-4 w-4" /> Delete
                    </button>
                  </div>
                </div>
              )}
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
              <h3 className="font-heading font-bold text-lg text-navy-900 mb-2">Delete this enquiry?</h3>
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
