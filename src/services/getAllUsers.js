const User = require("../models/user");

const getAllUsers = async () => {
  const users = await User.find({ role: "user" });
  //console.log("result", users);
  return users;
};

module.exports = getAllUsers;
