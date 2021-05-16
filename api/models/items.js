/* Importing required modules */
const mongoose = require('mongoose');

/* creating Schema  */
    const itemSchema = mongoose.Schema({
        _id : mongoose.Schema.Types.ObjectId,
        Name : {
            type : String,
            unique : true,
            required : true
        },
        cateogary : {
            type : String,
            required : true
        },
        addresses : {
            type : Array,
            required : true
        }
    });

/* Creating the model */
    const itemModel = mongoose.model('item',itemSchema);

/* Exporting the model */
    module.exports = itemModel;