const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendPasswordResetOTP } = require("../emails/passwordResetOTP");

const generateOTP = () => {
  const otpLength = 6;
  const otpChars = "0123456789";
  let otp = "";
  for (let i = 0; i < otpLength; i++) {
    const randomIndex = Math.floor(Math.random() * otpChars.length);
    otp += otpChars[randomIndex];
  }
  return otp;
};

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const smallEmail = email.toLowerCase();
    const existingUser = await User.findOne({ email: smallEmail });
    if (existingUser) {
      res.json({ message: "User already exist", code: 0 });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();
      res.json({ message: "User registered successfully", code: 1 });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const smallEmail = email.toLowerCase();
    const user = await User.findOne({ email: smallEmail });
    if (user === null) {
      return res.json({ message: "User Not Found", code: 3 });
    }
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      return res.json({ message: "Password Not Matched", code: 2 });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "3h",
      }
    );
    const filterUser = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    res.json({
      message: "Login Successfully",
      code: 1,
      token: token,
      user: filterUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.sendResetOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User not found." });
    }
    const otp = generateOTP();
    user.resetOTP = otp;
    user.resetOTPExpiry = Date.now() + 600000;
    await user.save();
    await sendPasswordResetOTP(email, otp);
    res.json({ code: 1, message: "Password reset OTP sent." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.resetPasswordWithOTP = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({
      email,
      resetOTP: otp,
      resetOTPExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return res.json({ code: 0, message: "Invalid or expired OTP." });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    user.password = hashedPassword;
    user.resetOTP = undefined;
    user.resetOTPExpiry = undefined;
    await user.save();
    res.json({ code: 1, message: "Password reset successful." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { email: 1, username: 1 });

    res.status(200).json({ code: 1, users });
  } catch (error) {
    res.status(500).json({ code: 0, message: "Internal Server Error" });
  }
};
