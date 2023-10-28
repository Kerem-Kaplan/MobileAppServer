const mongoose = require("mongoose");

const observerCategorySchema = new mongoose.Schema(
  {
    categoryName: {
      required: true,
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

const ObserverCategory = mongoose.model(
  "observerCategory",
  observerCategorySchema
);

module.exports = ObserverCategory;
