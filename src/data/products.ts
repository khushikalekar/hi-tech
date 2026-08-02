// Products are now managed via the admin dashboard and stored in Supabase.
// This file is kept for backwards compatibility but data is fetched from the database.
// See src/hooks/useSupabaseData.ts for the live data hooks.

export { useProducts } from '@/hooks/useSupabaseData';
