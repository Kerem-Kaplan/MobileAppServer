const getAllUsers = require("./getAllUsers");
const mernisIdentityVerifyService = require("./mernsiIdentityVerifyService");

const checkUserPhoneNumber = async (req, res) => {
  const users = await getAllUsers();
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
  } else {
    await mernisIdentityVerifyService(req, res);
  }
};

module.exports = checkUserPhoneNumber;
