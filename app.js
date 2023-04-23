const express = require("express");
const app = express();

app.use(express.json());

//global error handler
const GlobalErrorHandler = require("./src/utils/GlobalErrorHandler");

//routes
const STUDENT_ROUTES = require("./src/routes/students.routes");

app.get("/", (req, res) => {
  res.send("Hello from Metaphorlism");
});

app.use("/students", STUDENT_ROUTES);

app.use(GlobalErrorHandler);

module.exports = app;
