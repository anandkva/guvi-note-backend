const { inviteMail } = require("../emails/inviteMail");

exports.inviteApp = async (req, res) => {
  try {
    const { email } = req.body;
    await inviteMail(email);
    res.json({ code: 1, message: "Invited Successfully" });
  } catch (error) {
    cres.json({ code: 0, message: error });
  }
};
