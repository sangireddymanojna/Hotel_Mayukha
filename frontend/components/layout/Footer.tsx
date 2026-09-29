import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Award, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-mayukha-dark border-t border-mayukha-gold/20 text-mayukha-sand pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Col 1: Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-mayukha-gold flex items-center justify-center text-mayukha-dark font-serif font-bold text-lg">
              M
            </div>
            <span className="font-serif font-bold text-xl text-mayukha-cream">HOTEL MAYUKHA</span>
          </div>
          <p className="text-sm text-mayukha-muted leading-relaxed">
            Hyderabad’s premier dining destination. Renowned for authentic Hyderabadi Dum Biryani, Aqua & Jungle theme dining ambience, deluxe hotel rooms, and luxury banquet halls.
          </p>
          <div className="flex items-center gap-2 text-xs text-mayukha-gold bg-mayukha-gold/10 p-2.5 rounded-lg border border-mayukha-gold/20">
            <Award className="w-4 h-4 shrink-0" />
            <span>Top Rated Restaurant in Forum Mall / KPHB Locality</span>
          </div>
        </div>

        {/* Col 2: Hyderabad Branches & Address */}
        <div className="space-y-3">
          <h3 className="font-serif font-semibold text-lg text-mayukha-cream border-b border-mayukha-border/60 pb-2">
            Branch Locations
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-mayukha-gold shrink-0 mt-1" />
              <div>
                <strong className="block text-mayukha-cream font-medium">KPHB Main Branch</strong>
                <span className="text-mayukha-muted text-xs">
                  Near Forum Mall (Nexus Mall), KPHB Phase 1 to 9th Phase, Kukatpally, JNTU, Hyderabad, Telangana 500072
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-mayukha-gold shrink-0 mt-1" />
              <div>
                <strong className="block text-mayukha-cream font-medium">Kokapet Banquet Center</strong>
                <span className="text-mayukha-muted text-xs">
                  Financial District / Kokapet Main Road, Hyderabad, Telangana
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Col 3: Contact & Timings */}
        <div className="space-y-3">
          <h3 className="font-serif font-semibold text-lg text-mayukha-cream border-b border-mayukha-border/60 pb-2">
            Opening Hours & Contact
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-mayukha-gold shrink-0" />
              <span>Mon - Sun: 11:30 AM – 11:00 PM</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-mayukha-gold shrink-0" />
              <a href="tel:8977933805" className="hover:text-mayukha-gold transition">89779 33805</a> / <a href="tel:8008222931" className="hover:text-mayukha-gold transition">8008222931</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-mayukha-gold shrink-0" />
              <a href="mailto:hotelmayukha@gmail.com" className="hover:text-mayukha-gold transition">hotelmayukha@gmail.com</a>
            </li>
          </ul>
          <div className="pt-1">
            <span className="text-xs text-mayukha-muted">Available on Swiggy & Zomato for online food delivery.</span>
          </div>
        </div>

        {/* Col 4: Quick Links & Catering Coverage */}
        <div className="space-y-3">
          <h3 className="font-serif font-semibold text-lg text-mayukha-cream border-b border-mayukha-border/60 pb-2">
            Outdoor Catering Services
          </h3>
          <p className="text-xs text-mayukha-muted leading-relaxed">
            We provide full-service outdoor catering across:
          </p>
          <div className="flex flex-wrap gap-1.5 text-xs text-mayukha-sand">
            {['KPHB', 'Kokapet', 'Miyapur', 'Bachupally', 'Nizampet', 'Manikonda', 'Hitech City', 'Gachibowli'].map(loc => (
              <span key={loc} className="bg-mayukha-surface px-2 py-1 rounded border border-mayukha-border/60">
                {loc}
              </span>
            ))}
          </div>
          <div className="pt-2">
            <Link href="/banquets" className="inline-block text-xs font-semibold text-mayukha-gold hover:underline">
              Request Catering Quote →
            </Link>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-mayukha-border/40 flex flex-col sm:flex-row justify-between items-center text-xs text-mayukha-muted gap-4">
        <div>
          © {new Date().getFullYear()} Hotel Mayukha. All Rights Reserved. Client Domain: Restaurant & Hospitality, Hyderabad.
        </div>
        <div className="flex items-center space-x-4">
          <span>Architected by <strong className="text-mayukha-sand">Manojna Sangireddy</strong></span>
          <span>•</span>
          <Link href="/admin" className="hover:text-mayukha-gold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Staff Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
