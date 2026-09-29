const Testimonial = require('../models/Testimonial');

// @desc    Get verified customer testimonials
// @route   GET /api/testimonials
// @access  Public
exports.getTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find({ isApproved: true })
      .sort({ isFeatured: -1, createdAt: -1 })
      .limit(10);

    res.status(200).json({
      status: 'success',
      results: testimonials.length,
      data: testimonials
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit customer review
// @route   POST /api/testimonials
// @access  Public
exports.createTestimonial = async (req, res, next) => {
  try {
    const { customerName, rating, reviewText, visitType, branch } = req.body;

    const testimonial = await Testimonial.create({
      customerName,
      rating,
      reviewText,
      visitType: visitType || 'Dine-In',
      branch: branch || 'KPHB Main Branch',
      isApproved: true // Auto approve for smooth demo experience
    });

    res.status(201).json({
      status: 'success',
      message: 'Thank you for your feedback! Your review has been submitted.',
      data: testimonial
    });
  } catch (error) {
    next(error);
  }
};
