const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.error(`❌ API Error [${req.method} ${req.originalUrl}]:`, err);

  // Mongoose Bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`;
    return res.status(404).json({ status: 'fail', message });
  }

  // Mongoose Duplicate Key Error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `Duplicate field value entered for '${field}'. Please use another value.`;
    return res.status(400).json({ status: 'fail', message });
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    return res.status(400).json({ status: 'fail', message });
  }

  res.status(error.statusCode || 500).json({
    status: 'error',
    message: error.message || 'Server Error'
  });
};

module.exports = errorHandler;
