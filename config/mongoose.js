const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/tambola_db");

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connnecting to database'));

db.once('open', function(){
    console.log("Connected to database successfully ");
})