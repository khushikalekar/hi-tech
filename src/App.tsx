import { useState, useEffect, useCallback } from 'react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import EnquiryCart from '@/components/EnquiryCart';
import CleaningPreloader from '@/components/CleaningPreloader';

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
  const path = window.location.pathname
    .replace(/^\/+/, '')
    .toLowerCase();

  if (path === 'admin' || path === 'admin/') {
    return 'admin-login';
  }

  if (path.startsWith('admin/dashboard')) {
    return 'admin-dashboard';
  }

  const page = path.split('/')[0] as Page;

  return validPages.includes(page) ? page : 'home';
}

export default function App() {
  const { user, loading } = useAuth();

  const [route, setRoute] = useState<Route>(() => getRoute());

  // ==========================================
  // PRELOADER
  // ==========================================

  const [showPreloader, setShowPreloader] = useState(true);

  /**
   * Hide the initial preloader as soon as React
   * has mounted the application.
   *
   * This prevents the preloader animation from
   * delaying the actual website.
   */
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setShowPreloader(false);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.body.style.overflow = showPreloader ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [showPreloader]);

  // ==========================================
  // BROWSER BACK / FORWARD
  // ==========================================

  useEffect(() => {
    const onPopState = () => {
      setRoute(getRoute());

      window.scrollTo({
        top: 0,
        behavior: 'instant',
      });
    };

    window.addEventListener('popstate', onPopState);

    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  // ==========================================
  // PUBLIC NAVIGATION
  // ==========================================

  const handleNavigate = useCallback((page: Page) => {
    window.history.pushState({}, '', `/${page}`);

    setRoute(page);

    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  }, []);

  // ==========================================
  // ADMIN LOGIN
  // ==========================================

  const goToAdmin = useCallback(() => {
    window.history.pushState({}, '', '/admin');

    setRoute('admin-login');

    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  }, []);

  // ==========================================
  // ADMIN DASHBOARD
  // ==========================================

  const goToDashboard = useCallback(() => {
    window.history.pushState({}, '', '/admin/dashboard');

    setRoute('admin-dashboard');

    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  }, []);

  // ==========================================
  // BACK TO WEBSITE
  // ==========================================

  const goToSite = useCallback(() => {
    window.history.pushState({}, '', '/home');

    setRoute('home');

    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  }, []);

  // ==========================================
  // INITIAL PRELOADER
  // ==========================================

  if (showPreloader) {
    return (
      <CleaningPreloader
        onComplete={() => {
          setShowPreloader(false);
        }}
      />
    );
  }

  // ==========================================
  // ADMIN LOGIN ROUTE
  // ==========================================

  if (route === 'admin-login') {
    if (loading) {
      return null;
    }

    if (user) {
      goToDashboard();
      return null;
    }

    return (
      <AdminLoginPage
        onLoginSuccess={goToDashboard}
        onBackToSite={goToSite}
      />
    );
  }

  // ==========================================
  // ADMIN DASHBOARD ROUTE
  // ==========================================

  if (route === 'admin-dashboard') {
    if (loading) {
      return null;
    }

    if (!user) {
      goToAdmin();
      return null;
    }

    return (
      <AdminDashboardPage
        onExit={goToSite}
      />
    );
  }

  // ==========================================
  // PUBLIC SITE
  // ==========================================

  const renderPage = () => {
    switch (route) {
      case 'home':
        return (
          <HomePage
            onNavigate={handleNavigate}
          />
        );

      case 'about':
        return (
          <AboutPage
            onNavigate={handleNavigate}
          />
        );

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
        return (
          <HomePage
            onNavigate={handleNavigate}
          />
        );
    }
  };

  // ==========================================
  // MAIN WEBSITE
  // ==========================================

  return (
    <>
      <Navbar
        currentPage={route as Page}
        onNavigate={handleNavigate}
      />

      {renderPage()}

      <Footer
        onNavigate={handleNavigate}
      />

      <FloatingActions />

      <EnquiryCart />
    </>
  );
}