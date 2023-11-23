const soap = require("strong-soap").soap;
const url = "https://tckimlik.nvi.gov.tr/Service/KPSPublic.asmx?WSDL";
const database = require("../config/database");
const {
  sendVerificationEmail,
} = require("../controllers/emailVerificationController");
const User = require("../models/user");
const { SignupValidator } = require("../validators/signupValidator");
const getAllUsers = require("./getAllUsers");
const bcrypt = require("bcrypt");

const mernisIdentityVerifyService = async (req, res) => {
  try {
    if (!SignupValidator.dateOfBirthValidator(req.body.dateOfBirth)) {
      console.log("Tarih formatı uygun değil");
      res.send("tarih formatı uygun değil");
    } else {
      const requestArgs = {
        TCKimlikNo: req.body.identityNumberOrPassportNumber,
        Ad: req.body.name,
        Soyad: req.body.surname,
        DogumYili: req.body.dateOfBirth,
      };

      const options = {};

      await soap.createClient(url, options, function (err, client) {
        const method = client["TCKimlikNoDogrula"];
        method(requestArgs, async function (err, result, envelope, soapHeader) {
          console.log(result.TCKimlikNoDogrulaResult);
          if (result.TCKimlikNoDogrulaResult === false) {
            res.status(500).json({ message: "Böyle bir kişi yok" });
          }
          if (result.TCKimlikNoDogrulaResult === true) {
            const saltRounds = 10; // Salt tur sayısı
            const hashedPassword = await bcrypt.hash(
              req.body.password,
              saltRounds
            );
            const hashedIdentityNumberOrPassportNumber = await bcrypt.hash(
              req.body.identityNumberOrPassportNumber,
              saltRounds
            );

            const user = new User({
              name: req.body.name,
              surname: req.body.surname,
              gender: req.body.gender,
              dateOfBirth: req.body.dateOfBirth,
              nationality: req.body.nationality,
              identityNumberOrPassportNumber:
                hashedIdentityNumberOrPassportNumber,
              email: req.body.email,
              password: hashedPassword,
              phoneNumber: req.body.phoneNumber,
            });

            sendVerificationEmail(req.body.email);

            const result = await user.save();
            if (result) {
              res.status(201).json({
                message:
                  "Şikayetçi başarıyla kaydedildi. Lütfen Email kontrol ediniz",
              });
            } else {
              console.log("Kayıt sırasında hata olustu");
            }
          }
          return result.TCKimlikNoDogrulaResult;
        });
      });
    }
  } catch (error) {
    console.log("Error");
  }
};

module.exports = mernisIdentityVerifyService;
