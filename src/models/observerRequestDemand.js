const mongoose = require("mongoose");

const observerRequestDemandSchema = new mongoose.Schema(
  {
    observerId: {
      required: true,
      type: mongoose.Types.ObjectId,
    },
    subjectOfRequest: {
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

const ObserverRequestDemand = mongoose.model(
  "observerRequestDemand",
  observerRequestDemandSchema
);

module.exports = ObserverRequestDemand;