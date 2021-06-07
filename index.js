const express = require("express");
const port = 8500;
const app = express();
const db = require("./config/mongoose");

app.listen(port, function(err){
    if(err){
        console.log("Error starting the server -- ", err);
        return;
    }

    console.log("The server is up and running at port - ", port);
})