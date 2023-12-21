const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema(
  {
    userEmail: {
      required: true,
      type: String,
    },
    observerEmail: {
      required: true,
      type: String,
    },
    vote: {
      required: true,
      type: Number,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Vote = mongoose.model("vote", voteSchema);
module.exports = Vote;
