const express = require("express");
const port = 8500;
const app = express();
const db = require("./config/mongoose");
const path = require("path");
const Game = require("./models/game");
const Ticket = require("./models/ticket");
const User = require("./models/user");

// middleware to take data from json and encoded format
app.use(express.json());
app.use(express.urlencoded());

// setting up and configuring path for json engine
app.set("views", path.join(__dirname, "./view"));
app.set("view engine", "ejs");

//setting up routes
app.use('/', require("./routes"));

// express engine listening to port
app.listen(port, function(err){
    if(err){
        console.log("Error starting the server -- ", err);
        return;
    }

    console.log("The server is up and running at port - ", port);

})