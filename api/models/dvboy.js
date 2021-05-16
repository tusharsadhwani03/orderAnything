/* Importing required modules */
const mongoose = require('mongoose');

/* creating Schema  */
    const dvboySchema = mongoose.Schema({
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
    const dvboyModel = mongoose.model('dvboy',dvboySchema);

/* Exporting the model */
    module.exports = dvboyModel;