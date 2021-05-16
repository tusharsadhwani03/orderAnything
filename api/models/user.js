/* Importing required modules */
const mongoose = require('mongoose');

/* creating Schema  */
    const userSchema = mongoose.Schema({
        _id : mongoose.Schema.Types.ObjectId,
        email : {
            type : String,
            required : true,
            unique : true,
        },
        password : {
            type : String,
            required : true,
        },
        cart : {
            type : Object
        }

    });

/* Creating the model */
    const userModel = mongoose.model('user',userSchema);

/* Exporting the model */
    module.exports = userModel;