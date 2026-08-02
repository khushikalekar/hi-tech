import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import AdminSidebar from '@/components/admin/AdminSidebar';
import DashboardOverview from '@/components/admin/DashboardOverview';
import ProductManagement from '@/components/admin/ProductManagement';
import ServiceManagement from '@/components/admin/ServiceManagement';
import ReviewManagement from '@/components/admin/ReviewManagement';
import TestimonialManagement from '@/components/admin/TestimonialManagement';
import AdminSettings from '@/components/admin/AdminSettings';
import GalleryManagement from '@/components/admin/GalleryManagement';
import EnquiryManagement from '@/components/admin/EnquiryManagement';

export type AdminSection =
  | 'overview'
  | 'products'
  | 'services'
  | 'gallery'
  | 'reviews'
  | 'enquiries'
  | 'testimonials'
  | 'settings';

interface AdminDashboardPageProps {
  onExit: () => void;
}

export default function AdminDashboardPage({ onExit }: AdminDashboardPageProps) {
  const { user } = useAuth();
  const [section, setSection] = useState<AdminSection>('overview');

  const titleMap: Record<AdminSection, string> = {
    overview: 'Dashboard',
    products: 'Products',
    services: 'Services',
    gallery: 'Gallery',
    reviews: 'Reviews',
    enquiries: 'Customer Enquiries',
    testimonials: 'Testimonials',
    settings: 'Settings',
  };

  return (
    <div className="min-h-screen bg-navy-50 flex">
      <AdminSidebar
        section={section}
        onSectionChange={setSection}
        onExit={onExit}
      />

      <div className="flex-1 lg:ml-64 min-h-screen flex flex-col">
        {/* Top bar */}
        <header className="bg-white border-b border-navy-100 px-4 md:px-6 py-3 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <h1 className="font-heading font-bold text-lg md:text-xl text-navy-900">
              {titleMap[section]}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-navy-700">{user?.email}</p>
              <p className="text-xs text-navy-500">Owner / Admin</p>
            </div>
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold text-sm">
              {(user?.email ?? 'A').charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {section === 'overview' && <DashboardOverview onNavigate={setSection} />}
          {section === 'products' && <ProductManagement />}
          {section === 'services' && <ServiceManagement />}
          {section === 'gallery' && <GalleryManagement />}
          {section === 'reviews' && <ReviewManagement />}
          {section === 'enquiries' && <EnquiryManagement />}
          {section === 'testimonials' && <TestimonialManagement />}
          {section === 'settings' && <AdminSettings />}
        </main>
      </div>
    </div>
  );
}
