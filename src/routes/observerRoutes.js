const express = require("express");
const router = express.Router();
const Authorization = require("../middleware/authorizationMiddleware");
const ObserverController = require("../controllers/observerController");
const multer = require("multer");

router.get(
  "/get-complaints",
  Authorization.checkAuthorization("observer"),
  ObserverController.getComplaints
);

router.get(
  "/get-suggestions",
  Authorization.checkAuthorization("observer"),
  ObserverController.getSuggestions
);

router.get(
  "/get-requests",
  Authorization.checkAuthorization("observer"),
  ObserverController.getRequests
);

router.get(
  "/homepage",
  Authorization.checkAuthorization("observer"),
  ObserverController.homepage
);

router.get(
  "/profile",
  Authorization.checkAuthorization("observer"),
  ObserverController.getProfile
);

router.post(
  "/update-profile",
  Authorization.checkAuthorization("observer"),
  ObserverController.updateProfile
);

router.post(
  "/add-complaint-demand",
  Authorization.checkAuthorization("observer"),
  ObserverController.addComplaintDemand
);

router.post(
  "/add-suggestion-demand",
  Authorization.checkAuthorization("observer"),
  ObserverController.addSuggestionDemand
);

router.post(
  "/add-subject-of-complaint",
  Authorization.checkAuthorization("observer"),
  ObserverController.addSubjectOfComplaint
);

router.get(
  "/get-subject-of-complaint",
  Authorization.checkAuthorization("observer"),
  ObserverController.getSubjectOfComplaint
);

router.post(
  "/add-request-demand",
  Authorization.checkAuthorization("observer"),
  ObserverController.addRequestDemand
);

router.get(
  "/get-complaint-demand",
  Authorization.checkAuthorization("observer"),
  ObserverController.getComplaintDemand
);

router.get(
  "/get-suggestion-demand",
  Authorization.checkAuthorization("observer"),
  ObserverController.getSuggestionDemand
);

router.get(
  "/get-request-demand",
  Authorization.checkAuthorization("observer"),
  ObserverController.getRequestDemand
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
  Authorization.checkAuthorization("observer"),
  upload.single("photo"),
  ObserverController.uploadProfilePhoto
);

router.get(
  "/get-profile-photo",
  Authorization.checkAuthorization("observer"),
  ObserverController.getProfilePhoto
);

module.exports = router;
