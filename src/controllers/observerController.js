const ObserverComplaintDemand = require("../models/observerComplaintDemand");
const ObserverRequestDemand = require("../models/observerRequestDemand");
const ObserverSuggestionDemand = require("../models/observerSuggestionDemand");
const ProfilePhoto = require("../models/profilePhoto");
const User = require("../models/user");
const UserComplaint = require("../models/userComplaint");
const UserRequest = require("../models/userRequest");
const UserSuggestion = require("../models/userSuggestion");
const ObserverPublicInfo = require("../models/observerPublicInfo");
const { decodeUser } = require("../services/decodeUser");
const fs = require("fs");
const Observer = require("../models/observer");

const getComplaints = async (req, res) => {
  try {
    const decodedUser = await decodeUser(req, res);
    console.log("decoded User", decodedUser);

    const complaints = await UserComplaint.find({
      observerEmail: decodedUser.email,
    });

    console.log(complaints);
    if (complaints.length === 0) {
      return res.status(404).json({ message: "Şikayet bulunamadı" });
    } else {
      return res.status(200).json(complaints);
    }
  } catch (error) {
    console.log("Gözlemciye ait sikayetleri alınırken hata oluştu ", error);
  }
  //await database.close();
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
    } else {
      return res.status(200).json(suggestions);
    }
  } catch (error) {
    console.log("Gözlemciye ait önerileri alınırken hata oluştu ", error);
  }
  //await database.close();
};

const getRequests = async (req, res) => {
  try {
    const decodedUser = await decodeUser(req, res);
    console.log("decoded User", decodedUser);

    const requests = await UserRequest.find({
      observerEmail: decodedUser.email,
    });
    console.log(requests);
    if (requests.length === 0) {
      return res.status(404).json({ message: "İstek bulunamadı" });
    } else {
      return res.status(200).json(requests);
    }
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
    const decodedUser = await decodeUser(req, res);
    const user = await Observer.find({ email: decodedUser.email });
    if (user.length === 0) {
      console.log("Kullanıcı bulunamadı");
    }

    const publicInfo = await ObserverPublicInfo.find({
      email: decodedUser.email,
    });

    const profileInfo = { user, publicInfo };

    return res.status(200).json(profileInfo);
  } catch (error) {
    console.log("Gözlemciye ait  profil alınırken hata oluştu ", error);
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
      res.send("Gözlemciye ait şikayet isterler bulunmakta");
      console.log("observerComplaint", observerComplaint);
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
      res
        .status(201)
        .json({ message: "Gözlemci şikayet isterler başarıyla oluşturuldu" });
    }
  } catch (error) {
    console.log("Gözlemciye şikayet isterleri eklenirken hata oluştu ", error);
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
      await ObserverComplaintDemand.updateOne(
        {
          observerEmail: decodedUser.email,
        },
        {
          $set: { subjectOfComplaint: subjectOfComplaint },
        }
      )
        .then((result) => {
          console.log("result.subjectOfComplaint", result);
        })
        .catch((error) => {
          console.log(error);
        });
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
      res
        .status(201)
        .json({ message: "Gözlemci şikayet konuları başarıyla oluşturuldu" });
    }
  } catch (error) {
    console.log("Gözlemciye şikayet isterleri eklenirken hata oluştu ", error);
  }
  // await database.close();
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
      console.log("Nof found");
    }
  } catch (error) {
    console.log(
      "Gözlemciye şikayet isterleri getirilirken hata oluştu ",
      error
    );
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
      res
        .status(201)
        .json({ message: "Gözlemci öneri isterler başarıyla oluşturuldu" });
    }
  } catch (error) {
    console.log("Gözlemciye öneri isterleri eklenirken hata oluştu ", error);
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
      //res.send("Gözlemciye ait şikayet isterler bulunmakta");
      console.log("Gözlemciye ait şikayet isterler bulunmakta");
      await ObserverSuggestionDemand.updateOne(
        {
          observerEmail: decodedUser.email,
        },
        {
          $set: { subjectOfSuggestion: subjectOfSuggestion },
        }
      )
        .then((result) => {
          console.log("result.subjectOfSuggestion", result);
        })
        .catch((error) => {
          console.log(error);
        });
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
      res
        .status(201)
        .json({ message: "Gözlemci şikayet konuları başarıyla oluşturuldu" });
    }
  } catch (error) {
    console.log("Gözlemciye şikayet isterleri eklenirken hata oluştu ", error);
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
      //res.send("Gözlemciye ait şikayet isterler bulunmakta");
      console.log("Gözlemciye ait şikayet isterler bulunmakta");
      await ObserverRequestDemand.updateOne(
        {
          observerEmail: decodedUser.email,
        },
        {
          $set: { subjectOfRequest: subjectOfRequest },
        }
      )
        .then((result) => {
          console.log("result.subjectOfRequest", result);
        })
        .catch((error) => {
          console.log(error);
        });
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
      res
        .status(201)
        .json({ message: "Gözlemci şikayet konuları başarıyla oluşturuldu" });
    }
  } catch (error) {
    console.log("Gözlemciye şikayet isterleri eklenirken hata oluştu ", error);
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
      console.log("Not found");
    }
  } catch (error) {
    console.log("Gözlemciye öneri isterleri getirilirken hata oluştu ", error);
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

      const result = await ObserverRequestDemand.updateOne(
        { observerEmail: decodedUser.email },
        {
          $set: { optionalDemands: optionalDemands },
        }
      );
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
      res
        .status(201)
        .json({ message: "Gözlemci istek isterler başarıyla oluşturuldu" });
    }
  } catch (error) {
    console.log("Gözlemciye öneri isterleri eklenirken hata oluştu ", error);
  }
  //await database.close();
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
      return res.status(404).json({});
    }
  } catch (error) {
    res.send("Gozlemciye ait şikayet isterler alınırken hata oluştu");
  }
  // await database.close();
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
      return res.status(404).json({});
    }
  } catch (error) {
    res.send("Gozlemciye ait öneri isterler alınırken hata oluştu");
  }
  //await database.close();
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
    }
  } catch (error) {
    res.send("Gozlemciye ait istek isterler alınırken hata oluştu");
  }
  // await database.close();
};

const getProfilePhoto = async (req, res) => {
  try {
    const decodedUser = await decodeUser(req, res);
    console.log("decoded Userrrrrr", decodedUser);
    console.log(decodedUser.email);
    const profilePhoto = await ProfilePhoto.find({ email: decodedUser.email });
    console.log(profilePhoto.length);
    if (profilePhoto.length === 0) {
      const image = fs.readFileSync(
        "src/assets/defaultProfilePhoto/defaultProfilePhoto.png"
      );
      const base64Image = Buffer.from(image).toString("base64");
      return res.status(200).json({ photoData: base64Image });
    } else {
      console.log("Else");
      const image = fs.readFileSync(profilePhoto[0].photoPath);

      const base64Image = Buffer.from(image).toString("base64");

      return res.status(200).json({ photoData: base64Image });
    }
  } catch (error) {
    console.log("Profil getirilirken hata oldu", error);
  }
  //await database.close();
};

const uploadProfilePhoto = async (req, res) => {
  try {
    const decodedUser = await decodeUser(req, res);
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
  }
  //await database.close();
};

const ObserverController = {
  getComplaints,
  getSuggestions,
  getRequests,
  homepage,
  getProfile,
  updateProfile,
  addComplaintDemand,
  addSuggestionDemand,
  addRequestDemand,
  getComplaintDemand,
  getSuggestionDemand,
  addSubjectOfSuggestion,
  getRequestDemand,
  addSubjectOfComplaint,
  getSubjectOfComplaint,
  getProfilePhoto,
  uploadProfilePhoto,
  getSubjectOfSuggestion,
  addSubjectOfRequest,
};

module.exports = ObserverController;
