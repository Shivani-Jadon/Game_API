const Game = require("../models/game");
const Ticket = require("../models/ticket");
const User = require("../models/user");
const ticketHelper = require("../helper/tambola");

// controller function for generating ticket
module.exports.generateTicket = async function(req, res){
    
    try{
        let gameId = req.params['game_id'];    
        let userName = req.params['user_name']
        let game = await Game.findById(gameId);
        let user = await User.findOne({username : userName});
        

        if(game || user){
            let uniqueTicket = await ticketHelper.uniqueTicket();
            let tambolaTicket = await Ticket.create({          
                ticket : uniqueTicket
            });
        
            await game.tickets.push(tambolaTicket);
            await game.save();
        
            await user.tambola_ticket.push(tambolaTicket);
            await user.save();
        
            // populating newly created ticket
            tambolaTicket = await Ticket.populate(tambolaTicket, {path : 'tambola_game',path: 'user'});
            return res.send(`Ticket generated : ${tambolaTicket._id}`);
        }
        
    }catch(err){
        console.log("User or game does not exist or some other error -->  ", err);
        return res.send("Ticket cannot be generated");
    }
    
}


// controller function for fetching ticket and presenting ticket in html table
module.exports.fetchTicket =  async function(req, res){
    let ticketId = req.params['ticket_id'];
    let ticketData = await Ticket.findById(ticketId).exec();

    return res.render("ticket", {ticket : ticketData.ticket});
};