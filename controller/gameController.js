const Game = require("../models/game");
const ticketHelper = require("../helper/tambola");

// controller function to create new game
module.exports.createGame = function(req, res){
    Game.create({
        numbers : req.body.numbers,
        difficulty : req.body.difficulty
    },
        function(err, newGame){
           if(err){
               console.log("Error in creating game", err);
               return;
           } 

           console.log("### ", newGame);
           return res.send("Game generated");
        }
    )
};

// controller function to fetch tambola numbers
module.exports.fetchNumbers = async function(req, res){
    let gameId = req.params['game_id'];
    let game = await Game.findById(gameId);

    try{
        let numberArray = await game.numbers;
        let luckyNumber = await ticketHelper.luckyNum();
        
        game.numbers.push(luckyNumber);
        await game.save();

    return res.send("Lucky number : ", luckyNumber);
    }catch(err){
        console.log("Error in generating random number --->" , err);
    }
    
        
}


// controller function to generate a randon number for tambola
module.exports.randomNumber = async function(req, res){
    let gameId = req.params['game_id'];
    let game = await Game.findById(gameId).exec();

    return res.send(game.numbers);
}


// controller function to fetch stats 
module.exports.fetchStats = async function(req, res){
    let gameId = req.params['game_id'];
    let game = await Game.findById(gameId).exec();

    return res.send(`Numbers drawn : ${game.numbers.length()} \n
                    Number of tickets : ${game.tickets.length()}`);
}