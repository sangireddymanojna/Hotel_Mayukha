const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const { validate, reservationSchema } = require('../middleware/validate');

router.post('/', validate(reservationSchema), reservationController.createReservation);
router.get('/track/:bookingId', reservationController.trackReservation);

module.exports = router;
