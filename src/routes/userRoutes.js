const express = require("express");
const UserController = require("../controllers/userController");
const router = express.Router();
const Authorization = require("../middleware/authorizationMiddleware");
const ForgotPassword = require("../controllers/forgotPasswordController");
const ResetPasswordController = require("../controllers/resetPasswordController");
const multer = require("multer");
const path = require("path");

router.post("/sign-up", UserController.signUp);

router.get("/verify", UserController.verify);

router.post("/forgot-password", ForgotPassword.forgotPassword);

router.get("/reset-password/:token", ResetPasswordController.resetPasswordGet);

router.post(
  "/reset-password/:token",
  ResetPasswordController.resetPasswordPost
);

router.post(
  "/send-complaint",
  Authorization.checkAuthorization("user"),
  UserController.sendComplaint
);

router.post(
  "/send-suggestion",
  Authorization.checkAuthorization("user"),
  UserController.sendSuggestion
);

router.post(
  "/send-request",
  Authorization.checkAuthorization("user"),
  UserController.sendRequest
);

router.get(
  "/profile",
  Authorization.checkAuthorization("user"),
  UserController.getProfile
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
    cb(null, "src/assets/profilePhotos");
  },
  filename: function (req, file, cb) {
    console.log("file", file);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/upload-profile-photo",
  upload.single("photo"),
  UserController.uploadProfilePhoto
);

router.get(
  "/get-profile-photo",
  Authorization.checkAuthorization("user"),
  UserController.getProfilePhoto
);

module.exports = router;
