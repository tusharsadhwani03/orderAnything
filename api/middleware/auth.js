const jwt = require('jsonwebtoken');
const secretkey = require('../../keys/keys').secretkey;

async function authuser(req,res,next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded_data = jwt.verify(token,secretkey);
        req.data = decoded_data;
        next();    
    } catch (error) {
        res.send("Some error . Authentication requires . Login to proceed");
    }
    
}
module.exports = authuser;