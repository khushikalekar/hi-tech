export type Page =
  | 'home'
  | 'about'
  | 'products'
  | 'services'
  | 'gallery'
  | 'reviews'
  | 'contact';

export interface EnquiryItem {
  id: string;
  productName: string;
  size: string;
  variant: string;
  quantity: number;
}

export interface Product {
  id: string;
  name: string;
  category: 'chemical' | 'disposable';
  description?: string | null;
  sizes: string[];
  variants?: string[] | null;
  is_active: boolean;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  status: 'pending' | 'approved' | 'rejected';
  source: 'customer' | 'manual';
  created_at: string;
  updated_at?: string;
}

export interface BookingForm {
  name: string;
  phone: string;
  address: string;
  service: string;
  date: string;
  time: string;
  notes: string;
}

export interface EnquiryForm {
  name: string;
  phone: string;
  address: string;
  notes: string;
}

export interface EnquiryItemRecord {
  productName: string;
  size: string;
  variant: string;
  quantity: number;
}

export interface Enquiry {
  id: string;
  customer_name: string;
  phone: string;
  address?: string | null;
  notes?: string | null;
  items: EnquiryItemRecord[];
  status: 'new' | 'contacted' | 'resolved';
  created_at: string;
  updated_at?: string;
}

export interface GalleryCategory {
  id: string;
  name: string;
  display_order: number;
  created_at?: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  description?: string | null;
  category: string;
  image_url: string;
  is_visible: boolean;
  display_order: number;
  uploaded_at: string;
  updated_at?: string;
}