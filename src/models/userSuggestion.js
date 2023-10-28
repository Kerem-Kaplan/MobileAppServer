const mongoose = require("mongoose");

const userSuggestionSchema = new mongoose.Schema(
  {
    userId: {
      required: true,
      type: mongoose.Types.ObjectId,
    },
    observerId: {
      required: true,
      type: mongoose.Types.ObjectId,
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