const User = require("../models/user");

const getAllUsers = async () => {
  const users = await User.find({});
  //console.log("result", users);
  return users;
};

module.exports = getAllUsers;
