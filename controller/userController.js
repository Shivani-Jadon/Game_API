const User = require("../models/user");

module.exports.createUser = function(req, res){
    console.log(req.body);
    console.log(req.params);
    User.create({
        username : req.body.username,
        email : req.body.email,
        gender : req.body.gender,
        age : req.body.age
    },
        function(err, newUser){
           if(err){
               console.log("Error in creating user", err);
               return;
           } 

           return res.send("New user created");
        }
    )
};