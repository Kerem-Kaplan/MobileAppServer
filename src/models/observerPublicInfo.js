const mongoose = require("mongoose");

const observerPublicInfoSchema = new mongoose.Schema(
  {
    email: {
      required: true,
      type: String,
      unique: true,
    },
    emailForContact: {
      required: true,
      type: String,
      unique: true,
    },
    phoneNumber: {
      required: true,
      type: String,
      unique: true,
    },
    address: {
      required: true,
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const ObserverPublicInfo = mongoose.model(
  "observerPublicInfo",
  observerPublicInfoSchema
);
module.exports = ObserverPublicInfo;
