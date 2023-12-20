const mongoose = require("mongoose");

const userRequestSchema = new mongoose.Schema(
  {
    userEmail: {
      required: true,
      type: String,
    },
    observerEmail: {
      required: true,
      type: String,
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
