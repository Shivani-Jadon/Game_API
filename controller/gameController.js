const Game = require("../models/game");
const ticketHelper = require("../helper/tambola");

// controller function to create new game
module.exports.createGame = function(req, res){
    Game.create({
        catogory : req.body.category
    },
        function(err, newGame){
           if(err){
               console.log("Error in creating game", err);
               return;
           } 

           return res.send(`Game generated with id : ${newGame._id}`);
        }
    )
};

// controller function to generate tambola numbers
module.exports.generateNumber = async function(req, res){
    let gameId = req.params['game_id'];
    let game = await Game.findById(gameId).exec();

    try{
        let numberArray = await game.numbers;
        
        let luckyNumber = await ticketHelper.luckyNum(numberArray);
        await game.numbers.push(luckyNumber);
        await game.save();

        return res.send(`Lucky number : ${luckyNumber}`);
    }catch(err){
        console.log("Error in generating random number --->" , err);
    }
    
        
}


// controller function to fetch numbers from tambola
module.exports.fetchNumbers = async function(req, res){
    let gameId = req.params['game_id'];
    let game = await Game.findById(gameId).exec();

    return res.send(game.numbers);
}


// controller function to fetch stats 
module.exports.fetchStats = async function(req, res){
    let gameId = req.params['game_id'];
    let game = await Game.findById(gameId).exec();

    try{       
        return res.send(`Numbers drawn : ${game.numbers.length} 
        Number of tickets : ${game.tickets.length}`);
    }catch(err){
        console.log("Error in fetching log --> ", err);
    }

}