const express = require("express");
const router = express.Router();
const Authorization = require("../middleware/authorizationMiddleware");

router.get("/get-complaints/:_id", async (req, res) => {});

router.get("/get-suggestions/:_id", async (req, res) => {});

router.get("/get-requests/:_id", async (req, res) => {});

router.get("/homepage", Authorization.checkAuthorization, async (req, res) => {
  res.send("HOMEPAGE OBSERVER");
});

router.get("/profile/:_id", async (req, res) => {});

router.post("/add-complaint-demand/:_id", async (req, res) => {});

router.post("/add-suggestion-demand/:_id", async (req, res) => {});

router.post("/add-request-demand/:_id", async (req, res) => {});

router.get("/get-complaint-demand/:_id", async (req, res) => {});

router.get("/get-suggestion-demand/:_id", async (req, res) => {});

router.get("/get-request-demand/:_id", async (req, res) => {});

module.exports = router;
