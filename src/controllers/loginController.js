const User = require("../models/user");
const bcrypt = require("bcrypt");
const Authentication = require("../middleware/authenticationMiddleware");
const jwt = require("jsonwebtoken");
const Observer = require("../models/observer");
const fs = require("fs");

const findAndVerifyUser = async (email, password) => {
  let userData = await User.find({ email });
  if (!userData[0]) {
    userData = await Observer.find({ email });
    if (!userData[0]) {
      return { user: null, message: "User Not Found" };
    }
  }

  const user = userData[0];
  console.log("userLogin", user);

  if (!user.isVerified) {
    return { user: null, message: "User is not verified" };
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  console.log(isValidPassword);

  if (!isValidPassword) {
    console.log("Password wrong");
    return { user: null, message: "Password wrong" };
  }

  return { user, message: "Login successful" };
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("req", req.body);

  try {
    const { user, message } = await findAndVerifyUser(email, password);

    if (!user) {
      return res.status(401).json({ message });
    }

    const payload = { email, role: user.role };
    const token = Authentication.generateToken(payload, process.env.SECRET_KEY);
    console.log(token);

    return res.status(200).json({ message, token });
  } catch (error) {
    console.log("An error occurred while logging in", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }

  /*  const { email, password } = req.body;
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
  } */
};

const decodeToken = async (req, res) => {
  console.log("req token:", req.body);

  try {
    jwt.verify(req.body.token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log("Token Geçersiz", err);
        return res.status(401).json({ message: "Invalid Token" });
      }

      console.log("decoded", decoded);
      const userEmail = decoded.email;
      const userRole = decoded.role;

      console.log(
        `Hoş geldiniz, Kullanıcı mail: ${userEmail}, Kullanıcı rol: ${userRole}`
      );

      return res.status(200).json({ decodedToken: decoded });
    });
  } catch (error) {
    console.log("Token doğrulanamadı", error);
    return res.status(500).json({ message: "Token verification failed" });
  }
  /* console.log(" req token:", req.body);
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
  } */
};

const getAppIcon = async (req, res) => {
  const image = fs.readFileSync("src/assets/appIcon.png");
  const base64Image = Buffer.from(image).toString("base64");
  return res.status(200).json({ appIcon: base64Image });
};

const LoginController = { login, decodeToken, getAppIcon };
module.exports = LoginController;
