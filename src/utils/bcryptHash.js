const bcrypt = require("bcrypt");

const bcryptHash = async (inputItem, saltRounds) => {
  const hashedInput = await bcrypt.hash(inputItem, saltRounds);
  return hashedInput;
};

module.exports = bcryptHash;
