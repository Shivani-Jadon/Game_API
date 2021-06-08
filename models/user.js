const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    }, 
    email : {
        type : String,
        required : true
    },
    gender : {
        type : String,
    },
    age : {
        type : Number,
        default : 18
    },
    tambola_ticket : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Ticket'
    }]
})

const User = mongoose.model('UserModel', userSchema);

module.exports = User;