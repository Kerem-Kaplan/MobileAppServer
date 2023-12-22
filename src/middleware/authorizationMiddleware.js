const User = require("../models/user");
const Authentication = require("./authenticationMiddleware");

class Authorization {
  checkAuthorization(userRole) {
    return async (req, res, next) => {
      console.log("Req,", req.headers);
      const authHeader = req.headers["authorization"];
      console.log("authHeader", authHeader);

      const token = authHeader && authHeader.split(" ")[1];

      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      process.env.SECRET_KEY;
      const decodedUser = Authentication.verifyToken(
        token,
        process.env.SECRET_KEY
      );

      console.log("USERRRRR:", decodedUser);

      if (!decodedUser) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      if (req.params.email !== undefined) {
        const user = await User.findOne({ email: req.params.email });
        console.log(user.email);
        console.log(decodedUser.email);
        if (user.email !== decodedUser.email) {
          return res.status(401).json({ message: "Unauthorized" });
        }
      }

      if (decodedUser.role !== userRole) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      next();
    };
  }
}

module.exports = new Authorization();
