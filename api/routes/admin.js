const express = require('express');
const router = express.Router();
const adminControls = require('../controllers/admin');
const adminLogin = adminControls.adminLogin;
const adminSignup = adminControls.adminSignup;
const vieworders = adminControls.view_orders;
const viewdvboys = adminControls.view_dvboys; 
const view_all = adminControls.view_all;
const assignDvboy = adminControls.assign_dvboy;

const authadmin = require('../middleware/auth').authadmin;

router.get('/login',adminLogin);

router.get('/orders',authadmin,vieworders);

router.get('/dvboys',authadmin,viewdvboys);

router.get('/viewall',authadmin,view_all);

router.put('/assign',authadmin,assignDvboy);

router.post('/signup',adminSignup);

module.exports = router;