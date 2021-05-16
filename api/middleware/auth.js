const jwt = require('jsonwebtoken');
const secretkey = require('../../keys/keys');
const adminkey = secretkey.secretkey_admin;
const userkey = secretkey.secretkey_user;
const dvboykey = secretkey.secretkey_dvboy;

async function authuser(req,res,next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded_data = jwt.verify(token,userkey);
        req.data = decoded_data;
        next();    
    } catch (error) {
        res.send("Some error . Authentication requires . Login to proceed");
    }
    
}

async function authadmin(req,res,next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded_data = jwt.verify(token,adminkey);
        req.data = decoded_data;
        next();    
    } catch (error) {
        res.send("Some error . Authentication requires . Login to proceed");
    }
    
}

async function authdvboy(req,res,next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded_data = jwt.verify(token,dvboykey);
        req.data = decoded_data;
        next();    
    } catch (error) {
        res.send("Some error . Authentication requires . Login to proceed");
    }
    
}
module.exports = {authuser , authadmin , authdvboy};