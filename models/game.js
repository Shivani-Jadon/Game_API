const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    numbers : {
            type : [Number]
        },
    tickets : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Ticket'
    }],
    
})

const Game = mongoose.model('GameModel', gameSchema);

module.exports = Game;