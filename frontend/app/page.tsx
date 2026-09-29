import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-mayukha-dark via-[#1A1A1A] to-mayukha-dark">
      <div className="max-w-4xl space-y-8 glass-panel p-10 rounded-2xl border border-mayukha-gold/20 shadow-deep">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-mayukha-gold/10 text-mayukha-gold border border-mayukha-gold/30">
          Premier Dining & Hospitality • Hyderabad
        </span>

        <h1 className="text-4xl md:text-6xl font-serif font-bold text-mayukha-cream tracking-tight">
          Welcome to <span className="gold-gradient-text">Hotel Mayukha</span>
        </h1>

        <p className="text-lg md:text-xl text-mayukha-sand/90 max-w-2xl mx-auto leading-relaxed">
          Indulge in authentic Hyderabadi biryanis, signature tandoori delights, and multi-cuisine culinary mastery set across our iconic Aqua & Jungle themed dining spaces and grand banquet halls.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/menu"
            className="px-8 py-3.5 rounded-xl bg-mayukha-gold text-mayukha-dark font-semibold shadow-gold-glow hover:bg-mayukha-goldDark transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Explore Digital Menu
          </Link>
          <Link
            href="/reserve"
            className="px-8 py-3.5 rounded-xl bg-mayukha-card text-mayukha-cream border border-mayukha-gold/40 font-semibold hover:border-mayukha-gold transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Reserve a Table
          </Link>
          <Link
            href="/banquets"
            className="px-8 py-3.5 rounded-xl bg-mayukha-surface text-mayukha-sand border border-mayukha-border font-semibold hover:text-mayukha-gold transition-all duration-300"
          >
            Banquet Enquiries
          </Link>
        </div>

        <div className="pt-8 border-t border-mayukha-border/60 flex flex-wrap justify-around text-xs text-mayukha-muted gap-4">
          <div>📍 KPHB Phase 1 & Kokapet, Hyderabad</div>
          <div>📞 89779 33805 | 8008222931</div>
          <div>✉️ hotelmayukha@gmail.com</div>
        </div>
      </div>
    </main>
  );
}
