const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Dish name is required'],
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuCategory',
    required: [true, 'Category reference is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be positive']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  isVeg: {
    type: Boolean,
    default: false
  },
  spiceLevel: {
    type: Number,
    min: 0,
    max: 3,
    default: 1 // 0: Mild, 1: Medium, 2: Spicy, 3: Very Spicy
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  isChefSpecial: {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80'
  },
  allergenInfo: [{
    type: String,
    enum: ['Nuts', 'Dairy', 'Gluten', 'Seafood', 'Egg', 'Soy', 'None']
  }],
  tags: [{
    type: String
  }],
  preparationTimeMinutes: {
    type: Number,
    default: 20
  }
}, {
  timestamps: true
});

menuItemSchema.index({ name: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('MenuItem', menuItemSchema);
