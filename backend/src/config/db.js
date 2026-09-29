const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI;
    if (!connStr) {
      console.warn('⚠️ MONGODB_URI is not defined in environment variables. Database features will require connection string.');
      return;
    }
    const conn = await mongoose.connect(connStr);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MONGODB Connection Error: ${error.message}`);
    // Non-fatal fallback for local initial setup test
  }
};

module.exports = connectDB;
