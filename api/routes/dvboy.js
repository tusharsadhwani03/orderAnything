const express = require('express');
const router = express.Router();
const dvboyControls = require('../controllers/dvboy');
const dvboyLogin = dvboyControls.dvboyLogin;
const dvboySignup = dvboyControls.dvboySignup;
const dvBoyorders = dvboyControls.dvboy_orders;
const updateOrder = dvboyControls.update_order;

const authdvboy = require('../middleware/auth').authdvboy;

router.get('/login',dvboyLogin);

router.get('/myorders',authdvboy,dvBoyorders);

router.post('/signup',dvboySignup);

router.put('/update',authdvboy,updateOrder);

module.exports = router;