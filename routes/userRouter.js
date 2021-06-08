const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");

// route for creating new user
router.post("/create", userController);

module.exports = router;