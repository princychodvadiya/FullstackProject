const express = require('express');
const { controllerUsers } = require('../../../controller');

const router = express.Router();

router.post(
    '/register',
    controllerUsers.register
)

module.exports = router;
