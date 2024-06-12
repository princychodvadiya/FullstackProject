
const express = require('express');

const router = express.Router();

const categoriesRouter = require('./categories.routes');
const subcategoriesRouter = require('./subcategories.routes');
const productsRouter = require('./products.routes');

router.use('/categories', categoriesRouter);
router.use('/subcategories', subcategoriesRouter);
router.use('/products', productsRouter);

module.exports = router;