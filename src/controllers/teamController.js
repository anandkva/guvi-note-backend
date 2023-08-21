const Team = require('../models/team');

exports.createTeam = async (req, res) => {
  try {
    const { name, members } = req.body;
    const newTeam = new Team({ name, members });
    await newTeam.save();

    res.json({ message: 'Team created successfully', team: newTeam });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

