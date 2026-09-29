const Reservation = require('../models/Reservation');
const BanquetEnquiry = require('../models/BanquetEnquiry');
const MenuItem = require('../models/MenuItem');

// @desc    Get dashboard statistics for Admin Portal
// @route   GET /api/admin/stats
// @access  Private (Admin)
exports.getDashboardStats = async (req, res, next) => {
  try {
    const todayStr = new Date().toISOString().split('T')[0];

    const totalReservations = await Reservation.countDocuments();
    const todayReservations = await Reservation.countDocuments({ date: todayStr });
    const pendingReservations = await Reservation.countDocuments({ status: 'Pending' });

    const totalBanquets = await BanquetEnquiry.countDocuments();
    const pendingBanquets = await BanquetEnquiry.countDocuments({ status: 'Pending' });

    const totalMenuItems = await MenuItem.countDocuments();
    const activeMenuItems = await MenuItem.countDocuments({ isAvailable: true });

    const recentReservations = await Reservation.find().sort({ createdAt: -1 }).limit(5);
    const recentBanquets = await BanquetEnquiry.find().sort({ createdAt: -1 }).limit(5);

    res.status(200).json({
      status: 'success',
      data: {
        summary: {
          totalReservations,
          todayReservations,
          pendingReservations,
          totalBanquets,
          pendingBanquets,
          totalMenuItems,
          activeMenuItems
        },
        recentReservations,
        recentBanquets
      }
    });
  } catch (error) {
    next(error);
  }
};
