const database = require("../config/database");
const checkUserIdentity = require("../services/checkUserIdentity");
const mernisIdentityVerifyService = require("../services/mernsiIdentityVerifyService");

const signUp = async (req, res) => {
  try {
    await database.connect();
    await checkUserIdentity(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Kayıt sırasında bir hata oluştu" });
  }
};

const sendComplaint = async (req, res) => {
  console.log("sendComplaint page");
};

const sendSuggestion = async (req, res) => {
  console.log("sendSuggestion page");
};

const sendRequest = async (req, res) => {
  console.log("sendRequest page");
};

const getProfile = async (req, res) => {
  console.log("getProfile page");
};

const pastComplaints = async (req, res) => {
  console.log("pastComplaints page");
};

const pastSuggestions = async (req, res) => {
  console.log("pastComplaints page");
};

const pastRequests = async (req, res) => {
  console.log("pastComplaints page");
};

const homepage = async (req, res) => {
  res.send("HOMEPAGE USER")
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
