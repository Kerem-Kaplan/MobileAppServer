const bcrypt = require("bcrypt");

const bcryptCompare = async (inputItem, hashedItem) => {
  const comparedInput = await bcrypt.compare(inputItem, hashedItem);
  console.log(comparedInput);
  return comparedInput;
};

module.exports = bcryptCompare;
