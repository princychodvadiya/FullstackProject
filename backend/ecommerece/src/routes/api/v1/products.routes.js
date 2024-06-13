const express = require('express');
const { controllerProducts } = require('../../../controller');
const upload = require('../../../middleware/upload');

const router = express.Router();

router.get(
    '/get-product/:product_id',
    controllerProducts.getProduct
)

router.get(
    '/list-product',
    controllerProducts.listProducts
)

router.post(
    '/add-product',
    upload.single('product_image'),
    controllerProducts.addProduct
)

router.put(
    '/update-product/:product_id',
    controllerProducts.updateProduct
)

router.delete(
    '/delete-product/:product_id',
    controllerProducts.deleteProduct
)


module.exports = router;