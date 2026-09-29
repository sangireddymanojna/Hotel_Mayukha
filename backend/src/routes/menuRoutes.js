const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

router.get('/categories', menuController.getCategories);
router.get('/', menuController.getMenuItems);
router.get('/:slug', menuController.getMenuItemBySlug);

module.exports = router;
