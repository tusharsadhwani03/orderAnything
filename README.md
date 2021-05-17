# orderAnything
It is an api.
url(for postman) : It is live on "https://orderanyitem.herokuapp.com"
use postman for requests ->

requests for user/customer : 
[
  1. for login ->
  {
      end point -> '/user/login' (i.e https://orderanyitem.herokuapp.com/user/login)
      requestbody : {
               email : "Email id of user",
               password : "password of user"
               }
      request type : "get"
      response : it will return a "token" , use it in authourization as bearer token for future apis
   }
     
  2. for signup ->
  {
      end point -> '/user/signup' (i.e https://orderanyitem.herokuapp.com/user/signup)
      requestbody : {
               "email" : "Email id of user",
                "password" : "password of user"
               }
      request type : "post"              
  }
  
  3. for viewing items ->
  {   end point -> '/user/itemlist' (i.e https://orderanyitem.herokuapp.com/user/itemlist)
      requestbody : {}
      Authourization : {
        Bearer token : "token returned after login" 
      }
      request type : "get"              
  }
  
  4. viewing cart ->
  {    end point -> '/user/mycart' (i.e https://orderanyitem.herokuapp.com/user/mycart)
      requestbody : {}
      Authourization : {
        Bearer token : "token returned after login" 
      }
      request type : "get"
   }
   
   5. viewing my orders ->
   {   end point -> '/user/myorders' (i.e https://orderanyitem.herokuapp.com/user/myorders)
      requestbody : {}
      Authourization : {
        Bearer token : "token returned after login" 
      }
      request type : "get"
    }
    
    6. adding item to cart -> 
    {    end point -> '/user/addtocart' (i.e https://orderanyitem.herokuapp.com/user/addtocart)
        requestbody : {
               "Name" : "itemName(from the item list)",
                "quantity" : "quantity in +ve integers"
               }
      Authourization : {
        Bearer token : "token returned after login" 
      }
      request type : "post"
      response : it will return a "token" , use it in authourization as bearer token for future apis
    }
    
    7. remove an item from cart ->
    {    end point -> '/user/removeitem' (i.e https://orderanyitem.herokuapp.com/user/removeitem)
        requestbody : {
               "Name" : "itemName(from the item list)"
               }
      Authourization : {
        Bearer token : "token returned after login" 
      }
      request type : "delete"
      response : it will return a "token" , use it in authourization as bearer token for future apis
    }
    
    8. place order ->
    {
       end point -> '/user/placeorder' (i.e https://orderanyitem.herokuapp.com/user/placeorder)
       requestbody : {}
       Authourization : {
       Bearer token : "token returned after login" 
      }
      request type : "post"
    }
]

requests for admin : 
[
  1. for login ->
  {
      end point -> '/admin/login' (i.e https://orderanyitem.herokuapp.com/admin/login)
      requestbody : {
               email : "Email id of admin",
               password : "password of admin"
               }
      request type : "get"
      response : it will return a "token" , use it in authourization as bearer token for future apis
   }
     
  2. for signup ->
  {
      end point -> '/admin/signup' (i.e https://orderanyitem.herokuapp.com/admin/signup)
      requestbody : {
               "email" : "Email id of admin",
                "password" : "password of admin"
               }
      request type : "post"              
  }
  
  3. for viewing ordess ->
  {   end point -> '/admin/orders' (i.e https://orderanyitem.herokuapp.com/admin/orders)
      requestbody : {}
      Authourization : {
        Bearer token : "token returned after login" 
      }
      request type : "get"              
  }
  
  4. for viewing delievery boys ->
  {    end point -> '/admin/dvboys' (i.e https://orderanyitem.herokuapp.com/admin/dvboys)
      requestbody : {}
      Authourization : {
        Bearer token : "token returned after login" 
      }
      request type : "get"
   }
  
  5. for viewing all orders and dvboys ->
  {   end point -> '/admin/viewall' (i.e https://orderanyitem.herokuapp.com/admin/viewall)
      requestbody : {}
      Authourization : {
        Bearer token : "token returned after login" 
      }
      request type : "get"              
  }
  
  6. for assigning orders to dvboys->
  {   end point -> '/admin/assign' (i.e https://orderanyitem.herokuapp.com/admin/assign)
      requestbody : {
        "orderId" :  "orderId of order to assign"
        "dvboyEmail" : "dvboy id email"
      }
      Authourization : {
        Bearer token : "token returned after login" 
      }
      request type : "put"              
  }

]

requests for dvboys : 
[
  1. for login ->
  {
      end point -> '/dvboy/login' (i.e https://orderanyitem.herokuapp.com/dvboy/login)
      requestbody : {
               email : "Email id of dvboy",
               password : "password of dvboy"
               }
      request type : "get"
      response : it will return a "token" , use it in authourization as bearer token for future apis
   }
     
  2. for signup ->
  {
      end point -> '/dvboy/signup' (i.e https://orderanyitem.herokuapp.com/dvboy/signup)
      requestbody : {
               "email" : "Email id of dvboy",
                "password" : "password of dvboy"
               }
      request type : "post"              
  }
  
  3. for viewing orders he has to deliever ->
  {   end point -> '/dvboy/myorders' (i.e https://orderanyitem.herokuapp.com/dvboy/myorders)
      requestbody : {}
      Authourization : {
        Bearer token : "token returned after login" 
      }
      request type : "get"              
  }
  
  4. for updating order status -> 
  {
      end point -> '/dvboy/update' (i.e https://orderanyitem.herokuapp.com/dvboy/update)
      requestbody : {
           "taskCreated" : "created" / "not yet created",
           "reachedStore" : "yes" / "no",
           "itemsPicked" : "picked" / "not picked",
           "enroute" : "on the way" / "will soon be on the way",
           "status" : "cancelled" / "delievered"
           
      }
      Authourization : {
        Bearer token : "token returned after login" 
      }
      request type : "put"
  
  }
  
  ]
