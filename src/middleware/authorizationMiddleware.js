const Authentication = require("./authenticationMiddleware");

class Authorization {
  checkAuthorization(req, res, next) {
    const authHeader = req.headers["authorization"];
    console.log("authHeader", authHeader);

    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    process.env.SECRET_KEY;
    const user = Authentication.verifyToken(token, process.env.SECRET_KEY);
    console.log("USERRRRR:", user);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    next();
  }
}

module.exports = new Authorization();
