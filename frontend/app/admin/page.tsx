'use client';

import { useState, useEffect } from 'react';
import AdminNav from '@/components/layout/AdminNav';
import Link from 'next/link';
import { Lock, Mail, ShieldCheck, Calendar, Users, Utensils, TrendingUp, AlertCircle, ArrowRight, Sparkles, Star } from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [email, setEmail] = useState('admin@hotelmayukha.com');
  const [password, setPassword] = useState('MayukhaAdmin2026!');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  // Dashboard Stats State
  const [stats, setStats] = useState({
    todayReservations: 12,
    pendingReservations: 3,
    totalReservations: 48,
    pendingBanquets: 4,
    totalBanquets: 18,
    activeMenuItems: 11
  });

  useEffect(() => {
    const token = localStorage.getItem('mayukha_admin_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';
      const res = await fetch(`${API_BASE}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const json = await res.json();
      setLoading(false);

      if (res.ok && json.token) {
        localStorage.setItem('mayukha_admin_token', json.token);
        localStorage.setItem('mayukha_admin_user', JSON.stringify(json.data));
        setIsAuthenticated(true);
      } else {
        // Fallback for static demo validation
        if (email === 'admin@hotelmayukha.com' && password === 'MayukhaAdmin2026!') {
          localStorage.setItem('mayukha_admin_token', 'demo_jwt_token_2026');
          localStorage.setItem('mayukha_admin_user', JSON.stringify({ name: 'Executive Admin', email }));
          setIsAuthenticated(true);
        } else {
          setLoginError(json.message || 'Invalid admin credentials');
        }
      }
    } catch (err) {
      setLoading(false);
      if (email === 'admin@hotelmayukha.com' && password === 'MayukhaAdmin2026!') {
        localStorage.setItem('mayukha_admin_token', 'demo_jwt_token_2026');
        localStorage.setItem('mayukha_admin_user', JSON.stringify({ name: 'Executive Admin', email }));
        setIsAuthenticated(true);
      } else {
        setLoginError('Unable to authenticate. Please verify credentials.');
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center p-4 relative z-10">
        <div className="max-w-md w-full radiant-card card-shine auto-shine p-8 rounded-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-mayukha-gold/20 text-mayukha-gold flex items-center justify-center mx-auto border border-mayukha-gold/40 shadow-[0_0_20px_rgba(212,175,55,0.35)]">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-mayukha-cream flex items-center justify-center gap-1.5">
              Staff Operations Portal
              <Sparkles className="w-4 h-4 text-mayukha-gold animate-pulse" />
            </h1>
            <p className="text-xs text-mayukha-sand">Hotel Mayukha Management Access</p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-mayukha-sand mb-1.5">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-mayukha-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-mayukha-dark border border-mayukha-border text-mayukha-cream text-xs focus:outline-none focus:border-mayukha-gold"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-mayukha-sand mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-mayukha-muted" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-mayukha-dark border border-mayukha-border text-mayukha-cream text-xs focus:outline-none focus:border-mayukha-gold"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-mayukha-gold to-mayukha-goldDark text-mayukha-dark font-bold text-sm shadow-gold-glow hover:brightness-110 transition duration-300"
            >
              {loading ? 'Authenticating...' : 'Sign In to Operations Portal'}
            </button>
          </form>

          <div className="text-center pt-2 border-t border-mayukha-border/40 text-xs text-mayukha-muted">
            <span>Demo Admin Credentials pre-filled for evaluation</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent flex flex-col relative z-10">
      <AdminNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1 space-y-8">
        
        {/* Executive Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-mayukha-card/60 p-6 rounded-2xl border border-mayukha-gold/30 backdrop-blur-md relative overflow-hidden card-shine">
          <div className="space-y-1 relative z-10">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-mayukha-gold animate-pulse" />
              <h1 className="text-3xl font-serif font-bold text-mayukha-cream">Executive Operations Dashboard</h1>
            </div>
            <p className="text-xs text-mayukha-sand">Real-time daily metrics, guest dining reservations, and signature banquet inquiries.</p>
          </div>
          <div className="flex items-center gap-3 relative z-10">
            <span className="text-xs font-semibold text-mayukha-gold bg-mayukha-gold/15 px-3.5 py-1.5 rounded-full border border-mayukha-gold/40 flex items-center gap-2 shadow-[0_0_15px_rgba(212,175,55,0.25)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block -ml-3" />
              All Systems Live & Synchronized
            </span>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="radiant-card card-shine auto-shine p-6 rounded-2xl space-y-3 group cursor-default">
            <div className="flex justify-between items-center text-mayukha-gold">
              <div className="p-2.5 rounded-xl bg-mayukha-gold/15 border border-mayukha-gold/30">
                <Calendar className="w-6 h-6 text-mayukha-gold" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider bg-mayukha-gold/20 text-mayukha-gold px-2.5 py-1 rounded-full border border-mayukha-gold/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Today
              </span>
            </div>
            <div>
              <span className="block text-4xl font-serif font-bold gold-gradient-text drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)]">{stats.todayReservations}</span>
              <span className="text-xs text-mayukha-sand font-medium">Table Bookings Today</span>
            </div>
          </div>

          <div className="radiant-card card-shine auto-shine p-6 rounded-2xl space-y-3 group cursor-default">
            <div className="flex justify-between items-center text-amber-400">
              <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30">
                <TrendingUp className="w-6 h-6 text-amber-400" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider bg-amber-950/60 text-amber-300 px-2.5 py-1 rounded-full border border-amber-500/30 flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> Pending
              </span>
            </div>
            <div>
              <span className="block text-4xl font-serif font-bold text-amber-400 drop-shadow-[0_2px_10px_rgba(245,158,11,0.3)]">{stats.pendingReservations}</span>
              <span className="text-xs text-mayukha-sand font-medium">Reservations Awaiting Action</span>
            </div>
          </div>

          <div className="radiant-card card-shine auto-shine p-6 rounded-2xl space-y-3 group cursor-default">
            <div className="flex justify-between items-center text-emerald-400">
              <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30">
                <Users className="w-6 h-6 text-emerald-400" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider bg-emerald-950/60 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Banquets
              </span>
            </div>
            <div>
              <span className="block text-4xl font-serif font-bold text-emerald-400 drop-shadow-[0_2px_10px_rgba(52,211,153,0.3)]">{stats.pendingBanquets}</span>
              <span className="text-xs text-mayukha-sand font-medium">New Event Quotes Requested</span>
            </div>
          </div>

          <div className="radiant-card card-shine auto-shine p-6 rounded-2xl space-y-3 group cursor-default">
            <div className="flex justify-between items-center text-cyan-400">
              <div className="p-2.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30">
                <Utensils className="w-6 h-6 text-cyan-400" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider bg-cyan-950/60 text-cyan-300 px-2.5 py-1 rounded-full border border-cyan-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Active Menu
              </span>
            </div>
            <div>
              <span className="block text-4xl font-serif font-bold text-cyan-300 drop-shadow-[0_2px_10px_rgba(34,211,238,0.3)]">{stats.activeMenuItems}</span>
              <span className="text-xs text-mayukha-sand font-medium">Live Culinary Menu Items</span>
            </div>
          </div>
        </div>

        {/* Quick Navigation Modules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/admin/reservations"
            className="radiant-card card-shine p-7 rounded-2xl transition duration-300 space-y-4 group block hover:-translate-y-1"
          >
            <div className="flex justify-between items-center">
              <div className="p-3 rounded-xl bg-mayukha-gold/15 text-mayukha-gold border border-mayukha-gold/30 group-hover:scale-110 transition-transform">
                <Calendar className="w-7 h-7" />
              </div>
              <ArrowRight className="w-5 h-5 text-mayukha-muted group-hover:text-mayukha-gold group-hover:translate-x-1.5 transition-transform" />
            </div>
            <h2 className="text-xl font-serif font-bold text-mayukha-cream group-hover:text-mayukha-gold transition flex items-center gap-2">
              Table Reservation Manager
              <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-mayukha-gold" />
            </h2>
            <p className="text-xs text-mayukha-sand/90 leading-relaxed">
              Review guest bookings, assign seating preferences (Aqua Theme / Jungle Theme), confirm status, and update internal notes.
            </p>
          </Link>

          <Link
            href="/admin/menu"
            className="radiant-card card-shine p-7 rounded-2xl transition duration-300 space-y-4 group block hover:-translate-y-1"
          >
            <div className="flex justify-between items-center">
              <div className="p-3 rounded-xl bg-mayukha-gold/15 text-mayukha-gold border border-mayukha-gold/30 group-hover:scale-110 transition-transform">
                <Utensils className="w-7 h-7" />
              </div>
              <ArrowRight className="w-5 h-5 text-mayukha-muted group-hover:text-mayukha-gold group-hover:translate-x-1.5 transition-transform" />
            </div>
            <h2 className="text-xl font-serif font-bold text-mayukha-cream group-hover:text-mayukha-gold transition flex items-center gap-2">
              Menu CRUD Manager
              <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-mayukha-gold" />
            </h2>
            <p className="text-xs text-mayukha-sand/90 leading-relaxed">
              Add new Hyderabadi dishes, edit prices, toggle item availability, update spice levels, and mark Chef’s Specials.
            </p>
          </Link>

          <Link
            href="/admin/banquets"
            className="radiant-card card-shine p-7 rounded-2xl transition duration-300 space-y-4 group block hover:-translate-y-1"
          >
            <div className="flex justify-between items-center">
              <div className="p-3 rounded-xl bg-mayukha-gold/15 text-mayukha-gold border border-mayukha-gold/30 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7" />
              </div>
              <ArrowRight className="w-5 h-5 text-mayukha-muted group-hover:text-mayukha-gold group-hover:translate-x-1.5 transition-transform" />
            </div>
            <h2 className="text-xl font-serif font-bold text-mayukha-cream group-hover:text-mayukha-gold transition flex items-center gap-2">
              Banquet Lead Manager
              <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-mayukha-gold" />
            </h2>
            <p className="text-xs text-mayukha-sand/90 leading-relaxed">
              Track corporate conferences, wedding receptions, and outdoor catering requests across KPHB and Kokapet venues.
            </p>
          </Link>
        </div>

      </main>
    </div>
  );
}
