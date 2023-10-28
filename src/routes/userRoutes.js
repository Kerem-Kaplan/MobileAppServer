const express = require("express");
const UserController = require("../controllers/userController");
const router = express.Router();
const Authorization = require("../middleware/authorizationMiddleware");

router.post("/sign-up", UserController.signUp);

router.post("/send-complaint", UserController.sendComplaint);

router.post("/send-suggestion", UserController.sendSuggestion);

router.post("/send-request", UserController.sendRequest);

router.get("/profile/:_id", UserController.getProfile);
router.get("/past-complaints/:_id", UserController.pastComplaints);
router.get("/past-suggestions/:_id", UserController.pastSuggestions);
router.get("/past-requests/:_id", UserController.pastRequests);

router.get(
  "/homepage",
  Authorization.checkAuthorization,
  UserController.homepage
);

module.exports = router;
