/* Importing required modules */
const mongoose = require('mongoose');
const dvboys = require('../models/admin');

/* Login controller */    
async function dvboyLogin(req,res){
    try {
    const dvboy =  await dvboys.find({email : req.body.email});
    if(dvboy.length < 1)
    {  
        res.send("Auth failed !");
    }
    else
    {
        if(dvboy[0].password == req.body.password)
        {
            res.send(dvboy).json();
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
async function dvboySignup(req,res){
    try
    {
        const dvboy = await dvboys.find({email : req.body.email});
        if(dvboy.length >= 1)
        {
            res.send("Email already Exists !");
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
        res.send("error! . Try again later");
    }
}


module.exports = {dvboySignup, dvboyLogin};