const express = require("express");
const router = express.Router();

//controller
const StudentController = require("../controllers/students.controller");

//validator
const bodyValidator = require("../middlewares/bodyValidator");
const studentSchema = require("../validators/studentSchema");

router
  .route("/")
  .post(bodyValidator(studentSchema), StudentController.createStudent);

module.exports = router;
