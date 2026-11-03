'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { MenuItem, DeliveryOrder } from '@/types';
import { X, Plus, Minus, ShoppingBag, Bike, CheckCircle2, Phone, MapPin, Clock, ShieldCheck, Flame, CreditCard, Banknote } from 'lucide-react';

interface OrderDeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  dish: MenuItem | null;
}

const DELIVERY_AREAS = [
  'KPHB Colony & Phase 1-9',
  'Kokapet & Financial District',
  'Kukatpally & Pragathi Nagar',
  'Gachibowli & Hitech City',
  'Kondapur & Madhapur',
  'Miyapur & Nizampet',
  'JNTU & Bachupally'
];

export default function OrderDeliveryModal({ isOpen, onClose, dish }: OrderDeliveryModalProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [spicePreference, setSpicePreference] = useState<string>('Medium');
  const [customerName, setCustomerName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [deliveryArea, setDeliveryArea] = useState<string>(DELIVERY_AREAS[0]);
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery' | 'UPI on Delivery' | 'Online Payment'>('Cash on Delivery');
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmedOrder, setConfirmedOrder] = useState<DeliveryOrder | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setSpicePreference('Medium');
      setConfirmedOrder(null);
      setErrorMessage('');
    }
  }, [isOpen, dish]);

  if (!isOpen || !dish) return null;

  const itemPrice = dish.price;
  const subtotal = itemPrice * quantity;
  const deliveryFee = subtotal >= 499 ? 0 : 40;
  const tax = Math.round(subtotal * 0.05); // 5% GST
  const grandTotal = subtotal + deliveryFee + tax;

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!customerName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!deliveryAddress.trim() || deliveryAddress.trim().length < 8) {
      setErrorMessage('Please provide a complete delivery address with house/flat number.');
      return;
    }

    setIsSubmitting(true);

    const randomId = Math.floor(1000 + Math.random() * 9000);
    const newOrder: DeliveryOrder = {
      orderId: `MYK-DEL-${new Date().getFullYear()}-${randomId}`,
      customerName: customerName.trim(),
      phone: phone.trim(),
      deliveryArea,
      deliveryAddress: deliveryAddress.trim(),
      specialInstructions: specialInstructions.trim() ? `${specialInstructions.trim()} (Spice: ${spicePreference})` : `Spice: ${spicePreference}`,
      paymentMethod,
      items: [
        {
          dishId: dish._id,
          name: dish.name,
          price: dish.price,
          quantity,
          image: dish.image,
          isVeg: dish.isVeg
        }
      ],
      subtotal,
      deliveryFee,
      tax,
      totalAmount: grandTotal,
      status: 'Preparing in Kitchen',
      estimatedDeliveryMinutes: 35,
      createdAt: new Date().toISOString()
    };

    // Save to localStorage for client tracking
    try {
      const existing = localStorage.getItem('mayukha_delivery_orders');
      const orders = existing ? JSON.parse(existing) : [];
      orders.unshift(newOrder);
      localStorage.setItem('mayukha_delivery_orders', JSON.stringify(orders.slice(0, 10)));
    } catch (e) {
      console.error('Storage error', e);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setConfirmedOrder(newOrder);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-mayukha-dark/90 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div className="bg-mayukha-surface border border-mayukha-gold/30 rounded-2xl max-w-lg w-full overflow-hidden shadow-deep my-6 relative flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-mayukha-border/60 flex items-center justify-between bg-mayukha-card/80 sticky top-0 z-20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-mayukha-gold/20 text-mayukha-gold flex items-center justify-center border border-mayukha-gold/40">
              <Bike className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-serif font-bold text-mayukha-cream">
                {confirmedOrder ? 'Order Confirmed!' : 'Home Delivery • Order Now'}
              </h2>
              <p className="text-[11px] text-mayukha-sand">
                {confirmedOrder ? 'Sent directly to Hotel Mayukha Kitchen' : 'Fresh & Hot Delivered in 30-45 mins'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-mayukha-dark/80 text-mayukha-cream hover:text-mayukha-gold transition border border-mayukha-border/40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {confirmedOrder ? (
            /* SUCCESS CONFIRMATION VIEW */
            <div className="text-center space-y-5 py-3">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <span className="text-xs uppercase font-bold tracking-widest text-mayukha-gold">Thank you, {confirmedOrder.customerName}!</span>
                <h3 className="text-2xl font-serif font-bold text-mayukha-cream">Order Placed Successfully</h3>
                <div className="inline-block mt-1 px-3 py-1 rounded-full bg-mayukha-card border border-mayukha-gold/30 text-xs font-mono text-mayukha-gold">
                  Order ID: {confirmedOrder.orderId}
                </div>
              </div>

              {/* Status Tracking Pill */}
              <div className="p-4 rounded-xl bg-mayukha-card/80 border border-mayukha-border text-left space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-mayukha-muted">Live Status:</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                    Preparing in Kitchen
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-mayukha-muted">Estimated Delivery Time:</span>
                  <span className="text-mayukha-gold font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> 30 – 45 Minutes
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs border-t border-mayukha-border/40 pt-2">
                  <span className="text-mayukha-muted">Delivery To:</span>
                  <span className="text-mayukha-sand font-medium truncate max-w-[220px]">
                    {confirmedOrder.deliveryAddress}, {confirmedOrder.deliveryArea}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-mayukha-muted">Payment Mode:</span>
                  <span className="text-mayukha-cream font-semibold">{confirmedOrder.paymentMethod} (₹{confirmedOrder.totalAmount})</span>
                </div>
              </div>

              {/* Order Items Recap */}
              <div className="p-3.5 rounded-xl bg-mayukha-dark border border-mayukha-border/50 text-left flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-mayukha-border">
                  <Image src={dish.image} alt={dish.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0 text-xs">
                  <span className="font-bold text-mayukha-cream block truncate">{dish.name}</span>
                  <span className="text-mayukha-sand">Qty: {confirmedOrder.items[0].quantity} • {confirmedOrder.specialInstructions}</span>
                </div>
                <span className="text-sm font-serif font-bold text-mayukha-gold">₹{confirmedOrder.totalAmount}</span>
              </div>

              {/* Kitchen Hotline Button */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:8977933805"
                  className="flex-1 py-3 rounded-xl bg-mayukha-card border border-mayukha-gold/40 text-mayukha-cream font-semibold text-xs flex items-center justify-center gap-2 hover:border-mayukha-gold transition"
                >
                  <Phone className="w-4 h-4 text-mayukha-gold" />
                  Call Kitchen: 89779 33805
                </a>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-mayukha-gold to-mayukha-goldDark text-mayukha-dark font-bold text-xs shadow-gold-glow hover:brightness-110 transition"
                >
                  Done / Close
                </button>
              </div>
            </div>
          ) : (
            /* ORDER FORM VIEW */
            <form onSubmit={handleOrderSubmit} className="space-y-4">
              
              {/* Selected Dish Summary Box */}
              <div className="p-3.5 rounded-xl bg-mayukha-card border border-mayukha-gold/30 flex items-center gap-3">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-mayukha-border/60">
                  <Image src={dish.image} alt={dish.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-mayukha-gold">
                      {dish.isVeg ? '🟢 Veg' : '🔴 Non-Veg'}
                    </span>
                    {dish.isChefSpecial && (
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded border border-amber-500/30 flex items-center gap-0.5">
                        <Flame className="w-2.5 h-2.5" /> Special
                      </span>
                    )}
                  </div>
                  <h4 className="font-serif font-bold text-sm sm:text-base text-mayukha-cream truncate">{dish.name}</h4>
                  <span className="text-sm font-serif font-bold text-mayukha-gold">₹{dish.price} each</span>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 bg-mayukha-dark px-2 py-1 rounded-lg border border-mayukha-border">
                  <button
                    type="button"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-1 text-mayukha-muted hover:text-mayukha-gold transition"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold text-mayukha-cream w-4 text-center">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(q => q + 1)}
                    className="p-1 text-mayukha-muted hover:text-mayukha-gold transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Spice Level Preference */}
              <div>
                <label className="block text-xs font-semibold text-mayukha-sand mb-1.5">Spice Level Preference</label>
                <div className="grid grid-cols-4 gap-2">
                  {['Mild', 'Medium', 'Spicy', 'Extra Hot'].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSpicePreference(lvl)}
                      className={`py-1.5 text-xs font-semibold rounded-lg border transition ${
                        spicePreference === lvl
                          ? 'bg-mayukha-gold text-mayukha-dark border-mayukha-gold shadow-sm'
                          : 'bg-mayukha-card text-mayukha-sand border-mayukha-border/60 hover:border-mayukha-gold/40'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-mayukha-sand mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-mayukha-dark border border-mayukha-border text-mayukha-cream text-xs focus:outline-none focus:border-mayukha-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-mayukha-sand mb-1">Mobile Number (10 digits) *</label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="e.g. 9849012345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-3 py-2 rounded-xl bg-mayukha-dark border border-mayukha-border text-mayukha-cream text-xs focus:outline-none focus:border-mayukha-gold"
                  />
                </div>
              </div>

              {/* Delivery Zone Selection */}
              <div>
                <label className="block text-xs font-semibold text-mayukha-sand mb-1">Delivery Area / Zone *</label>
                <select
                  value={deliveryArea}
                  onChange={(e) => setDeliveryArea(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-mayukha-dark border border-mayukha-border text-mayukha-cream text-xs focus:outline-none focus:border-mayukha-gold"
                >
                  {DELIVERY_AREAS.map((area) => (
                    <option key={area} value={area} className="bg-mayukha-surface text-mayukha-cream">
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              {/* Complete Address */}
              <div>
                <label className="block text-xs font-semibold text-mayukha-sand mb-1">Complete Delivery Address *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Flat/House No., Building Name, Street & Landmark..."
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-mayukha-dark border border-mayukha-border text-mayukha-cream text-xs focus:outline-none focus:border-mayukha-gold resize-none"
                />
              </div>

              {/* Cooking / Delivery Instructions */}
              <div>
                <label className="block text-xs font-semibold text-mayukha-sand mb-1">Special Cooking / Delivery Instructions (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Extra raita & lemons, Ring the doorbell, Leave at security"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-mayukha-dark border border-mayukha-border text-mayukha-cream text-xs focus:outline-none focus:border-mayukha-gold"
                />
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-semibold text-mayukha-sand mb-1.5">Payment Method</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Cash on Delivery')}
                    className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between gap-1 ${
                      paymentMethod === 'Cash on Delivery'
                        ? 'bg-mayukha-gold/15 border-mayukha-gold text-mayukha-cream'
                        : 'bg-mayukha-dark border-mayukha-border text-mayukha-sand hover:border-mayukha-gold/40'
                    }`}
                  >
                    <Banknote className="w-4 h-4 text-mayukha-gold" />
                    <span className="text-[11px] font-semibold leading-tight">Cash on Delivery</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('UPI on Delivery')}
                    className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between gap-1 ${
                      paymentMethod === 'UPI on Delivery'
                        ? 'bg-mayukha-gold/15 border-mayukha-gold text-mayukha-cream'
                        : 'bg-mayukha-dark border-mayukha-border text-mayukha-sand hover:border-mayukha-gold/40'
                    }`}
                  >
                    <Bike className="w-4 h-4 text-emerald-400" />
                    <span className="text-[11px] font-semibold leading-tight">UPI on Delivery</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Online Payment')}
                    className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between gap-1 ${
                      paymentMethod === 'Online Payment'
                        ? 'bg-mayukha-gold/15 border-mayukha-gold text-mayukha-cream'
                        : 'bg-mayukha-dark border-mayukha-border text-mayukha-sand hover:border-mayukha-gold/40'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-cyan-400" />
                    <span className="text-[11px] font-semibold leading-tight">Pay Online</span>
                  </button>
                </div>
              </div>

              {/* Price Breakdown Bill */}
              <div className="p-3.5 rounded-xl bg-mayukha-dark border border-mayukha-border text-xs space-y-1.5">
                <div className="flex justify-between text-mayukha-sand">
                  <span>Item Subtotal ({quantity} x ₹{dish.price})</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-mayukha-sand">
                  <span>Delivery Charges</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <strong className="text-emerald-400">FREE (Orders &gt; ₹499)</strong>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-mayukha-sand">
                  <span>GST (5%)</span>
                  <span>₹{tax}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-mayukha-gold border-t border-mayukha-border/60 pt-2 mt-1">
                  <span>Total Payable</span>
                  <span className="font-serif text-base">₹{grandTotal}</span>
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs">
                  {errorMessage}
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-mayukha-gold to-mayukha-goldDark text-mayukha-dark font-bold text-sm shadow-gold-glow hover:brightness-110 transition flex items-center justify-center gap-2"
                >
                  <Bike className="w-5 h-5" />
                  {isSubmitting ? 'Placing Home Delivery Order...' : `Confirm Order for Home Delivery • ₹${grandTotal}`}
                </button>
                <div className="flex items-center justify-center gap-2 mt-2 text-[11px] text-mayukha-muted">
                  <ShieldCheck className="w-3.5 h-3.5 text-mayukha-gold" />
                  <span>30-45 Min Guarantee from Hotel Mayukha Kitchen</span>
                </div>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
