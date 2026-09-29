const MenuItem = require('../models/MenuItem');
const MenuCategory = require('../models/MenuCategory');
const AuditLog = require('../models/AuditLog');

// @desc    Get all menu categories
// @route   GET /api/menu/categories
// @access  Public
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await MenuCategory.find({ isActive: true }).sort('displayOrder');
    res.status(200).json({
      status: 'success',
      results: categories.length,
      data: categories
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all menu items with category, dietary, spice, search filters
// @route   GET /api/menu
// @access  Public
exports.getMenuItems = async (req, res, next) => {
  try {
    const { category, veg, search, chefSpecial } = req.query;
    let query = { isAvailable: true };

    // Filter by Category Slug or ID
    if (category) {
      const foundCat = await MenuCategory.findOne({ slug: category });
      if (foundCat) {
        query.categoryId = foundCat._id;
      }
    }

    // Filter by Vegetarian / Non-Veg
    if (veg !== undefined && veg !== '') {
      query.isVeg = veg === 'true' || veg === '1';
    }

    // Filter by Chef Special
    if (chefSpecial !== undefined && chefSpecial !== '') {
      query.isChefSpecial = chefSpecial === 'true' || chefSpecial === '1';
    }

    // Filter by Search Keyword
    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { name: searchRegex },
        { description: searchRegex },
        { tags: searchRegex }
      ];
    }

    const menuItems = await MenuItem.find(query)
      .populate('categoryId', 'name slug icon')
      .sort('name');

    res.status(200).json({
      status: 'success',
      results: menuItems.length,
      data: menuItems
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single menu item by slug
// @route   GET /api/menu/:slug
// @access  Public
exports.getMenuItemBySlug = async (req, res, next) => {
  try {
    const item = await MenuItem.findOne({ slug: req.params.slug }).populate('categoryId', 'name slug icon');
    if (!item) {
      return res.status(404).json({ status: 'fail', message: 'Menu item not found' });
    }
    res.status(200).json({ status: 'success', data: item });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new menu item (Admin)
// @route   POST /api/admin/menu
// @access  Private (Admin)
exports.createMenuItem = async (req, res, next) => {
  try {
    const { name, categoryId, price, description, isVeg, spiceLevel, isChefSpecial, image, allergenInfo, tags } = req.body;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const newItem = await MenuItem.create({
      name,
      slug,
      categoryId,
      price,
      description,
      isVeg: isVeg || false,
      spiceLevel: spiceLevel || 1,
      isChefSpecial: isChefSpecial || false,
      image: image || 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
      allergenInfo: allergenInfo || [],
      tags: tags || []
    });

    // Audit Log
    await AuditLog.create({
      adminId: req.user._id,
      adminEmail: req.user.email,
      action: 'CREATE_MENU_ITEM',
      targetResource: 'MenuItem',
      resourceId: newItem._id.toString(),
      details: { name: newItem.name, price: newItem.price }
    });

    res.status(201).json({ status: 'success', data: newItem });
  } catch (error) {
    next(error);
  }
};

// @desc    Update menu item (Admin)
// @route   PUT /api/admin/menu/:id
// @access  Private (Admin)
exports.updateMenuItem = async (req, res, next) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!item) {
      return res.status(404).json({ status: 'fail', message: 'Menu item not found' });
    }

    await AuditLog.create({
      adminId: req.user._id,
      adminEmail: req.user.email,
      action: 'UPDATE_MENU_ITEM',
      targetResource: 'MenuItem',
      resourceId: item._id.toString(),
      details: req.body
    });

    res.status(200).json({ status: 'success', data: item });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete menu item (Admin)
// @route   DELETE /api/admin/menu/:id
// @access  Private (Admin)
exports.deleteMenuItem = async (req, res, next) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ status: 'fail', message: 'Menu item not found' });
    }

    await AuditLog.create({
      adminId: req.user._id,
      adminEmail: req.user.email,
      action: 'DELETE_MENU_ITEM',
      targetResource: 'MenuItem',
      resourceId: req.params.id,
      details: { deletedItemName: item.name }
    });

    res.status(200).json({ status: 'success', message: 'Menu item deleted successfully' });
  } catch (error) {
    next(error);
  }
};
