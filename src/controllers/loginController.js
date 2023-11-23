const database = require("../config/database");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const Authentication = require("../middleware/authenticationMiddleware");
const nodemailer = require("nodemailer");

const login = async (req, res) => {
  const { email, password } = req.body;
  //await database.connect();
  console.log("req", req.body);

  try {
    const user = await User.findOne({ email });
    if (user) {
      if (user.isVerified === true) {
        const result = await bcrypt.compare(password, user.password);
        console.log(result);
        if (result === true) {
          console.log(user.role);

          const payload = { email: email, role: user.role };
          const token = Authentication.generateToken(
            payload,
            process.env.SECRET_KEY
          );
          console.log(token);
          return res
            .status(200)
            .json({ message: "kullanıcı Giris basarili", token: token });
        } else {
          console.log("Parola Hatalı");
          return res.status(401).json("Hatalı parola");
        }
      } else {
        res.send("Kullanıcı doğrulanmamış");
      }
    } else {
      return res.status(401).json({ message: "Kullanıcı bulunamadı" });
    }
  } catch (error) {
    console.log("Giriş yapılırken hata oluştu", error);
  }
};

const LoginController = { login };
module.exports = LoginController;
