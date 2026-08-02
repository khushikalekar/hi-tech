/*
# Fix RLS policies: allow authenticated admins to see all records

## Problem
The original SELECT policies on products, services, and reviews were scoped to
`TO anon, authenticated` with filters (is_active = true / status = 'approved').
This meant authenticated admins could only see active/approved records, not
the full set needed for admin dashboard management.

## Fix
1. Change the public SELECT policies to `TO anon` only (unauthenticated visitors).
2. Add new admin SELECT policies `TO authenticated` with `USING (true)` so
   authenticated admins can see all records regardless of active/approved status.
3. Keep all INSERT/UPDATE/DELETE policies unchanged (already scoped to authenticated).

## Tables Modified
- products: split SELECT into anon (active only) + authenticated (all)
- services: split SELECT into anon (active only) + authenticated (all)
- reviews: split SELECT into anon (approved only) + authenticated (all)
*/

-- ============================================================
-- PRODUCTS: Fix SELECT policies
-- ============================================================
DROP POLICY IF EXISTS "public_read_active_products" ON products;
DROP POLICY IF EXISTS "admin_read_all_products" ON products;

CREATE POLICY "public_read_active_products"
ON products FOR SELECT
TO anon
USING (is_active = true);

CREATE POLICY "admin_read_all_products"
ON products FOR SELECT
TO authenticated
USING (true);

-- ============================================================
-- SERVICES: Fix SELECT policies
-- ============================================================
DROP POLICY IF EXISTS "public_read_active_services" ON services;
DROP POLICY IF EXISTS "admin_read_all_services" ON services;

CREATE POLICY "public_read_active_services"
ON services FOR SELECT
TO anon
USING (is_active = true);

CREATE POLICY "admin_read_all_services"
ON services FOR SELECT
TO authenticated
USING (true);

-- ============================================================
-- REVIEWS: Fix SELECT policies
-- ============================================================
DROP POLICY IF EXISTS "public_read_approved_reviews" ON reviews;
DROP POLICY IF EXISTS "admin_read_all_reviews" ON reviews;

CREATE POLICY "public_read_approved_reviews"
ON reviews FOR SELECT
TO anon
USING (status = 'approved');

CREATE POLICY "admin_read_all_reviews"
ON reviews FOR SELECT
TO authenticated
USING (true);
