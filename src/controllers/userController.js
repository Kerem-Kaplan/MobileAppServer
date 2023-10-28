const database = require("../config/database");
const User = require("../models/user");
const UserComplaint = require("../models/userComplaint");
const UserRequest = require("../models/userRequest");
const UserSuggestion = require("../models/userSuggestion");
const checkUserIdentity = require("../services/checkUserIdentity");

const signUp = async (req, res) => {
  try {
    await database.connect();
    await checkUserIdentity(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Kayıt sırasında bir hata oluştu" });
  }
  await database.close();
};

const sendComplaint = async (req, res) => {
  try {
    await database.connect();
    const { userId, observerId, vote, complaintContent } = req.body;
    if (!userId || !observerId || !vote || !complaintContent) {
      console.log("Alanlar boş geçilemez");
    } else {
      const userComplaint = new UserComplaint({
        userId,
        observerId,
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
  await database.close();
};

const sendSuggestion = async (req, res) => {
  try {
    await database.connect();
    const { userId, observerId, suggestionContent } = req.body;
    if (!userId || !observerId || !suggestionContent) {
      console.log("Alanlar boş geçilemez");
    } else {
      const userSuggestion = new UserSuggestion({
        userId,
        observerId,
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
    await database.connect();
    const { userId, observerId, requestContent } = req.body;
    if (!userId || !observerId || !requestContent) {
      console.log("Alanlar boş geçilemez");
    } else {
      const userRequest = new UserRequest({
        userId,
        observerId,
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
    await database.connect();
    const user = await User.find({ _id: req.params._id });
    if (user.length === 0) {
      console.log("Kullanıcı bulunamadı");
    }

    res.status(200).json(user);
  } catch (error) {
    console.log("Profil getirilirken hata oldu", error);
  }
  await database.close();
};

const pastComplaints = async (req, res) => {
  try {
    await database.connect();
    const pastComplaints = await UserComplaint.find({ userId: req.params._id });
    if (pastComplaints.length === 0) {
      res.send("Kullanıcıyca ait sikayet bulunmadı");
    }

    res.status(200).json(pastComplaints);
  } catch (error) {}
  await database.close();
};

const pastSuggestions = async (req, res) => {
  try {
    await database.connect();
    const pastSuggestions = await UserSuggestion.find({
      userId: req.params_id,
    });
    if (pastSuggestions.length === 0) {
      res.send("Kullanıcıyca ait öneri bulunmadı");
    }

    res.status(200).json(pastSuggestions);
  } catch (error) {}
};

const pastRequests = async (req, res) => {
  try {
    await database.connect();
    const pastRequests = await UserRequest.find({ userId: req.params_id });
    if (pastRequests.length === 0) {
      res.send("Kullanıcıyca ait istek bulunmadı");
    }

    res.status(200).json(pastRequests);
  } catch (error) {}
};

const homepage = async (req, res) => {
  res.send("HOMEPAGE USER");
};

const UserController = {
  signUp,
  sendComplaint,
  sendSuggestion,
  sendRequest,
  getProfile,
  pastComplaints,
  pastSuggestions,
  pastRequests,
  homepage,
};

module.exports = UserController;
