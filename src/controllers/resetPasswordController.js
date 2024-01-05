const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const resetPasswordGet = async (req, res) => {
  try {
    const { token } = req.params;
    console.log("Token", token);

    const decodedUser = jwt.verify(token, process.env.SECRET_KEY);
    console.log("decoded User", decodedUser);

    const oldUser = await User.findOne({ email: decodedUser.email });

    if (!oldUser) {
      return res.json({ message: "Kullanıcı bulunamadı" });
    }
    const secret = process.env.SECRET_KEY;
    const verifiedToken = jwt.verify(token, secret);
    if (verifiedToken) {
      return res.render("index", {
        email: verifiedToken.email,
        status: "Not verified",
      });
    } else {
      return res.send("Not Verified");
    }
  } catch (error) {
    console.log("Şifre sıfırlama hatası:", error);
    return res
      .status(500)
      .json({ error: "Şifre sıfırlama işlemi sırasında bir hata oluştu" });
  }
};

const resetPasswordPost = async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;
  console.log("Token", token);

  try {
    const decodedUser = jwt.verify(token, process.env.SECRET_KEY);
    console.log("decoded User", decodedUser);

    const oldUser = await User.findOne({ email: decodedUser.email });
    //console.log("password", password);

    if (!oldUser) {
      return res.json({ message: "Kullanıcı bulunamadı" });
    }

    if (password !== confirmPassword) {
      /* alert("Şifreler aynı değil"); */
      return res.render("index", {
        email: decodedUser.email,
        status: "passwordsDidNotMatch",
      });
    }
    if (password.length < 6 || confirmPassword.length < 6) {
      res.render("index", {
        email: decodedUser.email,
        status: "passwordsLengthIsLow",
      });
    }

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

    return res.render("index", {
      email: decodedUser.email,
      status: "successful",
    });
  } catch (error) {
    console.log("Şifre sıfırlama hatası:", error);
    return res.render("index", { status: "error" });
  }

  //console.log(req.params);
};

const ResetPasswordController = { resetPasswordGet, resetPasswordPost };

module.exports = ResetPasswordController;
