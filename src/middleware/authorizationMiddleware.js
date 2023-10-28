const database = require("../config/database");
const User = require("../models/user");
const getUserById = require("../services/getUserById");
const Authentication = require("./authenticationMiddleware");

class Authorization {
  checkAuthorization(userRole) {
    return async (req, res, next) => {
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
      console.log("req.params._id", req.params._id);

      if (!decodedUser) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      if (req.params._id !== undefined) {
        await database.connect();
        const user = await User.findOne({ _id: req.params._id });
        console.log(user.email);
        console.log(decodedUser.email);
        if (user.email !== decodedUser.email) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        await database.close();
      }

      if (decodedUser.role !== userRole) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      next();
    };
  }
}

module.exports = new Authorization();
