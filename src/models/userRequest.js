const mongoose = require("mongoose");

const userRequestSchema = new mongoose.Schema(
  {
    userId: {
      required: true,
      type: mongoose.Types.ObjectId,
    },
    observerId: {
      required: true,
      type: mongoose.Types.ObjectId,
    },
    requestContent: {
      required: true,
      type: Object,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UserRequest = mongoose.model("userRequest", userRequestSchema);
module.exports = UserRequest;
