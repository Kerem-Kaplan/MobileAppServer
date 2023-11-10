const { check, validationResult } = require("express-validator");

const loginValidationRules = () => {
  return [
    check("email").notEmpty().withMessage("Email Zorunludur"),
    check("password").notEmpty().withMessage("Şifre Zorunludur"),
    check("email").isEmail().withMessage("Email alanı doğru değil"),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() });
  }
  next();
};

const LoginValidator = { loginValidationRules, validate };

module.exports = LoginValidator;
