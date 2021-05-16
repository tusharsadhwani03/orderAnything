const express = require('express');
const router = express.Router();
const adminControls = require('../controllers/admin');
const adminLogin = adminControls.adminLogin;
const adminSignup = adminControls.adminSignup;
const authadmin = require('../middleware/auth').authadmin;

router.get('/login',adminLogin);

router.get('/test',authadmin,(req,res)=>{
    res.send("hello");
});
router.post('/signup',adminSignup);

module.exports = router;