const ObserverComplaintDemand = require("../models/observerComplaintDemand");
const ObserverRequestDemand = require("../models/observerRequestDemand");
const ObserverSuggestionDemand = require("../models/observerSuggestionDemand");
const User = require("../models/user");
const UserComplaint = require("../models/userComplaint");
const UserRequest = require("../models/userRequest");
const UserSuggestion = require("../models/userSuggestion");

const getComplaints = async (req, res) => {
  try {
    //await database.connect();
    const complaints = await UserComplaint.find({
      observerEmail: req.params.email,
    });
    if (complaints.length === 0) {
      res.send("Gözlemciye ait sikayet bulunamadı");
    }
    res.status(200).json(complaints);
  } catch (error) {
    console.log("Gözlemciye ait sikayetleri alınırken hata oluştu ", error);
  }
  //await database.close();
};

const getSuggestions = async (req, res) => {
  try {
    //await database.connect();
    const suggestions = await UserSuggestion.find({
      observerEmail: req.params.email,
    });
    if (suggestions.length === 0) {
      res.send("Gözlemciye ait öneri bulunamadı");
    }
    res.status(200).json(suggestions);
  } catch (error) {
    console.log("Gözlemciye ait önerileri alınırken hata oluştu ", error);
  }
  //await database.close();
};

const getRequests = async (req, res) => {
  try {
    //await database.connect();
    const requests = await UserRequest.find({
      observerEmail: req.params.email,
    });
    if (requests.length === 0) {
      res.send("Gözlemciye ait istek bulunamadı");
    }
    res.status(200).json(requests);
  } catch (error) {
    console.log("Gözlemciye ait  istekleri alınırken hata oluştu ", error);
  }
  //await database.close();
};

const homepage = async (req, res) => {
  res.send("HOMEPAGE OBSERVER");
};

const getProfile = async (req, res) => {
  try {
    // await database.connect();
    const user = await User.find({ email: req.params.email });
    if (user.length === 0) {
      console.log("Kullanıcı bulunamadı");
    }

    res.status(200).json(user);
  } catch (error) {
    console.log("Gözlemciye ait  profil alınırken hata oluştu ", error);
  }
  // await database.close();
};

const addComplaintDemand = async (req, res) => {
  try {
    //await database.connect();

    const { observerEmail, subjectOfComplaint, optionalDemands } = req.body;
    const observerComplaint = await ObserverComplaintDemand.find({
      observerEmail: observerEmail,
    });

    if (observerComplaint.length !== 0) {
      res.send("Gözlemciye ait şikayet isterler bulunmakta");
      console.log("observerComplaint", observerComplaint);
    } else {
      if (!observerEmail || !subjectOfComplaint || !optionalDemands) {
        console.log("Alanlar boş geçilemez");
      } else {
        const compliantDemand = new ObserverComplaintDemand({
          observerEmail,
          subjectOfComplaint,
          optionalDemands,
        });

        const result = await compliantDemand.save();
        console.log("result:", result);
        console.log("Kayıt başarılı");
        res
          .status(201)
          .json({ message: "Gözlemci şikayet isterler başarıyla oluşturuldu" });
      }
    }
  } catch (error) {
    console.log("Gözlemciye şikayet isterleri eklenirken hata oluştu ", error);
  }
  // await database.close();
};

const addSuggestionDemand = async (req, res) => {
  try {
    // await database.connect();
    const { observerEmail, subjectOfSuggestion, optionalDemands } = req.body;
    const observerSuggestion = await ObserverSuggestionDemand.find({
      observerEmail: observerEmail,
    });

    if (observerSuggestion.length !== 0) {
      res.send("Gözlemciye ait öneri isterler bulunmakta");
    } else {
      if (!observerEmail || !subjectOfSuggestion || !optionalDemands) {
        console.log("Alanlar boş geçilemez");
      } else {
        const suggestionDemand = new ObserverSuggestionDemand({
          observerEmail,
          subjectOfSuggestion,
          optionalDemands,
        });

        const result = await suggestionDemand.save();
        console.log("result:", result);
        console.log("Kayıt başarılı");
        res
          .status(201)
          .json({ message: "Gözlemci öneri isterler başarıyla oluşturuldu" });
      }
    }
  } catch (error) {
    console.log("Gözlemciye öneri isterleri eklenirken hata oluştu ", error);
  }
  // await database.close();
};

const addRequestDemand = async (req, res) => {
  try {
    //await database.connect();
    const { observerEmail, subjectOfRequest, optionalDemands } = req.body;
    const observerRequest = await ObserverRequestDemand.find({
      observerEmail: observerEmail,
    });

    if (observerRequest.length !== 0) {
      res.send("Gözlemciye ait istek isterler bulunmakta");
    } else {
      if (!observerEmail || !subjectOfRequest || !optionalDemands) {
        console.log("Alanlar boş geçilemez");
      } else {
        const requestDemand = new ObserverRequestDemand({
          observerEmail,
          subjectOfRequest,
          optionalDemands,
        });
        const result = await requestDemand.save();
        console.log("result:", result);
        console.log("Kayıt başarılı");
        res
          .status(201)
          .json({ message: "Gözlemci istek isterler başarıyla oluşturuldu" });
      }
    }
  } catch (error) {
    console.log("Gözlemciye öneri isterleri eklenirken hata oluştu ", error);
  }
  //await database.close();
};

const getComplaintDemand = async (req, res) => {
  try {
    //await database.connect();
    const complaintDemand = await ObserverComplaintDemand.find({
      observerEmail: req.params.email,
    });

    if (complaintDemand.length === 0) {
      res.send("Gözlemciye ait şikayet ister bulunmamaktadır");
    }
    res.status(200).json(complaintDemand);
  } catch (error) {
    res.send("Gozlemciye ait şikayet isterler alınırken hata oluştu");
  }
  // await database.close();
};

const getSuggestionDemand = async (req, res) => {
  try {
    //await database.connect();
    const suggestionDemand = await ObserverSuggestionDemand.find({
      observerEmail: req.params.email,
    });

    if (suggestionDemand.length === 0) {
      res.send("Gözlemciye ait öneri ister bulunmamaktadır");
    }
    res.status(200).json(suggestionDemand);
  } catch (error) {
    res.send("Gozlemciye ait öneri isterler alınırken hata oluştu");
  }
  //await database.close();
};

const getRequestDemand = async (req, res) => {
  try {
    //await database.connect();
    const requestDemand = await ObserverRequestDemand.find({
      observerEmail: req.params.email,
    });

    if (requestDemand.length === 0) {
      res.send("Gözlemciye ait istek isterler bulunamadı");
    }
    res.status(200).json(requestDemand);
  } catch (error) {
    res.send("Gozlemciye ait istek isterler alınırken hata oluştu");
  }
  // await database.close();
};

const ObserverController = {
  getComplaints,
  getSuggestions,
  getRequests,
  homepage,
  getProfile,
  addComplaintDemand,
  addSuggestionDemand,
  addRequestDemand,
  getComplaintDemand,
  getSuggestionDemand,
  getRequestDemand,
};

module.exports = ObserverController;
