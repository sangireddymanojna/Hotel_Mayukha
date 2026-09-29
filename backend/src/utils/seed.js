const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/User');
const MenuCategory = require('../models/MenuCategory');
const MenuItem = require('../models/MenuItem');
const Reservation = require('../models/Reservation');
const BanquetEnquiry = require('../models/BanquetEnquiry');
const Testimonial = require('../models/Testimonial');

const categoriesData = [
  {
    name: 'Soups',
    slug: 'soups',
    description: 'Refreshing soups crafted with aromatic herbs and rich bone broth.',
    displayOrder: 1,
    icon: 'Soup'
  },
  {
    name: 'Starters',
    slug: 'starters',
    description: 'Crisp Tandoori kebabs, seafood fry, and vegetarian starters.',
    displayOrder: 2,
    icon: 'Drumstick'
  },
  {
    name: 'Biryanis',
    slug: 'biryani',
    description: 'World-famous authentic Hyderabadi Dum Biryanis cooked in traditional handis.',
    displayOrder: 3,
    icon: 'Flame'
  },
  {
    name: 'Desserts',
    slug: 'desserts',
    description: 'Traditional Hyderabadi desserts and chilled sweet beverages.',
    displayOrder: 4,
    icon: 'IceCream'
  },
  {
    name: 'Banquet Booking Slots',
    slug: 'banquet-slots',
    description: 'Reserve prime hall booking slots for corporate dinners, wedding receptions, and catering.',
    displayOrder: 5,
    icon: 'Users'
  }
];

const testimonialsData = [
  {
    customerName: 'Vikram Reddy',
    rating: 5,
    reviewText: 'Hotel Mayukha offers the best authentic Hyderabadi Mutton Dum Biryani in KPHB! The Aqua theme ambience and family dining setup were top-notch.',
    visitType: 'Dine-In',
    branch: 'KPHB Main Branch',
    isFeatured: true
  },
  {
    customerName: 'Ananya Sharma',
    rating: 5,
    reviewText: 'Hosted my parents’ 30th anniversary in their Kokapet banquet hall. The catering quality, staff hospitality, and arrangement exceeded our expectations!',
    visitType: 'Banquet Event',
    branch: 'Kokapet Branch',
    isFeatured: true
  },
  {
    customerName: 'Karthik Varma',
    rating: 5,
    reviewText: 'The Tangdi Kebab and Loose Prawns here are phenomenal. Spice levels are authentic and flavors are deeply rich. A must-visit dining spot.',
    visitType: 'Dine-In',
    branch: 'KPHB Main Branch',
    isFeatured: true
  }
];

const seedDatabase = async () => {
  try {
    const connStr = process.env.MONGODB_URI;
    if (!connStr) {
      console.warn('⚠️ MONGODB_URI not found in env. Cannot perform seed.');
      process.exit(1);
    }

    await mongoose.connect(connStr);
    console.log('✅ Connected to MongoDB for database seeding...');

    await User.deleteMany({});
    await MenuCategory.deleteMany({});
    await MenuItem.deleteMany({});
    await Reservation.deleteMany({});
    await BanquetEnquiry.deleteMany({});
    await Testimonial.deleteMany({});

    console.log('🧹 Cleared existing database records.');

    // Seed Admin User
    const adminEmail = process.env.ADMIN_INITIAL_EMAIL || 'admin@hotelmayukha.com';
    const adminPassword = process.env.ADMIN_INITIAL_PASSWORD || 'MayukhaAdmin2026!';
    
    await User.create({
      name: 'Mayukha Executive Admin',
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
      isActive: true
    });
    console.log(`👤 Admin Account Created: ${adminEmail}`);

    // Seed Categories
    const createdCategories = await MenuCategory.insertMany(categoriesData);
    console.log(`📁 Seeded ${createdCategories.length} Menu Categories.`);

    const categoryMap = {};
    createdCategories.forEach(cat => {
      categoryMap[cat.slug] = cat._id;
    });

    const menuItemsData = [
      // 1. Soups
      {
        name: 'Sweet Corn Chicken Soup',
        slug: 'sweet-corn-chicken-soup',
        categoryId: categoryMap['soups'],
        price: 190,
        description: 'Piping hot velvety soup blend with crushed sweet corn kernels, tender chicken shreds, and cracked white pepper.',
        isVeg: false,
        spiceLevel: 0,
        isChefSpecial: false,
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
        allergenInfo: ['Egg'],
        tags: ['Soup', 'Comfort Food']
      },
      {
        name: 'Mutton Paya Soup',
        slug: 'mutton-paya-soup',
        categoryId: categoryMap['soups'],
        price: 240,
        description: 'Traditional slow-cooked goat trotters soup infused with ginger, garlic, mint, and crushed black pepper.',
        isVeg: false,
        spiceLevel: 2,
        isChefSpecial: true,
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        allergenInfo: ['None'],
        tags: ['Authentic Broth', 'Hyderabadi Classic']
      },

      // 2. Starters
      {
        name: 'Apollo Fish Fry',
        slug: 'apollo-fish-fry',
        categoryId: categoryMap['starters'],
        price: 390,
        description: 'Iconic Hyderabadi street style boneless fish fillets battered, deep-fried, and tossed in spicy yogurt, curry leaves, and green chillies.',
        isVeg: false,
        spiceLevel: 3,
        isChefSpecial: true,
        image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
        allergenInfo: ['Seafood', 'Dairy'],
        tags: ['Hyderabadi Special', 'Bestseller', 'Spicy']
      },
      {
        name: 'Crispy Gobi 65',
        slug: 'crispy-gobi-65',
        categoryId: categoryMap['starters'],
        price: 260,
        description: 'Crispy fried cauliflower florets marinated in south Indian spices, garlic, ginger, and curry leaves.',
        isVeg: true,
        spiceLevel: 2,
        isChefSpecial: false,
        image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
        allergenInfo: ['Gluten'],
        tags: ['Vegetarian', 'Starter']
      },
      {
        name: 'Mayukha Special Tangdi Kebab (4 Pcs)',
        slug: 'mayukha-special-tangdi-kebab',
        categoryId: categoryMap['starters'],
        price: 420,
        description: 'Chicken drumsticks marinated in rich cashew paste, hung curd, and roasted garlic, clay-oven grilled over charcoal flames.',
        isVeg: false,
        spiceLevel: 2,
        isChefSpecial: true,
        image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80',
        allergenInfo: ['Dairy', 'Nuts'],
        tags: ['Starter', 'Tandoor']
      },
      {
        name: 'Crispy Loose Prawns',
        slug: 'crispy-loose-prawns',
        categoryId: categoryMap['starters'],
        price: 460,
        description: 'Fresh ocean prawns tossed in green chillies, curry leaves, crushed garlic, and spring onion spice crunch.',
        isVeg: false,
        spiceLevel: 3,
        isChefSpecial: true,
        image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=800&q=80',
        allergenInfo: ['Seafood'],
        tags: ['Seafood', 'Spicy']
      },
      {
        name: 'Achari Paneer Tikka',
        slug: 'achari-paneer-tikka',
        categoryId: categoryMap['starters'],
        price: 310,
        description: 'Cottage cheese marinated in tangy pickling spices, bell peppers, and grilled over charcoal flames.',
        isVeg: true,
        spiceLevel: 2,
        isChefSpecial: false,
        image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80',
        allergenInfo: ['Dairy'],
        tags: ['Vegetarian', 'Achari']
      },

      // 3. Biryanis (6 Options)
      {
        name: 'Hyderabadi Special Chicken Dum Biryani',
        slug: 'hyderabadi-special-chicken-dum-biryani',
        categoryId: categoryMap['biryani'],
        price: 380,
        description: 'Long-grain basmati rice layered with succulent marinated chicken, saffron, mint, and secret Mayukha spices sealed in dum.',
        isVeg: false,
        spiceLevel: 2,
        isChefSpecial: true,
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
        allergenInfo: ['None'],
        tags: ['Bestseller', 'Chef Special', 'Dum Biryani']
      },
      {
        name: 'Royal Hyderabadi Mutton Dum Biryani',
        slug: 'royal-hyderabadi-mutton-dum-biryani',
        categoryId: categoryMap['biryani'],
        price: 480,
        description: 'Tender baby goat meat slow-cooked with basmati rice, caramelized onions, ghee, and roasted whole spices.',
        isVeg: false,
        spiceLevel: 2,
        isChefSpecial: true,
        image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80',
        allergenInfo: ['Dairy'],
        tags: ['Mutton', 'Royal', 'Dum Biryani']
      },
      {
        name: 'Special Boneless Chicken Biryani',
        slug: 'special-boneless-chicken-biryani',
        categoryId: categoryMap['biryani'],
        price: 410,
        description: 'Juicy boneless chicken tikka pieces cooked in rich biryani masala and dum-layered with saffron basmati rice.',
        isVeg: false,
        spiceLevel: 2,
        isChefSpecial: true,
        image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
        allergenInfo: ['Dairy'],
        tags: ['Boneless', 'Chef Special']
      },
      {
        name: 'Telangana Ulavacharu Chicken Biryani',
        slug: 'telangana-ulavacharu-chicken-biryani',
        categoryId: categoryMap['biryani'],
        price: 430,
        description: 'Regional delicacy of basmati rice infused with traditional thick horsegram soup (Ulavacharu) and spicy marinated chicken.',
        isVeg: false,
        spiceLevel: 3,
        isChefSpecial: true,
        image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
        allergenInfo: ['None'],
        tags: ['Regional Special', 'Ulavacharu', 'Spicy']
      },
      {
        name: 'Paneer Tikka Dum Biryani',
        slug: 'paneer-tikka-dum-biryani',
        categoryId: categoryMap['biryani'],
        price: 320,
        description: 'Charcoal-grilled marinated cottage cheese cubes dum-cooked with fragrant spice-infused saffron basmati rice.',
        isVeg: true,
        spiceLevel: 1,
        isChefSpecial: false,
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
        allergenInfo: ['Dairy'],
        tags: ['Vegetarian', 'Paneer Biryani']
      },
      {
        name: 'Mayukha Special Egg Dum Biryani',
        slug: 'mayukha-special-egg-dum-biryani',
        categoryId: categoryMap['biryani'],
        price: 290,
        description: 'Hard-boiled eggs cooked in aromatic biryani gravies and dum-sealed with spiced long-grain basmati rice.',
        isVeg: false,
        spiceLevel: 2,
        isChefSpecial: false,
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
        allergenInfo: ['Egg'],
        tags: ['Egg Special', 'Dum Biryani']
      },

      // 4. Desserts
      {
        name: 'Double Ka Meetha',
        slug: 'double-ka-meetha',
        categoryId: categoryMap['desserts'],
        price: 180,
        description: 'Authentic Hyderabadi royal dessert made of fried bread soaked in saffron-infused rabri topped with pistachios.',
        isVeg: true,
        spiceLevel: 0,
        isChefSpecial: true,
        image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
        allergenInfo: ['Dairy', 'Nuts', 'Gluten'],
        tags: ['Dessert', 'Hyderabadi Classic']
      },
      {
        name: 'Qubani Ka Meetha with Vanilla Cream',
        slug: 'qubani-ka-meetha',
        categoryId: categoryMap['desserts'],
        price: 210,
        description: 'Traditional Hyderabadi delicacy made of stewed apricots served with rich vanilla ice cream.',
        isVeg: true,
        spiceLevel: 0,
        isChefSpecial: true,
        image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80',
        allergenInfo: ['Dairy', 'Nuts'],
        tags: ['Hyderabadi Classic', 'Dessert']
      },
      {
        name: 'Gulab Jamun with Creamy Rabri (2 Pcs)',
        slug: 'gulab-jamun-with-rabri',
        categoryId: categoryMap['desserts'],
        price: 160,
        description: 'Soft golden milk-solid dumplings soaked in rose-cardamom syrup and served over thick saffron rabri.',
        isVeg: true,
        spiceLevel: 0,
        isChefSpecial: false,
        image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80',
        allergenInfo: ['Dairy', 'Gluten', 'Nuts'],
        tags: ['Dessert', 'Sweet']
      },
      {
        name: 'Special Hyderabadi Mango Lassi',
        slug: 'special-hyderabadi-mango-lassi',
        categoryId: categoryMap['desserts'],
        price: 130,
        description: 'Chilled thick sweet yogurt smoothie blended with ripe mango pulp and topped with saffron and chopped almonds.',
        isVeg: true,
        spiceLevel: 0,
        isChefSpecial: false,
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
        allergenInfo: ['Dairy', 'Nuts'],
        tags: ['Beverage', 'Cooler']
      },

      // 5. Banquet Booking Slots
      {
        name: 'KPHB Grand Banquet Evening Slot (50 - 200 Guests)',
        slug: 'kphb-grand-banquet-evening-slot',
        categoryId: categoryMap['banquet-slots'],
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
        name: 'Kokapet Luxury Banquet Lunch Slot (50 - 150 Guests)',
        slug: 'kokapet-luxury-banquet-lunch-slot',
        categoryId: categoryMap['banquet-slots'],
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
        name: 'Outdoor Premium Catering Slot (20+ Guests)',
        slug: 'outdoor-premium-catering-slot',
        categoryId: categoryMap['banquet-slots'],
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

    await MenuItem.insertMany(menuItemsData);
    console.log(`🍲 Seeded ${menuItemsData.length} Menu Items for 5 requested categories.`);

    await Testimonial.insertMany(testimonialsData);
    console.log(`⭐ Seeded ${testimonialsData.length} Verified Customer Testimonials.`);

    await Reservation.create({
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
      specialRequests: 'High chair for toddler, anniversary celebration.'
    });

    await BanquetEnquiry.create({
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
    });

    console.log('✨ Seed script completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database Seeding Failed:', error);
    process.exit(1);
  }
};

seedDatabase();
