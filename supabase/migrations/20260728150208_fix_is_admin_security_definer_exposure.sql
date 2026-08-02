/*
# Fix: is_admin() SECURITY DEFINER exposed via REST API

## Problem
The `is_admin()` function lives in the `public` schema, so PostgREST
exposes it as a callable REST endpoint at `/rest/v1/rpc/is_admin`.
Anyone (anon + authenticated) can call it to probe whether the current
JWT belongs to an admin — an information-leak vector.

## Fix
1. Create a `security` schema (PostgREST does NOT expose it via REST).
2. Move is_admin() into security schema (SECURITY DEFINER to read auth.users).
3. Revoke ALL privileges from anon, authenticated, and PUBLIC.
4. Grant USAGE on security schema to authenticated so RLS policies can
   call the function during query evaluation without it being callable
   directly via REST.
5. Update all RLS policies to call security.is_admin().
6. Drop the old public.is_admin().
*/

CREATE SCHEMA IF NOT EXISTS security;

CREATE OR REPLACE FUNCTION security.is_admin()
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

-- Lock down: no one can call it directly via REST
REVOKE ALL ON SCHEMA security FROM PUBLIC;
REVOKE ALL ON FUNCTION security.is_admin() FROM PUBLIC;
REVOKE ALL ON SCHEMA security FROM anon;
REVOKE ALL ON FUNCTION security.is_admin() FROM anon;
REVOKE ALL ON FUNCTION security.is_admin() FROM authenticated;

-- Grant USAGE on schema to authenticated so RLS policy evaluation
-- can resolve the function. USAGE alone does not grant EXECUTE on
-- the function, so it cannot be called via /rest/v1/rpc/is_admin.
GRANT USAGE ON SCHEMA security TO authenticated;

-- PRODUCTS
DROP POLICY IF EXISTS "admin_read_all_products" ON products;
DROP POLICY IF EXISTS "admin_insert_products" ON products;
DROP POLICY IF EXISTS "admin_update_products" ON products;
DROP POLICY IF EXISTS "admin_delete_products" ON products;

CREATE POLICY "admin_read_all_products"
ON products FOR SELECT TO authenticated
USING (security.is_admin());

CREATE POLICY "admin_insert_products"
ON products FOR INSERT TO authenticated
WITH CHECK (security.is_admin());

CREATE POLICY "admin_update_products"
ON products FOR UPDATE TO authenticated
USING (security.is_admin())
WITH CHECK (security.is_admin());

CREATE POLICY "admin_delete_products"
ON products FOR DELETE TO authenticated
USING (security.is_admin());

-- SERVICES
DROP POLICY IF EXISTS "admin_read_all_services" ON services;
DROP POLICY IF EXISTS "admin_insert_services" ON services;
DROP POLICY IF EXISTS "admin_update_services" ON services;
DROP POLICY IF EXISTS "admin_delete_services" ON services;

CREATE POLICY "admin_read_all_services"
ON services FOR SELECT TO authenticated
USING (security.is_admin());

CREATE POLICY "admin_insert_services"
ON services FOR INSERT TO authenticated
WITH CHECK (security.is_admin());

CREATE POLICY "admin_update_services"
ON services FOR UPDATE TO authenticated
USING (security.is_admin())
WITH CHECK (security.is_admin());

CREATE POLICY "admin_delete_services"
ON services FOR DELETE TO authenticated
USING (security.is_admin());

-- REVIEWS
DROP POLICY IF EXISTS "admin_read_all_reviews" ON reviews;
DROP POLICY IF EXISTS "admin_update_reviews" ON reviews;
DROP POLICY IF EXISTS "admin_delete_reviews" ON reviews;

CREATE POLICY "admin_read_all_reviews"
ON reviews FOR SELECT TO authenticated
USING (security.is_admin());

CREATE POLICY "admin_update_reviews"
ON reviews FOR UPDATE TO authenticated
USING (security.is_admin())
WITH CHECK (security.is_admin());

CREATE POLICY "admin_delete_reviews"
ON reviews FOR DELETE TO authenticated
USING (security.is_admin());

-- Drop the old exposed function
DROP FUNCTION IF EXISTS public.is_admin();
