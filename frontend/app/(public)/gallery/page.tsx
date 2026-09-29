'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import { Images, X, Maximize2 } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: 'aqua' | 'jungle' | 'banquets' | 'food';
  image: string;
  caption: string;
}

const galleryData: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Aqua Theme Dining Hall',
    category: 'aqua',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    caption: 'Calming aquatic lighting and water features created for romantic and family dining.'
  },
  {
    id: 'g-2',
    title: 'Jungle Theme Family Section',
    category: 'jungle',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    caption: 'Immersive rainforest botanical aesthetic designed for kids, families, and celebrations.'
  },
  {
    id: 'g-3',
    title: 'KPHB Grand Banquet Hall',
    category: 'banquets',
    image: 'https://www.hotelmayukha.com/wp-content/uploads/2022/04/Banquet-Hall-Gallery-15.jpeg',
    caption: 'Air-conditioned luxury banquet space accommodating up to 200 guests.'
  },
  {
    id: 'g-4',
    title: 'Authentic Hyderabadi Dum Biryani',
    category: 'food',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80',
    caption: 'Signature basmati rice dum biryani cooked with authentic spices and pure ghee.'
  },
  {
    id: 'g-5',
    title: 'Tandoori Tangdi Kebab Platter',
    category: 'food',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=1200&q=80',
    caption: 'Charcoal grilled chicken drumsticks marinated in cashew paste and hung curd.'
  },
  {
    id: 'g-6',
    title: 'Crispy Loose Prawns',
    category: 'food',
    image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=1200&q=80',
    caption: 'Fresh ocean prawns tossed in curry leaves, green chillies, and garlic crunch.'
  },
  {
    id: 'g-7',
    title: 'Private Family Dining Booths',
    category: 'jungle',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    caption: 'Cozy private dining booths nestled in jungle themed green foliage.'
  },
  {
    id: 'g-8',
    title: 'Kokapet Event Setup',
    category: 'banquets',
    image: 'https://www.hotelmayukha.com/wp-content/uploads/2022/04/Banquet-Hall-Gallery-16.jpeg',
    caption: 'Custom corporate conference and reception table layout.'
  }
];

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'aqua' | 'jungle' | 'banquets' | 'food'>('all');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filteredGallery = activeTab === 'all'
    ? galleryData
    : galleryData.filter(item => item.category === activeTab);

  return (
    <div className="min-h-screen flex flex-col bg-mayukha-dark">
      <Header />

      <section className="py-12 px-4 bg-gradient-to-b from-mayukha-surface to-mayukha-dark border-b border-mayukha-border/40 text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-mayukha-gold">Visual Experience</span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-mayukha-cream">Ambience & Culinary Showcase</h1>
          <p className="text-mayukha-sand text-sm sm:text-base">
            Take a visual tour of our Aqua & Jungle themed dining halls, grand banquets, and signature Hyderabadi culinary creations.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1 space-y-8">
        
        {/* Category Tabs */}
        <div className="flex justify-center flex-wrap gap-2">
          {[
            { id: 'all', label: 'All Showcase' },
            { id: 'aqua', label: '🌊 Aqua Theme' },
            { id: 'jungle', label: '🌿 Jungle Theme' },
            { id: 'banquets', label: '👑 Banquet Halls' },
            { id: 'food', label: '🍲 Signature Platters' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === tab.id
                  ? 'bg-mayukha-gold text-mayukha-dark shadow-gold-glow'
                  : 'bg-mayukha-card text-mayukha-sand hover:text-mayukha-cream'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxItem(item)}
              className="group relative h-64 rounded-2xl overflow-hidden glass-panel border border-mayukha-border/60 hover:border-mayukha-gold/50 cursor-pointer shadow-lg transition duration-500"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-mayukha-dark via-mayukha-dark/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <span className="text-[10px] uppercase tracking-widest font-bold text-mayukha-gold">
                  {item.category}
                </span>
                <h3 className="font-serif font-bold text-base text-mayukha-cream group-hover:text-mayukha-gold transition">
                  {item.title}
                </h3>
              </div>

              <div className="absolute top-3 right-3 p-2 rounded-full bg-mayukha-dark/70 text-mayukha-gold opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-mayukha-dark/90 backdrop-blur-md animate-in fade-in">
          <div className="bg-mayukha-surface border border-mayukha-gold/30 rounded-2xl max-w-3xl w-full overflow-hidden shadow-deep relative">
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-mayukha-dark/80 text-mayukha-cream hover:text-mayukha-gold"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative h-96 w-full">
              <Image
                src={lightboxItem.image}
                alt={lightboxItem.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-6 space-y-2">
              <h3 className="font-serif font-bold text-2xl text-mayukha-cream">{lightboxItem.title}</h3>
              <p className="text-sm text-mayukha-sand">{lightboxItem.caption}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
