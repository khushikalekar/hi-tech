import { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  Wrench,
  Star,
  MessageSquare,
  Images,
  Inbox,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { businessInfo } from '@/data/business';
import type { AdminSection } from '@/pages/admin/AdminDashboardPage';

interface AdminSidebarProps {
  section: AdminSection;
  onSectionChange: (s: AdminSection) => void;
  onExit: () => void;
}

const menuItems: { id: AdminSection; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'services', label: 'Services', icon: Wrench },
  { id: 'gallery', label: 'Gallery', icon: Images },
  { id: 'reviews', label: 'Reviews', icon: Star },
  { id: 'enquiries', label: 'Enquiries', icon: Inbox },
  { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function AdminSidebar({ section, onSectionChange, onExit }: AdminSidebarProps) {
  const { signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSection = (s: AdminSection) => {
    onSectionChange(s);
    setMobileOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    onExit();
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-3 left-3 z-50 p-2.5 rounded-xl bg-white shadow-soft border border-navy-100 text-navy-700"
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-navy-900/50 z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-navy-900 text-white z-40 transform transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img
              src={businessInfo.logo}
              alt="Hitech Solutions"
              className="h-10 w-10 rounded-xl object-cover ring-2 ring-white/10"
            />
            <div>
              <p className="font-heading font-bold text-sm">Hitech Solutions</p>
              <p className="text-xs text-navy-400">Admin Dashboard</p>
            </div>
          </div>
        </div>

        <nav className="p-3 flex-1">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    section === item.id
                      ? 'bg-brand-600 text-white'
                      : 'text-navy-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-3 border-t border-white/10">
          <button
            onClick={onExit}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-navy-300 hover:bg-white/5 hover:text-white transition-all"
          >
            <ExternalLink className="h-5 w-5" />
            View Website
          </button>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
