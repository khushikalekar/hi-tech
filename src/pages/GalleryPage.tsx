import { useEffect, useState, useCallback } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Images,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { useGalleryPhotos, useGalleryCategories } from '@/hooks/useSupabaseData';

export default function GalleryPage() {
  const { photos, loading } = useGalleryPhotos();
  const { categories } = useGalleryCategories();

  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const filtered =
    activeCategory === 'all'
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx);
    setZoomed(false);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    setZoomed(false);
    document.body.style.overflow = '';
  }, []);

  const nextPhoto = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null || filtered.length === 0
        ? null
        : (prev + 1) % filtered.length
    );
    setZoomed(false);
  }, [filtered.length]);

  const prevPhoto = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null || filtered.length === 0
        ? null
        : (prev - 1 + filtered.length) % filtered.length
    );
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

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

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
    <div className="bg-white min-h-screen">

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden bg-hero">
        {/* Background */}
        <div className="absolute inset-0 hero-overlay" />

        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-[10%] w-72 h-72 rounded-full bg-brand-500/20 blur-3xl" />
          <div className="absolute bottom-0 right-[5%] w-96 h-96 rounded-full bg-amber-400/10 blur-3xl" />
        </div>

        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-[0.06]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32 text-center">

          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                       bg-white/10 border border-white/15 backdrop-blur-md
                       text-amber-200 text-sm font-semibold
                       animate-fade-in-up"
          >
            <Sparkles className="w-4 h-4" />
            Our Work
          </div>

          {/* Heading */}
          <h1
            className="mt-5 font-heading text-4xl sm:text-5xl md:text-6xl
                       lg:text-7xl font-bold tracking-tight text-white
                       animate-fade-in-up"
            style={{ animationDelay: '0.05s' }}
          >
            Photo Gallery
          </h1>

          {/* Description */}
          <p
            className="mt-5 text-base sm:text-lg md:text-xl
                       text-navy-100 max-w-2xl mx-auto leading-relaxed
                       animate-fade-in-up"
            style={{ animationDelay: '0.12s' }}
          >
            Explore our cleaning work, products, and team in action.
            See the quality and attention to detail behind every project.
          </p>

          {/* Small stats */}
          <div
            className="mt-8 flex items-center justify-center gap-3
                       text-sm text-white/70 animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="h-px w-8 bg-white/30" />
            <span>
              {photos.length} {photos.length === 1 ? 'Photo' : 'Photos'}
            </span>
            <span className="h-px w-8 bg-white/30" />
          </div>
        </div>

        {/* Bottom wave */}
        <svg
          className="absolute bottom-0 left-0 w-full h-10 md:h-16"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          fill="white"
        >
          <path d="M0,40 C320,80 720,0 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </section>

      {/* =========================================================
          GALLERY
      ========================================================= */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">

        {/* Section header */}
        <div className="text-center mb-8 md:mb-10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600">
            Explore
          </span>

          <h2 className="mt-2 font-heading text-2xl md:text-3xl font-bold text-navy-900">
            Our Recent Work
          </h2>

          <p className="mt-2 text-sm md:text-base text-navy-500">
            Browse our projects by category
          </p>
        </div>

        {/* =====================================================
            CATEGORY FILTER
        ===================================================== */}
        <div className="flex justify-center mb-10">
          <div
            className="inline-flex flex-wrap justify-center gap-1.5
                       p-1.5 rounded-2xl
                       bg-navy-50 border border-navy-100
                       shadow-sm"
          >
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 sm:px-5 py-2.5 rounded-xl
                         text-sm font-semibold transition-all duration-200 ${
                           activeCategory === 'all'
                             ? 'bg-white text-brand-700 shadow-soft'
                             : 'text-navy-600 hover:text-navy-900 hover:bg-white/70'
                         }`}
            >
              All Photos
            </button>

            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.name)}
                className={`px-4 sm:px-5 py-2.5 rounded-xl
                           text-sm font-semibold transition-all duration-200 ${
                             activeCategory === category.name
                               ? 'bg-white text-brand-700 shadow-soft'
                               : 'text-navy-600 hover:text-navy-900 hover:bg-white/70'
                           }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* =====================================================
            LOADING
        ===================================================== */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-28">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center">
              <Loader2 className="h-7 w-7 text-brand-600 animate-spin" />
            </div>

            <p className="mt-4 text-sm font-medium text-navy-500">
              Loading our gallery...
            </p>
          </div>
        ) : filtered.length === 0 ? (

          /* ===================================================
             EMPTY
          =================================================== */
          <div className="max-w-md mx-auto text-center py-24">

            <div className="mx-auto w-20 h-20 rounded-3xl bg-navy-50
                            flex items-center justify-center">
              <Images className="h-9 w-9 text-navy-300" />
            </div>

            <h3 className="mt-6 font-heading text-xl font-bold text-navy-900">
              No photos yet
            </h3>

            <p className="mt-2 text-sm text-navy-500 leading-relaxed">
              There are no photos available in this category at the moment.
              Check back soon for new work.
            </p>
          </div>

        ) : (

          /* ===================================================
             PHOTO GRID
          =================================================== */
          <div
            className="grid grid-cols-2 sm:grid-cols-3
                       lg:grid-cols-4 gap-3 sm:gap-5"
          >
            {filtered.map((photo, i) => (
              <button
                key={photo.id}
                onClick={() => openLightbox(i)}
                className="group relative aspect-square overflow-hidden
                           rounded-2xl sm:rounded-3xl
                           bg-navy-100
                           shadow-soft hover:shadow-medium
                           transition-all duration-500
                           animate-fade-in-up
                           focus:outline-none focus:ring-2
                           focus:ring-brand-500 focus:ring-offset-2"
                style={{
                  animationDelay: `${Math.min(i * 0.04, 0.4)}s`,
                }}
              >
                {/* Image */}
                <img
                  src={photo.image_url}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover
                             transition-transform duration-700
                             ease-out group-hover:scale-110"
                />

                {/* Dark gradient */}
                <div
                  className="absolute inset-0
                             bg-gradient-to-t
                             from-navy-950/90 via-navy-900/10 to-transparent
                             opacity-0 group-hover:opacity-100
                             transition-opacity duration-300"
                />

                {/* Top category */}
                <div
                  className="absolute top-3 left-3
                             px-2.5 py-1 rounded-full
                             bg-white/90 backdrop-blur-md
                             text-[10px] font-bold uppercase
                             tracking-wide text-navy-800
                             opacity-0 -translate-y-2
                             group-hover:opacity-100
                             group-hover:translate-y-0
                             transition-all duration-300"
                >
                  {photo.category}
                </div>

                {/* Zoom button */}
                <div
                  className="absolute top-3 right-3
                             w-9 h-9 rounded-xl
                             bg-navy-950/60 backdrop-blur-md
                             border border-white/20
                             flex items-center justify-center
                             text-white
                             opacity-0 scale-90
                             group-hover:opacity-100
                             group-hover:scale-100
                             transition-all duration-300"
                >
                  <ZoomIn className="w-4 h-4" />
                </div>

                {/* Bottom information */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-4
                             text-left
                             translate-y-3 opacity-0
                             group-hover:translate-y-0
                             group-hover:opacity-100
                             transition-all duration-300"
                >
                  <p className="text-white font-semibold text-sm line-clamp-1">
                    {photo.title}
                  </p>

                  {photo.description && (
                    <p className="mt-1 text-white/70 text-xs line-clamp-1">
                      {photo.description}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* =========================================================
          LIGHTBOX
      ========================================================= */}
      {lightboxIndex !== null && filtered[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center
                     bg-navy-950/95 backdrop-blur-xl
                     animate-fade-in"
          onClick={closeLightbox}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >

          {/* Top bar */}
          <div
            className="absolute top-0 left-0 right-0
                       px-4 sm:px-6 py-4
                       flex items-center justify-between
                       bg-gradient-to-b from-black/50 to-transparent"
          >
            <div className="text-white/70 text-xs sm:text-sm">
              <span className="text-white font-semibold">
                {lightboxIndex + 1}
              </span>
              <span className="mx-1">/</span>
              {filtered.length}
            </div>

            <button
              className="w-11 h-11 rounded-xl
                         bg-white/10 hover:bg-white/20
                         border border-white/10
                         text-white
                         flex items-center justify-center
                         transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              aria-label="Close gallery"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Previous */}
          {filtered.length > 1 && (
            <button
              className="absolute left-3 sm:left-6 lg:left-10
                         top-1/2 -translate-y-1/2
                         w-11 h-11 sm:w-12 sm:h-12
                         rounded-xl
                         bg-white/10 hover:bg-white/20
                         border border-white/10
                         text-white
                         flex items-center justify-center
                         transition-all hover:scale-105 z-10"
              onClick={(e) => {
                e.stopPropagation();
                prevPhoto();
              }}
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Next */}
          {filtered.length > 1 && (
            <button
              className="absolute right-3 sm:right-6 lg:right-10
                         top-1/2 -translate-y-1/2
                         w-11 h-11 sm:w-12 sm:h-12
                         rounded-xl
                         bg-white/10 hover:bg-white/20
                         border border-white/10
                         text-white
                         flex items-center justify-center
                         transition-all hover:scale-105 z-10"
              onClick={(e) => {
                e.stopPropagation();
                nextPhoto();
              }}
              aria-label="Next photo"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          {/* Image + information */}
          <div
            className="relative flex flex-col items-center
                       max-w-[92vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image container */}
            <div
              className="relative rounded-2xl overflow-hidden
                         bg-black/20 shadow-2xl"
            >
              <img
                src={filtered[lightboxIndex].image_url}
                alt={filtered[lightboxIndex].title}
                className={`max-w-[92vw] max-h-[70vh]
                           sm:max-h-[76vh]
                           object-contain
                           transition-transform duration-500
                           ${
                             zoomed
                               ? 'scale-150 cursor-zoom-out'
                               : 'cursor-zoom-in'
                           }`}
                onClick={() => setZoomed((prev) => !prev)}
              />

              {/* Zoom hint */}
              {!zoomed && (
                <div
                  className="absolute bottom-3 right-3
                             px-3 py-1.5 rounded-lg
                             bg-black/50 backdrop-blur-md
                             text-white/80 text-xs
                             pointer-events-none"
                >
                  Click to zoom
                </div>
              )}
            </div>

            {/* Information */}
            <div className="w-full text-center mt-4 sm:mt-5">

              <h3 className="text-white font-heading font-bold text-lg sm:text-xl">
                {filtered[lightboxIndex].title}
              </h3>

              {filtered[lightboxIndex].description && (
                <p className="mt-1.5 text-white/60 text-sm max-w-xl mx-auto">
                  {filtered[lightboxIndex].description}
                </p>
              )}

              <div className="mt-3 inline-flex items-center
                              px-3 py-1.5 rounded-full
                              bg-white/10 border border-white/10
                              text-white/50 text-xs">
                {filtered[lightboxIndex].category}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}