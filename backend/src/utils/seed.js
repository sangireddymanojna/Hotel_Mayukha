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
    name: "Special Curries & Roti's",
    slug: 'special-curries',
    description: 'Rich, creamy and spiced regional curries and gravies cooked with premium ingredients.',
    displayOrder: 4,
    icon: 'Utensils'
  },
  {
    name: 'Desserts',
    slug: 'desserts',
    description: 'Traditional Hyderabadi desserts and chilled sweet beverages.',
    displayOrder: 5,
    icon: 'IceCream'
  },
  {
    name: 'Mocktails',
    slug: 'mocktails',
    description: 'Handcrafted refreshing coolers, sparkling mojitos, and fruit lemonades.',
    displayOrder: 6,
    icon: 'Wine'
  },
  {
    name: 'Banquet Booking Slots',
    slug: 'banquet-slots',
    description: 'Reserve prime hall booking slots for corporate dinners, wedding receptions, and catering.',
    displayOrder: 7,
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
        name: 'Veg Sweetcorn Soup',
        slug: 'veg-sweetcorn-soup',
        categoryId: categoryMap['soups'],
        price: 170,
        description: 'Velvety comforting broth with crushed sweet corn kernels, spring onions, diced vegetables, and subtle white pepper seasoning.',
        isVeg: true,
        spiceLevel: 0,
        isChefSpecial: true,
        image: '/images/dishes/sweetcorn-soup.jpg',
        allergenInfo: ['None'],
        tags: ['Soup', 'Vegetarian', 'Chef Special', 'Comfort Food']
      },
      {
        name: 'Sweet Corn Chicken Soup',
        slug: 'sweet-corn-chicken-soup',
        categoryId: categoryMap['soups'],
        price: 190,
        description: 'Piping hot velvety soup blend with crushed sweet corn kernels, tender chicken shreds, and cracked white pepper.',
        isVeg: false,
        spiceLevel: 0,
        isChefSpecial: false,
        image: '/images/dishes/sweet-corn-chicken-soup.jpg',
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
        image: '/images/dishes/mutton-paya-soup.jpg',
        allergenInfo: ['None'],
        tags: ['Authentic Broth', 'Hyderabadi Classic']
      },
      {
        name: 'Potato Vegetable Soup',
        slug: 'potato-vegetable-soup',
        categoryId: categoryMap['soups'],
        price: 180,
        description: 'Hearty wholesome broth loaded with tender diced potatoes, garden fresh green peas, sweet carrots, and fragrant herbs.',
        isVeg: true,
        spiceLevel: 1,
        isChefSpecial: true,
        image: '/images/dishes/potato-vegetable-soup.jpg',
        allergenInfo: ['None'],
        tags: ['Soup', 'Vegetarian', 'Hearty', 'Comfort Food']
      },
      {
        name: 'Creamy Pasta Veggie Soup',
        slug: 'creamy-pasta-veggie-soup',
        categoryId: categoryMap['soups'],
        price: 210,
        description: 'Rich and savory vegetable broth featuring tender rotini pasta, crisp carrots, green beans, and fresh herbs.',
        isVeg: true,
        spiceLevel: 1,
        isChefSpecial: true,
        image: '/images/dishes/creamy-pasta-veggie-soup.jpg',
        allergenInfo: ['Gluten'],
        tags: ['Soup', 'Vegetarian', 'Pasta', 'Chef Special']
      },
      {
        name: 'Classic Egg Drop Soup',
        slug: 'egg-drop-soup',
        categoryId: categoryMap['soups'],
        price: 195,
        description: 'Silky, flavorful golden broth with delicate ribbons of beaten eggs, garnished with freshly chopped scallions.',
        isVeg: false,
        spiceLevel: 0,
        isChefSpecial: false,
        image: '/images/dishes/egg-drop-soup.jpg',
        allergenInfo: ['Egg'],
        tags: ['Soup', 'Egg Special', 'Comfort Food']
      },
      {
        name: 'Creamy Shrimp Soup',
        slug: 'creamy-shrimp-soup',
        categoryId: categoryMap['soups'],
        price: 280,
        description: 'Rich, velvety cream broth simmered with succulent jumbo prawns, fresh spinach leaves, garlic, and aromatic herbs.',
        isVeg: false,
        spiceLevel: 1,
        isChefSpecial: true,
        image: '/images/dishes/creamy-shrimp-soup.png',
        allergenInfo: ['Shellfish', 'Dairy'],
        tags: ['Soup', 'Seafood', 'Chef Special', 'Rich & Creamy']
      },
      {
        name: 'French Seafood Stew',
        slug: 'french-seafood-stew',
        categoryId: categoryMap['soups'],
        price: 320,
        description: 'Classic French bouillabaisse-style seafood stew loaded with tender prawns, mussels, tomatoes, and aromatic herbs, served with toasted rustic bread.',
        isVeg: false,
        spiceLevel: 1,
        isChefSpecial: true,
        image: '/images/dishes/french-seafood-stew.jpg',
        allergenInfo: ['Shellfish', 'Gluten'],
        tags: ['Soup', 'Seafood', 'French Classic', 'Gourmet']
      },

      // 2. Starters
      {
        name: 'Veg Manchuria Gravy',
        slug: 'veg-manchuria-gravy',
        categoryId: categoryMap['starters'],
        price: 270,
        description: 'Golden fried mixed vegetable dumplings simmered in rich tangy garlic soy Manchurian sauce topped with fresh spring onions.',
        isVeg: true,
        spiceLevel: 2,
        isChefSpecial: true,
        image: '/images/dishes/veg-manchuria.jpg',
        allergenInfo: ['Soy', 'Gluten'],
        tags: ['Starter', 'Vegetarian', 'Indo-Chinese', 'Bestseller']
      },
      {
        name: 'Mayukha Special Grilled Chicken',
        slug: 'mayukha-special-grilled-chicken',
        categoryId: categoryMap['starters'],
        price: 410,
        description: 'Juicy chicken thighs marinated in smoked paprika, herbs, and lemon zest, slow-grilled over open charcoal flames served with mint chutney and lime.',
        isVeg: false,
        spiceLevel: 2,
        isChefSpecial: true,
        image: '/images/dishes/grilled-chicken.jpg',
        allergenInfo: ['None'],
        tags: ['Starter', 'Barbeque', 'Grill Special', 'Chef Special']
      },
      {
        name: 'Crispy Chicken Manchurian Gravy',
        slug: 'crispy-chicken-manchurian',
        categoryId: categoryMap['starters'],
        price: 340,
        description: 'Bite-sized crispy chicken fritters tossed in thick tangy garlic-soy Manchurian sauce topped with fresh spring onions and red chillies.',
        isVeg: false,
        spiceLevel: 2,
        isChefSpecial: true,
        image: '/images/dishes/chicken-manchuria.jpg',
        allergenInfo: ['Soy', 'Gluten'],
        tags: ['Starter', 'Indo-Chinese', 'Chicken', 'Bestseller']
      },
      {
        name: 'Special Indo-Chinese Chilli Chicken',
        slug: 'special-chilli-chicken',
        categoryId: categoryMap['starters'],
        price: 350,
        description: 'Deep-fried marinated chicken chunks tossed with bell peppers, green chillies, onions, dark soy sauce, and sesame crunch.',
        isVeg: false,
        spiceLevel: 3,
        isChefSpecial: true,
        image: '/images/dishes/chilli-chicken.jpg',
        allergenInfo: ['Soy', 'Gluten', 'Sesame'],
        tags: ['Starter', 'Indo-Chinese', 'Spicy', 'Chef Special']
      },
      {
        name: 'Sautéed Garlic Butter Mushrooms',
        slug: 'garlic-butter-mushroom',
        categoryId: categoryMap['starters'],
        price: 310,
        description: 'Fresh button mushrooms pan-sautéed in rich golden garlic butter, cracked black pepper, and fresh parsley herbs.',
        isVeg: true,
        spiceLevel: 1,
        isChefSpecial: true,
        image: '/images/dishes/garlic-butter-mushroom.jpg',
        allergenInfo: ['Dairy'],
        tags: ['Starter', 'Vegetarian', 'Garlic Butter', 'Chef Special']
      },
      {
        name: 'Apollo Fish Fry',
        slug: 'apollo-fish-fry',
        categoryId: categoryMap['starters'],
        price: 390,
        description: 'Iconic Hyderabadi street style boneless fish fillets battered, deep-fried, and tossed in spicy yogurt, curry leaves, and green chillies.',
        isVeg: false,
        spiceLevel: 3,
        isChefSpecial: true,
        image: '/images/dishes/apollo-fish-fry.jpg',
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
        image: '/images/dishes/crispy-gobi-65.jpg',
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
        image: '/images/dishes/tangdi-kebab.png',
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
        image: '/images/dishes/crispy-loose-prawns.jpg',
        allergenInfo: ['Seafood'],
        tags: ['Seafood', 'Spicy']
      },
      {
        name: 'Special Barbeque Paneer Tikka',
        slug: 'paneer-tikka-barbeque',
        categoryId: categoryMap['starters'],
        price: 330,
        description: 'Fresh cottage cheese cubes, onions, and bell peppers marinated in rich smoky tandoori spices, skewered and grilled over charcoal embers.',
        isVeg: true,
        spiceLevel: 2,
        isChefSpecial: true,
        image: '/images/dishes/paneer-tikka-barbeque.jpg',
        allergenInfo: ['Dairy'],
        tags: ['Vegetarian', 'Tandoor', 'Barbeque', 'Chef Special']
      },
      {
        name: 'Mayukha Special Chicken Lollipop (6 Pcs)',
        slug: 'mayukha-special-chicken-lollipop',
        categoryId: categoryMap['starters'],
        price: 390,
        description: 'Crispy fried frenched chicken wing lollipops tossed in spicy garlic red sauce, served with lemon wedges and mint dip.',
        isVeg: false,
        spiceLevel: 2,
        isChefSpecial: true,
        image: '/images/dishes/chicken-lollipop.jpg',
        allergenInfo: ['Gluten'],
        tags: ['Starter', 'Chicken Special', 'Bestseller']
      },
      {
        name: 'Special Mutton Ghee Roast',
        slug: 'special-mutton-ghee-roast',
        categoryId: categoryMap['starters'],
        price: 450,
        description: 'Succulent mutton chunks slow-roasted in pure deshi ghee, crushed Mangalorean spice mix, garlic, and curry leaves.',
        isVeg: false,
        spiceLevel: 3,
        isChefSpecial: true,
        image: '/images/dishes/mutton-ghee-roast.jpg',
        allergenInfo: ['Dairy'],
        tags: ['Starter', 'Mutton Special', 'Ghee Roast', 'Chef Special']
      },
      {
        name: 'Crispy Chilli Babycorn',
        slug: 'crispy-chilli-babycorn',
        categoryId: categoryMap['starters'],
        price: 290,
        description: 'Crispy fried tender baby corn tossed in dark soy sauce, spicy garlic chillies, capsicum, and fresh coriander herbs.',
        isVeg: true,
        spiceLevel: 2,
        isChefSpecial: true,
        image: '/images/dishes/chilli-babycorn.jpg',
        allergenInfo: ['Soy', 'Gluten'],
        tags: ['Vegetarian', 'Indo-Chinese', 'Starter', 'Crispy']
      },

      // 3. Biryanis (6 Options with authentic Biryani photography)
      {
        name: 'Royal Hyderabadi Nalli Ghosht Biryani',
        slug: 'royal-nalli-ghosht-biryani',
        categoryId: categoryMap['biryani'],
        price: 540,
        description: 'Slow-cooked juicy lamb shank (Nalli) in rich gravy layered over fragrant saffron basmati rice with whole spices and fresh herbs.',
        isVeg: false,
        spiceLevel: 2,
        isChefSpecial: true,
        image: '/images/dishes/nalli-ghosht-biryani.jpg',
        allergenInfo: ['Dairy'],
        tags: ['Biryani', 'Nalli Ghosht', 'Royal', 'Chef Special', 'Bestseller']
      },
      {
        name: 'Special Mixed Veg Pulav',
        slug: 'special-mixed-veg-pulav',
        categoryId: categoryMap['biryani'],
        price: 310,
        description: 'Fragrant basmati rice cooked with garden-fresh vegetables, whole spices, fried onions, mint, and pure ghee served in an earthenware bowl.',
        isVeg: true,
        spiceLevel: 1,
        isChefSpecial: true,
        image: '/images/dishes/mixed-veg-pulav.jpg',
        allergenInfo: ['None'],
        tags: ['Pulav', 'Vegetarian', 'Chef Special', 'Comfort Food']
      },
      {
        name: 'Mayukha Special Mixed Royal Biryani',
        slug: 'mayukha-special-mixed-biryani',
        categoryId: categoryMap['biryani'],
        price: 520,
        description: 'Royal feast of basmati rice dum-cooked with tender mutton shanks, juicy chicken pieces, roasted cashews, raisins, and hard-boiled eggs.',
        isVeg: false,
        spiceLevel: 2,
        isChefSpecial: true,
        image: '/images/dishes/mayukha-special-mixed-biryani.jpg',
        allergenInfo: ['Nuts', 'Egg'],
        tags: ['Biryani', 'Royal Feast', 'Chef Special', 'Bestseller']
      },
      {
        name: 'Spicy Chicken 65 Dum Biryani',
        slug: 'spicy-chicken-65-biryani',
        categoryId: categoryMap['biryani'],
        price: 420,
        description: 'Crispy spicy Hyderabadi Chicken 65 pieces layered over saffron basmati rice with aromatic biryani spices and sliced boiled egg.',
        isVeg: false,
        spiceLevel: 3,
        isChefSpecial: true,
        image: '/images/dishes/spicy-chicken-65-biryani.jpg',
        allergenInfo: ['Egg', 'Gluten'],
        tags: ['Biryani', 'Chicken 65', 'Spicy', 'Chef Special']
      },
      {
        name: 'Hyderabadi Special Chicken Dum Biryani',
        slug: 'hyderabadi-special-chicken-dum-biryani',
        categoryId: categoryMap['biryani'],
        price: 380,
        description: 'Long-grain basmati rice layered with succulent marinated chicken, saffron, mint, and secret Mayukha spices sealed in dum.',
        isVeg: false,
        spiceLevel: 2,
        isChefSpecial: true,
        image: '/images/dishes/hyderabadi-chicken-dum-biryani.jpg',
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
        image: '/images/dishes/mutton-dum-biryani.png',
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
        image: '/images/dishes/special-boneless-chicken-biryani.jpg',
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
        image: '/images/dishes/ulavacharu-chicken-biryani.png',
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
        image: '/images/dishes/paneer-tikka-dum-biryani.jpg',
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
        image: '/images/dishes/egg-dum-biryani.jpg',
        allergenInfo: ['Egg'],
        tags: ['Egg Special', 'Dum Biryani']
      },
      {
        name: 'Mushroom Dum Biryani',
        slug: 'mushroom-dum-biryani',
        categoryId: categoryMap['biryani'],
        price: 310,
        description: 'Fresh button mushrooms and green peas sauteed in biryani spices, dum-cooked with fragrant long-grain basmati rice.',
        isVeg: true,
        spiceLevel: 1,
        isChefSpecial: false,
        image: '/images/dishes/mushroom-biryani.jpg',
        allergenInfo: ['None'],
        tags: ['Vegetarian', 'Mushroom', 'Biryani']
      },

      // 4. Special Curries/Gravies
      {
        name: 'Veg Paneer Butter Masala',
        slug: 'veg-paneer-butter-masala',
        categoryId: categoryMap['special-curries'],
        price: 330,
        description: 'Fresh cottage cheese cubes simmered in rich creamy tomato butter sauce with cashew paste and aromatic spices.',
        isVeg: true,
        spiceLevel: 1,
        isChefSpecial: true,
        image: '/images/dishes/paneer-butter-masala.jpg',
        allergenInfo: ['Dairy', 'Nuts'],
        tags: ['Special Curry', 'Vegetarian', 'Chef Special']
      },
      {
        name: 'Special Mutton Masala Curry',
        slug: 'special-mutton-masala-curry',
        categoryId: categoryMap['special-curries'],
        price: 440,
        description: 'Tender mutton bone-in pieces slow-cooked in thick spicy Hyderabadi onion-tomato gravy with roasted whole spices.',
        isVeg: false,
        spiceLevel: 3,
        isChefSpecial: true,
        image: '/images/dishes/special-mutton-masala-curry.jpg',
        allergenInfo: ['None'],
        tags: ['Special Curry', 'Non-Veg', 'Chef Special', 'Spicy']
      },
      {
        name: 'Special Chicken Curry',
        slug: 'special-chicken-curry',
        categoryId: categoryMap['special-curries'],
        price: 380,
        description: 'Traditional slow-simmered chicken curry cooked in aromatic brass handi with roasted spices, ginger, and fresh coriander.',
        isVeg: false,
        spiceLevel: 2,
        isChefSpecial: true,
        image: '/images/dishes/special-chicken-curry.jpg',
        allergenInfo: ['None'],
        tags: ['Special Curry', 'Non-Veg', 'Chef Special']
      },
      {
        name: 'Veg Mushroom Masala',
        slug: 'veg-mushroom-masala',
        categoryId: categoryMap['special-curries'],
        price: 320,
        description: 'Fresh sliced button mushrooms cooked in rich spiced tomato-onion gravy garnished with green coriander herbs.',
        isVeg: true,
        spiceLevel: 2,
        isChefSpecial: false,
        image: '/images/dishes/mushroom-masala.png',
        allergenInfo: ['None'],
        tags: ['Special Curry', 'Vegetarian', 'Mushroom']
      },
      {
        name: 'Authentic Andhra Style Fish Curry (Chepala Pulusu)',
        slug: 'andhra-style-fish-curry',
        categoryId: categoryMap['special-curries'],
        price: 390,
        description: 'Fresh river fish steaks simmered in tangy tamarind, roasted Guntur red chillies, onions, garlic, and aromatic curry leaves.',
        isVeg: false,
        spiceLevel: 3,
        isChefSpecial: true,
        image: '/images/dishes/andhra-fish-curry.jpg',
        allergenInfo: ['Seafood'],
        tags: ['Special Curry', 'Andhra Special', 'Seafood', 'Spicy']
      },
      {
        name: 'Special Hyderabadi Spicy Egg Curry',
        slug: 'spicy-egg-curry',
        categoryId: categoryMap['special-curries'],
        price: 240,
        description: 'Golden shallow-fried hard-boiled eggs simmered in rich spiced onion-tomato gravy with roasted whole spices and fresh coriander.',
        isVeg: false,
        spiceLevel: 2,
        isChefSpecial: true,
        image: '/images/dishes/spicy-egg-curry.jpg',
        allergenInfo: ['Egg'],
        tags: ['Special Curry', 'Egg Special', 'Spicy']
      },
      {
        name: 'Authentic Dhaba Style Palak Paneer',
        slug: 'dhaba-style-palak-paneer',
        categoryId: categoryMap['special-curries'],
        price: 340,
        description: 'Soft cottage cheese cubes simmered in vibrant garlic-infused spinach puree with fresh cream, butter, and authentic Indian spices.',
        isVeg: true,
        spiceLevel: 1,
        isChefSpecial: true,
        image: '/images/dishes/palak-paneer.jpg',
        allergenInfo: ['Dairy'],
        tags: ['Special Curry', 'Vegetarian', 'Palak Paneer', 'Chef Special']
      },
      {
        name: 'Mayukha Special Prawns Curry (Royyala Kura)',
        slug: 'special-prawns-curry',
        categoryId: categoryMap['special-curries'],
        price: 460,
        description: 'Fresh ocean prawns cooked in aromatic coconut tamarind gravy with curry leaves, green chillies, and crushed black pepper.',
        isVeg: false,
        spiceLevel: 2,
        isChefSpecial: true,
        image: '/images/dishes/prawns-curry.png',
        allergenInfo: ['Seafood'],
        tags: ['Special Curry', 'Seafood', 'Prawns', 'Chef Special']
      },
      {
        name: 'Butter Rumali Roti (2 Pcs)',
        slug: 'butter-rumali-roti',
        categoryId: categoryMap['special-curries'],
        price: 70,
        description: 'Ultra-thin, soft handkerchief-style Indian flatbread baked on an inverted tawa and brushed with fresh butter.',
        isVeg: true,
        spiceLevel: 0,
        isChefSpecial: true,
        image: '/images/dishes/rumali-roti.jpg',
        allergenInfo: ['Gluten', 'Dairy'],
        tags: ['Indian Bread', 'Vegetarian', 'Tawa Special']
      },
      {
        name: 'Special Butter Naan',
        slug: 'special-butter-naan',
        categoryId: categoryMap['special-curries'],
        price: 60,
        description: 'Soft tandoor-baked leavened Indian flatbread brushed generously with fresh creamy butter, served hot with gravy.',
        isVeg: true,
        spiceLevel: 0,
        isChefSpecial: true,
        image: '/images/dishes/butter-naan.jpg',
        allergenInfo: ['Gluten', 'Dairy'],
        tags: ['Indian Bread', 'Vegetarian', 'Tandoor Special', 'Bestseller']
      },

      // 5. Desserts
      {
        name: 'Double Ka Meetha',
        slug: 'double-ka-meetha',
        categoryId: categoryMap['desserts'],
        price: 180,
        description: 'Authentic Hyderabadi royal dessert made of fried bread soaked in saffron-infused rabri topped with pistachios.',
        isVeg: true,
        spiceLevel: 0,
        isChefSpecial: true,
        image: '/images/dishes/double-ka-meetha.png',
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
        image: '/images/dishes/qubani-ka-meetha.jpg',
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
        image: '/images/dishes/gulab-jamun-rabri.jpg',
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
        image: '/images/dishes/mango-lassi.png',
        allergenInfo: ['Dairy', 'Nuts'],
        tags: ['Beverage', 'Cooler']
      },
      {
        name: 'Royal Saffron Rasmalai (2 Pcs)',
        slug: 'royal-saffron-rasmalai',
        categoryId: categoryMap['desserts'],
        price: 190,
        description: 'Soft flattened cottage cheese patties soaked in thick cardamom saffron milk, garnished with pistachios, silver leaf, and rose petals.',
        isVeg: true,
        spiceLevel: 0,
        isChefSpecial: true,
        image: '/images/dishes/rasmalai.jpg',
        allergenInfo: ['Dairy', 'Nuts'],
        tags: ['Dessert', 'Royal Sweet', 'Chef Special']
      },
      {
        name: 'Special Dry Fruit Lassi',
        slug: 'special-dry-fruit-lassi',
        categoryId: categoryMap['desserts'],
        price: 150,
        description: 'Thick rich sweet yogurt blend garnished generously with chopped cashews, pistachios, almonds, saffron, and cardamoms.',
        isVeg: true,
        spiceLevel: 0,
        isChefSpecial: true,
        image: '/images/dishes/dry-fruit-lassi.png',
        allergenInfo: ['Dairy', 'Nuts'],
        tags: ['Beverage', 'Lassi', 'Dry Fruit', 'Chef Special']
      },

      // 6. Mocktails
      {
        name: 'Blue Mojito Mocktail',
        slug: 'blue-mojito-mocktail',
        categoryId: categoryMap['mocktails'],
        price: 160,
        description: 'Refreshing ocean blue mocktail infused with fresh mint leaves, lime juice, blue curacao syrup, and chilled sparkling soda.',
        isVeg: true,
        spiceLevel: 0,
        isChefSpecial: true,
        image: '/images/dishes/blue-mojito-mocktail.png',
        allergenInfo: ['None'],
        tags: ['Mocktail', 'Beverage', 'Bestseller', 'Refreshing']
      },
      {
        name: 'Strawberry Lemonade',
        slug: 'strawberry-lemonade',
        categoryId: categoryMap['mocktails'],
        price: 170,
        description: 'Hand-crafted sparkling lemonade infused with fresh crushed strawberries, mint leaves, lemon wedges, and ice splash.',
        isVeg: true,
        spiceLevel: 0,
        isChefSpecial: false,
        image: '/images/dishes/strawberry-lemonade.jpg',
        allergenInfo: ['None'],
        tags: ['Mocktail', 'Beverage', 'Fruity', 'Cooler']
      },
      {
        name: 'Lavender Mojito',
        slug: 'lavender-mojito',
        categoryId: categoryMap['mocktails'],
        price: 180,
        description: 'Elegant floral mocktail crafted with French lavender syrup, fresh crushed mint, lemon slices, and sparkling soda with sugar-rimmed glass.',
        isVeg: true,
        spiceLevel: 0,
        isChefSpecial: true,
        image: '/images/dishes/lavender-mojito.jpg',
        allergenInfo: ['None'],
        tags: ['Mocktail', 'Beverage', 'Chef Special', 'Floral']
      },

      // 7. Banquet Booking Slots
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
