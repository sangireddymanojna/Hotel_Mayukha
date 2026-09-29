const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  adminEmail: {
    type: String,
    required: true
  },
  action: {
    type: String,
    required: true // e.g., 'CREATE_MENU_ITEM', 'UPDATE_RESERVATION_STATUS', 'DELETE_MENU_ITEM'
  },
  targetResource: {
    type: String,
    required: true // e.g., 'Reservation', 'MenuItem', 'BanquetEnquiry'
  },
  resourceId: {
    type: String
  },
  details: {
    type: mongoose.Schema.Types.Mixed
  },
  ipAddress: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('AuditLog', auditLogSchema);
