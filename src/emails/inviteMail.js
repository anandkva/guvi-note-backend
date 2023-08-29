const { transporter } = require("./createTransport");

const inviteMail = async (email) => {
  const inviteLink = "https://guvi-note-frontend.vercel.app";
  const htmlContent = `
  <body>
  <header>
    <h1>Invitation to Join Guvi Goals</h1>
  </header>

  <main>
    <p>You've been invited to join Guvi Goals, the perfect way to track your progress and achieve your goals!</p>
    <p>Click the button below to get started:</p>
    <a href="${inviteLink}" class="btn btn-primary">Join Guvi Goals</a>
  </main>

  <footer>
    <p>If you have any questions, feel free to contact us at <a href="mailto:anand@guvi.in">anand@guvi.in</a>.</p>
  </footer>
</body>
`;

  const mailOptions = {
    from: process.env.FROM_MAIL,
    to: email,
    subject: "Get started on your goals with Guvi Goals!",
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { inviteMail };
