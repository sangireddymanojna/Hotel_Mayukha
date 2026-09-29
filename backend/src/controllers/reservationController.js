const Reservation = require('../models/Reservation');
const AuditLog = require('../models/AuditLog');

// @desc    Submit a new table reservation
// @route   POST /api/reservations
// @access  Public
exports.createReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.create(req.body);

    res.status(201).json({
      status: 'success',
      message: 'Table reservation request received successfully.',
      data: {
        bookingId: reservation.bookingId,
        customerName: reservation.customerName,
        date: reservation.date,
        timeSlot: reservation.timeSlot,
        guestCount: reservation.guestCount,
        status: reservation.status,
        createdAt: reservation.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Track reservation by bookingId
// @route   GET /api/reservations/track/:bookingId
// @access  Public
exports.trackReservation = async (req, res, next) => {
  try {
    const bookingId = req.params.bookingId.toUpperCase();
    const reservation = await Reservation.findOne({ bookingId });

    if (!reservation) {
      return res.status(404).json({
        status: 'fail',
        message: `No table reservation found matching reference '${bookingId}'`
      });
    }

    res.status(200).json({
      status: 'success',
      data: reservation
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all reservations with filters (Admin)
// @route   GET /api/admin/reservations
// @access  Private (Admin)
exports.getAdminReservations = async (req, res, next) => {
  try {
    const { status, date, branch, search } = req.query;
    let query = {};

    if (status && status !== 'All') {
      query.status = status;
    }
    if (date) {
      query.date = date;
    }
    if (branch && branch !== 'All') {
      query.branch = branch;
    }
    if (search && search.trim() !== '') {
      const regex = new RegExp(search.trim(), 'i');
      query.$or = [
        { bookingId: regex },
        { customerName: regex },
        { phone: regex },
        { email: regex }
      ];
    }

    const reservations = await Reservation.find(query).sort({ date: 1, timeSlot: 1 });

    res.status(200).json({
      status: 'success',
      results: reservations.length,
      data: reservations
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update reservation status (Admin)
// @route   PATCH /api/admin/reservations/:id
// @access  Private (Admin)
exports.updateReservationStatus = async (req, res, next) => {
  try {
    const { status, adminNotes } = req.body;
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({ status: 'fail', message: 'Reservation not found' });
    }

    if (status) reservation.status = status;
    if (adminNotes !== undefined) reservation.adminNotes = adminNotes;

    await reservation.save();

    // Log action
    await AuditLog.create({
      adminId: req.user._id,
      adminEmail: req.user.email,
      action: 'UPDATE_RESERVATION_STATUS',
      targetResource: 'Reservation',
      resourceId: reservation._id.toString(),
      details: { bookingId: reservation.bookingId, newStatus: status }
    });

    res.status(200).json({
      status: 'success',
      message: `Reservation ${reservation.bookingId} status updated to '${status}'`,
      data: reservation
    });
  } catch (error) {
    next(error);
  }
};
