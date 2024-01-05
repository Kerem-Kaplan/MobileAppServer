const express = require("express");
const UserController = require("../controllers/userController");
const router = express.Router();
const Authorization = require("../middleware/authorizationMiddleware");
const ForgotPassword = require("../controllers/forgotPasswordController");
const ResetPasswordController = require("../controllers/resetPasswordController");
const multer = require("multer");

router.post("/sign-up", UserController.signUp);

router.get("/verify", UserController.verify);

router.post("/forgot-password", ForgotPassword.forgotPassword);

router.get("/reset-password/:token", ResetPasswordController.resetPasswordGet);

router.post(
  "/reset-password/:token",
  ResetPasswordController.resetPasswordPost
);

const storageSendComplaint = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/assets/complaintFile");
  },
  filename: function (req, file, cb) {
    console.log("fileeeee", file);
    cb(null, file.originalname);
  },
});

const uploadSendComplaint = multer({ storage: storageSendComplaint });

router.post(
  "/send-complaint",
  Authorization.checkAuthorization("user"),
  uploadSendComplaint.single("photo"),
  UserController.sendComplaint
);

const storageSendRequest = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/assets/requestFile");
  },
  filename: function (req, file, cb) {
    console.log("fileeeee", file);
    cb(null, file.originalname);
  },
});

const uploadSendRequest = multer({ storage: storageSendRequest });

router.post(
  "/send-request",
  Authorization.checkAuthorization("user"),
  uploadSendRequest.single("photo"),
  UserController.sendRequest
);

const storageSendSuggestion = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/assets/requestFile");
  },
  filename: function (req, file, cb) {
    console.log("fileeeee", file);
    cb(null, file.originalname);
  },
});

const uploadSendSuggestion = multer({ storage: storageSendSuggestion });

router.post(
  "/send-suggestion",
  Authorization.checkAuthorization("user"),
  uploadSendSuggestion.single("photo"),
  UserController.sendSuggestion
);

router.post(
  "/get-complaint-demands",
  Authorization.checkAuthorization("user"),
  UserController.getComplaintDemands
);
router.post(
  "/get-request-demands",
  Authorization.checkAuthorization("user"),
  UserController.getRequestDemands
);
router.post(
  "/get-suggestion-demands",
  Authorization.checkAuthorization("user"),
  UserController.getSuggestionDemands
);

router.get(
  "/profile",
  Authorization.checkAuthorization("user"),
  UserController.getProfile
);

router.post(
  "/update-profile",
  Authorization.checkAuthorization("user"),
  UserController.updateProfile
);

router.get(
  "/past-complaints",
  Authorization.checkAuthorization("user"),
  UserController.pastComplaints
);

router.get(
  "/past-suggestions",
  Authorization.checkAuthorization("user"),
  UserController.pastSuggestions
);
router.get(
  "/past-requests",
  Authorization.checkAuthorization("user"),
  UserController.pastRequests
);

router.get(
  "/homepage",
  Authorization.checkAuthorization("user"),
  UserController.homepage
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/assets/userProfilePhotos");
  },
  filename: function (req, file, cb) {
    console.log("file", file);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/upload-profile-photo",
  Authorization.checkAuthorization("user"),
  upload.single("photo"),
  UserController.uploadProfilePhoto
);

router.get(
  "/get-profile-photo",
  Authorization.checkAuthorization("user"),
  UserController.getProfilePhoto
);

router.post(
  "/get-observer-photo",
  Authorization.checkAuthorization("user"),
  UserController.getObserverPhoto
);

module.exports = router;
