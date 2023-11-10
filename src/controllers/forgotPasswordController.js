const User = require("../models/user");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.json({ message: "Kullanıcı bulunamadı" });
    }

    const secret = process.env.SECRET_KEY + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "5m",
    });
    var link;

    link = `http://localhost:3000/${oldUser.role}/reset-password/${oldUser._id}/${token}`;

    var transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    var mailOptions = {
      from: {
        name: "Admin",
        address: process.env.MAIL_USER,
      },
      to: email,
      subject: "Password Reset",
      text: link,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error", error);
        res.send(error)
      } else {
        console.log("Email sent: " + info.response);
        res.send("Email gönderildi")
      }
    });
    console.log(link);
  } catch (error) {
    console.log(error);
  }
};

const ForgotPassword = { forgotPassword };

module.exports = ForgotPassword;
