const mongoose = require("mongoose");

const userComplaintSchema = new mongoose.Schema(
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
    vote: {
      required: true,
      type: Number,
    },
    file: {
      required: true,
      type: String,
    },
    complaintContent: {
      required: true,
      type: Object,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UserComplaint = mongoose.model("userComplaint", userComplaintSchema);
module.exports = UserComplaint;
