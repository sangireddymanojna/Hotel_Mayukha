import { MenuCategory, MenuItem, Reservation, BanquetEnquiry, Testimonial } from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

// Exact 5 requested categories for Menu Page
export const MOCK_CATEGORIES: MenuCategory[] = [
  { _id: 'cat-soups', name: 'Soups', slug: 'soups', displayOrder: 1, icon: 'Soup' },
  { _id: 'cat-starters', name: 'Starters', slug: 'starters', displayOrder: 2, icon: 'Drumstick' },
  { _id: 'cat-biryani', name: 'Biryanis', slug: 'biryani', displayOrder: 3, icon: 'Flame' },
  { _id: 'cat-curries', name: "Special Curries & Roti's", slug: 'special-curries', displayOrder: 4, icon: 'Utensils' },
  { _id: 'cat-desserts', name: 'Desserts', slug: 'desserts', displayOrder: 5, icon: 'IceCream' },
  { _id: 'cat-mocktails', name: 'Mocktails', slug: 'mocktails', displayOrder: 6, icon: 'Wine' },
  { _id: 'cat-banquet', name: 'Banquet Booking Slots', slug: 'banquet-slots', displayOrder: 7, icon: 'Users' }
];

export const MOCK_MENU_ITEMS: MenuItem[] = [
  // 1. Soups Category
  {
    _id: 'menu-sp-veg-1',
    name: 'Veg Sweetcorn Soup',
    slug: 'veg-sweetcorn-soup',
    categoryId: 'cat-soups',
    price: 170,
    description: 'Velvety comforting broth with crushed sweet corn kernels, spring onions, diced vegetables, and subtle white pepper seasoning.',
    isVeg: true,
    spiceLevel: 0,
    isAvailable: true,
    isChefSpecial: true,
    image: '/images/dishes/sweetcorn-soup.jpg',
    allergenInfo: ['None'],
    tags: ['Soup', 'Vegetarian', 'Chef Special', 'Comfort Food']
  },
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
    image: '/images/dishes/sweet-corn-chicken-soup.jpg',
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
    image: '/images/dishes/mutton-paya-soup.jpg',
    allergenInfo: ['None'],
    tags: ['Authentic Broth', 'Hyderabadi Classic']
  },
  {
    _id: 'menu-sp-5',
    name: 'Potato Vegetable Soup',
    slug: 'potato-vegetable-soup',
    categoryId: 'cat-soups',
    price: 180,
    description: 'Hearty wholesome broth loaded with tender diced potatoes, garden fresh green peas, sweet carrots, and fragrant herbs.',
    isVeg: true,
    spiceLevel: 1,
    isAvailable: true,
    isChefSpecial: true,
    image: '/images/dishes/potato-vegetable-soup.jpg',
    allergenInfo: ['None'],
    tags: ['Soup', 'Vegetarian', 'Hearty', 'Comfort Food']
  },
  {
    _id: 'menu-sp-6',
    name: 'Creamy Pasta Veggie Soup',
    slug: 'creamy-pasta-veggie-soup',
    categoryId: 'cat-soups',
    price: 210,
    description: 'Rich and savory vegetable broth featuring tender rotini pasta, crisp carrots, green beans, and fresh herbs.',
    isVeg: true,
    spiceLevel: 1,
    isAvailable: true,
    isChefSpecial: true,
    image: '/images/dishes/creamy-pasta-veggie-soup.jpg',
    allergenInfo: ['Gluten'],
    tags: ['Soup', 'Vegetarian', 'Pasta', 'Chef Special']
  },
  {
    _id: 'menu-sp-7',
    name: 'Classic Egg Drop Soup',
    slug: 'egg-drop-soup',
    categoryId: 'cat-soups',
    price: 195,
    description: 'Silky, flavorful golden broth with delicate ribbons of beaten eggs, garnished with freshly chopped scallions.',
    isVeg: false,
    spiceLevel: 0,
    isAvailable: true,
    isChefSpecial: false,
    image: '/images/dishes/egg-drop-soup.jpg',
    allergenInfo: ['Egg'],
    tags: ['Soup', 'Egg Special', 'Comfort Food']
  },
  {
    _id: 'menu-sp-8',
    name: 'Creamy Shrimp Soup',
    slug: 'creamy-shrimp-soup',
    categoryId: 'cat-soups',
    price: 280,
    description: 'Rich, velvety cream broth simmered with succulent jumbo prawns, fresh spinach leaves, garlic, and aromatic herbs.',
    isVeg: false,
    spiceLevel: 1,
    isAvailable: true,
    isChefSpecial: true,
    image: '/images/dishes/creamy-shrimp-soup.png',
    allergenInfo: ['Shellfish', 'Dairy'],
    tags: ['Soup', 'Seafood', 'Chef Special', 'Rich & Creamy']
  },
  {
    _id: 'menu-sp-9',
    name: 'French Seafood Stew',
    slug: 'french-seafood-stew',
    categoryId: 'cat-soups',
    price: 320,
    description: 'Classic French bouillabaisse-style seafood stew loaded with tender prawns, mussels, tomatoes, and aromatic herbs, served with toasted rustic bread.',
    isVeg: false,
    spiceLevel: 1,
    isAvailable: true,
    isChefSpecial: true,
    image: '/images/dishes/french-seafood-stew.jpg',
    allergenInfo: ['Shellfish', 'Gluten'],
    tags: ['Soup', 'Seafood', 'French Classic', 'Gourmet']
  },


  // 2. Starters Category
  {
    _id: 'menu-str-vm',
    name: 'Veg Manchuria Gravy',
    slug: 'veg-manchuria-gravy',
    categoryId: 'cat-starters',
    price: 270,
    description: 'Golden fried mixed vegetable dumplings simmered in rich tangy garlic soy Manchurian sauce topped with fresh spring onions.',
    isVeg: true,
    spiceLevel: 2,
    isAvailable: true,
    isChefSpecial: true,
    image: '/images/dishes/veg-manchuria.jpg',
    allergenInfo: ['Soy', 'Gluten'],
    tags: ['Starter', 'Vegetarian', 'Indo-Chinese', 'Bestseller']
  },
  {
    _id: 'menu-str-gc',
    name: 'Mayukha Special Grilled Chicken',
    slug: 'mayukha-special-grilled-chicken',
    categoryId: 'cat-starters',
    price: 410,
    description: 'Juicy chicken thighs marinated in smoked paprika, herbs, and lemon zest, slow-grilled over open charcoal flames served with mint chutney and lime.',
    isVeg: false,
    spiceLevel: 2,
    isAvailable: true,
    isChefSpecial: true,
    image: '/images/dishes/grilled-chicken.jpg',
    allergenInfo: ['None'],
    tags: ['Starter', 'Barbeque', 'Grill Special', 'Chef Special']
  },
  {
    _id: 'menu-str-cm',
    name: 'Crispy Chicken Manchurian Gravy',
    slug: 'crispy-chicken-manchurian',
    categoryId: 'cat-starters',
    price: 340,
    description: 'Bite-sized crispy chicken fritters tossed in thick tangy garlic-soy Manchurian sauce topped with fresh spring onions and red chillies.',
    isVeg: false,
    spiceLevel: 2,
    isAvailable: true,
    isChefSpecial: true,
    image: '/images/dishes/chicken-manchuria.jpg',
    allergenInfo: ['Soy', 'Gluten'],
    tags: ['Starter', 'Indo-Chinese', 'Chicken', 'Bestseller']
  },
  {
    _id: 'menu-str-cc',
    name: 'Special Indo-Chinese Chilli Chicken',
    slug: 'special-chilli-chicken',
    categoryId: 'cat-starters',
    price: 350,
    description: 'Deep-fried marinated chicken chunks tossed with bell peppers, green chillies, onions, dark soy sauce, and sesame crunch.',
    isVeg: false,
    spiceLevel: 3,
    isAvailable: true,
    isChefSpecial: true,
    image: '/images/dishes/chilli-chicken.jpg',
    allergenInfo: ['Soy', 'Gluten', 'Sesame'],
    tags: ['Starter', 'Indo-Chinese', 'Spicy', 'Chef Special']
  },
  {
    _id: 'menu-str-gbm',
    name: 'Sautéed Garlic Butter Mushrooms',
    slug: 'garlic-butter-mushroom',
    categoryId: 'cat-starters',
    price: 310,
    description: 'Fresh button mushrooms pan-sautéed in rich golden garlic butter, cracked black pepper, and fresh parsley herbs.',
    isVeg: true,
    spiceLevel: 1,
    isAvailable: true,
    isChefSpecial: true,
    image: '/images/dishes/garlic-butter-mushroom.jpg',
    allergenInfo: ['Dairy'],
    tags: ['Starter', 'Vegetarian', 'Garlic Butter', 'Chef Special']
  },
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
    image: '/images/dishes/apollo-fish-fry.jpg',
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
    image: '/images/dishes/crispy-gobi-65.jpg',
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
    image: '/images/dishes/tangdi-kebab.png',
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
    image: '/images/dishes/crispy-loose-prawns.jpg',
    allergenInfo: ['Seafood'],
    tags: ['Seafood', 'Spicy']
  },
  {
    _id: 'menu-str-5',
    name: 'Special Barbeque Paneer Tikka',
    slug: 'paneer-tikka-barbeque',
    categoryId: 'cat-starters',
    price: 330,
    description: 'Fresh cottage cheese cubes, onions, and bell peppers marinated in rich smoky tandoori spices, skewered and grilled over charcoal embers.',
    isVeg: true,
    spiceLevel: 2,
    isAvailable: true,
    isChefSpecial: true,
    image: '/images/dishes/paneer-tikka-barbeque.jpg',
    allergenInfo: ['Dairy'],
    tags: ['Vegetarian', 'Tandoor', 'Barbeque', 'Chef Special']
  },
  {
    _id: 'menu-str-6',
    name: 'Mayukha Special Chicken Lollipop (6 Pcs)',
    slug: 'mayukha-special-chicken-lollipop',
    categoryId: 'cat-starters',
    price: 390,
    description: 'Crispy fried frenched chicken wing lollipops tossed in spicy garlic red sauce, served with lemon wedges and mint dip.',
    isVeg: false,
    spiceLevel: 2,
    isAvailable: true,
    isChefSpecial: true,
    image: '/images/dishes/chicken-lollipop.jpg',
    allergenInfo: ['Gluten'],
    tags: ['Starter', 'Chicken Special', 'Bestseller']
  },
  {
    _id: 'menu-str-7',
    name: 'Special Mutton Ghee Roast',
    slug: 'special-mutton-ghee-roast',
    categoryId: 'cat-starters',
    price: 450,
    description: 'Succulent mutton chunks slow-roasted in pure deshi ghee, crushed Mangalorean spice mix, garlic, and curry leaves.',
    isVeg: false,
    spiceLevel: 3,
    isAvailable: true,
    isChefSpecial: true,
    image: '/images/dishes/mutton-ghee-roast.jpg',
    allergenInfo: ['Dairy'],
    tags: ['Starter', 'Mutton Special', 'Ghee Roast', 'Chef Special']
  },
  {
    _id: 'menu-str-8',
    name: 'Crispy Chilli Babycorn',
    slug: 'crispy-chilli-babycorn',
    categoryId: 'cat-starters',
    price: 290,
    description: 'Crispy fried tender baby corn tossed in dark soy sauce, spicy garlic chillies, capsicum, and fresh coriander herbs.',
    isVeg: true,
    spiceLevel: 2,
    isAvailable: true,
    isChefSpecial: true,
    image: '/images/dishes/chilli-babycorn.jpg',
    allergenInfo: ['Soy', 'Gluten'],
    tags: ['Vegetarian', 'Indo-Chinese', 'Starter', 'Crispy']
  },

  // 3. Biryanis Category (6 Distinct Biryanis with authentic Biryani photography)
  {
    _id: 'menu-bir-ngb',
    name: 'Royal Hyderabadi Nalli Ghosht Biryani',
    slug: 'royal-nalli-ghosht-biryani',
    categoryId: 'cat-biryani',
    price: 540,
    description: 'Slow-cooked juicy lamb shank (Nalli) in rich gravy layered over fragrant saffron basmati rice with whole spices and fresh herbs.',
    isVeg: false,
    spiceLevel: 2,
    isAvailable: true,
    isChefSpecial: true,
    image: '/images/dishes/nalli-ghosht-biryani.jpg',
    allergenInfo: ['Dairy'],
    tags: ['Biryani', 'Nalli Ghosht', 'Royal', 'Chef Special', 'Bestseller']
  },
  {
    _id: 'menu-bir-mvp',
    name: 'Special Mixed Veg Pulav',
    slug: 'special-mixed-veg-pulav',
    categoryId: 'cat-biryani',
    price: 310,
    description: 'Fragrant basmati rice cooked with garden-fresh vegetables, whole spices, fried onions, mint, and pure ghee served in an earthenware bowl.',
    isVeg: true,
    spiceLevel: 1,
    isAvailable: true,
    isChefSpecial: true,
    image: '/images/dishes/mixed-veg-pulav.jpg',
    allergenInfo: ['None'],
    tags: ['Pulav', 'Vegetarian', 'Chef Special', 'Comfort Food']
  },
  {
    _id: 'menu-bir-mb',
    name: 'Mayukha Special Mixed Royal Biryani',
    slug: 'mayukha-special-mixed-biryani',
    categoryId: 'cat-biryani',
    price: 520,
    description: 'Royal feast of basmati rice dum-cooked with tender mutton shanks, juicy chicken pieces, roasted cashews, raisins, and hard-boiled eggs.',
    isVeg: false,
    spiceLevel: 2,
    isAvailable: true,
    isChefSpecial: true,
    image: '/images/dishes/mayukha-special-mixed-biryani.jpg',
    allergenInfo: ['Nuts', 'Egg'],
    tags: ['Biryani', 'Royal Feast', 'Chef Special', 'Bestseller']
  },
  {
    _id: 'menu-bir-c65',
    name: 'Spicy Chicken 65 Dum Biryani',
    slug: 'spicy-chicken-65-biryani',
    categoryId: 'cat-biryani',
    price: 420,
    description: 'Crispy spicy Hyderabadi Chicken 65 pieces layered over saffron basmati rice with aromatic biryani spices and sliced boiled egg.',
    isVeg: false,
    spiceLevel: 3,
    isAvailable: true,
    isChefSpecial: true,
    image: '/images/dishes/spicy-chicken-65-biryani.jpg',
    allergenInfo: ['Egg', 'Gluten'],
    tags: ['Biryani', 'Chicken 65', 'Spicy', 'Chef Special']
  },
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
    image: '/images/dishes/hyderabadi-chicken-dum-biryani.jpg',
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
    image: '/images/dishes/mutton-dum-biryani.png',
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
    image: '/images/dishes/special-boneless-chicken-biryani.jpg',
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
    image: '/images/dishes/ulavacharu-chicken-biryani.png',
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
    image: '/images/dishes/paneer-tikka-dum-biryani.jpg',
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
    image: '/images/dishes/egg-dum-biryani.jpg',
    allergenInfo: ['Egg'],
    tags: ['Egg Special', 'Dum Biryani']
  },
  {
    _id: 'menu-bir-7',
    name: 'Mushroom Dum Biryani',
    slug: 'mushroom-dum-biryani',
    categoryId: 'cat-biryani',
    price: 310,
    description: 'Fresh button mushrooms and green peas sauteed in biryani spices, dum-cooked with fragrant long-grain basmati rice.',
    isVeg: true,
    spiceLevel: 1,
    isAvailable: true,
    isChefSpecial: false,
    image: '/images/dishes/mushroom-biryani.jpg',
    allergenInfo: ['None'],
    tags: ['Vegetarian', 'Mushroom', 'Biryani']
  },

  // 4. Special Curries/Gravies Category
  {
    _id: 'menu-curry-1',
    name: 'Veg Paneer Butter Masala',
    slug: 'veg-paneer-butter-masala',
    categoryId: 'cat-curries',
    price: 330,
    description: 'Fresh cottage cheese cubes simmered in rich creamy tomato butter sauce with cashew paste and aromatic spices.',
    isVeg: true,
    spiceLevel: 1,
    isAvailable: true,
    isChefSpecial: true,
    image: '/images/dishes/paneer-butter-masala.jpg',
    allergenInfo: ['Dairy', 'Nuts'],
    tags: ['Special Curry', 'Vegetarian', 'Chef Special']
  },
  {
    _id: 'menu-curry-2',
    name: 'Special Mutton Masala Curry',
    slug: 'special-mutton-masala-curry',
    categoryId: 'cat-curries',
    price: 440,
    description: 'Tender mutton bone-in pieces slow-cooked in thick spicy Hyderabadi onion-tomato gravy with roasted whole spices.',
    isVeg: false,
    spiceLevel: 3,
    isAvailable: true,
    isChefSpecial: true,
    image: '/images/dishes/special-mutton-masala-curry.jpg',
    allergenInfo: ['None'],
    tags: ['Special Curry', 'Non-Veg', 'Chef Special', 'Spicy']
  },
  {
    _id: 'menu-curry-3',
    name: 'Special Chicken Curry',
    slug: 'special-chicken-curry',
    categoryId: 'cat-curries',
    price: 380,
    description: 'Traditional slow-simmered chicken curry cooked in aromatic brass handi with roasted spices, ginger, and fresh coriander.',
    isVeg: false,
    spiceLevel: 2,
    isAvailable: true,
    isChefSpecial: true,
    image: '/images/dishes/special-chicken-curry.jpg',
    allergenInfo: ['None'],
    tags: ['Special Curry', 'Non-Veg', 'Chef Special']
  },
  {
    _id: 'menu-curry-4',
    name: 'Veg Mushroom Masala',
    slug: 'veg-mushroom-masala',
    categoryId: 'cat-curries',
    price: 320,
    description: 'Fresh sliced button mushrooms cooked in rich spiced tomato-onion gravy garnished with green coriander herbs.',
    isVeg: true,
    spiceLevel: 2,
    isAvailable: true,
    isChefSpecial: false,
    image: '/images/dishes/mushroom-masala.png',
    allergenInfo: ['None'],
    tags: ['Special Curry', 'Vegetarian', 'Mushroom']
  },
  {
    _id: 'menu-curry-afc',
    name: 'Authentic Andhra Style Fish Curry (Chepala Pulusu)',
    slug: 'andhra-style-fish-curry',
    categoryId: 'cat-curries',
    price: 390,
    description: 'Fresh river fish steaks simmered in tangy tamarind, roasted Guntur red chillies, onions, garlic, and aromatic curry leaves.',
    isVeg: false,
    spiceLevel: 3,
    isAvailable: true,
    isChefSpecial: true,
    image: '/images/dishes/andhra-fish-curry.jpg',
    allergenInfo: ['Seafood'],
    tags: ['Special Curry', 'Andhra Special', 'Seafood', 'Spicy']
  },
  {
    _id: 'menu-curry-sec',
    name: 'Special Hyderabadi Spicy Egg Curry',
    slug: 'spicy-egg-curry',
    categoryId: 'cat-curries',
    price: 240,
    description: 'Golden shallow-fried hard-boiled eggs simmered in rich spiced onion-tomato gravy with roasted whole spices and fresh coriander.',
    isVeg: false,
    spiceLevel: 2,
    isAvailable: true,
    isChefSpecial: true,
    image: '/images/dishes/spicy-egg-curry.jpg',
    allergenInfo: ['Egg'],
    tags: ['Special Curry', 'Egg Special', 'Spicy']
  },
  {
    _id: 'menu-curry-pp',
    name: 'Authentic Dhaba Style Palak Paneer',
    slug: 'dhaba-style-palak-paneer',
    categoryId: 'cat-curries',
    price: 340,
    description: 'Soft cottage cheese cubes simmered in vibrant garlic-infused spinach puree with fresh cream, butter, and authentic Indian spices.',
    isVeg: true,
    spiceLevel: 1,
    isAvailable: true,
    isChefSpecial: true,
    image: '/images/dishes/palak-paneer.jpg',
    allergenInfo: ['Dairy'],
    tags: ['Special Curry', 'Vegetarian', 'Palak Paneer', 'Chef Special']
  },
  {
    _id: 'menu-curry-pc',
    name: 'Mayukha Special Prawns Curry (Royyala Kura)',
    slug: 'special-prawns-curry',
    categoryId: 'cat-curries',
    price: 460,
    description: 'Fresh ocean prawns cooked in aromatic coconut tamarind gravy with curry leaves, green chillies, and crushed black pepper.',
    isVeg: false,
    spiceLevel: 2,
    isAvailable: true,
    isChefSpecial: true,
    image: '/images/dishes/prawns-curry.png',
    allergenInfo: ['Seafood'],
    tags: ['Special Curry', 'Seafood', 'Prawns', 'Chef Special']
  },
  {
    _id: 'menu-curry-rr',
    name: 'Butter Rumali Roti (2 Pcs)',
    slug: 'butter-rumali-roti',
    categoryId: 'cat-curries',
    price: 70,
    description: 'Ultra-thin, soft handkerchief-style Indian flatbread baked on an inverted tawa and brushed with fresh butter.',
    isVeg: true,
    spiceLevel: 0,
    isAvailable: true,
    isChefSpecial: true,
    image: '/images/dishes/rumali-roti.jpg',
    allergenInfo: ['Gluten', 'Dairy'],
    tags: ['Indian Bread', 'Vegetarian', 'Tawa Special']
  },
  {
    _id: 'menu-curry-bn',
    name: 'Special Butter Naan',
    slug: 'special-butter-naan',
    categoryId: 'cat-curries',
    price: 60,
    description: 'Soft tandoor-baked leavened Indian flatbread brushed generously with fresh creamy butter, served hot with gravy.',
    isVeg: true,
    spiceLevel: 0,
    isAvailable: true,
    isChefSpecial: true,
    image: '/images/dishes/butter-naan.jpg',
    allergenInfo: ['Gluten', 'Dairy'],
    tags: ['Indian Bread', 'Vegetarian', 'Tandoor Special', 'Bestseller']
  },

  // 5. Desserts Category
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
    image: '/images/dishes/double-ka-meetha.png',
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
    image: '/images/dishes/qubani-ka-meetha.jpg',
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
    image: '/images/dishes/gulab-jamun-rabri.jpg',
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
    image: '/images/dishes/mango-lassi.png',
    allergenInfo: ['Dairy', 'Nuts'],
    tags: ['Beverage', 'Cooler']
  },
  {
    _id: 'menu-des-5',
    name: 'Royal Saffron Rasmalai (2 Pcs)',
    slug: 'royal-saffron-rasmalai',
    categoryId: 'cat-desserts',
    price: 190,
    description: 'Soft flattened cottage cheese patties soaked in thick cardamom saffron milk, garnished with pistachios, silver leaf, and rose petals.',
    isVeg: true,
    spiceLevel: 0,
    isAvailable: true,
    isChefSpecial: true,
    image: '/images/dishes/rasmalai.jpg',
    allergenInfo: ['Dairy', 'Nuts'],
    tags: ['Dessert', 'Royal Sweet', 'Chef Special']
  },
  {
    _id: 'menu-des-6',
    name: 'Special Dry Fruit Lassi',
    slug: 'special-dry-fruit-lassi',
    categoryId: 'cat-desserts',
    price: 150,
    description: 'Thick rich sweet yogurt blend garnished generously with chopped cashews, pistachios, almonds, saffron, and cardamoms.',
    isVeg: true,
    spiceLevel: 0,
    isAvailable: true,
    isChefSpecial: true,
    image: '/images/dishes/dry-fruit-lassi.png',
    allergenInfo: ['Dairy', 'Nuts'],
    tags: ['Beverage', 'Lassi', 'Dry Fruit', 'Chef Special']
  },

  // 6. Mocktails Category
  {
    _id: 'menu-mck-1',
    name: 'Blue Mojito Mocktail',
    slug: 'blue-mojito-mocktail',
    categoryId: 'cat-mocktails',
    price: 160,
    description: 'Refreshing ocean blue mocktail infused with fresh mint leaves, lime juice, blue curacao syrup, and chilled sparkling soda.',
    isVeg: true,
    spiceLevel: 0,
    isAvailable: true,
    isChefSpecial: true,
    image: '/images/dishes/blue-mojito-mocktail.png',
    allergenInfo: ['None'],
    tags: ['Mocktail', 'Beverage', 'Bestseller', 'Refreshing']
  },
  {
    _id: 'menu-mck-2',
    name: 'Strawberry Lemonade',
    slug: 'strawberry-lemonade',
    categoryId: 'cat-mocktails',
    price: 170,
    description: 'Hand-crafted sparkling lemonade infused with fresh crushed strawberries, mint leaves, lemon wedges, and ice splash.',
    isVeg: true,
    spiceLevel: 0,
    isAvailable: true,
    isChefSpecial: false,
    image: '/images/dishes/strawberry-lemonade.jpg',
    allergenInfo: ['None'],
    tags: ['Mocktail', 'Beverage', 'Fruity', 'Cooler']
  },
  {
    _id: 'menu-mck-3',
    name: 'Lavender Mojito',
    slug: 'lavender-mojito',
    categoryId: 'cat-mocktails',
    price: 180,
    description: 'Elegant floral mocktail crafted with French lavender syrup, fresh crushed mint, lemon slices, and sparkling soda with sugar-rimmed glass.',
    isVeg: true,
    spiceLevel: 0,
    isAvailable: true,
    isChefSpecial: true,
    image: '/images/dishes/lavender-mojito.jpg',
    allergenInfo: ['None'],
    tags: ['Mocktail', 'Beverage', 'Chef Special', 'Floral']
  },

  // 7. Banquet Booking Slots Category
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
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 600);
    const res = await fetch(`${API_BASE}/menu/categories`, { cache: 'no-store', signal: controller.signal });
    clearTimeout(timer);
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

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 600);
    const res = await fetch(`${API_BASE}/menu?${query.toString()}`, { cache: 'no-store', signal: controller.signal });
    clearTimeout(timer);
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
