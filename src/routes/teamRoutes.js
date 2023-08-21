const express = require("express");
const router = express.Router();
const { authToken } = require("../middleware/auth");
const teamController = require("../controllers/teamController");

router.post("/create", authToken, teamController.createTeam);

module.exports = router;
