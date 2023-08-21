const express = require("express");
const router = express.Router();
const { authToken } = require("../middleware/auth");
const personalTodoController = require("../controllers/personalTodoController");

router.post(
  "/create-todo",
  authToken,
  personalTodoController.createPersonalTodo
);

router.delete(
  "/delete-todo/:id",
  authToken,
  personalTodoController.deletePersonalTodo
);

router.put(
  "/edit-todo/:id",
  authToken,
  personalTodoController.editPersonalTodo
);

module.exports = router;
