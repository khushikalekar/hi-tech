import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { Product, Service, Review, GalleryPhoto, GalleryCategory } from '@/types';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
  console.log("Products:", data);
  console.log("Error:", error);
      if (!mounted) return;
      if (error) {
        setError(error.message);
        setProducts([]);
      } else {
        setProducts(data as Product[]);
        setError(null);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
}

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchServices = async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
  console.log("services:", data);
  console.log("Error:", error);
      if (!mounted) return;
      if (error) {
        setError(error.message);
        setServices([]);
      } else {
        setServices(data as Service[]);
        setError(null);
      }
      setLoading(false);
    };

    fetchServices();
  }, []);

  return { services, loading, error };
}

export function useApprovedReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (!mounted) return;
      if (error) {
        setError(error.message);
        setReviews([]);
      } else {
        setReviews(data as Review[]);
        setError(null);
      }
      setLoading(false);
    };

    fetchReviews();
  }, []);

  return { reviews, loading, error };
}

export function useGalleryPhotos() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchPhotos = async () => {
      const { data, error } = await supabase
        .from('gallery_photos')
        .select('*')
        .eq('is_visible', true)
        .order('display_order', { ascending: true });

      if (!mounted) return;
      if (error) {
        setError(error.message);
        setPhotos([]);
      } else {
        setPhotos(data as GalleryPhoto[]);
        setError(null);
      }
      setLoading(false);
    };

    fetchPhotos();
  }, []);

  return { photos, loading, error };
}

export function useGalleryCategories() {
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from('gallery_categories')
        .select('*')
        .order('display_order', { ascending: true });

      if (!mounted) return;
      if (error) {
        setError(error.message);
        setCategories([]);
      } else {
        setCategories(data as GalleryCategory[]);
        setError(null);
      }
      setLoading(false);
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
}
