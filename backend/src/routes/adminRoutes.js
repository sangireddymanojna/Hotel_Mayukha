const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const menuController = require('../controllers/menuController');
const reservationController = require('../controllers/reservationController');
const banquetController = require('../controllers/banquetController');
const adminController = require('../controllers/adminController');

const { protect, authorize } = require('../middleware/auth');
const { validate, loginSchema } = require('../middleware/validate');

// Public Admin Auth Route
router.post('/login', validate(loginSchema), authController.login);

// Protected Admin Routes
router.use(protect);
router.use(authorize('admin', 'manager'));

router.get('/me', authController.getMe);
router.get('/stats', adminController.getDashboardStats);

// Reservation Manager Routes
router.get('/reservations', reservationController.getAdminReservations);
router.patch('/reservations/:id', reservationController.updateReservationStatus);

// Banquet Lead Manager Routes
router.get('/banquets', banquetController.getAdminBanquets);
router.patch('/banquets/:id', banquetController.updateBanquetStatus);

// Menu CRUD Manager Routes
router.post('/menu', menuController.createMenuItem);
router.put('/menu/:id', menuController.updateMenuItem);
router.delete('/menu/:id', menuController.deleteMenuItem);

module.exports = router;
