const mongoose = require("mongoose");

const userSuggestionSchema = new mongoose.Schema(
  {
    userEmail: {
      required: true,
      type: String,
    },
    userName: {
      required: true,
      type: String,
    },
    userSurname: {
      required: true,
      type: String,
    },
    userGender: {
      required: true,
      type: String,
    },
    userNationality: {
      required: true,
      type: String,
    },
    userPhoneNumber: {
      required: true,
      type: String,
    },
    observerEmail: {
      required: true,
      type: String,
    },
    observerName: {
      required: true,
      type: String,
    },
    file: {
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
