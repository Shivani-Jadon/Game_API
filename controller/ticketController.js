const Game = require("../models/game");
const Ticket = require("../models/ticket");
const User = require("../models/user");
const ticketHelper = require("../helper/tambola");

// controller function for generating ticket
module.exports.generateTicket = async function(req, res){
    let gameId = req.params['game_id'];
    let userName = req.params['user_name']
    let game = await Game.findById(gameId);
    let user = await User.findOne({username : userName});
    let uniqueTicket = await ticketHelper.uniqueTicket();
    
    let tambolaTicket = await Ticket.create({
        ticket : uniqueTicket
    }
    );

    game.tickets.push(tambolaTicket);
    game.save();

    user.tambola_ticket.push(tambolaTicket);
    user.save();

    // populating newly created ticket
    tambolaTicket = await Ticket.populate(tambolaTicket, {path : 'tambola_game',path: 'user'});

    return res.send("Ticket generated");
}


// controller function for fetching ticket and presenting ticket in html table
module.exports.fetchTicket =  async function(req, res){
    let ticketId = req.params['ticket_id'];
    let ticketData = await Ticket.findById(ticketId).exec();

    console.log(ticketId);
    // return res.send(ticketData.ticket);
    return res.render("ticket", {ticket : ticketData.ticket});
};