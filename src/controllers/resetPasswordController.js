const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const resetPasswordGet = async (req, res) => {
  const { _id, token } = req.params;
  console.log(req.params);
  const oldUser = await User.findOne({ _id: _id });
  if (!oldUser) {
    return res.json({ message: "Kullanıcı bulunamadı" });
  }
  const secret = process.env.SECRET_KEY + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("index", { email: verify.email, status: "Notverified" });
  } catch (error) {
    res.send("Not Verified");
  }
};

const resetPasswordPost = async (req, res) => {
  const { _id, token } = req.params;
  const { password, confirmPassword } = req.body;

  //console.log(req.body);

  //console.log(req.params);
  const oldUser = await User.findOne({ _id: _id });
  //console.log("password", password);

  if (!oldUser) {
    return res.json({ message: "Kullanıcı bulunamadı" });
  }

  const secret = process.env.SECRET_KEY + oldUser.password;

  try {
    const verify = jwt.verify(token, secret);
    if (password !== confirmPassword) {
      /* alert("Şifreler aynı değil"); */
      res.render("index", { email: verify.email, status: "error" });
    } else {
      //console.log("verify", verify);
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.updateOne(
        {
          _id: _id,
        },
        {
          $set: {
            password: hashedPassword,
          },
        }
      );

      res.json({ message: "Şifre güncellendi" });
      res.render("index", { email: verify.email, status: "verified" });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "Bir şeyler yanlış Gitti" });
  }
};

const ResetPasswordController = { resetPasswordGet, resetPasswordPost };

module.exports = ResetPasswordController;
