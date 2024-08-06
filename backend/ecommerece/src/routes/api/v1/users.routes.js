const express = require('express');
const { controllerUsers } = require('../../../controller');
const passport = require('passport');
const exportpdfmake = require('../../../utils/pdfmake');
const { sendOTP, verifyOTP } = require('../../../utils/twilioOTP');

const router = express.Router();

router.post(
    '/register',
    controllerUsers.register
)

router.post(
    '/registerOTP',
    sendOTP,
    controllerUsers.registerOTP
)

router.get(
    '/verifyOTP',
    verifyOTP,
    controllerUsers.registerOTP
)

router.post(
    '/login',
    controllerUsers.login
)

router.post(
    '/generateNewTokens',
    controllerUsers.newToken
)

router.post(
    '/logout',
    controllerUsers.logout
)

router.get(
    '/googlelogin',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        console.log("Successful");
        // Successful authentication, redirect home.
        res.send('<h1>ok</h1>');
    });

router.get(
    '/facebooklogin',
    passport.authenticate('facebook')
);

router.get(
    '/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        console.log("Successful");
        res.send('<h1>ok</h1>');
    });

router.get(
    '/pdfmake',
    exportpdfmake
)

module.exports = router;


