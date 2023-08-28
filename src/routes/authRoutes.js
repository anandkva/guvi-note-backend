const express = require("express");
const authController = require("../controllers/authController");
const { authToken } = require("../middleware/auth");
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/send-reset-otp", authController.sendResetOTP);
router.post("/reset-password", authController.resetPasswordWithOTP);
router.get("/get-all", authToken, authController.getAllUsers);

module.exports = router;
