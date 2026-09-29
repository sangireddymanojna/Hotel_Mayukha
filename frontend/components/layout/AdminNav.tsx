'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Calendar, Utensils, Users, LogOut, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('mayukha_admin_user');
    if (user) {
      try {
        const parsed = JSON.parse(user);
        setAdminUser(parsed.name || parsed.email);
      } catch (e) {
        setAdminUser('Admin Staff');
      }
    }
  }, []);

  const navItems = [
    { name: 'Dashboard Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Table Reservations', href: '/admin/reservations', icon: Calendar },
    { name: 'Menu CRUD Manager', href: '/admin/menu', icon: Utensils },
    { name: 'Banquet & Event Leads', href: '/admin/banquets', icon: Users },
  ];

  const handleLogout = () => {
    localStorage.removeItem('mayukha_admin_token');
    localStorage.removeItem('mayukha_admin_user');
    router.push('/admin');
    window.location.reload();
  };

  return (
    <div className="bg-mayukha-surface border-b border-mayukha-gold/20 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 border-b border-mayukha-border/40">
          
          <div className="flex items-center gap-4">
            <Link href="/" className="text-mayukha-muted hover:text-mayukha-gold transition flex items-center gap-1 text-xs">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Main Site
            </Link>
            <div className="h-4 w-px bg-mayukha-border" />
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-mayukha-gold" />
              <span className="font-serif font-bold text-mayukha-cream text-lg">Hotel Mayukha Admin Operations</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-mayukha-sand bg-mayukha-card px-3 py-1 rounded-full border border-mayukha-border">
              👤 Logged in as: <strong className="text-mayukha-gold">{adminUser || 'Executive Staff'}</strong>
            </span>
            <button
              onClick={handleLogout}
              className="px-3 py-1 rounded-lg bg-red-950/40 text-red-400 hover:bg-red-900/60 border border-red-500/30 transition flex items-center gap-1 font-semibold"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>

        </div>

        {/* Tab Navigation */}
        <nav className="flex space-x-2 py-2 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition whitespace-nowrap ${
                  active
                    ? 'bg-mayukha-gold text-mayukha-dark shadow-gold-glow'
                    : 'text-mayukha-sand hover:bg-mayukha-card hover:text-mayukha-gold'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
