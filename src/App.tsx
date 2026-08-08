import { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import EnquiryCart from '@/components/EnquiryCart';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import ProductsPage from '@/pages/ProductsPage';
import ServicesPage from '@/pages/ServicesPage';
import ReviewsPage from '@/pages/ReviewsPage';
import GalleryPage from '@/pages/GalleryPage';
import ContactPage from '@/pages/ContactPage';
import AdminLoginPage from '@/pages/admin/AdminLoginPage';
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import { useAuth } from '@/context/AuthContext';
import type { Page } from '@/types';

const validPages: Page[] = [
  'home',
  'about',
  'products',
  'services',
  'gallery',
  'reviews',
  'contact',
];

type Route = Page | 'admin-login' | 'admin-dashboard';

function getRoute(): Route {
  const path = window.location.pathname.replace(/^\//, '').toLowerCase();

  if (path === 'admin' || path === 'admin/') return 'admin-login';
  if (path.startsWith('admin/dashboard')) return 'admin-dashboard';

  const page = path.split('/')[0] as Page;
  return validPages.includes(page) ? page : 'home';
}

export default function App() {
  const { user, loading } = useAuth();
  const [route, setRoute] = useState<Route>(getRoute());

  useEffect(() => {
    const onPopState = () => setRoute(getRoute());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const handleNavigate = useCallback((p: Page) => {
    window.history.pushState({}, '', `/${p}`);
    setRoute(p);
    window.scrollTo({ top: 0 });
  }, []);

  const goToAdmin = useCallback(() => {
    window.history.pushState({}, '', '/admin');
    setRoute('admin-login');
  }, []);

  const goToDashboard = useCallback(() => {
    window.history.pushState({}, '', '/admin/dashboard');
    setRoute('admin-dashboard');
  }, []);

  const goToSite = useCallback(() => {
    window.history.pushState({}, '', '/home');
    setRoute('home');
    window.scrollTo({ top: 0 });
  }, []);

  // ---- Admin: Login route ----
  if (route === 'admin-login') {
    if (loading) {
      return (
        <div className="min-h-screen bg-navy-900 flex items-center justify-center">
          <div className="h-8 w-8 border-4 border-brand-400 border-t-transparent rounded-full animate-spin" />
        </div>
      );
    }
    if (user) {
      return <AdminDashboardPage onExit={goToSite} />;
    }
    return <AdminLoginPage onBackToSite={goToSite} onLoginSuccess={goToDashboard} />;
  }

  // ---- Admin: Dashboard route (protected) ----
  if (route === 'admin-dashboard') {
    if (loading) {
      return (
        <div className="min-h-screen bg-navy-900 flex items-center justify-center">
          <div className="h-8 w-8 border-4 border-brand-400 border-t-transparent rounded-full animate-spin" />
        </div>
      );
    }
    if (!user) {
      // Unauthorized — redirect to /admin login
      return <AdminLoginPage onBackToSite={goToSite} onLoginSuccess={goToDashboard} />;
    }
    return <AdminDashboardPage onExit={goToSite} />;
  }

  // ---- Public site ----
  const renderPage = () => {
    switch (route) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'products':
        return <ProductsPage />;
   case 'services':
  return <ServicesPage />;

case 'gallery':
  return <GalleryPage />;

case 'reviews':
  return <ReviewsPage />;

      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar currentPage={route as Page} onNavigate={handleNavigate} />
      <main className="flex-1">{renderPage()}</main>
      <Footer onNavigate={handleNavigate} />
      <FloatingActions />
      <EnquiryCart />
    </div>
  );
}
