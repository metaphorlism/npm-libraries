const AuthModel = require("../models/auth.model");
const passwordEncoder = require("../utils/PasswordEncoder");
const comparePassword = require("../utils/PasswordValidator");
const generateRandomId = require("../utils/RandomIdGenerator");
const generateAccessToken = require("../utils/TokenGenerator");

class Auth {
  async register(req, res) {
    try {
      req.body.password = await passwordEncoder(req.body.password);
      req.body.id = generateRandomId(12);

      AuthModel.register(req.body);

      res.status(201).json({
        status: "Success",
        message: "User created successfully !",
      });
    } catch (error) {
      res.status(500).json({
        status: "Fail",
        message: error.message,
      });
    }
  }

  async login(req, res) {
    try {
      const user = AuthModel.findUserByEmail(req.body.email);
      if (user) {
        if (await comparePassword(req.body.password, user.password)) {
          const token = generateAccessToken(100);
          return res.status(200).json({
            status: "Success",
            message: "Login Successfully !",
            token: token,
          });
        }
        return res.status(403).json({
          status: "Fail",
          message: "Incorrect Login Credentials !",
        });
      }
      res.status(400).json({
        status: "Fail",
        message: `No user with email: ${req.body.email}`,
      });
    } catch (error) {
      res.status(500).json({
        status: "Fail",
        message: error.message,
      });
    }
  }
}

module.exports = new Auth();
