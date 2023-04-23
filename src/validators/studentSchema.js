const Joi = require("joi");

const studentSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": "Student name is required" }),
  age: Joi.number()
    .required()
    .messages({ "any.required": "Student age is required" }),
  grade: Joi.number()
    .required()
    .messages({ "any.required": "Student grade is required" }),
  gender: Joi.string().valid("Male", "Female", "Others").required().messages({
    "any.required": "Gender is required",
    "any.only": "Invalid gender type",
  }),
  details: Joi.string().empty(""),
});

module.exports = studentSchema;
