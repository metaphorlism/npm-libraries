const StudentModel = require("../models/students.model");

class Student {
  async createStudent(req, res) {
    const student = await StudentModel.create(req.body);

    res.status(201).json({
      status: "Success",
      message: "Created Successfully",
      student,
    });
  }
}

module.exports = new Student();
