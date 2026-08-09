
import { useEffect, useMemo, useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Power,
  X,
  Loader2,
  Package,
  Search,
  Filter,
  Droplets,
  ShoppingBag,
  Wrench,
  Brush,
  ShieldCheck,
  Trash,
  SprayCan,
  Boxes,
  RefreshCw,
} from 'lucide-react';

import { supabase } from '@/lib/supabase';
import type { Product } from '@/types';

/* ============================================================
   CATEGORY CONFIG
============================================================ */

const PRODUCT_CATEGORIES = [
  {
    value: 'chemical',
    label: 'Cleaning Chemicals',
    icon: Droplets,
    description: 'Professional-grade cleaning chemicals',
  },
  {
    value: 'disposable',
    label: 'Disposable Products',
    icon: ShoppingBag,
    description: 'Cups, plates, containers and disposables',
  },
  {
    value: 'equipment',
    label: 'Cleaning Equipment',
    icon: Wrench,
    description: 'Professional cleaning machines and equipment',
  },
  {
    value: 'tools',
    label: 'Cleaning Tools',
    icon: Brush,
    description: 'Mops, brushes and cleaning tools',
  },
  {
    value: 'accessories',
    label: 'Accessories',
    icon: Package,
    description: 'Cleaning accessories and supporting products',
  },
  {
    value: 'ppe',
    label: 'Safety & PPE',
    icon: ShieldCheck,
    description: 'Gloves, masks and protective equipment',
  },
  {
    value: 'mop',
    label: 'Mops & Brushes',
    icon: Brush,
    description: 'Mops, brushes and floor-care products',
  },
  {
    value: 'waste',
    label: 'Waste Management',
    icon: Trash,
    description: 'Bins, garbage bags and waste-management products',
  },
  {
    value: 'spray',
    label: 'Sprayers',
    icon: SprayCan,
    description: 'Sprayers and dispensing equipment',
  },
  {
    value: 'other',
    label: 'Other Products',
    icon: Boxes,
    description: 'Other cleaning and housekeeping products',
  },
] as const;

type ProductCategory = string;

/* ============================================================
   HELPERS
============================================================ */

function getCategoryLabel(category: string) {
  const found = PRODUCT_CATEGORIES.find(
    (item) => item.value === category
  );

  if (found) {
    return found.label;
  }

  return category
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getCategoryIcon(category: string) {
  const found = PRODUCT_CATEGORIES.find(
    (item) => item.value === category
  );

  return found?.icon ?? Boxes;
}

function getCategoryClasses(category: string) {
  switch (category) {
    case 'chemical':
      return 'bg-brand-50 text-brand-700 border-brand-100';

    case 'disposable':
      return 'bg-blue-50 text-blue-700 border-blue-100';

    case 'equipment':
      return 'bg-purple-50 text-purple-700 border-purple-100';

    case 'tools':
      return 'bg-emerald-50 text-emerald-700 border-emerald-100';

    case 'accessories':
      return 'bg-orange-50 text-orange-700 border-orange-100';

    case 'ppe':
      return 'bg-red-50 text-red-700 border-red-100';

    case 'mop':
      return 'bg-cyan-50 text-cyan-700 border-cyan-100';

    case 'waste':
      return 'bg-rose-50 text-rose-700 border-rose-100';

    case 'spray':
      return 'bg-indigo-50 text-indigo-700 border-indigo-100';

    default:
      return 'bg-navy-50 text-navy-700 border-navy-100';
  }
}

/* ============================================================
   MAIN PRODUCT MANAGEMENT
============================================================ */

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'active' | 'disabled'
  >('all');

  /* ------------------------------------------------------------
     FETCH PRODUCTS
  ------------------------------------------------------------ */

  const fetchProducts = async () => {
    setLoading(true);

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

  /* ------------------------------------------------------------
     TOGGLE ACTIVE
  ------------------------------------------------------------ */

  const handleToggleActive = async (product: Product) => {
    const { error } = await supabase
      .from('products')
      .update({
        is_active: !product.is_active,
      })
      .eq('id', product.id);

    if (!error) {
      setProducts((current) =>
        current.map((item) =>
          item.id === product.id
            ? {
                ...item,
                is_active: !item.is_active,
              }
            : item
        )
      );
    }
  };

  /* ------------------------------------------------------------
     DELETE
  ------------------------------------------------------------ */

  const handleDelete = async () => {
    if (!deleteId) return;

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', deleteId);

    if (!error) {
      setProducts((current) =>
        current.filter((product) => product.id !== deleteId)
      );
    }

    setDeleteId(null);
  };

  /* ------------------------------------------------------------
     FILTERED PRODUCTS
  ------------------------------------------------------------ */

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      const matchesCategory =
        categoryFilter === 'all' ||
        product.category === categoryFilter;

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' && product.is_active) ||
        (statusFilter === 'disabled' && !product.is_active);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [
    products,
    search,
    categoryFilter,
    statusFilter,
  ]);

  /* ------------------------------------------------------------
     STATS
  ------------------------------------------------------------ */

  const activeCount = products.filter(
    (product) => product.is_active
  ).length;

  const disabledCount = products.filter(
    (product) => !product.is_active
  ).length;

  const categoryCount = new Set(
    products.map((product) => product.category)
  ).size;

  /* ------------------------------------------------------------
     LOADING
  ------------------------------------------------------------ */

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50">
            <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
          </div>

          <div className="text-center">
            <p className="font-semibold text-navy-900">
              Loading products
            </p>
            <p className="mt-1 text-sm text-navy-500">
              Please wait...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ========================================================
          HEADER
      ======================================================== */}

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-950 via-navy-900 to-brand-950 p-6 sm:p-8">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
              <Package className="h-3.5 w-3.5 text-brand-300" />
              Product Catalogue
            </div>

            <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
              Product Management
            </h2>

            <p className="mt-2 max-w-xl text-sm text-navy-200">
              Add, edit, organize and manage your cleaning products,
              categories, sizes and variants.
            </p>
          </div>

          <button
            onClick={() => {
              setEditing(null);
              setShowForm(true);
            }}
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 transition-all hover:-translate-y-0.5 hover:bg-brand-500 hover:shadow-xl"
          >
            <Plus className="h-5 w-5 transition-transform group-hover:rotate-90" />
            Add Product
          </button>
        </div>
      </div>

      {/* ========================================================
          STATS
      ======================================================== */}

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="rounded-2xl border border-navy-100 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                Total
              </p>
              <p className="mt-1 text-2xl font-bold text-navy-900">
                {products.length}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50">
              <Package className="h-5 w-5 text-brand-600" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-navy-100 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                Active
              </p>
              <p className="mt-1 text-2xl font-bold text-emerald-600">
                {activeCount}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
              <Power className="h-5 w-5 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-navy-100 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                Disabled
              </p>
              <p className="mt-1 text-2xl font-bold text-red-500">
                {disabledCount}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50">
              <Power className="h-5 w-5 text-red-500" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-navy-100 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                Categories
              </p>
              <p className="mt-1 text-2xl font-bold text-purple-600">
                {categoryCount}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50">
              <Boxes className="h-5 w-5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          FILTERS
      ======================================================== */}

      <div className="rounded-2xl border border-navy-100 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-xl border border-navy-200 bg-navy-50/30 py-2.5 pl-10 pr-4 text-sm text-navy-800 outline-none transition-all placeholder:text-navy-400 focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
            />
          </div>

          {/* Category */}
          <div className="relative lg:w-64">
            <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />

            <select
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(e.target.value)
              }
              className="w-full appearance-none rounded-xl border border-navy-200 bg-navy-50/30 py-2.5 pl-10 pr-4 text-sm text-navy-800 outline-none transition-all focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
            >
              <option value="all">
                All Categories
              </option>

              {PRODUCT_CATEGORIES.map((category) => (
                <option
                  key={category.value}
                  value={category.value}
                >
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value as
                  | 'all'
                  | 'active'
                  | 'disabled'
              )
            }
            className="rounded-xl border border-navy-200 bg-navy-50/30 px-4 py-2.5 text-sm text-navy-800 outline-none transition-all focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100 lg:w-40"
          >
            <option value="all">
              All Status
            </option>
            <option value="active">
              Active
            </option>
            <option value="disabled">
              Disabled
            </option>
          </select>

          {/* Refresh */}
          <button
            onClick={fetchProducts}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-navy-200 px-4 py-2.5 text-sm font-medium text-navy-700 transition-all hover:bg-navy-50"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>

        <div className="mt-3 text-xs text-navy-400">
          Showing{' '}
          <span className="font-semibold text-navy-700">
            {filteredProducts.length}
          </span>{' '}
          of{' '}
          <span className="font-semibold text-navy-700">
            {products.length}
          </span>{' '}
          products
        </div>
      </div>

      {/* ========================================================
          PRODUCTS TABLE
      ======================================================== */}

      <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px]">
            <thead className="border-b border-navy-100 bg-navy-50/70">
              <tr>
                <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-navy-500">
                  Order
                </th>

                <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-navy-500">
                  Product
                </th>

                <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-navy-500">
                  Category
                </th>

                <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-navy-500">
                  Sizes
                </th>

                <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-navy-500">
                  Variants
                </th>

                <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-navy-500">
                  Status
                </th>

                <th className="px-4 py-4 text-right text-[11px] font-bold uppercase tracking-wider text-navy-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-navy-100">
              {filteredProducts.map((product) => {
                const CategoryIcon = getCategoryIcon(
                  product.category
                );

                return (
                  <tr
                    key={product.id}
                    className="group transition-colors hover:bg-navy-50/50"
                  >
                    {/* Order */}
                    <td className="px-4 py-4">
                      <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-lg bg-navy-50 px-2 text-xs font-bold text-navy-600">
                        {product.display_order}
                      </span>
                    </td>

                    {/* Product */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                          <Package className="h-5 w-5" />
                        </div>

                        <div className="min-w-0">
                          <p className="font-semibold text-navy-900">
                            {product.name}
                          </p>

                          {product.description && (
                            <p className="mt-0.5 max-w-xs truncate text-xs text-navy-400">
                              {product.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold ${getCategoryClasses(
                          product.category
                        )}`}
                      >
                        <CategoryIcon className="h-3.5 w-3.5" />

                        {getCategoryLabel(
                          product.category
                        )}
                      </span>
                    </td>

                    {/* Sizes */}
                    <td className="px-4 py-4">
                      <div className="flex max-w-[220px] flex-wrap gap-1.5">
                        {product.sizes.map((size) => (
                          <span
                            key={size}
                            className="rounded-md bg-brand-50 px-2 py-1 text-[11px] font-medium text-brand-700"
                          >
                            {size}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Variants */}
                    <td className="px-4 py-4">
                      {product.variants &&
                      product.variants.length > 0 ? (
                        <div className="flex max-w-[220px] flex-wrap gap-1.5">
                          {product.variants.map(
                            (variant) => (
                              <span
                                key={variant}
                                className="rounded-md bg-amber-50 px-2 py-1 text-[11px] font-medium text-amber-700"
                              >
                                {variant}
                              </span>
                            )
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-navy-300">
                          No variants
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                          product.is_active
                            ? 'bg-emerald-50 text-emerald-600'
                            : 'bg-red-50 text-red-500'
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            product.is_active
                              ? 'bg-emerald-500'
                              : 'bg-red-500'
                          }`}
                        />

                        {product.is_active
                          ? 'Active'
                          : 'Disabled'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => {
                            setEditing(product);
                            setShowForm(true);
                          }}
                          className="rounded-lg p-2 text-navy-500 transition-all hover:bg-navy-100 hover:text-navy-900"
                          aria-label="Edit product"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() =>
                            handleToggleActive(product)
                          }
                          className={`rounded-lg p-2 transition-all ${
                            product.is_active
                              ? 'text-amber-500 hover:bg-amber-50'
                              : 'text-emerald-600 hover:bg-emerald-50'
                          }`}
                          aria-label={
                            product.is_active
                              ? 'Disable product'
                              : 'Enable product'
                          }
                        >
                          <Power className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() =>
                            setDeleteId(product.id)
                          }
                          className="rounded-lg p-2 text-red-500 transition-all hover:bg-red-50"
                          aria-label="Delete product"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty */}
        {filteredProducts.length === 0 && (
          <div className="px-6 py-20 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-navy-50">
              <Package className="h-8 w-8 text-navy-300" />
            </div>

            <h3 className="mt-4 font-heading text-lg font-bold text-navy-900">
              No products found
            </h3>

            <p className="mt-1 text-sm text-navy-500">
              Try changing your search or filters.
            </p>
          </div>
        )}
      </div>

      {/* ========================================================
          FORM MODAL
      ======================================================== */}

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

      {/* ========================================================
          DELETE CONFIRMATION
      ======================================================== */}

      {deleteId && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          onClick={() => setDeleteId(null)}
        >
          <div className="absolute inset-0 bg-navy-950/70 backdrop-blur-md" />

          <div
            className="relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50">
                <Trash2 className="h-7 w-7 text-red-500" />
              </div>

              <h3 className="mt-5 font-heading text-xl font-bold text-navy-900">
                Delete this product?
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-navy-500">
                This action cannot be undone. The product will be
                permanently removed.
              </p>

              <div className="mt-6 flex w-full gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="btn-ghost flex-1"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDelete}
                  className="btn-primary !bg-red-500 hover:!bg-red-600 flex-1"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   PRODUCT FORM
============================================================ */

interface ProductFormProps {
  product: Product | null;
  onClose: () => void;
  onSaved: () => void;
}

function ProductForm({
  product,
  onClose,
  onSaved,
}: ProductFormProps) {
  const [name, setName] = useState(
    product?.name ?? ''
  );

  const [category, setCategory] = useState<ProductCategory>(
    product?.category ?? 'chemical'
  );

  const [description, setDescription] = useState(
    product?.description ?? ''
  );

  const [sizes, setSizes] = useState<string[]>(
    product?.sizes ?? []
  );

  const [variants, setVariants] = useState<string[]>(
    product?.variants ?? []
  );

  const [isActive, setIsActive] = useState(
    product?.is_active ?? true
  );

  const [displayOrder, setDisplayOrder] = useState(
    product?.display_order ?? 0
  );

  const [newSize, setNewSize] = useState('');
  const [newVariant, setNewVariant] = useState('');

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(
    null
  );

  /* ------------------------------------------------------------
     SIZE
  ------------------------------------------------------------ */

  const addSize = () => {
    const value = newSize.trim();

    if (value && !sizes.includes(value)) {
      setSizes([...sizes, value]);
      setNewSize('');
    }
  };

  const removeSize = (size: string) => {
    setSizes(
      sizes.filter((item) => item !== size)
    );
  };

  /* ------------------------------------------------------------
     VARIANT
  ------------------------------------------------------------ */

  const addVariant = () => {
    const value = newVariant.trim();

    if (value && !variants.includes(value)) {
      setVariants([...variants, value]);
      setNewVariant('');
    }
  };

  const removeVariant = (variant: string) => {
    setVariants(
      variants.filter((item) => item !== variant)
    );
  };

  /* ------------------------------------------------------------
     SUBMIT
  ------------------------------------------------------------ */

  const handleSubmit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    setSaving(true);
    setError(null);

    if (!name.trim()) {
      setError('Please enter a product name.');
      setSaving(false);
      return;
    }

    if (!category) {
      setError('Please select a category.');
      setSaving(false);
      return;
    }

    if (sizes.length === 0) {
      setError('Please add at least one size.');
      setSaving(false);
      return;
    }

    const payload = {
      name: name.trim(),
      category,
      description: description.trim() || null,
      sizes,
      variants:
        variants.length > 0 ? variants : null,
      is_active: isActive,
      display_order: displayOrder,
    };

    let saveError = null;

    if (product) {
      const result = await supabase
        .from('products')
        .update(payload)
        .eq('id', product.id);

      saveError = result.error;
    } else {
      const result = await supabase
        .from('products')
        .insert(payload);

      saveError = result.error;
    }

    if (saveError) {
      setError(saveError.message);
      setSaving(false);
      return;
    }

    setSaving(false);
    onSaved();
  };

  const inputClass =
    'w-full rounded-xl border border-navy-200 bg-white px-4 py-2.5 text-sm text-navy-800 outline-none transition-all placeholder:text-navy-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-100';

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-navy-950/70 backdrop-blur-md" />

      <div
        className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-navy-100 bg-white/95 p-5 backdrop-blur-sm">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50">
                <Package className="h-5 w-5 text-brand-600" />
              </div>

              <h3 className="font-heading text-xl font-bold text-navy-900">
                {product
                  ? 'Edit Product'
                  : 'Add New Product'}
              </h3>
            </div>

            <p className="mt-1 text-xs text-navy-400">
              Manage product information, category and variants.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-navy-500 transition-colors hover:bg-navy-100 hover:text-navy-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 space-y-5 overflow-y-auto p-5"
        >
          {/* Product name */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-navy-700">
              Product Name *
            </label>

            <input
              type="text"
              required
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="e.g. Floor Cleaner"
              className={inputClass}
            />
          </div>

          {/* Category */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-navy-700">
              Category *
            </label>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {PRODUCT_CATEGORIES.map(
                (categoryOption) => {
                  const Icon =
                    categoryOption.icon;

                  const selected =
                    category ===
                    categoryOption.value;

                  return (
                    <button
                      key={categoryOption.value}
                      type="button"
                      onClick={() =>
                        setCategory(
                          categoryOption.value
                        )
                      }
                      className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                        selected
                          ? 'border-brand-400 bg-brand-50 ring-2 ring-brand-100'
                          : 'border-navy-200 bg-white hover:border-navy-300 hover:bg-navy-50'
                      }`}
                    >
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                          selected
                            ? 'bg-brand-100 text-brand-600'
                            : 'bg-navy-50 text-navy-500'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>

                      <div className="min-w-0">
                        <p
                          className={`text-sm font-semibold ${
                            selected
                              ? 'text-brand-700'
                              : 'text-navy-800'
                          }`}
                        >
                          {categoryOption.label}
                        </p>

                        <p className="mt-0.5 truncate text-[10px] text-navy-400">
                          {categoryOption.description}
                        </p>
                      </div>
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-navy-700">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              rows={3}
              placeholder="Optional product description"
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Sizes */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-navy-700">
              Available Sizes *
            </label>

            <div className="flex gap-2">
              <input
                type="text"
                value={newSize}
                onChange={(e) =>
                  setNewSize(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSize();
                  }
                }}
                placeholder="e.g. 5 L, 500 ml"
                className={inputClass}
              />

              <button
                type="button"
                onClick={addSize}
                className="shrink-0 rounded-xl bg-brand-50 px-4 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-100"
              >
                <Plus className="mr-1 inline h-4 w-4" />
                Add
              </button>
            </div>

            {sizes.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <span
                    key={size}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-brand-50 px-3 py-1.5 text-sm font-medium text-brand-700"
                  >
                    {size}

                    <button
                      type="button"
                      onClick={() =>
                        removeSize(size)
                      }
                      className="text-brand-400 transition-colors hover:text-red-500"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Variants */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-navy-700">
              Variants
              <span className="ml-1 text-xs font-normal text-navy-400">
                (optional)
              </span>
            </label>

            <div className="flex gap-2">
              <input
                type="text"
                value={newVariant}
                onChange={(e) =>
                  setNewVariant(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addVariant();
                  }
                }}
                placeholder="e.g. Economic, Premium"
                className={inputClass}
              />

              <button
                type="button"
                onClick={addVariant}
                className="shrink-0 rounded-xl bg-navy-50 px-4 text-sm font-semibold text-navy-700 transition-colors hover:bg-navy-100"
              >
                <Plus className="mr-1 inline h-4 w-4" />
                Add
              </button>
            </div>

            {variants.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {variants.map((variant) => (
                  <span
                    key={variant}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-700"
                  >
                    {variant}

                    <button
                      type="button"
                      onClick={() =>
                        removeVariant(variant)
                      }
                      className="text-amber-400 transition-colors hover:text-red-500"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Order + Status */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-navy-700">
                Display Order
              </label>

              <input
                type="number"
                min="0"
                value={displayOrder}
                onChange={(e) =>
                  setDisplayOrder(
                    parseInt(e.target.value) || 0
                  )
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-navy-700">
                Status
              </label>

              <button
                type="button"
                onClick={() =>
                  setIsActive(!isActive)
                }
                className={`w-full rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all ${
                  isActive
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-600'
                    : 'border-red-200 bg-red-50 text-red-500'
                }`}
              >
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-current" />
                {isActive
                  ? 'Active'
                  : 'Disabled'}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 border-t border-navy-100 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="btn-ghost flex-1"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Plus className="h-5 w-5" />
              )}

              {saving
                ? 'Saving...'
                : product
                ? 'Save Changes'
                : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

