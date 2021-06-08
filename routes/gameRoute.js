const express = require("express");
const router = express.Router();

const game_controller = require("../controller/gameController");
const ticket_controller = require("../controller/ticketController");

router.post("/:game_id/ticket/:user_name/generate", ticket_controller.generateTicket);

router.put("/:game_id/number/random", game_controller.generateNumber);

router.get("/:game_id/numbers", game_controller.fetchNumbers);

router.get("/:game_id/stats", game_controller.fetchStats);

module.exports = router;