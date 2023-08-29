const { transporter } = require("./createTransport");

const sendPasswordResetOTP = async (email, otp) => {
  const htmlContent = `
  <body>
  <header>
    <h1>OTP for Password Change</h1>
  </header>

  <main>
    <p>Hi there,</p>
    <p>We have received a request to change your password. To complete the password change process, please enter the OTP below.</p>
    <p>OTP: <strong>${otp}</strong></p>
    <p>This OTP is valid for 10 minutes. If you do not receive the OTP, please click the button below to request a new one.</p>
  </main>

  <footer>
    <p>If you have any questions, please contact us at <a href="mailto:anand@guvi.in">anand@guvi.in</a>.</p>
  </footer>
</body>
  `;

  const mailOptions = {
    from: process.env.FROM_MAIL,
    to: email,
    subject: "Password Reset OTP",
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendPasswordResetOTP };
