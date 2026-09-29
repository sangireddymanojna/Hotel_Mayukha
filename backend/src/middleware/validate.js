const { z } = require('zod');

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.errors.map(err => ({
        field: err.path.join('.').replace(/^(body|query|params)\./, ''),
        message: err.message
      }));
      return res.status(400).json({
        status: 'fail',
        message: 'Validation failed',
        errors: formattedErrors
      });
    }
    next(error);
  }
};

// Common Schemas
const reservationSchema = z.object({
  body: z.object({
    customerName: z.string().min(2, 'Customer name must be at least 2 characters'),
    phone: z.string().min(10, 'Valid 10-digit phone number is required'),
    email: z.string().email('Valid email address is required'),
    guestCount: z.number().min(1, 'Minimum 1 guest').max(30, 'Maximum 30 guests for regular table reservation'),
    date: z.string().min(8, 'Date is required (YYYY-MM-DD)'),
    timeSlot: z.string().min(1, 'Time slot is required'),
    branch: z.string().optional(),
    seatingPreference: z.string().optional(),
    specialRequests: z.string().optional()
  })
});

const banquetSchema = z.object({
  body: z.object({
    organizerName: z.string().min(2, 'Organizer name must be at least 2 characters'),
    phone: z.string().min(10, 'Valid phone number is required'),
    email: z.string().email('Valid email address is required'),
    eventType: z.string().min(2, 'Event type is required'),
    guestCount: z.number().min(20, 'Minimum 20 guests for banquet booking'),
    eventDate: z.string().min(8, 'Event date is required'),
    preferredLocation: z.string().optional(),
    budgetPerPlate: z.string().optional(),
    customMenuRequirements: z.string().optional()
  })
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Valid email required'),
    password: z.string().min(6, 'Password must be at least 6 characters')
  })
});

module.exports = {
  validate,
  reservationSchema,
  banquetSchema,
  loginSchema
};
