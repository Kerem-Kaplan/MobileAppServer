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
    const yearOfBirth = req.body.dateOfBirth.substring(0, 4);
    console.log("yearOfBirth", yearOfBirth);

    const requestArgs = {
      TCKimlikNo: req.body.identityNumberOrPassportNumber,
      Ad: req.body.name,
      Soyad: req.body.surname,
      DogumYili: yearOfBirth,
    };

    const options = {};

    await soap.createClient(url, options, function (err, client) {
      const method = client["TCKimlikNoDogrula"];
      method(requestArgs, async function (err, result, envelope, soapHeader) {
        console.log(result.TCKimlikNoDogrulaResult);
        if (result.TCKimlikNoDogrulaResult === false) {
          console.log("Böyle bir kişi yok");
          return res.status(500).json({ message: "Böyle bir kişi yok" });
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
            console.log("Kullanıcı başarıyla kaydedildi.");
            return res.status(201).json({
              message:
                "Kullanıcı başarıyla kaydedildi. Lütfen Email kontrol ediniz",
            });
          } else {
            return res
              .status(500)
              .json({ message: "Kayıt sırasında hata oluştu" });
          }
        }
        return result.TCKimlikNoDogrulaResult;
      });
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ message: "Bir şeyler ters gitti" });
  }
};

module.exports = mernisIdentityVerifyService;
