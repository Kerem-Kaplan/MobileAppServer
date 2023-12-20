const mongoose = require("mongoose");

const userSuggestionSchema = new mongoose.Schema(
  {
    userEmail: {
      required: true,
      type: String,
    },
    observerEmail: {
      required: true,
      type: String,
    },
    suggestionContent: {
      required: true,
      type: Object,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UserSuggestion = mongoose.model("userSuggestion", userSuggestionSchema);
module.exports = UserSuggestion;
