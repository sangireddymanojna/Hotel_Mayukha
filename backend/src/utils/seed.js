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
    name: 'Soups & Appetizers',
    slug: 'soups-starters',
    description: 'Refreshing soups and crisp starter platters crafted with aromatic spices.',
    displayOrder: 1,
    icon: 'Soup'
  },
  {
    name: 'Signature Biryanis',
    slug: 'biryanis',
    description: 'World-famous authentic Hyderabadi Dum Biryanis cooked in traditional handis.',
    displayOrder: 2,
    icon: 'Flame'
  },
  {
    name: 'Tandoori & Kebabs',
    slug: 'tandoori-kebabs',
    description: 'Charcoal-grilled succulent chicken, mutton, paneer, and fish kebabs.',
    displayOrder: 3,
    icon: 'Drumstick'
  },
  {
    name: 'Curries & Gravies',
    slug: 'curries-gravies',
    description: 'Rich, slow-simmered royal Mughlai and regional Telangana curries.',
    displayOrder: 4,
    icon: 'Utensils'
  },
  {
    name: 'Indian Breads',
    slug: 'indian-breads',
    description: 'Freshly baked tandoori naans, rotis, and stuffed kulchas.',
    displayOrder: 5,
    icon: 'Wheat'
  },
  {
    name: 'Desserts & Beverages',
    slug: 'desserts-beverages',
    description: 'Traditional Hyderabadi desserts and chilled refreshing coolers.',
    displayOrder: 6,
    icon: 'IceCream'
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

    // Seed Menu Items (6 Biryanis & Full Category Items)
    const menuItemsData = [
      // 1. Soups & Appetizers
      {
        name: 'Sweet Corn Chicken Soup',
        slug: 'sweet-corn-chicken-soup',
        categoryId: categoryMap['soups-starters'],
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
        name: 'Apollo Fish Fry',
        slug: 'apollo-fish-fry',
        categoryId: categoryMap['soups-starters'],
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
        categoryId: categoryMap['soups-starters'],
        price: 260,
        description: 'Crispy fried cauliflower florets marinated in south Indian spices, garlic, ginger, and curry leaves.',
        isVeg: true,
        spiceLevel: 2,
        isChefSpecial: false,
        image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
        allergenInfo: ['Gluten'],
        tags: ['Vegetarian', 'Starter']
      },

      // 2. Biryanis (6 Options)
      {
        name: 'Hyderabadi Special Chicken Dum Biryani',
        slug: 'hyderabadi-special-chicken-dum-biryani',
        categoryId: categoryMap['biryanis'],
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
        categoryId: categoryMap['biryanis'],
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
        categoryId: categoryMap['biryanis'],
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
        categoryId: categoryMap['biryanis'],
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
        categoryId: categoryMap['biryanis'],
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
        categoryId: categoryMap['biryanis'],
        price: 290,
        description: 'Hard-boiled eggs cooked in aromatic biryani gravies and dum-sealed with spiced long-grain basmati rice.',
        isVeg: false,
        spiceLevel: 2,
        isChefSpecial: false,
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
        allergenInfo: ['Egg'],
        tags: ['Egg Special', 'Dum Biryani']
      },

      // 3. Tandoori & Kebabs
      {
        name: 'Mayukha Special Tangdi Kebab (4 Pcs)',
        slug: 'mayukha-special-tangdi-kebab',
        categoryId: categoryMap['tandoori-kebabs'],
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
        categoryId: categoryMap['tandoori-kebabs'],
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
        categoryId: categoryMap['tandoori-kebabs'],
        price: 310,
        description: 'Cottage cheese marinated in tangy pickling spices, bell peppers, and grilled over charcoal flames.',
        isVeg: true,
        spiceLevel: 2,
        isChefSpecial: false,
        image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80',
        allergenInfo: ['Dairy'],
        tags: ['Vegetarian', 'Achari']
      },

      // 4. Curries & Gravies
      {
        name: 'Butter Chicken Masala',
        slug: 'butter-chicken-masala',
        categoryId: categoryMap['curries-gravies'],
        price: 360,
        description: 'Smoky tandoori chicken cooked in velvety tomato, butter, cashew gravy drizzled with fresh cream.',
        isVeg: false,
        spiceLevel: 1,
        isChefSpecial: false,
        image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80',
        allergenInfo: ['Dairy', 'Nuts'],
        tags: ['Creamy', 'Classic']
      },
      {
        name: 'Telangana Mutton Curry',
        slug: 'telangana-mutton-curry',
        categoryId: categoryMap['curries-gravies'],
        price: 470,
        description: 'Traditional rustic spicy mutton gravy cooked with dry coconut, coriander seeds, and local Guntur red chillies.',
        isVeg: false,
        spiceLevel: 3,
        isChefSpecial: true,
        image: 'https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=800&q=80',
        allergenInfo: ['None'],
        tags: ['Spicy', 'Regional Special']
      },
      {
        name: 'Kaju Paneer Curry',
        slug: 'kaju-paneer-curry',
        categoryId: categoryMap['curries-gravies'],
        price: 340,
        description: 'Fried cashews and fresh paneer cubes cooked in rich onion-tomato gravy with aromatic cardamom.',
        isVeg: true,
        spiceLevel: 1,
        isChefSpecial: false,
        image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80',
        allergenInfo: ['Dairy', 'Nuts'],
        tags: ['Vegetarian', 'Rich']
      },

      // 5. Breads
      {
        name: 'Butter Garlic Naan',
        slug: 'butter-garlic-naan',
        categoryId: categoryMap['indian-breads'],
        price: 75,
        description: 'Leavened refined flour flatbread baked in clay tandoor and brushed with garlic butter and fresh coriander.',
        isVeg: true,
        spiceLevel: 0,
        isChefSpecial: false,
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
        allergenInfo: ['Gluten', 'Dairy'],
        tags: ['Breads', 'Tandoori']
      },
      {
        name: 'Amritsari Paneer Kulcha',
        slug: 'amritsari-paneer-kulcha',
        categoryId: categoryMap['indian-breads'],
        price: 95,
        description: 'Crisp layered tandoori flatbread stuffed with spiced cottage cheese, onions, and pomegranate seeds.',
        isVeg: true,
        spiceLevel: 1,
        isChefSpecial: false,
        image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=800&q=80',
        allergenInfo: ['Gluten', 'Dairy'],
        tags: ['Stuffed Bread', 'Kulcha']
      },

      // 6. Desserts & Beverages
      {
        name: 'Double Ka Meetha',
        slug: 'double-ka-meetha',
        categoryId: categoryMap['desserts-beverages'],
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
        categoryId: categoryMap['desserts-beverages'],
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
        name: 'Special Hyderabadi Mango Lassi',
        slug: 'special-hyderabadi-mango-lassi',
        categoryId: categoryMap['desserts-beverages'],
        price: 130,
        description: 'Chilled thick sweet yogurt smoothie blended with ripe mango pulp and topped with saffron and chopped almonds.',
        isVeg: true,
        spiceLevel: 0,
        isChefSpecial: false,
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
        allergenInfo: ['Dairy', 'Nuts'],
        tags: ['Beverage', 'Cooler']
      }
    ];

    await MenuItem.insertMany(menuItemsData);
    console.log(`🍲 Seeded ${menuItemsData.length} Menu Items including 6 biryanis with matched photos.`);

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
