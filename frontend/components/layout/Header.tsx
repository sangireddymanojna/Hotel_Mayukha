'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Utensils, Calendar, Users, Images, MapPin, Phone, Menu as MenuIcon, X, ShieldCheck, Bike } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu', icon: Utensils },
    { name: 'Reserve Table', href: '/reserve', icon: Calendar },
    { name: 'Banquets & Catering', href: '/banquets', icon: Users },
    { name: 'Gallery', href: '/gallery', icon: Images },
    { name: 'Locations & Contact', href: '/contact', icon: MapPin },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-mayukha-dark/95 backdrop-blur-md border-b border-mayukha-gold/20 shadow-deep">
      {/* Top Banner Contact Strip */}
      <div className="bg-gradient-to-r from-[#1A1A1A] via-mayukha-card to-[#1A1A1A] border-b border-mayukha-border/40 py-1.5 px-4 text-xs text-mayukha-sand">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-mayukha-gold" /> 89779 33805, 8008222931
            </span>
            <span className="hidden sm:inline-block text-mayukha-muted">|</span>
            <span className="hidden sm:inline-block">📍 KPHB Phase 1 & Kokapet, Hyderabad</span>
          </div>
          <div className="flex items-center space-x-3 text-xs">
            <span className="bg-mayukha-gold/15 text-mayukha-gold px-2 py-0.5 rounded border border-mayukha-gold/30 font-medium">
              Aqua & Jungle Theme Dining
            </span>
            <Link href="/admin" className="text-mayukha-muted hover:text-mayukha-gold transition flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-mayukha-gold to-mayukha-goldDark p-0.5 shadow-gold-glow flex items-center justify-center">
              <div className="w-full h-full bg-mayukha-dark rounded-full flex items-center justify-center text-mayukha-gold font-serif font-bold text-xl group-hover:scale-105 transition-transform">
                M
              </div>
            </div>
            <div className="text-left">
              <span className="block font-serif font-bold text-xl sm:text-2xl text-mayukha-cream tracking-wide group-hover:text-mayukha-gold transition">
                HOTEL MAYUKHA
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-mayukha-gold font-medium">
                Restaurant & Hospitality
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? 'bg-mayukha-gold/15 text-mayukha-gold border border-mayukha-gold/30'
                    : 'text-mayukha-sand hover:text-mayukha-gold hover:bg-mayukha-surface/60'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action CTA Button */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/reserve"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-mayukha-gold to-mayukha-goldDark text-mayukha-dark font-semibold text-sm shadow-gold-glow hover:brightness-110 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Book a Table
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-mayukha-sand hover:text-mayukha-gold hover:bg-mayukha-surface focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-mayukha-surface/95 border-b border-mayukha-gold/20 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-lg text-base font-medium transition ${
                isActive(link.href)
                  ? 'bg-mayukha-gold/20 text-mayukha-gold font-semibold'
                  : 'text-mayukha-cream hover:bg-mayukha-card hover:text-mayukha-gold'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="/reserve"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-3 rounded-xl bg-mayukha-gold text-mayukha-dark font-bold shadow-gold-glow"
            >
              Book a Table
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
