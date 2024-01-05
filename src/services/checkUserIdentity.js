const bcrypt = require("bcrypt");
const getAllUsers = require("./getAllUsers");
const checkUserEmail = require("./checkUserEmail");
const { SignupValidator } = require("../validators/signupValidator");

const checkUserIdentity = async (req, res) => {
  try {
    const users = await getAllUsers();
    console.log(users);
    let results = [];
    for (let index = 0; index < users.length; index++) {
      results[index] = await bcrypt.compare(
        req.body.identityNumberOrPassportNumber,
        users[index].identityNumberOrPassportNumber
      );
    }
    console.log(results);
    if (results.includes(true)) {
      console.log("Bu kullanıcı zaten kayıtlı");
      return res
        .status(409)
        .json({ message: "Bu Kimlikle Kayıt Bulunmaktadır" });
    } else if (
      !SignupValidator.identityNumberOrPassportNumberValidator(
        req.body.identityNumberOrPassportNumber
      )
    ) {
      return res.status(500).json({ message: "ID Uzunluğu 11 olmalı" });
    } else {
      await checkUserEmail(req, res);
    }
  } catch (error) {
    return res.status(500).json({ message: "Yanlış gitti bir şeyler" });
  }
};

module.exports = checkUserIdentity;
