const User = require("../models/user");
const { SignupValidator } = require("../validators/signupValidator");
const getAllUsers = require("./getAllUsers");
const mernisIdentityVerifyService = require("./mernsiIdentityVerifyService");

const checkUserPhoneNumber = async (req, res) => {
  const existingUser = await User.findOne({
    phoneNumber: req.body.phoneNumber,
  });
  if (existingUser) {
    console.log("Bu telefon numarası zaten kayıtlı");
    return res
      .status(409)
      .json({ message: "Bu telefon numarası zaten kayıtlı" });
  } else if (!SignupValidator.phoneNumberValidator(req.body.phoneNumber)) {
    return res.status(500).json({ message: "Telefon formatı yanlış" });
  } else {
    console.log("Telefon numarası kontrol edildi");
    await mernisIdentityVerifyService(req, res);
  }

  /* const users = await getAllUsers();
  let results = [];
  for (let index = 0; index < users.length; index++) {
    if (users[index].phoneNumber === req.body.phoneNumber) {
      results[index] = true;
    } else {
      results[index] = false;
    }
  }
  if (results.includes(true)) {
    console.log("Bu telefon numarası kayıtlı kayıtlı");
    return res
      .status(409)
      .json({ message: "Bu telefon numarası kayıtlı kayıtlı" });
  } else if (!SignupValidator.phoneNumberValidator(req.body.phoneNumber)) {
    return res.status(500).json({ message: "Telefon formatı yanlış" });
  } else {
    console.log("Control Phone")
    await mernisIdentityVerifyService(req, res);
  } */
};

module.exports = checkUserPhoneNumber;
