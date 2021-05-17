const jwt = require('jsonwebtoken');
const adminkey = process.env.adminkey;
const userkey = process.env.userkey;
const dvboykey = process.env.dvboykey;

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