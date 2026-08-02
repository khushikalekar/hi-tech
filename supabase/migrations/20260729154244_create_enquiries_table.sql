/*
# Create customer enquiries table

## Overview
Stores product enquiries submitted by visitors through the Enquiry Cart.
The admin can view, manage, and mark enquiries as resolved from the
admin dashboard.

## Table: enquiries
- `id` (uuid, primary key)
- `customer_name` (text, not null)
- `phone` (text, not null)
- `address` (text, nullable)
- `notes` (text, nullable)
- `items` (jsonb, not null) — array of enquiry items
- `status` (text, default 'new') — 'new' | 'contacted' | 'resolved'
- `created_at` (timestamptz, default now())
- `updated_at` (timestamptz, default now())

## Security (RLS)
- Public (anon, authenticated) can INSERT enquiries (customers submit them).
- Admin can SELECT, UPDATE, DELETE enquiries (management).
- No public read — enquiry data is private to the admin.

## Constraint
- status must be one of 'new', 'contacted', 'resolved'.
*/

CREATE TABLE IF NOT EXISTS enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  phone text NOT NULL,
  address text,
  notes text,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'resolved')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Public can insert enquiries (customers submit from the website)
DROP POLICY IF EXISTS "public_insert_enquiries" ON enquiries;
CREATE POLICY "public_insert_enquiries"
ON enquiries FOR INSERT
TO anon, authenticated
WITH CHECK (
  customer_name IS NOT NULL
  AND phone IS NOT NULL
  AND status = 'new'
);

-- Admin can read all enquiries
DROP POLICY IF EXISTS "admin_read_enquiries" ON enquiries;
CREATE POLICY "admin_read_enquiries"
ON enquiries FOR SELECT
TO authenticated
USING (security.is_admin());

-- Admin can update enquiries (change status, add notes)
DROP POLICY IF EXISTS "admin_update_enquiries" ON enquiries;
CREATE POLICY "admin_update_enquiries"
ON enquiries FOR UPDATE
TO authenticated
USING (security.is_admin())
WITH CHECK (security.is_admin());

-- Admin can delete enquiries
DROP POLICY IF EXISTS "admin_delete_enquiries" ON enquiries;
CREATE POLICY "admin_delete_enquiries"
ON enquiries FOR DELETE
TO authenticated
USING (security.is_admin());

-- Index for admin sorting by newest first
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
