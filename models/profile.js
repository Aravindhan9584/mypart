const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    street: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
