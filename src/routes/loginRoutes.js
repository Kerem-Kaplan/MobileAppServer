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

router.post("/decode-token", LoginController.decodeToken);

router.get("/get-app-icon", LoginController.getAppIcon);

module.exports = router;
