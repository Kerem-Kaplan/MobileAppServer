const mongoose = require("mongoose");

const observerSuggestionDemandSchema = new mongoose.Schema(
  {
    observerEmail: {
      required: true,
      type: String,
    },
    subjectOfSuggestion: {
      required: true,
      type: [Object],
    },
    suggestionFile: {
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

const ObserverSuggestionDemand = mongoose.model(
  "observerSuggestionDemand",
  observerSuggestionDemandSchema
);

module.exports = ObserverSuggestionDemand;
