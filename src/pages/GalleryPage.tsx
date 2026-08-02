import { useEffect, useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Images, Loader2 } from 'lucide-react';
import { useGalleryPhotos, useGalleryCategories } from '@/hooks/useSupabaseData';
import type { GalleryPhoto } from '@/types';

export default function GalleryPage() {
  const { photos, loading } = useGalleryPhotos();
  const { categories } = useGalleryCategories();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);

  const filtered = activeCategory === 'all' ? photos : photos.filter((p) => p.category === activeCategory);

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx);
    setZoomed(false);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    setZoomed(false);
  }, []);

  const nextPhoto = useCallback(() => {
    setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % filtered.length));
    setZoomed(false);
  }, [filtered.length]);

  const prevPhoto = useCallback(() => {
    setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + filtered.length) % filtered.length));
    setZoomed(false);
  }, [filtered.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, closeLightbox, nextPhoto, prevPhoto]);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextPhoto();
      else prevPhoto();
    }
    setTouchStart(null);
  };

  return (
    <div>
      <section className="bg-hero overflow-hidden">
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
          <span className="badge glass text-white mb-4 animate-fade-in">
            <Images className="h-4 w-4" />
            Our Work
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white animate-fade-in-up">
            Photo Gallery
          </h1>
          <p className="mt-4 text-lg text-navy-100 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Explore our cleaning work, products, and team in action.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              activeCategory === 'all'
                ? 'bg-brand-600 text-white shadow-soft'
                : 'bg-navy-50 text-navy-700 hover:bg-navy-100'
            }`}
          >
            All Photos
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.name)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                activeCategory === c.name
                  ? 'bg-brand-600 text-white shadow-soft'
                  : 'bg-navy-50 text-navy-700 hover:bg-navy-100'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-8 w-8 text-brand-600 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-navy-500">
            <Images className="h-12 w-12 mx-auto mb-3 text-navy-300" />
            <p>No photos in this category yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {filtered.map((photo, i) => (
              <button
                key={photo.id}
                onClick={() => openLightbox(i)}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-navy-50 shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${Math.min(i * 0.04, 0.4)}s` }}
              >
                <img
                  src={photo.image_url}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white font-medium text-sm line-clamp-1">{photo.title}</p>
                  <p className="text-navy-200 text-xs">{photo.category}</p>
                </div>
                <div className="absolute top-2 right-2 p-2 rounded-lg bg-navy-900/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="h-4 w-4" />
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      {lightboxIndex !== null && filtered[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-navy-900/95 backdrop-blur-md"
          onClick={closeLightbox}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button
            className="absolute top-4 right-4 p-2.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>

          {filtered.length > 1 && (
            <button
              className="absolute left-2 sm:left-4 p-2.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
              aria-label="Previous"
            >
              <ChevronLeft className="h-7 w-7" />
            </button>
          )}

          {filtered.length > 1 && (
            <button
              className="absolute right-2 sm:right-4 p-2.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
              aria-label="Next"
            >
              <ChevronRight className="h-7 w-7" />
            </button>
          )}

          <div className="relative max-w-full max-h-full p-8 sm:p-12" onClick={(e) => e.stopPropagation()}>
            <img
              src={filtered[lightboxIndex].image_url}
              alt={filtered[lightboxIndex].title}
              className={`max-w-full max-h-[75vh] object-contain rounded-xl transition-transform duration-300 ${
                zoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              onClick={() => setZoomed(!zoomed)}
            />
            <div className="text-center mt-4">
              <p className="text-white font-heading font-semibold text-lg">{filtered[lightboxIndex].title}</p>
              {filtered[lightboxIndex].description && (
                <p className="text-navy-200 text-sm mt-1 max-w-2xl mx-auto">{filtered[lightboxIndex].description}</p>
              )}
              <p className="text-navy-400 text-xs mt-2">
                {filtered[lightboxIndex].category} — {lightboxIndex + 1} of {filtered.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
