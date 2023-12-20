const mongoose = require("mongoose");

const userComplaintSchema = new mongoose.Schema(
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
