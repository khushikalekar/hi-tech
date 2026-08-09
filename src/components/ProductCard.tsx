'use client';

import { useEffect, useState } from 'react';
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

/**
 * Makes sure the first alphabet of the product name
 * is always uppercase.
 *
 * Example:
 * "floor cleaner" -> "Floor cleaner"
 * "fLOOR cleaner" -> "FLOOR cleaner"
 */
const capitalizeFirstLetter = (value: string) => {
  if (!value) return value;

  return value.charAt(0).toUpperCase() + value.slice(1);
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, openCart } = useEnquiry();

  const [size, setSize] = useState(product.sizes?.[0] ?? 'Standard');
  const [variant, setVariant] = useState(
    product.variants?.[0] ?? 'Standard'
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const isChemical = product.category === 'chemical';

  const productName = capitalizeFirstLetter(product.name);

  const handleAdd = () => {
    addItem({
      productName,
      size,
      variant,
      quantity,
    });

    setAdded(true);
  };

  useEffect(() => {
    if (!added) return;

    const timer = window.setTimeout(() => {
      setAdded(false);
    }, 2500);

    return () => window.clearTimeout(timer);
  }, [added]);

  return (
    <article
      className="
        group relative flex h-full flex-col overflow-hidden
        rounded-2xl border border-slate-200/80
        bg-white
        shadow-[0_4px_24px_rgba(15,23,42,0.05)]
        transition-all duration-500
        hover:-translate-y-1
        hover:border-slate-300
        hover:shadow-[0_18px_45px_rgba(15,23,42,0.10)]
      "
    >
      {/* =========================================================
          TOP ACCENT
      ========================================================= */}
      <div className="h-[3px] w-full bg-gradient-to-r from-brand-500 via-brand-600 to-cyan-500" />

      {/* =========================================================
          CARD CONTENT
      ========================================================= */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">

        {/* =======================================================
            PRODUCT HEADER
        ======================================================= */}
        <div className="flex items-start gap-4">

          {/* Product Icon */}
          <div
            className={`
              relative flex h-12 w-12 shrink-0 items-center justify-center
              rounded-2xl border
              transition-all duration-300
              group-hover:scale-105
              ${
                isChemical
                  ? 'border-violet-100 bg-violet-50 text-violet-600'
                  : 'border-cyan-100 bg-cyan-50 text-cyan-600'
              }
            `}
          >
            {isChemical ? (
              <Sparkles className="h-5 w-5" />
            ) : (
              <Package className="h-5 w-5" />
            )}

            {/* Small status dot */}
            <span
              className={`
                absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full
                ring-2 ring-white
                ${
                  isChemical
                    ? 'bg-violet-500'
                    : 'bg-cyan-500'
                }
              `}
            />
          </div>

          {/* Product Title */}
          <div className="min-w-0 flex-1">

            {/* Category */}
            <div className="mb-2 flex items-center gap-2">

              <span
                className={`
                  inline-flex items-center rounded-full
                  px-2.5 py-1
                  text-[9px] font-extrabold uppercase
                  tracking-[0.14em]
                  ${
                    isChemical
                      ? 'bg-violet-50 text-violet-700 ring-1 ring-violet-100'
                      : 'bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100'
                  }
                `}
              >
                {isChemical ? 'Chemical' : 'Disposable'}
              </span>

            </div>

            <h3
              className="
                font-heading
                text-[17px] font-bold leading-snug
                tracking-[-0.01em]
                text-slate-900
                transition-colors duration-300
                group-hover:text-brand-700
                sm:text-lg
              "
            >
              {productName}
            </h3>
          </div>

          {/* Desktop Package Icon */}
          <div
            className="
              hidden h-10 w-10 shrink-0
              items-center justify-center
              rounded-xl border border-slate-100
              bg-slate-50
              text-slate-400
              transition-all duration-300
              group-hover:border-brand-100
              group-hover:bg-brand-50
              group-hover:text-brand-500
              sm:flex
            "
          >
            <Package className="h-[18px] w-[18px]" />
          </div>
        </div>

        {/* =======================================================
            DESCRIPTION
        ======================================================= */}
        {product.description && (
          <p
            className="
              mt-4 line-clamp-2
              text-[13px] leading-6
              text-slate-500
            "
          >
            {product.description}
          </p>
        )}

        {/* =======================================================
            DIVIDER
        ======================================================= */}
        <div className="my-5 h-px bg-slate-100" />

        {/* =======================================================
            SIZE
        ======================================================= */}
        <div>
          <div className="mb-2.5 flex items-center justify-between">

            <div className="flex items-center gap-2">
              <span
                className="
                  flex h-7 w-7 items-center justify-center
                  rounded-lg bg-brand-50 text-brand-600
                "
              >
                <Ruler className="h-3.5 w-3.5" />
              </span>

              <span
                className="
                  text-[10px] font-extrabold
                  uppercase tracking-[0.13em]
                  text-slate-500
                "
              >
                Available Size
              </span>
            </div>

          </div>

          {product.sizes.length <= 1 ? (
            <div
              className="
                flex min-h-10 items-center
                rounded-xl border border-slate-200
                bg-slate-50/70 px-3.5
              "
            >
              <span className="text-sm font-semibold text-slate-700">
                {product.sizes[0] ?? 'Standard'}
              </span>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => {
                const selected = size === s;

                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`
                      rounded-lg border
                      px-3.5 py-2
                      text-xs font-bold
                      transition-all duration-200
                      ${
                        selected
                          ? `
                            border-brand-600
                            bg-brand-600
                            text-white
                            shadow-sm
                            shadow-brand-600/20
                          `
                          : `
                            border-slate-200
                            bg-white
                            text-slate-600
                            hover:border-brand-300
                            hover:bg-brand-50
                            hover:text-brand-700
                          `
                      }
                    `}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* =======================================================
            VARIANT
        ======================================================= */}
        {product.variants && product.variants.length > 0 && (
          <div className="mt-4">

            <div className="mb-2.5 flex items-center gap-2">

              <span
                className="
                  flex h-7 w-7 items-center justify-center
                  rounded-lg bg-brand-50 text-brand-600
                "
              >
                <Layers3 className="h-3.5 w-3.5" />
              </span>

              <span
                className="
                  text-[10px] font-extrabold
                  uppercase tracking-[0.13em]
                  text-slate-500
                "
              >
                Variant
              </span>

            </div>

            <div className="flex flex-wrap gap-2">
              {product.variants.map((v) => {
                const selected = variant === v;

                return (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setVariant(v)}
                    className={`
                      rounded-lg border
                      px-3.5 py-2
                      text-xs font-bold
                      transition-all duration-200
                      ${
                        selected
                          ? `
                            border-brand-600
                            bg-brand-600
                            text-white
                            shadow-sm
                            shadow-brand-600/20
                          `
                          : `
                            border-slate-200
                            bg-white
                            text-slate-600
                            hover:border-brand-300
                            hover:bg-brand-50
                            hover:text-brand-700
                          `
                      }
                    `}
                  >
                    {v}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* =======================================================
            QUANTITY
        ======================================================= */}
        <div className="mt-5">

          <div className="mb-2.5 flex items-center justify-between">

            <div className="flex items-center gap-2">

              <span
                className="
                  flex h-7 w-7 items-center justify-center
                  rounded-lg bg-brand-50 text-brand-600
                "
              >
                <ShoppingCart className="h-3.5 w-3.5" />
              </span>

              <span
                className="
                  text-[10px] font-extrabold
                  uppercase tracking-[0.13em]
                  text-slate-500
                "
              >
                Quantity
              </span>

            </div>

            <span className="text-[10px] font-semibold text-slate-400">
              Units
            </span>

          </div>

          <div
            className="
              inline-flex items-center
              overflow-hidden rounded-xl
              border border-slate-200
              bg-slate-50
            "
          >
            <button
              type="button"
              onClick={() =>
                setQuantity((current) => Math.max(1, current - 1))
              }
              disabled={quantity <= 1}
              className="
                flex h-10 w-10 items-center justify-center
                text-slate-500
                transition-all
                hover:bg-white hover:text-brand-600
                disabled:cursor-not-allowed
                disabled:opacity-30
              "
              aria-label="Decrease quantity"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>

            <div
              className="
                flex h-10 min-w-12
                items-center justify-center
                border-x border-slate-200
                bg-white
              "
            >
              <span className="text-sm font-bold text-slate-900">
                {quantity}
              </span>
            </div>

            <button
              type="button"
              onClick={() =>
                setQuantity((current) => current + 1)
              }
              className="
                flex h-10 w-10 items-center justify-center
                text-slate-500
                transition-all
                hover:bg-white hover:text-brand-600
              "
              aria-label="Increase quantity"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Push CTA to bottom */}
        <div className="flex-1" />

        {/* =======================================================
            CTA
        ======================================================= */}
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

      {/* =========================================================
          BOTTOM HOVER ACCENT
      ========================================================= */}
      <div
        className="
          pointer-events-none absolute
          bottom-0 left-1/2
          h-0.5 w-0
          -translate-x-1/2
          rounded-full
          bg-gradient-to-r
          from-brand-500 to-cyan-500
          opacity-0
          transition-all duration-500
          group-hover:w-1/2
          group-hover:opacity-100
        "
      />
    </article>
  );
}