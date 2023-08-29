const express = require("express");
const mailController = require("../controllers/inviteController");
const router = express.Router();

router.post("/invite-mail", mailController.inviteApp);

module.exports = router;
