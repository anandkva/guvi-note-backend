const PersonalTodo = require("../models/personalTodo");

exports.createPersonalTodo = async (req, res) => {
  try {
    const { userId, title, description, status } = req.body;

    const personalTodo = new PersonalTodo({
      title,
      description,
      status,
      userId,
    });
    await personalTodo.save();
    res.json({
      message: "Personal todo created successfully",
      todo: personalTodo,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePersonalTodo = async (req, res) => {
    try {
      const todoId = req.params.id;

      const todo = await PersonalTodo.findOneAndDelete({ _id: todoId });
      if (!todo) {
        return res.status(404).json({ message: 'Personal todo not found' });
      }
  
      res.json({ message: 'Personal todo deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

exports.editPersonalTodo = async (req, res) => {
  try {
    const todoId = req.params.id;

    const { title, description, status } = req.body;

    const todo = await PersonalTodo.findOne({ _id: todoId });
    if (!todo) {
      return res.status(404).json({ message: "Personal todo not found" });
    }

    todo.title = title;
    todo.description = description;
    todo.status = status;

    await todo.save();

    res.json({ message: "Personal todo updated successfully", todo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
