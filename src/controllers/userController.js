const database = require("../config/database");
const User = require("../models/user");
const ObserverCategory = require("../models/observerCategory");
const UserComplaint = require("../models/userComplaint");
const UserRequest = require("../models/userRequest");
const UserSuggestion = require("../models/userSuggestion");
const checkUserIdentity = require("../services/checkUserIdentity");
const Authentication = require("../middleware/authenticationMiddleware");
const fs = require("fs");
const multer = require("multer");
const ProfilePhoto = require("../models/profilePhoto");

const signUp = async (req, res) => {
  try {
    //await database.connect();
    await checkUserIdentity(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Kayıt sırasında bir hata oluştu" });
  }
  //await database.close();
};

const verify = async (req, res) => {
  try {
    const userEmail = req.query.email;
    const user = await User.findOne({ email: userEmail });
    if (user) {
      user.isVerified = true;
      await user.save();
      res.send("E-posta doğrulandı. Artık giriş yapabilirsiniz.");
    } else {
      res.status(404).send("Kullanıcı bulunamadı.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Bir hata oluştu.");
  }
};

const sendComplaint = async (req, res) => {
  try {
    const reqHeader = req.headers["authorization"];
    console.log("reqHeader", reqHeader);
    const token = reqHeader && reqHeader.split(" ")[1];
    console.log("token", token);

    process.env.SECRET_KEY;
    const decodedUser = Authentication.verifyToken(
      token,
      process.env.SECRET_KEY
    );
    console.log("decoded User", decodedUser);

    const { observerEmail, vote, complaintContent } = req.body;
    if (!observerEmail || !vote || !complaintContent) {
      console.log("Alanlar boş geçilemez");
    } else {
      const userComplaint = new UserComplaint({
        userEmail: decodedUser.email,
        observerEmail,
        vote,
        complaintContent,
      });

      const result = await userComplaint.save();
      console.log("result:", result);
      console.log("Kayıt başarılı");
      res.status(201).json({ message: "Şikayet başarıyla oluşturuldu" });
    }
  } catch (error) {
    console.log("Sikayet gonderirlirken hata oldu", error);
  }
  //await database.close();
};

const sendSuggestion = async (req, res) => {
  try {
    const reqHeader = req.headers["authorization"];
    console.log("reqHeader", reqHeader);
    const token = reqHeader && reqHeader.split(" ")[1];
    console.log("token", token);

    process.env.SECRET_KEY;
    const decodedUser = Authentication.verifyToken(
      token,
      process.env.SECRET_KEY
    );
    console.log("decoded User", decodedUser);

    const { observerEmail, suggestionContent } = req.body;
    if (!observerEmail || !suggestionContent) {
      console.log("Alanlar boş geçilemez");
    } else {
      const userSuggestion = new UserSuggestion({
        userEmail: decodedUser.email,
        observerEmail,
        suggestionContent,
      });
      const result = await userSuggestion.save();
      console.log("result:", result);
      console.log("Kayıt başarılı");
      res.status(201).json({ message: "Öneri başarıyla oluşturuldu" });
    }
  } catch (error) {
    console.log("Öneri gonderirlirken hata oldu", error);
  }
  //await database.close()
};

const sendRequest = async (req, res) => {
  try {
    const reqHeader = req.headers["authorization"];
    console.log("reqHeader", reqHeader);
    const token = reqHeader && reqHeader.split(" ")[1];
    console.log("token", token);

    process.env.SECRET_KEY;
    const decodedUser = Authentication.verifyToken(
      token,
      process.env.SECRET_KEY
    );
    console.log("decoded User", decodedUser);

    const { observerEmail, requestContent } = req.body;
    if (!observerEmail || !requestContent) {
      console.log("Alanlar boş geçilemez");
    } else {
      const userRequest = new UserRequest({
        userEmail: decodedUser.email,
        observerEmail,
        requestContent,
      });
      const result = await userRequest.save();
      console.log("result:", result);
      console.log("Kayıt başarılı");
      res.status(201).json({ message: "İstek başarıyla oluşturuldu" });
    }
  } catch (error) {
    console.log("İstek gonderirlirken hata oldu", error);
  }
  //await database.close()
};

const getProfile = async (req, res) => {
  try {
    const reqHeader = req.headers["authorization"];
    console.log("reqHeader", reqHeader);
    const token = reqHeader && reqHeader.split(" ")[1];
    console.log("token", token);

    process.env.SECRET_KEY;
    const decodedUser = Authentication.verifyToken(
      token,
      process.env.SECRET_KEY
    );
    console.log("decoded User", decodedUser);

    const user = await User.find({ email: decodedUser.email });
    if (user.length === 0) {
      console.log("Kullanıcı bulunamadı");
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log("Profil getirilirken hata oldu", error);
  }
  //await database.close();
};

const getProfilePhoto = async (req, res) => {
  try {
    const reqHeader = req.headers["authorization"];
    console.log("reqHeader", reqHeader);
    const token = reqHeader && reqHeader.split(" ")[1];
    console.log("token", token);

    process.env.SECRET_KEY;
    const decodedUser = Authentication.verifyToken(
      token,
      process.env.SECRET_KEY
    );
    console.log("decoded User", decodedUser);

    const profilePhoto = await ProfilePhoto.find({ email: decodedUser.email });
    if (profilePhoto.length === 0) {
      console.log("Kullanıcı bulunamadı");
    }
    const image = fs.readFileSync(profilePhoto[0].photoPath);

    const base64Image = Buffer.from(image).toString("base64");

    return res.status(200).json({ photoData: base64Image });
  } catch (error) {
    console.log("Profil getirilirken hata oldu", error);
  }
  //await database.close();
};

const pastComplaints = async (req, res) => {
  try {
    const reqHeader = req.headers["authorization"];
    console.log("reqHeader", reqHeader);
    const token = reqHeader && reqHeader.split(" ")[1];
    console.log("token", token);

    process.env.SECRET_KEY;
    const decodedUser = Authentication.verifyToken(
      token,
      process.env.SECRET_KEY
    );
    console.log("decoded User", decodedUser);

    const pastComplaints = await UserComplaint.find({
      userEmail: decodedUser.email,
    });
    if (pastComplaints.length === 0) {
      return res.send("Kullanıcıyca ait sikayet bulunmadı");
    }

    return res.status(200).json(pastComplaints);
  } catch (error) {
    console.log("Error:", error);
  }
  //await database.close();
};

const pastSuggestions = async (req, res) => {
  try {
    const reqHeader = req.headers["authorization"];
    console.log("reqHeader", reqHeader);
    const token = reqHeader && reqHeader.split(" ")[1];
    console.log("token", token);

    process.env.SECRET_KEY;
    const decodedUser = Authentication.verifyToken(
      token,
      process.env.SECRET_KEY
    );
    console.log("decoded User", decodedUser);

    const pastSuggestions = await UserSuggestion.find({
      userEmail: decodedUser.email,
    });
    if (pastSuggestions.length === 0) {
      res.send("Kullanıcıyca ait öneri bulunmadı");
    }

    res.status(200).json(pastSuggestions);
  } catch (error) {
    console.log("Error:", error);
  }
  //await database.close()
};

const pastRequests = async (req, res) => {
  try {
    const reqHeader = req.headers["authorization"];
    console.log("reqHeader", reqHeader);
    const token = reqHeader && reqHeader.split(" ")[1];
    console.log("token", token);

    process.env.SECRET_KEY;
    const decodedUser = Authentication.verifyToken(
      token,
      process.env.SECRET_KEY
    );
    console.log("decoded User", decodedUser);

    const pastRequests = await UserRequest.find({
      userEmail: decodedUser.email,
    });
    if (pastRequests.length === 0) {
      res.send("Kullanıcıyca ait istek bulunmadı");
    }

    res.status(200).json(pastRequests);
  } catch (error) {
    console.log("Error:", error);
  }
  //await database.close()
};

const homepage = async (req, res) => {
  try {
    const observers = await User.find({ role: "observer" });
    const categories = await ObserverCategory.find();
    console.log("Categories", categories);
    if (observers.length === 0 || categories.length === 0) {
      return res.status(404).json({ message: "Not found" });
    } else {
      console.log("Observers", observers);
      return res.status(200).json({
        message: "Successfully found",
        observers,
        categories,
      });
    }
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ message: "Something is wrong" });
  }
};

const uploadProfilePhoto = async (req, res) => {
  try {
    const reqHeader = req.headers["authorization"];
    console.log("reqHeader", reqHeader);
    const token = reqHeader && reqHeader.split(" ")[1];
    console.log("token", token);

    process.env.SECRET_KEY;
    const decodedUser = Authentication.verifyToken(
      token,
      process.env.SECRET_KEY
    );
    console.log("decoded User", decodedUser);
    console.log("name", req.file.originalname);
    console.log("path", req.file);
    const profilePhoto = await ProfilePhoto.find({ email: decodedUser.email });
    if (profilePhoto.length === 0) {
      const newPhoto = new ProfilePhoto({
        email: decodedUser.email,
        photoPath: req.file.path,
      });
      const result = await newPhoto.save();
      console.log("Result", result);
    } else {
      const updatePhoto = await ProfilePhoto.updateOne(
        { email: decodedUser.email },
        {
          $set: { photoPath: req.file.path },
        }
      );

      console.log("Update", updatePhoto);
    }

    res.status(200).json({ message: "Profile image uploaded successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error uploading profile image" });
  }
};

const UserController = {
  signUp,
  verify,
  sendComplaint,
  sendSuggestion,
  sendRequest,
  getProfile,
  pastComplaints,
  pastSuggestions,
  pastRequests,
  homepage,
  uploadProfilePhoto,
  getProfilePhoto,
};

module.exports = UserController;
