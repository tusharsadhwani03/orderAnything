/* Importing required modules */
    const express = require('express');
    const mongoose  = require('mongoose');
    const bodyparser = require('body-parser');
    const adminroutes = require('./api/routes/admin');
    const dvboyroutes = require('./api/routes/dvboy');
    const userroutes = require('./api/routes/user');
    const orderroutes = require('./api/routes/order');
    const dbkey = require('./keys').dbkey;

/* Init app */
    const app = express();

/* Middlewares */
    // 1. body-parser
        app.use(bodyparser.urlencoded({extended : false}));
        app.use(bodyparser.json());

    // 2. routes
        app.use('/admin',adminroutes);
        app.use('/user',userroutes);
        app.use('/dvboy',dvboyroutes);
        // app.use('/order',orderroutes);

    // 3. CORS
        app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
        if (req.method === "OPTIONS") {
          res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
          return res.status(200).json({});
        }
        next();
        });

/* Connecting to database */
    try {
        mongoose.connect(dbkey,{useCreateIndex:true , useNewUrlParser : true , useUnifiedTopology : true});
    } catch (error) {
        console.log(error);
    }
    
/* Setting up the server */
    // 1. Set the port
        const Port = process.env.PORT || 3000 ;

    // 2. Listen to the Port
        app.listen(Port,()=>{
            console.log(`server started on ${Port}`);
        })
