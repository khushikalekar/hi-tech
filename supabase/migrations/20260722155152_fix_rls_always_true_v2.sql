/*
# Fix RLS "Always True" security warnings with proper role-based authorization

## Problem
All admin policies on products, services, and reviews used `USING (true)` or
`WITH CHECK (true)` for `TO authenticated`. This means ANY authenticated user
(not just the admin) could insert, update, or delete records. Supabase's
Security Audit flags these as "RLS Policy Always True" warnings.

## Fix
1. Create a SECURITY DEFINER function `is_admin()` that checks the auth.users
   table for the current user's `role = 'admin'` metadata. This runs at the
   database level — not frontend state, not localStorage, not a hardcoded
   frontend variable.
2. Replace all `USING (true)` / `WITH CHECK (true)` in admin policies with
   `USING (is_admin())` / `WITH CHECK (is_admin())`.
3. Public read policies (anon) remain unchanged — they already filter by
   is_active or status = 'approved'.
4. Public review INSERT remains open to anon (with CHECK true, which is fine
   since the trigger forces status = 'pending').
*/

-- ============================================================
-- Step 1: Create is_admin() security definer function
-- ============================================================
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM auth.users
    WHERE id = auth.uid()
      AND raw_user_meta_data->>'role' = 'admin'
  );
$$;

GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated;

-- ============================================================
-- Step 2: Fix PRODUCTS policies
-- ============================================================
DROP POLICY IF EXISTS "admin_read_all_products" ON products;
DROP POLICY IF EXISTS "admin_insert_products" ON products;
DROP POLICY IF EXISTS "admin_update_products" ON products;
DROP POLICY IF EXISTS "admin_delete_products" ON products;

CREATE POLICY "admin_read_all_products"
ON products FOR SELECT
TO authenticated
USING (is_admin());

CREATE POLICY "admin_insert_products"
ON products FOR INSERT
TO authenticated
WITH CHECK (is_admin());

CREATE POLICY "admin_update_products"
ON products FOR UPDATE
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY "admin_delete_products"
ON products FOR DELETE
TO authenticated
USING (is_admin());

-- ============================================================
-- Step 3: Fix SERVICES policies
-- ============================================================
DROP POLICY IF EXISTS "admin_read_all_services" ON services;
DROP POLICY IF EXISTS "admin_insert_services" ON services;
DROP POLICY IF EXISTS "admin_update_services" ON services;
DROP POLICY IF EXISTS "admin_delete_services" ON services;

CREATE POLICY "admin_read_all_services"
ON services FOR SELECT
TO authenticated
USING (is_admin());

CREATE POLICY "admin_insert_services"
ON services FOR INSERT
TO authenticated
WITH CHECK (is_admin());

CREATE POLICY "admin_update_services"
ON services FOR UPDATE
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY "admin_delete_services"
ON services FOR DELETE
TO authenticated
USING (is_admin());

-- ============================================================
-- Step 4: Fix REVIEWS policies
-- ============================================================
DROP POLICY IF EXISTS "admin_read_all_reviews" ON reviews;
DROP POLICY IF EXISTS "admin_update_reviews" ON reviews;
DROP POLICY IF EXISTS "admin_delete_reviews" ON reviews;
DROP POLICY IF EXISTS "public_insert_reviews" ON reviews;

-- Public: insert reviews (anyone can submit, trigger forces status = 'pending')
CREATE POLICY "public_insert_reviews"
ON reviews FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Admin: read all reviews (including pending, rejected)
CREATE POLICY "admin_read_all_reviews"
ON reviews FOR SELECT
TO authenticated
USING (is_admin());

-- Admin: update reviews (approve, reject, edit)
CREATE POLICY "admin_update_reviews"
ON reviews FOR UPDATE
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

-- Admin: delete reviews
CREATE POLICY "admin_delete_reviews"
ON reviews FOR DELETE
TO authenticated
USING (is_admin());
