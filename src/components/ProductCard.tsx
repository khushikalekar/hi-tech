
import { useState } from 'react';
import {
  Plus,
  Minus,
  Check,
  ShoppingCart,
  Package,
  Ruler,
  Layers3,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import type { Product } from '@/types';
import { useEnquiry } from '@/context/EnquiryContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, openCart } = useEnquiry();

  const [size, setSize] = useState(product.sizes[0] ?? 'Standard');
  const [variant, setVariant] = useState(
    product.variants?.[0] ?? 'Standard'
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({
      productName: product.name,
      size,
      variant,
      quantity,
    });

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2500);
  };

  const isChemical = product.category === 'chemical';

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl">

      {/* Premium top accent */}
      <div className="h-1 w-full bg-gradient-to-r from-brand-500 via-brand-600 to-cyan-500" />

      <div className="flex flex-1 flex-col p-5 sm:p-6">

        {/* Product Header */}
        <div className="flex items-start justify-between gap-4">

          <div className="min-w-0 flex-1">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                {isChemical ? (
                  <Sparkles className="h-4.5 w-4.5" />
                ) : (
                  <Package className="h-4.5 w-4.5" />
                )}
              </div>

              <span
                className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                  isChemical
                    ? 'bg-violet-50 text-violet-700 ring-1 ring-violet-100'
                    : 'bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100'
                }`}
              >
                {isChemical ? 'Chemical' : 'Disposable'}
              </span>
            </div>

            <h3 className="font-heading text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-brand-700 sm:text-xl">
              {product.name}
            </h3>
          </div>

          {/* Premium product icon */}
          <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 text-slate-400 sm:flex">
            <Package className="h-5 w-5" />
          </div>
        </div>

        {/* Description */}
        {product.description && (
          <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-slate-500">
            {product.description}
          </p>
        )}

        {/* Divider */}
        <div className="my-5 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        {/* Size Selector */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Ruler className="h-4 w-4 text-brand-600" />
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Available Size
            </label>
          </div>

          {product.sizes.length <= 1 ? (
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5">
              <span className="text-sm font-semibold text-slate-700">
                {product.sizes[0] ?? 'Standard'}
              </span>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`rounded-xl border px-3.5 py-2 text-sm font-semibold transition-all duration-200 ${
                    size === s
                      ? 'border-brand-600 bg-brand-600 text-white shadow-md shadow-brand-600/20'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Variant Selector */}
        {product.variants && product.variants.length > 0 && (
          <div className="mt-4">
            <div className="mb-2 flex items-center gap-2">
              <Layers3 className="h-4 w-4 text-brand-600" />
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Variant
              </label>
            </div>

            <div className="flex flex-wrap gap-2">
              {product.variants.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setVariant(v)}
                  className={`rounded-xl border px-3.5 py-2 text-sm font-semibold transition-all duration-200 ${
                    variant === v
                      ? 'border-brand-600 bg-brand-600 text-white shadow-md shadow-brand-600/20'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-brand-600" />
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Quantity
              </label>
            </div>

            <span className="text-xs font-medium text-slate-400">
              Units
            </span>
          </div>

          <div className="flex w-fit items-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">

            <button
              type="button"
              onClick={() =>
                setQuantity((current) => Math.max(1, current - 1))
              }
              disabled={quantity <= 1}
              className="flex h-11 w-11 items-center justify-center text-slate-600 transition-colors hover:bg-white hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>

            <div className="flex h-11 min-w-14 items-center justify-center border-x border-slate-200 bg-white">
              <span className="text-sm font-bold text-slate-900">
                {quantity}
              </span>
            </div>

            <button
              type="button"
              onClick={() =>
                setQuantity((current) => current + 1)
              }
              className="flex h-11 w-11 items-center justify-center text-slate-600 transition-colors hover:bg-white hover:text-brand-600"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>

          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Add To Enquiry Button */}
        <div className="mt-6">

          <button
            type="button"
            onClick={handleAdd}
            className={`group/btn relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl px-4 py-3.5 text-sm font-bold transition-all duration-300 ${
              added
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                : 'bg-gradient-to-r from-brand-600 to-brand-700 text-white shadow-lg shadow-brand-600/20 hover:-translate-y-0.5 hover:from-brand-700 hover:to-brand-800 hover:shadow-xl hover:shadow-brand-600/25'
            }`}
          >
            {added ? (
              <>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                  <Check className="h-4 w-4" />
                </span>
                <span>Added to Enquiry</span>
              </>
            ) : (
              <>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                  <ShoppingCart className="h-4 w-4" />
                </span>
                <span>Add to Enquiry</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </>
            )}
          </button>

          {/* View Cart */}
          {added && (
            <button
              type="button"
              onClick={openCart}
              className="mt-3 flex w-full items-center justify-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-800"
            >
              View Enquiry Cart
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Bottom hover glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-1 w-0 -translate-x-1/2 rounded-full bg-brand-500 opacity-0 transition-all duration-500 group-hover:w-1/2 group-hover:opacity-100" />
    </div>
  );
}
