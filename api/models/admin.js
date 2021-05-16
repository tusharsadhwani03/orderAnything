/* Importing required modules */
    const mongoose = require('mongoose');

/* creating Schema  */
    const adminSchema = mongoose.Schema({
        _id : mongoose.Schema.Types.ObjectId,
        email : {
            type : String,
            required : true,
            unique : true,
        },
        password : {
            type : String,
            required : true,
        }

    });

/* Creating the model */
    const adminModel = mongoose.model('admin',adminSchema);

/* Exporting the model */
    module.exports = adminModel;