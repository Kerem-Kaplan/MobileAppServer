const User = require("../models/user");
const bcrypt = require("bcrypt");
const getAllUsers = require("./getAllUsers");
const mernisIdentityVerifyService = require("./mernsiIdentityVerifyService");
const database = require("../config/database");
const checkUserEmail = require("./checkUserEmail");

const checkUserIdentity = async (req, res) => {
  try {
    const users = await getAllUsers();
    let results = [];
    for (let index = 0; index < users.length; index++) {
      results[index] = await bcrypt.compare(
        req.body.identityNumberOrPassportNumber,
        users[index].identityNumberOrPassportNumber
      );
    }
    if (results.includes(true)) {
      console.log("Kullanıcı var");
    } else {
      await checkUserEmail(req, res);
    }
    console.log(results);

    //console.log("results", results);
  } catch (error) {
    console.log("Error", error);
  }
};

module.exports = checkUserIdentity;
