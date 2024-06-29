const express = require('express');
const { controllerCategories } = require('../../../controller');

const router = express.Router();

router.get(
    '/get-categories/:category_id',
    controllerCategories.getCategory
)

router.get(
    '/list-categories',
    controllerCategories.listCategories
)

router.post(
    '/add-category',
    controllerCategories.addCategory
)

router.put(
    '/update-category/:category_id',
    controllerCategories.updateCategory
)

router.delete(
    '/delete-category/:category_id',
    controllerCategories.deleteCategory
)
router.get(
    '/getActive',
    controllerCategories.countActive
)

router.get(
    '/getInactive',
    controllerCategories.countinActive
)

module.exports = router;    