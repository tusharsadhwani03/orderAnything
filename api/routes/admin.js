const express = require('express');
const router = express.Router();
const adminControls = require('../controllers/admin');
const adminLogin = adminControls.adminLogin;
const adminSignup = adminControls.adminSignup;
const authuser = require('../middleware/auth');

router.get('/login',adminLogin);

router.post('/signup',adminSignup);

module.exports = router;