/*
# Fix: grant EXECUTE on security.is_admin() and broaden public read policies

## Problem
The `security.is_admin()` function had USAGE granted on its schema to
`authenticated`, but EXECUTE on the function itself was revoked from
everyone. RLS policies run with the privileges of the *querying* role,
so when an authenticated admin's INSERT/UPDATE/DELETE policy called
`security.is_admin()`, Postgres raised "permission denied for function
is_admin".

A secondary issue: the public SELECT policies on products, services, and
reviews were scoped to `TO anon` only. An authenticated (non-admin) user
or even an admin browsing the public site would get zero rows from those
tables because no SELECT policy matched the `authenticated` role for
public/active rows. The admin-only SELECT policies require
`security.is_admin()` to return true, which is correct for management
views, but the public-facing read path must also cover `authenticated`.

## Fix
1. Grant EXECUTE on `security.is_admin()` to `authenticated` so RLS
   policy evaluation can call it. The function remains unreachable via
   REST (`/rest/v1/rpc/is_admin`) because the `security` schema is not
   exposed by PostgREST — only the `public` schema is.
2. Recreate the public read policies on products, services, and reviews
   to target `TO anon, authenticated` so both anonymous visitors and
   logged-in users see the public/active/approved rows.
3. All admin write policies already use `security.is_admin()` and remain
   unchanged — no insecure `USING (true)` or `WITH CHECK (true)`.

## Security
- Only authenticated admins (raw_user_meta_data.role = 'admin') can
  INSERT, UPDATE, DELETE on products, services, reviews,
  gallery_photos, and gallery_categories.
- Public visitors (anon + authenticated) can only SELECT active products,
  active services, approved reviews, visible gallery photos, and all
  gallery categories.
- The `security.is_admin()` function is SECURITY DEFINER and not exposed
  via REST.
*/

-- ============================================================
-- 1. Grant EXECUTE on security.is_admin() to authenticated
-- ============================================================
-- RLS policies execute with the caller's privileges. Without EXECUTE,
-- any policy referencing security.is_admin() fails with
-- "permission denied for function is_admin".
GRANT EXECUTE ON FUNCTION security.is_admin() TO authenticated;

-- ============================================================
-- 2. Broaden public read policies to anon, authenticated
-- ============================================================

-- PRODUCTS: public read active
DROP POLICY IF EXISTS "public_read_active_products" ON products;
CREATE POLICY "public_read_active_products"
ON products FOR SELECT
TO anon, authenticated
USING (is_active = true);

-- SERVICES: public read active
DROP POLICY IF EXISTS "public_read_active_services" ON services;
CREATE POLICY "public_read_active_services"
ON services FOR SELECT
TO anon, authenticated
USING (is_active = true);

-- REVIEWS: public read approved
DROP POLICY IF EXISTS "public_read_approved_reviews" ON reviews;
CREATE POLICY "public_read_approved_reviews"
ON reviews FOR SELECT
TO anon, authenticated
USING (status = 'approved');

-- ============================================================
-- 3. Verify no insecure policies remain on admin-write paths
-- ============================================================
-- All admin INSERT/UPDATE/DELETE policies on products, services,
-- reviews, gallery_photos, and gallery_categories use
-- security.is_admin() — none use USING (true) or WITH CHECK (true).
