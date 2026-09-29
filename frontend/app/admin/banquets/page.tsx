'use client';

import { useState } from 'react';
import AdminNav from '@/components/layout/AdminNav';
import { BanquetEnquiry } from '@/types';
import { Users, Search, Phone, Mail, Building, Calendar, DollarSign, FileText } from 'lucide-react';

const INITIAL_BANQUETS: BanquetEnquiry[] = [
  {
    _id: 'b-1',
    enquiryId: 'MYK-BNQ-2026-2001',
    organizerName: 'Ramesh Naidu (TechCorp)',
    phone: '9123456789',
    email: 'events@techcorp.in',
    eventType: 'Corporate Dinner / Conference',
    guestCount: 75,
    eventDate: '2026-10-15',
    preferredLocation: 'KPHB Hall (Up to 200 guests)',
    budgetPerPlate: '₹700 - ₹900',
    customMenuRequirements: 'Need 3 Non-Veg starters, 2 Veg starters, Mutton Biryani & Live Counter.',
    status: 'Pending'
  },
  {
    _id: 'b-2',
    enquiryId: 'MYK-BNQ-2026-2002',
    organizerName: 'Sunita Rao',
    phone: '9848011223',
    email: 'sunita.rao@example.com',
    eventType: 'Wedding / Engagement Reception',
    guestCount: 120,
    eventDate: '2026-10-20',
    preferredLocation: 'Kokapet Banquet Center',
    budgetPerPlate: '₹1000+ (Premium Royal Menu)',
    customMenuRequirements: 'Engagement reception dinner with DJ stage setup and floral decorations.',
    status: 'Contacted'
  }
];

export default function AdminBanquetsPage() {
  const [enquiries, setEnquiries] = useState<BanquetEnquiry[]>(INITIAL_BANQUETS);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const updateStatus = (id: string, newStatus: BanquetEnquiry['status']) => {
    setEnquiries(prev =>
      prev.map(item => item._id === id || item.enquiryId === id ? { ...item, status: newStatus } : item)
    );
  };

  const filtered = enquiries.filter(item => {
    if (filterStatus !== 'All' && item.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchOrg = item.organizerName.toLowerCase().includes(q);
      const matchCode = item.enquiryId.toLowerCase().includes(q);
      const matchPhone = item.phone.includes(q);
      if (!matchOrg && !matchCode && !matchPhone) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-mayukha-dark flex flex-col">
      <AdminNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-mayukha-cream">Banquet & Event Lead Manager</h1>
            <p className="text-xs text-mayukha-sand">Track corporate conferences, wedding receptions, and outdoor catering requests.</p>
          </div>
          <div className="text-xs text-mayukha-gold bg-mayukha-gold/10 px-3 py-1.5 rounded-lg border border-mayukha-gold/30">
            Total Event Leads: <strong className="text-mayukha-cream">{enquiries.length}</strong>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="glass-panel p-4 rounded-2xl border border-mayukha-gold/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          
          <div className="flex flex-wrap gap-2">
            {['All', 'Pending', 'Contacted', 'Quoted', 'Confirmed', 'Cancelled'].map(status => (
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

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mayukha-muted" />
            <input
              type="text"
              placeholder="Search organizer, phone, enquiry ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-mayukha-dark border border-mayukha-border text-mayukha-cream text-xs focus:outline-none focus:border-mayukha-gold"
            />
          </div>

        </div>

        {/* Banquets Table */}
        <div className="glass-panel rounded-2xl border border-mayukha-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-mayukha-card/80 text-mayukha-sand font-semibold uppercase tracking-wider border-b border-mayukha-border/60">
                <tr>
                  <th className="py-3.5 px-4">Enquiry ID</th>
                  <th className="py-3.5 px-4">Organizer</th>
                  <th className="py-3.5 px-4">Event Type</th>
                  <th className="py-3.5 px-4">Date & Guests</th>
                  <th className="py-3.5 px-4">Venue & Budget</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-mayukha-border/40 text-mayukha-cream">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-mayukha-muted">
                      No banquet enquiries found matching the selected filter.
                    </td>
                  </tr>
                ) : (
                  filtered.map((item) => (
                    <tr key={item._id || item.enquiryId} className="hover:bg-mayukha-card/50 transition">
                      <td className="py-4 px-4 font-bold text-mayukha-gold font-mono">
                        {item.enquiryId}
                      </td>

                      <td className="py-4 px-4 space-y-1">
                        <strong className="block text-mayukha-cream text-sm">{item.organizerName}</strong>
                        <span className="text-mayukha-muted flex items-center gap-1">
                          <Phone className="w-3 h-3 text-mayukha-gold" /> {item.phone}
                        </span>
                        <span className="text-mayukha-muted flex items-center gap-1">
                          <Mail className="w-3 h-3 text-mayukha-gold" /> {item.email}
                        </span>
                      </td>

                      <td className="py-4 px-4 font-semibold text-mayukha-cream">
                        {item.eventType}
                      </td>

                      <td className="py-4 px-4 space-y-0.5">
                        <span className="block font-semibold text-mayukha-cream">{item.eventDate}</span>
                        <span className="text-mayukha-gold font-medium">👥 {item.guestCount} Guests</span>
                      </td>

                      <td className="py-4 px-4 space-y-1">
                        <span className="block text-mayukha-sand font-medium">{item.preferredLocation}</span>
                        <span className="text-[11px] text-mayukha-muted">Budget: {item.budgetPerPlate}</span>
                      </td>

                      <td className="py-4 px-4">
                        <span className={`inline-block px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                          item.status === 'Confirmed' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' :
                          item.status === 'Pending' ? 'bg-amber-950 text-amber-400 border border-amber-500/30' :
                          item.status === 'Contacted' ? 'bg-blue-950 text-cyan-300 border border-cyan-500/30' :
                          'bg-red-950 text-red-400 border border-red-500/30'
                        }`}>
                          {item.status}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-right space-x-1 whitespace-nowrap">
                        {item.status === 'Pending' && (
                          <button
                            onClick={() => updateStatus(item._id || item.enquiryId, 'Contacted')}
                            className="px-2.5 py-1 rounded bg-blue-700 text-white font-semibold text-[11px] hover:bg-blue-600 transition"
                          >
                            Mark Contacted
                          </button>
                        )}
                        {(item.status === 'Contacted' || item.status === 'Pending') && (
                          <button
                            onClick={() => updateStatus(item._id || item.enquiryId, 'Confirmed')}
                            className="px-2.5 py-1 rounded bg-emerald-700 text-white font-semibold text-[11px] hover:bg-emerald-600 transition"
                          >
                            Confirm Booking
                          </button>
                        )}
                        {item.status !== 'Cancelled' && (
                          <button
                            onClick={() => updateStatus(item._id || item.enquiryId, 'Cancelled')}
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
