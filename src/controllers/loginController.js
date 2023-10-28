const database = require("../config/database");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const Authentication = require("../middleware/authenticationMiddleware");

const login = async (req, res) => {
  const { email, password } = req.body;
  await database.connect();

  try {
    const user = await User.findOne({ email });

    if (user) {
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
        res
          .status(200)
          .json({ message: "kullanıcı Giris basarili", token: token });
      } else {
        console.log("Parola Hatalı");
      }
    } else {
      return res.status(401).json({ message: "Kullanıcı bulunamadı" });
    }
  } catch (error) {
    console.log("Giriş yapılırken hata oluştu", error);
  }
  await database.close();
};
const LoginController = { login };
module.exports = LoginController;
