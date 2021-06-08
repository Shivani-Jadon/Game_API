const express = require("express");
const router = express.Router();

const game_controller = require("../controller/gameController");
const ticket_controller = require("../controller/ticketController");

// route for handling post request for creating new game
router.post("/api/game/create", game_controller);

// route for handling get request for printing ticket
router.get("/ticket/:ticket_id", ticket_controller);

// handling routes by gameRouter
router.use("/api/game/:game_id", require("./gameRoute"));

// handling routes by userRouter
router.use("/api/user", require("./userRouter"));

module.exports = router;