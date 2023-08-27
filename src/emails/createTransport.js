const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.FROM_MAIL,
    pass: process.env.MAIL_PASS,
  },
});

module.exports = {
  transporter,
};
