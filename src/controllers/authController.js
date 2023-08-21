const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    console.log(user);
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

    res.json({
      message: "Login Successfully",
      code: 1,
      token: token,
      user: user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
