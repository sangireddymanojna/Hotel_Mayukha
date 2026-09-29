'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [msgSent, setMsgSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMsgSent(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-mayukha-dark">
      <Header />

      <section className="py-12 px-4 bg-gradient-to-b from-mayukha-surface to-mayukha-dark border-b border-mayukha-border/40 text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-mayukha-gold">Hyderabad Branches & Directions</span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-mayukha-cream">Locations & Contact Channels</h1>
          <p className="text-mayukha-sand text-sm sm:text-base">
            Visit our signature dining restaurants or connect with our hospitality team.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-1 space-y-12">
        
        {/* Multi-Branch Locations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Branch 1: KPHB Main Branch */}
          <div className="glass-panel p-6 rounded-2xl border border-mayukha-gold/20 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-mayukha-gold bg-mayukha-gold/10 px-3 py-1 rounded border border-mayukha-gold/30">
                  Main Dining & Theme Restaurant
                </span>
                <span className="text-xs text-emerald-400 font-semibold">Open Now (11:30 AM - 11 PM)</span>
              </div>
              <h2 className="text-2xl font-serif font-bold text-mayukha-cream">KPHB Main Branch</h2>
              <p className="text-sm text-mayukha-sand leading-relaxed">
                Near Forum Mall (Nexus Mall), Kukatpally Housing Board Colony, Phase 1 to 9th Phase, Gokul Plots, JNTU, Hyderabad, Telangana 500072
              </p>
              
              <div className="space-y-2 text-xs text-mayukha-muted pt-2 border-t border-mayukha-border/40">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-mayukha-gold" />
                  <strong className="text-mayukha-cream">Call:</strong> 89779 33805 / 8008222931
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-mayukha-gold" />
                  <strong className="text-mayukha-cream">Email:</strong> hotelmayukha@gmail.com
                </p>
              </div>
            </div>

            {/* Google Maps Embed iframe */}
            <div className="h-64 w-full rounded-xl overflow-hidden border border-mayukha-border/60 mt-4">
              <iframe
                title="Hotel Mayukha KPHB Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.295287654321!2d78.38888!3d17.48888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91c5c0000001%3A0x123456789abcdef!2sKukatpally%20Housing%20Board%20Colony%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
              />
            </div>
          </div>

          {/* Branch 2: Kokapet Branch */}
          <div className="glass-panel p-6 rounded-2xl border border-mayukha-gold/20 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-mayukha-gold bg-mayukha-gold/10 px-3 py-1 rounded border border-mayukha-gold/30">
                  Banquets & Fine Dining
                </span>
                <span className="text-xs text-emerald-400 font-semibold">Open Now (11:30 AM - 11 PM)</span>
              </div>
              <h2 className="text-2xl font-serif font-bold text-mayukha-cream">Kokapet Banquet Center</h2>
              <p className="text-sm text-mayukha-sand leading-relaxed">
                Main Road, Kokapet Financial District locality, Near Gandipet & Narsingi, Hyderabad, Telangana
              </p>
              
              <div className="space-y-2 text-xs text-mayukha-muted pt-2 border-t border-mayukha-border/40">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-mayukha-gold" />
                  <strong className="text-mayukha-cream">Call:</strong> 89779 33805 / 8008222931
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-mayukha-gold" />
                  <strong className="text-mayukha-cream">Email:</strong> hotelmayukha@gmail.com
                </p>
              </div>
            </div>

            {/* Google Maps Embed iframe */}
            <div className="h-64 w-full rounded-xl overflow-hidden border border-mayukha-border/60 mt-4">
              <iframe
                title="Hotel Mayukha Kokapet Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.999999999999!2d78.33000!3d17.40000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb960000000000%3A0x987654321abcdef!2sKokapet%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
              />
            </div>
          </div>

        </div>

        {/* Message Inquiry Form Section */}
        <div className="glass-panel p-8 rounded-2xl border border-mayukha-gold/20 max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-1">
            <h3 className="text-2xl font-serif font-bold text-mayukha-cream">Send Us a Direct Message</h3>
            <p className="text-xs text-mayukha-sand">For general feedback, table queries, or custom dining arrangements.</p>
          </div>

          {msgSent ? (
            <div className="p-6 rounded-xl bg-mayukha-gold/15 border border-mayukha-gold/40 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-mayukha-gold mx-auto" />
              <h4 className="font-bold text-mayukha-cream text-lg">Message Delivered!</h4>
              <p className="text-xs text-mayukha-sand">Thank you for contacting Hotel Mayukha. We will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-mayukha-dark border border-mayukha-border text-mayukha-cream text-xs focus:outline-none focus:border-mayukha-gold"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-mayukha-dark border border-mayukha-border text-mayukha-cream text-xs focus:outline-none focus:border-mayukha-gold"
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-mayukha-dark border border-mayukha-border text-mayukha-cream text-xs focus:outline-none focus:border-mayukha-gold"
                  required
                />
              </div>

              <textarea
                rows={4}
                placeholder="How can we help you?"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-mayukha-dark border border-mayukha-border text-mayukha-cream text-xs focus:outline-none focus:border-mayukha-gold"
                required
              />

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-mayukha-gold text-mayukha-dark font-bold text-sm shadow-gold-glow flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          )}
        </div>

      </main>

      <Footer />
    </div>
  );
}
