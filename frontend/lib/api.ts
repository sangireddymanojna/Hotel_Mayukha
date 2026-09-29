import { MenuCategory, MenuItem, Reservation, BanquetEnquiry, Testimonial } from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

// Exact 5 requested categories for Menu Page
export const MOCK_CATEGORIES: MenuCategory[] = [
  { _id: 'cat-soups', name: 'Soups', slug: 'soups', displayOrder: 1, icon: 'Soup' },
  { _id: 'cat-starters', name: 'Starters', slug: 'starters', displayOrder: 2, icon: 'Drumstick' },
  { _id: 'cat-biryani', name: 'Biryanis', slug: 'biryani', displayOrder: 3, icon: 'Flame' },
  { _id: 'cat-desserts', name: 'Desserts', slug: 'desserts', displayOrder: 4, icon: 'IceCream' },
  { _id: 'cat-banquet', name: 'Banquet Booking Slots', slug: 'banquet-slots', displayOrder: 5, icon: 'Users' }
];

export const MOCK_MENU_ITEMS: MenuItem[] = [
  // 1. Soups Category
  {
    _id: 'menu-sp-1',
    name: 'Sweet Corn Chicken Soup',
    slug: 'sweet-corn-chicken-soup',
    categoryId: 'cat-soups',
    price: 190,
    description: 'Piping hot velvety soup blend with crushed sweet corn kernels, tender chicken shreds, and cracked white pepper.',
    isVeg: false,
    spiceLevel: 0,
    isAvailable: true,
    isChefSpecial: false,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
    allergenInfo: ['Egg'],
    tags: ['Soup', 'Comfort Food']
  },
  {
    _id: 'menu-sp-4',
    name: 'Mutton Paya Soup',
    slug: 'mutton-paya-soup',
    categoryId: 'cat-soups',
    price: 240,
    description: 'Traditional slow-cooked goat trotters soup infused with ginger, garlic, mint, and crushed black pepper.',
    isVeg: false,
    spiceLevel: 2,
    isAvailable: true,
    isChefSpecial: true,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    allergenInfo: ['None'],
    tags: ['Authentic Broth', 'Hyderabadi Classic']
  },

  // 2. Starters Category
  {
    _id: 'menu-str-1',
    name: 'Apollo Fish Fry',
    slug: 'apollo-fish-fry',
    categoryId: 'cat-starters',
    price: 390,
    description: 'Iconic Hyderabadi street style boneless fish fillets battered, deep-fried, and tossed in spicy yogurt, curry leaves, and green chillies.',
    isVeg: false,
    spiceLevel: 3,
    isAvailable: true,
    isChefSpecial: true,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    allergenInfo: ['Seafood', 'Dairy'],
    tags: ['Hyderabadi Special', 'Bestseller', 'Spicy']
  },
  {
    _id: 'menu-str-2',
    name: 'Crispy Gobi 65',
    slug: 'crispy-gobi-65',
    categoryId: 'cat-starters',
    price: 260,
    description: 'Crispy fried cauliflower florets marinated in south Indian spices, garlic, ginger, and curry leaves.',
    isVeg: true,
    spiceLevel: 2,
    isAvailable: true,
    isChefSpecial: false,
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    allergenInfo: ['Gluten'],
    tags: ['Vegetarian', 'Starter']
  },
  {
    _id: 'menu-str-3',
    name: 'Mayukha Special Tangdi Kebab (4 Pcs)',
    slug: 'mayukha-special-tangdi-kebab',
    categoryId: 'cat-starters',
    price: 420,
    description: 'Chicken drumsticks marinated in rich cashew paste, hung curd, and roasted garlic, clay-oven grilled over charcoal flames.',
    isVeg: false,
    spiceLevel: 2,
    isAvailable: true,
    isChefSpecial: true,
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80',
    allergenInfo: ['Dairy', 'Nuts'],
    tags: ['Starter', 'Tandoor']
  },
  {
    _id: 'menu-str-4',
    name: 'Crispy Loose Prawns',
    slug: 'crispy-loose-prawns',
    categoryId: 'cat-starters',
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
    _id: 'menu-str-5',
    name: 'Achari Paneer Tikka',
    slug: 'achari-paneer-tikka',
    categoryId: 'cat-starters',
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

  // 3. Biryanis Category (6 Varieties)
  {
    _id: 'menu-bir-1',
    name: 'Hyderabadi Special Chicken Dum Biryani',
    slug: 'hyderabadi-special-chicken-dum-biryani',
    categoryId: 'cat-biryani',
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
    _id: 'menu-bir-2',
    name: 'Royal Hyderabadi Mutton Dum Biryani',
    slug: 'royal-hyderabadi-mutton-dum-biryani',
    categoryId: 'cat-biryani',
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
    _id: 'menu-bir-3',
    name: 'Special Boneless Chicken Biryani',
    slug: 'special-boneless-chicken-biryani',
    categoryId: 'cat-biryani',
    price: 410,
    description: 'Juicy boneless chicken tikka pieces cooked in rich biryani masala and dum-layered with saffron basmati rice.',
    isVeg: false,
    spiceLevel: 2,
    isAvailable: true,
    isChefSpecial: true,
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    allergenInfo: ['Dairy'],
    tags: ['Boneless', 'Chef Special']
  },
  {
    _id: 'menu-bir-4',
    name: 'Telangana Ulavacharu Chicken Biryani',
    slug: 'telangana-ulavacharu-chicken-biryani',
    categoryId: 'cat-biryani',
    price: 430,
    description: 'Regional delicacy of basmati rice infused with traditional thick horsegram soup (Ulavacharu) and spicy marinated chicken.',
    isVeg: false,
    spiceLevel: 3,
    isAvailable: true,
    isChefSpecial: true,
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
    allergenInfo: ['None'],
    tags: ['Regional Special', 'Ulavacharu', 'Spicy']
  },
  {
    _id: 'menu-bir-5',
    name: 'Paneer Tikka Dum Biryani',
    slug: 'paneer-tikka-dum-biryani',
    categoryId: 'cat-biryani',
    price: 320,
    description: 'Charcoal-grilled marinated cottage cheese cubes dum-cooked with fragrant spice-infused saffron basmati rice.',
    isVeg: true,
    spiceLevel: 1,
    isAvailable: true,
    isChefSpecial: false,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    allergenInfo: ['Dairy'],
    tags: ['Vegetarian', 'Paneer Biryani']
  },
  {
    _id: 'menu-bir-6',
    name: 'Mayukha Special Egg Dum Biryani',
    slug: 'mayukha-special-egg-dum-biryani',
    categoryId: 'cat-biryani',
    price: 290,
    description: 'Hard-boiled eggs cooked in aromatic biryani gravies and dum-sealed with spiced long-grain basmati rice.',
    isVeg: false,
    spiceLevel: 2,
    isAvailable: true,
    isChefSpecial: false,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    allergenInfo: ['Egg'],
    tags: ['Egg Special', 'Dum Biryani']
  },

  // 4. Desserts Category
  {
    _id: 'menu-des-1',
    name: 'Double Ka Meetha',
    slug: 'double-ka-meetha',
    categoryId: 'cat-desserts',
    price: 180,
    description: 'Authentic Hyderabadi royal dessert made of fried bread soaked in saffron-infused rabri topped with pistachios.',
    isVeg: true,
    spiceLevel: 0,
    isAvailable: true,
    isChefSpecial: true,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    allergenInfo: ['Dairy', 'Nuts', 'Gluten'],
    tags: ['Dessert', 'Hyderabadi Classic']
  },
  {
    _id: 'menu-des-2',
    name: 'Qubani Ka Meetha with Vanilla Cream',
    slug: 'qubani-ka-meetha',
    categoryId: 'cat-desserts',
    price: 210,
    description: 'Traditional Hyderabadi delicacy made of stewed apricots served with rich vanilla ice cream.',
    isVeg: true,
    spiceLevel: 0,
    isAvailable: true,
    isChefSpecial: true,
    image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80',
    allergenInfo: ['Dairy', 'Nuts'],
    tags: ['Hyderabadi Classic', 'Dessert']
  },
  {
    _id: 'menu-des-3',
    name: 'Gulab Jamun with Creamy Rabri (2 Pcs)',
    slug: 'gulab-jamun-with-rabri',
    categoryId: 'cat-desserts',
    price: 160,
    description: 'Soft golden milk-solid dumplings soaked in rose-cardamom syrup and served over thick saffron rabri.',
    isVeg: true,
    spiceLevel: 0,
    isAvailable: true,
    isChefSpecial: false,
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80',
    allergenInfo: ['Dairy', 'Gluten', 'Nuts'],
    tags: ['Dessert', 'Sweet']
  },
  {
    _id: 'menu-des-4',
    name: 'Special Hyderabadi Mango Lassi',
    slug: 'special-hyderabadi-mango-lassi',
    categoryId: 'cat-desserts',
    price: 130,
    description: 'Chilled thick sweet yogurt smoothie blended with ripe mango pulp and topped with saffron and chopped almonds.',
    isVeg: true,
    spiceLevel: 0,
    isAvailable: true,
    isChefSpecial: false,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    allergenInfo: ['Dairy', 'Nuts'],
    tags: ['Beverage', 'Cooler']
  },

  // 5. Banquet Booking Slots Category
  {
    _id: 'menu-bnq-1',
    name: 'KPHB Grand Banquet Evening Slot (50 - 200 Guests)',
    slug: 'kphb-grand-banquet-evening-slot',
    categoryId: 'cat-banquet',
    price: 25000,
    description: 'Prime evening hall booking slot for corporate dinners, wedding receptions, and grand birthday parties. Includes AC, stage setup, and audio system.',
    isVeg: true,
    spiceLevel: 0,
    isAvailable: true,
    isChefSpecial: true,
    image: 'https://www.hotelmayukha.com/wp-content/uploads/2022/04/Banquet-Hall-Gallery-15.jpeg',
    allergenInfo: ['None'],
    tags: ['Banquet Hall', 'KPHB Slot', 'Events']
  },
  {
    _id: 'menu-bnq-2',
    name: 'Kokapet Luxury Banquet Lunch Slot (50 - 150 Guests)',
    slug: 'kokapet-luxury-banquet-lunch-slot',
    categoryId: 'cat-banquet',
    price: 20000,
    description: 'Afternoon dining banquet slot at Financial District Kokapet. Perfect for corporate lunches, family get-togethers, and anniversaries.',
    isVeg: true,
    spiceLevel: 0,
    isAvailable: true,
    isChefSpecial: true,
    image: 'https://www.hotelmayukha.com/wp-content/uploads/2022/04/Banquet-Hall-Gallery-16.jpeg',
    allergenInfo: ['None'],
    tags: ['Kokapet Venue', 'Corporate Lunch', 'Banquet']
  },
  {
    _id: 'menu-bnq-3',
    name: 'Outdoor Premium Catering Slot (20+ Guests)',
    slug: 'outdoor-premium-catering-slot',
    categoryId: 'cat-banquet',
    price: 15000,
    description: 'Full-service outdoor live counter catering setup delivered directly to your home or office location in Hyderabad.',
    isVeg: true,
    spiceLevel: 0,
    isAvailable: true,
    isChefSpecial: true,
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
    allergenInfo: ['None'],
    tags: ['Outdoor Catering', 'Live Counter', 'Catering']
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
