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
    const token = jwt.sign(
      { email: oldUser.email, role: oldUser.role },
      secret,
      {
        expiresIn: "5m",
      }
    );
    var link;

    link = `http://localhost:3000/${oldUser.role}/reset-password/${oldUser.email}/${token}`;

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
        return res.status(500).json({
          message: "Mail gönderilirken hata oluştu. Tekrar Deneyiniz",
        });
      } else {
        console.log("Email sent: " + info.response);
        return res.status(200).json({ message: "Email gönderildi" });
      }
    });
    console.log(link);
  } catch (error) {
    console.log("Bir şeyler Ters Gitti", error);
    return res.status(500).json({
      message: "Bir şeyler Ters Gitti",
    });
  }
};

const ForgotPassword = { forgotPassword };

module.exports = ForgotPassword;
