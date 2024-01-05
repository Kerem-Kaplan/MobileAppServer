const nodemailer = require("nodemailer");

const generateVerificationLink = (userEmail) => {
  return `http://localhost:3000/user/verify?email=${userEmail}`;
};

const sendVerificationEmail = (userEmail) => {
  console.log(userEmail);

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
      name: "Complaint App",
      address: process.env.MAIL_USER,
    },
    to: userEmail,
    subject: "Verify Email",
    text: `Hesabınızı doğrulamak için lütfen aşağıdaki bağlantıyı ziyaret edin:\n ${generateVerificationLink(
      userEmail
    )}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("error", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = { sendVerificationEmail };
