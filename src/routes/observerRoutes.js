const express = require("express");
const router = express.Router();
const Authorization = require("../middleware/authorizationMiddleware");
const ObserverController = require("../controllers/observerController");

router.get(
  "/get-complaints/:_id",
  Authorization.checkAuthorization("observer"),
  ObserverController.getComplaints
);

router.get(
  "/get-suggestions/:_id",
  Authorization.checkAuthorization("observer"),
  ObserverController.getSuggestions
);

router.get(
  "/get-requests/:_id",
  Authorization.checkAuthorization("observer"),
  ObserverController.getRequests
);

router.get(
  "/homepage",
  Authorization.checkAuthorization("observer"),
  ObserverController.homepage
);

router.get(
  "/profile/:_id",
  Authorization.checkAuthorization("observer"),
  ObserverController.getProfile
);

router.post(
  "/add-complaint-demand/:_id",
  Authorization.checkAuthorization("observer"),
  ObserverController.addComplaintDemand
);

router.post(
  "/add-suggestion-demand/:_id",
  Authorization.checkAuthorization("observer"),
  ObserverController.addSuggestionDemand
);

router.post(
  "/add-request-demand/:_id",
  Authorization.checkAuthorization("observer"),
  ObserverController.addRequestDemand
);

router.get(
  "/get-complaint-demand/:_id",
  Authorization.checkAuthorization("observer"),
  ObserverController.getComplaintDemand
);

router.get(
  "/get-suggestion-demand/:_id",
  Authorization.checkAuthorization("observer"),
  ObserverController.getSuggestionDemand
);

router.get(
  "/get-request-demand/:_id",
  Authorization.checkAuthorization("observer"),
  ObserverController.getRequestDemand
);

module.exports = router;
