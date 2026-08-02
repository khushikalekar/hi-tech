import { useEffect, useState } from 'react';
import { Package, CheckCircle2, Star, Wrench, Clock, TrendingUp, ArrowRight, Images, Inbox } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { AdminSection } from '@/pages/admin/AdminDashboardPage';

interface DashboardOverviewProps {
  onNavigate: (s: AdminSection) => void;
}

interface Stats {
  totalProducts: number;
  activeProducts: number;
  totalServices: number;
  activeServices: number;
  pendingReviews: number;
  approvedReviews: number;
  newEnquiries: number;
  galleryPhotos: number;
}

export default function DashboardOverview({ onNavigate }: DashboardOverviewProps) {
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    activeProducts: 0,
    totalServices: 0,
    activeServices: 0,
    pendingReviews: 0,
    approvedReviews: 0,
    newEnquiries: 0,
    galleryPhotos: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [
        productsAll,
        productsActive,
        servicesAll,
        servicesActive,
        pendingRev,
        approvedRev,
        newEnq,
        galleryCount,
      ] = await Promise.all([
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('products').select('*', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('services').select('*', { count: 'exact', head: true }),
        supabase.from('services').select('*', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('reviews').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('reviews').select('*', { count: 'exact', head: true }).eq('status', 'approved'),
        supabase.from('enquiries').select('*', { count: 'exact', head: true }).eq('status', 'new'),
        supabase.from('gallery_photos').select('*', { count: 'exact', head: true }),
      ]);

      setStats({
        totalProducts: productsAll.count ?? 0,
        activeProducts: productsActive.count ?? 0,
        totalServices: servicesAll.count ?? 0,
        activeServices: servicesActive.count ?? 0,
        pendingReviews: pendingRev.count ?? 0,
        approvedReviews: approvedRev.count ?? 0,
        newEnquiries: newEnq.count ?? 0,
        galleryPhotos: galleryCount.count ?? 0,
      });
      setLoading(false);
    };
    fetchStats();
  }, []);

  const cards = [
    {
      label: 'Total Products',
      value: stats.totalProducts,
      sub: `${stats.activeProducts} active`,
      icon: Package,
      color: 'from-brand-500 to-brand-700',
      section: 'products' as AdminSection,
    },
    {
      label: 'Active Products',
      value: stats.activeProducts,
      sub: `${stats.totalProducts - stats.activeProducts} disabled`,
      icon: CheckCircle2,
      color: 'from-emerald-500 to-emerald-700',
      section: 'products' as AdminSection,
    },
    {
      label: 'Active Services',
      value: stats.activeServices,
      sub: `${stats.totalServices} total`,
      icon: Wrench,
      color: 'from-navy-600 to-navy-800',
      section: 'services' as AdminSection,
    },
    {
      label: 'Pending Reviews',
      value: stats.pendingReviews,
      sub: 'Awaiting approval',
      icon: Clock,
      color: 'from-gold-500 to-gold-600',
      section: 'reviews' as AdminSection,
    },
    {
      label: 'Approved Reviews',
      value: stats.approvedReviews,
      sub: 'Visible publicly',
      icon: Star,
      color: 'from-purple-500 to-purple-700',
      section: 'reviews' as AdminSection,
    },
    {
      label: 'Gallery Photos',
      value: stats.galleryPhotos,
      sub: 'Published images',
      icon: Images,
      color: 'from-brand-600 to-navy-700',
      section: 'gallery' as AdminSection,
    },
    {
      label: 'New Enquiries',
      value: stats.newEnquiries,
      sub: 'Awaiting response',
      icon: Inbox,
      color: 'from-rose-500 to-rose-700',
      section: 'enquiries' as AdminSection,
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-heading font-bold text-2xl text-navy-900">Welcome back!</h2>
        <p className="text-navy-500 mt-1">Here's an overview of your website.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 animate-pulse h-32" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((c) => (
            <button
              key={c.label}
              onClick={() => onNavigate(c.section)}
              className="bg-white rounded-2xl p-6 shadow-soft border border-navy-100 hover:shadow-medium hover:-translate-y-0.5 transition-all text-left group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${c.color} text-white`}>
                  <c.icon className="h-6 w-6" />
                </div>
                <ArrowRight className="h-5 w-5 text-navy-300 group-hover:text-brand-500 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="font-heading text-3xl font-bold text-navy-900">{c.value}</p>
              <p className="text-sm font-medium text-navy-700 mt-1">{c.label}</p>
              <p className="text-xs text-navy-400 mt-0.5">{c.sub}</p>
            </button>
          ))}
        </div>
      )}

      {/* Quick actions */}
      <div className="mt-8">
        <h3 className="font-heading font-semibold text-lg text-navy-900 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => onNavigate('products')} className="btn-primary !py-2.5 text-sm">
            <Package className="h-4 w-4" />
            Manage Products
          </button>
          <button onClick={() => onNavigate('services')} className="btn-secondary !py-2.5 text-sm">
            <Wrench className="h-4 w-4" />
            Manage Services
          </button>
          <button onClick={() => onNavigate('reviews')} className="btn-ghost !py-2.5 text-sm">
            <Star className="h-4 w-4" />
            Review Submissions
          </button>
          <button onClick={() => onNavigate('gallery')} className="btn-ghost !py-2.5 text-sm">
            <Images className="h-4 w-4" />
            Manage Gallery
          </button>
          <button onClick={() => onNavigate('enquiries')} className="btn-ghost !py-2.5 text-sm">
            <Inbox className="h-4 w-4" />
            View Enquiries
          </button>
        </div>
      </div>
    </div>
  );
}
