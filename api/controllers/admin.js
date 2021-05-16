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
        res.json({"message" : "Auth failed !"});
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
        res.json({"message" : `Authentication successful . \n Your token is : ${token}`});
        }
        else
        {
            // if password doesn't match
            res.json({"message" : "Auth failed !"});
        }
    }    
    }
    catch (error)
    {
        // any other error
        console.log(error);
        res.json({"message" : "Auth failed !"});       
    } 
    }

/* Signup Controller */    
    async function adminSignup(req,res){
    try
    {
     const admin = await admins.find({email : req.body.email});
     if(admin.length >= 1)
     {
        res.json({"message" : "Email already exists!"});
     }
     else{
         const newAdmin = await new admins({
            _id : new mongoose.Types.ObjectId(),
            email : req.body.email,
            password : req.body.password,    
         });
         await newAdmin.save();
         res.json({"message" : `welcome! New Admin created -> ${newAdmin} . Please login to seeorders.`});
     }
    }
     catch (error)
     {
        console.log(error);
        res.json({"message" : "Error! Try again later"});
     }
    }

/* View all orders */
    async function view_orders(req,res){
        try {
            const orderList = await orders.find({});   
            if(orderList.length < 1)
            {
                res.json({"message" : "No orders yet!"});
            } 
            res.send(`orders : \n ${orderList}`);
        } 
        catch (error) {
            console.log(error);
            res.json({"message" : "Unknown error !"});
        }
    }

/* View dvboys */
async function view_dvboys(req,res){
    try {
        const dvboysList = await dvboys.find({});   
        if(dvboysList.length < 1)
        {
            res.send({ "message" : "U have no delievery boys to deliever . Recruit a delievery boy or deliever yourself."});
        } 
        res.json(dvboysList);
    } 
    catch (error) {
        console.log(error);
        res.json({"message" : "unknown error !"});
    }
}

/* view all orders and dvboys */
async function view_all(req,res){
    try {
        const dvboysList = await dvboys.find({}); 
        const orderList = await orders.find({});
        res.json({"orders" : orderList }, {"dvboys" : dvboysList});
    }
    catch (error) {
        console.log(error);
        res.json({"message" : "unknown error !"});
    }
}

/* assign dvboy */
async function assign_dvboy(req,res){
    try {
        const order = await orders.find({orderId : req.body.orderId});
        const dvboy = await dvboys.find({email : req.body.dvboyEmail});
        if(order[0].dvboyId != undefined)
        {
            res.json({"message" : "dvboy already assigned for this order."});
        }
        order[0].dvboyId = dvboy[0]._id;
        order[0].save();
        res.json({"message" :  "order assigned"});
    }
    catch (error) {
        console.log(error);
        res.json({"message" : "Error!"});
    }

}

module.exports = {adminSignup, adminLogin , view_orders, view_dvboys , view_all , assign_dvboy};