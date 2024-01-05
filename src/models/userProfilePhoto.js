const mongoose = require("mongoose");

const profilePhotoSchema = new mongoose.Schema(
  {
    email: {
      required: true,
      type: String,
      unique: true,
    },
    photoPath: {
      required: true,
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UserProfilePhoto = mongoose.model("userProfilePhoto", profilePhotoSchema);
module.exports = UserProfilePhoto;
