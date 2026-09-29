import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { fetchMenuItems, fetchTestimonials } from '@/lib/api';
import { Utensils, Calendar, Users, Award, Star, Flame, Waves, Trees, ChevronRight, Phone, CheckCircle2 } from 'lucide-react';

export default async function Home() {
  const featuredDishes = await fetchMenuItems({ chefSpecial: 'true' });
  const testimonials = await fetchTestimonials();

  return (
    <div className="min-h-screen flex flex-col bg-mayukha-dark">
      <Header />

      {/* HERO SECTION */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden py-16 px-4">
        {/* Darkened Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=80"
            alt="Hotel Mayukha Ambience"
            fill
            className="object-cover object-center opacity-25 brightness-75 scale-105 transition-transform duration-10000 animate-pulse"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-mayukha-dark via-mayukha-dark/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-mayukha-gold/10 text-mayukha-gold border border-mayukha-gold/30 backdrop-blur-md">
            <Award className="w-3.5 h-3.5" />
            <span>Hyderabad’s Premier Dining & Hospitality Destination</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-mayukha-cream tracking-tight leading-tight">
            Authentic Flavors, <br className="hidden sm:inline" />
            <span className="gold-gradient-text">Immersive Theme Dining</span>
          </h1>

          <p className="text-base sm:text-xl text-mayukha-sand/90 max-w-3xl mx-auto font-light leading-relaxed">
            Welcome to <strong className="text-mayukha-cream font-medium">Hotel Mayukha</strong>. Relish world-famous Hyderabadi Dum Biryanis, sizzling clay-oven tandoori starters, and royal Mughlai delicacies set across our unique <strong className="text-mayukha-gold">Aqua Theme</strong> & <strong className="text-mayukha-gold">Jungle Theme</strong> dining spaces.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/menu"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-mayukha-gold to-mayukha-goldDark text-mayukha-dark font-bold text-base shadow-gold-glow hover:brightness-110 transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2"
            >
              <Utensils className="w-5 h-5" />
              Explore Digital Menu
            </Link>
            <Link
              href="/reserve"
              className="px-8 py-4 rounded-xl bg-mayukha-card text-mayukha-cream border border-mayukha-gold/40 font-semibold text-base hover:border-mayukha-gold transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2 glass-panel"
            >
              <Calendar className="w-5 h-5 text-mayukha-gold" />
              Reserve a Table
            </Link>
          </div>

          {/* Quick Stats Grid */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-xl glass-panel border border-mayukha-gold/15">
              <span className="block text-2xl font-serif font-bold text-mayukha-gold">2 Distinct</span>
              <span className="text-xs text-mayukha-sand">Aqua & Jungle Themes</span>
            </div>
            <div className="p-4 rounded-xl glass-panel border border-mayukha-gold/15">
              <span className="block text-2xl font-serif font-bold text-mayukha-gold">50 - 200</span>
              <span className="text-xs text-mayukha-sand">Banquet Guests Capacity</span>
            </div>
            <div className="p-4 rounded-xl glass-panel border border-mayukha-gold/15">
              <span className="block text-2xl font-serif font-bold text-mayukha-gold">100% Dum</span>
              <span className="text-xs text-mayukha-sand">Authentic Handi Biryani</span>
            </div>
            <div className="p-4 rounded-xl glass-panel border border-mayukha-gold/15">
              <span className="block text-2xl font-serif font-bold text-mayukha-gold">KPHB & Kokapet</span>
              <span className="text-xs text-mayukha-sand">Hyderabad Locations</span>
            </div>
          </div>
        </div>
      </section>

      {/* AMBIENCE & THEME EXPERIENCES */}
      <section className="py-20 px-4 bg-gradient-to-b from-mayukha-dark via-mayukha-surface to-mayukha-dark border-t border-b border-mayukha-border/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-mayukha-gold">Unique Dining Atmospheres</span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-mayukha-cream">Designed for Extraordinary Moments</h2>
            <p className="text-mayukha-sand text-sm sm:text-base">Whether seeking a serene underwater feel or a lush wilderness vibe, Hotel Mayukha brings signature themed environments to family dining.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Aqua Theme Card */}
            <div className="relative rounded-2xl overflow-hidden glass-panel border border-mayukha-gold/20 p-8 space-y-6 group gold-border-glow">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-900/40 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
                  <Waves className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-mayukha-cream">Aqua Theme Restaurant</h3>
                  <span className="text-xs text-cyan-300 font-medium">Calming Aquatic Ambience & Fine Dining</span>
                </div>
              </div>
              <p className="text-sm text-mayukha-sand leading-relaxed">
                Step into a serene marine atmosphere with soothing blue illumination and water features. Perfect for romantic dinners, family gatherings, and seafood lovers.
              </p>
              <ul className="space-y-2 text-xs text-mayukha-muted">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-mayukha-gold" /> Soothing ambient aquatic lighting</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-mayukha-gold" /> Special seafood & tandoori platters</li>
              </ul>
              <Link href="/reserve" className="inline-flex items-center text-xs font-bold text-mayukha-gold group-hover:translate-x-1 transition-transform">
                Reserve Aqua Seating <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* Jungle Theme Card */}
            <div className="relative rounded-2xl overflow-hidden glass-panel border border-mayukha-gold/20 p-8 space-y-6 group gold-border-glow">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-900/40 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <Trees className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-mayukha-cream">Jungle Theme Restaurant</h3>
                  <span className="text-xs text-emerald-300 font-medium">Exotic Greenery & Forest Vibe</span>
                </div>
              </div>
              <p className="text-sm text-mayukha-sand leading-relaxed">
                Immerse yourself in lush botanical surroundings with rainforest aesthetic elements. Loved by kids, families, and birthday party groups.
              </p>
              <ul className="space-y-2 text-xs text-mayukha-muted">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-mayukha-gold" /> Immersive jungle decor & ambient soundscapes</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-mayukha-gold" /> Kid-friendly seating & large family tables</li>
              </ul>
              <Link href="/reserve" className="inline-flex items-center text-xs font-bold text-mayukha-gold group-hover:translate-x-1 transition-transform">
                Reserve Jungle Seating <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CHEF'S SIGNATURE CULINARY SELECTION */}
      <section className="py-20 px-4 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-mayukha-gold">Culinary Mastery</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-mayukha-cream mt-1">Chef’s Special Recommendations</h2>
          </div>
          <Link href="/menu" className="text-sm font-semibold text-mayukha-gold hover:underline flex items-center gap-1">
            View Full Menu ({featuredDishes.length}+ items) <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDishes.slice(0, 4).map((dish) => (
            <div
              key={dish._id}
              className="bg-mayukha-surface rounded-xl overflow-hidden border border-mayukha-border/60 hover:border-mayukha-gold/50 transition duration-300 flex flex-col group"
            >
              <div className="relative h-48 w-full overflow-hidden bg-mayukha-card">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-mayukha-dark/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-mayukha-gold border border-mayukha-gold/30">
                  {dish.isVeg ? '🟢 Veg' : '🔴 Non-Veg'}
                </div>
                {dish.isChefSpecial && (
                  <div className="absolute top-3 right-3 bg-mayukha-gold text-mayukha-dark px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
                    <Flame className="w-3 h-3" /> Chef Special
                  </div>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif font-bold text-lg text-mayukha-cream line-clamp-1 group-hover:text-mayukha-gold transition">
                    {dish.name}
                  </h3>
                  <p className="text-xs text-mayukha-muted line-clamp-2 mt-1.5 leading-relaxed">
                    {dish.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-mayukha-border/40">
                  <span className="font-serif font-bold text-xl text-mayukha-gold">₹{dish.price}</span>
                  <Link
                    href="/reserve"
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-mayukha-card text-mayukha-cream hover:bg-mayukha-gold hover:text-mayukha-dark transition"
                  >
                    Order / Reserve
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BANQUET & CATERING CALLOUT BANNER */}
      <section className="py-16 px-4 bg-gradient-to-r from-mayukha-surface via-mayukha-card to-mayukha-surface border-t border-b border-mayukha-gold/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="inline-block px-3 py-1 rounded text-xs font-semibold bg-mayukha-gold/15 text-mayukha-gold uppercase tracking-wider">
              Grand Celebrations & Corporate Events
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-mayukha-cream">
              Host Your Next Event at Mayukha Banquet Halls
            </h2>
            <p className="text-mayukha-sand text-sm sm:text-base leading-relaxed">
              From corporate dinners and conferences to birthday bashes, wedding receptions, and outdoor catering services across Hyderabad (KPHB, Kokapet, Miyapur, Hitech City). Halls accommodating 50 to 200 guests with custom menu options.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
            <Link
              href="/banquets"
              className="w-full py-4 text-center rounded-xl bg-mayukha-gold text-mayukha-dark font-bold text-sm shadow-gold-glow hover:bg-mayukha-goldDark transition"
            >
              Request Banquet Quote
            </Link>
            <a
              href="tel:8977933805"
              className="w-full py-4 text-center rounded-xl bg-mayukha-surface text-mayukha-cream border border-mayukha-gold/30 font-semibold text-sm hover:border-mayukha-gold transition flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-mayukha-gold" /> Call Event Team: 89779 33805
            </a>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS & GOOGLE REVIEWS */}
      <section className="py-20 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-mayukha-gold">Guest Testimonials</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-mayukha-cream">Loved by Food Lovers in Hyderabad</h2>
          <p className="text-mayukha-sand text-sm">Read what verified diners say about our food quality, ambience, and hospitality.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t._id} className="p-6 rounded-2xl glass-panel border border-mayukha-border/60 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-mayukha-gold">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-mayukha-gold" />
                  ))}
                </div>
                <p className="text-sm text-mayukha-sand italic leading-relaxed">
                  "{t.reviewText}"
                </p>
              </div>
              <div className="pt-4 border-t border-mayukha-border/40 flex justify-between items-center text-xs">
                <div>
                  <strong className="block text-mayukha-cream font-semibold">{t.customerName}</strong>
                  <span className="text-mayukha-muted">{t.visitType} • {t.branch}</span>
                </div>
                <span className="text-[10px] bg-emerald-900/30 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                  Verified Review
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
