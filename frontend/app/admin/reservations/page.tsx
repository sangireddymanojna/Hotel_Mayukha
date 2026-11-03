'use client';

import { useState, useEffect } from 'react';
import AdminNav from '@/components/layout/AdminNav';
import { Reservation } from '@/types';
import { Calendar, Search, Filter, CheckCircle, Clock, XCircle, UserCheck, Phone, Mail, Edit, ShieldAlert } from 'lucide-react';

const INITIAL_RESERVATIONS: Reservation[] = [
  {
    _id: 'r-1',
    bookingId: 'MYK-RES-2026-1001',
    customerName: 'Suresh Chandra',
    phone: '9849012345',
    email: 'suresh.chandra@example.com',
    guestCount: 4,
    date: '2026-10-02',
    timeSlot: '08:00 PM',
    branch: 'KPHB Main Branch',
    seatingPreference: 'Aqua Theme Section',
    status: 'Confirmed',
    specialRequests: 'High chair for toddler, anniversary cake.'
  },
  {
    _id: 'r-2',
    bookingId: 'MYK-RES-2026-1002',
    customerName: 'Priya Sharma',
    phone: '9123456780',
    email: 'priya.s@example.com',
    guestCount: 6,
    date: '2026-10-02',
    timeSlot: '08:30 PM',
    branch: 'KPHB Main Branch',
    seatingPreference: 'Jungle Theme Section',
    status: 'Pending',
    specialRequests: 'Quiet corner table for corporate dinner.'
  },
  {
    _id: 'r-3',
    bookingId: 'MYK-RES-2026-1003',
    customerName: 'Rajesh Naidu',
    phone: '9888877777',
    email: 'rajesh.n@example.com',
    guestCount: 2,
    date: '2026-10-03',
    timeSlot: '07:30 PM',
    branch: 'Kokapet Branch',
    seatingPreference: 'Private Dining Room',
    status: 'Pending',
    specialRequests: 'Candlelight setup request.'
  }
];

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>(INITIAL_RESERVATIONS);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const updateStatus = (id: string, newStatus: Reservation['status']) => {
    setReservations(prev =>
      prev.map(item => item._id === id || item.bookingId === id ? { ...item, status: newStatus } : item)
    );
  };

  const filtered = reservations.filter(res => {
    if (filterStatus !== 'All' && res.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = res.customerName.toLowerCase().includes(q);
      const matchPhone = res.phone.includes(q);
      const matchCode = res.bookingId.toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchCode) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-transparent flex flex-col relative z-10">
      <AdminNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-mayukha-cream">Table Reservation Manager</h1>
            <p className="text-xs text-mayukha-sand">Manage customer bookings, seating assignments, and status confirmations.</p>
          </div>
          <div className="text-xs text-mayukha-gold bg-mayukha-gold/10 px-3 py-1.5 rounded-lg border border-mayukha-gold/30">
            Total Bookings: <strong className="text-mayukha-cream">{reservations.length}</strong>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="glass-panel p-4 rounded-2xl border border-mayukha-gold/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Status Tabs */}
          <div className="flex flex-wrap gap-2">
            {['All', 'Pending', 'Confirmed', 'Seated', 'Completed', 'Cancelled'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                  filterStatus === status
                    ? 'bg-mayukha-gold text-mayukha-dark shadow-gold-glow'
                    : 'bg-mayukha-card text-mayukha-sand hover:text-mayukha-cream'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mayukha-muted" />
            <input
              type="text"
              placeholder="Search by name, phone, code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-mayukha-dark border border-mayukha-border text-mayukha-cream text-xs focus:outline-none focus:border-mayukha-gold"
            />
          </div>

        </div>

        {/* Reservations Table */}
        <div className="glass-panel rounded-2xl border border-mayukha-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-mayukha-card/80 text-mayukha-sand font-semibold uppercase tracking-wider border-b border-mayukha-border/60">
                <tr>
                  <th className="py-3.5 px-4">Ref Code</th>
                  <th className="py-3.5 px-4">Customer Details</th>
                  <th className="py-3.5 px-4">Date & Time</th>
                  <th className="py-3.5 px-4">Party Size</th>
                  <th className="py-3.5 px-4">Seating Theme</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-mayukha-border/40 text-mayukha-cream">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-mayukha-muted">
                      No table reservations found matching the selected filter.
                    </td>
                  </tr>
                ) : (
                  filtered.map((res) => (
                    <tr key={res._id || res.bookingId} className="hover:bg-mayukha-card/50 transition">
                      <td className="py-4 px-4 font-bold text-mayukha-gold font-mono">
                        {res.bookingId}
                      </td>

                      <td className="py-4 px-4 space-y-1">
                        <strong className="block text-mayukha-cream text-sm">{res.customerName}</strong>
                        <span className="text-mayukha-muted flex items-center gap-1">
                          <Phone className="w-3 h-3 text-mayukha-gold" /> {res.phone}
                        </span>
                        <span className="text-mayukha-muted flex items-center gap-1">
                          <Mail className="w-3 h-3 text-mayukha-gold" /> {res.email}
                        </span>
                      </td>

                      <td className="py-4 px-4 space-y-0.5">
                        <span className="block font-semibold text-mayukha-cream">{res.date}</span>
                        <span className="text-mayukha-gold font-medium">{res.timeSlot}</span>
                      </td>

                      <td className="py-4 px-4 font-semibold text-sm">
                        👥 {res.guestCount} Guests
                      </td>

                      <td className="py-4 px-4">
                        <span className="bg-mayukha-card px-2.5 py-1 rounded border border-mayukha-border text-mayukha-sand font-medium">
                          {res.seatingPreference}
                        </span>
                        {res.specialRequests && (
                          <span className="block text-[10px] text-amber-300 mt-1 italic line-clamp-1">
                            Note: {res.specialRequests}
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-4">
                        <span className={`inline-block px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                          res.status === 'Confirmed' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' :
                          res.status === 'Pending' ? 'bg-amber-950 text-amber-400 border border-amber-500/30' :
                          res.status === 'Seated' ? 'bg-blue-950 text-cyan-300 border border-cyan-500/30' :
                          res.status === 'Completed' ? 'bg-purple-950 text-purple-300 border border-purple-500/30' :
                          'bg-red-950 text-red-400 border border-red-500/30'
                        }`}>
                          {res.status}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-right space-x-1 whitespace-nowrap">
                        {res.status === 'Pending' && (
                          <button
                            onClick={() => updateStatus(res._id || res.bookingId, 'Confirmed')}
                            className="px-2.5 py-1 rounded bg-emerald-700 text-white font-semibold text-[11px] hover:bg-emerald-600 transition"
                          >
                            Confirm
                          </button>
                        )}
                        {res.status === 'Confirmed' && (
                          <button
                            onClick={() => updateStatus(res._id || res.bookingId, 'Seated')}
                            className="px-2.5 py-1 rounded bg-cyan-700 text-white font-semibold text-[11px] hover:bg-cyan-600 transition"
                          >
                            Seat Guest
                          </button>
                        )}
                        {(res.status === 'Seated' || res.status === 'Confirmed') && (
                          <button
                            onClick={() => updateStatus(res._id || res.bookingId, 'Completed')}
                            className="px-2.5 py-1 rounded bg-purple-700 text-white font-semibold text-[11px] hover:bg-purple-600 transition"
                          >
                            Complete
                          </button>
                        )}
                        {res.status !== 'Cancelled' && res.status !== 'Completed' && (
                          <button
                            onClick={() => updateStatus(res._id || res.bookingId, 'Cancelled')}
                            className="px-2.5 py-1 rounded bg-red-900/60 text-red-300 font-semibold text-[11px] hover:bg-red-800 transition"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}
