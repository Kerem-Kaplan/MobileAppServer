const { SignupValidator } = require("../validators/signupValidator");
const checkUserPhoneNumber = require("./checkUserPhoneNumber");
const getAllUsers = require("./getAllUsers");

const checkUserEmail = async (req, res) => {
  const users = await getAllUsers();
  let results = [];
  for (let index = 0; index < users.length; index++) {
    if (users[index].email === req.body.email) {
      results[index] = true;
    } else {
      results[index] = false;
    }
  }
  if (results.includes(true)) {
    console.log("Bu Email kayıtlı");
    res.send("Email kayıtlı");
  } else if (!SignupValidator.gmailValidator(req.body.email)) {
    console.log("Email formatı yanlış");
    res.send("Email formatı yanlış");
  } else {
    await checkUserPhoneNumber(req, res);
  }
};

module.exports = checkUserEmail;
