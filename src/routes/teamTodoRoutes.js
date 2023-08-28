const express = require("express");
const router = express.Router();
const { authToken } = require("../middleware/auth");
const teamTodoController = require("../controllers/teamTodoController");

router.post("/create-goal", authToken, teamTodoController.createTeamTodo);

router.put(
  "/update-goal/:id",
  authToken,
  teamTodoController.updateTeamTodo
);

router.delete(
  "/delete-goal/:todoId",
  authToken,
  teamTodoController.deleteTeamTodo
);

router.get(
  "/team-goal/:memberId",
  authToken,
  teamTodoController.getTeamTodoByMemberIds
);
router.get(
  "/goal/:id",
  authToken,
  teamTodoController.getTeamTodoById
);

module.exports = router;
