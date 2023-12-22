const Authentication = require("../middleware/authenticationMiddleware");

const decodeUser = async (req, res) => {
  const reqHeader = req.headers["authorization"];
  console.log("reqHeader", reqHeader);
  const token = reqHeader && reqHeader.split(" ")[1];
  console.log("token", token);

  process.env.SECRET_KEY;
  const decodedUser = Authentication.verifyToken(token, process.env.SECRET_KEY);
  console.log("decoded User", decodedUser);

  return decodedUser;
};

module.exports = { decodeUser };
