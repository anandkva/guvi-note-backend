require('dotenv').config();
const express = require("express");
const app = express();
const logger = require("morgan");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const database = require("./src/config/db");
const swaggerDocument = require('./src/doc/swagger.json')
const authRouter = require("./src/routes/authRoutes");
const personalTodoRoutes = require("./src/routes/personalTodoRoutes");
const teamRoutes = require("./src/routes/teamRoutes");
const teamTodoRoutes = require("./src/routes/teamTodoRoutes");



const port = process.env.PORT || 8080;
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));

app.use("/auth", authRouter);
app.use("/personal", personalTodoRoutes);
app.use("/team", teamRoutes);
app.use("/team-todo", teamTodoRoutes);

app.listen(port, (err) => {
  if (!err) {
    console.log(`App running at ${port}`);
  } else {
    console.error(`Error : ${err}`);
  }
});
