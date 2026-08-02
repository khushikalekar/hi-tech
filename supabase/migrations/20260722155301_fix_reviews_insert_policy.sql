/*
# Fix the last "always true" policy: public_insert_reviews

## Problem
The `public_insert_reviews` policy had `WITH CHECK (true)` which Supabase
Security Audit flags as "RLS Policy Always True".

## Fix
Replace `WITH CHECK (true)` with a meaningful condition that:
1. Forces status = 'pending' on all public submissions (cannot self-approve)
2. Validates required fields are present (name, location, rating, text)

This ensures public review submissions are always pending and well-formed,
while still allowing anyone to submit a review.
*/

-- Drop and recreate the public insert policy with a meaningful check
DROP POLICY IF EXISTS "public_insert_reviews" ON reviews;

CREATE POLICY "public_insert_reviews"
ON reviews FOR INSERT
TO anon, authenticated
WITH CHECK (
  status = 'pending'
  AND name IS NOT NULL
  AND location IS NOT NULL
  AND rating IS NOT NULL
  AND text IS NOT NULL
);
