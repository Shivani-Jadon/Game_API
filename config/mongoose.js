const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/tambola");

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connnecting to database'));

db.once('open', function(){
    console.log("Connected to database successfully ");
});

module.exports = db;