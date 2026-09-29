const BanquetEnquiry = require('../models/BanquetEnquiry');
const AuditLog = require('../models/AuditLog');

// @desc    Submit a banquet or catering enquiry
// @route   POST /api/banquets
// @access  Public
exports.createBanquetEnquiry = async (req, res, next) => {
  try {
    const enquiry = await BanquetEnquiry.create(req.body);

    res.status(201).json({
      status: 'success',
      message: 'Banquet & catering enquiry submitted successfully. Our event team will reach out shortly.',
      data: {
        enquiryId: enquiry.enquiryId,
        organizerName: enquiry.organizerName,
        eventType: enquiry.eventType,
        eventDate: enquiry.eventDate,
        guestCount: enquiry.guestCount,
        status: enquiry.status
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all banquet enquiries with filters (Admin)
// @route   GET /api/admin/banquets
// @access  Private (Admin)
exports.getAdminBanquets = async (req, res, next) => {
  try {
    const { status, eventType } = req.query;
    let query = {};

    if (status && status !== 'All') {
      query.status = status;
    }
    if (eventType && eventType !== 'All') {
      query.eventType = eventType;
    }

    const enquiries = await BanquetEnquiry.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      results: enquiries.length,
      data: enquiries
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update banquet enquiry status (Admin)
// @route   PATCH /api/admin/banquets/:id
// @access  Private (Admin)
exports.updateBanquetStatus = async (req, res, next) => {
  try {
    const { status, adminNotes } = req.body;
    const enquiry = await BanquetEnquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({ status: 'fail', message: 'Banquet enquiry not found' });
    }

    if (status) enquiry.status = status;
    if (adminNotes !== undefined) enquiry.adminNotes = adminNotes;

    await enquiry.save();

    await AuditLog.create({
      adminId: req.user._id,
      adminEmail: req.user.email,
      action: 'UPDATE_BANQUET_STATUS',
      targetResource: 'BanquetEnquiry',
      resourceId: enquiry._id.toString(),
      details: { enquiryId: enquiry.enquiryId, newStatus: status }
    });

    res.status(200).json({
      status: 'success',
      message: `Enquiry ${enquiry.enquiryId} updated to '${status}'`,
      data: enquiry
    });
  } catch (error) {
    next(error);
  }
};
