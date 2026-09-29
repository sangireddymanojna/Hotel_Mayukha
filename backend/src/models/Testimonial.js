const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: 1,
    max: 5
  },
  reviewText: {
    type: String,
    required: [true, 'Review content is required'],
    trim: true
  },
  visitType: {
    type: String,
    default: 'Dine-In',
    enum: ['Dine-In', 'Banquet Event', 'Family Gathering', 'Takeaway Delivery']
  },
  branch: {
    type: String,
    default: 'KPHB Main Branch'
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isApproved: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
