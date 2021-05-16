/* Importing required modules */
    const mongoose = require('mongoose');
    const admins = require('../models/admin');
    const orders = require('../models/orders');
    const dvboys = require('../models/dvboy');
    const jwt = require('jsonwebtoken');
    const jwt_key = require('../../keys/keys').secretkey_admin;

/* Login controller function */    
    async function adminLogin(req,res,next){
    try {
    const admin =  await admins.find({email : req.body.email});
    // if email not registered
    if(admin.length < 1)
    {  
        res.send("Auth failed !");
    }
    else
    {   // if registered , check for correct password
        if(admin[0].password == req.body.password)
        {
        // if password matches , return a jwt token
        const token = jwt.sign(
        {
            email : admin[0].email,
            userId : admin[0]._id       
        },
        jwt_key,    
        {
            expiresIn : 1*1*60*60, 
        }); 
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
    async function adminSignup(req,res){
    try
    {
     const admin = await admins.find({email : req.body.email});
     if(admin.length >= 1)
     {
         res.send("Email already Exists !");
     }
     else{
         const newAdmin = await new admins({
            _id : new mongoose.Types.ObjectId(),
            email : req.body.email,
            password : req.body.password,    
         });
         await newAdmin.save();
         res.send(`welcome! New Admin created -> ${newAdmin} . Please login to seeorders.`).json();
     }
    }
     catch (error)
     {
        console.log(error);
        res.send("error! . Try again later");
     }
    }

/* View all orders */
    async function view_orders(req,res){
        const orderList = await orders.find({});
        
    }



module.exports = {adminSignup, adminLogin};