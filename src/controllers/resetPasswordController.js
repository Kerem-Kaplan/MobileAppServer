const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const resetPasswordGet = async (req, res) => {
  const { token } = req.params;
  console.log("Token", token);

  const decodedUser = jwt.verify(token, process.env.SECRET_KEY);
  console.log("decoded User", decodedUser);

  const oldUser = await User.findOne({ email: decodedUser.email });
  if (!oldUser) {
    return res.json({ message: "Kullanıcı bulunamadı" });
  }
  const secret = process.env.SECRET_KEY;
  try {
    const verify = jwt.verify(token, secret);
    res.render("index", { email: verify.email, status: "Notverified" });
  } catch (error) {
    res.send("Not Verified");
  }
};

const resetPasswordPost = async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  console.log("Token", token);

  const decodedUser = jwt.verify(token, process.env.SECRET_KEY);
  console.log("decoded User", decodedUser);

  //console.log(req.body);

  //console.log(req.params);
  const oldUser = await User.findOne({ email: decodedUser.email });
  //console.log("password", password);

  if (!oldUser) {
    return res.json({ message: "Kullanıcı bulunamadı" });
  }

  const secret = process.env.SECRET_KEY;

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
            email: decodedUser.email,
          },
          {
            $set: {
              password: hashedPassword,
            },
          }
        );

        //res.json({ message: "Şifre güncellendi" });
        res.render("index", { email: verify.email, status: "successful" });
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
