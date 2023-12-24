const mongoose = require("mongoose");

const observerSchema = new mongoose.Schema(
  {
    email: {
      required: true,
      type: String,
      unique: true,
    },
    password: {
      required: true,
      type: String,
    },
    observerCategory: {
      required: true,
      type: mongoose.Types.ObjectId,
    },
    name: {
      required: true,
      type: String,
    },
    role: {
      required: true,
      type: String,
      default: "observer",
    },
    emailForContact: {
      required: true,
      type: String,
      unique: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Observer = mongoose.model("observer", observerSchema);
module.exports = Observer;
