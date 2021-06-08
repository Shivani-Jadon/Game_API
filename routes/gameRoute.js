const express = require("express");
const router = express.Router();

const game_controller = require("../controller/gameController");

router.patch("/number/random", game_controller.randomNumber);

router.get("/numbers", game_controller.fetchNumbers);

router.get("/stats", game_controller.fetchStats);

module.exports = router;