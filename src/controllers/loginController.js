const User = require("../models/user");
const bcrypt = require("bcrypt");
const Authentication = require("../middleware/authenticationMiddleware");
const jwt = require("jsonwebtoken");
const Observer = require("../models/observer");

const login = async (req, res) => {
  const { email, password } = req.body;
  //await database.connect();
  console.log("req", req.body);

  try {
    const user = await User.find({ email });
    console.log("userr login", user);
    if (user[0]) {
      if (user[0].isVerified === true) {
        const result = await bcrypt.compare(password, user[0].password);
        console.log(result);
        if (result === true) {
          console.log(user[0].role);

          const payload = { email: email, role: user[0].role };
          const token = Authentication.generateToken(
            payload,
            process.env.SECRET_KEY
          );
          console.log(token);
          return res
            .status(200)
            .json({ message: "Login is succesfully", token: token });
        } else {
          console.log("Password wrong");
          return res.status(401).json({ message: "Password wrong" });
        }
      } else {
        return res.status(401).json({ message: "User is not verified" });
      }
    } else {
      const observer = await Observer.find({ email });
      console.log("observer login", observer);

      if (observer[0]) {
        const result = await bcrypt.compare(password, observer[0].password);
        console.log(result);
        if (result === true) {
          console.log(observer[0].role);
          const payload = { email: email, role: observer[0].role };
          const token = Authentication.generateToken(
            payload,
            process.env.SECRET_KEY
          );
          console.log(token);
          return res
            .status(200)
            .json({ message: "Login is succesfully", token: token });
        } else {
          console.log("Password wrong");
          return res.status(401).json({ message: "Password wrong" });
        }
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    }
  } catch (error) {
    console.log("An error occurred while logging in", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const decodeToken = async (req, res) => {
  console.log(" req token:", req.body);
  try {
    return jwt.verify(
      req.body.token,
      process.env.SECRET_KEY,
      (err, decoded) => {
        if (err) {
          return console.log("Token Geçersiz", err);
        }

        console.log("decoded", decoded);
        const userEmail = decoded.email;
        const userRole = decoded.role;

        console.log(
          `Hoş geldiniz, Kullanıcı mail: ${userEmail}, Kullanıcı rol: ${userRole}`
        );

        return res.status(200).json({ decodedToken: decoded });
      }
    );
  } catch (error) {
    console.log("Token doğrulanamadı", error);
  }
};

const LoginController = { login, decodeToken };
module.exports = LoginController;
