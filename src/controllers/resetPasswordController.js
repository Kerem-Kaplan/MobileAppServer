const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const resetPasswordGet = async (req, res) => {
  const { email, token } = req.params;
  console.log(req.params);
  const oldUser = await User.findOne({ email: email });
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
  const { email, token } = req.params;
  const { password, confirmPassword } = req.body;

  //console.log(req.body);

  //console.log(req.params);
  const oldUser = await User.findOne({ email: email });
  //console.log("password", password);

  if (!oldUser) {
    return res.json({ message: "Kullanıcı bulunamadı" });
  }

  const secret = process.env.SECRET_KEY + oldUser.password;

  try {
    const verify = jwt.verify(token, secret);
    console.log("token", token);
    if (password !== confirmPassword) {
      /* alert("Şifreler aynı değil"); */
      res.render("index", {
        email: verify.email,
        status: "passwordsDidNotMatch",
      });
    } else {
      if (password.length < 6 || confirmPassword.length < 6) {
        res.render("index", {
          email: verify.email,
          status: "passwordsLengthIsLow",
        });
      } else {
        //console.log("verify", verify);
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.updateOne(
          {
            email: email,
          },
          {
            $set: {
              password: hashedPassword,
            },
          }
        );

        //res.json({ message: "Şifre güncellendi" });
        res.render({ email: verify.email, status: "successful" });
      }
    }
  } catch (error) {
    console.log("Catcherror:", error);
    res.render("index", { status: "error" });
    //res.json({ message: "Bir şeyler yanlış Gitti" });
  }
};

const ResetPasswordController = { resetPasswordGet, resetPasswordPost };

module.exports = ResetPasswordController;
