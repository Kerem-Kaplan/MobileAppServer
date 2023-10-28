const mongoose = require("mongoose");

const observerSuggestionDemandSchema = new mongoose.Schema(
  {
    observerId: {
      required: true,
      type: mongoose.Types.ObjectId,
    },
    subjectOfSuggestion: {
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

const ObserverSuggestionDemand = mongoose.model(
  "observerSuggestionDemand",
  observerSuggestionDemandSchema
);

module.exports = ObserverSuggestionDemand;
