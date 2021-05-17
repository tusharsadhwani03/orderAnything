/* Importing required modules */
const mongoose = require('mongoose');
const users = require('../models/user');
const items = require('../models/items');
const orders = require('../models/orders');
const jwt = require('jsonwebtoken');
const jwt_key = process.env.userkey;

/* Pickup location function */
    async function pickup_locations(cart){
        console.log(cart);
        const locations = [];
        var no_of_items = cart.length;
        for( var i=0 ; i<no_of_items ; i++)
        {
            console.log(cart[i].itemName);
            var item = await items.find({Name : cart[i].itemName}) ;
            var addresses =  item[0].addresses;
            var total_addresses = addresses.length;
            const random_index = Math.floor(Math.random()*total_addresses);
            locations.push({
                "itemName" : cart[i].itemName,
                "location" : addresses[random_index]
            })   
        }
        return locations;
    }

/* Login controller */    
async function userLogin(req,res){
    try {
    const user =  await users.find({email : req.body.email});
    // if email not registered
    if(user.length < 1)
    {  
        res.send("Auth failed !");
    }
    else
    {   // if registered , check for correct password
        if(user[0].password == req.body.password)
        {
        // if password matches , return a jwt token
        const token = jwt.sign(
            {
                email : user[0].email,
                userId : user[0]._id       
            },
            jwt_key,
            {
                expiresIn : 1*1*60*60, 
            }
        ); 
           res.send(`Authentication successful . \n Your token is : ${token}`);
        }
        else
        {
            // if password doesn't match
            res.send("Auth failed !");
        }
    }    
    }
    catch (error)
    {
        // any other error
        console.log(error);
        res.send("Auth failed !");       
    } 

}

/* Signup Controller */    
async function userSignup(req,res){
    try
    {
        const user = await users.find({email : req.body.email});
        //if email already registered
        if(user.length >= 1)
        {
            res.send("Email already Exists !");
        }
        else{
            // if not registered , create new user
            const newUser = await new users({
                _id : new mongoose.Types.ObjectId(),
                email : req.body.email,
                password : req.body.password,    
            });
            await newUser.save();
            res.send(`welcome! new User created -> ${newUser} . Please login to place order.  `).json();
        }
    }
    catch (error)
    {
        // any other error
        console.log(error);
        res.send("error! . Try again later");
    }
}

/* See all items */
    async function get_all_items(req,res)
    {
        // view all items
        try {
            const itemlist = await items.find({});
            res.send(`here is the list of items you can order : \n ${itemlist}`);        
        } catch (error) {
            res.send("error! Try Again.");
        }
    }

/* Add to Cart */
    async function add_to_cart(req,res){
        try {
            const user = await users.find({email : req.data.email});
            const item = await items.find({Name : req.body.Name});
            await user[0].updateOne({$push : {cart : {itemName : item[0].Name,itemID : item[0]._id, quantity : req.body.quantity}}});
            res.send("item added to cart");
        } catch (error) {
            console.log(error);
            res.send("Error occurs! Try Again after some time");
        }
    }

/* view cart */
    async function view_cart(req,res){
        try {
            const user = await users.find({email : req.data.email});
            const cart = JSON.stringify(user[0].cart);
            if(cart == undefined)
            {
                res.send("your cart is Empty . Add items to cart for placing order.");
            }
            res.send(`your cart : ${cart}`);
        }
        catch (error) {
            res.send("Error! Try Again");
        }
    }

/* Remove from cart */
    async function remove_from_cart(req,res){
      try {
        const user = await users.find({email : req.data.email});
        await user[0].updateOne({$pull : {cart :{itemName : req.body.Name} }});
        res.send("item removed from cart");
      }
       catch (error) {
        console.log(error);
        res.send("Error! Try again");    
      }        
    }

/* Place order */
    async function place_order(req,res)
    {
       try {
        const user = await users.find({email : req.data.email});
        const cart = user[0].cart;
        //if cart empty
        if(cart.length < 1)
        {
            res.send("Please select at least one item for placing order");
        }
        else{
            // else , place order and empty the cart

            const locations = await pickup_locations(user[0].cart);
            const newOrder = new orders({
                orderId : new mongoose.Types.ObjectId(),
                customerID : user[0]._id,
                itemList : user[0].cart,
                pickupLocations : locations
            });
            await newOrder.save();
            user[0].cart = [];
            user[0].save();
            res.send("order Placed .");
        }
       } 
       catch (error) {
        console.log(error);
        res.send("Unknown error ! Try again Later.");
       }
    }

/* My orders */
    async function my_orders(req,res){
       try {
        // push only order details which are relevant to user 
        const user = await users.find({email : req.data.email});
        const myOrders = await orders.find({customerID : user[0]._id});
        const orderList = [] ;
        myOrders.forEach(order => {  
           orderList.push({
               "OrderID" : order.orderId,
                "userId" : order.customerID,
                "itemList" : order.itemList
           });
        });
        if(orderList.length < 1)
        {
            // if order list empty
            res.send("Your order list is empty.");
        }
        res.send(`here are your orders : \n ${JSON.stringify(orderList)} `);    
       }
       catch (error) {
           console.log(error);
           res.send("Unknown Error ! . Login again and try.");
       } 
       
    }

/* Exporting the controller functions */
module.exports = {userSignup, userLogin, get_all_items,add_to_cart,view_cart,remove_from_cart,place_order,my_orders};