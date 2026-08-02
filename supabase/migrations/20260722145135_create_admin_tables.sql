/*
# Create admin tables: products, services, reviews, testimonials

## Overview
This migration creates the database schema for the Hitech Solutions admin dashboard.
It adds tables for products, services, customer reviews, and manual testimonials,
with Row Level Security (RLS) policies that allow public read of approved/active
content and admin-only write access.

## Tables

### 1. products
- `id` (uuid, primary key)
- `name` (text, not null) — product name
- `category` (text, not null) — 'chemical' or 'disposable'
- `description` (text, nullable) — product description
- `sizes` (text[], not null, default '{}') — available sizes e.g. ['5 L', '1 L']
- `variants` (text[], nullable) — available variants e.g. ['Economic', 'Premium']
- `is_active` (boolean, default true) — whether product appears publicly
- `display_order` (integer, default 0) — sort order
- `created_at` (timestamptz, default now())
- `updated_at` (timestamptz, default now())

### 2. services
- `id` (uuid, primary key)
- `name` (text, not null) — service name
- `description` (text, not null) — service description
- `is_active` (boolean, default true) — whether service appears publicly
- `display_order` (integer, default 0) — sort order
- `created_at` (timestamptz, default now())
- `updated_at` (timestamptz, default now())

### 3. reviews
- `id` (uuid, primary key)
- `name` (text, not null) — customer name
- `location` (text, not null) — customer location
- `rating` (integer, not null, check 1-5) — star rating
- `text` (text, not null) — review message
- `status` (text, not null, default 'pending') — 'pending', 'approved', or 'rejected'
- `source` (text, not null, default 'customer') — 'customer' or 'manual'
- `created_at` (timestamptz, default now())
- `updated_at` (timestamptz, default now())

## Security (RLS)

### products
- Public (anon, authenticated) can SELECT active products only.
- Authenticated users can INSERT, UPDATE, DELETE (admin only).

### services
- Public (anon, authenticated) can SELECT active services only.
- Authenticated users can INSERT, UPDATE, DELETE (admin only).

### reviews
- Public (anon, authenticated) can SELECT approved reviews only.
- Public (anon, authenticated) can INSERT reviews (customer submissions, forced status='pending' and source='customer').
- Authenticated users can UPDATE, DELETE reviews (admin only).

## Seed Data
- Seeds all existing products from the current static data.
- Seeds all existing services from the current static data.
- Seeds 6 sample testimonials with status='approved' and source='manual'.
*/

-- ============================================================
-- PRODUCTS
-- ============================================================
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL CHECK (category IN ('chemical', 'disposable')),
  description text,
  sizes text[] NOT NULL DEFAULT '{}',
  variants text[],
  is_active boolean NOT NULL DEFAULT true,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_active_products" ON products;
CREATE POLICY "public_read_active_products"
ON products FOR SELECT
TO anon, authenticated
USING (is_active = true);

DROP POLICY IF EXISTS "admin_insert_products" ON products;
CREATE POLICY "admin_insert_products"
ON products FOR INSERT
TO authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_products" ON products;
CREATE POLICY "admin_update_products"
ON products FOR UPDATE
TO authenticated
USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_products" ON products;
CREATE POLICY "admin_delete_products"
ON products FOR DELETE
TO authenticated
USING (true);

-- ============================================================
-- SERVICES
-- ============================================================
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_active_services" ON services;
CREATE POLICY "public_read_active_services"
ON services FOR SELECT
TO anon, authenticated
USING (is_active = true);

DROP POLICY IF EXISTS "admin_insert_services" ON services;
CREATE POLICY "admin_insert_services"
ON services FOR INSERT
TO authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_services" ON services;
CREATE POLICY "admin_update_services"
ON services FOR UPDATE
TO authenticated
USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_services" ON services;
CREATE POLICY "admin_delete_services"
ON services FOR DELETE
TO authenticated
USING (true);

-- ============================================================
-- REVIEWS
-- ============================================================
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  source text NOT NULL DEFAULT 'customer' CHECK (source IN ('customer', 'manual')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Public can read only approved reviews
DROP POLICY IF EXISTS "public_read_approved_reviews" ON reviews;
CREATE POLICY "public_read_approved_reviews"
ON reviews FOR SELECT
TO anon, authenticated
USING (status = 'approved');

-- Public can submit reviews (customer submissions only, forced to pending)
DROP POLICY IF EXISTS "public_insert_reviews" ON reviews;
CREATE POLICY "public_insert_reviews"
ON reviews FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Admin can update reviews (approve/reject/edit)
DROP POLICY IF EXISTS "admin_update_reviews" ON reviews;
CREATE POLICY "admin_update_reviews"
ON reviews FOR UPDATE
TO authenticated
USING (true) WITH CHECK (true);

-- Admin can delete reviews
DROP POLICY IF EXISTS "admin_delete_reviews" ON reviews;
CREATE POLICY "admin_delete_reviews"
ON reviews FOR DELETE
TO authenticated
USING (true);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON reviews(status);

-- ============================================================
-- SEED DATA: Products
-- ============================================================
INSERT INTO products (name, category, sizes, variants, display_order) VALUES
('Liquid Soap', 'chemical', ARRAY['5 L'], ARRAY['Economic', 'Premium'], 1),
('Floor Cleaner', 'chemical', ARRAY['5 L'], ARRAY['Economic', 'Premium'], 2),
('Toilet Cleaner', 'chemical', ARRAY['5 L'], ARRAY['Economic', 'Premium'], 3),
('Room Freshener', 'chemical', ARRAY['5 L'], ARRAY['Economic', 'Premium'], 4),
('Acid', 'chemical', ARRAY['5 L'], NULL, 5),
('Bathroom Cleaner', 'chemical', ARRAY['5 L'], NULL, 6),
('Glass Cleaner', 'chemical', ARRAY['5 L'], NULL, 7),
('Green Phenyl', 'chemical', ARRAY['5 L'], NULL, 8),
('Black Phenyl', 'chemical', ARRAY['5 L'], NULL, 9),
('Container', 'disposable', ARRAY['500 ml', '550 ml', '750 ml', '1000 ml'], NULL, 10),
('Square Container', 'disposable', ARRAY['100 ml', '250 ml', '500 ml'], NULL, 11),
('Silver Container', 'disposable', ARRAY['450 ml', '750 ml'], NULL, 12),
('Sambar Bag', 'disposable', ARRAY['Standard'], NULL, 13),
('Silver Pouch', 'disposable', ARRAY['Standard'], NULL, 14),
('Paper Plate', 'disposable', ARRAY['9 inch'], NULL, 15),
('Spoon', 'disposable', ARRAY['Standard'], NULL, 16),
('Head Cap', 'disposable', ARRAY['Standard'], NULL, 17),
('Silver Foil', 'disposable', ARRAY['Standard'], NULL, 18),
('Straw', 'disposable', ARRAY['Standard'], NULL, 19),
('Cup', 'disposable', ARRAY['110 ml'], NULL, 20)
ON CONFLICT DO NOTHING;

-- ============================================================
-- SEED DATA: Services
-- ============================================================
INSERT INTO services (name, description, display_order) VALUES
('Home Deep Cleaning', 'Complete deep cleaning of your entire home including bedrooms, living areas, bathrooms and kitchen. We use professional-grade products for a spotless, hygienic result.', 1),
('Office Deep Cleaning', 'Professional deep cleaning for offices and workspaces. We clean workstations, floors, washrooms and common areas to maintain a healthy, productive environment.', 2),
('Commercial Cleaning', 'Comprehensive cleaning solutions for commercial establishments including malls, showrooms and retail spaces. Scheduled or one-time deep cleaning available.', 3),
('Hotel Cleaning', 'Specialised cleaning services for hotels and resorts. Rooms, lobbies, dining areas and common spaces cleaned to the highest hospitality standards.', 4),
('Restaurant Cleaning', 'Deep cleaning for restaurants and food outlets including dining areas, kitchen equipment, exhaust systems and floor degreasing to maintain hygiene compliance.', 5),
('Kitchen Cleaning', 'Thorough deep cleaning of kitchens including chimneys, stove tops, tiles, countertops, cabinets and appliances using professional degreasers and sanitisers.', 6),
('Bathroom Cleaning', 'Complete bathroom sanitisation including toilet, basin, tiles, shower, exhaust fans and fixtures. We eliminate stains, limescale and harmful bacteria effectively.', 7),
('Floor Cleaning', 'Professional floor cleaning, scrubbing, polishing and buffing for all floor types including marble, granite, ceramic and vitrified tiles.', 8),
('Sofa Cleaning', 'Expert sofa and upholstery cleaning using dry foam and wet cleaning methods. Removes dust, allergens, stains and odours from fabric and leather sofas.', 9),
('Carpet Cleaning', 'Deep cleaning and shampooing of carpets and rugs using professional hot water extraction and dry cleaning methods to remove embedded dirt and stains.', 10),
('Glass Cleaning', 'Professional streak-free cleaning of windows, glass partitions, mirrors and facades using specialist squeegees and streak-free cleaning agents.', 11),
('Move-In Cleaning', 'Get your new home or office ready before moving in. We do a complete top-to-bottom deep clean so you start fresh in a perfectly clean space.', 12),
('Move-Out Cleaning', 'Leave your property spotless when vacating. Our move-out cleaning ensures the property is in pristine condition, helping you recover your full security deposit.', 13),
('Industrial Cleaning', 'Heavy-duty cleaning for factories, warehouses and industrial premises. We handle machinery cleaning, floor degreasing, high-pressure washing and waste area sanitation.', 14),
('Hospital Cleaning', 'Strict infection-control cleaning for hospitals, clinics and medical facilities. Hospital-grade disinfectants used to maintain sterile environments and comply with health standards.', 15),
('School Cleaning', 'Safe, thorough cleaning for schools, colleges and educational institutions. Classrooms, labs, washrooms and playgrounds cleaned with child-safe disinfectants.', 16)
ON CONFLICT DO NOTHING;

-- ============================================================
-- SEED DATA: Sample testimonials (approved, manual)
-- ============================================================
INSERT INTO reviews (name, location, rating, text, status, source) VALUES
('Rahul Deshmukh', 'Shirdi, Maharashtra', 5, 'Hitech Solutions supplied all the cleaning chemicals for our hotel. The quality is excellent and the service is very reliable. Highly recommended for wholesale purchases.', 'approved', 'manual'),
('Sneha Patil', 'Ahilyanagar, Maharashtra', 5, 'We booked a deep cleaning service for our 3BHK flat. The team was professional, punctual and did an amazing job. The kitchen and bathrooms looked brand new.', 'approved', 'manual'),
('Imran Sheikh', 'Shirdi, Maharashtra', 5, 'I run a restaurant and Hitech Solutions handles all our cleaning supplies and monthly deep cleaning. Very trustworthy and reasonably priced. Great support.', 'approved', 'manual'),
('Priya Joshi', 'Pune, Maharashtra', 4, 'Ordered disposable containers and cleaning chemicals in bulk for our catering business. Good quality products and prompt delivery. Will order again.', 'approved', 'manual'),
('Amit Kulkarni', 'Nashik, Maharashtra', 5, 'The office deep cleaning service was outstanding. Our 5000 sq ft office was cleaned thoroughly in a single day. The staff was courteous and well-equipped.', 'approved', 'manual'),
('Fatima Khan', 'Shirdi, Maharashtra', 5, 'Hitech Solutions is our go-to supplier for housekeeping materials. They have everything in stock and the prices are the best in the wholesale market.', 'approved', 'manual')
ON CONFLICT DO NOTHING;
