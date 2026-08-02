import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Power, X, Loader2, Package } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/types';

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('display_order', { ascending: true });
    if (!error && data) {
      setProducts(data as Product[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleToggleActive = async (p: Product) => {
    await supabase.from('products').update({ is_active: !p.is_active }).eq('id', p.id);
    fetchProducts();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await supabase.from('products').delete().eq('id', deleteId);
    setDeleteId(null);
    fetchProducts();
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
          <h2 className="font-heading font-bold text-2xl text-navy-900">Product Management</h2>
          <p className="text-navy-500 mt-1">Add, edit, enable, or disable products.</p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="btn-primary !py-2.5 text-sm"
        >
          <Plus className="h-5 w-5" />
          Add Product
        </button>
      </div>

      {/* Products table */}
      <div className="bg-white rounded-2xl shadow-soft border border-navy-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-navy-50 border-b border-navy-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-navy-600 uppercase">Order</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-navy-600 uppercase">Name</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-navy-600 uppercase">Category</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-navy-600 uppercase">Sizes</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-navy-600 uppercase">Variants</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-navy-600 uppercase">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-navy-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-navy-50/50 transition-colors">
                  <td className="px-4 py-3 text-sm text-navy-500">{p.display_order}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-navy-900">{p.name}</p>
                    {p.description && (
                      <p className="text-xs text-navy-400 mt-0.5 line-clamp-1">{p.description}</p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="badge bg-navy-100 text-navy-600 capitalize">{p.category}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-navy-600">
                    <div className="flex flex-wrap gap-1">
                      {p.sizes.map((s) => (
                        <span key={s} className="px-2 py-0.5 bg-brand-50 text-brand-700 rounded text-xs">{s}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-navy-600">
                    {p.variants && p.variants.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {p.variants.map((v) => (
                          <span key={v} className="px-2 py-0.5 bg-gold-500/10 text-gold-600 rounded text-xs">{v}</span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-navy-300 text-xs">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`badge ${p.is_active ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                      {p.is_active ? 'Active' : 'Disabled'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => {
                          setEditing(p);
                          setShowForm(true);
                        }}
                        className="p-2 rounded-lg text-navy-600 hover:bg-navy-100 transition-colors"
                        aria-label="Edit"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleToggleActive(p)}
                        className={`p-2 rounded-lg transition-colors ${p.is_active ? 'text-gold-600 hover:bg-gold-50' : 'text-emerald-600 hover:bg-emerald-50'}`}
                        aria-label={p.is_active ? 'Disable' : 'Enable'}
                      >
                        <Power className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setDeleteId(p.id)}
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
        {products.length === 0 && (
          <div className="text-center py-16 text-navy-500">
            <Package className="h-12 w-12 mx-auto mb-3 text-navy-300" />
            <p>No products yet. Click "Add Product" to create one.</p>
          </div>
        )}
      </div>

      {/* Form modal */}
      {showForm && (
        <ProductForm
          product={editing}
          onClose={() => setShowForm(false)}
          onSaved={() => {
            setShowForm(false);
            fetchProducts();
          }}
        />
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
              <h3 className="font-heading font-bold text-lg text-navy-900 mb-2">Delete this product?</h3>
              <p className="text-sm text-navy-500 mb-6">This action cannot be undone. The product will be permanently removed.</p>
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

// ============================================================
// Product Form
// ============================================================
interface ProductFormProps {
  product: Product | null;
  onClose: () => void;
  onSaved: () => void;
}

function ProductForm({ product, onClose, onSaved }: ProductFormProps) {
  const [name, setName] = useState(product?.name ?? '');
  const [category, setCategory] = useState<'chemical' | 'disposable'>(product?.category ?? 'chemical');
  const [description, setDescription] = useState(product?.description ?? '');
  const [sizes, setSizes] = useState<string[]>(product?.sizes ?? []);
  const [variants, setVariants] = useState<string[]>(product?.variants ?? []);
  const [isActive, setIsActive] = useState(product?.is_active ?? true);
  const [displayOrder, setDisplayOrder] = useState(product?.display_order ?? 0);
  const [newSize, setNewSize] = useState('');
  const [newVariant, setNewVariant] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addSize = () => {
    const s = newSize.trim();
    if (s && !sizes.includes(s)) {
      setSizes([...sizes, s]);
      setNewSize('');
    }
  };
  const removeSize = (s: string) => setSizes(sizes.filter((x) => x !== s));

  const addVariant = () => {
    const v = newVariant.trim();
    if (v && !variants.includes(v)) {
      setVariants([...variants, v]);
      setNewVariant('');
    }
  };
  const removeVariant = (v: string) => setVariants(variants.filter((x) => x !== v));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    if (sizes.length === 0) {
      setError('Please add at least one size.');
      setSaving(false);
      return;
    }

    const payload = {
      name,
      category,
      description: description || null,
      sizes,
      variants: variants.length > 0 ? variants : null,
      is_active: isActive,
      display_order: displayOrder,
    };

    if (product) {
      const { error } = await supabase.from('products').update(payload).eq('id', product.id);
      if (error) setError(error.message);
    } else {
      const { error } = await supabase.from('products').insert(payload);
      if (error) setError(error.message);
    }

    setSaving(false);
    if (!error) onSaved();
  };

  const inputClass = 'w-full px-4 py-2.5 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all text-navy-800 placeholder-navy-400';

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-strong w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm flex items-center justify-between p-5 border-b border-navy-100 z-10">
          <h3 className="font-heading font-bold text-xl text-navy-900">
            {product ? 'Edit Product' : 'Add New Product'}
          </h3>
          <button onClick={onClose} className="p-2 rounded-lg text-navy-500 hover:bg-navy-100 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1.5">Product Name *</label>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Floor Cleaner" className={inputClass} />
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1.5">Category *</label>
            <select value={category} onChange={(e) => setCategory(e.target.value as 'chemical' | 'disposable')} className={inputClass}>
              <option value="chemical">Chemical</option>
              <option value="disposable">Disposable</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1.5">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} placeholder="Optional product description" className={inputClass + ' resize-none'} />
          </div>

          {/* Sizes */}
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1.5">Available Sizes *</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newSize}
                onChange={(e) => setNewSize(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSize())}
                placeholder="e.g. 5 L, 500 ml"
                className={inputClass}
              />
              <button type="button" onClick={addSize} className="px-4 py-2.5 bg-brand-50 text-brand-700 rounded-lg hover:bg-brand-100 transition-colors font-medium text-sm whitespace-nowrap">
                <Plus className="h-4 w-4 inline" /> Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => (
                <span key={s} className="inline-flex items-center gap-1 px-3 py-1.5 bg-brand-50 text-brand-700 rounded-lg text-sm">
                  {s}
                  <button type="button" onClick={() => removeSize(s)} className="text-brand-400 hover:text-red-500">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Variants */}
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1.5">Variants (optional)</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newVariant}
                onChange={(e) => setNewVariant(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addVariant())}
                placeholder="e.g. Economic, Premium"
                className={inputClass}
              />
              <button type="button" onClick={addVariant} className="px-4 py-2.5 bg-navy-50 text-navy-700 rounded-lg hover:bg-navy-100 transition-colors font-medium text-sm whitespace-nowrap">
                <Plus className="h-4 w-4 inline" /> Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {variants.map((v) => (
                <span key={v} className="inline-flex items-center gap-1 px-3 py-1.5 bg-gold-500/10 text-gold-600 rounded-lg text-sm">
                  {v}
                  <button type="button" onClick={() => removeVariant(v)} className="text-gold-400 hover:text-red-500">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1.5">Display Order</label>
              <input type="number" value={displayOrder} onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1.5">Status</label>
              <button
                type="button"
                onClick={() => setIsActive(!isActive)}
                className={`w-full px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${isActive ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-red-50 text-red-500 border border-red-200'}`}
              >
                {isActive ? 'Active' : 'Disabled'}
              </button>
            </div>
          </div>

          {error && (
            <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">{error}</div>
          )}

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-ghost flex-1">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary flex-1 disabled:opacity-60">
              {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Plus className="h-5 w-5" />}
              {product ? 'Save Changes' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
