const { transporter } = require("./createTransport");

const sendPasswordResetOTP = async (email, otp) => {
  const mailOptions = {
    from: process.env.FROM_MAIL,
    to: email,
    subject: "Password Reset OTP",
    text: `Your OTP for password reset is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendPasswordResetOTP };
