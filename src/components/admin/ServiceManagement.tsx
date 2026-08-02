import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Power, X, Loader2, Wrench } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Service } from '@/types';

export default function ServiceManagement() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Service | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('display_order', { ascending: true });
    if (!error && data) {
      setServices(data as Service[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleToggleActive = async (s: Service) => {
    await supabase.from('services').update({ is_active: !s.is_active }).eq('id', s.id);
    fetchServices();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await supabase.from('services').delete().eq('id', deleteId);
    setDeleteId(null);
    fetchServices();
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
          <h2 className="font-heading font-bold text-2xl text-navy-900">Service Management</h2>
          <p className="text-navy-500 mt-1">Add, edit, enable, or disable cleaning services.</p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="btn-primary !py-2.5 text-sm"
        >
          <Plus className="h-5 w-5" />
          Add Service
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-soft border border-navy-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-navy-50 border-b border-navy-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-navy-600 uppercase">Order</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-navy-600 uppercase">Name</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-navy-600 uppercase">Description</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-navy-600 uppercase">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-navy-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {services.map((s) => (
                <tr key={s.id} className="hover:bg-navy-50/50 transition-colors">
                  <td className="px-4 py-3 text-sm text-navy-500">{s.display_order}</td>
                  <td className="px-4 py-3 font-medium text-navy-900">{s.name}</td>
                  <td className="px-4 py-3 text-sm text-navy-500 max-w-xs">
                    <p className="line-clamp-2">{s.description}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`badge ${s.is_active ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                      {s.is_active ? 'Active' : 'Disabled'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => {
                          setEditing(s);
                          setShowForm(true);
                        }}
                        className="p-2 rounded-lg text-navy-600 hover:bg-navy-100 transition-colors"
                        aria-label="Edit"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleToggleActive(s)}
                        className={`p-2 rounded-lg transition-colors ${s.is_active ? 'text-gold-600 hover:bg-gold-50' : 'text-emerald-600 hover:bg-emerald-50'}`}
                        aria-label={s.is_active ? 'Disable' : 'Enable'}
                      >
                        <Power className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setDeleteId(s.id)}
                        className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                        aria-label="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {services.length === 0 && (
          <div className="text-center py-16 text-navy-500">
            <Wrench className="h-12 w-12 mx-auto mb-3 text-navy-300" />
            <p>No services yet. Click "Add Service" to create one.</p>
          </div>
        )}
      </div>

      {showForm && (
        <ServiceForm
          service={editing}
          onClose={() => setShowForm(false)}
          onSaved={() => {
            setShowForm(false);
            fetchServices();
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
              <h3 className="font-heading font-bold text-lg text-navy-900 mb-2">Delete this service?</h3>
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

interface ServiceFormProps {
  service: Service | null;
  onClose: () => void;
  onSaved: () => void;
}

function ServiceForm({ service, onClose, onSaved }: ServiceFormProps) {
  const [name, setName] = useState(service?.name ?? '');
  const [description, setDescription] = useState(service?.description ?? '');
  const [isActive, setIsActive] = useState(service?.is_active ?? true);
  const [displayOrder, setDisplayOrder] = useState(service?.display_order ?? 0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = { name, description, is_active: isActive, display_order: displayOrder };

    if (service) {
      const { error } = await supabase.from('services').update(payload).eq('id', service.id);
      if (error) setError(error.message);
    } else {
      const { error } = await supabase.from('services').insert(payload);
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
          <h3 className="font-heading font-bold text-xl text-navy-900">{service ? 'Edit Service' : 'Add New Service'}</h3>
          <button onClick={onClose} className="p-2 rounded-lg text-navy-500 hover:bg-navy-100 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1.5">Service Name *</label>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Home Deep Cleaning" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1.5">Description *</label>
            <textarea required value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="Service description" className={inputClass + ' resize-none'} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1.5">Display Order</label>
              <input type="number" value={displayOrder} onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1.5">Status</label>
              <button type="button" onClick={() => setIsActive(!isActive)} className={`w-full px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${isActive ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-red-50 text-red-500 border border-red-200'}`}>
                {isActive ? 'Active' : 'Disabled'}
              </button>
            </div>
          </div>
          {error && <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">{error}</div>}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-ghost flex-1">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary flex-1 disabled:opacity-60">
              {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Plus className="h-5 w-5" />}
              {service ? 'Save Changes' : 'Add Service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
