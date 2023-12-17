const mongoose = require("mongoose");

const observerComplaintDemandSchema = new mongoose.Schema(
  {
    observerEmail: {
      required: true,
      type: mongoose.Types.ObjectId,
    },
    vote: {
      required: true,
      type: Number,
      default: 0,
    },
    subjectOfComplaint: {
      required: true,
      type: [String],
    },
    complaintFile: {
      required: false,
      type: String,
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
