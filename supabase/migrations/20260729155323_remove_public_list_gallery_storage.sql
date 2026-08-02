-- Drop the broad SELECT policy that allows listing all files in the public gallery bucket.
-- Public buckets serve object URLs directly without a SELECT policy; the policy only
-- enabled storage.list() which exposed file metadata to anyone.
DROP POLICY IF EXISTS public_read_gallery_storage ON storage.objects;
