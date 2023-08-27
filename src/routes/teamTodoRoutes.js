const express = require("express");
const router = express.Router();
const { authToken } = require("../middleware/auth");
const teamTodoController = require("../controllers/teamTodoController");

router.post("/create-todo", authToken, teamTodoController.createTeamTodo);

router.put("/update-todo", authToken, teamTodoController.updateTeamTodo);

router.delete(
  "/delete-todo/:todoId",
  authToken,
  teamTodoController.deleteTeamTodo
);

router.get(
  "/team-todos/:teamId",
  authToken,
  teamTodoController.getAllTeamTodos
);

module.exports = router;
