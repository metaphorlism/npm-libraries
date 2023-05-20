const AuthModel = require("../models/auth.model");
const passwordEncoder = require("../utils/PasswordEncoder");
const comparePassword = require("../utils/PasswordValidator");
const generateRandomId = require("../utils/RandomIdGenerator");
const generateAccessToken = require("../utils/TokenGenerator");

class Auth {
  async register(req, res) {
    try {
      //encrypt the user input password before storing to the json file
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
      //find if user exists
      const user = AuthModel.findUserByEmail(req.body.email);

      // if user exists
      if (user) {
        // compare the input password and the stored password
        if (await comparePassword(req.body.password, user.password)) {
          // generate access token with the length of 100
          const token = generateAccessToken(100);
          return res.status(200).json({
            status: "Success",
            message: "Login Successfully !",
            token: token,
          });
        }
        // if compare failed
        return res.status(403).json({
          status: "Fail",
          message: "Incorrect Login Credentials !",
        });
      }

      // if user is not found
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
