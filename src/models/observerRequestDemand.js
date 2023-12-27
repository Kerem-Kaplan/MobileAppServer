const mongoose = require("mongoose");

const observerRequestDemandSchema = new mongoose.Schema(
  {
    observerEmail: {
      required: true,
      type: String,
    },
    subjectOfRequest: {
      required: true,
      type: [Object],
    },
    requestFile: {
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

const ObserverRequestDemand = mongoose.model(
  "observerRequestDemand",
  observerRequestDemandSchema
);

module.exports = ObserverRequestDemand;
