const User = require("../models/user");

const getUserById = async (_id) => {
  console.log("_idddd", _id);
  const user = await User.find({ _id });
  console.log("userrrrrr", user);
  return user;
};

module.exports = getUserById;
