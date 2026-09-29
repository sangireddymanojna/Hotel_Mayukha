'use client';

import { useState, useEffect } from 'react';
import AdminNav from '@/components/layout/AdminNav';
import { fetchMenuItems, MOCK_CATEGORIES } from '@/lib/api';
import { MenuItem } from '@/types';
import { Plus, Edit2, Trash2, Flame, Search, Check, X, Utensils } from 'lucide-react';
import Image from 'next/image';

export default function AdminMenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<MenuItem | null>(null);

  // Form State
  const [form, setForm] = useState({
    name: '',
    categoryId: 'cat-2',
    price: 350,
    description: '',
    isVeg: false,
    spiceLevel: 2,
    isChefSpecial: false,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    allergenInfo: 'Dairy'
  });

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await fetchMenuItems();
      setItems(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleOpenAddModal = () => {
    setEditingDish(null);
    setForm({
      name: '',
      categoryId: 'cat-2',
      price: 350,
      description: '',
      isVeg: false,
      spiceLevel: 2,
      isChefSpecial: false,
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
      allergenInfo: 'Dairy'
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (dish: MenuItem) => {
    setEditingDish(dish);
    setForm({
      name: dish.name,
      categoryId: typeof dish.categoryId === 'string' ? dish.categoryId : dish.categoryId._id,
      price: dish.price,
      description: dish.description,
      isVeg: dish.isVeg,
      spiceLevel: dish.spiceLevel,
      isChefSpecial: dish.isChefSpecial,
      image: dish.image,
      allergenInfo: dish.allergenInfo.join(', ')
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.description) return;

    if (editingDish) {
      setItems(prev => prev.map(item => item._id === editingDish._id ? {
        ...item,
        name: form.name,
        price: Number(form.price),
        description: form.description,
        isVeg: form.isVeg,
        spiceLevel: Number(form.spiceLevel),
        isChefSpecial: form.isChefSpecial,
        image: form.image,
        allergenInfo: form.allergenInfo.split(',').map(s => s.trim())
      } : item));
    } else {
      const newItem: MenuItem = {
        _id: `dish-${Date.now()}`,
        name: form.name,
        slug: form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        categoryId: form.categoryId,
        price: Number(form.price),
        description: form.description,
        isVeg: form.isVeg,
        spiceLevel: Number(form.spiceLevel),
        isAvailable: true,
        isChefSpecial: form.isChefSpecial,
        image: form.image,
        allergenInfo: form.allergenInfo.split(',').map(s => s.trim()),
        tags: [form.isVeg ? 'Vegetarian' : 'Non-Veg']
      };
      setItems(prev => [newItem, ...prev]);
    }

    setIsModalOpen(false);
  };

  const toggleAvailability = (id: string) => {
    setItems(prev => prev.map(item => item._id === id ? { ...item, isAvailable: !item.isAvailable } : item));
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this menu item?')) {
      setItems(prev => prev.filter(item => item._id !== id));
    }
  };

  const filteredItems = items.filter(item => {
    if (!searchQuery.trim()) return true;
    return item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           item.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-mayukha-dark flex flex-col">
      <AdminNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1 space-y-6">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-mayukha-cream">Menu CRUD Manager</h1>
            <p className="text-xs text-mayukha-sand">Add new dishes, update pricing, toggle availability, and set chef specials.</p>
          </div>
          <button
            onClick={handleOpenAddModal}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-mayukha-gold to-mayukha-goldDark text-mayukha-dark font-bold text-xs shadow-gold-glow hover:brightness-110 transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add New Dish
          </button>
        </div>

        {/* Search Bar */}
        <div className="glass-panel p-4 rounded-2xl border border-mayukha-gold/20 flex justify-between items-center">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mayukha-muted" />
            <input
              type="text"
              placeholder="Search dishes by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-mayukha-dark border border-mayukha-border text-mayukha-cream text-xs focus:outline-none focus:border-mayukha-gold"
            />
          </div>
          <span className="text-xs text-mayukha-muted hidden sm:inline-block">
            Total Dishes: <strong className="text-mayukha-gold">{items.length}</strong>
          </span>
        </div>

        {/* Menu Items Table */}
        <div className="glass-panel rounded-2xl border border-mayukha-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-mayukha-card/80 text-mayukha-sand font-semibold uppercase tracking-wider border-b border-mayukha-border/60">
                <tr>
                  <th className="py-3.5 px-4">Dish</th>
                  <th className="py-3.5 px-4">Diet / Spice</th>
                  <th className="py-3.5 px-4">Price (₹)</th>
                  <th className="py-3.5 px-4">Availability</th>
                  <th className="py-3.5 px-4">Badges</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-mayukha-border/40 text-mayukha-cream">
                {filteredItems.map((dish) => (
                  <tr key={dish._id} className="hover:bg-mayukha-card/50 transition">
                    <td className="py-3.5 px-4 flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-mayukha-card border border-mayukha-border">
                        <Image src={dish.image} alt={dish.name} fill className="object-cover" />
                      </div>
                      <div>
                        <strong className="block text-mayukha-cream text-sm">{dish.name}</strong>
                        <span className="text-[11px] text-mayukha-muted line-clamp-1">{dish.description}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-semibold block">{dish.isVeg ? '🟢 Veg' : '🔴 Non-Veg'}</span>
                      <span className="text-amber-400 text-[10px]">🌶️ Spice: {dish.spiceLevel}/3</span>
                    </td>

                    <td className="py-3.5 px-4 font-serif font-bold text-base text-mayukha-gold">
                      ₹{dish.price}
                    </td>

                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => toggleAvailability(dish._id)}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition ${
                          dish.isAvailable
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                            : 'bg-red-950 text-red-400 border border-red-500/30'
                        }`}
                      >
                        {dish.isAvailable ? 'In Stock' : 'Out of Stock'}
                      </button>
                    </td>

                    <td className="py-3.5 px-4">
                      {dish.isChefSpecial ? (
                        <span className="bg-amber-950/60 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded text-[10px] font-bold inline-flex items-center gap-1">
                          <Flame className="w-3 h-3" /> Chef Special
                        </span>
                      ) : (
                        <span className="text-mayukha-muted text-[10px]">—</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEditModal(dish)}
                        className="p-1.5 rounded bg-mayukha-card text-mayukha-gold hover:bg-mayukha-gold hover:text-mayukha-dark transition"
                        title="Edit Dish"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(dish._id)}
                        className="p-1.5 rounded bg-red-950/40 text-red-400 hover:bg-red-900 transition"
                        title="Delete Dish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* Add / Edit Dish Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-mayukha-dark/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-mayukha-surface border border-mayukha-gold/40 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-deep relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-mayukha-muted hover:text-mayukha-cream"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-serif font-bold text-mayukha-cream">
              {editingDish ? 'Edit Culinary Dish' : 'Add New Dish to Menu'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-mayukha-sand font-semibold mb-1">Dish Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-mayukha-dark border border-mayukha-border text-mayukha-cream focus:outline-none focus:border-mayukha-gold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-mayukha-sand font-semibold mb-1">Category</label>
                  <select
                    value={form.categoryId}
                    onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-mayukha-dark border border-mayukha-border text-mayukha-cream focus:outline-none focus:border-mayukha-gold"
                  >
                    {MOCK_CATEGORIES.map(c => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-mayukha-sand font-semibold mb-1">Price in ₹ *</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-mayukha-dark border border-mayukha-border text-mayukha-cream focus:outline-none focus:border-mayukha-gold"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-mayukha-sand font-semibold mb-1">Description *</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-mayukha-dark border border-mayukha-border text-mayukha-cream focus:outline-none focus:border-mayukha-gold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-mayukha-sand font-semibold mb-1">Dietary Type</label>
                  <select
                    value={form.isVeg ? 'veg' : 'non-veg'}
                    onChange={(e) => setForm({ ...form, isVeg: e.target.value === 'veg' })}
                    className="w-full px-3 py-2 rounded-xl bg-mayukha-dark border border-mayukha-border text-mayukha-cream focus:outline-none focus:border-mayukha-gold"
                  >
                    <option value="non-veg">🔴 Non-Vegetarian</option>
                    <option value="veg">🟢 Pure Vegetarian</option>
                  </select>
                </div>

                <div>
                  <label className="block text-mayukha-sand font-semibold mb-1">Spice Level (0 - 3)</label>
                  <select
                    value={form.spiceLevel}
                    onChange={(e) => setForm({ ...form, spiceLevel: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-mayukha-dark border border-mayukha-border text-mayukha-cream focus:outline-none focus:border-mayukha-gold"
                  >
                    <option value={0}>0 - Mild</option>
                    <option value={1}>1 - Medium</option>
                    <option value={2}>2 - Spicy</option>
                    <option value={3}>3 - Extra Spicy</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="chefSpecial"
                  checked={form.isChefSpecial}
                  onChange={(e) => setForm({ ...form, isChefSpecial: e.target.checked })}
                  className="rounded border-mayukha-border text-mayukha-gold focus:ring-0"
                />
                <label htmlFor="chefSpecial" className="text-mayukha-cream font-semibold cursor-pointer">
                  Mark as Chef’s Special Recommendation
                </label>
              </div>

              <div>
                <label className="block text-mayukha-sand font-semibold mb-1">Image URL</label>
                <input
                  type="url"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-mayukha-dark border border-mayukha-border text-mayukha-cream focus:outline-none focus:border-mayukha-gold"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-mayukha-card text-mayukha-sand font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-mayukha-gold text-mayukha-dark font-bold shadow-gold-glow"
                >
                  Save Dish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
