const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema(
  {
    userId: {
      required: true,
      type: mongoose.Types.ObjectId,
    },
    observerId: {
      required: true,
      type: mongoose.Types.ObjectId,
    },
    vote: {
      required: true,
      type: Number,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

const Vote = mongoose.model("vote", voteSchema);
module.exports = Vote;
