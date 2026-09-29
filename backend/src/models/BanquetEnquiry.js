const mongoose = require('mongoose');

const banquetEnquirySchema = new mongoose.Schema({
  enquiryId: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  organizerName: {
    type: String,
    required: [true, 'Organizer name is required'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    trim: true,
    lowercase: true
  },
  eventType: {
    type: String,
    required: [true, 'Event type is required'],
    enum: [
      'Corporate Dinner / Conference',
      'Birthday Celebration',
      'Wedding / Engagement Reception',
      'Family Gathering / Get-together',
      'Outdoor Catering Request',
      'Other Event'
    ]
  },
  guestCount: {
    type: Number,
    required: [true, 'Expected guest count is required'],
    min: [20, 'Minimum 20 guests for banquet hall booking']
  },
  eventDate: {
    type: String, // YYYY-MM-DD
    required: [true, 'Event date is required']
  },
  preferredLocation: {
    type: String,
    default: 'KPHB Hall (Up to 200 guests)',
    enum: [
      'KPHB Hall (Up to 200 guests)',
      'Kokapet Banquet Center',
      'Miyapur Banquet Hall',
      'Nanakramguda Hall',
      'Narsingi Hall',
      'Gandipet Banquet Venue',
      'Outdoor Catering (Client Location)'
    ]
  },
  budgetPerPlate: {
    type: String,
    default: '₹500 - ₹800'
  },
  customMenuRequirements: {
    type: String,
    trim: true,
    default: ''
  },
  status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'Contacted', 'Quoted', 'Confirmed', 'Cancelled']
  },
  adminNotes: {
    type: String,
    trim: true,
    default: ''
  }
}, {
  timestamps: true
});

banquetEnquirySchema.pre('validate', function(next) {
  if (!this.enquiryId) {
    const year = new Date().getFullYear();
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    this.enquiryId = `MYK-BNQ-${year}-${randomDigits}`;
  }
  next();
});

module.exports = mongoose.model('BanquetEnquiry', banquetEnquirySchema);
