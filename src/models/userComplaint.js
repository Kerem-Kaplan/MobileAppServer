const mongoose = require("mongoose");

const userComplaintSchema = new mongoose.Schema(
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
