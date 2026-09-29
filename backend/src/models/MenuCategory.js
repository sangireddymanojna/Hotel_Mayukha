const mongoose = require('mongoose');

const menuCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    unique: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  displayOrder: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  icon: {
    type: String, // Icon identifier for frontend (e.g., 'Soup', 'Flame', 'Drumstick', 'Utensils')
    default: 'Utensils'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('MenuCategory', menuCategorySchema);
