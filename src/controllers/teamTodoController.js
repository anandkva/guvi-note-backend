const TeamTodo = require("../models/teamTodo");

exports.createTeamTodo = async (req, res) => {
  try {
    const { title, description, deadline, memberId } = req.body;
    const createdBy = req.auth.id;
    const newTeamTodo = new TeamTodo({
      title,
      description,
      deadline,
      members: memberId,
      created: { by: createdBy },
    });

    await newTeamTodo.save();

    res.json({
      code: 1,
      message: "Team todo created successfully",
      teamTodo: newTeamTodo,
    });
  } catch (error) {
    res.status(400).json({ code: 0, message: error.message });
  }
};

exports.updateTeamTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, comment, members, deadline } = req.body;

    const updatedFields = {};

    if (title) {
      updatedFields.title = title;
    }

    if (description) {
      updatedFields.description = description;
    }

    if (status) {
      updatedFields.status = status;
    }

    if (members) {
      updatedFields.members = members;
    }

    if (comment) {
      const newComment = {
        memberId: req.auth.id,
        text: comment,
      };
      if (!updatedFields.$push) {
        updatedFields.$push = {};
      }
      updatedFields.$push.comments = newComment;

      const updateRecord = {
        by: req.auth.id,
        at: new Date(),
        comment: `Edited by ${req.auth.email}`,
      };
      if (!updatedFields.$push) {
        updatedFields.$push = {};
      }
      updatedFields.$push.updated = updateRecord;
    }

    if (deadline) {
      updatedFields.deadline = deadline;
    }

    const updatedTeamTodo = await TeamTodo.findByIdAndUpdate(
      id,
      updatedFields,
      { new: true }
    );

    if (!updatedTeamTodo) {
      return res.status(404).json({ code: 0, message: "Team todo not found" });
    }

    res.json({
      code: 1,
      message: "Team Goal updated successfully",
      teamTodo: updatedTeamTodo,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTeamTodo = async (req, res) => {
  try {
    const { todoId } = req.params;

    const deletedTeamTodo = await TeamTodo.findByIdAndDelete({ _id: todoId });

    if (!deletedTeamTodo) {
      return res.status(404).json({ code: 0, message: "Team todo not found" });
    }

    res.json({
      code: 1,
      message: "Team todo deleted successfully",
      deletedTeamTodo,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTeamTodoByMemberIds = async (req, res) => {
  try {
    const { memberId } = req.params;

    const teamTodos = await TeamTodo.find(
      { members: { $in: memberId } },
      { title: 1, description: 1, deadline: 1, status: 1, created: 1 }
    ).populate("created.by", "username");

    res.json({
      code: 1,
      message: "Team todos fetched successfully",
      teamTodos,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.getTeamTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const teamTodo = await TeamTodo.findById(id);

    if (!teamTodo) {
      return res.json({ code: 0, message: "Team todo not found" });
    }

    res.json({
      code: 1,
      message: "Team todo fetched successfully",
      teamTodo,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
