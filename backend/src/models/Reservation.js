const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
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
  guestCount: {
    type: Number,
    required: [true, 'Guest count is required'],
    min: [1, 'At least 1 guest required'],
    max: [30, 'For groups larger than 30, please submit a banquet inquiry']
  },
  date: {
    type: String, // YYYY-MM-DD format
    required: [true, 'Reservation date is required']
  },
  timeSlot: {
    type: String,
    required: [true, 'Time slot is required'],
    enum: [
      '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
      '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM', '10:00 PM'
    ]
  },
  branch: {
    type: String,
    default: 'KPHB Main Branch',
    enum: ['KPHB Main Branch', 'Kokapet Branch', 'Miyapur Branch']
  },
  seatingPreference: {
    type: String,
    default: 'Standard',
    enum: ['Standard', 'Aqua Theme Section', 'Jungle Theme Section', 'Family Dining Hall', 'Private Dining Room']
  },
  status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'Confirmed', 'Seated', 'Completed', 'Cancelled']
  },
  specialRequests: {
    type: String,
    trim: true,
    default: ''
  },
  adminNotes: {
    type: String,
    trim: true,
    default: ''
  }
}, {
  timestamps: true
});

// Pre-validate hook to generate bookingId if not provided
reservationSchema.pre('validate', function(next) {
  if (!this.bookingId) {
    const year = new Date().getFullYear();
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    this.bookingId = `MYK-RES-${year}-${randomDigits}`;
  }
  next();
});

module.exports = mongoose.model('Reservation', reservationSchema);
