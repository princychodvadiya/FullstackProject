const express = require('express');
const { controllerUsers } = require('../../../controller');

const router = express.Router();

router.post(
    '/register',
    controllerUsers.register
)

router.post(
    '/login',
    controllerUsers.login
)

module.exports = router;
