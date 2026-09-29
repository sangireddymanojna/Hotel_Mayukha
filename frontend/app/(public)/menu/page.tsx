'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { fetchCategories, fetchMenuItems } from '@/lib/api';
import { MenuItem, MenuCategory } from '@/types';
import { Search, Flame, Filter, Utensils, X, Clock, AlertTriangle, CheckCircle, Calendar, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function MenuPage() {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDiet, setSelectedDiet] = useState<'all' | 'veg' | 'non-veg' | 'special'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const [activeModalItem, setActiveModalItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [catsData, itemsData] = await Promise.all([
        fetchCategories(),
        fetchMenuItems()
      ]);
      setCategories(catsData);
      setMenuItems(itemsData);
      setLoading(false);
    }
    loadData();
  }, []);

  // Filter items client side for instant responsive feel
  const filteredItems = menuItems.filter(item => {
    // Category Filter
    if (selectedCategory !== 'all') {
      const catObj = categories.find(c => c.slug === selectedCategory);
      if (catObj && item.categoryId !== catObj._id && (item.categoryId as MenuCategory)?._id !== catObj._id) {
        return false;
      }
    }

    // Diet Filter
    if (selectedDiet === 'veg' && !item.isVeg) return false;
    if (selectedDiet === 'non-veg' && item.isVeg) return false;
    if (selectedDiet === 'special' && !item.isChefSpecial) return false;

    // Search Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const nameMatch = item.name.toLowerCase().includes(q);
      const descMatch = item.description.toLowerCase().includes(q);
      const tagsMatch = item.tags.some(t => t.toLowerCase().includes(q));
      if (!nameMatch && !descMatch && !tagsMatch) return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-mayukha-dark">
      <Header />

      {/* Header Title Section */}
      <section className="py-12 px-4 bg-gradient-to-b from-mayukha-surface to-mayukha-dark border-b border-mayukha-border/40 text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-mayukha-gold">Authentic Hyderabad Culinary & Event Experience</span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-mayukha-cream">Interactive Digital Menu & Banquet Slots</h1>
          <p className="text-mayukha-sand text-sm sm:text-base">
            Explore Soups, Starters, Biryanis, Desserts, and Banquet Booking Slots across Hotel Mayukha KPHB & Kokapet.
          </p>
        </div>
      </section>

      {/* Main Interactive Controls & Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1 space-y-8">
        
        {/* Search & Filter Controls Bar */}
        <div className="glass-panel p-4 rounded-2xl border border-mayukha-gold/20 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-mayukha-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dish or banquet slot..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-mayukha-dark border border-mayukha-border/80 text-mayukha-cream text-sm placeholder-mayukha-muted focus:outline-none focus:border-mayukha-gold"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-mayukha-muted hover:text-mayukha-cream"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Dietary Preference Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <button
                onClick={() => setSelectedDiet('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                  selectedDiet === 'all'
                    ? 'bg-mayukha-gold text-mayukha-dark'
                    : 'bg-mayukha-card text-mayukha-sand hover:text-mayukha-cream'
                }`}
              >
                All Items
              </button>
              <button
                onClick={() => setSelectedDiet('veg')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                  selectedDiet === 'veg'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-mayukha-card text-emerald-400 hover:bg-emerald-950/40'
                }`}
              >
                🟢 Pure Veg
              </button>
              <button
                onClick={() => setSelectedDiet('non-veg')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                  selectedDiet === 'non-veg'
                    ? 'bg-red-600 text-white'
                    : 'bg-mayukha-card text-red-400 hover:bg-red-950/40'
                }`}
              >
                🔴 Non-Veg
              </button>
              <button
                onClick={() => setSelectedDiet('special')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                  selectedDiet === 'special'
                    ? 'bg-amber-600 text-white'
                    : 'bg-mayukha-card text-amber-400 hover:bg-amber-950/40'
                }`}
              >
                <Flame className="w-3.5 h-3.5" /> Chef’s Specials
              </button>
            </div>

          </div>

          {/* Category Tabs Scrollbar (Soups, Starters, Biryanis, Desserts, Banquet Booking Slots) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 no-scrollbar border-t border-mayukha-border/40">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === 'all'
                  ? 'bg-mayukha-gold text-mayukha-dark font-bold shadow-gold-glow'
                  : 'bg-mayukha-surface text-mayukha-sand hover:text-mayukha-cream'
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
                  selectedCategory === cat.slug
                    ? 'bg-mayukha-gold text-mayukha-dark font-bold shadow-gold-glow'
                    : 'bg-mayukha-surface text-mayukha-sand hover:text-mayukha-gold'
                }`}
              >
                {cat.slug === 'banquet-slots' ? <Users className="w-3.5 h-3.5" /> : null}
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex justify-between items-center text-xs text-mayukha-muted px-1">
          <span>Showing <strong className="text-mayukha-gold">{filteredItems.length}</strong> items in selected menu view</span>
          {selectedCategory !== 'all' && (
            <button onClick={() => setSelectedCategory('all')} className="underline hover:text-mayukha-gold">
              Show All Categories
            </button>
          )}
        </div>

        {/* Menu Grid */}
        {loading ? (
          <div className="text-center py-20 text-mayukha-gold font-serif">Loading menu items...</div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20 glass-panel rounded-2xl border border-mayukha-border p-8 space-y-3">
            <Utensils className="w-12 h-12 text-mayukha-muted mx-auto" />
            <h3 className="text-xl font-serif text-mayukha-cream">No items found</h3>
            <p className="text-sm text-mayukha-muted">Try adjusting your category, diet, or search query filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const isBanquetSlot = (item.categoryId as any) === 'cat-banquet' || item.tags?.includes('Banquet Hall');
              
              return (
                <div
                  key={item._id}
                  onClick={() => setActiveModalItem(item)}
                  className={`bg-mayukha-surface rounded-2xl overflow-hidden border ${
                    isBanquetSlot ? 'border-mayukha-gold/50 shadow-gold-glow' : 'border-mayukha-border/60'
                  } hover:border-mayukha-gold transition duration-300 flex flex-col justify-between group cursor-pointer shadow-lg hover:-translate-y-1`}
                >
                  <div>
                    <div className="relative h-48 w-full overflow-hidden bg-mayukha-card">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {isBanquetSlot ? (
                        <div className="absolute top-3 left-3 bg-mayukha-gold text-mayukha-dark font-bold px-2.5 py-1 rounded text-[10px] uppercase tracking-wider shadow">
                          👑 Banquet Event Slot
                        </div>
                      ) : (
                        <div className="absolute top-3 left-3 bg-mayukha-dark/85 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-mayukha-cream border border-mayukha-border">
                          {item.isVeg ? '🟢 Veg' : '🔴 Non-Veg'}
                        </div>
                      )}

                      {item.isChefSpecial && !isBanquetSlot && (
                        <div className="absolute top-3 right-3 bg-mayukha-dark/85 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-amber-400 border border-mayukha-border flex items-center gap-1">
                          <Flame className="w-3 h-3" /> Chef Special
                        </div>
                      )}
                    </div>

                    <div className="p-5 space-y-2">
                      <h3 className="font-serif font-bold text-lg text-mayukha-cream group-hover:text-mayukha-gold transition line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-mayukha-muted line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                      
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {item.tags.map(tag => (
                            <span key={tag} className="text-[10px] bg-mayukha-card text-mayukha-sand px-2 py-0.5 rounded border border-mayukha-border/40">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-3 border-t border-mayukha-border/40 flex items-center justify-between">
                    <span className="font-serif font-bold text-xl text-mayukha-gold">₹{item.price}</span>
                    {isBanquetSlot ? (
                      <Link
                        href="/banquets"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs font-bold px-3 py-1.5 rounded-lg bg-mayukha-gold text-mayukha-dark hover:bg-mayukha-goldDark transition shadow"
                      >
                        Book Banquet Slot →
                      </Link>
                    ) : (
                      <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-mayukha-card text-mayukha-cream group-hover:bg-mayukha-gold group-hover:text-mayukha-dark transition">
                        View Details
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Item Detail Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-mayukha-dark/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-mayukha-surface border border-mayukha-gold/40 rounded-2xl max-w-lg w-full overflow-hidden shadow-deep space-y-4 relative">
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-mayukha-dark/80 text-mayukha-cream hover:text-mayukha-gold transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-60 w-full">
              <Image
                src={activeModalItem.image}
                alt={activeModalItem.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-mayukha-surface via-transparent to-transparent" />
            </div>

            <div className="p-6 space-y-4 -mt-8 relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-mayukha-gold">
                    {activeModalItem.tags?.includes('Banquet Hall') ? '👑 Banquet Event Hall Slot' : activeModalItem.isVeg ? '🟢 Pure Vegetarian' : '🔴 Non-Vegetarian'}
                  </span>
                  <h2 className="text-2xl font-serif font-bold text-mayukha-cream">{activeModalItem.name}</h2>
                </div>
                <span className="text-2xl font-serif font-bold text-mayukha-gold">₹{activeModalItem.price}</span>
              </div>

              <p className="text-sm text-mayukha-sand leading-relaxed">
                {activeModalItem.description}
              </p>

              <div className="pt-3 flex gap-3">
                <button
                  onClick={() => setActiveModalItem(null)}
                  className="flex-1 py-3 rounded-xl bg-mayukha-card text-mayukha-sand font-semibold text-sm hover:text-mayukha-cream transition"
                >
                  Close
                </button>
                {activeModalItem.tags?.includes('Banquet Hall') ? (
                  <Link
                    href="/banquets"
                    className="flex-1 py-3 text-center rounded-xl bg-mayukha-gold text-mayukha-dark font-bold text-sm shadow-gold-glow hover:bg-mayukha-goldDark transition"
                  >
                    Request Banquet Quote
                  </Link>
                ) : (
                  <Link
                    href="/reserve"
                    className="flex-1 py-3 text-center rounded-xl bg-mayukha-gold text-mayukha-dark font-bold text-sm shadow-gold-glow hover:bg-mayukha-goldDark transition"
                  >
                    Book Table for Dish
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
