const express = require('express');
const { controllerSalsepeople } = require('../../../controller');

const router = express.Router();

router.get(
    '/list-salespeople',
    controllerSalsepeople.listSalespeople
)

module.exports = router;