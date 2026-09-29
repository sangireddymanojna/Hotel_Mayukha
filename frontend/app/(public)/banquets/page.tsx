'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { submitBanquetEnquiry } from '@/lib/api';
import { BanquetEnquiry } from '@/types';
import { Users, Calendar, Phone, CheckCircle2, Award, Sparkles, Building, UtensilsCrossed, X } from 'lucide-react';

export default function BanquetsPage() {
  const [formData, setFormData] = useState({
    organizerName: '',
    phone: '',
    email: '',
    eventType: 'Corporate Dinner / Conference',
    guestCount: 50,
    eventDate: new Date().toISOString().split('T')[0],
    preferredLocation: 'KPHB Hall (Up to 200 guests)',
    budgetPerPlate: '₹600 - ₹900',
    customMenuRequirements: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [confirmedEnquiry, setConfirmedEnquiry] = useState<BanquetEnquiry | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.organizerName || !formData.phone || !formData.email) {
      setErrorMsg('Please fill in organizer contact details.');
      return;
    }

    setSubmitting(true);
    const res = await submitBanquetEnquiry(formData);
    setSubmitting(false);

    if (res.status === 'success' && res.data) {
      setConfirmedEnquiry(res.data);
    } else {
      setErrorMsg(res.message || 'Failed to submit banquet enquiry.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-mayukha-dark">
      <Header />

      {/* Header Banner */}
      <section className="py-14 px-4 bg-gradient-to-b from-mayukha-surface to-mayukha-dark border-b border-mayukha-border/40 text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-mayukha-gold">Corporate Events, Celebrations & Outdoor Catering</span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-mayukha-cream">Banquet Halls & Catering Enquiries</h1>
          <p className="text-mayukha-sand text-sm sm:text-base">
            From intimate gatherings of 20 to grand banquets of 200+ guests. Reserve state-of-the-art halls across KPHB & Kokapet or request full-service outdoor catering.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Form Container */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-mayukha-gold/20 space-y-6">
            <div className="border-b border-mayukha-border/60 pb-4">
              <h2 className="text-2xl font-serif font-bold text-mayukha-cream">Submit Event Inquiry</h2>
              <p className="text-xs text-mayukha-muted">Our dedicated event manager will contact you within 2 hours.</p>
            </div>

            {errorMsg && (
              <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-mayukha-sand mb-1.5">Event Type</label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-mayukha-dark border border-mayukha-border text-mayukha-cream text-sm focus:outline-none focus:border-mayukha-gold"
                  >
                    <option value="Corporate Dinner / Conference">Corporate Dinner / Conference</option>
                    <option value="Birthday Celebration">Birthday Celebration</option>
                    <option value="Wedding / Engagement Reception">Wedding / Engagement Reception</option>
                    <option value="Family Gathering / Get-together">Family Gathering / Get-together</option>
                    <option value="Outdoor Catering Request">Outdoor Catering Request (Client Venue)</option>
                    <option value="Other Event">Other Private Event</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-mayukha-sand mb-1.5">Preferred Location / Venue</label>
                  <select
                    value={formData.preferredLocation}
                    onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-mayukha-dark border border-mayukha-border text-mayukha-cream text-sm focus:outline-none focus:border-mayukha-gold"
                  >
                    <option value="KPHB Hall (Up to 200 guests)">KPHB Hall (Accommodates 50-200 guests)</option>
                    <option value="Kokapet Banquet Center">Kokapet Banquet Center</option>
                    <option value="Miyapur Banquet Hall">Miyapur Banquet Hall</option>
                    <option value="Nanakramguda Hall">Nanakramguda Hall</option>
                    <option value="Outdoor Catering (Client Location)">Outdoor Catering (Client Location)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-mayukha-sand mb-1.5">Expected Guest Count</label>
                  <input
                    type="number"
                    min={20}
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: parseInt(e.target.value) || 20 })}
                    className="w-full px-4 py-3 rounded-xl bg-mayukha-dark border border-mayukha-border text-mayukha-cream text-sm focus:outline-none focus:border-mayukha-gold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-mayukha-sand mb-1.5">Target Event Date</label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-mayukha-dark border border-mayukha-border text-mayukha-cream text-sm focus:outline-none focus:border-mayukha-gold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-mayukha-sand mb-1.5">Budget Per Plate</label>
                  <select
                    value={formData.budgetPerPlate}
                    onChange={(e) => setFormData({ ...formData, budgetPerPlate: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-mayukha-dark border border-mayukha-border text-mayukha-cream text-sm focus:outline-none focus:border-mayukha-gold"
                  >
                    <option value="₹500 - ₹700">₹500 - ₹700 per plate</option>
                    <option value="₹700 - ₹1000">₹700 - ₹1000 per plate</option>
                    <option value="₹1000+ (Premium Royal Menu)">₹1000+ (Premium Royal Menu)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4 pt-2 border-t border-mayukha-border/40">
                <h3 className="text-sm font-semibold text-mayukha-cream">Organizer Contact Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Organizer / Company Name *"
                    value={formData.organizerName}
                    onChange={(e) => setFormData({ ...formData, organizerName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-mayukha-dark border border-mayukha-border text-mayukha-cream text-sm focus:outline-none focus:border-mayukha-gold"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Contact Phone Number *"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-mayukha-dark border border-mayukha-border text-mayukha-cream text-sm focus:outline-none focus:border-mayukha-gold"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email Address *"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-mayukha-dark border border-mayukha-border text-mayukha-cream text-sm focus:outline-none focus:border-mayukha-gold"
                    required
                  />
                </div>

                <textarea
                  rows={4}
                  placeholder="Custom menu requirements, seating layout preference, live counters, audio/visual setup..."
                  value={formData.customMenuRequirements}
                  onChange={(e) => setFormData({ ...formData, customMenuRequirements: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-mayukha-dark border border-mayukha-border text-mayukha-cream text-sm focus:outline-none focus:border-mayukha-gold"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-mayukha-gold to-mayukha-goldDark text-mayukha-dark font-bold text-base shadow-gold-glow hover:brightness-110 transition duration-300 disabled:opacity-50"
              >
                {submitting ? 'Submitting Enquiry...' : 'Submit Banquet & Event Enquiry'}
              </button>
            </form>
          </div>
        </div>

        {/* Right Info Cards */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-mayukha-gold/20 space-y-4">
            <h3 className="text-xl font-serif font-bold text-mayukha-cream flex items-center gap-2">
              <Building className="w-5 h-5 text-mayukha-gold" /> Venue Highlights
            </h3>
            <ul className="space-y-3 text-xs text-mayukha-sand">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-mayukha-gold shrink-0 mt-0.5" />
                <span>2 Dedicated Halls (50 Guests & 200 Guests Capacity)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-mayukha-gold shrink-0 mt-0.5" />
                <span>Customizable Dum Biryani & Tandoori live counter menus</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-mayukha-gold shrink-0 mt-0.5" />
                <span>Centralized AC, stage lighting & audio equipment</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-mayukha-gold shrink-0 mt-0.5" />
                <span>Ample valet parking & dedicated service staff</span>
              </li>
            </ul>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-mayukha-border space-y-3 text-xs text-mayukha-sand">
            <h4 className="font-bold text-mayukha-cream flex items-center gap-2">
              <Phone className="w-4 h-4 text-mayukha-gold" /> Direct Event Hotline
            </h4>
            <p className="text-mayukha-muted">Speak directly with our banquet manager:</p>
            <div className="font-bold text-base text-mayukha-gold">
              📞 89779 33805 / 8008222931
            </div>
            <p className="text-mayukha-muted text-[11px]">Email: hotelmayukha@gmail.com</p>
          </div>
        </div>

      </main>

      {/* Confirmation Modal */}
      {confirmedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-mayukha-dark/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-mayukha-surface border border-mayukha-gold/40 rounded-2xl max-w-md w-full p-6 space-y-6 shadow-deep text-center relative">
            <button
              onClick={() => setConfirmedEnquiry(null)}
              className="absolute top-4 right-4 text-mayukha-muted hover:text-mayukha-cream"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-full bg-mayukha-gold/20 text-mayukha-gold flex items-center justify-center mx-auto border border-mayukha-gold/40">
              <Sparkles className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-mayukha-gold">Enquiry Received</span>
              <h3 className="text-2xl font-serif font-bold text-mayukha-cream">Banquet Request Logged!</h3>
              <p className="text-xs text-mayukha-sand">
                Your event enquiry reference code has been generated.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-mayukha-dark border border-mayukha-gold/40 space-y-2 text-left text-xs">
              <div className="flex justify-between items-center border-b border-mayukha-border/60 pb-2">
                <span className="text-mayukha-muted">Enquiry ID:</span>
                <span className="font-bold text-mayukha-gold text-base">{confirmedEnquiry.enquiryId}</span>
              </div>
              <p><strong>Organizer:</strong> {confirmedEnquiry.organizerName}</p>
              <p><strong>Event:</strong> {confirmedEnquiry.eventType}</p>
              <p><strong>Date & Guests:</strong> {confirmedEnquiry.eventDate} ({confirmedEnquiry.guestCount} Guests)</p>
              <p><strong>Location:</strong> {confirmedEnquiry.preferredLocation}</p>
            </div>

            <button
              onClick={() => setConfirmedEnquiry(null)}
              className="w-full py-3 rounded-xl bg-mayukha-gold text-mayukha-dark font-bold text-sm shadow-gold-glow"
            >
              Done & Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
