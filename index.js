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

// creating new game
app.post('/api/game/create', function(req, res){
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
           return res.json();
        }
    )
});

// creating new user
app.post('/user/create', function(req, res){
    console.log(req.body);
    console.log(req.params);
    User.create({
        username : req.body.username,
        email : req.body.email,
        gender : req.body.gender,
        age : req.body.age
    },
        function(err, newUser){
           if(err){
               console.log("Error in creating user", err);
               return;
           } 

           console.log("### ", newUser);
           return res.json();
        }
    )
});

// creating new ticket
app.post('/api/game/:game_id/ticket/:user_name/generate',async function(req, res){
    let gameId = req.params['game_id'];
    let userName = req.params['user_name']
    let game = await Game.findById(gameId);
    let user = await User.findOne({username : userName});

    let array = [
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0]
    ];

    for(let i=0; i<3; i++){
        let count = 0;
        while(count < 5){
            let index = Math.floor(Math.random() * 9);

            if(array[i][index] == 0){
                array[i][index] = Math.floor(Math.random() * 100) * 1;
                count++;
            }
        }
    }

    let tambolaTicket = await Ticket.create({
        ticket : array
    }
    );

    game.tickets.push(tambolaTicket);
    // console.log(tambolaTicket);
    game.save();

    user.tambola_ticket.push(tambolaTicket);
    user.save();

    tambolaTicket = await Ticket.populate(tambolaTicket, {path : 'tambola_game',path: 'user'});

    return res.json();
});

app.get('/ticket/:ticket_id', async function(req, res){
    let ticketId = req.params['ticket_id'];
    let ticketData = await Ticket.findById(ticketId).exec();

    console.log(ticketId);
    // return res.send(ticketData.ticket);
    return res.render("ticket", {ticket : ticketData.ticket});
});


app.listen(port, function(err){
    if(err){
        console.log("Error starting the server -- ", err);
        return;
    }

    console.log("The server is up and running at port - ", port);

})