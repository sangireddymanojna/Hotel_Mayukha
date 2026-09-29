'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { submitReservation, trackBooking } from '@/lib/api';
import { Reservation } from '@/types';
import { Calendar, Clock, Users, MapPin, Sparkles, CheckCircle2, Search, X, ShieldCheck } from 'lucide-react';

export default function ReservePage() {
  // Booking Form State
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    guestCount: 2,
    date: new Date().toISOString().split('T')[0],
    timeSlot: '08:00 PM',
    branch: 'KPHB Main Branch' as const,
    seatingPreference: 'Aqua Theme Section' as const,
    specialRequests: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Reservation | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Lookup / Track State
  const [trackInput, setTrackInput] = useState('');
  const [trackedBooking, setTrackedBooking] = useState<Reservation | null>(null);
  const [trackLoading, setTrackLoading] = useState(false);
  const [trackError, setTrackError] = useState('');

  const timeSlots = [
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
    '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM', '10:00 PM'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!formData.customerName || !formData.phone || !formData.email) {
      setErrorMessage('Please fill in all required contact details.');
      return;
    }

    setSubmitting(true);
    const response = await submitReservation(formData);
    setSubmitting(false);

    if (response.status === 'success' && response.data) {
      setConfirmedBooking(response.data);
    } else {
      setErrorMessage(response.message || 'Failed to confirm table booking. Please try again.');
    }
  };

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setTrackError('');
    setTrackedBooking(null);

    if (!trackInput.trim()) {
      setTrackError('Please enter a reference code (e.g. MYK-RES-2026-1001)');
      return;
    }

    setTrackLoading(true);
    const res = await trackBooking(trackInput.trim());
    setTrackLoading(false);

    if (res.status === 'success' && res.data) {
      setTrackedBooking(res.data);
    } else {
      setTrackError(res.message || 'Booking reference code not found.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-mayukha-dark">
      <Header />

      {/* Header Banner */}
      <section className="py-12 px-4 bg-gradient-to-b from-mayukha-surface to-mayukha-dark border-b border-mayukha-border/40 text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-mayukha-gold">Instant Table Booking</span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-mayukha-cream">Table Reservation Engine</h1>
          <p className="text-mayukha-sand text-sm sm:text-base">
            Reserve your dining table at Hotel Mayukha KPHB or Kokapet. Choose your preferred seating section (Aqua Theme, Jungle Theme, or Family Hall).
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Reservation Form */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-mayukha-gold/20 space-y-6">
            <div className="border-b border-mayukha-border/60 pb-4">
              <h2 className="text-2xl font-serif font-bold text-mayukha-cream">Book Your Table</h2>
              <p className="text-xs text-mayukha-muted">Instant confirmation code issued upon submission.</p>
            </div>

            {errorMessage && (
              <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Branch & Seating Theme Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-mayukha-sand mb-1.5">Select Branch</label>
                  <select
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value as any })}
                    className="w-full px-4 py-3 rounded-xl bg-mayukha-dark border border-mayukha-border text-mayukha-cream text-sm focus:outline-none focus:border-mayukha-gold"
                  >
                    <option value="KPHB Main Branch">KPHB Main Branch (Near Forum Mall)</option>
                    <option value="Kokapet Branch">Kokapet Branch (Financial District)</option>
                    <option value="Miyapur Branch">Miyapur Branch</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-mayukha-gold mb-1.5">Seating Ambience Theme</label>
                  <select
                    value={formData.seatingPreference}
                    onChange={(e) => setFormData({ ...formData, seatingPreference: e.target.value as any })}
                    className="w-full px-4 py-3 rounded-xl bg-mayukha-dark border border-mayukha-gold/40 text-mayukha-gold font-semibold text-sm focus:outline-none focus:border-mayukha-gold"
                  >
                    <option value="Aqua Theme Section">🌊 Aqua Theme Section</option>
                    <option value="Jungle Theme Section">🌿 Jungle Theme Section</option>
                    <option value="Standard">🍽️ Standard Dining</option>
                    <option value="Family Dining Hall">👨‍👩‍👧‍👦 Family Dining Hall</option>
                    <option value="Private Dining Room">👑 Private Dining Room</option>
                  </select>
                </div>
              </div>

              {/* Guest Count & Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-mayukha-sand mb-1.5">Number of Guests</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mayukha-muted" />
                    <input
                      type="number"
                      min={1}
                      max={30}
                      value={formData.guestCount}
                      onChange={(e) => setFormData({ ...formData, guestCount: parseInt(e.target.value) || 1 })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-mayukha-dark border border-mayukha-border text-mayukha-cream text-sm focus:outline-none focus:border-mayukha-gold"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-mayukha-sand mb-1.5">Reservation Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mayukha-muted" />
                    <input
                      type="date"
                      value={formData.date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-mayukha-dark border border-mayukha-border text-mayukha-cream text-sm focus:outline-none focus:border-mayukha-gold"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-mayukha-sand mb-1.5">Time Slot</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mayukha-muted" />
                    <select
                      value={formData.timeSlot}
                      onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-mayukha-dark border border-mayukha-border text-mayukha-cream text-sm focus:outline-none focus:border-mayukha-gold"
                    >
                      {timeSlots.map(slot => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="space-y-4 pt-2 border-t border-mayukha-border/40">
                <h3 className="text-sm font-semibold text-mayukha-cream">Contact Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Full Name *"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-mayukha-dark border border-mayukha-border text-mayukha-cream text-sm focus:outline-none focus:border-mayukha-gold"
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      placeholder="Mobile Phone Number *"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-mayukha-dark border border-mayukha-border text-mayukha-cream text-sm focus:outline-none focus:border-mayukha-gold"
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-mayukha-dark border border-mayukha-border text-mayukha-cream text-sm focus:outline-none focus:border-mayukha-gold"
                      required
                    />
                  </div>
                </div>

                <div>
                  <textarea
                    rows={3}
                    placeholder="Special requests (e.g. High chair for infant, birthday celebration cake, window seating preference)..."
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-mayukha-dark border border-mayukha-border text-mayukha-cream text-sm focus:outline-none focus:border-mayukha-gold"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-mayukha-gold to-mayukha-goldDark text-mayukha-dark font-bold text-base shadow-gold-glow hover:brightness-110 transition duration-300 disabled:opacity-50"
              >
                {submitting ? 'Processing Table Reservation...' : 'Confirm Table Booking Now'}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Reservation Status Tracker Tool */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-mayukha-gold/20 space-y-4">
            <h3 className="text-xl font-serif font-bold text-mayukha-cream flex items-center gap-2">
              <Search className="w-5 h-5 text-mayukha-gold" /> Track Booking Status
            </h3>
            <p className="text-xs text-mayukha-sand leading-relaxed">
              Already have a reservation reference code? Enter your code below to check current confirmation status.
            </p>

            <form onSubmit={handleTrack} className="space-y-3">
              <input
                type="text"
                placeholder="Reference Code (e.g. MYK-RES-2026-1001)"
                value={trackInput}
                onChange={(e) => setTrackInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-mayukha-dark border border-mayukha-border text-mayukha-cream text-xs focus:outline-none focus:border-mayukha-gold uppercase"
              />
              <button
                type="submit"
                disabled={trackLoading}
                className="w-full py-2.5 rounded-xl bg-mayukha-card border border-mayukha-gold/40 text-mayukha-gold font-semibold text-xs hover:bg-mayukha-gold hover:text-mayukha-dark transition"
              >
                {trackLoading ? 'Searching...' : 'Lookup Booking Status'}
              </button>
            </form>

            {trackError && (
              <p className="text-xs text-red-400 pt-1">{trackError}</p>
            )}

            {trackedBooking && (
              <div className="p-4 rounded-xl bg-mayukha-dark border border-mayukha-gold/30 text-xs space-y-2 mt-3 animate-in fade-in">
                <div className="flex justify-between items-center border-b border-mayukha-border/60 pb-2">
                  <span className="font-bold text-mayukha-gold">{trackedBooking.bookingId}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    trackedBooking.status === 'Confirmed' ? 'bg-emerald-950 text-emerald-400 border border-emerald-600/30' : 'bg-amber-950 text-amber-400 border border-amber-600/30'
                  }`}>
                    {trackedBooking.status}
                  </span>
                </div>
                <p><strong>Guest:</strong> {trackedBooking.customerName} ({trackedBooking.guestCount} Guests)</p>
                <p><strong>Date & Time:</strong> {trackedBooking.date} at {trackedBooking.timeSlot}</p>
                <p><strong>Seating:</strong> {trackedBooking.seatingPreference}</p>
              </div>
            )}
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-mayukha-border space-y-3 text-xs text-mayukha-sand">
            <h4 className="font-bold text-mayukha-cream flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-mayukha-gold" /> Reservation Policy
            </h4>
            <ul className="space-y-2 list-disc list-inside text-mayukha-muted">
              <li>Tables are held for up to 15 minutes past reservation time slot.</li>
              <li>For parties exceeding 30 guests, please submit a Banquet Enquiry.</li>
              <li>Instant confirmation sent to your registered phone number & email.</li>
            </ul>
          </div>
        </div>
      </main>

      {/* Booking Confirmation Modal */}
      {confirmedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-mayukha-dark/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-mayukha-surface border border-mayukha-gold/40 rounded-2xl max-w-md w-full p-6 space-y-6 shadow-deep text-center relative">
            <button
              onClick={() => setConfirmedBooking(null)}
              className="absolute top-4 right-4 text-mayukha-muted hover:text-mayukha-cream"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-full bg-mayukha-gold/20 text-mayukha-gold flex items-center justify-center mx-auto border border-mayukha-gold/40">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-mayukha-gold">Booking Submitted Successfully</span>
              <h3 className="text-2xl font-serif font-bold text-mayukha-cream">Table Reserved!</h3>
              <p className="text-xs text-mayukha-sand">
                Your reservation reference code has been generated.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-mayukha-dark border border-mayukha-gold/40 space-y-2 text-left text-xs">
              <div className="flex justify-between items-center border-b border-mayukha-border/60 pb-2">
                <span className="text-mayukha-muted">Booking Reference:</span>
                <span className="font-bold text-mayukha-gold text-base">{confirmedBooking.bookingId}</span>
              </div>
              <p><strong>Name:</strong> {confirmedBooking.customerName}</p>
              <p><strong>Date & Time:</strong> {confirmedBooking.date} ({confirmedBooking.timeSlot})</p>
              <p><strong>Guest Count:</strong> {confirmedBooking.guestCount} Guests</p>
              <p><strong>Seating Theme:</strong> {confirmedBooking.seatingPreference}</p>
            </div>

            <button
              onClick={() => setConfirmedBooking(null)}
              className="w-full py-3 rounded-xl bg-mayukha-gold text-mayukha-dark font-bold text-sm shadow-gold-glow"
            >
              Done & Return to Site
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
