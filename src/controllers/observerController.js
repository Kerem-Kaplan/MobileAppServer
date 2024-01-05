const ObserverComplaintDemand = require("../models/observerComplaintDemand");
const ObserverRequestDemand = require("../models/observerRequestDemand");
const ObserverSuggestionDemand = require("../models/observerSuggestionDemand");
const ProfilePhoto = require("../models/profilePhoto");
const UserComplaint = require("../models/userComplaint");
const UserRequest = require("../models/userRequest");
const UserSuggestion = require("../models/userSuggestion");
const ObserverPublicInfo = require("../models/observerPublicInfo");
const { decodeUser } = require("../services/decodeUser");
const fs = require("fs");
const Observer = require("../models/observer");
const ObserverProfilePhoto = require("../models/observerProfilePhoto");

const getComplaints = async (req, res) => {
  try {
    const decodedUser = await decodeUser(req, res);
    console.log("decoded User", decodedUser);

    const complaints = await UserComplaint.find({
      observerEmail: decodedUser.email,
    });

    complaints.map((complaints) => {
      if (complaints.file !== " ") {
        const image = fs.readFileSync(complaints.file);
        const base64Image = Buffer.from(image).toString("base64");
        console.log("base64Image", base64Image);
        complaints.file = base64Image;
      }
    });

    console.log(complaints);
    if (complaints.length === 0) {
      return res.status(404).json({ message: "Şikayet bulunamadı" });
    }
    return res.status(200).json(complaints);
  } catch (error) {
    console.log("Gözlemciye ait sikayetleri alınırken hata oluştu ", error);
    return res
      .status(500)
      .json({ message: "Şikayetleri alırken bir hata oluştu" });
  }
};

const getSuggestions = async (req, res) => {
  try {
    const decodedUser = await decodeUser(req, res);
    console.log("decoded User", decodedUser);

    const suggestions = await UserSuggestion.find({
      observerEmail: decodedUser.email,
    });
    console.log(suggestions);
    if (suggestions.length === 0) {
      return res.status(404).json({ message: "Öneri bulunamadı" });
    }
    return res.status(200).json(suggestions);
  } catch (error) {
    console.log("Gözlemciye ait önerileri alınırken hata oluştu ", error);
    return res
      .status(500)
      .json({ message: "Önerileri alırken bir hata oluştu" });
  }
};

const getRequests = async (req, res) => {
  try {
    const decodedUser = await decodeUser(req, res);
    console.log("decoded User", decodedUser);

    const requests = await UserRequest.find({
      observerEmail: decodedUser.email,
    });
    console.log(requests);

    requests.map((requests) => {
      if (requests.file !== " ") {
        const image = fs.readFileSync(requests.file);
        const base64Image = Buffer.from(image).toString("base64");
        console.log("base64Image", base64Image);
        requests.file = base64Image;
      }
    });
    if (requests.length === 0) {
      return res.status(404).json({ message: "İstek bulunamadı" });
    }
    return res.status(200).json(requests);
  } catch (error) {
    console.log("Gözlemciye ait  istekleri alınırken hata oluştu ", error);
    return res
      .status(500)
      .json({ message: "İstekleri alırken bir hata oluştu" });
  }
};

const homepage = async (req, res) => {
  res.send("HOMEPAGE OBSERVER");
};

const getProfile = async (req, res) => {
  try {
    const decodedUser = await decodeUser(req, res);
    const user = await Observer.find({ email: decodedUser.email });
    if (user.length === 0) {
      console.log("Kullanıcı bulunamadı");
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    const publicInfo = await ObserverPublicInfo.find({
      email: decodedUser.email,
    });

    const profileInfo = { user, publicInfo };

    return res.status(200).json(profileInfo);
  } catch (error) {
    console.log("Gözlemciye ait  profil alınırken hata oluştu ", error);
    return res
      .status(500)
      .json({ message: "Profil alınırken bir hata oluştu" });
  }
  // await database.close();
};

const addComplaintDemand = async (req, res) => {
  try {
    const { optionalDemands } = req.body;
    const decodedUser = await decodeUser(req, res);
    console.log(decodedUser);

    const observerComplaint = await ObserverComplaintDemand.find({
      observerEmail: decodedUser.email,
    });

    if (observerComplaint.length !== 0) {
      const result = await ObserverComplaintDemand.updateOne(
        { observerEmail: decodedUser.email },
        {
          $set: { optionalDemands: optionalDemands },
        }
      );
      console.log("observerComplaint", observerComplaint);

      return res
        .status(200)
        .json({ message: "Gözlemci şikayet isterleri başarıyla güncellendi" });
    } else {
      const compliantDemand = new ObserverComplaintDemand({
        observerEmail: decodedUser.email,
        vote: 0,
        complaintFile: "",
        subjectOfComplaint: [],
        optionalDemands,
      });

      const result = await compliantDemand.save();
      console.log("result:", result);
      console.log("Kayıt başarılı");
      return res
        .status(201)
        .json({ message: "Gözlemci şikayet isterler başarıyla oluşturuldu" });
    }
  } catch (error) {
    console.log("Gözlemciye şikayet isterleri eklenirken hata oluştu ", error);
    return res
      .status(500)
      .json({ message: "Şikayet isterleri eklenirken bir hata oluştu" });
  }
  // await database.close();
};

const addSubjectOfComplaint = async (req, res) => {
  try {
    console.log("req.body", req.body);
    const subjectOfComplaint = req.body.subjectOfComplaint;
    console.log(typeof subjectOfComplaint);

    const decodedUser = await decodeUser(req, res);
    console.log(decodedUser);
    const observerComplaint = await ObserverComplaintDemand.find({
      observerEmail: decodedUser.email,
    });

    if (observerComplaint.length !== 0) {
      //res.send("Gözlemciye ait şikayet isterler bulunmakta");
      console.log("Gözlemciye ait şikayet isterler bulunmakta");
      const result = await ObserverComplaintDemand.updateOne(
        {
          observerEmail: decodedUser.email,
        },
        {
          $set: { subjectOfComplaint: subjectOfComplaint },
        }
      );
      console.log("result.subjectOfComplaint", result);

      return res
        .status(200)
        .json({ message: "Gözlemci şikayet konuları başarıyla güncellendi" });
    } else {
      const compliantDemand = new ObserverComplaintDemand({
        observerEmail: decodedUser.email,
        vote: 0,
        complaintFile: "",
        subjectOfComplaint,
        optionalDemands: {},
      });

      const result = await compliantDemand.save();
      console.log("result:", result);
      console.log("Kayıt başarılı");
      return res
        .status(201)
        .json({ message: "Gözlemci şikayet konuları başarıyla oluşturuldu" });
    }
  } catch (error) {
    console.log("Gözlemciye şikayet konuları eklenirken hata oluştu ", error);
    return res
      .status(500)
      .json({ message: "Şikayet konuları eklenirken bir hata oluştu" });
  }
};

const getSubjectOfComplaint = async (req, res) => {
  try {
    const decodedUser = await decodeUser(req, res);
    console.log(decodedUser);
    const observerComplaint = await ObserverComplaintDemand.find(
      {
        observerEmail: decodedUser.email,
        subjectOfComplaint: { $exists: true },
      },
      {
        subjectOfComplaint: 1,
      }
    );
    console.log(observerComplaint);

    if (observerComplaint.length !== 0) {
      //res.send("Gözlemciye ait şikayet isterler bulunmakta");
      return res
        .status(200)
        .json({ subjectOfComplaint: observerComplaint[0].subjectOfComplaint });
    } else {
      console.log("Şikayet isteri bulunamadı");
      return res
        .status(404)
        .json({ message: "Gözlemciye ait şikayet isterleri bulunamadı" });
    }
  } catch (error) {
    console.log("Gözlemciye şikayet isterleri getirilirken hata oluştu", error);
    return res
      .status(500)
      .json({ message: "Şikayet isterleri getirilirken bir hata oluştu" });
  }
  // await database.close();
};

const addSuggestionDemand = async (req, res) => {
  try {
    const { optionalDemands } = req.body;
    const decodedUser = await decodeUser(req, res);
    console.log(decodedUser);

    const observerSuggestion = await ObserverSuggestionDemand.find({
      observerEmail: decodedUser.email,
    });

    if (observerSuggestion.length !== 0) {
      console.log("Gözlemciye ait öneri isterler bulunmakta");

      const result = await ObserverSuggestionDemand.updateOne(
        { observerEmail: decodedUser.email },
        {
          $set: { optionalDemands: optionalDemands },
        }
      );

      return res
        .status(200)
        .json({ message: "Gözlemci öneri isterleri başarıyla güncellendi" });
    } else {
      const suggestionDemand = new ObserverSuggestionDemand({
        observerEmail: decodedUser.email,
        complaintFile: "",
        subjectOfComplaint: [],
        optionalDemands,
      });

      const result = await suggestionDemand.save();
      console.log("result:", result);
      console.log("Kayıt başarılı");
      return res
        .status(201)
        .json({ message: "Gözlemci öneri isterleri başarıyla oluşturuldu" });
    }
  } catch (error) {
    console.log("Gözlemciye öneri isterleri eklenirken hata oluştu ", error);
    return res
      .status(500)
      .json({ message: "Öneri isterleri eklenirken bir hata oluştu" });
  }
  // await database.close();
};

const addSubjectOfSuggestion = async (req, res) => {
  try {
    console.log("req.body", req.body);
    const subjectOfSuggestion = req.body.subjectOfSuggestion;

    console.log(typeof subjectOfSuggestion);
    const decodedUser = await decodeUser(req, res);
    console.log(decodedUser);

    const observerSuggestion = await ObserverSuggestionDemand.find({
      observerEmail: decodedUser.email,
    });

    if (observerSuggestion.length !== 0) {
      console.log("Gözlemciye ait şikayet isterler bulunmakta");
      await ObserverSuggestionDemand.updateOne(
        { observerEmail: decodedUser.email },
        { $set: { subjectOfSuggestion: subjectOfSuggestion } }
      );
      return res
        .status(200)
        .json({ message: "Gözlemci öneri konuları başarıyla güncellendi" });
    } else {
      const suggestionDemand = new ObserverSuggestionDemand({
        observerEmail: decodedUser.email,
        suggestionFile: "",
        subjectOfSuggestion,
        optionalDemands: {},
      });

      const result = await suggestionDemand.save();
      console.log("result:", result);
      console.log("Kayıt başarılı");
      return res
        .status(201)
        .json({ message: "Gözlemci şikayet konuları başarıyla oluşturuldu" });
    }
  } catch (error) {
    console.log("Gözlemciye şikayet isterleri eklenirken hata oluştu ", error);
    return res
      .status(500)
      .json({ message: "Öneri konuları eklenirken bir hata oluştu" });
  }
};
const addSubjectOfRequest = async (req, res) => {
  try {
    console.log("req.body", req.body);
    const subjectOfRequest = req.body.subjectOfRequest;
    console.log(typeof subjectOfRequest);

    const decodedUser = await decodeUser(req, res);
    console.log(decodedUser);

    const observerRequest = await ObserverRequestDemand.find({
      observerEmail: decodedUser.email,
    });

    if (observerRequest.length !== 0) {
      console.log("Gözlemciye ait talep isterler bulunmakta");

      await ObserverRequestDemand.updateOne(
        { observerEmail: decodedUser.email },
        { $set: { subjectOfRequest: subjectOfRequest } }
      );

      return res
        .status(200)
        .json({ message: "Gözlemci istek konuları başarıyla güncellendi" });
    } else {
      const requestDemand = new ObserverRequestDemand({
        observerEmail: decodedUser.email,
        suggestionFile: "",
        subjectOfRequest,
        optionalDemands: {},
      });

      const result = await requestDemand.save();
      console.log("result:", result);
      console.log("Kayıt başarılı");
      return res
        .status(201)
        .json({ message: "Gözlemci istek konuları başarıyla oluşturuldu" });
    }
  } catch (error) {
    console.log("Gözlemciye istek isterleri eklenirken hata oluştu ", error);
    return res
      .status(500)
      .json({ message: "İstek isterleri eklenirken bir hata oluştu" });
  }
};

const getSubjectOfSuggestion = async (req, res) => {
  try {
    const decodedUser = await decodeUser(req, res);
    console.log(decodedUser);

    const observerSuggestion = await ObserverSuggestionDemand.find(
      {
        observerEmail: decodedUser.email,
        subjectOfSuggestion: { $exists: true },
      },
      {
        subjectOfSuggestion: 1,
      }
    );
    console.log(observerSuggestion);

    if (observerSuggestion.length !== 0) {
      //res.send("Gözlemciye ait şikayet isterler bulunmakta");
      return res.status(200).json({
        subjectOfSuggestion: observerSuggestion[0].subjectOfSuggestion,
      });
    } else {
      console.log("Gözlemciye ait öneri isterleri bulunamadı");
      return res
        .status(404)
        .json({ message: "Gözlemciye ait öneri isterleri bulunamadı" });
    }
  } catch (error) {
    console.log("Gözlemciye öneri isterleri getirilirken hata oluştu ", error);
    return res
      .status(500)
      .json({ message: "Öneri isterleri getirilirken bir hata oluştu" });
  }
};

const addRequestDemand = async (req, res) => {
  try {
    const { optionalDemands } = req.body;
    const decodedUser = await decodeUser(req, res);
    console.log(decodedUser);
    console.log(optionalDemands);
    const observerRequest = await ObserverRequestDemand.find({
      observerEmail: decodedUser.email,
    });

    if (observerRequest.length !== 0) {
      console.log("Gözlemciye ait istek isterler bulunmakta");

      await ObserverRequestDemand.updateOne(
        { observerEmail: decodedUser.email },
        { $set: { optionalDemands: optionalDemands } }
      );

      return res
        .status(200)
        .json({ message: "Gözlemci istek isterleri başarıyla güncellendi" });
    } else {
      const requestDemand = new ObserverRequestDemand({
        observerEmail: decodedUser.email,
        requestFile: "",
        subjectOfRequest: [],
        optionalDemands,
      });
      const result = await requestDemand.save();
      console.log("result:", result);
      console.log("Kayıt başarılı");
      return res
        .status(201)
        .json({ message: "Gözlemci istek isterler başarıyla oluşturuldu" });
    }
  } catch (error) {
    console.log("Gözlemciye istek isterleri eklenirken hata oluştu", error);
    return res
      .status(500)
      .json({ message: "İstek isterleri eklenirken bir hata oluştu" });
  }
};

const getComplaintDemand = async (req, res) => {
  try {
    const decodedUser = await decodeUser(req, res);
    console.log(decodedUser);

    const complaintDemand = await ObserverComplaintDemand.find(
      {
        observerEmail: decodedUser.email,
        optionalDemands: { $exists: true },
      },
      {
        optionalDemands: 1,
      }
    );

    console.log(complaintDemand);

    if (complaintDemand.length !== 0) {
      //res.send("Gözlemciye ait şikayet isterler bulunmakta");
      return res
        .status(200)
        .json({ optionalDemands: complaintDemand[0].optionalDemands });
    } else {
      console.log("Not found");
      return res
        .status(404)
        .json({ message: "Şikayet isterleri bulunamadı", optionalDemands: {} });
    }
  } catch (error) {
    console.log(
      "Gözlemciye ait şikayet isterleri alınırken bir hata oluştu",
      error
    );
    return res
      .status(500)
      .json({ message: "Şikayet isterleri alınırken bir hata oluştu" });
  }
};

const getSuggestionDemand = async (req, res) => {
  try {
    const decodedUser = await decodeUser(req, res);
    console.log(decodedUser);

    const suggestionDemand = await ObserverSuggestionDemand.find(
      {
        observerEmail: decodedUser.email,
        optionalDemands: { $exists: true },
      },
      { optionalDemands: 1 }
    );

    if (suggestionDemand.length !== 0) {
      //res.send("Gözlemciye ait şikayet isterler bulunmakta");
      return res
        .status(200)
        .json({ optionalDemands: suggestionDemand[0].optionalDemands });
    } else {
      console.log("not found suggestion");
      return res
        .status(404)
        .json({ message: "Öneri isterleri bulunamadı", optionalDemands: {} });
    }
  } catch (error) {
    console.log("Gozlemciye ait öneri isterler alınırken hata oluştu");
    return res
      .status(500)
      .json({ message: "Öneri isterleri alınırken bir hata oluştu", error });
  }
};

const getRequestDemand = async (req, res) => {
  try {
    const decodedUser = await decodeUser(req, res);
    console.log(decodedUser);

    const requestDemand = await ObserverRequestDemand.find(
      {
        observerEmail: decodedUser.email,
        optionalDemands: { $exists: true },
      },
      {
        optionalDemands: 1,
      }
    );

    console.log(requestDemand);

    if (requestDemand.length !== 0) {
      //res.send("Gözlemciye ait şikayet isterler bulunmakta");
      return res
        .status(200)
        .json({ optionalDemands: requestDemand[0].optionalDemands });
    } else {
      console.log("Not found");
      return res
        .status(404)
        .json({ message: "İstek isterleri bulunamadı", optionalDemands: {} });
    }
  } catch (error) {
    console.log(
      "Gözlemciye ait istek isterleri alınırken bir hata oluştu",
      error
    );
    return res
      .status(500)
      .json({ message: "İstek isterleri alınırken bir hata oluştu" });
  }
  // await database.close();
};

const getProfilePhoto = async (req, res) => {
  try {
    const decodedUser = await decodeUser(req, res);
    console.log("decoded Userrrrrr", decodedUser);
    console.log(decodedUser.email);
    Observer.find();
    const profilePhoto = await ObserverProfilePhoto.find({
      email: decodedUser.email,
    });
    console.log(profilePhoto.length);

    let base64Image;

    if (profilePhoto.length === 0) {
      const image = fs.readFileSync(
        "src/assets/defaultProfilePhoto/defaultProfilePhoto.png"
      );
      base64Image = Buffer.from(image).toString("base64");
    } else {
      console.log("Else");
      const image = fs.readFileSync(profilePhoto[0].photoPath);

      base64Image = Buffer.from(image).toString("base64");
    }
    return res.status(200).json({ photoData: base64Image });
  } catch (error) {
    console.log("Profil getirilirken hata oldu", error);
    return res
      .status(500)
      .json({ message: "Profil getirilirken bir hata oluştu", error });
  }
};

const uploadProfilePhoto = async (req, res) => {
  try {
    const decodedUser = await decodeUser(req, res);
    console.log("decoded User", decodedUser);

    console.log("name", req.file.originalname);
    console.log("path", req.file);

    const profilePhoto = await ObserverProfilePhoto.find({
      email: decodedUser.email,
    });

    if (profilePhoto.length === 0) {
      const newPhoto = new ObserverProfilePhoto({
        email: decodedUser.email,
        photoPath: req.file.path,
      });
      const result = await newPhoto.save();
      console.log("Result", result);
    } else {
      const updatePhoto = await ObserverProfilePhoto.updateOne(
        { email: decodedUser.email },
        {
          $set: { photoPath: req.file.path },
        }
      );

      console.log("Update", updatePhoto);
    }

    return res
      .status(200)
      .json({ message: "Profile image uploaded successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error uploading profile image" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const decodedUser = await decodeUser(req, res);
    console.log(decodedUser);
    const user = await ObserverPublicInfo.find({ email: decodedUser.email });

    if (user.length === 0) {
      console.log("Kullanıcı bulunamadı");
    } else {
      const data = req.body;
      console.log(data);

      const updatedProfile = await ObserverPublicInfo.updateOne(
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
    return res.status(500).json({ message: "Profil getirilirken hata oldu" });
  }
};

const getSubjectOfRequest = async (req, res) => {
  try {
    const decodedUser = await decodeUser(req, res);
    console.log(decodedUser);

    const observerRequest = await ObserverRequestDemand.find(
      {
        observerEmail: decodedUser.email,
        subjectOfRequest: { $exists: true },
      },
      {
        subjectOfRequest: 1,
      }
    );
    console.log(observerRequest);

    if (observerRequest.length !== 0) {
      //res.send("Gözlemciye ait şikayet isterler bulunmakta");
      return res
        .status(200)
        .json({ subjectOfRequest: observerRequest[0].subjectOfRequest });
    } else {
      console.log("Şikayet isteri bulunamadı");
      return res
        .status(404)
        .json({ message: "Gözlemciye ait şikayet isterleri bulunamadı" });
    }
  } catch (error) {
    console.log("Gözlemciye şikayet isterleri getirilirken hata oluştu", error);
    return res
      .status(500)
      .json({ message: "Şikayet isterleri getirilirken bir hata oluştu" });
  }
  // await database.close();
};

const ObserverController = {
  getComplaints,
  addComplaintDemand,
  getComplaintDemand,
  addSubjectOfComplaint,
  getSubjectOfComplaint,
  getRequests,
  addRequestDemand,
  getRequestDemand,
  addSubjectOfRequest,
  getSubjectOfRequest,
  getSuggestions,
  addSuggestionDemand,
  getSuggestionDemand,
  addSubjectOfSuggestion,
  getSubjectOfSuggestion,
  getProfile,
  updateProfile,
  getProfilePhoto,
  uploadProfilePhoto,
  homepage,
};

module.exports = ObserverController;
