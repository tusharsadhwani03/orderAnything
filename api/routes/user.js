/* importing required modules  */
const express = require('express');
const router = express.Router();
const userControls = require('../controllers/user');
const authuser = require('../middleware/auth').authuser;

/* user control methods */
const userLogin = userControls.userLogin;
const userSignup = userControls.userSignup;
const itemlist = userControls.get_all_items;
const placeorder = userControls.place_order;
const addtocart = userControls.add_to_cart;
const myorders = userControls.my_orders;
const mycart = userControls.view_cart;
const removeitem = userControls.remove_from_cart;

/* Handling get requests */
    // 1. login route
        router.get('/login',userLogin);

    // 2. displaying item lists
        router.get('/itemlist',authuser,itemlist);

    // 3. myorder list
        router.get('/myorders',authuser,myorders);

    // 4. mycart
        router.get('/mycart',authuser,mycart);

/* Handling post requests */
    // 1. Signup route
        router.post('/signup',userSignup);

    // 2. Add to cart
        router.post('/addtocart',authuser,addtocart);

    // 3. placeorder
        router.post('/placeorder',authuser,placeorder);

    // 4. remove item from cart
        router.post('/removeitem',authuser,removeitem);

/* Exporting the route */        
module.exports = router;