const express = require('express');
const { controllerVariants } = require('../../../controller');

const router = express.Router();

router.get(
    '/get-variant/:variant_id',
    controllerVariants.getVariant
)

router.get(
    '/list-variants',
    controllerVariants.listVariants
)

router.post(
    '/add-variant',
    controllerVariants.addVariant
)
router.put(
    '/update-variant/:variant_id',
    controllerVariants.updateVariant
)

router.delete(
    '/delete-variant/:variant_id',
    controllerVariants.deleteVariant
)

module.exports = router;

