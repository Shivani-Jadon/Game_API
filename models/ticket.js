const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }, 
    ticket : {
        type : [[Number],[Number],[Number]]
    },
    tambola_game : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Game'
    }
})

const Ticket = mongoose.model('TicketModel', ticketSchema);

module.exports = Ticket;