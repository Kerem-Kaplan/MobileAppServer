const User = require("../models/user");
const ObserverCategory = require("../models/observerCategory");
const UserComplaint = require("../models/userComplaint");
const UserRequest = require("../models/userRequest");
const UserSuggestion = require("../models/userSuggestion");
const checkUserIdentity = require("../services/checkUserIdentity");
const Authentication = require("../middleware/authenticationMiddleware");
const fs = require("fs");
const ProfilePhoto = require("../models/profilePhoto");
const { decodeUser } = require("../services/decodeUser");
const ObserverComplaintDemands = require("../models/observerComplaintDemand");
const ObserverPublicInfo = require("../models/observerPublicInfo");
const Observer = require("../models/observer");
const ObserverRequestDemand = require("../models/observerRequestDemand");
const ObserverSuggestionDemand = require("../models/observerSuggestionDemand");
const Vote = require("../models/votes");
const ObserverProfilePhoto = require("../models/observerProfilePhoto");
const UserProfilePhoto = require("../models/userProfilePhoto");

const signUp = async (req, res) => {
  try {
    await checkUserIdentity(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Kayıt sırasında bir hata oluştu" });
  }
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
    const decodedUser = await decodeUser(req, res);
    console.log("decoded User", decodedUser);
    console.log("req.body", req.body.data);
    console.log("file", req.file);

    const {
      userName,
      userSurname,
      userGender,
      userNationality,
      userPhoneNumber,
      observerEmail,
      vote,
      complaintContent,
      observerName,
    } = JSON.parse(req.body.data);

    console.log(JSON.parse(req.body.data));
    console.log(observerEmail);
    console.log(vote);
    console.log(complaintContent);

    if (!observerEmail || !vote || !complaintContent) {
      console.log("Alanlar boş geçilemez");
    } else {
      const userComplaint = new UserComplaint({
        userName,
        userSurname,
        userGender,
        userNationality,
        userPhoneNumber,
        userEmail: decodedUser.email,
        observerEmail,
        observerName: observerName,
        vote,
        file: req.file ? req.file.path : " ",
        complaintContent,
      });

      const result = await userComplaint.save();

      const userVote = new Vote({
        userEmail: decodedUser.email,
        observerEmail,
        vote,
      });

      const resultSaveVote = await userVote.save();
      console.log(resultSaveVote);
      console.log("result:", result);
      console.log("Kayıt başarılı");
      res.status(201).json({ message: "Şikayet başarıyla oluşturuldu" });
    }
  } catch (error) {
    console.log("Sikayet gonderirlirken hata oldu", error);
  }
  //await database.close();
};

const getComplaintDemands = async (req, res) => {
  //const decodedUser = await decodeUser(req, res);
  console.log("req.body", req.body.observerEmail);
  try {
    const result = await ObserverComplaintDemands.find({
      observerEmail: req.body.observerEmail,
    });
    console.log(result);
    if (result.length === 0) {
      console.log("Kayıt yok");
    } else {
      console.log(result[0].subjectOfComplaint);
      return res.status(200).json({ message: "Successfully", data: result });
    }
  } catch (error) {
    console.log("err", error);
  }
};
const getRequestDemands = async (req, res) => {
  //const decodedUser = await decodeUser(req, res);
  console.log("req.body", req.body.observerEmail);
  try {
    const result = await ObserverRequestDemand.find({
      observerEmail: req.body.observerEmail,
    });
    console.log(result);
    if (result.length === 0) {
      console.log("Kayıt yok");
      return res.status(404).json({ message: "Not Found", data: result });
    } else {
      //console.log(result[0].subjectOfRequest);
      return res.status(200).json({ message: "Successfully", data: result });
    }
  } catch (error) {
    console.log("err", error);
  }
};
const getSuggestionDemands = async (req, res) => {
  //const decodedUser = await decodeUser(req, res);
  console.log("req.body", req.body.observerEmail);
  try {
    const result = await ObserverSuggestionDemand.find({
      observerEmail: req.body.observerEmail,
    });
    console.log(result);
    if (result.length === 0) {
      console.log("Kayıt yok");
      return res.status(404).json({ message: "Not Found", data: result });
    } else {
      console.log(result[0].subjectOfSuggestion);
      return res.status(200).json({ message: "Successfully", data: result });
    }
  } catch (error) {
    console.log("err", error);
  }
};

const sendSuggestion = async (req, res) => {
  try {
    const decodedUser = await decodeUser(req, res);
    console.log("decoded User", decodedUser);
    console.log("req.body", req.body.data);
    console.log("file", req.file);

    const {
      userName,
      userSurname,
      userGender,
      userNationality,
      userPhoneNumber,
      observerEmail,
      suggestionContent,
      observerName,
    } = JSON.parse(req.body.data);
    console.log(observerEmail);
    console.log(suggestionContent);
    console.log(observerName);

    if (!observerEmail || !suggestionContent || !observerName) {
      console.log("Alanlar boş geçilemez");
    } else {
      const userSuggestion = new UserSuggestion({
        userName,
        userSurname,
        userGender,
        userNationality,
        userPhoneNumber,
        userEmail: decodedUser.email,
        observerEmail: observerEmail,
        observerName: observerName,
        file: req.file ? req.file.path : " ",
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
};

const sendRequest = async (req, res) => {
  try {
    const decodedUser = await decodeUser(req, res);
    console.log("decoded User", decodedUser);
    console.log("req.body", req.body.data);
    console.log("file", req.file);

    const {
      userName,
      userSurname,
      userGender,
      userNationality,
      userPhoneNumber,
      observerEmail,
      requestContent,
      observerName,
    } = JSON.parse(req.body.data);

    console.log(observerEmail);
    console.log(requestContent);
    console.log(observerName);

    if (!observerEmail || !requestContent || !observerName) {
      console.log("Alanlar boş geçilemez");
    } else {
      const userRequest = new UserRequest({
        userName,
        userSurname,
        userGender,
        userNationality,
        userPhoneNumber,
        userEmail: decodedUser.email,
        observerEmail,
        observerName: observerName,
        file: req.file ? req.file.path : " ",
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
};

const getProfile = async (req, res) => {
  try {
    const decodedUser = await decodeUser(req, res);
    console.log("decoded User", decodedUser);

    const user = await User.find({ email: decodedUser.email });
    if (user.length === 0) {
      console.log("Kullanıcı bulunamadı");
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log("Profil getirilirken hata oldu", error);
  }
};

const updateProfile = async (req, res) => {
  try {
    const decodedUser = await decodeUser(req, res);
    console.log(decodedUser);
    const user = await User.find({ email: decodedUser.email });
    if (user.length === 0) {
      console.log("Kullanıcı bulunamadı");
    } else {
      const data = req.body;
      console.log(data);

      const updatedProfile = await User.updateOne(
        {
          email: decodedUser.email,
        },
        data
      );
      console.log(updatedProfile);
    }

    return res.status(200).json({ message: "Updated Profile" });
  } catch (error) {
    console.log("Profil getirilirken hata oldu", error);
  }
};

const getProfilePhoto = async (req, res) => {
  try {
    const decodedUser = await decodeUser(req, res);
    console.log("decoded User", decodedUser);

    const profilePhoto = await UserProfilePhoto.find({
      email: decodedUser.email,
    });
    if (profilePhoto.length === 0) {
      const image = fs.readFileSync(
        "src/assets/defaultProfilePhoto/defaultProfilePhoto.png"
      );
      const base64Image = Buffer.from(image).toString("base64");
      return res.status(200).json({ photoData: base64Image });
    } else {
      const image = fs.readFileSync(profilePhoto[0].photoPath);

      const base64Image = Buffer.from(image).toString("base64");

      return res.status(200).json({ photoData: base64Image });
    }
  } catch (error) {
    console.log("Fotoğraf getirilirken hata oldu", error);
  }
};

const getObserverPhoto = async (req, res) => {
  try {
    console.log(req.body.observer);
    const observerEmail = req.body.observer;

    const observerPhoto = await ObserverProfilePhoto.find({
      email: observerEmail,
    });

    console.log("observerPhoto", observerPhoto);
    const image = fs.readFileSync(observerPhoto[0].photoPath);

    const base64Image = Buffer.from(image).toString("base64");

    return res.status(200).json({ observerPhoto: base64Image });
  } catch (error) {
    console.log("Fotoğraf getirilirken hata oldu", error);
  }
};

const pastComplaints = async (req, res) => {
  try {
    const decodedUser = await decodeUser(req, res);
    console.log("decoded User", decodedUser);

    const pastComplaints = await UserComplaint.find({
      userEmail: decodedUser.email,
    });
    console.log(pastComplaints);

    /* console.log("profilePhoto", profilePhoto.photoPath);
      const image = fs.readFileSync(profilePhoto.photoPath);

      const base64Image = Buffer.from(image).toString("base64");

      profilePhotos.push({
        observerEmail: profilePhoto.email,
        photoData: base64Image,
      }); */

    pastComplaints.map((complaints) => {
      if (complaints.file !== " ") {
        const image = fs.readFileSync(complaints.file);
        const base64Image = Buffer.from(image).toString("base64");
        console.log("base64Image", base64Image);
        complaints.file = base64Image;
      }
    });

    // console.log("pastComplaints", pastComplaints);

    if (pastComplaints.length === 0) {
      return res.status(404).json({ message: "Şikayet bulunamadı" });
    } else {
      return res.status(200).json(pastComplaints);
    }
  } catch (error) {
    console.log("Error:", error);
  }
};

const pastSuggestions = async (req, res) => {
  try {
    const decodedUser = await decodeUser(req, res);
    console.log("decoded User", decodedUser);

    const pastSuggestions = await UserSuggestion.find({
      userEmail: decodedUser.email,
    });
    console.log("pastSuggestions", pastSuggestions);

    pastSuggestions.map((suggestions) => {
      if (suggestions.file !== " ") {
        const image = fs.readFileSync(suggestions.file);
        const base64Image = Buffer.from(image).toString("base64");
        console.log("base64Image", base64Image);
        suggestions.file = base64Image;
      }
    });
    console.log(pastSuggestions);
    if (pastSuggestions.length === 0) {
      return res.status(404).json({ message: "Öneri bulunamadı" });
    } else {
      return res.status(200).json(pastSuggestions);
    }
  } catch (error) {
    console.log("Error:", error);
  }
};

const pastRequests = async (req, res) => {
  try {
    const decodedUser = await decodeUser(req, res);
    console.log("decoded User", decodedUser);

    const pastRequests = await UserRequest.find({
      userEmail: decodedUser.email,
    });

    pastRequests.map((requests) => {
      console.log(typeof requests.createdAt);
      if (requests.file !== " ") {
        const image = fs.readFileSync(requests.file);
        const base64Image = Buffer.from(image).toString("base64");
        //console.log("base64Image", base64Image);
        requests.file = base64Image;
      }
    });

    if (pastRequests.length === 0) {
      return res.status(404).json({ message: "İstek bulunamadı" });
    } else {
      return res.status(200).json(pastRequests);
    }
  } catch (error) {
    console.log("Error:", error);
  }
};

const homepage = async (req, res) => {
  try {
    const observers = await Observer.find(
      {
        email: { $exists: true },
        name: { $exists: true },
        observerCategory: { $exists: true },
      },
      {
        email: 1,
        name: 1,
        observerCategory: 1,
      }
    );
    console.log("observers", observers);
    const categories = await ObserverCategory.find();
    console.log("Categories", categories);

    const publicInfo = await ObserverPublicInfo.find();
    console.log("publicInfo", publicInfo);

    const observerProfilePhoto = await ObserverProfilePhoto.find();
    console.log("profilePhoto", observerProfilePhoto);

    let profilePhotos = [];

    observerProfilePhoto.map((profilePhoto) => {
      console.log("profilePhoto", profilePhoto.photoPath);
      const image = fs.readFileSync(profilePhoto.photoPath);

      const base64Image = Buffer.from(image).toString("base64");

      profilePhotos.push({
        observerEmail: profilePhoto.email,
        photoData: base64Image,
      });
    });

    //console.log("profilePhotos", profilePhotos);

    const observerVote = await Vote.find(
      {
        observerEmail: { $exists: true },
        vote: { $exists: true },
      },
      {
        _id: 0,
        observerEmail: 1,
        vote: 1,
      }
    );

    console.log("observerVote", observerVote);

    /* profilePhoto.forEach((element) => {
      const image = fs.readFileSync(element.photoPath);

      const base64Image = Buffer.from(image).toString("base64");
    }); */

    /* if (profilePhoto.length === 0) {
      const image = fs.readFileSync(
        "src/assets/defaultProfilePhoto/defaultProfilePhoto.png"
      );
      const base64Image = Buffer.from(image).toString("base64");
      return res.status(200).json({ photoData: base64Image });
    } else {
      const image = fs.readFileSync(profilePhoto[0].photoPath);

      const base64Image = Buffer.from(image).toString("base64");

      return res.status(200).json({ photoData: base64Image });
    } */

    if (observers.length === 0 || categories.length === 0) {
      return res.status(404).json({ message: "Not found" });
    } else {
      //console.log("Observers", observers);
      return res.status(200).json({
        message: "Successfully found",
        observers,
        categories,
        publicInfo,
        observerVote,
        profilePhotos,
      });
    }
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ message: "Something is wrong" });
  }
};

const uploadProfilePhoto = async (req, res) => {
  try {
    const decodedUser = await decodeUser(req, res);
    console.log("decoded User", decodedUser);
    console.log("name", req.file.originalname);
    console.log("path", req.file);
    const profilePhoto = await UserProfilePhoto.find({
      email: decodedUser.email,
    });
    if (profilePhoto.length === 0) {
      const newPhoto = new UserProfilePhoto({
        email: decodedUser.email,
        photoPath: req.file.path,
      });
      const result = await newPhoto.save();
      console.log("Result", result);
    } else {
      const updatePhoto = await UserProfilePhoto.updateOne(
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
  getObserverPhoto,
  updateProfile,
  pastComplaints,
  pastSuggestions,
  pastRequests,
  homepage,
  uploadProfilePhoto,
  getProfilePhoto,
  getComplaintDemands,
  getRequestDemands,
  getSuggestionDemands,
};

module.exports = UserController;
