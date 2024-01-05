const User = require("../models/user");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const createToken = (email, role) => {
  const secret = process.env.SECRET_KEY;
  return jwt.sign({ email, role }, secret, { expiresIn: "5m" });
};

const sendResetEmail = async (email, link) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: {
        name: "Admin",
        address: process.env.MAIL_USER,
      },
      to: email,
      subject: "Password Reset",
      text: link,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return { success: true };
  } catch (error) {
    console.log("error", error);
    return {
      success: false,
      error: "Mail gönderilirken hata oluştu. Tekrar Deneyiniz",
    };
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    const token = createToken(oldUser.email, oldUser.role);
    const link = `http://localhost:3000/${oldUser.role}/reset-password/${token}`;

    const emailResult = await sendResetEmail(email, link);
    if (!emailResult.success) {
      return res.status(500).json({ message: emailResult.error });
    }

    console.log(link);
    return res.status(200).json({ message: "Email gönderildi" });
  } catch (error) {
    console.log("Bir şeyler Ters Gitti", error);
    return res.status(500).json({ message: "Bir şeyler Ters Gitti" });
  }

  /* const { email } = req.body;

  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    const secret = process.env.SECRET_KEY;
    const token = jwt.sign(
      { email: oldUser.email, role: oldUser.role },
      secret,
      {
        expiresIn: "5m",
      }
    );
    var link;

    link = `http://localhost:3000/${oldUser.role}/reset-password/${token}`;

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
  } */
};

const ForgotPassword = { forgotPassword };

module.exports = ForgotPassword;
