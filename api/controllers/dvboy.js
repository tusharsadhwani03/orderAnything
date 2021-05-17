/* Importing required modules */
const mongoose = require('mongoose');
const dvboys = require('../models/dvboy');
const orders = require('../models/orders');
const jwt = require('jsonwebtoken');
const jwt_key = process.env.dvboykey;

/* Login controller */    
async function dvboyLogin(req,res){
    try {
    const dvboy =  await dvboys.find({email : req.body.email});
    // if email not registered
    if(dvboy.length < 1)
    {  
        res.send("Auth failed !").json();
    }
    else
    {   // if registered , check for correct password
        if(dvboy[0].password == req.body.password)
        {
        // if password matches , return a jwt token
        const token = jwt.sign(
            {
                email : dvboy[0].email,
                userId : dvboy[0]._id       
            },
            jwt_key,
            {
                expiresIn : 1*1*60*60, 
            }
        ); 
           res.send(`Authentication successful . \n Your token is : ${token}`).json();
        }
        else
        {
            // if password doesn't match
            res.send("Auth failed !").json();
        }
    }    
    }
    catch (error)
    {
        // any other error
        console.log(error);
        res.send("Auth failed !").json();       
    } 

}

/* Signup Controller */    
async function dvboySignup(req,res){
    try
    {
        const dvboy = await dvboys.find({email : req.body.email});
        if(dvboy.length >= 1)
        {
            res.send("Email already Exists !").json();
        }
        else{
            const newDvboy = await new dvboys({
                _id : new mongoose.Types.ObjectId(),
                email : req.body.email,
                password : req.body.password,    
            });
            await newDvboy.save();
            res.send(`welcome To order Anything . Hope you and us together will provide the orders on time. Your details :  -> ${newDvboy} . Please login to start your journey with us.`).json();
        }
    }
    catch (error)
    {
        console.log(error);
        res.send("error! . Try again later".json());
    }
}

/* view order assigned to dvboy */
async function dvboy_orders(req,res){
    try {
    const orderList = await orders.find({dvboyId : req.data.userId});
    const relevant_order_data = [];
    orderList.forEach(order => {  
        relevant_order_data.push({
            "OrderID" : order.orderId,
            "userId" : order.customerID,
            "pickup locations with item" : order.pickupLocations,
            "items" : order.itemList
        });
    });
    res.send(`orders to deliever  : ${JSON.stringify(relevant_order_data)}`);        
    } catch (error) {
        console.log(error);
        res.send("Error").json();
    }
}

/* Update order stages */
async function update_order(req,res){
    try {
        const orderList = await orders.find({orderId : req.body.orderId}); 
        var taskCreated = req.body.taskCreated;
        var reachedStore = req.body.reachedStore;
        var itemsPicked = req.body.itemsPicked;
        var enroute = req.body.enroute;
        var status = req.body.status;
        if(req.body.taskCreated == null)
        {
            taskCreated = orderList[0].orderStages.taskCreated;
        }
        if(req.body.reachedStore == null)
        {
           reachedStore = orderList[0].orderStages.reachedStore;
        }
        if(req.body.itemsPicked == null)
        {
            itemsPicked = orderList[0].orderStages.itemsPicked;
        }
        if(req.body.status == null)
        {
            status = orderList[0].orderStages.status;
        }
        if(req.body.enroute == null)
        {
            enroute = orderList[0].orderStages.enroute;
        }
        orderList[0].orderStages = {
            "taskCreated" : taskCreated,
            "reachedStore" : reachedStore,
            "itemsPicked" : itemsPicked,
            "enroute" : enroute,
            "status" : status
        };
        orderList[0].save();
        res.send("updated status!").json();
    }
    catch(error) {
        console.log(error);
        res.send("Error").json();
    }

}


module.exports = {dvboySignup, dvboyLogin,dvboy_orders,update_order};