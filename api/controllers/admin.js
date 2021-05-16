/* Importing required modules */
    const mongoose = require('mongoose');
    const admins = require('../models/admin');
    const orders = require('../models/orders');

/* Functions used in controller functions */
    // 1. function succesful_login (This function shows all order statuses . )
        function successful_login(req,res,admin)
        {
            res.send(admin);
        }


/* Login controller function */    
    async function adminLogin(req,res,next){
        try {
        const admin =  await admins.find({email : req.body.email});
        if(admin.length < 1)
        {  
            res.send("Auth failed !");
        }
        else
        {
            if(admin[0].password == req.body.password)
            {
                successful_login(req,res,admin);
            }
            else
            {
                res.send("Auth failed !");
            }
        }    
        }
        catch (error)
        {
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
                res.send(`welcome! New Admin created -> ${newAdmin} . Please login to see orders.`).json();
            }
        }
        catch (error)
        {
            console.log(error);
            res.send("error! . Try again later");
        }
    }


module.exports = {adminSignup, adminLogin};