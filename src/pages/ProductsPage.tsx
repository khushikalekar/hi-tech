import { useMemo, useState } from 'react';
import {
  Droplets,
  ShoppingBag,
  ShoppingCart,
  Loader2,
  Send,
  Package,
  Wrench,
  Brush,
  ShieldCheck,
  Sparkles,
  Boxes,
  Trash2,
  SprayCan,
  Search,
  SearchX,
} from 'lucide-react';

import { useProducts } from '@/hooks/useSupabaseData';
import ProductCard from '@/components/ProductCard';
import { useEnquiry } from '@/context/EnquiryContext';

type ProductFilter = 'all' | string;

type CategoryConfig = {
  label: string;
  description: string;
  icon: typeof Package;
  iconClass: string;
  bgClass: string;
};

const categoryConfig: Record<string, CategoryConfig> = {
  chemical: {
    label: 'Cleaning Chemicals',
    description: 'Professional-grade cleaning chemicals',
    icon: Droplets,
    iconClass: 'text-brand-600',
    bgClass: 'bg-brand-50',
  },

  disposable: {
    label: 'Disposable Products',
    description: 'Quality disposable products in multiple sizes',
    icon: ShoppingBag,
    iconClass: 'text-navy-700',
    bgClass: 'bg-navy-100',
  },

  equipment: {
    label: 'Cleaning Equipment',
    description: 'Professional equipment for efficient cleaning',
    icon: Wrench,
    iconClass: 'text-blue-600',
    bgClass: 'bg-blue-50',
  },

  tools: {
    label: 'Cleaning Tools',
    description: 'Mops, brushes and essential cleaning tools',
    icon: Brush,
    iconClass: 'text-emerald-600',
    bgClass: 'bg-emerald-50',
  },

  accessories: {
    label: 'Accessories',
    description: 'Useful accessories for professional cleaning',
    icon: Package,
    iconClass: 'text-purple-600',
    bgClass: 'bg-purple-50',
  },

  ppe: {
    label: 'Safety & PPE',
    description: 'Protective equipment for safe cleaning',
    icon: ShieldCheck,
    iconClass: 'text-orange-600',
    bgClass: 'bg-orange-50',
  },

  mop: {
    label: 'Mops & Brushes',
    description: 'Durable mops, brushes and floor-care products',
    icon: Brush,
    iconClass: 'text-cyan-600',
    bgClass: 'bg-cyan-50',
  },

  waste: {
    label: 'Waste Management',
    description: 'Products for efficient waste collection and disposal',
    icon: Trash2,
    iconClass: 'text-rose-600',
    bgClass: 'bg-rose-50',
  },

  spray: {
    label: 'Sprayers',
    description: 'Professional spraying and dispensing solutions',
    icon: SprayCan,
    iconClass: 'text-indigo-600',
    bgClass: 'bg-indigo-50',
  },
};

const defaultCategoryConfig: CategoryConfig = {
  label: 'Other Products',
  description: 'Quality products for professional cleaning requirements',
  icon: Boxes,
  iconClass: 'text-slate-600',
  bgClass: 'bg-slate-100',
};

function getCategoryConfig(category: string): CategoryConfig {
  const normalized = category.toLowerCase().trim();

  if (categoryConfig[normalized]) {
    return categoryConfig[normalized];
  }

  if (normalized.includes('chemical')) {
    return categoryConfig.chemical;
  }

  if (
    normalized.includes('disposable') ||
    normalized.includes('disposables')
  ) {
    return categoryConfig.disposable;
  }

  if (
    normalized.includes('equipment') ||
    normalized.includes('machine')
  ) {
    return categoryConfig.equipment;
  }

  if (
    normalized.includes('tool') ||
    normalized.includes('brush') ||
    normalized.includes('mop')
  ) {
    return categoryConfig.tools;
  }

  if (
    normalized.includes('ppe') ||
    normalized.includes('safety') ||
    normalized.includes('glove')
  ) {
    return categoryConfig.ppe;
  }

  if (
    normalized.includes('waste') ||
    normalized.includes('bin') ||
    normalized.includes('garbage')
  ) {
    return categoryConfig.waste;
  }

  if (
    normalized.includes('spray') ||
    normalized.includes('sprayer')
  ) {
    return categoryConfig.spray;
  }

  return defaultCategoryConfig;
}

function formatCategoryName(category: string) {
  const config = getCategoryConfig(category);

  if (config !== defaultCategoryConfig) {
    return config.label;
  }

  return category
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function ProductsPage() {
  const { products, loading } = useProducts();
  const { totalItems, openCart } = useEnquiry();

  const [filter, setFilter] = useState<ProductFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  /*
   * Build categories automatically from products.
   *
   * Example:
   * chemical
   * disposable
   * equipment
   * tools
   * accessories
   *
   * Any new category added in Supabase will automatically appear here.
   */
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(
        products
          .map((product) => product.category?.trim())
          .filter(Boolean)
      )
    ) as string[];

    return uniqueCategories;
  }, [products]);

  const productsByCategory = useMemo(() => {
    return categories.reduce<Record<string, typeof products>>(
      (accumulator, category) => {
        accumulator[category] = products.filter(
          (product) => product.category?.trim() === category
        );

        return accumulator;
      },
      {}
    );
  }, [products, categories]);

  // Instant local product search — no button/API request required.
  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return products;
    }

    return products.filter((product) => {
      const searchableText = [
        product.name,
        product.description,
        product.category,
        ...(Array.isArray(product.sizes) ? product.sizes : []),
        ...(Array.isArray(product.variants) ? product.variants : []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [products, searchQuery]);

  const filteredProductsByCategory = useMemo(() => {
    return categories.reduce<Record<string, typeof products>>((accumulator, category) => {
      accumulator[category] = filteredProducts.filter(
        (product) => product.category?.trim() === category
      );
      return accumulator;
    }, {});
  }, [filteredProducts, categories]);

  const visibleCategories = useMemo(() => {
    if (filter === 'all') {
      return categories;
    }

    return categories.filter((category) => category === filter);
  }, [categories, filter]);

  return (
    <div className="min-h-screen bg-white">
      {/* =========================================================
          HERO
      ========================================================= */}

{/* =========================================================
    HERO
========================================================= */}
<section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-brand-950">
  {/* Decorative background */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />
    <div className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

    <div
      className="absolute inset-0 opacity-[0.035]"
      style={{
        backgroundImage:
          'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
        backgroundSize: '30px 30px',
      }}
    />
  </div>

  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="py-12 sm:py-14 md:py-16 text-center">

      {/* Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-white backdrop-blur-md animate-fade-in-up">
        <Sparkles className="h-3.5 w-3.5 text-brand-300" />
        Professional Cleaning Supplies
      </div>

      {/* Heading */}
      <h1
        className="mt-4 font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white animate-fade-in-up"
      >
        Quality Products for
        <span className="block bg-gradient-to-r from-brand-300 via-brand-400 to-cyan-300 mt-3 bg-clip-text text-transparent">
          Professional Cleaning
        </span>
      </h1>

      {/* Description */}
      <p
        className="mt-4 mx-auto max-w-2xl text-sm sm:text-base leading-relaxed text-navy-200 animate-fade-in-up"
        style={{ animationDelay: '0.1s' }}
      >
        Explore our range of cleaning chemicals, disposable products,
        equipment, tools and essential housekeeping supplies.
      </p>

      {/* Small product summary */}
      <div
        className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs sm:text-sm text-navy-300 animate-fade-in-up"
        style={{ animationDelay: '0.2s' }}
      >
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
          {products.length} Products
        </span>

        <span className="hidden sm:block h-4 w-px bg-white/20" />

        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
          {categories.length} Categories
        </span>

        <span className="hidden sm:block h-4 w-px bg-white/20" />

        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Wholesale Enquiries
        </span>
      </div>

    </div>
  </div>
</section>


      {/* =========================================================
          FILTER + ENQUIRY BAR
      ========================================================= */}
      <section className="relative z-20 -mt-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl border border-navy-100 bg-white p-3 sm:p-4 shadow-xl shadow-navy-900/10">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              
              {/* Instant Product Search */}
              <div className="w-full">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-400" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search products by name..."
                    aria-label="Search products by name"
                    className="w-full rounded-xl border border-navy-200 bg-navy-50/30 py-3 pl-10 pr-11 text-sm text-navy-900 outline-none transition-all placeholder:text-navy-400 focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
                  />

                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      aria-label="Clear product search"
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-navy-400 transition-colors hover:bg-navy-100 hover:text-navy-700"
                    >
                      <SearchX className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {searchQuery.trim() && (
                  <div className="mt-2 px-1 text-xs text-navy-500">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                  </div>
                )}
              </div>

              {/* Categories */}
              <div className="min-w-0 flex-1">
                <div className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-navy-400">
                  Browse Categories
                </div>

                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                  {/* All */}
                  <button
                    onClick={() => setFilter('all')}
                    className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                      filter === 'all'
                        ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20'
                        : 'bg-navy-50 text-navy-700 hover:bg-navy-100'
                    }`}
                  >
                    <Boxes className="h-4 w-4" />
                    All Products
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                        filter === 'all'
                          ? 'bg-white/20 text-white'
                          : 'bg-white text-navy-500'
                      }`}
                    >
                      {filteredProducts.length}
                    </span>
                  </button>

                  {/* Dynamic categories */}
                  {categories.map((category) => {
                    const config = getCategoryConfig(category);
                    const Icon = config.icon;
                    const count =
                      filteredProductsByCategory[category]?.length ?? 0;

                    return (
                      <button
                        key={category}
                        onClick={() => setFilter(category)}
                        className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                          filter === category
                            ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20'
                            : 'bg-navy-50 text-navy-700 hover:bg-navy-100'
                        }`}
                      >
                        <Icon className="h-4 w-4" />

                        {formatCategoryName(category)}

                        <span
                          className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                            filter === category
                              ? 'bg-white/20 text-white'
                              : 'bg-white text-navy-500'
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Enquiry button */}
              {totalItems > 0 && (
                <button
                  onClick={openCart}
                  className="group flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-5 py-3 font-semibold text-white shadow-lg shadow-brand-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-600/30"
                >
                  <ShoppingCart className="h-5 w-5 transition-transform group-hover:scale-110" />

                  <span>
                    View Enquiry
                  </span>

                  <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-white/20 px-1.5 text-xs">
                    {totalItems}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PRODUCTS
      ========================================================= */}
      {loading ? (
        <section className="flex min-h-[500px] items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50">
              <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
            </div>

            <div className="text-center">
              <p className="font-semibold text-navy-900">
                Loading products
              </p>
              <p className="mt-1 text-sm text-navy-500">
                Please wait a moment...
              </p>
            </div>
          </div>
        </section>
      ) : filteredProducts.length === 0 ? (
        /* Empty state */
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="rounded-3xl border border-dashed border-navy-200 bg-navy-50/50 px-6 py-20 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-sm">
              <Package className="h-10 w-10 text-navy-300" />
            </div>

            <h2 className="mt-6 font-heading text-2xl font-bold text-navy-900">
              {searchQuery.trim() ? 'No Products Found' : 'No Products Available'}
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-navy-500">
              {searchQuery.trim()
                ? `No products match “${searchQuery.trim()}”. Try another product name.`
                : "We don't have any products available at the moment. Please check back soon or contact us for more information."}
            </p>

            {searchQuery.trim() && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
              >
                <SearchX className="h-4 w-4" />
                Clear Search
              </button>
            )}
          </div>
        </section>
      ) : (
        <main>
          {visibleCategories.map((category, categoryIndex) => {
            const categoryProducts =
              filteredProductsByCategory[category] ?? [];

            if (categoryProducts.length === 0) {
              return null;
            }

            const config = getCategoryConfig(category);
            const Icon = config.icon;

            return (
              <section
                key={category}
                className={`relative overflow-hidden ${
                  categoryIndex % 2 === 1
                    ? 'bg-navy-50/40'
                    : 'bg-white'
                }`}
              >
                {/* Subtle decoration */}
                <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-brand-500/[0.025] blur-3xl" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
                  
                  {/* Section heading */}
                  <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${config.bgClass}`}
                      >
                        <Icon
                          className={`h-7 w-7 ${config.iconClass}`}
                        />
                      </div>

                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">
                            Collection
                          </span>

                          <span className="h-1 w-1 rounded-full bg-navy-300" />

                          <span className="text-xs font-medium text-navy-400">
                            {categoryProducts.length} items
                          </span>
                        </div>

                        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-navy-900">
                          {formatCategoryName(category)}
                        </h2>

                        <p className="mt-1 text-sm text-navy-500">
                          {config.description}
                        </p>
                      </div>
                    </div>

                    {/* Category count */}
                    <div className="hidden sm:flex items-center gap-2 rounded-full border border-navy-100 bg-white px-4 py-2 text-sm font-medium text-navy-600 shadow-sm">
                      <Package className="h-4 w-4 text-brand-600" />
                      {categoryProducts.length} Products
                    </div>
                  </div>

                  {/* Product grid */}
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {categoryProducts.map((product, index) => (
                      <div
                        key={product.id}
                        className="group animate-fade-in-up"
                        style={{
                          animationDelay: `${index * 0.05}s`,
                        }}
                      >
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </main>
      )}

 
{/* =========================================================
    HOW TO ORDER
========================================================= */}
          <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-blue-50">
            {/* Soft decorative background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl" />
              <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />

              <div
                className="absolute inset-0 opacity-[0.035]"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 1px 1px, #0f172a 1px, transparent 0)',
                  backgroundSize: '32px 32px',
                }}
              />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">
              <div className="mx-auto max-w-4xl">

                {/* Header */}
                <div className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white border border-brand-100 shadow-lg shadow-brand-900/5">
                    <Send className="h-6 w-6 text-brand-600" />
                  </div>

                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-brand-600">
                    Simple & Convenient
                  </p>

                  <h3 className="mt-2 font-heading text-2xl sm:text-3xl font-bold text-navy-900">
                    How to Order
                  </h3>

                  <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-navy-500">
                    Find the products you need, add them to your enquiry,
                    and send your requirements directly to us on WhatsApp.
                    We'll respond with availability, pricing and details.
                  </p>
                </div>

                {/* Steps */}
                <div className="relative mt-10">

                  {/* Connecting line - desktop */}
                  <div className="absolute left-[16.66%] right-[16.66%] top-7 hidden h-px bg-gradient-to-r from-brand-200 via-brand-300 to-brand-200 sm:block" />

                  <div className="relative grid gap-4 sm:grid-cols-3">
                    {[
                      {
                        number: '01',
                        title: 'Browse Products',
                        text: 'Explore our cleaning chemicals, disposables, equipment and supplies.',
                        icon: Package,
                      },
                      {
                        number: '02',
                        title: 'Build Your Enquiry',
                        text: 'Select products, sizes and variants and add them to your enquiry.',
                        icon: ShoppingCart,
                      },
                      {
                        number: '03',
                        title: 'Send on WhatsApp',
                        text: 'Send your requirements and receive availability and pricing from our team.',
                        icon: Send,
                      },
                    ].map((step) => {
                      const Icon = step.icon;

                      return (
                        <div
                          key={step.number}
                          className="group relative rounded-2xl border border-navy-100 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-900/5"
                        >
                          {/* Number / Icon */}
                          <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 ring-8 ring-white transition-all duration-300 group-hover:bg-brand-600 group-hover:text-white">
                            <Icon className="h-6 w-6" />

                            <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-navy-900 text-[10px] font-bold text-white shadow-md">
                              {step.number}
                            </span>
                          </div>

                          <h4 className="mt-5 font-heading text-base font-bold text-navy-900">
                            {step.title}
                          </h4>

                          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-navy-500">
                            {step.text}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* CTA */}
                {totalItems > 0 && (
                  <div className="mt-8 flex justify-center">
                    <button
                      onClick={openCart}
                      className="group inline-flex items-center gap-2.5 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-xl hover:shadow-brand-600/25"
                    >
                      <ShoppingCart className="h-5 w-5 transition-transform group-hover:scale-110" />

                      Review Your Enquiry

                      <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-white/20 px-1.5 text-xs">
                        {totalItems}
                      </span>
                    </button>
                  </div>
                )}

              </div>
            </div>
          </section>


    </div>
  );
}