const User = require("../models/user");
const { SignupValidator } = require("../validators/signupValidator");
const checkUserPhoneNumber = require("./checkUserPhoneNumber");
const getAllUsers = require("./getAllUsers");

const checkUserEmail = async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });

  if (existingUser) {
    console.log("Bu e-posta zaten kayıtlı");
    return res.status(409).json({ message: "Bu E-posta kayıtlı" });
  } else if (!SignupValidator.gmailValidator(req.body.email)) {
    return res.status(500).json({ message: "E-posta formatı geçersiz" });
  } else {
    console.log("Kontrol");
    await checkUserPhoneNumber(req, res);
  }
  /* const users = await getAllUsers();
  let results = [];
  for (let index = 0; index < users.length; index++) {
    if (users[index].email === req.body.email) {
      results[index] = true;
    } else {
      results[index] = false;
    }
  }
  if (results.includes(true)) {
    console.log("Bu Email kayıtlı ");
    return res.status(409).json({ message: "Bu Email kayıtlı " });
  } else if (!SignupValidator.gmailValidator(req.body.email)) {
    return res.status(500).json({ message: "Email formatı yanlış" });
  } else {
    console.log("Control")
    await checkUserPhoneNumber(req, res);
  } */
};

module.exports = checkUserEmail;
