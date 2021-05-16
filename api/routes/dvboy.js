const express = require('express');
const router = express.Router();
const dvboyControls = require('../controllers/dvboy');
const dvboyLogin = dvboyControls.dvboyLogin;
const dvboySignup = dvboyControls.dvboySignup;
const authdvboy = require('../middleware/auth').authdvboy;

router.get('/login',dvboyLogin);

router.post('/signup',dvboySignup);

module.exports = router;