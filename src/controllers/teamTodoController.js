const TeamTodo = require("../models/teamTodo");
const Team = require("../models/team");

exports.createTeamTodo = async (req, res) => {
  try {
    const { teamId, title, description } = req.body;

    const newTeamTodo = new TeamTodo({ teamId, title, description });
    await newTeamTodo.save();

    const team = await Team.findOne({ _id: teamId });
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    team.todos.push(newTeamTodo._id); // Assuming todos is an array of ObjectIds
    await team.save();

    res.json({
      message: "Team todo created successfully",
      teamTodo: newTeamTodo,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTeamTodo = async (req, res) => {
  try {
    const { todoId, title, description, status } = req.body;

    const teamTodo = await TeamTodo.findOne({ _id: todoId });
    if (!teamTodo) {
      return res.status(404).json({ message: "Team todo not found" });
    }

    teamTodo.title = title || teamTodo.title;
    teamTodo.description = description || teamTodo.description;
    teamTodo.status = status || teamTodo.status;

    await teamTodo.save();

    res.json({ message: "Team todo updated successfully", teamTodo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTeamTodo = async (req, res) => {
  try {
    const { todoId } = req.params;

    const teamTodo = await TeamTodo.findOneAndDelete({ _id: todoId });
   
    if (!teamTodo) {
      return res.status(404).json({ message: "Team todo not found" });
    }

    const team = await Team.findOne({ _id: teamTodo.teamId });
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    team.todos.pull(todoId);
    await team.save();

    res.json({ message: "Team todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
