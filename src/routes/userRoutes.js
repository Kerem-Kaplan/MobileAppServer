const express = require("express");
const UserController = require("../controllers/userController");
const router = express.Router();
const Authorization = require("../middleware/authorizationMiddleware");
const ForgotPassword = require("../controllers/forgotPasswordController");
const ResetPasswordController = require("../controllers/resetPasswordController");

router.post("/sign-up", UserController.signUp);

router.get("/verify", UserController.verify);

router.post("/forgot-password", ForgotPassword.forgotPassword);

router.get(
  "/reset-password/:email/:token",
  ResetPasswordController.resetPasswordGet
);

router.post(
  "/reset-password/:email/:token",
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
  "/profile/:email",
  Authorization.checkAuthorization("user"),
  UserController.getProfile
);
router.get(
  "/past-complaints/:email",
  Authorization.checkAuthorization("user"),
  UserController.pastComplaints
);
router.get(
  "/past-suggestions/:email",
  Authorization.checkAuthorization("user"),
  UserController.pastSuggestions
);
router.get(
  "/past-requests/:email",
  Authorization.checkAuthorization("user"),
  UserController.pastRequests
);

router.get(
  "/homepage",
  Authorization.checkAuthorization("user"),
  UserController.homepage
);

module.exports = router;
