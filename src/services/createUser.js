const User = require("../models/user");

function createUser(username, email, password) {
  const user = new User({ username, email, password });
  return user.save();
}

function getUserById(userId) {
  return User.findById(userId);
}

module.exports = {
  createUser,
  getUserById,
};
