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
    .replace(/^\//, '')
    .toLowerCase();

  if (path === 'admin' || path === 'admin/') {
    return 'admin-login';
  }

  if (path.startsWith('admin/dashboard')) {
    return 'admin-dashboard';
  }

  const page = path.split('/')[0] as Page;

  return validPages.includes(page)
    ? page
    : 'home';
}

export default function App() {
  const { user, loading } = useAuth();

  const [route, setRoute] = useState<Route>(getRoute());

  // ==========================================
  // PRELOADER
  // ==========================================

  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    document.body.style.overflow = showPreloader
      ? 'hidden'
      : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [showPreloader]);

  // ==========================================
  // BROWSER BACK / FORWARD
  // ==========================================

  useEffect(() => {
    const onPopState = () => {
      setShowPreloader(true);
      setRoute(getRoute());
    };

    window.addEventListener(
      'popstate',
      onPopState
    );

    return () => {
      window.removeEventListener(
        'popstate',
        onPopState
      );
    };
  }, []);

  // ==========================================
  // PUBLIC NAVIGATION
  // ==========================================

  const handleNavigate = useCallback(
    (p: Page) => {
      setShowPreloader(true);

      window.history.pushState(
        {},
        '',
        `/${p}`
      );

      setRoute(p);

      window.scrollTo({
        top: 0,
      });
    },
    []
  );

  // ==========================================
  // ADMIN LOGIN
  // ==========================================

  const goToAdmin = useCallback(() => {
    setShowPreloader(true);

    window.history.pushState(
      {},
      '',
      '/admin'
    );

    setRoute('admin-login');
  }, []);

  // ==========================================
  // ADMIN DASHBOARD
  // ==========================================

  const goToDashboard = useCallback(() => {
    setShowPreloader(true);

    window.history.pushState(
      {},
      '',
      '/admin/dashboard'
    );

    setRoute('admin-dashboard');
  }, []);

  // ==========================================
  // BACK TO WEBSITE
  // ==========================================

  const goToSite = useCallback(() => {
    setShowPreloader(true);

    window.history.pushState(
      {},
      '',
      '/home'
    );

    setRoute('home');

    window.scrollTo({
      top: 0,
    });
  }, []);

  // ==========================================
  // PRELOADER
  // ==========================================

  if (showPreloader) {
    return (
      <CleaningPreloader
        key={route}
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
      return <></>;
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
      return <></>;
    }

    if (!user) {
      goToAdmin();
      return null;
    }

    return <AdminDashboardPage onExit={function (): void {
      throw new Error('Function not implemented.');
    } } />;
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
        return <AboutPage onNavigate={function (page: Page): void {
          throw new Error('Function not implemented.');
        } } />;

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