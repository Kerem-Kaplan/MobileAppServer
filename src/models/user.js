const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    surname: {
      required: true,
      type: String,
    },
    gender: {
      required: true,
      type: String,
    },
    dateOfBirth: {
      required: true,
      type: String,
    },
    nationality: {
      required: true,
      type: String,
    },
    identityNumberOrPassportNumber: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
      unique: true,
    },
    password: {
      required: true,
      type: String,
    },
    phoneNumber: {
      required: true,
      type: String,
      unique: true,
    },
    role: {
      required: true,
      type: String,
      default: "user",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
