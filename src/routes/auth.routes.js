const express = require("express");
const router = express.Router();

//controller
const Auth = require("../controllers/auth.controller");

router.post("/register", Auth.register);
router.post("/login", Auth.login);

module.exports = router;
