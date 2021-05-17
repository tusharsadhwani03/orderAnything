/* Importing mongoose */    
    const mongoose = require('mongoose');

/* Creating schema */
    const orderSchema = mongoose.Schema({
        orderId : {
            type : mongoose.Schema.Types.ObjectId,
            required : true,
            unique: true
        },
        customerID : {
            type : mongoose.Schema.Types.ObjectId,
            required : true,
        },
        dvboyId : {
            type : mongoose.Schema.Types.ObjectId,
        },
        orderStages : {
            type : Object,
        },
        itemList : {
            type : Object,
        },
        pickupLocations : {
            type : Array,
        }
    });

/* Creating the order Model */
    const orderModel = mongoose.model('order',orderSchema);

module.exports = orderModel;
