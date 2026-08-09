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
  <div className="min-h-screen bg-[#f7f9fc]">

    {/* =========================================================
        PREMIUM COMPACT HERO
    ========================================================= */}
<section className="relative overflow-hidden bg-hero">

  {/* Background */}
  <div className="absolute inset-0 hero-overlay" />

  <div className="absolute inset-0 opacity-30">
    <div className="absolute left-[10%] top-10 h-56 w-56 rounded-full bg-brand-500/20 blur-3xl" />
    <div className="absolute bottom-0 right-[5%] h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />
  </div>

  {/* Grid */}
  <div className="absolute inset-0 opacity-[0.04]">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }}
    />
  </div>

  {/* Content */}
  <div className="relative z-10 mx-auto flex min-h-[270px] max-w-7xl items-center px-4 py-10 text-center sm:px-6 md:min-h-[300px] md:py-12 lg:px-8">

    <div className="w-full">

      {/* Eyebrow */}
      <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-amber-200 backdrop-blur-md">
        <Sparkles className="h-3.5 w-3.5" />
        Our Work
      </div>

      {/* Heading */}
      <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
        Photo Gallery
      </h1>

      {/* Description */}
      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-navy-100 sm:text-base">
        Explore our cleaning work, products, and team in action.
      </p>

      {/* Photo count */}
      <div className="mt-4 flex items-center justify-center gap-3 text-xs text-white/60">
        <span className="h-px w-6 bg-white/30" />

        <span>
          {photos.length} {photos.length === 1 ? 'Photo' : 'Photos'}
        </span>

        <span className="h-px w-6 bg-white/30" />
      </div>

    </div>
  </div>

  {/* Small wave */}
  <svg
    className="absolute bottom-0 left-0 h-6 w-full md:h-8"
    viewBox="0 0 1440 80"
    preserveAspectRatio="none"
    fill="white"
  >
    <path d="M0,40 C320,65 720,15 1440,40 L1440,80 L0,80 Z" />
  </svg>

</section>


    {/* =========================================================
        GALLERY
    ========================================================= */}
    <section className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 md:pb-28 md:pt-12 lg:px-8">

      {/* Section heading */}
      <div className="mb-8 flex flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between">

        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600">
            Portfolio
          </span>

          <h2 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-[#07162f] sm:text-4xl">
            Recent Cleaning Projects
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
            A look at the spaces we've transformed with professional
            cleaning and attention to detail.
          </p>
        </div>

        {/* Total */}
        <div className="hidden rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm md:block">
          <div className="text-2xl font-bold text-slate-900">
            {filtered.length}
          </div>
          <div className="text-xs font-medium text-slate-400">
            Showing projects
          </div>
        </div>

      </div>


      {/* =====================================================
          PREMIUM FILTER
      ===================================================== */}
      <div className="mb-10 overflow-x-auto pb-1">
        <div className="flex min-w-max items-center gap-2 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm">

          <button
            onClick={() => setActiveCategory('all')}
            className={`rounded-xl px-5 py-2.5 text-sm font-bold transition-all duration-300 ${
              activeCategory === 'all'
                ? 'bg-[#07162f] text-white shadow-lg'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            All Projects
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.name)}
              className={`rounded-xl px-5 py-2.5 text-sm font-bold transition-all duration-300 ${
                activeCategory === category.name
                  ? 'bg-[#07162f] text-white shadow-lg'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
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

        <div className="flex min-h-[350px] flex-col items-center justify-center">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-xl">
            <Loader2 className="h-7 w-7 animate-spin text-brand-600" />
          </div>

          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading our latest work...
          </p>

        </div>

      ) : filtered.length === 0 ? (

        <div className="flex min-h-[350px] flex-col items-center justify-center rounded-[32px] border border-slate-200 bg-white px-6 text-center shadow-sm">

          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-50">
            <Images className="h-9 w-9 text-slate-300" />
          </div>

          <h3 className="mt-6 text-xl font-bold text-slate-900">
            No projects found
          </h3>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
            There are currently no photos available in this category.
            Please check back soon.
          </p>

        </div>

      ) : (

        /* =====================================================
           PREMIUM IMAGE GRID
        ===================================================== */
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">

          {filtered.map((photo, i) => (

            <button
              key={photo.id}
              onClick={() => openLightbox(i)}
              className="group relative aspect-[4/5] overflow-hidden rounded-[24px] bg-slate-200 text-left shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_60px_-20px_rgba(15,23,42,0.35)] focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-4"
              style={{
                animationDelay: `${Math.min(i * 0.04, 0.4)}s`,
              }}
            >

              {/* Image */}
              <img
                src={photo.image_url}
                alt={photo.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Permanent subtle gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />

              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#06152f]/95 via-[#06152f]/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Project number */}
              <div className="absolute left-4 top-4 flex h-9 min-w-9 items-center justify-center rounded-xl border border-white/20 bg-black/20 px-2 text-xs font-bold text-white backdrop-blur-md">
                {(i + 1).toString().padStart(2, '0')}
              </div>

              {/* Zoom */}
              <div className="absolute right-4 top-4 flex h-9 w-9 scale-90 items-center justify-center rounded-xl border border-white/20 bg-black/30 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                <ZoomIn className="h-4 w-4" />
              </div>

              {/* Category */}
              <div className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-white/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:opacity-100">
                {photo.category}
              </div>

              {/* Title */}
              <div className="absolute bottom-4 left-4 right-4 translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <h3 className="line-clamp-1 text-sm font-bold text-white">
                  {photo.title}
                </h3>

                {photo.description && (
                  <p className="mt-1 line-clamp-1 text-xs text-white/60">
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
        className="fixed inset-0 z-[80] flex items-center justify-center bg-[#020817]/95 p-4 backdrop-blur-xl"
        onClick={closeLightbox}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >

        {/* Top navigation */}
        <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between p-4 sm:p-6">

          <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold text-white/70 backdrop-blur-md">
            <span className="text-white">
              {lightboxIndex + 1}
            </span>
            <span className="mx-1.5">/</span>
            {filtered.length}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white transition-all hover:bg-white/20"
            aria-label="Close gallery"
          >
            <X className="h-5 w-5" />
          </button>

        </div>


        {/* Previous */}
        {filtered.length > 1 && (
          <button
            className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-white/20 sm:left-6"
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
            className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-white/20 sm:right-6"
            onClick={(e) => {
              e.stopPropagation();
              nextPhoto();
            }}
            aria-label="Next photo"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}


        {/* Image */}
        <div
          className="relative flex max-h-[90vh] max-w-[92vw] flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 shadow-2xl">

            <img
              src={filtered[lightboxIndex].image_url}
              alt={filtered[lightboxIndex].title}
              className={`max-h-[72vh] max-w-[92vw] object-contain transition-transform duration-500 sm:max-h-[78vh] ${
                zoomed
                  ? 'scale-150 cursor-zoom-out'
                  : 'cursor-zoom-in'
              }`}
              onClick={() => setZoomed((prev) => !prev)}
            />

            {!zoomed && (
              <div className="absolute bottom-4 right-4 rounded-lg border border-white/10 bg-black/50 px-3 py-1.5 text-xs text-white/70 backdrop-blur-md">
                Click to zoom
              </div>
            )}

          </div>


          {/* Information */}
          <div className="mt-5 text-center">

            <h3 className="font-heading text-lg font-bold text-white sm:text-xl">
              {filtered[lightboxIndex].title}
            </h3>

            {filtered[lightboxIndex].description && (
              <p className="mx-auto mt-2 max-w-xl text-sm text-white/50">
                {filtered[lightboxIndex].description}
              </p>
            )}

            <div className="mt-3 inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs text-white/60">
              {filtered[lightboxIndex].category}
            </div>

          </div>

        </div>

      </div>
    )}

  </div>
);
}