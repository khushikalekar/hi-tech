import { useState } from 'react';
import { Droplets, ShoppingBag, ShoppingCart, Loader2, Send } from 'lucide-react';
import { useProducts } from '@/hooks/useSupabaseData';
import ProductCard from '@/components/ProductCard';
import { useEnquiry } from '@/context/EnquiryContext';

export default function ProductsPage() {
  const { products, loading } = useProducts();
  const [filter, setFilter] = useState<'all' | 'chemical' | 'disposable'>('all');
  const { totalItems, openCart } = useEnquiry();

  const chemicals = products.filter((p) => p.category === 'chemical');
  const disposables = products.filter((p) => p.category === 'disposable');

  return (
    <div>
      {/* Hero */}
      <section className="bg-hero relative overflow-hidden">
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 section-pattern opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white animate-fade-in-up">
            Our Products
          </h1>
          <p className="mt-4 text-lg text-navy-100 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Wholesale cleaning chemicals and disposable products. Select items and send us an enquiry.
          </p>
        </div>
        <svg className="w-full h-12 md:h-16" viewBox="0 0 1440 80" preserveAspectRatio="none" fill="white">
          <path d="M0,40 C320,80 720,0 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </section>

      {/* Filter & Cart bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="card p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                filter === 'all' ? 'bg-brand-600 text-white' : 'bg-navy-50 text-navy-700 hover:bg-navy-100'
              }`}
            >
              All Products
            </button>
            <button
              onClick={() => setFilter('chemical')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-1.5 ${
                filter === 'chemical' ? 'bg-brand-600 text-white' : 'bg-navy-50 text-navy-700 hover:bg-navy-100'
              }`}
            >
              <Droplets className="h-4 w-4" />
              Chemicals
            </button>
            <button
              onClick={() => setFilter('disposable')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-1.5 ${
                filter === 'disposable' ? 'bg-brand-600 text-white' : 'bg-navy-50 text-navy-700 hover:bg-navy-100'
              }`}
            >
              <ShoppingBag className="h-4 w-4" />
              Disposables
            </button>
          </div>
          {totalItems > 0 && (
            <button onClick={openCart} className="btn-primary !py-2.5">
              <ShoppingCart className="h-5 w-5" />
              View Enquiry ({totalItems})
            </button>
          )}
        </div>
      </section>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-8 w-8 text-brand-600 animate-spin" />
        </div>
      ) : (
        <>
          {/* Chemicals */}
          {(filter === 'all' || filter === 'chemical') && chemicals.length > 0 && (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-brand-50 text-brand-600">
                  <Droplets className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-bold text-navy-900">Cleaning Chemicals</h2>
                  <p className="text-sm text-navy-500">Professional-grade cleaning chemicals</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {chemicals.map((p, i) => (
                  <div key={p.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Disposables */}
          {(filter === 'all' || filter === 'disposable') && disposables.length > 0 && (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 bg-navy-50/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-navy-100 text-navy-700">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-bold text-navy-900">Disposable Products</h2>
                  <p className="text-sm text-navy-500">Containers, plates, cups and more in multiple sizes</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {disposables.map((p, i) => (
                  <div key={p.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {products.length === 0 && (
            <div className="text-center py-24 text-navy-500">
              <p className="text-lg">No products available at the moment. Please check back soon.</p>
            </div>
          )}
        </>
      )}

      {/* Info note */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="card p-6 text-center bg-gradient-to-br from-brand-50 to-white">
          <Send className="h-8 w-8 text-brand-600 mx-auto mb-3" />
          <h3 className="font-heading font-semibold text-lg text-navy-900 mb-2">
            How to Order
          </h3>
          <p className="text-navy-500 text-sm max-w-2xl mx-auto">
            Select your products, choose sizes and variants, add them to your enquiry cart, and send us a WhatsApp message. We'll get back to you with availability and details.
          </p>
        </div>
      </section>
    </div>
  );
}


