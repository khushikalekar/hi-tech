import { useState } from 'react';
import { Plus, Minus, Check, ShoppingCart } from 'lucide-react';
import type { Product } from '@/types';
import { useEnquiry } from '@/context/EnquiryContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, openCart } = useEnquiry();
  const [size, setSize] = useState(product.sizes[0] ?? 'Standard');
  const [variant, setVariant] = useState(product.variants?.[0] ?? 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({ productName: product.name, size, variant, quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="card-hover p-5 flex flex-col">
      <h3 className="font-heading font-bold text-lg text-navy-900">{product.name}</h3>
      <span className="badge bg-navy-100 text-navy-600 w-fit mt-2">
        {product.category === 'chemical' ? 'Chemical' : 'Disposable'}
      </span>

      {product.description && (
        <p className="text-sm text-navy-500 mt-3 leading-relaxed line-clamp-2">
          {product.description}
        </p>
      )}

      {/* Size selector */}
      <div className="mt-4">
        <label className="block text-xs font-semibold text-navy-500 uppercase tracking-wide mb-1.5">
          Available Size
        </label>
        {product.sizes.length <= 1 ? (
          <div className="px-3 py-2 bg-navy-50 rounded-lg text-sm font-medium text-navy-700 border border-navy-200">
            {product.sizes[0] ?? 'Standard'}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                  size === s
                    ? 'bg-brand-600 text-white border-brand-600'
                    : 'bg-white text-navy-700 border-navy-200 hover:border-brand-400'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Variant selector */}
      {product.variants && product.variants.length > 0 && (
        <div className="mt-3">
          <label className="block text-xs font-semibold text-navy-500 uppercase tracking-wide mb-1.5">
            Variant
          </label>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <button
                key={v}
                onClick={() => setVariant(v)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                  variant === v
                    ? 'bg-brand-600 text-white border-brand-600'
                    : 'bg-white text-navy-700 border-navy-200 hover:border-brand-400'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div className="mt-4">
        <label className="block text-xs font-semibold text-navy-500 uppercase tracking-wide mb-1.5">
          Quantity
        </label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-2 rounded-lg border border-navy-200 hover:bg-navy-100 transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="font-semibold text-navy-900 w-10 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="p-2 rounded-lg border border-navy-200 hover:bg-navy-100 transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Add button */}
      <button
        onClick={handleAdd}
        className={`mt-5 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
          added
            ? 'bg-emerald-500 text-white'
            : 'bg-brand-600 hover:bg-brand-700 text-white hover:-translate-y-0.5'
        }`}
      >
        {added ? (
          <>
            <Check className="h-5 w-5" />
            Added To Enquiry
          </>
        ) : (
          <>
            <ShoppingCart className="h-5 w-5" />
            Add to Enquiry
          </>
        )}
      </button>
      {added && (
        <button
          onClick={openCart}
          className="mt-2 text-sm text-brand-600 hover:text-brand-700 font-medium"
        >
          View Enquiry Cart →
        </button>
      )}
    </div>
  );
}
