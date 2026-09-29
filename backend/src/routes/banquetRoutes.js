const express = require('express');
const router = express.Router();
const banquetController = require('../controllers/banquetController');
const { validate, banquetSchema } = require('../middleware/validate');

router.post('/', validate(banquetSchema), banquetController.createBanquetEnquiry);

module.exports = router;
