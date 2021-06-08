const express = require("express");
const router = express.Router();

const game_controller = require("../controller/gameController");
const ticket_controller = require("../controller/ticketController");

// route for handling post request for creating new game
router.post("/api/game/create", game_controller.createGame);

// route for handling get request for printing ticket
router.get("/ticket/:ticket_id", ticket_controller.fetchTicket);

// handling routes by gameRouter
router.use("/api/game", require("./gameRoute"));

// handling routes by userRouter
router.use("/api/user", require("./userRouter"));

module.exports = router;