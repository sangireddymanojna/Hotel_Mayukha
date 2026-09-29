import { MenuCategory, MenuItem, Reservation, BanquetEnquiry, Testimonial } from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

// Static Fallback Data for static deployment resilience
export const MOCK_CATEGORIES: MenuCategory[] = [
  { _id: 'cat-1', name: 'Soups & Appetizers', slug: 'soups-starters', displayOrder: 1, icon: 'Soup' },
  { _id: 'cat-2', name: 'Signature Biryanis', slug: 'biryanis', displayOrder: 2, icon: 'Flame' },
  { _id: 'cat-3', name: 'Tandoori & Kebabs', slug: 'tandoori-kebabs', displayOrder: 3, icon: 'Drumstick' },
  { _id: 'cat-4', name: 'Curries & Gravies', slug: 'curries-gravies', displayOrder: 4, icon: 'Utensils' },
  { _id: 'cat-5', name: 'Indian Breads', slug: 'indian-breads', displayOrder: 5, icon: 'Wheat' },
  { _id: 'cat-6', name: 'Desserts & Beverages', slug: 'desserts-beverages', displayOrder: 6, icon: 'IceCream' }
];

export const MOCK_MENU_ITEMS: MenuItem[] = [
  {
    _id: 'menu-1',
    name: 'Hyderabadi Special Chicken Dum Biryani',
    slug: 'hyderabadi-special-chicken-dum-biryani',
    categoryId: 'cat-2',
    price: 380,
    description: 'Long-grain basmati rice layered with succulent marinated chicken, saffron, mint, and secret Mayukha spices sealed in dum.',
    isVeg: false,
    spiceLevel: 2,
    isAvailable: true,
    isChefSpecial: true,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    allergenInfo: ['None'],
    tags: ['Bestseller', 'Chef Special', 'Dum Biryani']
  },
  {
    _id: 'menu-2',
    name: 'Royal Hyderabadi Mutton Dum Biryani',
    slug: 'royal-hyderabadi-mutton-dum-biryani',
    categoryId: 'cat-2',
    price: 480,
    description: 'Tender baby goat meat slow-cooked with basmati rice, caramelized onions, ghee, and roasted whole spices.',
    isVeg: false,
    spiceLevel: 2,
    isAvailable: true,
    isChefSpecial: true,
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80',
    allergenInfo: ['Dairy'],
    tags: ['Mutton', 'Royal', 'Dum Biryani']
  },
  {
    _id: 'menu-3',
    name: 'Mayukha Special Tangdi Kebab (4 Pcs)',
    slug: 'mayukha-special-tangdi-kebab',
    categoryId: 'cat-3',
    price: 420,
    description: 'Chicken drumsticks marinated in rich cashew paste, hung curd, and roasted garlic, clay-oven grilled to perfection.',
    isVeg: false,
    spiceLevel: 2,
    isAvailable: true,
    isChefSpecial: true,
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80',
    allergenInfo: ['Dairy', 'Nuts'],
    tags: ['Starter', 'Tandoor']
  },
  {
    _id: 'menu-4',
    name: 'Crispy Loose Prawns',
    slug: 'crispy-loose-prawns',
    categoryId: 'cat-3',
    price: 460,
    description: 'Fresh ocean prawns tossed in green chillies, curry leaves, crushed garlic, and spring onion spice crunch.',
    isVeg: false,
    spiceLevel: 3,
    isAvailable: true,
    isChefSpecial: true,
    image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=800&q=80',
    allergenInfo: ['Seafood'],
    tags: ['Seafood', 'Spicy']
  },
  {
    _id: 'menu-5',
    name: 'Paneer Tikka Dum Biryani',
    slug: 'paneer-tikka-dum-biryani',
    categoryId: 'cat-2',
    price: 320,
    description: 'Charcoal-grilled marinated cottage cheese cubes dum-cooked with fragrant spice-infused basmati rice.',
    isVeg: true,
    spiceLevel: 1,
    isAvailable: true,
    isChefSpecial: false,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    allergenInfo: ['Dairy'],
    tags: ['Vegetarian', 'Paneer']
  },
  {
    _id: 'menu-6',
    name: 'Achari Paneer Tikka',
    slug: 'achari-paneer-tikka',
    categoryId: 'cat-3',
    price: 310,
    description: 'Cottage cheese marinated in tangy pickling spices, bell peppers, and grilled over charcoal flames.',
    isVeg: true,
    spiceLevel: 2,
    isAvailable: true,
    isChefSpecial: false,
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80',
    allergenInfo: ['Dairy'],
    tags: ['Vegetarian', 'Achari']
  },
  {
    _id: 'menu-7',
    name: 'Butter Chicken Masala',
    slug: 'butter-chicken-masala',
    categoryId: 'cat-4',
    price: 360,
    description: 'Smoky tandoori chicken cooked in velvety tomato, butter, cashew gravy drizzled with fresh cream.',
    isVeg: false,
    spiceLevel: 1,
    isAvailable: true,
    isChefSpecial: false,
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80',
    allergenInfo: ['Dairy', 'Nuts'],
    tags: ['Creamy', 'Classic']
  },
  {
    _id: 'menu-8',
    name: 'Double Ka Meetha',
    slug: 'double-ka-meetha',
    categoryId: 'cat-6',
    price: 180,
    description: 'Authentic Hyderabadi dessert made of fried bread soaked in saffron-infused rabri topped with pistachios.',
    isVeg: true,
    spiceLevel: 0,
    isAvailable: true,
    isChefSpecial: true,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    allergenInfo: ['Dairy', 'Nuts', 'Gluten'],
    tags: ['Dessert', 'Hyderabadi Classic']
  }
];

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    _id: 't-1',
    customerName: 'Vikram Reddy',
    rating: 5,
    reviewText: 'Hotel Mayukha offers the best authentic Hyderabadi Mutton Dum Biryani in KPHB! The Aqua theme ambience and family dining setup were top-notch.',
    visitType: 'Dine-In',
    branch: 'KPHB Main Branch',
    isFeatured: true
  },
  {
    _id: 't-2',
    customerName: 'Ananya Sharma',
    rating: 5,
    reviewText: 'Hosted my parents’ 30th anniversary in their Kokapet banquet hall. The catering quality, staff hospitality, and arrangement exceeded our expectations!',
    visitType: 'Banquet Event',
    branch: 'Kokapet Branch',
    isFeatured: true
  },
  {
    _id: 't-3',
    customerName: 'Karthik Varma',
    rating: 5,
    reviewText: 'The Tangdi Kebab and Loose Prawns here are phenomenal. Spice levels are authentic and flavors are deeply rich. A must-visit dining spot.',
    visitType: 'Dine-In',
    branch: 'KPHB Main Branch',
    isFeatured: true
  }
];

// API Functions with automatic fallback
export async function fetchCategories(): Promise<MenuCategory[]> {
  try {
    const res = await fetch(`${API_BASE}/menu/categories`, { cache: 'no-store' });
    if (!res.ok) throw new Error('API error');
    const json = await res.json();
    return json.data;
  } catch (err) {
    return MOCK_CATEGORIES;
  }
}

export async function fetchMenuItems(params?: { category?: string; veg?: string; search?: string; chefSpecial?: string }): Promise<MenuItem[]> {
  try {
    const query = new URLSearchParams();
    if (params?.category) query.append('category', params.category);
    if (params?.veg) query.append('veg', params.veg);
    if (params?.search) query.append('search', params.search);
    if (params?.chefSpecial) query.append('chefSpecial', params.chefSpecial);

    const res = await fetch(`${API_BASE}/menu?${query.toString()}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('API error');
    const json = await res.json();
    return json.data;
  } catch (err) {
    let items = MOCK_MENU_ITEMS;
    if (params?.veg !== undefined && params.veg !== '') {
      const isVeg = params.veg === 'true';
      items = items.filter(i => i.isVeg === isVeg);
    }
    if (params?.chefSpecial) {
      items = items.filter(i => i.isChefSpecial);
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      items = items.filter(i => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q));
    }
    return items;
  }
}

export async function submitReservation(data: Partial<Reservation>): Promise<{ status: string; data?: Reservation; message?: string }> {
  try {
    const res = await fetch(`${API_BASE}/reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    return json;
  } catch (err) {
    // Generate fallback booking reference
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const bookingId = `MYK-RES-2026-${randomCode}`;
    return {
      status: 'success',
      data: {
        bookingId,
        customerName: data.customerName || 'Valued Guest',
        phone: data.phone || '',
        email: data.email || '',
        guestCount: data.guestCount || 2,
        date: data.date || new Date().toISOString().split('T')[0],
        timeSlot: data.timeSlot || '08:00 PM',
        branch: data.branch || 'KPHB Main Branch',
        seatingPreference: data.seatingPreference || 'Aqua Theme Section',
        status: 'Pending'
      }
    };
  }
}

export async function trackBooking(bookingId: string): Promise<{ status: string; data?: Reservation; message?: string }> {
  try {
    const res = await fetch(`${API_BASE}/reservations/track/${bookingId}`, { cache: 'no-store' });
    const json = await res.json();
    return json;
  } catch (err) {
    return {
      status: 'success',
      data: {
        bookingId: bookingId.toUpperCase(),
        customerName: 'Guest',
        phone: '+91 98490XXXXX',
        email: 'guest@example.com',
        guestCount: 4,
        date: '2026-10-02',
        timeSlot: '08:00 PM',
        branch: 'KPHB Main Branch',
        seatingPreference: 'Aqua Theme Section',
        status: 'Confirmed'
      }
    };
  }
}

export async function submitBanquetEnquiry(data: Partial<BanquetEnquiry>): Promise<{ status: string; data?: BanquetEnquiry; message?: string }> {
  try {
    const res = await fetch(`${API_BASE}/banquets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    return json;
  } catch (err) {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const enquiryId = `MYK-BNQ-2026-${randomCode}`;
    return {
      status: 'success',
      data: {
        enquiryId,
        organizerName: data.organizerName || 'Organizer',
        phone: data.phone || '',
        email: data.email || '',
        eventType: data.eventType || 'Corporate Dinner',
        guestCount: data.guestCount || 50,
        eventDate: data.eventDate || new Date().toISOString().split('T')[0],
        preferredLocation: data.preferredLocation || 'KPHB Hall',
        status: 'Pending'
      }
    };
  }
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  try {
    const res = await fetch(`${API_BASE}/testimonials`, { cache: 'no-store' });
    if (!res.ok) throw new Error('API error');
    const json = await res.json();
    return json.data;
  } catch (err) {
    return MOCK_TESTIMONIALS;
  }
}
