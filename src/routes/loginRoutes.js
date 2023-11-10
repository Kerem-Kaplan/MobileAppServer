const express = require("express");
const LoginController = require("../controllers/loginController");
const LoginValidator = require("../validators/loginValidator");
const router = express.Router();

router.post(
  "/login",
  LoginValidator.loginValidationRules(),
  LoginValidator.validate,
  LoginController.login
);

module.exports = router;
