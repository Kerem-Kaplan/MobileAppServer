const mongoose = require("mongoose");

const observerComplaintDemandSchema = new mongoose.Schema(
  {
    observerId: {
      required: true,
      type: mongoose.Types.ObjectId,
    },
    vote: {
      required: true,
      type: Number,
    },
    subjectOfComplaint: {
      required: false,
      type: [String],
    },
    optionalDemands: {
      required: true,
      type: Object,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const ObserverComplaintDemand = mongoose.model(
  "observerComplaintDemand",
  observerComplaintDemandSchema
);

module.exports = ObserverComplaintDemand;